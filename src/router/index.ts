import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {routerList} from "./routerList";

const routes: Array<RouteRecordRaw> = routerList

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    nProgress.start()
    next()
})

router.afterEach(() => {
    nProgress.done()
})

nProgress.configure({
    ease: 'linear',
    speed: 500,
    showSpinner: false
})

export default router
