import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import home from '@/views/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
router.beforeEach((to, from, next) => {
  // to and from are Route Object,next() must be called to resolve the hook}
  // 获取token
  let token = localStorage.getItem('keytoken')
  if (token) {
    next()
  } else {
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  }
})
export default router
