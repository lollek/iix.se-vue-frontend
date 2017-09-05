<template>
    <div>
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
            <span class="top-icon icon has-text-danger is-medium" @click="remove()">
                <i class="fa fa-trash"></i>
            </span>
        </div>
        <spinner v-if="loadingData"></spinner>
        <div v-if="!loadingData">

            <div v-if="!editing">
                <h1 class="title">{{ note.title }}</h1>
                <h2 class="subtitle">{{ note.date }}</h2>
                <div class="markdown-text" v-html="html"></div>
            </div>

            <div v-if="editing">
                <div class="field">
                    <div class="label has-text-primary">Title</div>
                    <div class="control">
                        <input class="input" v-model="note.title">
                    </div>
                </div>

                <div class="field">
                    <div class="label has-text-primary">Text</div>
                    <div class="control">
                        <textarea class="textarea" v-model="note.text"></textarea>
                    </div>
                </div>
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
        components: {Spinner},
        name: 'note',
        props: [ 'id' ],
        data () {
            return {
                modal: modal,
                auth: auth,
                note: {},
                html: undefined,
                loadingData: false,
                editing: false
            }
        },
        methods: {
            load: function (id) {
                this.loadingData = true
                this.$http
                    .get(`/api/notes/${id}`)
                    .then(data => {
                        this.html = marked(data.body.text)
                        this.note = data.body
                        this.loadingData = false
                    })
                    .catch(error => modal.httpError(error))
            },
            save: function () {
                if (this.note.id) {
                    this.$http
                        .put(`/api/notes/${this.note.id}`, this.note, {
                            headers: {
                                Authorization: auth.getAuthHeader()
                            }
                        })
                        .then(_ => this.cancel())
                        .catch(error => modal.httpError(error))
                } else {
                    this.$http
                        .post('/api/notes', this.note, {
                            headers: {
                                Authorization: auth.getAuthHeader()
                            }
                        })
                        .then(_ => this.cancel())
                        .catch(error => modal.httpError(error))
                }
            },
            cancel: function () {
                this.editing = false
                if (this.id === 'new') {
                    this.$router.push({ name: 'notes' })
                } else {
                    this.load(this.note.id)
                }
            },
            remove: function () {
                this.$http
                    .delete(`/api/notes/${this.note.id}`, {
                        headers: {
                            Authorization: auth.getAuthHeader()
                        }
                    })
                    .then(_ => this.$router.push({ name: 'notes' }))
                    .catch(error => modal.httpError(error))
            }
        },
        beforeMount () {
            if (this.id === 'new') {
                this.note = {
                    title: undefined,
                    date: new Date(Date.now()).toISOString().slice(0, 10),
                    text: undefined
                }
                this.editing = true
            } else {
                this.load(this.id)
            }
        }
    }
</script>

<style>
</style>
