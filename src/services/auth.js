
export default {
    loggedIn: false,
    user: {
        username: '',
        password: ''
    },

    login: function (context, onSuccess, onError) {
        this.setToken(undefined)
        context.$http.post('/api/login', this.user)
            .then(data => {
                const authHeader = data.headers.map.authorization[0]
                this.setToken(authHeader.split('Bearer ')[1])
            })
            .then(onSuccess)
            .catch(onError)
    },

    logout: function (context) {
        this.setToken(undefined)
    },

    checkLoggedIn: function (context) {
        this.loggedIn = !!this.getToken()
    },

    setToken: function (token) {
        localStorage.setItem('jwt', token)
        this.loggedIn = !!token
    },

    getToken: function () {
        return localStorage.getItem('jwt')
    },

    getAuthHeader: function () {
        return this.getToken() ? `Bearer ${this.getToken()}` : ''
    }
}
