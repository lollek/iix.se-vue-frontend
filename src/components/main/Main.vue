<template>
    <div class="main">
        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="category in categories" :key="category.text" v-if="category.isVisible()">
                <main-category :category="category"></main-category>
            </div>
        </div>
    </div>
</template>

<script>
    import MainCategory from './MainCategory.vue'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: { MainCategory },
        name: 'main',
        data () {
            return {
                categories: [{
                    text: 'Notes',
                    link: 'notes',
                    img: require('./assets/notes.png'),
                    isVisible: () => true
                }, {
                    text: 'Beers',
                    link: 'beverages',
                    img: require('./assets/beers.png'),
                    isVisible: () => true
                }, {
                    text: 'Wishlist',
                    link: 'wishlist',
                    img: require('./assets/wishlist.png'),
                    isVisible: () => true
                }, {
                    text: 'Moria',
                    link: 'moria',
                    img: require('./assets/moria.png'),
                    isVisible: () => true
                }, {
                    text: 'Scratch',
                    link: 'scratch',
                    img: require('./assets/scratch.png'),
                    isVisible: () => false
                }]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
