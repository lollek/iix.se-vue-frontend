<template>
    <div>
        <h3 class="title is-4">Games</h3>
        <spinner v-if="loadingData"></spinner>
        <div class="columns is-multiline" v-if="!loadingData">
            <div class="column is-narrow" v-for="game in games" :key="game.name">
                <a :href=game.link>
                    <div class="card tablet-width-steam">
                        <div class="card-image">
                            <figure class="image">
                                <img :src="game.image" :alt="game.name" class="tablet-size-steam">
                            </figure>
                        </div>
                        <div class="card-content">
                            <div class="content">
                                {{ game.name }}
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from '../Spinner.vue'
    import modal from '../../services/modal'

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'games-wishlist',
        components: {Spinner},
        data () {
            return {
                loadingData: false,
                games: []
            }
        },
        beforeMount () {
            this.loadingData = true
            this.$http
                .get('/api/games')
                .then(next => {
                    this.loadingData = false
                    this.games = next.body
                })
                .catch(error => modal.httpError(error))
        }
    }
</script>

<style scoped>
    @media screen and (min-device-width: 769px) {
        .tablet-width-steam {
            width: 184px;
        }
        .tablet-size-steam {
            width: 184px;
            height: 69px;
        }
    }
</style>
