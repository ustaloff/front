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
        ringImage: '/ben_0.webp' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Sapphire Welcome Bonus',
        spins: '150',
        game: 'Sweet Bonanza',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/indy_0.webp' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Ruby Welcome Bonus',
        spins: '300',
        game: 'Gates of Olympus',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/lara_0.webp' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Emerald Welcome Bonus',
        spins: '200',
        game: 'Sugar Rush',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/ben_0.webp' // Using provided image
    },
    {
        smallTitle: 'SELECT YOUR BONUS',
        title: 'Sapphire Welcome Bonus',
        spins: '150',
        game: 'Sweet Bonanza',
        gameIcon: '/sugar-rush-icon.png', // Placeholder
        ringImage: '/indy_0.webp' // Using provided image
    },

]);

// Initialize the 3D carousel composable with options
const carousel = use3DCarousel({
    slidesData: slidesData,
    radiusPercentage: 30,
    slideSizePercentage: 60,
    maxVisibleAngle: Math.PI / 1.5,
    minScale: 0.6,
    minOpacity: 1.0,
});

// Computed property to get the data of the currently active slide
const currentSlideData = computed(() => {
    return slidesData.value[carousel.activeIndex.value];
});
</script>

<style lang="scss" scoped>
@use '@/assets/components/media/Slider'
</style>