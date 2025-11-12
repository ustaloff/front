<template>
    <div class="custom-slider">
        <SliderContent :current-slide-data="currentSlideData" />
        <CarouselVisuals
            :slides-data="slidesData"
            :carousel="carousel"
            :slider-wrapper-ref="carousel.sliderWrapperRef"
        />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { use3DCarousel } from '@/composables/use3DCarousel';

import CarouselVisuals from './CarouselVisuals.vue';
import SliderContent from './SliderContent.vue';

// Data for the slides
const slidesData = ref([
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Emerald Welcome Bonus',
        spins: '200',
        game: 'Sugar Rush',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/ring-1.png' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Sapphire Welcome Bonus',
        spins: '150',
        game: 'Sweet Bonanza',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/ring-2.png' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Ruby Welcome Bonus',
        spins: '300',
        game: 'Gates of Olympus',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/ring-3.png' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Emerald Welcome Bonus',
        spins: '200',
        game: 'Sugar Rush',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/ring-1.png' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Sapphire Welcome Bonus',
        spins: '150',
        game: 'Sweet Bonanza',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/ring-2.png' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Ruby Welcome Bonus',
        spins: '300',
        game: 'Gates of Olympus',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/ring-3.png' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Ruby Welcome Bonus',
        spins: '300',
        game: 'Gates of Olympus',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/ring-3.png' // Using provided image
    },
]);

// Initialize the 3D carousel composable with options
const carousel = use3DCarousel({
    slidesData: slidesData,
    radius: 400,
    baseSlideSize: 700,  // Базовый размер слайда
    maxVisibleAngle: Math.PI / 1.8,
    minScale: 0.5,
    minOpacity: 0.5,
    maxRotation: 30,
    swipeThreshold: 100
});

// Computed property to get the data of the currently active slide
const currentSlideData = computed(() => {
    return slidesData.value[carousel.activeIndex.value];
});
</script>

<style scoped>
.custom-slider {
    display: flex;
    position: relative;
    width: 100%;
    max-width: 1000px;
    height: 400px;
    min-height: 300px; /* Минимальная высота для маленьких экранов */
    margin: 2rem auto;
    background-image: url('/slider-bg.png'); /* Using provided background image */
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    overflow: hidden;
    color: #fff;
}

/* Адаптивные стили для планшетов */
@media (max-width: 768px) {
    .custom-slider {
        height: 300px;
        margin: 1rem auto;
        border-radius: 12px;
    }
}

/* Адаптивные стили для мобильных устройств */
@media (max-width: 480px) {
    .custom-slider {
        flex-direction: column; /* На мобильных устройствах меняем расположение */
        height: auto;
        min-height: 400px;
    }
}
</style>