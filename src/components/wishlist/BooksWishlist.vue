<template>
    <div>
        <h3 class="title is-4">Books</h3>
        <h5 class="subtitle is-6">Data from <a href="https://www.goodreads.com/review/list/37418936-olle?shelf=to-read">Goodreads</a></h5>
        <spinner v-if="loadingData"></spinner>
        <div class="columns is-multiline" v-if="!loadingData">
            <div class="column is-narrow" v-for="book in books" :key="book.title">
                <div class="card tablet-width-goodreads">
                    <div class="card-image">
                        <figure class="image">
                            <img :src="book.image" :alt="book.title" class="tablet-size-goodreads">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="content">
                            {{ book.title }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Spinner from '../Spinner.vue'
    import modal from '../../services/modal'

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'books-wishlist',
        components: {Spinner},
        data () {
            return {
                loadingData: false,
                books: []
            }
        },
        beforeMount () {
            this.loadingData = true
            this.$http
                .get('/api/books')
                .then(next => {
                    this.loadingData = false
                    this.books = next.body
                })
                .catch(error => modal.httpError(error))
        }
    }
</script>

<style scoped>
    @media screen and (min-device-width: 769px) {
        .tablet-width-goodreads {
            width: 158px;
        }
        .tablet-size-goodreads {
            width: 158px;
            height: 148px;
        }
    }
</style>
