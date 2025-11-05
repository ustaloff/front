/**
 * Pinia store для управления аутентификацией пользователей
 * Обрабатывает регистрацию, вход, выход и получение данных пользователя
 * Автоматически сохраняет токен в localStorage и настраивает axios headers
 */
import { defineStore } from 'pinia'
import router from '@/router'
import {
    api,
    getStoredToken,
    setStoredToken,
    removeStoredToken,
    setAuthHeader,
    removeAuthHeader
} from '@/services/api'


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: getStoredToken(),
        isLoading: false,
        error: null,
        errorDetails: null,
        errorType: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
        displayName: (state) => state.user?.name || state.user?.email || 'Гость',
        hasError: (state) => !!state.error,
        errorMessage: (state) => state.errorDetails?.message || state.error,
        isValidationError: (state) => state.errorType === 'validation',
        isNetworkError: (state) => state.errorType === 'network',
    },

    actions: {
        clearError() {
            this.error = null
            this.errorDetails = null
            this.errorType = null
        },

        /**
         * Получить глобальное сообщение об ошибке с поддержкой русского языка
         * @returns {string|null} Переведенное сообщение об ошибке или null
         */
        getGlobalMessage() {
            if (!this.error) return null

            // Словарь переводов для общих серверных ошибок
            const SERVER_ERROR_TRANSLATIONS = {
                'Invalid credentials': 'Неверный email или пароль',
                'User not found': 'Пользователь не найден',
                'Email already exists': 'Пользователь с таким email уже существует',
                'Validation failed': 'Ошибка валидации данных',
                'The email field is required': 'Email обязателен для заполнения',
                'The password field is required': 'Пароль обязателен для заполнения',
                'The email must be a valid email address': 'Неверный формат email адреса',
                'The password must be at least 8 characters': 'Пароль должен содержать минимум 8 символов',
                'Unauthenticated': 'Необходима авторизация',
                'Unauthorized': 'Недостаточно прав доступа'
            }

            // Попытаться найти перевод для сообщения об ошибке
            const translation = SERVER_ERROR_TRANSLATIONS[this.error]
            return translation || this.error
        },

        /**
         * Проверить наличие глобальной ошибки для отображения
         * @returns {boolean} true если есть глобальная ошибка для отображения
         */
        hasGlobalError() {
            return !!this.error && this.errorType !== 'field'
        },

        /**
         * Очистить все состояния ошибок (глобальные и полевые)
         */
        clearAllErrors() {
            this.error = null
            this.errorDetails = null
            this.errorType = null
        },

        handleAuthError(error) {
            const classifiedError = this.classifyError(error)
            this.error = classifiedError.message
            this.errorDetails = classifiedError
            this.errorType = classifiedError.type
        },

        /**
         * Улучшенная классификация ошибок с поддержкой русского языка
         * @param {Error} error - Объект ошибки от axios
         * @returns {Object} Классифицированная ошибка с типом и сообщением
         */
        classifyError(error) {
            // Сетевые ошибки (нет ответа от сервера)
            if (!error.response) {
                return {
                    type: 'network',
                    message: 'Проблемы с подключением к серверу. Проверьте интернет-соединение.'
                }
            }

            const status = error.response.status
            const data = error.response.data

            // Словарь русских переводов для серверных ошибок
            const ERROR_TRANSLATIONS = {
                'Invalid credentials': 'Неверный email или пароль',
                'User not found': 'Пользователь не найден',
                'Email already exists': 'Пользователь с таким email уже существует',
                'The email has already been taken': 'Пользователь с таким email уже существует',
                'Validation failed': 'Ошибка валидации данных',
                'The email field is required': 'Email обязателен для заполнения',
                'The password field is required': 'Пароль обязателен для заполнения',
                'The name field is required': 'Имя обязательно для заполнения',
                'The email must be a valid email address': 'Неверный формат email адреса',
                'The password must be at least 8 characters': 'Пароль должен содержать минимум 8 символов',
                'The password confirmation does not match': 'Пароли не совпадают',
                'Unauthenticated': 'Необходима авторизация',
                'Unauthorized': 'Недостаточно прав доступа',
                'Too Many Attempts': 'Слишком много попыток. Попробуйте позже.',
                'Server Error': 'Внутренняя ошибка сервера. Попробуйте позже.'
            }

            // Функция для перевода сообщения
            const translateMessage = (message) => {
                return ERROR_TRANSLATIONS[message] || message
            }

            switch (status) {
                // Ошибки валидации (422)
                case 422:
                    // Обработка ошибок валидации Laravel
                    if (data.errors) {
                        // Получить первую ошибку валидации
                        const firstField = Object.keys(data.errors)[0]
                        const firstError = data.errors[firstField][0]
                        return {
                            type: 'validation',
                            message: translateMessage(firstError),
                            field: firstField,
                            details: data.errors
                        }
                    }
                    return {
                        type: 'validation',
                        message: translateMessage(data.message || 'Ошибка валидации данных')
                    }

                // Ошибки аутентификации (401)
                case 401:
                    return {
                        type: 'authentication',
                        message: translateMessage(data.message || 'Неверный email или пароль')
                    }

                // Ошибки авторизации (403)
                case 403:
                    return {
                        type: 'authorization',
                        message: translateMessage(data.message || 'Недостаточно прав доступа')
                    }

                // Ресурс не найден (404)
                case 404:
                    return {
                        type: 'not_found',
                        message: 'Запрашиваемый ресурс не найден'
                    }

                // Ограничение скорости запросов (429)
                case 429:
                    return {
                        type: 'rate_limit',
                        message: 'Слишком много попыток. Попробуйте позже.'
                    }

                // Внутренние ошибки сервера (500)
                case 500:
                    return {
                        type: 'server',
                        message: 'Внутренняя ошибка сервера. Попробуйте позже.'
                    }

                // Сервис недоступен (503)
                case 503:
                    return {
                        type: 'service_unavailable',
                        message: 'Сервис временно недоступен. Попробуйте позже.'
                    }

                // Неизвестные ошибки
                default:
                    return {
                        type: 'unknown',
                        message: translateMessage(data.message || 'Произошла неизвестная ошибка'),
                        status: status
                    }
            }
        },

        async register(credentials) {
            this.clearError()
            this.isLoading = true

            try {
                const response = await api.post('/register', credentials)
                this.user = response.data.user
                this.token = response.data.access_token
                setStoredToken(this.token)
                setAuthHeader(this.token)
            } catch (error) {
                this.handleAuthError(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },

        async login(email, password) {
            this.clearError()
            this.isLoading = true

            try {
                const response = await api.post('/login', { email, password })
                this.token = response.data.access_token
                this.user = response.data.user
                setStoredToken(this.token)
                setAuthHeader(this.token)
            } catch (error) {
                this.handleAuthError(error)
                throw error
            } finally {
                this.isLoading = false
            }
        },

        async fetchUser() {
            if (!this.token) {
                this.user = null
                return
            }

            this.isLoading = true
            setAuthHeader(this.token)

            try {
                const response = await api.get('/me')
                this.user = response.data
                this.error = null
            } catch (error) {
                console.warn('Failed to fetch user data:', error)
                this.clearSession()
            } finally {
                this.isLoading = false
            }
        },

        async logout() {
            if (!this.token) return

            this.isLoading = true

            try {
                await api.post('/logout', null, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
            } catch (error) {
                console.warn('Logout request failed:', error)
            } finally {
                this.clearSession()
                this.isLoading = false
                router.push('/')
            }
        },

        clearSession() {
            this.user = null
            this.token = null
            this.clearError()
            removeStoredToken()
            removeAuthHeader()
        },

        async initialize() {
            if (this.token) {
                setAuthHeader(this.token)
                await this.fetchUser()
            }
        }
    }
})
