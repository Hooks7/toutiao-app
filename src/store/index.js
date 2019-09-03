import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '@/utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 项目运行时获取本地存储的状态
    user: storageTools.getItem('user')
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      // 项目运行时，先去本地存储中获取登录状态
      storageTools.setItem('user', user)
    }

  },
  actions: {

  }
})
