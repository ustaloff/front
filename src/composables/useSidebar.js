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

// 🔥 Кэшированные размеры сайдбара из CSS переменных
let cachedSidebarWidths = null

const getSidebarWidth = () => {
    if (!cachedSidebarWidths) {
        const expanded = getComputedStyle(document.documentElement)
            .getPropertyValue('--sidebar-width').trim()
        const minimized = getComputedStyle(document.documentElement)
            .getPropertyValue('--sidebar-minimized-width').trim()

        cachedSidebarWidths = {expanded, minimized}
    }
    return cachedSidebarWidths
}

// 🔥 Утилитарная функция для получения текущей ширины сайдбара
const getCurrentSidebarWidth = (isExpanded) => {
    const {expanded, minimized} = getSidebarWidth()
    return isExpanded ? expanded : minimized
}

// 🔥 Функция для управления data-attribute на body
const updateBodySidebarState = (shouldOffset, width) => {
    if (shouldOffset) {
        document.body.setAttribute('data-sidebar-offset', 'true')
        document.body.style.setProperty('--sidebar-current-width', width)
    } else {
        document.body.removeAttribute('data-sidebar-offset')
        document.body.style.removeProperty('--sidebar-current-width')
    }
}

const sidebarState = reactive({
    isOpen: false,
    isExpanded: loadExpandedState(),
    initialized: false
})

export function useSidebar() {
    const deviceStore = useDeviceStore()

    const initializeSidebar = () => {
        if (sidebarState.initialized) return

        deviceStore.checkDevice()

        if (deviceStore.isMobile.value) {
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
        if (!deviceStore.isMobile.value) {
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

    watch(() => deviceStore.isMobile.value, (newIsMobile, oldIsMobile) => {
        if (newIsMobile !== oldIsMobile) {
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
    const isMobile = computed(() => deviceStore.isMobile)

    return {
        isOpen,
        isExpanded,
        isMobile,
        sidebarState
    }
}

export function toggleVisibility() {
    sidebarState.isOpen = !sidebarState.isOpen
}

export function closeSidebar() {
    sidebarState.isOpen = false
}

export function toggleExpansion() {
    const deviceStore = useDeviceStore()

    if (!deviceStore.isMobile.value) {
        sidebarState.isExpanded = !sidebarState.isExpanded
        saveExpandedState(sidebarState.isExpanded)
    }
}

// 🔥 НОВАЯ функция: вызывается ПЕРЕД началом анимации закрытия
export function handleBeforeHide() {
    // Убираем offset ВМЕСТЕ с началом анимации закрытия
    updateBodySidebarState(false, '0px')
}

// 🔥 Функция для сброса кэша размеров (если CSS переменные изменились)
export function resetSidebarWidthCache() {
    cachedSidebarWidths = null
}