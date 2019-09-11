<template>
  <div>
    <!-- 未登录 -->
    <div class="not-login" v-if="!user">
      <div class="circle" @click="handleLogin">
        <span>登录</span>
      </div>
    </div>
    <!-- 已登录 -->
    <div v-else>
      <van-cell-group class="user-info">
        <van-cell is-link :border="false" class="base-info">
          <div slot="title">
            <img
              class="avatar"
              src="http://img0.imgtn.bdimg.com/it/u=3641197722,136309602&fm=26&gp=0.jpg"
              alt
            />
            <span class="title">只是为了好玩儿</span>
          </div>
        </van-cell>
        <van-grid class="data-info" :border="false">
          <van-grid-item>
            <span class="count">1</span>
            <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">1</span>
            <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">1</span>
            <span class="text">我的点赞</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">1</span>
            <span class="text">游览历史</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <van-cell-group >
        <van-grid clickable>
          <van-grid-item icon="star" text="我的收藏" />
          <van-grid-item icon="chat" text="我的评论" />
          <van-grid-item icon="like" text="我的点赞" />
          <van-grid-item icon="browsing-history" text="游览历史" />
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="用户反馈" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="系统设置" is-link />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.not-login {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 50px;
    height: 50px;
    padding: 20px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
}

.user-info {
  .base-info {
    background: palevioletred;
    display: flex;
    align-items: center;
    height: 55px;
    div {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 15px;
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
    .van-icon {
      color: #fff;
    }
  }
  .data-info {
    .text {
      font-size: 14px;
    }
    .count {
      font-size: 12px;
    }
  }
  /deep/ .van-grid-item__content {
    background-color: palevioletred;
  }
}
</style>
