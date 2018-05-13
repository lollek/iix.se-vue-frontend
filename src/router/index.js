import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Main from '@/components/main/Main'
import NotFound from '@/components/NotFound'
import Notes from '@/components/Notes'
import Note from '@/components/Note'
import Beverages from '@/components/beverages/Beverages'
import Beverage from '@/components/beverages/Beverage'
import Wishlist from '@/components/wishlist/Wishlist'
import Moria from '@/components/moria/Moria'
import MoriaGeneral from '@/components/moria/MoriaGeneral'
import MoriaWocm from '@/components/moria/MoriaWocm'
import MoriaMage from '@/components/moria/MoriaMage'
import Scratch from '@/components/Scratch'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
    routes: [
        { path: '/', name: 'main', component: Main },
        { path: '/beverages', name: 'beverages', component: Beverages },
        { path: '/beverages/:id', name: 'beverage', component: Beverage, props: true },
        { path: '/moria', name: 'moria', component: Moria },
        { path: '/moria/general', name: 'moria-general', component: MoriaGeneral },
        { path: '/moria/mage', name: 'moria-mage', component: MoriaMage },
        { path: '/moria/wocm', name: 'moria-wocm', component: MoriaWocm },
        { path: '/notes', name: 'notes', component: Notes },
        { path: '/notes/:id', name: 'note', component: Note, props: true },
        { path: '/scratch', name: 'scratch', component: Scratch },
        { path: '/wishlist', name: 'wishlist', component: Wishlist },

        { path: '/extern/monit', name: 'extern-monit', beforeEnter: () => { window.location = 'https://monit.iix.se' } },
        { path: '/intern/emby', name: 'intern-emby', beforeEnter: () => { window.location = 'http://bleach:8096/web/home.html' } },
        { path: '/intern/transmission', name: 'intern-transmission', beforeEnter: () => { window.location = 'http://bleach.0:9091/transmission/web/' } },

        { path: '*', name: 'not-found', component: NotFound }
    ]
})
