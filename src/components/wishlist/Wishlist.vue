<template>
    <div>
        <h1 class="title">Wishlist</h1>
        <books-wishlist></books-wishlist>
    </div>
</template>

<script>
    import BooksWishlist from './BooksWishlist.vue'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            BooksWishlist
        },
        name: 'wishlist'
    }
</script>

<style>
</style>
