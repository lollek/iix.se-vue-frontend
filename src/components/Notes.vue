<template>
    <div>
        <h1 class="title">Notes</h1>

        <div class="field">
            <div class="control has-icons-left">
                <input class="input" placeholder="Filter" v-model="filter" @keyup="updateFilter()">
                <span class="icon is-left">
                    <i class="fa fa-search"></i>
                </span>
            </div>
        </div>

        <div v-for="note in notes" :key="notes.id">
            <div class="panel">
                <router-link :to="{ name: 'note', params: { id: note.id } }" class="panel-block space-between">
                    <p class="text-truncate">{{ note.title }}</p>
                    <span class="tag is-info is-hidden-mobile">
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
                filter: undefined,
                notes: [],
                notesBackup: []
            }
        },
        methods: {
            loadNotes: function () {
                this.$http.get('http://localhost:8002/api/notes')
                    .then(notes => {
                        notes.body.sort(function (a, b) {
                            return b.date.localeCompare(a.date)
                        })
                        this.notesBackup = notes.body
                        this.updateFilter()
                    })
                    .catch(error => console.log(error))
            },
            updateFilter: function () {
                this.notes = this.notesBackup.filter(note => {
                    if (!this.filter) {
                        return true
                    }
                    return note.title.toLocaleLowerCase().indexOf(this.filter.toLocaleLowerCase()) !== -1
                })
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
    .text-truncate {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
