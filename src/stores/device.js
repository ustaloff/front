/**
 * Pinia store для управления информацией об устройстве и breakpoints
 */
import { defineStore } from 'pinia'
import { ref, computed, onUnmounted } from 'vue'
import { TIMEOUTS } from '@/config'

// Константы
const RESIZE_DEBOUNCE_DELAY = TIMEOUTS.DEBOUNCE_RESIZE
const BREAKPOINT_ORDER = ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl']

// Fallback значения если CSS переменные недоступны
const DEFAULT_BREAKPOINTS = {
    xs: 375,
    sm: 576,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1440
}

/**
 * Загружает breakpoints из CSS переменных
 */
const loadBreakpointsFromCSS = () => {
    try {
        const style = getComputedStyle(document.documentElement)
        return {
            xs: parseInt(style.getPropertyValue('--breakpoint-xs')) || DEFAULT_BREAKPOINTS.xs,
            sm: parseInt(style.getPropertyValue('--breakpoint-sm')) || DEFAULT_BREAKPOINTS.sm,
            md: parseInt(style.getPropertyValue('--breakpoint-md')) || DEFAULT_BREAKPOINTS.md,
            lg: parseInt(style.getPropertyValue('--breakpoint-lg')) || DEFAULT_BREAKPOINTS.lg,
            xl: parseInt(style.getPropertyValue('--breakpoint-xl')) || DEFAULT_BREAKPOINTS.xl,
            xxl: parseInt(style.getPropertyValue('--breakpoint-xxl')) || DEFAULT_BREAKPOINTS.xxl
        }
    } catch (error) {
        console.warn('Failed to load breakpoints from CSS, using defaults:', error)
        return DEFAULT_BREAKPOINTS
    }
}

export const useDeviceStore = defineStore('device', () => {
    // === СОСТОЯНИЕ ===

    const screenWidth = ref(window.innerWidth)
    const breakpoints = ref(loadBreakpointsFromCSS())

    // === COMPUTED СВОЙСТВА ===

    /**
     * XXS: все что меньше 375px (0-374px)
     */
    const isXxs = computed(() => {
        return screenWidth.value < breakpoints.value.xs
    })

    /**
     * XS: 375-575px
     */
    const isXs = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.xs && screenWidth.value < bp.sm
    })

    /**
     * SM: 576-767px
     */
    const isSm = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.sm && screenWidth.value < bp.md
    })

    /**
     * MD: 768-1023px
     */
    const isMd = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.md && screenWidth.value < bp.lg
    })

    /**
     * LG: 1024-1279px
     */
    const isLg = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.lg && screenWidth.value < bp.xl
    })

    /**
     * XL: 1280-1439px
     */
    const isXl = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.xl && screenWidth.value < bp.xxl
    })

    /**
     * XXL: 1440px+
     */
    const isXxl = computed(() => {
        const bp = breakpoints.value
        return screenWidth.value >= bp.xxl
    })

    /**
     * Текущий breakpoint
     */
    const currentBreakpoint = computed(() => {
        if (isXxs.value) return 'xxs'
        if (isXs.value) return 'xs'
        if (isSm.value) return 'sm'
        if (isMd.value) return 'md'
        if (isLg.value) return 'lg'
        if (isXl.value) return 'xl'
        if (isXxl.value) return 'xxl'
        return 'xs'
    })

    /**
     * Мобильное устройство (< 768px)
     */
    const isMobile = computed(() => screenWidth.value < breakpoints.value.md)

    // === МЕТОДЫ ===

    /**
     * Обновляет размер экрана
     */
    const checkDevice = () => {
        screenWidth.value = window.innerWidth
    }

    /**
     * Обновляет breakpoints из CSS переменных
     */
    const updateBreakpoints = () => {
        breakpoints.value = loadBreakpointsFromCSS()
    }

    /**
     * Debounced версия checkDevice
     */
    let resizeTimeout = null
    const debouncedCheckDevice = () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout)
        }
        resizeTimeout = setTimeout(checkDevice, RESIZE_DEBOUNCE_DELAY)
    }

    /**
     * Проверяет breakpoint >= указанного
     */
    const isBreakpointUp = (breakpoint) => {
        if (!BREAKPOINT_ORDER.includes(breakpoint)) {
            console.warn(`Invalid breakpoint: ${breakpoint}`)
            return false
        }

        const currentIndex = BREAKPOINT_ORDER.findIndex(bp => currentBreakpoint.value === bp)
        const targetIndex = BREAKPOINT_ORDER.findIndex(bp => bp === breakpoint)

        return currentIndex >= targetIndex
    }

    /**
     * Проверяет ширину < breakpoint
     */
    const isBreakpointDown = (breakpoint) => {
        if (!BREAKPOINT_ORDER.includes(breakpoint)) {
            console.warn(`Invalid breakpoint: ${breakpoint}`)
            return false
        }

        const bp = breakpoints.value
        return screenWidth.value < bp[breakpoint]
    }

    /**
     * Проверяет ширину между breakpoints
     */
    const isBreakpointBetween = (min, max) => {
        if (!BREAKPOINT_ORDER.includes(min) || !BREAKPOINT_ORDER.includes(max)) {
            console.warn(`Invalid breakpoint range: ${min} - ${max}`)
            return false
        }

        const bp = breakpoints.value
        return screenWidth.value >= bp[min] && screenWidth.value < bp[max]
    }

    // === EVENT LISTENERS ===

    let listenersInitialized = false

    const initResizeListener = () => {
        if (!listenersInitialized) {
            window.addEventListener('resize', debouncedCheckDevice, { passive: true })
            window.addEventListener('orientationchange', checkDevice, { passive: true })
            listenersInitialized = true
        }
    }

    const cleanupListeners = () => {
        if (listenersInitialized) {
            window.removeEventListener('resize', debouncedCheckDevice)
            window.removeEventListener('orientationchange', checkDevice)
            listenersInitialized = false
        }

        if (resizeTimeout) {
            clearTimeout(resizeTimeout)
            resizeTimeout = null
        }
    }

    // Автоматическая очистка при размонтировании
    onUnmounted(() => {
        cleanupListeners()
    })

    // === ПУБЛИЧНЫЙ API ===

    return {
        // Состояние
        screenWidth,
        breakpoints,

        // Тип устройства
        isMobile,
        currentBreakpoint,

        // Конкретные breakpoints
        isXxs,  // < 375px
        isXs,   // 375-575px
        isSm,   // 576-767px
        isMd,   // 768-1023px
        isLg,   // 1024-1279px
        isXl,   // 1280-1439px
        isXxl,  // 1440px+

        // Методы
        checkDevice,
        updateBreakpoints,
        initResizeListener,
        cleanupListeners,
        isBreakpointUp,
        isBreakpointDown,
        isBreakpointBetween
    }
})