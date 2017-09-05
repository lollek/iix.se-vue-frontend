<template>
    <div>
        <h1 class="title">Scratch</h1>
        <div class="field" v-if="auth.loggedIn">
            <span class="top-icon icon has-text-info is-medium" v-if="!editing" @click="editing = true">
                <i class="fa fa-pencil"></i>
            </span>
            <span class="top-icon icon has-text-success is-medium" v-if="editing" @click="save()">
                <i class="fa fa-check"></i>
            </span>
            <span class="top-icon icon has-text-warning is-medium" v-if="editing" @click="cancel()">
                <i class="fa fa-times"></i>
            </span>
        </div>
        <spinner v-if="loadingData"></spinner>
        <div v-if="!loadingData">
            <div class="control" v-if="editing">
                <textarea class="textarea" rows="20" v-model="scratch.data"></textarea>
            </div>
            <div v-if="!editing">
                <div class="markdown-text" v-html="html"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import Spinner from './Spinner.vue'
    import modal from '../services/modal.js'
    import auth from '../services/auth.js'

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'scratch',
        components: {Spinner},
        data () {
            return {
                auth: auth,
                scratch: undefined,
                loadingData: false,
                editing: false,
                html: undefined,
                parseHtml: function () {
                    this.html = marked(this.scratch.data)
                },
                load: function () {
                    this.loadingData = true
                    this.$http.get('/api/markdown/scratch', {
                        headers: {
                            Authorization: auth.getAuthHeader()
                        }
                    })
                        .then(data => {
                            this.scratch = data.body
                            this.parseHtml()
                            this.loadingData = false
                        })
                        .catch(error => modal.httpError(error))
                },
                save: function () {
                    this.$http.put('/api/markdown/scratch', this.scratch, {
                        headers: {
                            Authorization: auth.getAuthHeader()
                        }
                    })
                        .then(data => {
                            this.editing = false
                            this.parseHtml()
                        })
                        .catch(error => modal.httpError(error))
                },
                cancel: function () {
                    this.editing = false
                    this.load()
                }
            }
        },
        beforeMount () {
            this.load()
        }
    }
</script>

<style>
</style>
