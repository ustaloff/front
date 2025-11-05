/**
 * Pinia store для управления аутентификацией пользователей
 * Обрабатывает регистрацию, вход, выход и получение данных пользователя
 * Автоматически сохраняет токен в localStorage и настраивает axios headers
 */
import {defineStore} from 'pinia'
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

        handleAuthError(error) {
            const classifiedError = this.classifyError(error)
            this.error = classifiedError.message
            this.errorDetails = classifiedError
            this.errorType = classifiedError.type
        },

        classifyError(error) {
            if (!error.response) {
                return { type: 'network', message: 'Проблемы с подключением к серверу' };
            }

            const status = error.response.status
            const data = error.response.data

            switch (status) {
                case 422:
                    const validationMessage = data.errors?.email?.[0] || data.message
                    return {
                        type: 'validation',
                        message: validationMessage,
                        field: 'email'
                    };
                case 429:
                    return {
                        type: 'server',
                        message: 'Слишком много попыток входа. Попробуйте позже.'
                    };
                case 500:
                    return {
                        type: 'server',
                        message: 'Внутренняя ошибка сервера. Попробуйте позже.'
                    };
                default:
                    return {
                        type: 'unknown',
                        message: data.message || 'Произошла неизвестная ошибка'
                    };
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
