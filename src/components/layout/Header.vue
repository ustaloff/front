<script setup>
import { useAuthStore } from '@/stores/auth'
import { useSidebar } from '@/composables/useSidebar'
import { computed } from 'vue'
import { useLoginDialog } from '@/composables/useLoginDialog'
import LoginDialog from '@/components/auth/LoginDialog.vue'
import { useRegisterDialog } from '@/composables/useRegisterDialog'
import RegisterDialog from '@/components/auth/RegisterDialog.vue'
import { UI_CONFIG } from '@/config'

const auth = useAuthStore()
const { isOpen, isExpanded, isMobile, toggleSidebar } = useSidebar(UI_CONFIG.SIDEBAR_BREAKPOINT)
const { openLoginDialog } = useLoginDialog()
const { openRegisterDialog } = useRegisterDialog()

const handleToggleClick = () => {
    toggleSidebar()
}

const isToggleActive = computed(() => {
    return isMobile.value ? isOpen.value : isExpanded.value
})

const toggleAriaLabel = computed(() => {
    if (isMobile.value) {
        return isOpen.value ? 'Закрыть меню' : 'Открыть меню'
    } else {
        return isExpanded.value ? 'Скрыть меню' : 'Показать меню'
    }
})
</script>

<template>
    <header class="app-header">
        <div class="header-content container">
            <button
                class="toggle-button"
                @click="handleToggleClick"
                :aria-label="toggleAriaLabel"
            >
                <span class="toggle-icon" :class="{ 'is-open': isToggleActive }">
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </button>
            <div class="logo">
                <router-link to="/">CodeCraft</router-link>
            </div>
            <nav class="main-nav">
                <router-link v-if="auth.user" to="/profile">Профиль</router-link>
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
                    <button @click="openLoginDialog" class="btn-primary">Войти</button>
                    <button @click="openRegisterDialog" class="btn-secondary">Регистрация</button>
                </div>
            </div>
        </div>
    </header>
    <LoginDialog/>
    <RegisterDialog/>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/assets/variables' as *;

.app-header {
    background: $header-bg;
    color: $text-color-invert;
    //padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
    //max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    gap: $spacing-md;
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
    margin-left: auto;
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

.toggle-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: $spacing-sm;
    border-radius: $radius-sm;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }

    &:focus {
        outline: 2px solid $secondary-color;
        outline-offset: 2px;
    }
}

.toggle-icon {
    display: flex;
    flex-direction: column;
    width: 24px;
    height: 18px;
    justify-content: space-between;

    span {
        display: block;
        height: 2px;
        width: 100%;
        background-color: $text-color-invert;
        border-radius: 1px;
        transition: all 0.3s ease;
        transform-origin: center;
    }

    &.is-open {
        span:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
        }

        span:nth-child(2) {
            opacity: 0;
        }

        span:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
        }
    }
}
</style>