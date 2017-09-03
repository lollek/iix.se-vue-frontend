<template>
    <div>
        <nav class="navbar">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">
                    iix-notes
                </router-link>

                <div class="navbar-burger burger" :class="{ 'is-active': navbar.visible }" @click="navbar.toggle()">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div class="navbar-menu" :class="{ 'is-active': navbar.visible }">
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-link">
                            Login
                        </div>
                        <div class="navbar-dropdown is-boxed is-right">
                            <div style="min-width: 270px; padding: 10px;">
                                <div v-if="auth.loggedIn">
                                    <div class="field">
                                        <button class="button is-warning is-outlined is-fullwidth" @click="logout()">Logout</button>
                                    </div>
                                </div>
                                <div v-if="!auth.loggedIn">
                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input class="input"
                                                   placeholder="Username"
                                                   v-model="user.username"
                                                   @keyup.enter="login()">
                                            <span class="icon is-left">
                                        <i class="fa fa-user"></i>
                                    </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control has-icons-left">
                                            <input class="input"
                                                   type="password"
                                                   placeholder="Password"
                                                   v-model="user.password"
                                                   @keyup.enter="login()">
                                            <span class="icon is-left">
                                        <i class="fa fa-lock"></i>
                                    </span>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <button class="button is-primary is-outlined is-fullwidth" @click="login()">Login</button>
                                    </div>
                                    <div class="has-text-centered has-text-danger field">
                                        {{ loginError }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                modal: this.$modal,
                auth: this.$auth,
                user: {
                    username: '',
                    password: ''
                },
                loginError: '',
                login: function () {
                    this.$http.post('/api/login', this.user)
                        .then(data => {
                            const authHeader = data.headers.map.authorization[0]
                            if (authHeader) {
                                this.$auth.setToken(authHeader.split('Bearer ')[1])
                                this.loginError = ''
                            } else {
                                this.loginError = 'No authorization token received from server'
                            }
                        }).catch(error => {
                            this.loginError = `${error.statusText} (${error.status})`
                            if (error.bodyText) {
                                this.loginError += ` - ${error.bodyText}`
                            }
                        })
                },
                logout: function () {
                    this.$auth.setToken()
                },
                navbar: {
                    visible: false,
                    toggle: function () {
                        this.visible = !this.visible
                    }
                }
            }
        },
        beforeMount () {
            this.$auth.checkLoggedIn()
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
