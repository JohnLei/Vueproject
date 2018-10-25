import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/views/login'
// import home from '@/views/Home'
// import welcome from '@/views/Welcome'
// import user from '@/views/user/User'
// import rights from '@/views/rights/Rights'
// import role from '@/views/rights/Role'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      // component: login
      component: resolve => require(['@/views/login'], resolve)

    },
    {
      path: '/',
      name: 'home',
      // component: home,
      component: resolve => require(['@/views/Home'], resolve),
      redirect: '/welcome',
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          // component: welcome
          component: resolve => require(['@/views/Welcome'], resolve)
        },
        {
          path: 'users',
          name: 'users',
          // component: user
          component: resolve => require(['@/views/user/User'], resolve)
        },
        {
          path: 'rights',
          name: 'rights',
          // component: rights
          component: resolve => require(['@/views/rights/Rights'], resolve)
        },
        {
          path: 'roles',
          name: 'roles',
          // component: role
          component: resolve => require(['@/views/rights/Role'], resolve)
        },
        {
          path: 'categories',
          name: 'categories',
          component: resolve => require(['@/views/category/Category'], resolve)
        },
        {
          path: 'reports',
          name: 'reports',
          component: resolve => require(['@/views/reports/Reports'], resolve)
        },
        {
          path: 'goods',
          name: 'goods',
          component: resolve => require(['@/views/goods/Goods'], resolve)
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
