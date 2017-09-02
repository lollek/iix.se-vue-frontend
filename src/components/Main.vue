<template>
    <div class="main">
        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="category in categories" :key="category.text" v-if="category.isVisible()">
                <router-link :to="category.link">
                    <div class="card">
                        <div class="card-image">
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
            </div>
        </div>
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'main',
        data () {
            return {
                categories: [{
                    text: 'Notes',
                    link: '/notes',
                    img: require('../assets/notes.png'),
                    isVisible: () => true
                }, {
                    text: 'Beers',
                    link: '/beverages',
                    img: require('../assets/beers.png'),
                    isVisible: () => true
                }, {
                    text: 'Wishlist',
                    link: '/wishlist',
                    img: require('../assets/wishlist.png'),
                    isVisible: () => true
                }, {
                    text: 'Moria',
                    link: '/moria',
                    img: require('../assets/moria.png'),
                    isVisible: () => true
                }, {
                    text: 'Scratch',
                    link: '/scratch',
                    img: require('../assets/scratch.png'),
                    isVisible: () => false
                }]
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
