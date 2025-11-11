<template>
    <div class="custom-slider">
        <div class="slider-content">
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

        <div class="slider-visuals" ref="sliderWrapperRef">
            <div class="slides-wrapper">
                <div
                    v-for="(slide, index) in slidesData"
                    :key="index"
                    class="slide"
                    :style="getSlideStyle(index)"
                >
                    <div class="ring-container">
                        <img :src="slide.ringImage" :alt="slide.title" class="ring-image" draggable="false"/>
                    </div>
                </div>
            </div>

            <button @click="prev" class="nav-button prev-button">
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="49" height="49" rx="24.5" fill="#144A3C" fill-opacity="0.8"/>
                    <path
                        d="M27.6661 32C27.8502 32.0003 27.9997 31.8546 28 31.6745C28.0002 31.5877 27.9649 31.5044 27.9021 31.443L20.8048 24.5002L27.9021 17.5574C28.0324 17.4298 28.0324 17.2231 27.9021 17.0956C27.7717 16.9681 27.5605 16.9681 27.4301 17.0956L20.0976 24.2694C19.9675 24.3967 19.9675 24.6031 20.0976 24.7304L27.4301 31.9041C27.4926 31.9655 27.5775 32 27.6661 32Z"
                        fill="white" stroke="white"/>
                </svg>
            </button>
            <button @click="next" class="nav-button next-button">
                <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="48.998" y="49" width="49" height="49" rx="24.5" transform="rotate(-180 48.998 49)"
                          fill="#144A3C" fill-opacity="0.8"/>
                    <path
                        d="M21.3319 17C21.1479 16.9997 20.9984 17.1454 20.998 17.3255C20.9979 17.4123 21.0331 17.4956 21.096 17.557L28.1932 24.4998L21.096 31.4426C20.9656 31.5702 20.9656 31.7769 21.096 31.9044C21.2263 32.0319 21.4376 32.0319 21.5679 31.9044L28.9005 24.7306C29.0306 24.6033 29.0306 24.3969 28.9005 24.2696L21.5679 17.0959C21.5054 17.0345 21.4205 17 21.3319 17Z"
                        fill="white" stroke="white"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useDraggable } from '@vueuse/core';

// Data for the slides
const slidesData = ref([
    { title: 'Emerald Bonus', spins: '200', game: 'Sugar Rush', ringImage: '/ring-1.png', smallTitle: 'SELECT YOUR BONUS', gameIcon: '/sugar-rush-icon.png' },
    { title: 'Sapphire Pack', spins: '150', game: 'Sweet Bonanza', ringImage: '/ring-2.png', smallTitle: 'SELECT YOUR BONUS', gameIcon: '/sugar-rush-icon.png' },
    { title: 'Ruby Riches', spins: '300', game: 'Gates of Olympus', ringImage: '/ring-3.png', smallTitle: 'SELECT YOUR BONUS', gameIcon: '/sugar-rush-icon.png' },
    { title: 'Gold Fortune', spins: '100', game: 'Big Bass', ringImage: '/ring-1.png', smallTitle: 'SELECT YOUR BONUS', gameIcon: '/sugar-rush-icon.png' },
    { title: 'Diamond Deal', spins: '250', game: 'Starlight Princess', ringImage: '/ring-2.png', smallTitle: 'SELECT YOUR BONUS', gameIcon: '/sugar-rush-icon.png' },
]);

const totalSlides = computed(() => slidesData.value.length);
const currentSlideIndex = ref(0); // The index of the slide in the CENTER

// Navigation functions
const next = () => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % totalSlides.value;
};

const prev = () => {
    currentSlideIndex.value = (currentSlideIndex.value - 1 + totalSlides.value) % totalSlides.value;
};

// Computed property to get the data of the currently active (center) slide
const currentSlideData = computed(() => slidesData.value[currentSlideIndex.value]);

// Function to dynamically calculate styles for each slide
const getSlideStyle = (slideIndex) => {
    const offset = slideIndex - currentSlideIndex.value;
    const total = totalSlides.value;
    const visibleSlides = 5; // How many slides are visible at once

    // This handles the circular logic
    let effectiveOffset = offset;
    if (offset > total / 2) {
        effectiveOffset = offset - total;
    }
    if (offset < -total / 2) {
        effectiveOffset = offset + total;
    }

    // Hide slides that are too far away
    if (Math.abs(effectiveOffset) >= Math.floor(visibleSlides / 2) + 1) {
        return { opacity: 0, transform: `scale(0)` };
    }

    const scale = 1 - Math.abs(effectiveOffset) * 0.2;
    const translateX = effectiveOffset * 60; // % translation per offset unit
    const zIndex = total - Math.abs(effectiveOffset);
    const filter = `blur(${Math.abs(effectiveOffset) * 2}px)`;
    const opacity = 1 - Math.abs(effectiveOffset) * 0.4;

    return {
        transform: `translateX(${translateX}%) scale(${scale})`,
        zIndex,
        filter,
        opacity,
    };
};


// Swipe gesture implementation
const sliderWrapperRef = ref(null);
const { x, isDragging } = useDraggable(sliderWrapperRef, {
  onEnd: () => {
    const dragDistance = x.value;
    const SWIPE_THRESHOLD = 50;

    if (dragDistance < -SWIPE_THRESHOLD) {
      next();
    } else if (dragDistance > SWIPE_THRESHOLD) {
      prev();
    }
  },
});
</script>

<style scoped>
.custom-slider {
    display: flex;
    position: relative;
    width: 100%;
    max-width: 1000px;
    height: 400px;
    margin: 2rem auto;
    background-image: url('/slider-bg.png');
    background-size: cover;
    background-position: center;
    border-radius: 16px;
    overflow: hidden;
    color: #fff;
}

.slider-content {
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 3rem;
    z-index: 10;
}

.slider-visuals {
    flex-basis: 60%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slides-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: grab;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.slides-wrapper.is-dragging {
    cursor: grabbing;
}

.slide {
    position: absolute;
    width: 250px;
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
                opacity 0.6s ease,
                filter 0.6s ease;
    transform-origin: center center;
    pointer-events: none;
}

.ring-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.ring-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

/* Navigation Buttons */
.nav-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 49px;
    height: 49px;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    z-index: 15;
}

.nav-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.prev-button {
    left: 20px;
}

.next-button {
    right: 20px;
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
</style>
