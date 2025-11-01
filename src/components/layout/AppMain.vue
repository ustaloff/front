<template>
    <main class="app-main">
        <slot/>
    </main>
</template>

<style lang="scss" scoped>
@use '@/assets/variables' as *;

.app-main {
    padding: max(2rem, 8%);
    background: $main-bg;
}
</style>