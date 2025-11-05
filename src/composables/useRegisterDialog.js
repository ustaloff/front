import { ref } from 'vue'

const isRegisterDialogOpen = ref(false)

export function useRegisterDialog() {
    const openRegisterDialog = () => {
        isRegisterDialogOpen.value = true
    }

    const closeRegisterDialog = () => {
        isRegisterDialogOpen.value = false
    }

    return {
        isRegisterDialogOpen,
        openRegisterDialog,
        closeRegisterDialog
    }
}
