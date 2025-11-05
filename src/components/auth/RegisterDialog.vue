<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRegisterDialog } from '@/composables/useRegisterDialog'
import { useLoginDialog } from '@/composables/useLoginDialog'
import { registerResolver } from '@/utils/validation'

const auth = useAuthStore()
const router = useRouter()
const { isRegisterDialogOpen, closeRegisterDialog } = useRegisterDialog()
const { openLoginDialog } = useLoginDialog()

const submit = async ({ valid, states }) => {
    console.log('🔄 Register Submit - valid:', valid);

    if (!valid) {
        console.log('❌ Форма регистрации не прошла валидацию');
        return;
    }

    // Извлекаем данные из states (как в официальном примере)
    const name = states.name.value;
    const email = states.email.value;
    const password = states.password.value;
    const passwordConfirmation = states.passwordConfirmation.value;

    console.log('📝 Register data:', { name, email, password, passwordConfirmation });

    if (!name || !email || !password || !passwordConfirmation) {
        console.log('❌ Отсутствуют данные формы регистрации');
        return;
    }

    // Clear any previous errors before attempting registration
    auth.clearAllErrors()

    try {
        await auth.register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
        if (!auth.hasGlobalError()) {
            closeRegisterDialog()
        }
    } catch (error) {
        // Error is handled by the auth store and displayed in this component
    }
}

const onDialogClose = () => {
    auth.clearAllErrors()
}

const handleLoginClick = () => {
    auth.clearAllErrors()
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
        <Form v-slot="$form" :resolver="registerResolver" @submit="submit" class="p-4">
            <Message v-if="auth.hasGlobalError()" severity="error" :closable="false" class="mb-4">
                {{ auth.getGlobalMessage() }}
            </Message>

            <div class="mb-4">
                <FormField name="name" v-slot="$field">
                    <IftaLabel>
                        <InputText
                            id="name-dialog"
                            v-model="$field.value"
                            type="text"
                            autocomplete="name"
                            class="w-full"
                            variant="filled"
                        />
                        <label for="name-dialog">Имя</label>
                    </IftaLabel>
                    <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple" class="mt-1">
                        {{ $form.name.error.message }}
                    </Message>
                </FormField>
            </div>
            <div class="mb-4">
                <FormField name="email" v-slot="$field">
                    <IftaLabel>
                        <InputText
                            id="email-register-dialog"
                            v-model="$field.value"
                            type="text"
                            autocomplete="email"
                            class="w-full"
                            variant="filled"
                            :invalid="$form.email?.invalid"
                        />
                        <label for="email-register-dialog">Email</label>
                    </IftaLabel>
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple" class="mt-1">
                        {{ $form.email.error.message }}
                    </Message>
                </FormField>
            </div>
            <div class="mb-4">
                <FormField name="password" v-slot="$field">
                    <IftaLabel>
                        <InputText
                            id="password-register-dialog"
                            v-model="$field.value"
                            type="password"
                            autocomplete="new-password"
                            class="w-full"
                            variant="filled"
                        />
                        <label for="password-register-dialog">Пароль</label>
                    </IftaLabel>
                    <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple" class="mt-1">
                        {{ $form.password.error.message }}
                    </Message>
                </FormField>
            </div>
            <div class="mb-6">
                <FormField name="passwordConfirmation" v-slot="$field">
                    <IftaLabel>
                        <InputText
                            id="password-confirmation-dialog"
                            v-model="$field.value"
                            type="password"
                            autocomplete="new-password"
                            class="w-full"
                            variant="filled"
                        />
                        <label for="password-confirmation-dialog">Подтверждение пароля</label>
                    </IftaLabel>
                    <Message v-if="$form.passwordConfirmation?.invalid" severity="error" size="small" variant="simple"
                             class="mt-1">
                        {{ $form.passwordConfirmation.error.message }}
                    </Message>
                </FormField>
            </div>
            <Button
                type="submit"
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