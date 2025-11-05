<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLoginDialog } from '@/composables/useLoginDialog'
import { useRegisterDialog } from '@/composables/useRegisterDialog'
import { loginResolver } from '@/utils/validation'

const auth = useAuthStore()
const { isLoginDialogOpen, closeLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()

// Реактивные данные формы
const formData = ref({
    email: '',
    password: ''
})

// Ошибки валидации
const errors = ref({})

// Валидация формы
const validateForm = () => {
    errors.value = loginResolver(formData.value)
    return Object.keys(errors.value).length === 0
}

// Обработка отправки формы
const handleSubmit = async (event) => {
    event.preventDefault()

    console.log('🔄 Попытка отправки формы входа...')
    console.log('📝 Данные формы:', formData.value)

    // Валидация
    if (!validateForm()) {
        console.log('❌ Форма не прошла валидацию:', errors.value)
        return
    }

    console.log('✅ Валидация пройдена, отправляем на сервер...')

    // Очистка ошибок перед новой попыткой
    auth.clearAllErrors()

    try {
        await auth.login(formData.value.email, formData.value.password)
        if (!auth.hasGlobalError()) {
            console.log('✅ Вход выполнен успешно')
            closeLoginDialog()
        } else {
            console.log('❌ Ошибка входа:', auth.getGlobalMessage())
        }
    } catch (e) {
        console.log('❌ Исключение при входе:', e.message)
    }
}

// Очистка ошибок при закрытии диалога
const onDialogClose = () => {
    auth.clearAllErrors()
    errors.value = {}
    formData.value = { email: '', password: '' }
}

// Переключение на регистрацию
const handleRegisterClick = () => {
    auth.clearAllErrors()
    closeLoginDialog()
    openRegisterDialog()
}

// Валидация в реальном времени
const validateField = (fieldName) => {
    const fieldErrors = loginResolver(formData.value)
    if (fieldErrors[fieldName]) {
        errors.value[fieldName] = fieldErrors[fieldName]
    } else {
        delete errors.value[fieldName]
    }
}
</script>

<template>
    <Dialog
        v-model:visible="isLoginDialogOpen"
        :modal="true"
        :dismissable-mask="true"
        header="Вход в систему (Простая версия)"
        :style="{ width: '25rem' }"
        @after-hide="onDialogClose"
    >
        <form @submit="handleSubmit" class="p-4" novalidate>
            <!-- Глобальные ошибки сервера -->
            <Message
                v-if="auth.hasGlobalError()"
                severity="error"
                :closable="false"
                class="mb-4"
            >
                {{ auth.getGlobalMessage() }}
            </Message>

            <!-- Поле Email -->
            <div class="mb-4">
                <IftaLabel>
                    <InputText
                        id="simple-email"
                        v-model="formData.email"
                        type="text"
                        autocomplete="email"
                        class="w-full"
                        variant="filled"
                        @blur="validateField('email')"
                        :invalid="!!errors.email"
                    />
                    <label for="simple-email">Email</label>
                </IftaLabel>
                <Message
                    v-if="errors.email"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="mt-1"
                >
                    {{ errors.email[0]?.message }}
                </Message>
            </div>

            <!-- Поле Пароль -->
            <div class="mb-6">
                <IftaLabel>
                    <InputText
                        id="simple-password"
                        v-model="formData.password"
                        type="password"
                        autocomplete="current-password"
                        class="w-full"
                        variant="filled"
                        @blur="validateField('password')"
                    />
                    <label for="simple-password">Пароль</label>
                </IftaLabel>
                <Message
                    v-if="errors.password"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="mt-1"
                >
                    {{ errors.password[0]?.message }}
                </Message>
            </div>

            <!-- Кнопка отправки -->
            <Button
                type="submit"
                label="Войти"
                class="w-full mt-4"
                :loading="auth.isLoading"
                :disabled="auth.isLoading"
            />
        </form>

        <!-- Ссылка на регистрацию -->
        <div class="text-center mt-4">
            <Button @click="handleRegisterClick" variant="link">
                Нет аккаунта? Зарегистрироваться
            </Button>
        </div>
    </Dialog>
</template>