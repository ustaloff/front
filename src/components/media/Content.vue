<template>
    <div class="slider-content">
        <!-- Content for the left panel will go here -->
        <p class="small-title">{{ currentSlideData.smallTitle }}</p>
        <h2 class="main-title">{{ currentSlideData.title }}</h2>
        <div class="bonus-details">
            <p class="bonus-spins">{{ currentSlideData.spins }}</p>
            <div class="bonus-game">
                <span>Free Spins in</span>
                <div class="game-info">
                    <img :src="currentSlideData.gameIcon" :alt="currentSlideData.game" class="game-icon">
                    <span>{{ currentSlideData.game }}</span>
                </div>
            </div>
        </div>
        <button class="claim-button">Claim bonus</button>
    </div>
</template>

<script setup>
/**
 * Компонент для отображения содержимого слайдера (левая панель)
 */

// Определяем пропс для текущего слайда
defineProps({
    currentSlideData: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/components/media/Content'
</style>