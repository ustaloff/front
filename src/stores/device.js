import {defineStore} from 'pinia'
import {ref, computed, onUnmounted} from 'vue'

export const useDeviceStore = defineStore('device', () => {
    const screenWidth = ref(window.innerWidth)

    // Реактивное свойство для хранения брейкпоинтов
    const breakpoints = ref({})


    // Computed свойства для каждого брейкпоинта
    const isXs = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.xs && screenWidth.value < bp.sm
    })

    const isSm = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.sm && screenWidth.value < bp.md
    })

    const isMd = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.md && screenWidth.value < bp.lg
    })

    const isLg = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.lg && screenWidth.value < bp.xl
    })

    const isXl = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.xl && screenWidth.value < bp.xxl
    })

    const isXxl = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.xxl
    })

    // Computed свойство для получения названия активного брейкпоинта
    const currentBreakpoint = computed(() => {
        if (isXs.value) return 'xs'
        if (isSm.value) return 'sm'
        if (isMd.value) return 'md'
        if (isLg.value) return 'lg'
        if (isXl.value) return 'xl'
        if (isXxl.value) return 'xxl'
        // Fallback для случаев когда ширина меньше xs
        return 'xs'
    })

    // Функция для загрузки брейкпоинтов из CSS переменных
    const loadBreakpointsFromCSS = () => {
        const style = getComputedStyle(document.documentElement)
        return {
            xs: parseInt(style.getPropertyValue('--breakpoint-xs')) || 375,
            sm: parseInt(style.getPropertyValue('--breakpoint-sm')) || 576,
            md: parseInt(style.getPropertyValue('--breakpoint-md')) || 768,
            lg: parseInt(style.getPropertyValue('--breakpoint-lg')) || 1024,
            xl: parseInt(style.getPropertyValue('--breakpoint-xl')) || 1280,
            xxl: parseInt(style.getPropertyValue('--breakpoint-xxl')) || 1440
        }
    }

    // Метод для инициализации брейкпоинтов
    const initBreakpoints = () => {
        breakpoints.value = loadBreakpointsFromCSS()
    }

    // Порядок брейкпоинтов для утилитарных методов
    const BREAKPOINT_ORDER = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

    // Инициализируем брейкпоинты при создании store
    initBreakpoints()

    let resizeTimeout = null
    let listenersInitialized = false

    // Функция для обновления размеров экрана
    const checkDevice = () => {
        screenWidth.value = window.innerWidth
    }

    // Debounced версия для resize events
    const debouncedCheckDevice = () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout)
        }
        resizeTimeout = setTimeout(checkDevice, 100)
    }

    // Обработчик для orientationchange с задержкой
    const handleOrientationChange = () => {
        // Небольшая задержка для корректного получения новых размеров после поворота
        setTimeout(checkDevice, 100)
    }

    // Инициализация слушателей событий
    const initResizeListener = () => {
        if (!listenersInitialized) {
            // Инициализируем брейкпоинты при первом запуске
            initBreakpoints()

            window.addEventListener('resize', debouncedCheckDevice)
            window.addEventListener('orientationchange', handleOrientationChange)
            listenersInitialized = true
        }
    }

    // Очистка слушателей
    const cleanupListeners = () => {
        if (listenersInitialized) {
            window.removeEventListener('resize', debouncedCheckDevice)
            window.removeEventListener('orientationchange', handleOrientationChange)
            listenersInitialized = false
        }

        if (resizeTimeout) {
            clearTimeout(resizeTimeout)
        }
    }

    // Утилитарные методы для работы с брейкпоинтами
    const isBreakpointUp = (breakpoint) => {
        if (!BREAKPOINT_ORDER.includes(breakpoint)) {
            console.warn(`Invalid breakpoint: ${breakpoint}`)
            return false
        }

        const currentBpIndex = BREAKPOINT_ORDER.findIndex(bpName => currentBreakpoint.value === bpName)
        const targetBpIndex = BREAKPOINT_ORDER.findIndex(bpName => bpName === breakpoint)

        return currentBpIndex >= targetBpIndex
    }

    const isBreakpointDown = (breakpoint) => {
        if (!BREAKPOINT_ORDER.includes(breakpoint)) {
            console.warn(`Invalid breakpoint: ${breakpoint}`)
            return false
        }

        const bp = breakpoints.value
        return screenWidth.value < bp[breakpoint]
    }

    const isBreakpointBetween = (min, max) => {
        if (!BREAKPOINT_ORDER.includes(min) || !BREAKPOINT_ORDER.includes(max)) {
            console.warn(`Invalid breakpoint range: ${min} - ${max}`)
            return false
        }

        const minIndex = BREAKPOINT_ORDER.findIndex(bp => bp === min)
        const maxIndex = BREAKPOINT_ORDER.findIndex(bp => bp === max)

        if (minIndex > maxIndex) {
            console.warn(`Invalid breakpoint range: ${min} should be smaller than ${max}`)
            return false
        }

        const bp = breakpoints.value
        return screenWidth.value >= bp[min] && screenWidth.value < bp[max]
    }

    // Определяем мобильное устройство используя breakpoint систему (< 768px)
    const isMobile = computed(() => isBreakpointDown('md'))

    // Очистка при размонтировании (для случаев, когда store уничтожается)
    onUnmounted(() => {
        cleanupListeners()
    })

    return {
        screenWidth,
        isMobile,
        breakpoints,
        isXs,
        isSm,
        isMd,
        isLg,
        isXl,
        isXxl,
        currentBreakpoint,
        checkDevice,
        initResizeListener,
        initBreakpoints,
        cleanupListeners,
        isBreakpointUp,
        isBreakpointDown,
        isBreakpointBetween
    }
})