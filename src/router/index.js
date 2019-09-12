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
    {
      // 搜索结果
      path: '/search-result/:q',
      name: 'search-result',
      props: true,
      component: () => import(/* webpackChunkName: "search" */ '../views/SearchResult.vue')
    },
    {
      // 文章详情
      path: '/detail/:id',
      name: 'detail',
      // 路由跳转的时候对，对应的组件把动态路由参数，传递给组件
      props: true,
      component: () => import(/* webpackChunkName: "search" */ '../views/detail/index.vue')
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
        }, {
          name: 'User',
          path: '/user',
          component: () => import('../views/User.vue')
        }

      ]
    },
    {
      // 个人信息界面
      path: '/user-profile',
      name: 'user-profile',
      component: () => import(/* webpackChunkName: "user-profile" */ '../views/user-profile/index.vue')
    },
    { // 粉丝界面
      path: '/follow',
      name: 'follow',
      component: () => import(/* webpackChunkName: "follow" */ '../views/follow/index.vue')
    },
    {
      path: '/chat',
      name: 'chat',
      component: () => import(/* webpackChunkName: "follow" */ '../views/Chat.vue')
    }
  ]
})
