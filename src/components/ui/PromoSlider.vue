<template>
    <div class="promo-slider" :style="{ backgroundImage: `url(/slider-bg.png)` }">
        <swiper
            :navigation="true"
            :pagination="{ clickable: true }"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide v-for="(slide, index) in slides" :key="index">
                <div class="slide-content">
                    <div class="left-panel">
                        <div class="text-content">
                            <p class="small-title">{{ slide.smallTitle }}</p>
                            <h2 class="main-title">{{ slide.title }}</h2>
                            <p class="bonus-amount">{{ slide.bonus }}</p>
                            <p class="bonus-description">{{ slide.description }}</p>
                        </div>
                        <button class="deposit-button">Deposit</button>
                    </div>
                    <div class="right-panel">
                        <img :src="slide.hero" alt="Character" class="hero-image" />
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { ref } from 'vue';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

const modules = [Navigation, Pagination];

const slides = ref([
    {
        smallTitle: 'SELECT YOUR CHARACTER',
        title: 'Emerald Welcome Bonus',
        bonus: '200$',
        description: 'Lucky Month Bonus',
        hero: '/hero.png'
    },
    {
        smallTitle: 'CHOOSE YOUR DESTINY',
        title: 'Sapphire Starter Pack',
        bonus: '150$',
        description: 'New Player Special',
        hero: '/hero.png'
    },
    {
        smallTitle: 'CLAIM YOUR REWARD',
        title: 'Ruby Riches',
        bonus: '300$',
        description: 'High Roller Bonus',
        hero: '/hero.png'
    }
]);
</script>

<style>
/* Global Swiper overrides for this component */
.promo-slider .swiper-button-prev,
.promo-slider .swiper-button-next {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    color: white;
    transition: background-color 0.3s ease;
}
.promo-slider .swiper-button-prev:hover,
.promo-slider .swiper-button-next:hover {
    background-color: rgba(0, 0, 0, 0.8);
}
.promo-slider .swiper-button-prev::after,
.promo-slider .swiper-button-next::after {
    font-size: 18px;
    font-weight: bold;
}

.promo-slider .swiper-pagination-bullet {
    background: rgba(255, 255, 255, 0.5);
    width: 10px;
    height: 10px;
    opacity: 1;
}

.promo-slider .swiper-pagination-bullet-active {
    background: #ffffff;
}
</style>

<style scoped>
.promo-slider {
    position: relative;
    width: 100%;
    max-width: 1000px; /* Adjusted for image aspect ratio */
    margin: 2rem auto;
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    overflow: hidden;
    color: #fff;
}

.mySwiper {
    width: 100%;
    height: 400px; /* Adjust height as needed */
}

.swiper-slide {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slide-content {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    padding: 0 5%;
}

.left-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    padding-right: 2rem;
}

.text-content {
    margin-bottom: 2rem;
}

.small-title {
    font-size: 0.9rem;
    font-weight: bold;
    color: #9EEF9E; /* Light green from screenshot */
    margin-bottom: 0.5rem;
    letter-spacing: 1px;
}

.main-title {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.bonus-amount {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 0.25rem;
}

.bonus-description {
    font-size: 1rem;
    color: #ccc;
}

.deposit-button {
    background: linear-gradient(180deg, #FFB800 0%, #FF8A00 100%);
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    padding: 1rem 2.5rem;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.deposit-button:hover {
    transform: scale(1.05);
}

.right-panel {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.hero-image {
    max-width: 100%;
    max-height: 90%;
    object-fit: contain;
}
</style>
