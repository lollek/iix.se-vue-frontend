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

            <div class="navbar-menu"
                 :class="navbar.visible ? ['is-active', 'zoomInDown', 'animated'] : []">
                <div class="navbar-start">
                    <router-link :to="{ name: category.link }" class="navbar-item" v-for="category in categories" :key="category.text" v-if="category.isVisible()">
                        <span class="icon has-text-primary" :class="category.icon"></span>
                        <span>{{ category.text }}</span>
                    </router-link>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <div class="navbar-link">
                            {{ navbar.loginText }}
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
                                                   v-model="auth.user.username"
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
                                                   v-model="auth.user.password"
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
                <div class="modal-content animated bounce">
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
    import auth from './services/auth.js'
    import modal from './services/modal.js'

    // noinspection JSUnusedGlobalSymbols
    export default {
        name: 'app',
        data () {
            return {
                auth: auth,
                modal: modal,
                loginError: '',
                navbar: {
                    visible: false,
                    loginText: 'Login',
                    toggle: function () {
                        this.visible = !this.visible
                    }
                },
                categories: [{
                    text: 'Notes',
                    link: 'notes',
                    icon: 'fa-sticky-note',
                    // img: require('./assets/notes.jpg'),
                    isVisible: () => true
                }, {
                    text: 'Beers',
                    link: 'beverages',
                    icon: 'fa-beer',
                    // img: require('./assets/beers.jpg'),
                    isVisible: () => true
                }, {
                    text: 'Wishlist',
                    link: 'wishlist',
                    icon: 'fa-gift',
                    // img: require('./assets/wishlist.jpg'),
                    isVisible: () => true
                }, {
                    text: 'Moria',
                    link: 'moria',
                    icon: 'fa-tree',
                    // img: require('./assets/moria.jpg'),
                    isVisible: () => true
                }, {
                    text: 'Scratch',
                    link: 'scratch',
                    icon: 'fa-pencil',
                    // img: require('./assets/scratch.jpg'),
                    isVisible: () => auth.loggedIn
                }, {
                    text: 'Transmission',
                    link: 'intern-transmission',
                    icon: 'fa-bolt',
                    // img: require('./assets/transmission.jpg'),
                    isVisible: () => auth.loggedIn
                }, {
                    text: 'Emby',
                    link: 'intern-emby',
                    icon: 'fa-tv',
                    // img: require('./assets/emby.jpg'),
                    isVisible: () => auth.loggedIn
                }, {
                    text: 'Monit',
                    link: 'extern-monit',
                    icon: 'fa-eye',
                    // img: require('./assets/monit.jpg'),
                    isVisible: () => auth.loggedIn
                }],
                login: function () {
                    auth.login(this, data => {
                        this.loginError = ''
                        this.setLoginText()
                    }, error => {
                        this.loginError = `${error.statusText} (${error.status})`
                        if (error.bodyText) {
                            this.loginError += ` - ${error.bodyText}`
                        }
                        this.setLoginText()
                    })
                },
                logout: function () {
                    auth.logout(this)
                    this.setLoginText()
                },
                setLoginText: function () {
                    this.navbar.loginText = this.auth.loggedIn ? auth.user.username : 'Login'
                }
            }
        },
        beforeMount () {
            auth.checkLoggedIn(this)
            this.setLoginText()
        }
    }
</script>

<style lang="scss">
    @import '../node_modules/bulma/sass/utilities/initial-variables.sass';

    $red: #f07178;
    $green: #5af78e;
    $orange: #ffcb6b;
    $blue: #57c7ff;
    $purple: #c792ea;
    //$white: #eeffff;

    $primary: $blue;
    $info: $purple;
    $success: $green;
    $warning: $orange;
    $danger: $red;

    @import '../node_modules/bulma/bulma.sass';
    @import '../node_modules/font-awesome/css/font-awesome.css';
    @import '../node_modules/animate.css/animate.min.css';

    .navbar-menu.animated.zoomInDown {
        -webkit-animation-delay: 0s; /* Safari 4+ */
        -moz-animation-delay:    0s; /* Fx 5+ */
        -o-animation-delay:      0s; /* Opera 12+ */
        animation-delay:         0s; /* IE 10+, Fx 29+ */

        -webkit-animation-duration: 0.2s; /* Safari 4+ */
        -moz-animation-duration:    0.2s; /* Fx 5+ */
        -o-animation-duration:      0.2s; /* Opera 12+ */
        animation-duration:         0.2s; /* IE 10+, Fx 29+ */
    }

    .modal-content.animated.zoomIn {
        -webkit-animation-duration: 0.5s; /* Safari 4+ */
        -moz-animation-duration:    0.5s; /* Fx 5+ */
        -o-animation-duration:      0.5s; /* Opera 12+ */
        animation-duration:         0.5s; /* IE 10+, Fx 29+ */
    }

    p,pre {
        margin-bottom: 1rem;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin: 60px 20px 60px;
    }

    .markdown-text > pre {
        text-align: left;
    }
    .markdown-text > h1,h2,h3,h4,h5,h6 {
        margin-bottom: 1.5rem;
        font-weight: 600;
    }
    .markdown-text > h1 {
        font-size: 2rem;
    }
    .markdown-text > h2 {
        font-size: 1.5rem;
    }
    .markdown-text > h3 {
        font-size: 1.25rem;
    }
    .markdown-text > h4 {
        font-size: 1rem;
    }
    .markdown-text > ul,ol,li {
        text-align: left;
        padding: inherit;
        margin-left: 20px;
    }
</style>
