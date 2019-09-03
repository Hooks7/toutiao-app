<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="登录" />
    <!-- 输入框 -->
    <van-cell-group>
      <van-field left-icon="friends-o" placeholder="请输入手机号" />
      <van-field left-icon="warn-o" placeholder="请输入验证码">
        <van-button slot="button" round type="danger">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="login-btn">
    <van-button>登录</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.van-button {
  width: 100%;
  height: 29px;
  line-height: 29px;
}
.login-btn{
padding: 20px;
    .van-button{
        height: 50px;
              }

}
</style>
