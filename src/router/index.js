import { createRouter, createWebHistory } from 'vue-router'
import useUserStore from '@/stores/user'
import useModalStore from '@/stores/modal'

const Home = () => import('@/views/HomeView.vue')
const About = () => import('@/views/AboutView.vue')
const Manage = () => import('@/views/ManageView.vue')
const Song = () => import('@/views/SongView.vue')

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'about',
    path: '/about',
    component: About
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    component: Manage,
    beforeEnter: (to, from, next) => {
      console.log('Manage route guard')
      next()
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/manage',
    redirect: { name: 'manage' }
  },
  {
    name: 'song',
    path: '/song/:id',
    component: Song
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500 font-bold'
})

router.beforeEach((to, from, next) => {
  //console.log(to.meta)
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()
  const modal = useModalStore()
  if (store.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
    modal.isOpen = true
  }
})

export default router
