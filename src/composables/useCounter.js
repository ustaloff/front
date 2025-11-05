import { ref, computed } from 'vue'

export function useCounter(initialValue = 0, step = 1) {
    const count = ref(initialValue)

    const increment = () => {
        count.value += step
    }

    const decrement = () => {
        count.value -= step
    }

    const reset = () => {
        count.value = initialValue
    }

    const set = (value) => {
        count.value = value
    }

    const isZero = computed(() => count.value === 0)
    const isPositive = computed(() => count.value > 0)
    const isNegative = computed(() => count.value < 0)

    return {
        count,
        increment,
        decrement,
        reset,
        set,
        isZero,
        isPositive,
        isNegative
    }
}