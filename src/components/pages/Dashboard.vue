<script setup>
import {useAuthStore} from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
    <div>
        <h1>Панель администратора</h1>
        <div class="admin-stats">
            <div class="stat-card">
                <h3>Пользователи</h3>
                <p class="stat-number">1,234</p>
            </div>
            <div class="stat-card">
                <h3>Игры сегодня</h3>
                <p class="stat-number">567</p>
            </div>
            <div class="stat-card">
                <h3>Выручка</h3>
                <p class="stat-number">₽89,012</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.admin-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.stat-card {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-card h3 {
    margin: 0 0 0.5rem 0;
    color: #495057;
}

.stat-number {
    font-size: 2rem;
    font-weight: bold;
    color: #28a745;
    margin: 0;
}
</style>