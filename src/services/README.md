# Services Layer

Слой сервисов содержит переиспользуемую логику для работы с внешними API и утилитарные функции.

## 📁 Структура

```
services/
├── api.js          # Основной API сервис с axios конфигурацией
├── auth.js         # Сервисы аутентификации (если понадобится)
├── storage.js      # Утилиты для работы с localStorage/sessionStorage
└── README.md       # Этот файл
```

## 🔧 API Service (`api.js`)

### Основные возможности:

- **Централизованная конфигурация axios**
- **Автоматическое управление токенами**
- **Interceptors для обработки ошибок**
- **Готовые методы для HTTP запросов**

### Использование:

```javascript
import { api, apiMethods } from '@/services/api'

// Прямое использование axios instance
const response = await api.get('/users')

// Использование готовых методов
const users = await apiMethods.get('/users')
const newUser = await apiMethods.post('/users', userData)
```

### Автоматические возможности:

1. **Токен автоматически добавляется** к каждому запросу
2. **При 401 ошибке токен очищается** автоматически
3. **Таймауты настроены** из конфигурации
4. **Обработка ошибок** централизована

## 🛠️ Утилитарные функции

### Работа с токенами:

```javascript
import { 
    getStoredToken, 
    setStoredToken, 
    removeStoredToken,
    setAuthHeader,
    removeAuthHeader 
} from '@/services/api'

// Получить токен
const token = getStoredToken()

// Сохранить токен
setStoredToken('your-jwt-token')

// Удалить токен
removeStoredToken()

// Установить заголовок авторизации
setAuthHeader('your-jwt-token')

// Удалить заголовок авторизации
removeAuthHeader()
```

## 🔄 Interceptors

### Request Interceptor

- Автоматически добавляет Bearer токен к каждому запросу
- Получает токен из localStorage

### Response Interceptor

- Обрабатывает 401 ошибки (Unauthorized)
- Автоматически очищает токен при ошибках аутентификации
- Можно расширить для других типов ошибок

## 📝 Примеры использования

### В Pinia Store:

```javascript
import { api } from '@/services/api'

export const useUserStore = defineStore('user', {
    actions: {
        async fetchUsers() {
            const response = await api.get('/users')
            this.users = response.data
        }
    }
})
```

### В компонентах:

```javascript
import { apiMethods } from '@/services/api'

const fetchData = async () => {
    try {
        const response = await apiMethods.get('/data')
        console.log(response.data)
    } catch (error) {
        console.error('Error:', error)
    }
}
```

## 🔧 Конфигурация

Все настройки берутся из `@/config/index.js`:

- `API_CONFIG.BASE_URL` - базовый URL API
- `API_CONFIG.TIMEOUT` - таймаут запросов
- `STORAGE_KEYS.AUTH_TOKEN` - ключ для хранения токена

## 🚀 Расширение

Для добавления новых сервисов создайте отдельные файлы:

```javascript
// services/userService.js
import { api } from './api'

export const userService = {
    getProfile: () => api.get('/me'),
    updateProfile: (data) => api.put('/me', data),
    deleteAccount: () => api.delete('/me')
}
```