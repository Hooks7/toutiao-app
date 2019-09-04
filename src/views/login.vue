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
        clearable=""
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
        <van-button slot="button" round type="danger" size='small'>发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
      <van-button @click="handleLogin">登录</van-button>
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
      }
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    // 登录
    async handleLogin () {
      try {
        // result:响应拦截器的data
        const result = await login(this.user)
        // 存储登陆的状态
        // 1. vuex
        this.$store.commit('setUser', result)
        // 2.本地存储

        // --- 以上两件事儿 都是在store中完成----
        this.setUser(result)
        // 跳转
        this.$router.push('/')
        this.$toast.success('登录成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录登录')
      }
    }
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
