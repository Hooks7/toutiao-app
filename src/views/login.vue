<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field
        v-validate="'required|digits:11'"
        name="mobile"
        :error-message="errors.first('mobile')"
        left-icon="friends-o"
        v-model="user.mobile"
        placeholder="请输入手机号"
      />
      <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
        left-icon="warn-o"
        v-model="user.code"
        placeholder="请输入验证码"
      >
        <van-button slot="button" round type="danger" size="small">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button
       :loading="loading"
        type="danger"
        loading-text="加载中..."
       @click="handleLogin">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      loading: false // 加载
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // 登录
    async handleLogin () {
      this.loading = true
      try {
        // // result:响应拦截器的data
        // const result = await login(this.user)
        // // 存储登陆的状态
        // // 1. vuex
        // this.$store.commit('setUser', result)
        // // 2.本地存储

        // // --- 以上两件事儿 都是在store中完成----
        // this.setUser(result)
        // // 跳转
        // this.$router.push('/')
        // this.$toast.success('登录成功')

        // 表单验证
        const valid = await this.$validator.validate()
        // 验证失败
        if (!valid) {
          this.loading = false
          return
        }
        // 验证成功
        const result = await login(this.user)
        // 存储登陆的状态
        this.setUser(result)
        // 跳转到首页
        this.$router.push(this.$route.query.redirect || '/')
        this.$toast.success('登录成功')
      } catch (err) {
        this.$toast.fail('登录失败')
        this.loading = false
      }
    }
  },
  created () {
    // 配置自定义验证信息
    const dict = {
      custom: {
        mobile: {
          required: '手机号不能为空',
          digits: '手机号必须是11位的数字'
        },
        code: {
          required: '邮箱不能为空',
          digits: '验证码必须是6位的数字'
        }
      }
    }
    this.$validator.localize('custom', dict)
  }
}
</script>

<style lang='less' scoped>
.login-btn {
  padding: 20px;
  .van-button {
    width: 100%;
    height: 50px;
  }
}
</style>
