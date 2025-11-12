<template>
    <div class="custom-slider">
        <Content :current-slide-data="currentSlideData" />
        <Carousel
            :slides-data="slidesData"
            :carousel="carousel"
            :slider-wrapper-ref="carousel.sliderWrapperRef"
        />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { use3DCarousel } from '@/composables/use3DCarousel';

import Carousel from './Carousel.vue';
import Content from './Content.vue';

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
    radiusPercentage: 40,  // Радиус в процентах от ширины контейнера
    slideSizePercentage: 40, // Размер слайда в процентах от ширины контейнера
    maxVisibleAngle: Math.PI / 1.8,
    minScale: 0.5,
    minOpacity: 0.5,
    maxRotation: 30,
    swipeThresholdPercentage: 10  // Порог свайпа в процентах от ширины контейнера
});

// Computed property to get the data of the currently active slide
const currentSlideData = computed(() => {
    return slidesData.value[carousel.activeIndex.value];
});
</script>

<style lang="scss" scoped>
@use '@/assets/components/media/Slider'
</style>