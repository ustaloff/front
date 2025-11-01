<script setup>
import {useAuthStore} from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
    <header class="app-header">
        <div class="header-content">
            <div class="logo">
                <router-link to="/">Noname</router-link>
            </div>
            <nav class="main-nav">
                <router-link _v-if="auth.user" to="/profile">Профиль</router-link>
                <router-link v-if="auth.user" to="/admin">Админ</router-link>
            </nav>
            <div class="auth-section">
                <span v-if="auth.user" class="user-greeting">
                    Привет, {{ auth.user.email }}
                </span>
                <button v-if="auth.user" @click="auth.logout" class="btn-primary">
                    Выйти
                </button>
                <div v-else class="auth-links">
                    <router-link to="/login" class="btn-primary">Войти</router-link>
                    <router-link to="/register" class="btn-secondary">Регистрация</router-link>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/assets/variables' as *;

.app-header {
    background: $header-bg;
    color: $text-color-invert;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo a {
    font-size: 1.5rem;
    font-weight: bold;
    color: $secondary-color;
    text-decoration: none;
}

.main-nav {
    display: flex;
    gap: 2rem;
}

.main-nav a {
    color: color.adjust($text-color-invert, $lightness: -30%);
    text-decoration: none;
    padding: 0.5rem 1rem;
}

.main-nav a:hover {
    color: $text-color-invert;
}

.auth-section {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.user-greeting {
    color: $warning-color;
}

.auth-links {
    display: flex;
    gap: 1rem;
}
</style>