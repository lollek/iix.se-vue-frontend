<template>
    <div>
        <h1 class="title">{{ note.title }}</h1>
        <h2 class="subtitle">{{ note.date }}</h2>
        <div class="markdown-text" v-html="note.text"></div>
    </div>
</template>

<script>
    import marked from 'marked'

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'note',
        props: [ 'id' ],
        data () {
            return {
                note: {}
            }
        },
        methods: {
            loadNote: function (id) {
                this.$http.get(`http://localhost:8002/api/notes/${id}`)
                    .then(data => {
                        data.body.text = marked(data.body.text)
                        this.note = data.body
                    })
                    .catch(error => console.log(error))
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
