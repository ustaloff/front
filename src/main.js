import '@/assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/components/App.vue'
import router from '@/router'
import { useAuthStore } from './stores/auth'

import PrimeVue from 'primevue/config'

// === PRESET ===
import Preset from '@/presets/material'

// === FORM ===
import { Form, FormField } from '@primevue/forms'
// === FORM ELEMENTS ===
import FloatLabel from 'primevue/floatLabel'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import IftaLabel from 'primevue/iftalabel'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputText'
import Select from 'primevue/select'
// === BUTTON ===
import Button from 'primevue/button'
// === PANEL ===
import Card from 'primevue/card'
// === OVERLAY ===
import Dialog from 'primevue/dialog'
import Drawer from 'primevue/drawer'
import Popover from 'primevue/popover'
// === MESSAGE ===
import Message from 'primevue/message'
import Toast from 'primevue/toast'

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

// === FORM ===
app.component('Form', Form)
app.component('FormField', FormField)
// === FORM ELEMENTS ===
app.component('FloatLabel', FloatLabel)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('IftaLabel', IftaLabel)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('InputText', InputText)
app.component('Select', Select)
// === BUTTON ===
app.component('Button', Button)
// === PANEL ===
app.component('Card', Card)
// === OVERLAY ===
app.component('Dialog', Dialog)
app.component('Drawer', Drawer)
app.component('Popover', Popover)
// === MESSAGE ===
app.component('Message', Message)
app.component('Toast', Toast)

app.mount('#app')
