const Modal = {
    install (Vue, options) {
        Vue.prototype.$modal = {
            visible: false,
            style: 'is-danger',
            text: '',
            httpError: function (data) {
                let msg = `HTTP Error (${data.status}): ${data.statusText}`
                if (data.body) {
                    msg += `. ${data.body}`
                }
                this.error(msg)
            },
            error: function (msg) {
                this.text = msg
                this.visible = true
            },
            hide: function () {
                this.visible = false
            }
        }
    }
}

export default Modal
