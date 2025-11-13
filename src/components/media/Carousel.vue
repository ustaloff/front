<template>
    <div class="slider-visuals">
        <div
            class="slides-wrapper"
            :ref="sliderWrapperRef"
            :class="{ 'is-dragging': carousel.isSwiping?.value }"
        >
            <div
                v-for="(slide, index) in slidesData"
                :key="index"
                :class="['slide', carousel.getSlideClass(index)]"
                :style="carousel.getSlideStyle(index)"
            >
                <div class="ring-container">
                    <img :src="slide.ringImage" :alt="slide.title" class="ring-image" draggable="false"/>
                </div>
            </div>
        </div>

        <button @click="carousel.prev" class="nav-button prev-button">
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="49" height="49" rx="24.5" fill="#144A3C" fill-opacity="0.8"/>
                <path
                    d="M27.6661 32C27.8502 32.0003 27.9997 31.8546 28 31.6745C28.0002 31.5877 27.9649 31.5044 27.9021 31.443L20.8048 24.5002L27.9021 17.5574C28.0324 17.4298 28.0324 17.2231 27.9021 17.0956C27.7717 16.9681 27.5605 16.9681 27.4301 17.0956L20.0976 24.2694C19.9675 24.3967 19.9675 24.6031 20.0976 24.7304L27.4301 31.9041C27.4926 31.9655 27.5775 32 27.6661 32Z"
                    fill="white" stroke="white"/>
            </svg>
        </button>
        <button @click="carousel.next" class="nav-button next-button">
            <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="48.998" y="49" width="49" height="49" rx="24.5" transform="rotate(-180 48.998 49)"
                      fill="#144A3C" fill-opacity="0.8"/>
                <path
                    d="M21.3319 17C21.1479 16.9997 20.9984 17.1454 20.998 17.3255C20.9979 17.4123 21.0331 17.4956 21.096 17.557L28.1932 24.4998L21.096 31.4426C20.9656 31.5702 20.9656 31.7769 21.096 31.9044C21.2263 32.0319 21.4376 32.0319 21.5679 31.9044L28.9005 24.7306C29.0306 24.6033 29.0306 24.3969 28.9005 24.2696L21.5679 17.0959C21.5054 17.0345 21.4205 17 21.3319 17Z"
                    fill="white" stroke="white"/>
            </svg>
        </button>
    </div>
</template>

<script setup>
/**
 * Компонент для визуального отображения 3D карусели
 * Использует переданный carousel composable для управления состоянием карусели
 */

defineProps({
    slidesData: {
        type: Array,
        required: true
    },
    carousel: {
        type: Object,
        required: true
    },
    sliderWrapperRef: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss" scoped>
@use '@/assets/components/media/Carousel'
</style>