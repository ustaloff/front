<script setup>
import { useAuthStore } from '@/stores/auth'
import { useSidebar, closeSidebar, handleBeforeHide } from '@/composables/useSidebar'
import { watch } from 'vue'
import { UI_CONFIG } from '@/config'

const auth = useAuthStore()
const {
    isOpen,
    isExpanded,
    isMobile,
    sidebarState,
    toggleExpansion,
    toggleSidebar
} = useSidebar(UI_CONFIG.SIDEBAR_BREAKPOINT)

// Обработчик клика по логотипу для переключения expansion
const handleToggleClick = () => {
    console.log('handleLogoClick');
    toggleSidebar()
}

// Обработчик закрытия drawer
const handleDrawerHide = () => {
    // На мобильных закрываем всегда (по overlay или крестику)
    // На десктопе закрываем только по крестику (dismissable=false предотвращает закрытие по overlay)
    closeSidebar()
}

// 🔥 Вызывается ПЕРЕД началом анимации закрытия
const onBeforeHide = () => {
    handleBeforeHide()
}


/*watch([isOpen, isExpanded, isMobile], ([newIsOpen, newIsExpanded, newIsMobile]) => {
    // console.log('AppSidebar state changed:', { isOpen: newIsOpen, isExpanded: newIsExpanded, isMobile: newIsMobile })
}, {immediate: true})*/
</script>

<template>
    <div>
        <div v-if="true"
             style="position: fixed; top: 100px; right: 10px; background: black; padding: 10px; border: 1px solid black; z-index: 9999;">
            Debug: isOpen={{ isOpen }}, isExpanded={{ isExpanded }}, isMobile={{ isMobile }}
            <br>
            <!--            <button @click="() => sidebarState.isOpen = !sidebarState.isOpen">Toggle Test</button>-->
            <!--            <button @click="() => handleLogoClick">Toggle Test</button>-->
            <button @click="handleToggleClick">Toggle Test</button>

        </div>


        <Drawer
            v-model:visible="sidebarState.isOpen"
            :modal="isMobile"
            :show-close-icon="true"
            :block-scroll="false"
            :dismissable="isMobile"
            :closeOnEscape="isMobile"
            position="left"
            class="sidebar"
            :class="{
            'sidebar--expanded': isExpanded,
            'sidebar--minimized': !isExpanded && !isMobile,
            'sidebar--mobile': isMobile,
            'sidebar--open': isOpen,
        }"
            @hide="onBeforeHide"
        >
            <template #container>
                <div class="sidebar__header">
                    <a
                        href="javascript:void(0)"
                        class="sidebar__logo"
                        @click="handleToggleClick"
                        :aria-label="isExpanded ? 'Свернуть меню' : 'Развернуть меню'"
                    >
                        <span class="logo-text">CodeCraft</span>
                    </a>
                </div>

                <div class="sidebar__content">
                    <nav class="sidebar__nav">
                        <ul class="sidebar-menu">
                            <li>
                                <router-link to="/">
                                    <span class="icon">🎮</span>
                                    <span>Главная</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/clamp-generator">
                                    <span class="icon">📐</span>
                                    <span>Clamp Generator</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/css-filter-generator">
                                    <span class="icon">🎨</span>
                                    <span>CSS Filter Generator</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/device-breakpoint-demo">
                                    <span class="icon">📱</span>
                                    <span>Device Breakpoints</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/primevue-demo">
                                    <span class="icon">📱</span>
                                    <span>PrimeVue Demo</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/grid-demo">
                                    <span class="icon">📱</span>
                                    <span>Grid Demo</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/wheel-demo">
                                    <span class="icon">📱</span>
                                    <span>Wheel Demo</span>
                                </router-link>
                            </li>
                            <li v-if="auth.user">
                                <router-link to="/profile">
                                    <span class="icon">👤</span>
                                    <span>Профиль</span>
                                </router-link>
                            </li>

                            <li v-if="auth.user">
                                <router-link to="/admin">
                                    <span class="icon">⚙️</span>
                                    <span>Админ панель</span>
                                </router-link>
                            </li>
                        </ul>
                    </nav>

                    <div v-if="auth.user" class="sidebar__user">
                        <div class="user-info">
                            <h4><span>{{ auth.displayName }}</span></h4>
                            <p class="balance"><span>1000 ₽</span></p>
                        </div>
                    </div>
                </div>
            </template>
        </Drawer>
    </div>
</template>

<style lang="scss">
@use '@/assets/sidebar'
</style>