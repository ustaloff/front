<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const auth = useAuthStore()
const router = useRouter()

const submit = async () => {
    try {
        await auth.register({
            name: name.value,
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
        })
        router.push('/')
    } catch (error) {
        const msg = error.response?.data?.errors || error.response?.data?.message || 'Ошибка регистрации'
        alert(JSON.stringify(msg))
    }
}
</script>

<template>
    <div class="register-container">
        <div class="register-form">
            <h2>Регистрация</h2>
            <form @submit.prevent="submit">
                <div class="form-group">
                    <input v-model="name" type="text" placeholder="Имя" required/>
                </div>
                <div class="form-group">
                    <input v-model="email" type="email" placeholder="Email" required/>
                </div>
                <div class="form-group">
                    <input v-model="password" type="password" placeholder="Пароль" required/>
                </div>
                <div class="form-group">
                    <input v-model="password_confirmation" type="password" placeholder="Подтвердите пароль" required/>
                </div>
                <button type="submit" class="submit-btn">Зарегистрироваться</button>
            </form>
            <div class="form-footer">
                <router-link to="/login">Уже есть аккаунт? Войти</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
}

.register-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.register-form h2 {
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
    border-color: #28a745;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
}

.submit-btn {
    width: 100%;
    background: #28a745;
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background: #218838;
}

.form-footer {
    text-align: center;
    margin-top: 1rem;
}

.form-footer a {
    color: #28a745;
    text-decoration: none;
}

.form-footer a:hover {
    text-decoration: underline;
}
</style>