// 插件：就是一个对象，具有install(Vue, options)

export default {
  install (Vue) {
    // 给vue实例增加方法
    Vue.prototype.$checkLogin = function () {
      // this 是vue的实例    this.$checkLogin()
      // 判断是否登陆
      if (!this.$store.state.user) {
        // 没登录提示
        this.$dialog.confirm({
          title: '登录提示',
          message: '是否要跳转到登录界面'
        }).then(() => {
          // 跳转登录界面
          this.$router.push('/login')
        }).catch(() => {

        })
        return false
      }
      return true
    }
  }
}
