<template>
    <div>
        <h1 class="title">Wishlist</h1>
        <games-wishlist></games-wishlist>
        <books-wishlist></books-wishlist>
    </div>
</template>

<script>
    import GamesWishlist from './GamesWishlist.vue'
    import BooksWishlist from './BooksWishlist.vue'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {
            BooksWishlist,
            GamesWishlist
        },
        name: 'wishlist'
    }
</script>

<style>
</style>
