<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'
import {useRegisterDialog} from '@/composables/useRegisterDialog'
import {useLoginDialog} from '@/composables/useLoginDialog'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const auth = useAuthStore()
const router = useRouter()
const {isRegisterDialogOpen, closeRegisterDialog} = useRegisterDialog()
const {openLoginDialog} = useLoginDialog()

const submit = async () => {
    try {
        await auth.register({
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: passwordConfirmation.value,
        })
        if (!auth.hasError) {
            closeRegisterDialog()
            //router.push('/')
        }
    } catch (error) {
        // Error is handled by the auth store and displayed in this component
    }
}

const onDialogClose = () => {
    auth.clearError()
}

const handleLoginClick = () => {
    closeRegisterDialog()
    openLoginDialog()
}
</script>

<template>
    <Dialog
        v-model:visible="isRegisterDialogOpen"
        :modal="true" :dismissable-mask="true"
        header="Регистрация"
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
                        id="name-dialog"
                        v-model="name"
                        type="text"
                        autocomplete="name"
                        required
                        class="w-full"
                        variant="filled"
                    />
                    <label for="name-dialog">Имя</label>
                </IftaLabel>
            </div>
            <div class="mb-4">
                <IftaLabel>
                    <InputText
                        id="email-register-dialog"
                        v-model="email"
                        type="email"
                        autocomplete="email"
                        required
                        class="w-full"
                        variant="filled"
                    />
                    <label for="email-register-dialog">Email</label>
                </IftaLabel>
            </div>
            <div class="mb-4">
                <IftaLabel>
                    <InputText
                        id="password-register-dialog"
                        v-model="password"
                        type="password"
                        autocomplete="new-password"
                        required
                        class="w-full"
                        variant="filled"
                    />
                    <label for="password-register-dialog">Пароль</label>
                </IftaLabel>
            </div>
            <div class="mb-6">
                <IftaLabel>
                    <InputText
                        id="password-confirmation-dialog"
                        v-model="passwordConfirmation"
                        type="password"
                        autocomplete="new-password"
                        required
                        class="w-full"
                        variant="filled"
                    />
                    <label for="password-confirmation-dialog">Пароль</label>
                </IftaLabel>
            </div>
            <Button
                @click="submit"
                label="Зарегистрироваться"
                class="w-full mt-4"
                :loading="auth.isLoading"
                :disabled="auth.isLoading"
            />
        </Form>
        <div class="text-center mt-4">
            <Button @click="handleLoginClick" variant="link">
                Уже есть аккаунт? Войти
            </Button>
        </div>
    </Dialog>
</template>