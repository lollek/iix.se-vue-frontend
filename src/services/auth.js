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
                console.log('1', data)
                console.log('2', data.headers)
                console.log('3', data.headers.map)
                console.log('4', data.headers.map['Authorization'])
                console.log('5', data.headers.map['Authorization'][0])
                const authHeader = data.headers.map['Authorization'][0]
                console.log('6', authHeader.split('Bearer ')[1])
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
            console.log('7', jwtDecode(token))
            this.user.username = jwtDecode(token)['sub']
        }
    },

    setToken: function (token) {
        localStorage.setItem('jwt', token)
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
