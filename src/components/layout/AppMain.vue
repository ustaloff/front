<template>
    <main 
        class="app-main main-content"
        :class="{
            'sidebar-expanded': isExpanded,
            'sidebar-minimized': !isExpanded && !isMobile,
            'sidebar-open': isOpen,
        }"
    >
        <slot/>
    </main>
</template>

<script setup>
import {useSidebar} from '@/composables/useSidebar'

const {isExpanded, isMobile, isOpen} = useSidebar()
</script>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.app-main {
    //padding-block: 15px;
    //background: $main-bg;
}
</style>