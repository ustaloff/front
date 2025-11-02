import {defineStore} from 'pinia'
import {ref, computed, onUnmounted} from 'vue'

export const useDeviceStore = defineStore('device', () => {
    const screenWidth = ref(window.innerWidth)

    // Определяем мобильное устройство по breakpoint 801px
    const isMobile = computed(() => screenWidth.value < 801)

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

    // Очистка при размонтировании (для случаев, когда store уничтожается)
    onUnmounted(() => {
        cleanupListeners()
    })

    return {
        screenWidth,
        isMobile,
        checkDevice,
        initResizeListener,
        cleanupListeners
    }
})