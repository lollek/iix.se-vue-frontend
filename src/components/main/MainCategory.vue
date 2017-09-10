<template>
    <router-link :to="{ name: category.link }">
        <div class="card">
            <div class="card-image tablet-max-width-300">
                <figure class="image">
                    <img :src="category.img">
                </figure>
            </div>
            <div class="card-content">
                <div class="content">
                    {{ category.text }}
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'main-category',
        props: [ 'category' ]
    }
</script>

<style scoped>
    @media screen and (min-device-width: 769px) {
        .tablet-max-width-300 {
            width: 300px;
        }
    }
</style>
