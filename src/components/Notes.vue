<template>
    <div>
        <h1 class="title">Notes</h1>

        <div class="field">
            <div class="control has-icons-left">
                <input class="input" placeholder="Filter" @keyup="updateFilter()">
                <span class="icon is-small is-left">
                    <i class="fa fa-search"></i>
                </span>
            </div>
        </div>

        <div v-for="note in notes" :key="notes.id">
            <div class="panel">
                <router-link :to="{ name: 'note', params: { id: note.id } }" class="panel-block space-between">
                    <p>{{ note.title }}</p>
                    <span class="tag is-info">
                    {{ note.date }}
                </span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'notes',
        data () {
            return {
                notes: []
            }
        },
        methods: {
            loadNotes: function () {
                this.$http.get('http://localhost:8002/api/notes')
                    .then(notes => {
                        notes.body.sort(function (a, b) {
                            return b.date.localeCompare(a.date)
                        })
                        this.notes = notes.body
                    })
                    .catch(error => console.log(error))
            },
            updateFilter: function () {
                console.log('yo!', this.notes)
            }
        },
        beforeMount () {
            this.loadNotes()
        }
    }
</script>

<style>
    .space-between {
        justify-content: space-between;
    }
</style>
