/**
 * Composable для управления состоянием сайдбара
 * Поддерживает адаптивное поведение для мобильных и десктопных устройств
 * Автоматически сохраняет состояние expansion в localStorage
 */
import { reactive, computed, watch } from 'vue'
import { useDeviceStore } from '@/stores/device'

// Константы
export const SIDEBAR = 'SIDEBAR'
const STORAGE_KEY = 'sidebar-expanded'

/**
 * Загружает сохраненное состояние expansion из localStorage
 * @returns {boolean} Состояние expansion или false по умолчанию
 */
const loadExpandedState = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        return saved !== null ? JSON.parse(saved) : false
    } catch (error) {
        console.warn('Failed to load sidebar state from localStorage:', error)
        return false
    }
}

/**
 * Сохраняет состояние expansion в localStorage
 * @param {boolean} isExpanded - Состояние expansion для сохранения
 */
const saveExpandedState = (isExpanded) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(isExpanded))
    } catch (error) {
        console.warn('Failed to save sidebar state to localStorage:', error)
    }
}

// Кэш для CSS переменных ширины сайдбара (оптимизация)
let sidebarWidthCache = null

/**
 * Получает значения ширины сайдбара из CSS переменных с кэшированием
 * @returns {Object} Объект с expanded и minimized ширинами
 */
const getSidebarWidth = () => {
    if (!sidebarWidthCache) {
        const computedStyle = getComputedStyle(document.documentElement)
        sidebarWidthCache = {
            expanded: computedStyle.getPropertyValue('--sidebar-width').trim(),
            minimized: computedStyle.getPropertyValue('--sidebar-minimized-width').trim()
        }
    }
    return sidebarWidthCache
}

/**
 * Получает текущую ширину сайдбара в зависимости от состояния expansion
 * @param {boolean} isExpanded - Состояние expansion
 * @returns {string} Ширина сайдбара в CSS единицах
 */
const getCurrentSidebarWidth = (isExpanded) => {
    const { expanded, minimized } = getSidebarWidth()
    return isExpanded ? expanded : minimized
}

/**
 * Управляет CSS переменной для offset контента под ширину сайдбара
 * @param {boolean} shouldOffset - Нужно ли применять offset
 * @param {string} width - Ширина для offset в CSS единицах
 */
const updateBodySidebarState = (shouldOffset, width) => {
    if (shouldOffset) {
        document.body.style.setProperty('--sidebar-current-width', width)
    } else {
        document.body.style.removeProperty('--sidebar-current-width')
    }
}

// Глобальное реактивное состояние сайдбара (singleton)
const sidebarState = reactive({
    isOpen: false,                    // Открыт/закрыт (для мобильных)
    isExpanded: loadExpandedState(),  // Развернут/свернут (для десктопа)
    initialized: false,               // Флаг инициализации
    isMobile: false                   // Кэш текущего типа устройства
})

/**
 * Основной composable для управления сайдбаром
 * @param {string} [breakpoint] - Кастомный breakpoint для определения мобильного устройства
 * @returns {Object} Объект с состоянием и методами управления сайдбаром
 */
