<template>
    <Header/>
    <Sidebar/>
    <Main>
        <RouterView/>
    </Main>
    <Footer/>
</template>

<script setup>
import { RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDeviceStore } from '@/stores/device'
import { onMounted, onUnmounted } from 'vue'
import { Header, Sidebar, Main, Footer } from '@/components/layout'

const auth = useAuthStore()
const deviceStore = useDeviceStore()

// Проверяем авторизацию при загрузке приложения
onMounted(() => {
    if (auth.token && !auth.user) {
        auth.fetchUser()
    }

    // Инициализируем определение устройства
    deviceStore.checkDevice()
    // Инициализируем слушатели событий
    deviceStore.initResizeListener()
})

// Очищаем слушатели при размонтировании
onUnmounted(() => {
    deviceStore.cleanupListeners()
})
</script>