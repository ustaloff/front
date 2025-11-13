import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLoginDialog } from '@/composables/useLoginDialog'

import Profile from '@/components/pages/Profile.vue'
import Dashboard from '@/components/pages/Dashboard.vue'
import ClampGenerator from '@/components/pages/ClampGenerator.vue'
import CSSFilterGenerator from '@/components/pages/CSSFilterGenerator.vue'
import DeviceBreakpointDemo from '@/components/DeviceBreakpointDemo.vue'
import PrimeVueDemo from '@/components/PrimeVueDemo.vue'
import GridDemo from '@/components/GridDemo.vue'
import WheelDemo from '@/components/WheelDemo.vue'

const routes = [
    {
        path: '/',
        name: 'main',
        component: Profile,
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true },
    },
    {
        path: '/admin',
        name: 'admin',
        component: Dashboard,
        meta: { requiresAuth: true, requiresAdmin: true },
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
    {
        path: '/primevue-demo',
        name: 'primevue-demo',
        component: PrimeVueDemo,
    },
    {
        path: '/grid-demo',
        name: 'grid-demo',
        component: GridDemo,
    },
    {
        path: '/wheel-demo',
        name: 'wheel-demo',
        component: WheelDemo,
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()
    const { openLoginDialog } = useLoginDialog()

    if (!auth.user) {
        await auth.fetchUser().catch(() => {
            auth.user = null
        })
    }

    if (to.meta.guestOnly && auth.user) {
        return next('/')
    }

    if (to.meta.requiresAuth && !auth.user) {
        openLoginDialog()
        // If the user was trying to access a specific page, we don't want to proceed.
        // If they were at the root, we can let them stay there.
        return next('/')
    }

    if (to.meta.requiresAdmin && !auth.user?.is_admin) {
        return next('/')
    }

    next()
})

export default router
