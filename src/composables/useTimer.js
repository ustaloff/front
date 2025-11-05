import { ref, computed, onUnmounted } from 'vue'

export function useTimer(initialTime = 0, interval = 1000) {
    const time = ref(initialTime)
    const isRunning = ref(false)
    let intervalId = null

    const formattedTime = computed(() => {
        const minutes = Math.floor(time.value / 60)
        const seconds = time.value % 60
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    const start = () => {
        if (!isRunning.value) {
            isRunning.value = true
            intervalId = setInterval(() => {
                time.value++
            }, interval)
        }
    }

    const stop = () => {
        if (isRunning.value) {
            isRunning.value = false
            clearInterval(intervalId)
            intervalId = null
        }
    }

    const reset = () => {
        stop()
        time.value = initialTime
    }

    const setTime = (newTime) => {
        time.value = newTime
    }

    // Очистка при размонтировании компонента
    onUnmounted(() => {
        if (intervalId) {
            clearInterval(intervalId)
        }
    })

    return {
        time,
        formattedTime,
        isRunning,
        start,
        stop,
        reset,
        setTime
    }
}