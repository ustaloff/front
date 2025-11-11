<template>
    <div class="custom-slider">
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

        <div class="slider-visuals">
            <div
                class="slides-wrapper"
                ref="sliderWrapperRef"
                :class="{ 'is-dragging': isDragging }"
            >
                <div
                    v-for="(slide, index) in slidesData"
                    :key="index"
                    :class="['slide', positions[index]]"
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
    }
]);

// Reactive array to hold the current positions of the slides
const positions = ref(['pos-1', 'pos-2', 'pos-3']); // pos-1: left, pos-2: center, pos-3: right

// Computed property to get the data of the currently active (center) slide
const currentSlideData = computed(() => {
    const centerIndex = positions.value.indexOf('pos-2');
    return slidesData.value[centerIndex];
});

// Navigation functions
const next = () => {
    const lastPos = positions.value.pop();
    positions.value.unshift(lastPos);
};

const prev = () => {
    const firstPos = positions.value.shift();
    positions.value.push(firstPos);
};

// Swipe gesture implementation using useDraggable as a detector
const sliderWrapperRef = ref(null);

const { x, isDragging } = useDraggable(sliderWrapperRef, {
  // We prevent the default behavior of applying a transform style
  // by not binding the `style` to the element.
  // We only use the `x` value to detect swipe distance.
  onEnd: () => {
    const dragDistance = x.value;
    const SWIPE_THRESHOLD = 50;

    if (dragDistance < -SWIPE_THRESHOLD) { // Dragged left
      next();
    } else if (dragDistance > SWIPE_THRESHOLD) { // Dragged right
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
    background-image: url('/slider-bg.png'); /* Using provided background image */
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
    width: 250px; /* Base size for slides */
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.7s ease, filter 0.7s ease, opacity 0.7s ease, z-index 0.7s ease;
    transform-origin: center center;
    pointer-events: none; /* Allow swipe events to pass through to the wrapper */
}

/* Position classes */
.pos-1 { /* Left slide */
    transform: translateX(-100%) scale(0.7);
    filter: blur(3px);
    opacity: 0.7;
    z-index: 1;
}

.pos-2 { /* Center (active) slide */
    transform: translateX(0%) scale(1.1);
    filter: blur(0);
    opacity: 1;
    z-index: 3;
}

.pos-3 { /* Right slide */
    transform: translateX(100%) scale(0.7);
    filter: blur(3px);
    opacity: 0.7;
    z-index: 1;
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
    z-index: 15; /* Ensure buttons are above slides */
}

.nav-button:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.prev-button {
    left: 0; /* Adjust as needed */
}

.next-button {
    right: 0; /* Adjust as needed */
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