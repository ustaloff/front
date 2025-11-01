import {defineStore} from 'pinia'
import axios from 'axios'
import router from '@/router'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
})

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        async register(credentials) {
            const response = await api.post('/register', credentials);
            this.user = response.data.user;
            this.token = response.data.access_token;
            localStorage.setItem('token', this.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
        },
        async login(email, password) {
            const response = await api.post('/login', {email, password})
            this.token = response.data.access_token
            this.user = response.data.user
            localStorage.setItem('token', this.token)
            api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        },
        async fetchUser() {
            if (!this.token) {
                this.user = null
                return
            }
            api.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
            try {
                const response = await api.get('/me')
                this.user = response.data
            } catch (e) {
                this.user = null
                this.token = null
                localStorage.removeItem('token')
                delete api.defaults.headers.common['Authorization']
            }
        },
        async logout() {
            if (!this.token) return
            await api.post('/logout', null, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            delete api.defaults.headers.common['Authorization']
            console.log('Logout done, token cleared:', this.token)
            console.log('Axios default headers after logout:', api.defaults.headers.common)

            // Перенаправление после выхода
            router.push('/login')
        }
    },
})
