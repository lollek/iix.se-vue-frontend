<template>
    <div>
        <h1 class="title">Notes</h1>

        <div class="field">
            <div class="control has-icons-left">
                <input class="input" placeholder="Filter" @key.up="updateFilter">
                <span class="icon is-small is-left">
                    <i class="fa fa-search"></i>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'notes',
        methods: {
            updateFilter: function () {
                console.log('yo!')
            }
        }
    }
</script>

<style>
</style>
