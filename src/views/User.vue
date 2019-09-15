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
        <van-cell is-link :border="false" class="base-info"  @click="$router.push('/user-profile')">
          <div slot="title">
            <img
              class="avatar"
              :src="userinfo.photo"
              alt
            />
            <span class="title">{{userinfo.name}}</span>
          </div>
        </van-cell>
        <van-grid class="data-info" :border="false">
          <van-grid-item>
            <span class="count">{{userinfo.art_count}}</span>
            <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item @click="$router.push('/follow?type=1')">
            <span class="count">{{userinfo.follow_count}}</span>
            <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item  @click="$router.push('/follow?type=2')">
            <span class="count">{{userinfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{userinfo.like_count}}</span>
            <span class="text">获赞</span>
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
        <van-cell title="小智同学" is-link to="/chat" />
        <van-cell title="系统设置" is-link />
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { myself } from '@/api/user'
export default {
  data () {
    return {
      userinfo: {} // 用户信息，

    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 登录
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath

        }
      })
    },

    // 用户信息
    async loadUserInfo () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }
      try {
        const res = await myself()
        this.userinfo = res
      } catch (err) {
        this.$toast.fail('获取用户信息失败')
      }
    }
  },
  created () {
    this.loadUserInfo()
  }
}
</script>

<style lang="less" scoped>
.not-login {
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 100px;
    height: 100px;
    padding: 40px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 40px;
  }
}

.user-info {
  .base-info {
    background: palevioletred;
    display: flex;
    align-items: center;
    height: 140px;
    div {
      display: flex;
      align-items: center;
    }
    .avatar {
      margin-right: 30px;
      width: 100px;
      height: 100px;
      border-radius: 100%;
    }
    .van-icon {
      color: #fff;
    }
  }
  .data-info {
    .text {
      font-size: 28px;
    }
    .count {
      font-size: 24px;
    }
  }
  /deep/ .van-grid-item__content {
    background-color: palevioletred;
  }
}
</style>
