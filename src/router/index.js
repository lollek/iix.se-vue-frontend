import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Main from '@/components/main/Main'
import NotFound from '@/components/NotFound'
import Notes from '@/components/Notes'
import Note from '@/components/Note'
import Beverages from '@/components/beverages/Beverages'
import Wishlist from '@/components/Wishlist'
import Moria from '@/components/Moria'
import Scratch from '@/components/Scratch'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        }, {
            path: '/beverages',
            name: 'beverages',
            component: Beverages
        }, {
            path: '/moria',
            name: 'moria',
            component: Moria
        }, {
            path: '/notes',
            name: 'notes',
            component: Notes
        }, {
            path: '/note/:id',
            name: 'note',
            component: Note,
            props: true
        }, {
            path: '/scratch',
            name: 'scratch',
            component: Scratch
        }, {
            path: '/wishlist',
            name: 'wishlist',
            component: Wishlist
        }, {
            path: '*',
            name: 'not-found',
            component: NotFound
        }
    ]
})
