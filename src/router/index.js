import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Main from '@/components/Main'
import NotFound from '@/components/NotFound'
import Notes from '@/components/Notes'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        }, {
            path: '/notes',
            name: 'notes',
            component: Notes
        }, {
            path: '*',
            name: 'not-found',
            component: NotFound
        }
    ]
})
