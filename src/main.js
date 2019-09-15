import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant' // 导入vant
import VeeValidate, { Validator } from 'vee-validate' // 导入表单验证
// 导验证中文包
import zhCN from 'vee-validate/dist/locale/zh_CN'
import { fmtDate } from '@/utils/dayjs' // 引入时间过滤器
import 'vant/lib/index.css'
import './styles/index.css' // 导入通用样式
import CheckLogin from './utils/CheckLogin'
import 'amfe-flexible'
import fastClick from 'fastclick' // 解决移动端点击 300ms 延迟

fastClick.attach(document.body)

Vue.filter('fmtDate', fmtDate)

// 注册插件  Checklogin.install(Vue)
Vue.use(CheckLogin)
// Vue.prototype.$checkLogin = () => {
//   console.log('checklogin')
// }

Vue.use(Vant)
// 配置
Vue.use(VeeValidate, {
  // 如果为空的话，文本框输入过程中不验证，需要调用validate方法验证
  events: ''
})
Validator.localize('zh_CN', zhCN)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
