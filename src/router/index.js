import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar.vue' // 标签栏
import Home from '@/views/home/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 搜索页
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
    },
    { // 登录页
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
    },
    { // 标签栏
      path: '/',
      component: Tabbar,
      children: [
        {
          name: 'Home',
          path: '',
          component: Home
        }
      ]
    }
  ]
})
