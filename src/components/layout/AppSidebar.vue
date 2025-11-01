<script setup>
import {useAuthStore} from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
    <aside class="app-aside">
        <div class="sidebar-content">
            <h3>Меню</h3>
            <ul class="sidebar-menu">
                <li>
                    <router-link to="/">🎮 Главная</router-link>
                </li>
                <li>
                    <router-link to="/clamp-generator">📐 Clamp Generator</router-link>
                </li>
                <li>
                    <router-link to="/css-filter-generator">🎨 CSS Filter Generator</router-link>
                </li>
                <li v-if="auth.user">
                    <router-link to="/profile">👤 Профиль</router-link>
                </li>
                <li v-if="auth.user">
                    <router-link to="/user-logs">📜 User Logs</router-link>
                </li>
                <li v-if="auth.user">
                    <router-link to="/admin">⚙️ Админ панель</router-link>
                </li>
            </ul>

            <div v-if="auth.user" class="user-info">
                <h4>Баланс</h4>
                <p class="balance">1000 ₽</p>
            </div>
        </div>
    </aside>
</template>

<style scoped>
.app-aside {
    background: #f8f9fa;
    border-right: 1px solid #dee2e6;
    padding: 1rem;
}

.sidebar-content h3 {
    margin-top: 0;
    color: #495057;
}

.sidebar-menu {
    list-style: none;
    padding: 0;
    margin: 0;
}

.sidebar-menu li {
    margin-bottom: 0.5rem;
}

.sidebar-menu a {
    display: block;
    padding: 0.75rem;
    color: #495057;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.sidebar-menu a:hover,
.sidebar-menu a.router-link-active {
    background-color: #e9ecef;
    color: #1a1a2e;
}

.user-info {
    margin-top: 2rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info h4 {
    margin: 0 0 0.5rem 0;
    color: #495057;
}

.balance {
    font-size: 1.2rem;
    font-weight: bold;
    color: #28a745;
    margin: 0;
}

@media (max-width: 768px) {
    .app-aside {
        border-right: none;
        border-top: 1px solid #dee2e6;
        padding: 1rem;
    }

    .sidebar-content {
        display: flex;
        gap: 2rem;
        align-items: flex-start;
        flex-wrap: wrap;
    }

    .sidebar-content h3 {
        width: 100%;
        margin-bottom: 1rem;
    }

    .sidebar-menu {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .sidebar-menu li {
        margin-bottom: 0;
    }

    .user-info {
        margin-top: 0;
        flex-shrink: 0;
        min-width: 200px;
    }
}
</style>