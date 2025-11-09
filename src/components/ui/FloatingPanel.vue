<template>
    <div
        v-if="show"
        ref="floatingElement"
        :style="{
            position: strategy,
            top: `${y ?? 0}px`,
            left: `${x ?? 0}px`,
            width: 'max-content',
        }"
        class="popover"
    >
        <div
            v-if="showArrow"
            ref="arrowElement"
            class="arrow"
            :style="{
                left: arrowX != null ? `${arrowX}px` : '',
                top: arrowY != null ? `${arrowY}px` : '',
                [staticSide]: '-4px',
            }"
        />
        <div
            class="popover-content"
            :style="{
                maxHeight: popoverMaxHeight ? `${popoverMaxHeight}px` : '',
                minHeight: popoverMinHeight ? `${popoverMinHeight}px` : '',
                overflowY: 'auto',
            }"
        >
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
    show: {
        type: Boolean,
        default: false
    },
    x: {
        type: Number,
        default: 0
    },
    y: {
        type: Number,
        default: 0
    },
    strategy: {
        type: String,
        default: 'absolute'
    },
    showArrow: {
        type: Boolean,
        default: false
    },
    arrowX: {
        type: Number,
        default: null
    },
    arrowY: {
        type: Number,
        default: null
    },
    staticSide: {
        type: String,
        default: 'top'
    },
    popoverMaxHeight: {
        type: Number,
        default: null
    },
    popoverMinHeight: {
        type: Number,
        default: null
    }
});

const floatingElement = ref(null);
const arrowElement = ref(null);

defineExpose({
    floatingElement,
    arrowElement
});
</script>

<style scoped lang="scss">
.popover {
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    z-index: 999;
}

.popover-content {
    padding: 1rem;
}

.arrow {
    position: absolute;
    background: #ffffff;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
}

.dark .popover {
    background: #1e293b;
    border-color: #475569;
    color: #ffffff;
}

.dark .arrow {
    background: #1e293b;
}
</style>
