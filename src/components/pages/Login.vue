<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
    try {
        await auth.login(email.value, password.value)
        router.push('/')
    } catch (e) {
        alert('Ошибка входа')
    }
}
</script>

<template>
    <div class="login-container">
        <div class="login-form">
            <h2>Вход в систему</h2>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <input 
                        v-model="email" 
                        type="email" 
                        placeholder="Email" 
                        autocomplete="email"
                        required
                    />
                </div>
                <div class="form-group">
                    <input 
                        v-model="password" 
                        type="password" 
                        placeholder="Пароль" 
                        autocomplete="current-password"
                        required
                    />
                </div>
                <button type="submit" class="submit-btn">Войти</button>
            </form>
            <div class="form-footer">
                <router-link to="/register">Нет аккаунта? Зарегистрироваться</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.login-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.login-form h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
}

.form-group {
    margin-bottom: 1rem;
}

.form-group input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    box-sizing: border-box;
}

.form-group input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.submit-btn {
    width: 100%;
    background: #007bff;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background: #0056b3;
}

.form-footer {
    text-align: center;
    margin-top: 1rem;
}

.form-footer a {
    color: #007bff;
    text-decoration: none;
}

.form-footer a:hover {
    text-decoration: underline;
}
</style>