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
        user: null,                    // Данные текущего пользователя
        token: getStoredToken(),       // JWT токен из localStorage
        isLoading: false,              // Флаг загрузки для UI
        error: null                    // Последняя ошибка аутентификации
    }),
    
    getters: {
        /**
         * Проверяет, аутентифицирован ли пользователь
         * @param {Object} state - Состояние store
         * @returns {boolean} true если есть токен
         */
        isAuthenticated: (state) => !!state.token,
        
        /**
         * Возвращает имя пользователя или email для отображения
         * @param {Object} state - Состояние store
         * @returns {string} Имя пользователя или 'Гость'
         */
        displayName: (state) => state.user?.name || state.user?.email || 'Гость'
    },
    actions: {
        /**
         * Регистрирует нового пользователя
         * @param {Object} credentials - Данные для регистрации (name, email, password, etc.)
         * @throws {Error} При ошибке регистрации
         */
        async register(credentials) {
            this.isLoading = true
            this.error = null
            
            try {
                const response = await api.post('/register', credentials)
                
                // Сохраняем данные пользователя и токен
                this.user = response.data.user
                this.token = response.data.access_token
                
                // Обновляем localStorage и axios headers
                setStoredToken(this.token)
                setAuthHeader(this.token)
                
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка регистрации'
                throw error
            } finally {
                this.isLoading = false
            }
        },

        /**
         * Выполняет вход пользователя
         * @param {string} email - Email пользователя
         * @param {string} password - Пароль пользователя
         * @throws {Error} При ошибке входа
         */
        async login(email, password) {
            this.isLoading = true
            this.error = null
            
            try {
                const response = await api.post('/login', {email, password})
                
                // Сохраняем данные пользователя и токен
                this.token = response.data.access_token
                this.user = response.data.user
                
                // Обновляем localStorage и axios headers
                setStoredToken(this.token)
                setAuthHeader(this.token)
                
            } catch (error) {
                this.error = error.response?.data?.message || 'Ошибка входа'
                throw error
            } finally {
                this.isLoading = false
            }
        },

        /**
         * Получает данные текущего пользователя с сервера
         * Автоматически очищает сессию при ошибке аутентификации
         */
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
                // При ошибке аутентификации очищаем сессию
                console.warn('Failed to fetch user data:', error)
                this.clearSession()
            } finally {
                this.isLoading = false
            }
        },

        /**
         * Выполняет выход пользователя
         * Отправляет запрос на сервер и очищает локальную сессию
         */
        async logout() {
            if (!this.token) return

            this.isLoading = true
            
            try {
                // Пытаемся уведомить сервер о выходе
                await api.post('/logout', null, {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                })
            } catch (error) {
                // Игнорируем ошибки logout на сервере, все равно очищаем локальную сессию
                console.warn('Logout request failed:', error)
            } finally {
                // Всегда очищаем локальную сессию
                this.clearSession()
                this.isLoading = false
                
                // Перенаправляем на страницу входа
                router.push('/login')
            }
        },

        /**
         * Очищает сессию пользователя (локальные данные)
         * Используется при logout или ошибках аутентификации
         */
        clearSession() {
            this.user = null
            this.token = null
            this.error = null
            removeStoredToken()
            removeAuthHeader()
        },

        /**
         * Инициализирует store при запуске приложения
         * Проверяет наличие сохраненного токена и получает данные пользователя
         */
        async initialize() {
            if (this.token) {
                setAuthHeader(this.token)
                await this.fetchUser()
            }
        }
    }
})
