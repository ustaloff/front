<script setup>
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const formatDate = (dateString) => {
    if (!dateString) return 'Не указано'
    return new Date(dateString).toLocaleDateString('ru-RU')
}
</script>

<template>
    <div class="container" v-if="auth.isAuthenticated">
        <h2>Профиль пользователя</h2>
        <div class="profile-info">
            <div class="info-card">
                <h3>Личная информация</h3>
                <p><strong>Email:</strong> {{ auth.user?.email }}</p>
                <p><strong>Имя:</strong> {{ auth.user?.name || 'Не указано' }}</p>
                <p><strong>Дата регистрации:</strong> {{ formatDate(auth.user?.created_at) }}</p>
            </div>
            <div class="info-card">
                <h3>Игровая статистика</h3>
                <p><strong>Баланс:</strong> ₽1,000</p>
                <p><strong>Игр сыграно:</strong> 42</p>
                <p><strong>Выиграно:</strong> ₽2,500</p>
            </div>
        </div>
    </div>
    <div class="container" v-else>
        <h2>Доступ запрещен</h2>
        <p>Пожалуйста, войдите в систему для просмотра профиля.</p>
        <router-link to="/" class="login-btn">Войти</router-link>
    </div>
</template>

<style scoped>
.profile-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.info-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-card h3 {
    margin-top: 0;
    color: #495057;
    border-bottom: 2px solid #dee2e6;
    padding-bottom: 0.5rem;
}

.info-card p {
    margin: 1rem 0;
}

.login-btn {
    display: inline-block;
    background: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.login-btn:hover {
    background: #0056b3;
}
</style>