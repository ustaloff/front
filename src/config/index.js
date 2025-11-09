/**
 * Конфигурационные константы приложения
 * Централизованное место для всех настроек
 */

// === API КОНФИГУРАЦИЯ ===

export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api',
    TIMEOUT: 10000, // 10 секунд
    RETRY_ATTEMPTS: 3
}

// === VITE SERVER КОНФИГУРАЦИЯ ===

export const SERVER_CONFIG = {
    PORT: parseInt(import.meta.env.VITE_SERVER_PORT) || 3000,
    HOST: import.meta.env.VITE_SERVER_HOST || 'localhost',
    OPEN: import.meta.env.VITE_SERVER_OPEN === 'true'
}

// === APP КОНФИГУРАЦИЯ ===

export const APP_CONFIG = {
    NAME: import.meta.env.VITE_APP_NAME || 'Vue Laravel App',
    ENV: import.meta.env.VITE_APP_ENV || 'development',
    DEBUG: import.meta.env.VITE_DEBUG === 'true'
}

// === STORAGE КЛЮЧИ ===

export const STORAGE_KEYS = {
    AUTH_TOKEN: 'token',
    USER_PREFERENCES: 'user_preferences',
    SIDEBAR_EXPANDED: 'sidebar-expanded',
    THEME: 'theme'
}


// === ROUTES ===

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    PROFILE: '/profile',
    ADMIN: '/admin'
}

// === TIMEOUTS ===

export const TIMEOUTS = {
    DEBOUNCE_RESIZE: 100,
    ORIENTATION_CHANGE: 100,
    NOTIFICATION: 5000
}

// === VALIDATION ===

export const VALIDATION = {
    PASSWORD_MIN_LENGTH: 6,
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    NAME_MAX_LENGTH: 255
}

// === UI CONFIG ===

export const UI_CONFIG = {
    SIDEBAR_BREAKPOINT: 'lg',
    POPOVER_MAX_HEIGHT: 500,
    POPOVER_MIN_HEIGHT: 150,
    POPOVER_SHOW_ARROW: false,
}

export default {
    API_CONFIG,
    SERVER_CONFIG,
    APP_CONFIG,
    STORAGE_KEYS,
    ROUTES,
    TIMEOUTS,
    VALIDATION,
    UI_CONFIG
}