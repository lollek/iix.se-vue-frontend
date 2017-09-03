const Auth = {
    install (Vue, options) {
        Vue.prototype.$auth = {
            loggedIn: false,
            setToken: function (token) {
                localStorage.setItem('jwt', token)
                this.loggedIn = !!token
            },
            getToken: function () {
                return localStorage.getItem('jwt')
            },
            checkLoggedIn: function () {
                this.loggedIn = !!this.getToken()
            }
        }
    }
}

export default Auth
