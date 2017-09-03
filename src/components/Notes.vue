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
            <div>
                <router-link :to="{ name: 'note', params: { id: note.id } }" class="space-between">
                    <div class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <div>{{ note.title }}</div>
                            </div>
                        </div>
                        <div class="level-right is-hidden-mobile">
                            <div class="level-item">
                                <span class="tag is-info">
                                    {{ note.date }}
                                </span>
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
                this.$http.get('/api/notes')
                    .then(notes => {
                        notes.body.sort(function (a, b) {
                            return b.date.localeCompare(a.date)
                        })
                        this.notesBackup = notes.body
                        this.updateFilter()
                    })
                    .catch(error => this.$modal.httpError(error))
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

<style scoped>
    .field {
        margin-bottom: 1.5rem;
    }
    .level {
        margin: 10px;
    }
    .space-between {
        justify-content: space-between;
    }
</style>
