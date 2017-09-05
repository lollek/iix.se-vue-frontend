import jwtDecode from 'jwt-decode'

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
                const authHeaderName = Object.keys(data.headers.map).find(key => key.toLowerCase() === 'authorization')
                const authHeader = data.headers.map[authHeaderName][0]
                this.setToken(authHeader.split('Bearer ')[1])
            })
            .then(onSuccess)
            .catch(onError)
    },

    logout: function (context) {
        this.setToken(undefined)
    },

    checkLoggedIn: function (context) {
        const token = this.getToken()
        this.loggedIn = !!token
        if (this.loggedIn) {
            this.user.username = jwtDecode(token)['sub']
        }
    },

    setToken: function (token) {
        if (token) {
            localStorage.setItem('jwt', token)
        } else {
            localStorage.removeItem('jwt')
        }
        this.loggedIn = !!token
    },

    getToken: function () {
        return localStorage.getItem('jwt')
    },

    getAuthHeader: function () {
        const token = this.getToken()
        return token ? `Bearer ${token}` : ''
    }
}
