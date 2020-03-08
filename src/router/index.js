import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashView',
    meta: { layout: 'main', auth: true },
    component: () => import('@/layouts/MainLayout'),
    children: [
      {
        alias: '',
        path: 'dashboard',
        name: 'dashboard',
        meta: { layout: 'main', auth: true },
        component: () => import('@/views/Home')
      },
      {
        path: 'categories',
        name: 'categories',
        meta: { layout: 'main', auth: true },
        component: () => import('@/views/Categories')
      },
      {
        path: 'detail/:id',
        name: 'detail',
        meta: { layout: 'main', auth: true },
        component: () => import('@/views/Detail')
      },
      {
        path: 'history',
        name: 'history',
        meta: { layout: 'main', auth: true },
        component: () => import('@/views/History')
      },
      {
        path: 'planning',
        name: 'planning',
        meta: { layout: 'main', auth: true },
        component: () => import('@/views/Planning')
      },
      {
        path: 'profile',
        name: 'profile',
        meta: { layout: 'main', auth: true },
        component: () => import('@/views/Profile')
      },
      {
        path: 'new-post',
        name: 'newPost',
        meta: { layout: 'main', auth: true },
        component: () => import('@/views/addPost')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: () => import('@/views/Login')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: { layout: 'empty' },
    component: () => import('@/views/Registration')
  },
  {
    path: '*',
    component: () => import('@/views/PageNotFound')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser) {
    next('/login?message=login')
  } else if (to.path === '/login' && currentUser) {
    next('/')
  } else {
    next()
  }
})

export default router