export function useSidebar(breakpoint) {
    const deviceStore = useDeviceStore()

    // Определяем логику isMobile в зависимости от переданного параметра
    const isMobile = breakpoint
        ? computed(() => deviceStore.isBreakpointDown(breakpoint))
        : computed(() => deviceStore.isMobile)

    /**
     * Инициализирует состояние сайдбара при первом вызове
     * Устанавливает начальные значения в зависимости от типа устройства
     */
    const initializeSidebar = () => {
        if (sidebarState.initialized) return

        // Проверяем текущий размер экрана
        deviceStore.checkDevice()
        sidebarState.isMobile = isMobile.value

        if (isMobile.value) {
            // Мобильное устройство: закрыт и свернут
            sidebarState.isOpen = false
            sidebarState.isExpanded = false
            updateBodySidebarState(false, '0px')
        } else {
            // Десктопное устройство: открыт, состояние expansion из localStorage
            sidebarState.isOpen = true
            const width = getCurrentSidebarWidth(sidebarState.isExpanded)
            updateBodySidebarState(true, width)
        }

        sidebarState.initialized = true
    }

    initializeSidebar()

    // Watcher: отслеживает изменения expansion состояния
    watch(() => sidebarState.isExpanded, (newExpanded) => {
        if (!isMobile.value) {
            // Сохраняем состояние только на десктопе
            saveExpandedState(newExpanded)

            // Обновляем ширину offset только если sidebar открыт
            if (sidebarState.isOpen) {
                const width = getCurrentSidebarWidth(newExpanded)
                updateBodySidebarState(true, width)
            }
        }
    })

    // Watcher: отслеживает открытие/закрытие сайдбара
    watch(() => sidebarState.isOpen, (isOpen) => {
        if (isOpen) {
            // При открытии сразу применяем offset с текущей шириной
            const width = getCurrentSidebarWidth(sidebarState.isExpanded)
            updateBodySidebarState(true, width)
        }
        // При закрытии НЕ убираем offset - это делает handleBeforeHide для плавной анимации
    })

    // Watcher: отслеживает переключение между мобильным и десктопным режимами
    watch(() => isMobile.value, (newIsMobile, oldIsMobile) => {
        if (newIsMobile !== oldIsMobile) {
            // Обновляем кэш типа устройства
            sidebarState.isMobile = newIsMobile

            if (newIsMobile) {
                // Переход на мобильное: закрываем и сворачиваем
                sidebarState.isOpen = false
                sidebarState.isExpanded = false
                updateBodySidebarState(false, '0px')
            } else {
                // Переход на десктоп: открываем и восстанавливаем expansion из localStorage
                sidebarState.isOpen = true
                sidebarState.isExpanded = loadExpandedState()
                const width = getCurrentSidebarWidth(sidebarState.isExpanded)
                updateBodySidebarState(true, width)
            }
        }
    }, { immediate: false })

    // Computed свойства для реактивного доступа к состоянию
    const isOpen = computed(() => sidebarState.isOpen)
    const isExpanded = computed(() => sidebarState.isExpanded)

    /**
     * Переключает состояние expansion сайдбара (только на десктопе)
     * На мобильных устройствах не выполняет никаких действий
     */
    const toggleExpansion = () => {
        if (!isMobile.value) {
            sidebarState.isExpanded = !sidebarState.isExpanded
            saveExpandedState(sidebarState.isExpanded)
        }
    }

    /**
     * Универсальная функция переключения сайдбара
     * - На мобильных: переключает видимость (isOpen)
     * - На десктопе: переключает expansion (isExpanded)
     */
    const toggleSidebar = () => {
        if (isMobile.value) {
            sidebarState.isOpen = !sidebarState.isOpen
        } else {
            sidebarState.isExpanded = !sidebarState.isExpanded
            saveExpandedState(sidebarState.isExpanded)
        }
    }

    // Возвращаем API composable
    return {
        isOpen,           // Computed: состояние открыт/закрыт
        isExpanded,       // Computed: состояние развернут/свернут
        isMobile,         // Computed: тип устройства
        sidebarState,     // Reactive: прямой доступ к состоянию
        toggleExpansion,  // Function: переключение expansion
        toggleSidebar     // Function: универсальное переключение
    }
}

// === ГЛОБАЛЬНЫЕ УТИЛИТАРНЫЕ ФУНКЦИИ ===

/**
 * Переключает видимость сайдбара
 * Универсальная функция для быстрого доступа без создания экземпляра composable
 * Поведение зависит от текущего типа устройства:
 * - На мобильных: переключает isOpen
 * - На десктопе: переключает isExpanded (для обратной совместимости)
 */
export function toggleVisibility() {
    if (sidebarState.isMobile) {
        sidebarState.isOpen = !sidebarState.isOpen
    } else {
        sidebarState.isExpanded = !sidebarState.isExpanded
        saveExpandedState(sidebarState.isExpanded)
    }
}

/**
 * Закрывает сайдбар (устанавливает isOpen в false)
 * Используется для принудительного закрытия, например при навигации
 */
export function closeSidebar() {
    sidebarState.isOpen = false
}

/**
 * Обработчик события перед началом анимации закрытия drawer
 * Убирает CSS offset синхронно с началом анимации для плавного эффекта
 * Должен вызываться в обработчике @hide или @before-hide события drawer
 */
export function handleBeforeHide() {
    updateBodySidebarState(false, '0px')
}

