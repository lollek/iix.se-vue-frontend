import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
        {
            path: '*',
            name: 'not-found',
            component: NotFound
        }
    ]
})
