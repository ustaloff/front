<script setup>
import {ref} from 'vue'
import {useAuthStore} from '@/stores/auth'
import {useLoginDialog} from '@/composables/useLoginDialog'
import {useRegisterDialog} from '@/composables/useRegisterDialog'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const {isLoginDialogOpen, closeLoginDialog} = useLoginDialog()
const {openRegisterDialog} = useRegisterDialog()

const submit = async () => {
    try {
        await auth.login(email.value, password.value)
        if (!auth.hasError) {
            closeLoginDialog()
        }
    } catch (e) {
        // Error is handled by the auth store and displayed in the ErrorDialog
    }
}

const onDialogClose = () => {
    auth.clearError()
}

const handleRegisterClick = () => {
    closeLoginDialog()
    openRegisterDialog()
}
</script>

<template>
    <Dialog
        v-model:visible="isLoginDialogOpen"
        :modal="true" :dismissable-mask="true"
        header="Вход в систему"
        :style="{ width: '25rem' }"
        @after-hide="onDialogClose"
    >
        <Form @submit="submit" class="p-4">
            <Message v-if="auth.hasError" severity="error" :closable="false">
                {{ auth.errorMessage }}
            </Message>

            <div class="mb-4">
                <IftaLabel>
                    <InputText
                        id="email-dialog"
                        v-model="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="w-full"
                        variant="filled"
                    />
                    <label for="email-dialog">Email</label>
                </IftaLabel>
            </div>
            <div class="mb-6">
                <IftaLabel>
                    <InputText
                        id="password-dialog"
                        v-model="password"
                        type="password"
                        autocomplete="current-password"
                        required
                        class="w-full"
                        variant="filled"
                    />
                    <label for="password-dialog">Пароль</label>
                </IftaLabel>
            </div>

            <Button
                @click="submit"
                label="Войти"
                class="w-full mt-4"
                :loading="auth.isLoading"
                :disabled="auth.isLoading"
            />
        </Form>
        <div class="text-center mt-4">
            <Button @click="handleRegisterClick" variant="link">
                Нет аккаунта? Зарегистрироваться
            </Button>
        </div>
    </Dialog>
</template>