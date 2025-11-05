import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './components/App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import PrimeVue from 'primevue/config'
import Preset from './presets/material'

import Button from 'primevue/button'
import FloatLabel from 'primevue/floatLabel'
import IftaLabel from 'primevue/iftalabel'
import InputText from 'primevue/inputText'
import Select from 'primevue/select'
import Card from 'primevue/card'
import Drawer from 'primevue/drawer'
import Dialog from 'primevue/dialog'
import Toast from 'primevue/toast'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Инициализируем auth store для получения CSRF токена и проверки сохраненной сессии
// Делаем это асинхронно, чтобы не блокировать запуск приложения
const authStore = useAuthStore()
authStore.initialize().catch(error => {
    console.warn('Auth store initialization failed:', error)
})

app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Preset,
        options: {
            prefix: '',
            cssLayer: {
                name: 'prime',
                order: 'reset, prime',
            },
            darkModeSelector: '[data-theme=dark]',
        }
    }
});

app.component('Button', Button);
app.component('FloatLabel', FloatLabel)
app.component('IftaLabel', IftaLabel)
app.component('InputText', InputText)
app.component('Select', Select)
app.component('Card', Card)
app.component('Drawer', Drawer)
app.component('Dialog', Dialog)
app.component('Toast', Toast)

app.mount('#app')
