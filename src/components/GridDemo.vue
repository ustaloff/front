<template>
    <div class="grid-demo">
        <div class="grid-demo__child">

        </div>
        <div class="grid-demo__child">

        </div>
        <div class="grid-demo__child">

        </div>

    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.grid-demo {

    border: solid 2px red;

    display: grid;
    grid-template-columns: repeat(2, 1fr);
    //grid-template-columns: repeat(auto-fill, minmax(calc(50% - 1rem), 1fr));
    gap: 1rem;

    &__child {
        height: 20px;
        border: solid 2px green;

        &:only-child {
            grid-column: 1 / -1;
        }
    }
}

</style>