<template>
    <div>
        <spinner v-if="loadingData"></spinner>
        <div v-if="!loadingData">
            <h1 class="title">{{ note.title }}</h1>
            <h2 class="subtitle">{{ note.date }}</h2>
            <div class="markdown-text" v-html="note.text"></div>
        </div>
    </div>
</template>

<script>
    import marked from 'marked'
    import Spinner from './Spinner.vue'
    import modal from '../services/modal.js'

    // noinspection JSUnusedGlobalSymbols
    export default {
        components: {Spinner},
        name: 'note',
        props: [ 'id' ],
        data () {
            return {
                modal: modal,
                note: {},
                loadingData: false
            }
        },
        methods: {
            loadNote: function (id) {
                this.loadingData = true
                this.$http.get(`/api/notes/${id}`)
                    .then(data => {
                        data.body.text = marked(data.body.text)
                        this.note = data.body
                        this.loadingData = false
                    })
                    .catch(error => modal.httpError(error))
            }
        },
        beforeMount () {
            this.loadNote(this.id)
        }
    }
</script>

<style>
    .markdown-text > h1,h2,h3,h4,h5,h6,p {
        margin: 10px 0;
    }
    .markdown-text > pre {
        text-align: left;
    }
    .markdown-text > ul,ol,li {
        text-align: left;
        padding: inherit;
        margin-left: 20px;
    }
</style>
