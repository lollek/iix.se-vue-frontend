<template>
    <div class="main">
        <div class="columns is-multiline">
            <div class="column is-narrow" v-for="category in categories" :key="category.text" v-if="category.isVisible()">
                <main-category :category="category"></main-category>
            </div>
        </div>
    </div>
</template>

<script>
    import MainCategory from './MainCategory.vue'
    import auth from '../../services/auth.js'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: { MainCategory },
        name: 'main',
        data () {
            return {
                categories: [{
                    text: 'Notes',
                    link: 'notes',
                    img: require('./assets/notes.jpg'),
                    isVisible: () => true
                }, {
                    text: 'Beers',
                    link: 'beverages',
                    img: require('./assets/beers.jpg'),
                    isVisible: () => true
                }, {
                    text: 'Wishlist',
                    link: 'wishlist',
                    img: require('./assets/wishlist.jpg'),
                    isVisible: () => true
                }, {
                    text: 'Moria',
                    link: 'moria',
                    img: require('./assets/moria.jpg'),
                    isVisible: () => true
                }, {
                    text: 'Scratch',
                    link: 'scratch',
                    img: require('./assets/scratch.jpg'),
                    isVisible: () => auth.loggedIn
                }, {
                    text: 'Transmission',
                    link: 'intern-transmission',
                    img: require('./assets/transmission.jpg'),
                    isVisible: () => auth.loggedIn
                }, {
                    text: 'Emby',
                    link: 'intern-emby',
                    img: require('./assets/emby.jpg'),
                    isVisible: () => auth.loggedIn
                }, {
                    text: 'Monit',
                    link: 'extern-monit',
                    img: require('./assets/monit.jpg'),
                    isVisible: () => auth.loggedIn
                }]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
