<template>
    <div class="slider-container">
        <swiper
            :navigation="true"
            :pagination="{ clickable: true }"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide>Slide 1</swiper-slide>
            <swiper-slide>Slide 2</swiper-slide>
            <swiper-slide>Slide 3</swiper-slide>
            <swiper-slide>Slide 4</swiper-slide>
            <swiper-slide>Slide 5</swiper-slide>
            <swiper-slide>Slide 6</swiper-slide>
            <swiper-slide>Slide 7</swiper-slide>
            <swiper-slide>Slide 8</swiper-slide>
            <swiper-slide>Slide 9</swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

const modules = [Navigation, Pagination];
</script>

<style scoped>
.slider-container {
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 2rem;
    box-sizing: border-box;
}

.mySwiper {
    width: 100%;
    height: 300px;
    border-radius: 8px;
}

.swiper-slide {
    text-align: center;
    font-size: 22px;
    font-weight: bold;
    color: #fff;
    background: #4a90e2;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}
</style>
