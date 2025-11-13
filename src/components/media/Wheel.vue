<template>
    <div class="fortune-wheel" :style="wheelStyles">
        <div class="fortune-wheel__wrapper">
            <!-- The core spinning wheel -->
            <div
                class="wheel"
                :class="{ '--spinning': isSpinning }"
                :style="{ transform: `rotate(${wheelRotation}deg)` }"
            >
                <div class="wheel__layer-container --shadow-outer" />
                <div class="wheel__layer-container --shadow-inner" />
                <div class="wheel__layer-container --background" />

                <!-- Layer for shadows -->
                <div class="wheel__layer-container --shadows">
                    <div
                        v-for="(slice, index) in slices"
                        :key="`shadow-${slice.id}`"
                        class="wheel__shard"
                        :style="getShadowStyle(index)"
                    />
                </div>

                <!-- Layer for slice polygons/backgrounds -->
                <div class="wheel__layer-container --polygons">
                    <div
                        v-for="(slice, index) in slices"
                        :key="`polygon-${slice.id}`"
                        class="wheel__shard"
                        :style="getShardStyle(slice, index)"
                    />
                </div>

                <!-- Layer for slice prize text -->
                <div class="wheel__layer-container --prizes">
                    <div
                        v-for="(slice, index) in slices"
                        :key="`prize-${slice.id}`"
                        class="wheel__shard --prize"
                        :style="getPrizeShardStyle(index)"
                    >
                        <span class="wheel__prize-text" :style="{ color: slice.text_color }">
                            {{ slice.lotteryAward.title }}
                        </span>
                    </div>
                </div>

                <!-- Layer for borders between slices -->
                <div class="wheel__layer-container --borders">
                    <div
                        v-for="(slice, index) in slices"
                        :key="`border-${slice.id}`"
                        class="wheel__shard --border"
                        :style="getBorderStyle(index)"
                    />
                </div>
            </div>

            <!-- Decorative layers (can be customized or removed) -->
            <div class="wheel-decorator --adv">
                <div class="wheel-decorator__container" v-for="i in 5" :key="`adv-${i}`" />
            </div>
            <div class="wheel-decorator --aux">
                <div class="wheel-decorator__container" v-for="i in 5" :key="`aux-${i}`" />
            </div>

            <!-- Spin Button -->
            <div
                class="spin-button"
                :class="{ '--active': isSpinning }"
                @click="handleSpin"
            >
                SPIN
            </div>
        </div>

        <!-- Pointer -->
        <div class="wheel-pointer">
            <div class="wheel-pointer__arrow" />
        </div>
    </div>
</template>

<script setup>
import { computed, toRef } from 'vue';
import { useWheel, SPIN_DURATION } from '../../composables/useWheel.js';

const props = defineProps({
    slices: {
        type: Array,
        required: true,
    },
});

const emit = defineEmits(['spin-start', 'spin-end']);

const { isSpinning, wheelRotation, spin, selectedPrize } = useWheel(toRef(props, 'slices'));

const handleSpin = async () => {
    if (isSpinning.value) return;

    emit('spin-start');
    try {
        const prize = await spin();
        emit('spin-end', prize);
    } catch (error) {
        console.error(error);
        emit('spin-end', null); // Or handle error state
    }
};

// CSS Variables for dynamic styling
const wheelStyles = computed(() => ({
    '--slice-count': props.slices.length,
    '--spin-duration': `${SPIN_DURATION}ms`,
}));

const baseAngle = computed(() => 180 / props.slices.length);

const basePercent = computed(() => {
    const tan = Math.tan(baseAngle.value * Math.PI / 180);
    return 100 * tan;
});

const baseClipPath = computed(() => {
    const percent = basePercent.value;
    return `polygon(${(100 - percent) / 2}% 0%, 50% 100%, ${(100 + percent) / 2}% 0%)`;
});

const getRotation = (index) => (360 / props.slices.length) * index;

const getShardStyle = (slice, index) => ({
    transform: `rotate(${getRotation(index)}deg)`,
    clipPath: baseClipPath.value,
    background: `linear-gradient(0deg, ${slice.background_gradient_start_color} 0%, ${slice.background_gradient_end_color} 100%)`,
});

const getPrizeShardStyle = (index) => ({
    transform: `rotate(${getRotation(index)}deg)`,
});

const getBorderStyle = (index) => ({
    transform: `rotate(${getRotation(index)}deg)`,
    clipPath: `polygon(calc(${(100 - basePercent.value) / 2}% - 1px) 0, calc(${(100 - basePercent.value) / 2}% + 1px) 0, calc(50% + 1px) 100%, calc(50% - 1px) 100%)`,
});

