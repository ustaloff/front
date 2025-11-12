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
import { defineProps } from 'vue';

// Определяем пропс для текущего слайда
const props = defineProps({
    currentSlideData: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.slider-content {
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 3rem;
    z-index: 10;
}

/* Left Panel Styles */
.small-title {
    font-size: 0.9rem;
    font-weight: bold;
    color: #9EEF9E;
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
}

.main-title {
    font-size: 2.2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

.bonus-details {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.bonus-spins {
    font-size: 3rem;
    font-weight: bold;
}

.bonus-game span {
    display: block;
}

.game-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.25rem;
}

.game-icon {
    width: 24px;
    height: 24px;
    border-radius: 4px;
}

.claim-button {
    background: linear-gradient(180deg, #FFB800 0%, #FF8A00 100%);
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    padding: 0.8rem 2rem;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.claim-button:hover {
    transform: scale(1.05);
}

/* Адаптивные стили для планшетов */
@media (max-width: 768px) {
    .slider-content {
        padding: 1.5rem 2rem;
        flex-basis: 45%;
    }
    
    .main-title {
        font-size: 1.8rem;
    }
    
    .bonus-spins {
        font-size: 2.5rem;
    }
    
    .claim-button {
        padding: 0.7rem 1.5rem;
        font-size: 0.9rem;
    }
}

/* Адаптивные стили для мобильных устройств */
@media (max-width: 480px) {
    .slider-content {
        flex-basis: 100%;
        padding: 1.5rem 1.5rem 3rem;
    }
    
    .small-title {
        font-size: 0.8rem;
    }
    
    .main-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    
    .bonus-details {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }
    
    .bonus-spins {
        font-size: 2rem;
    }
    
    .claim-button {
        padding: 0.8rem 2rem;
        width: 100%;
    }
}
</style>