import './assets/main.scss'

import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import {definePreset} from '@primeuix/themes';
import Theme from '@primeuix/themes/material';
import Button from 'primevue/button';

const app = createApp(App)

app.use(createPinia())
app.use(router)

const Preset = definePreset(Theme, {
    extend: {
        color: {
            extra: '#0cbd5e',
            accent: '#ffff01',
            100: '#242626',
            200: '#282b2b',
            300: '#292d2e',
            400: '#363c3d',
            500: '#41494a'
        },
        lightSurface: {
            100: '#242626',
            200: '#282b2b',
            300: '#292d2e',
            400: '#363c3d',
            500: '#41494a'
        },
        darkSurface: {
            100: '#242626',
            200: '#282b2b',
            300: '#292d2e',
            400: '#363c3d',
            500: '#41494a'
        },
    },
    primitive: {
        custom: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            300: '#6ee7b7',
            400: '#34d399',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
            800: '#065f46',
            900: '#064e3b',
            950: '#022c22'
        },
    },
    semantic: {
        primary: {
            50: '{color.accent}',
            100: '{color.accent}',
            200: '{color.accent}',
            300: '{color.accent}',
            400: '{color.accent}',
            500: '{color.accent}',
            600: '{color.accent}',
            700: '{color.accent}',
            800: '{color.accent}',
            900: '{color.accent}',
            950: '{color.accent}'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{custom.50}',
                    100: '{custom.100}',
                    200: '{custom.200}',
                    300: '{custom.300}',
                    400: '{custom.400}',
                    500: '{custom.500}',
                    600: '{custom.600}',
                    700: '{custom.700}',
                    800: '{custom.800}',
                    900: '{custom.900}',
                    950: '{custom.950}'
                },
                /*primary: {
                    color: '{zinc.950}',
                    inverseColor: '#ffffff',
                    hoverColor: '{zinc.900}',
                    activeColor: '{zinc.800}'
                },
                highlight: {
                    background: '{zinc.950}',
                    focusBackground: '{zinc.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff'
                }*/
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '{slate.50}',
                    100: '{slate.100}',
                    200: '{slate.200}',
                    300: '{slate.300}',
                    400: '{slate.400}',
                    500: '{slate.500}',
                    600: '{slate.600}',
                    700: '{slate.700}',
                    800: '{slate.800}',
                    900: '{slate.900}',
                    950: '{slate.950}'
                },
                /*primary: {
                    color: '{zinc.50}',
                    inverseColor: '{zinc.950}',
                    hoverColor: '{zinc.100}',
                    activeColor: '{zinc.200}'
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }*/
            }
        }
    }
});

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
            darkModeSelector: 'system',
        }
    }
});

app.component('Button', Button);

app.mount('#app')
