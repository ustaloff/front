import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './components/App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import PrimeVue from 'primevue/config'
import Preset from './presets/material'

const app = createApp(App)

app.use(createPinia())
app.use(router)

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

import Button from 'primevue/button'
app.component('Button', Button)

import FloatLabel from 'primevue/floatLabel'
app.component('FloatLabel', FloatLabel)

import IftaLabel from 'primevue/iftalabel'
app.component('IftaLabel', IftaLabel)

import InputText from 'primevue/inputText'
app.component('InputText', InputText)

import Select from 'primevue/select'
app.component('Select', Select)

import Card from 'primevue/card'
app.component('Card', Card)

import Drawer from 'primevue/drawer'
app.component('Drawer', Drawer)

import Dialog from 'primevue/dialog'
app.component('Dialog', Dialog)

import Toast from 'primevue/toast'
app.component('Toast', Toast)

import { Form } from '@primevue/forms'
app.component('Form', Form)

app.mount('#app')
