import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 导入vant
import VeeValidate, { Validator } from 'vee-validate' // 导入表单验证
// 导验证中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import 'vant/lib/index.css'
import './styles/index.css' // 导入通用样式

Vue.use(Vant)
// 配置
Vue.use(VeeValidate)
Validator.localize('zh_CN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
