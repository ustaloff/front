<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLoginDialog } from '@/composables/useLoginDialog'
import { useRegisterDialog } from '@/composables/useRegisterDialog'
import { loginResolver } from '@/utils/validation'

const auth = useAuthStore()
const { isLoginDialogOpen, closeLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()

const submit = async ({ valid, states }) => {
    console.log('🔄 Submit - valid:', valid);

    if (!valid) {
        console.log('❌ Форма не прошла валидацию');
        return;
    }

    // Извлекаем данные из states (как в официальном примере)
    const email = states.email.value;
    const password = states.password.value;

    console.log('📝 Extracted data:', { email, password });

    if (!email || !password) {
        console.log('❌ Отсутствуют данные формы');
        return;
    }

    // Clear errors when new login attempt is initiated
    auth.clearAllErrors()

    try {
        await auth.login(email, password)
        if (!auth.hasGlobalError()) {
            closeLoginDialog()
        }
    } catch (e) {
        // Error is handled by the auth store and displayed in the global message area
    }
}

const onDialogClose = () => {
    // Ensure global errors are cleared when dialog closes
    auth.clearAllErrors()
}

const handleRegisterClick = () => {
    // Clear errors when switching between dialogs
    auth.clearAllErrors()
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
        <Form v-slot="$form" :resolver="loginResolver" @submit="submit" class="p-4">
            <!-- Global Message (Server Errors) -->
            <Message
                v-if="auth.hasGlobalError()"
                severity="error"
                :closable="false"
                class="mb-4"
            >
                {{ auth.getGlobalMessage() }}
            </Message>

            <div class="mb-4">
                <FormField name="email" v-slot="$field">
                    <IftaLabel>
                        <InputText
                            id="email-dialog"
                            v-model="$field.value"
                            type="text"
                            autocomplete="email"
                            class="w-full"
                            variant="filled"
                            :invalid="$field.invalid"
                            :disabled="auth.isLoading"
                            placeholder="Введите ваш email"
                        />
                        <label for="email-dialog">Email</label>
                    </IftaLabel>
                    <!-- Field-specific validation message -->
                    <Message
                        v-if="$field.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        class="mt-1"
                    >
                        {{ $field.error.message }}
                    </Message>
                </FormField>
            </div>
            <div class="mb-6">
                <FormField name="password" v-slot="$field">
                    <IftaLabel>
                        <InputText
                            id="password-dialog"
                            v-model="$field.value"
                            type="password"
                            autocomplete="current-password"
                            class="w-full"
                            variant="filled"
                            :invalid="$field.invalid"
                            :disabled="auth.isLoading"
                            placeholder="Введите ваш пароль"
                        />
                        <label for="password-dialog">Пароль</label>
                    </IftaLabel>
                    <!-- Field-specific validation message -->
                    <Message
                        v-if="$field.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        class="mt-1"
                    >
                        {{ $field.error.message }}
                    </Message>
                </FormField>
            </div>

            <Button
                type="submit"
                label="Войти"
                class="w-full mt-4"
                :loading="auth.isLoading"
                :disabled="auth.isLoading || !$form.valid"
            />
        </Form>
        <div class="text-center mt-4">
            <Button @click="handleRegisterClick" variant="link">
                Нет аккаунта? Зарегистрироваться
            </Button>
        </div>
    </Dialog>
</template>