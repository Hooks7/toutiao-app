import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 导入vant
import VeeValidate from 'vee-validate' // 导入表单验证
import 'vant/lib/index.css'
import './styles/index.css' // 导入通用样式

Vue.use(Vant)
// 配置
Vue.use(VeeValidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
