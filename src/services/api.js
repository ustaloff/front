/**
 * Централизованный API сервис для работы с backend
 * Содержит конфигурацию axios и утилитарные функции для HTTP запросов
 */
import axios from 'axios'
import { API_CONFIG, STORAGE_KEYS } from '@/config'

// === КОНСТАНТЫ ===

export const API_BASE_URL = API_CONFIG.BASE_URL
export const TOKEN_STORAGE_KEY = STORAGE_KEYS.AUTH_TOKEN

// === КОНФИГУРАЦИЯ AXIOS ===

/**
 * Основной экземпляр axios для API запросов
 * Настроен для работы с Laravel API через Bearer токены
 */
export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})

// === УТИЛИТАРНЫЕ ФУНКЦИИ ===

/**
 * Безопасно получает токен из localStorage
 * @returns {string|null} Токен или null если не найден/ошибка
 */
export const getStoredToken = () => {
    try {
        return localStorage.getItem(TOKEN_STORAGE_KEY)
    } catch (error) {
        console.warn('Failed to get token from localStorage:', error)
        return null
    }
}

/**
 * Безопасно сохраняет токен в localStorage
 * @param {string} token - Токен для сохранения
 */
export const setStoredToken = (token) => {
    try {
        localStorage.setItem(TOKEN_STORAGE_KEY, token)
    } catch (error) {
        console.warn('Failed to save token to localStorage:', error)
    }
}

/**
 * Безопасно удаляет токен из localStorage
 */
export const removeStoredToken = () => {
    try {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
    } catch (error) {
        console.warn('Failed to remove token from localStorage:', error)
    }
}

/**
 * Устанавливает Authorization header для axios
 * @param {string} token - Bearer токен
 */
export const setAuthHeader = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

/**
 * Удаляет Authorization header из axios
 */
export const removeAuthHeader = () => {
    delete api.defaults.headers.common['Authorization']
}

// === INTERCEPTORS ===

/**
 * Request interceptor - автоматически добавляет токен к запросам
 */
api.interceptors.request.use(
    (config) => {
        const token = getStoredToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

/**
 * Response interceptor - обрабатывает ошибки аутентификации
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Если получили 401 (Unauthorized), очищаем токен
        if (error.response?.status === 401) {
            removeStoredToken()
            removeAuthHeader()

            // Можно добавить редирект на страницу входа
            // window.location.href = '/login'
        }

        return Promise.reject(error)
    }
)

// === ГОТОВЫЕ API МЕТОДЫ ===

/**
 * Готовые методы для частых операций
 */
export const apiMethods = {
    /**
     * GET запрос
     * @param {string} url - URL endpoint
     * @param {Object} config - Дополнительная конфигурация axios
     */
    get: (url, config = {}) => api.get(url, config),

    /**
     * POST запрос
     * @param {string} url - URL endpoint
     * @param {Object} data - Данные для отправки
     * @param {Object} config - Дополнительная конфигурация axios
     */
    post: (url, data = {}, config = {}) => api.post(url, data, config),

    /**
     * PUT запрос
     * @param {string} url - URL endpoint
     * @param {Object} data - Данные для отправки
     * @param {Object} config - Дополнительная конфигурация axios
     */
    put: (url, data = {}, config = {}) => api.put(url, data, config),

    /**
     * DELETE запрос
     * @param {string} url - URL endpoint
     * @param {Object} config - Дополнительная конфигурация axios
     */
    delete: (url, config = {}) => api.delete(url, config)
}

export default api