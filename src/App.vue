<template>
    <div>
        <nav class="navbar">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    iix-notes
                </router-link>

                <div class="navbar-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>

        <div id="app">

            <router-view></router-view>

            <div class="modal" :class="{ 'is-active': modal.visible }">
                <div class="modal-background" @click="modal.hide()"></div>
                <div class="modal-content">
                    <div class="notification" :class="[ modal.style ]">
                        <button class="delete" @click="modal.hide()"></button>
                        {{ modal.text }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'app',
        data () {
            return {
                modal: this.$modal
            }
        }
    }
</script>

<style>
    @import '../node_modules/bulma/css/bulma.css';
    @import '../node_modules/font-awesome/css/font-awesome.css';
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 60px 20px 60px;
    }
</style>
