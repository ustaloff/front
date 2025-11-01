<script setup>
import {RouterView} from 'vue-router'
import {useAuthStore} from '@/stores/auth'
import {onMounted} from 'vue'
import {AppHeader, AppSidebar, AppMain, AppFooter} from '@/components/layout'

const auth = useAuthStore()

// Проверяем авторизацию при загрузке приложения
onMounted(() => {
    if (auth.token && !auth.user) {
        auth.fetchUser()
    }
})
</script>

<template>
    <AppHeader/>
    <AppSidebar/>
    <AppMain>
        <RouterView/>
    </AppMain>
    <AppFooter/>
</template>

<style>
/* Глобальные стили для #app с Grid layout */
#app {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 
        "header header"
        "sidebar main"
        "footer footer";
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

/* Назначаем области Grid для каждого компонента */
#app > :nth-child(1) { /* AppHeader */
    grid-area: header;
}

#app > :nth-child(2) { /* AppSidebar */
    grid-area: sidebar;
}

#app > :nth-child(3) { /* AppMain */
    grid-area: main;
}

#app > :nth-child(4) { /* AppFooter */
    grid-area: footer;
}

/* Адаптивность для планшетов */
@media (max-width: 1024px) {
    #app {
        grid-template-columns: 200px 1fr;
    }
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
    #app {
        grid-template-columns: 1fr;
        grid-template-rows: auto auto 1fr auto;
        grid-template-areas: 
            "header"
            "sidebar"
            "main"
            "footer";
    }
}

/* Очень маленькие экраны */
@media (max-width: 480px) {
    #app {
        max-width: 100%;
        margin: 0;
    }
}
</style>
