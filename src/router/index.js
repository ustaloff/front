import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from '@/stores/auth'

import Login from '@/components/pages/Login.vue'
import Register from '@/components/pages/Register.vue'
import Profile from '@/components/pages/Profile.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import ClampGenerator from '@/components/pages/ClampGenerator.vue'
import CSSFilterGenerator from '@/components/pages/CSSFilterGenerator.vue'
import DeviceBreakpointDemo from '@/components/DeviceBreakpointDemo.vue'

const routes = [
    {
        path: '/',
        name: 'main',
        component: Profile,
        //meta: {requiresAuth: true},
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {guestOnly: true}, // чтобы залогиненный не мог попасть сюда
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {guestOnly: true},
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {requiresAuth: true},
    },
    {
        path: '/admin',
        name: 'admin',
        component: Dashboard,
        meta: {requiresAuth: true, requiresAdmin: true},
    },
    {
        path: '/clamp-generator',
        name: 'clamp-generator',
        component: ClampGenerator,
    },
    {
        path: '/css-filter-generator',
        name: 'css-filter-generator',
        component: CSSFilterGenerator,
    },
    {
        path: '/device-breakpoint-demo',
        name: 'device-breakpoint-demo',
        component: DeviceBreakpointDemo,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()

    if (!auth.user) {
        await auth.fetchUser().catch(() => {
            // Если fetchUser упал, считаем что пользователь неавторизован
            auth.user = null
        })
    }

    // Если маршрут доступен только гостям (login/register),
    // а пользователь уже залогинен — редирект на главную
    if (to.meta.guestOnly && auth.user) {
        return next('/')
    }

    // Защищенные маршруты
    if (to.meta.requiresAuth && !auth.user) {
        return next('/login')
    }

    if (to.meta.requiresAdmin && !auth.user?.is_admin) {
        return next('/')
    }

    next()
})

export default router
