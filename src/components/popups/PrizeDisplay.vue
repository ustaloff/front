<template>
    <div class="prize-overlay" @click.self="handleClose">
        <div class="prize-display">
            <h3>Congratulations!</h3>
            <p v-if="prize">{{ prize.lotteryAward.title }}</p>
            <div v-if="prize" class="prize-display__description" v-html="prize.lotteryAward.description"></div>
            <button class="prize-display__close-button" @click="handleClose">
                Close
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    prize: {
        type: Object,
        default: null,
    },
});

const emit = defineEmits(['close']);

const handleClose = () => {
    emit('close');
};
</script>

<style lang="scss" scoped>
.prize-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
    animation: overlay-fade-in 0.5s ease-out;
}

.prize-display {
    background: rgba(10, 25, 41, 0.95);
    color: white;
    padding: 25px 35px;
    border-radius: 15px;
    text-align: center;
    z-index: 21;
    animation: prize-fade-in 0.5s ease-in-out;
    border: 2px solid #4CAF50;
    box-shadow: 0 0 20px rgba(76, 175, 80, 0.5);

    h3 {
        margin: 0 0 15px 0;
        color: #4CAF50;
        font-size: 1.8rem;
        font-weight: bold;
    }

    p {
        margin: 0 0 15px 0;
        font-size: 1.4rem;
        font-weight: bold;
    }

    &__description {
        font-size: 1rem;
        margin-bottom: 20px;
        color: #eee;
        // Bypassing scoped styles for v-html content
        :deep(p) {
            margin: 5px 0;
        }
    }

    &__close-button {
        margin-top: 15px;
        padding: 10px 25px;
        background: #4CAF50;
        border: none;
        border-radius: 8px;
        color: white;
        cursor: pointer;
        font-weight: bold;
        font-size: 1rem;
        transition: background-color 0.3s;

        &:hover {
            background: #45a049;
        }
    }
}

@keyframes overlay-fade-in {
    from { background: rgba(0, 0, 0, 0); }
    to { background: rgba(0, 0, 0, 0.7); }
}

@keyframes prize-fade-in {
    from {
        opacity: 0;
        transform: scale(0.8);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
