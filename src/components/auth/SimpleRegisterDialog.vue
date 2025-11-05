<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRegisterDialog } from '@/composables/useRegisterDialog'
import { useLoginDialog } from '@/composables/useLoginDialog'
import { registerResolver } from '@/utils/validation'

const auth = useAuthStore()
const { isRegisterDialogOpen, closeRegisterDialog } = useRegisterDialog()
const { openLoginDialog } = useLoginDialog()

// Реактивные данные формы
const formData = ref({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: ''
})

// Ошибки валидации
const errors = ref({})

// Валидация формы
const validateForm = () => {
    errors.value = registerResolver(formData.value)
    return Object.keys(errors.value).length === 0
}

// Обработка отправки формы
const handleSubmit = async (event) => {
    event.preventDefault()

    console.log('🔄 Попытка отправки формы регистрации...')
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
        await auth.register({
            name: formData.value.name,
            email: formData.value.email,
            password: formData.value.password,
            password_confirmation: formData.value.passwordConfirmation,
        })
        if (!auth.hasGlobalError()) {
            console.log('✅ Регистрация выполнена успешно')
            closeRegisterDialog()
        } else {
            console.log('❌ Ошибка регистрации:', auth.getGlobalMessage())
        }
    } catch (error) {
        console.log('❌ Исключение при регистрации:', error.message)
    }
}

// Очистка ошибок при закрытии диалога
const onDialogClose = () => {
    auth.clearAllErrors()
    errors.value = {}
    formData.value = { name: '', email: '', password: '', passwordConfirmation: '' }
}

// Переключение на вход
const handleLoginClick = () => {
    auth.clearAllErrors()
    closeRegisterDialog()
    openLoginDialog()
}

// Валидация в реальном времени
const validateField = (fieldName) => {
    const fieldErrors = registerResolver(formData.value)
    if (fieldErrors[fieldName]) {
        errors.value[fieldName] = fieldErrors[fieldName]
    } else {
        delete errors.value[fieldName]
    }
}
</script>

<template>
    <Dialog
        v-model:visible="isRegisterDialogOpen"
        :modal="true"
        :dismissable-mask="true"
        header="Регистрация (Простая версия)"
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

            <!-- Поле Имя -->
            <div class="mb-4">
                <IftaLabel>
                    <InputText
                        id="simple-name"
                        v-model="formData.name"
                        type="text"
                        autocomplete="name"
                        class="w-full"
                        variant="filled"
                        @blur="validateField('name')"
                    />
                    <label for="simple-name">Имя</label>
                </IftaLabel>
                <Message
                    v-if="errors.name"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="mt-1"
                >
                    {{ errors.name[0]?.message }}
                </Message>
            </div>

            <!-- Поле Email -->
            <div class="mb-4">
                <IftaLabel>
                    <InputText
                        id="simple-register-email"
                        v-model="formData.email"
                        type="text"
                        autocomplete="email"
                        class="w-full"
                        variant="filled"
                        @blur="validateField('email')"
                        :invalid="!!errors.email"
                    />
                    <label for="simple-register-email">Email</label>
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
            <div class="mb-4">
                <IftaLabel>
                    <InputText
                        id="simple-register-password"
                        v-model="formData.password"
                        type="password"
                        autocomplete="new-password"
                        class="w-full"
                        variant="filled"
                        @blur="validateField('password')"
                    />
                    <label for="simple-register-password">Пароль</label>
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

            <!-- Поле Подтверждение пароля -->
            <div class="mb-6">
                <IftaLabel>
                    <InputText
                        id="simple-password-confirmation"
                        v-model="formData.passwordConfirmation"
                        type="password"
                        autocomplete="new-password"
                        class="w-full"
                        variant="filled"
                        @blur="validateField('passwordConfirmation')"
                    />
                    <label for="simple-password-confirmation">Подтверждение пароля</label>
                </IftaLabel>
                <Message
                    v-if="errors.passwordConfirmation"
                    severity="error"
                    size="small"
                    variant="simple"
                    class="mt-1"
                >
                    {{ errors.passwordConfirmation[0]?.message }}
                </Message>
            </div>

            <!-- Кнопка отправки -->
            <Button
                type="submit"
                label="Зарегистрироваться"
                class="w-full mt-4"
                :loading="auth.isLoading"
                :disabled="auth.isLoading"
            />
        </form>

        <!-- Ссылка на вход -->
        <div class="text-center mt-4">
            <Button @click="handleLoginClick" variant="link">
                Уже есть аккаунт? Войти
            </Button>
        </div>
    </Dialog>
</template>