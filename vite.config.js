import {fileURLToPath, URL} from 'node:url'
import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    // Загружаем переменные окружения
    const env = loadEnv(mode, process.cwd(), '')
    
    return {
        plugins: [
            vue(),
            vueDevTools(),
        ],

        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },

        optimizeDeps: {
            exclude: ['primevue']
        },

        server: {
            port: parseInt(env.VITE_SERVER_PORT) || 3000,
            host: env.VITE_SERVER_HOST || 'localhost',
            open: env.VITE_SERVER_OPEN === 'true',
        },

        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['./src/test/setup.js']
        }
    }
})
