import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Preset from './presets/material'
import Button from 'primevue/button';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Preset,
        options: {
            prefix: 'p',
            cssLayer: {
                name: 'prime',
                order: 'reset, prime',
            },
            darkModeSelector: '[data-theme=dark]',
        }
    }
});

app.component('Button', Button);

app.mount('#app')
