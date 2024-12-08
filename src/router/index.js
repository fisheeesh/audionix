import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import ManageMusic from '@/views/ManageMusic.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/manage-music',
    // alias: '/manage',
    name: 'manage',
    component: ManageMusic,
    beforeEnter: (to, from, next) => {
      console.log('Manage Route Guard')
      next()
    },
    meta: { requiresAuth: true },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
})

/**
 * ? The beforeEach() is available after the instance of the router is created.
 * ? It allows you to add a function before every request.
 * $ It has one argument (callback func). It can call whenever a req is made.
 * ? The callback func accept 3 parameters: to, from, next
 * ? to: is an obj that contians info about where the user is navigating to.
 * ? from: is an obj that contains info about where the user is coming from.
 * ? next: the router will not render the component until you've called this func.
 * ?If next() is never called, the comp will never load.
 */
router.beforeEach((to, from, next) => {
  // console.log('Global Guard')
  // console.log(to.meta)
  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const userStore = useUserStore()
  if (userStore.userLoggedIn) {
    next()
  } else {
    next({ name: 'home' })
  }
})

export default router
