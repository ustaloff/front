// composables/useSidebar.js
import {reactive, computed, watch} from 'vue'
import {useDeviceStore} from '@/stores/device'

export const SIDEBAR = 'SIDEBAR'
const STORAGE_KEY = 'sidebar-expanded'

const loadExpandedState = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved !== null ? JSON.parse(saved) : false
    } catch (error) {
        console.warn('Failed to load sidebar state from localStorage:', error)
        return false
    }
}

const saveExpandedState = (isExpanded) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(isExpanded))
    } catch (error) {
        console.warn('Failed to save sidebar state to localStorage:', error)
    }
}

const getSidebarWidth = () => {
    const expanded = getComputedStyle(document.documentElement)
        .getPropertyValue('--sidebar-width').trim()
    const minimized = getComputedStyle(document.documentElement)
        .getPropertyValue('--sidebar-minimized-width').trim()

    return {expanded, minimized}
}

// 🔥 Утилитарная функция для получения текущей ширины сайдбара
const getCurrentSidebarWidth = (isExpanded) => {
    const {expanded, minimized} = getSidebarWidth()
    return isExpanded ? expanded : minimized
}

// 🔥 Функция для управления data-attribute на body
const updateBodySidebarState = (shouldOffset, width) => {
    if (shouldOffset) {
        document.body.style.setProperty('--sidebar-current-width', width)
    } else {
        document.body.style.removeProperty('--sidebar-current-width')
    }
}

const sidebarState = reactive({
    isOpen: false,
    isExpanded: loadExpandedState(),
    initialized: false,
    isMobile: false
})

export function useSidebar(breakpoint) {
    const deviceStore = useDeviceStore()

    // Если параметр не передан - используем общий стандарт deviceStore.isMobile
    // Если передан - создаем кастомный isMobile на основе переданного breakpoint
    const isMobile = breakpoint
        ? computed(() => deviceStore.isBreakpointDown(breakpoint))
        : computed(() => deviceStore.isMobile)

    const initializeSidebar = () => {
        if (sidebarState.initialized) return

        deviceStore.checkDevice()

        // Обновляем isMobile в sidebarState
        sidebarState.isMobile = isMobile.value

        if (isMobile.value) {
            sidebarState.isOpen = false
            sidebarState.isExpanded = false
            updateBodySidebarState(false, '0px')
        } else {
            sidebarState.isOpen = true
            // 🔥 Сразу устанавливаем data-attribute
            const width = getCurrentSidebarWidth(sidebarState.isExpanded)
            updateBodySidebarState(true, width)
        }

        sidebarState.initialized = true
    }

    initializeSidebar()

    // 🔥 При изменении isExpanded обновляем ширину
    watch(() => sidebarState.isExpanded, (newExpanded) => {
        if (!isMobile.value) {
            saveExpandedState(newExpanded)
            // Обновляем ширину если sidebar открыт
            if (sidebarState.isOpen) {
                const width = getCurrentSidebarWidth(newExpanded)
                updateBodySidebarState(true, width)
            }
        }
    })

    // 🔥 При открытии сразу применяем offset
    watch(() => sidebarState.isOpen, (isOpen) => {
        if (isOpen) {
            const width = getCurrentSidebarWidth(sidebarState.isExpanded)
            updateBodySidebarState(true, width)
        }
        // При закрытии НЕ трогаем - будет обработано в handleBeforeHide
    })

    watch(() => isMobile.value, (newIsMobile, oldIsMobile) => {
        if (newIsMobile !== oldIsMobile) {
            // Обновляем isMobile в sidebarState
            sidebarState.isMobile = newIsMobile

            if (newIsMobile) {
                sidebarState.isOpen = false
                sidebarState.isExpanded = false
                updateBodySidebarState(false, '0px')
            } else {
                sidebarState.isOpen = true
                sidebarState.isExpanded = loadExpandedState()
                const width = getCurrentSidebarWidth(sidebarState.isExpanded)
                updateBodySidebarState(true, width)
            }
        }
    }, {immediate: false})

    const isOpen = computed(() => sidebarState.isOpen)
    const isExpanded = computed(() => sidebarState.isExpanded)

    // Локальная функция toggleExpansion, использующая локальный isMobile
    const toggleExpansion = () => {
        if (!isMobile.value) {
            sidebarState.isExpanded = !sidebarState.isExpanded
            saveExpandedState(sidebarState.isExpanded)
        }
    }

    const toggleSidebar = () => {
        if (isMobile.value) {
            sidebarState.isOpen = !sidebarState.isOpen
        } else {
            sidebarState.isExpanded = !sidebarState.isExpanded
            saveExpandedState(sidebarState.isExpanded)
        }
    }

    return {
        isOpen,
        isExpanded,
        isMobile,
        sidebarState,
        toggleExpansion,
        toggleSidebar
    }
}

export function toggleVisibility() {
    sidebarState.isOpen = !sidebarState.isOpen
}

export function closeSidebar() {
    sidebarState.isOpen = false
}

// Standalone toggleExpansion для обратной совместимости
// Использует sidebarState.isMobile (текущую активную логику)
export function toggleExpansion() {
    if (!sidebarState.isMobile) {
        sidebarState.isExpanded = !sidebarState.isExpanded
        saveExpandedState(sidebarState.isExpanded)
    }
}

export function toggleSidebar() {
    if (sidebarState.isMobile) {
        sidebarState.isOpen = !sidebarState.isOpen
    } else {
        sidebarState.isExpanded = !sidebarState.isExpanded
        saveExpandedState(sidebarState.isExpanded)
    }
}

// 🔥 НОВАЯ функция: вызывается ПЕРЕД началом анимации закрытия
export function handleBeforeHide() {
    // Убираем offset ВМЕСТЕ с началом анимации закрытия
    updateBodySidebarState(false, '0px')
}

