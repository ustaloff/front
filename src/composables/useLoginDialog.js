import { ref } from 'vue'

const isLoginDialogOpen = ref(false)

export function useLoginDialog() {
    const openLoginDialog = () => {
        isLoginDialogOpen.value = true
    }

    const closeLoginDialog = () => {
        isLoginDialogOpen.value = false
    }

    return {
        isLoginDialogOpen,
        openLoginDialog,
        closeLoginDialog
    }
}