const getShadowStyle = (index) => {
    const rotation = getRotation(index);
    const clipPath = `polygon(calc(${(100 - basePercent.value) / 2}% + 0px) 0, calc(${(100 - basePercent.value) / 2}% + 20px) 0, calc(50% + 20px) 100%, calc(50% + 0px) 100%)`;
    const gradientAngle = 90 - baseAngle.value;
    const gradient = `linear-gradient(${gradientAngle}deg, rgba(0, 0, 0, 0) calc(${(100 - basePercent.value) / 2 + basePercent.value / 4}%), rgba(0, 0, 0, 1) calc(${(100 - basePercent.value) / 2 + basePercent.value / 4}%), rgba(0, 0, 0, 0) calc(${(100 - basePercent.value) / 2 + basePercent.value / 4}% + 20px), rgba(0, 0, 0, 0) calc(${(100 - basePercent.value) / 2 + basePercent.value / 4}% + 20px))`;

    return {
        transform: `rotate(${rotation}deg)`,
        clipPath,
        background: gradient
    };
};
</script>

<style lang="scss" scoped>
// CSS Variables for theming
.fortune-wheel {
    --wheel-size: 600px;
    --button-size: 27%;
    --pointer-color: #ff6b6b;
    --border-color: #455a63;
    --spin-button-bg: linear-gradient(135deg, #ff6b6b, #ee5a24);
    --font-size: clamp(0.8rem, 0.4rem + 2.7cqw, 1.5rem);

    width: 100%;
    max-width: var(--wheel-size);
    overflow: hidden;
    position: relative;
    margin: 0 auto;

    // Aspect ratio keeper
    &:before {
        content: '';
        display: block;
        padding-bottom: 100%;
    }
}

.fortune-wheel__wrapper {
    width: 100%;
    height: 100%;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

.wheel {
    width: 80%;
    height: 80%;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    border-radius: 50%;
    transition: transform var(--spin-duration) cubic-bezier(0.44, -0.2, 0, 1.13);
    container-type: inline-size;

    // Handle case with few slices where clip-path is not needed
    &.--slice-count-2 .wheel__shard {
        clip-path: none !important;
    }
}

.wheel__layer-container {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    overflow: hidden;

    &.--shadow-outer {
        background: radial-gradient(circle, transparent 60%, rgba(0, 0, 0, 0.7) 90%, black 100%);
        z-index: 7;
    }
    &.--shadow-inner {
        background: radial-gradient(circle, rgba(0, 0, 0, 0.2) 0%, transparent 50%);
        z-index: 6;
    }
    &.--borders { z-index: 5; }
    &.--shadows { z-index: 4; }
    &.--prizes { z-index: 3; }
    &.--polygons { z-index: 2; }
    &.--background {
        background: radial-gradient(circle, #153e56 0%, #09c38b 80%);
        z-index: 1;
    }
}

.wheel__shard {
    width: 100%;
    height: 50%;
    position: absolute;
    transform-origin: bottom;
    will-change: transform;

    &.--prize {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &.--border {
        background: var(--border-color);
    }
}

.wheel__prize-text {
    font-size: var(--font-size);
    font-weight: 800;
    line-height: 1;
    text-align: center;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    backface-visibility: hidden;
    transform: rotate(-90deg);
    padding-inline-start: 15%;
    margin-inline-start: 1%;
    display: inline-block;
}

.wheel-decorator {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    border-radius: 50%;

    &.--adv :nth-child(5) {
        background-image: url('/public/winsroyal/lucky-wheel/border.svg');
        background-repeat: no-repeat;
        background-size: contain;
        overflow: initial;
        border-radius: 0;
        z-index: 5;
    }

    &__container {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
}

.spin-button {
    width: var(--button-size);
    height: var(--button-size);
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.2s, opacity 0.2s;
    border-radius: 50%;
    cursor: pointer;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--spin-button-bg);
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    border: 3px solid white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

    &:hover {
        transform: translate(-50%, -50%) scale(0.95);
    }

    &.--active {
        transform: translate(-50%, -50%) scale(0.9);
        pointer-events: none;
        opacity: 0.8;
    }
}

.wheel-pointer {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 15;

    &__arrow {
        width: 0;
        height: 0;
        border-left: 20px solid transparent;
        border-right: 20px solid transparent;
        border-top: 30px solid var(--pointer-color);
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));

        &::after {
            content: '';
            position: absolute;
            top: -35px;
            left: -8px;
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            border: 3px solid var(--pointer-color);
        }
    }
}

// Responsive adjustments
@media (max-width: 768px) {
    .fortune-wheel {
        --wheel-size: 350px;
        --font-size: clamp(0.7rem, 0.3rem + 2.5cqw, 1.2rem);
    }
}

@media (max-width: 480px) {
    .fortune-wheel {
        --wheel-size: 300px;
        --font-size: clamp(0.6rem, 0.2rem + 2.3cqw, 1rem);
    }
    .wheel__prize-text {
        padding-inline-start: 10%;
    }
}
</style>
