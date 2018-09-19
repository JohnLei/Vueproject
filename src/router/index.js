import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import home from '@/views/Home'
import welcome from '@/views/Welcome'
import user from '@/views/user/User'
import rights from '@/views/rights/Rights'
import role from '@/views/rights/Role'

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
      component: home,
      redirect: '/welcome',
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: welcome
        },
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'rights',
          name: 'rights',
          component: rights
        },
        {
          path: 'role',
          name: 'role',
          component: role
        }
      ]
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
