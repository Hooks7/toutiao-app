<template>
<div class="auth-info">
    <div class="base-info">
      <img class="avatar" :src="article.aut_photo" alt="">
      <div>
        <p>{{ article.aut_name }}</p>
        <p>{{ article.pubdate | fmtDate }}</p>
      </div>
    </div>
    <div>
      <van-button
        type="danger"
        :loading="loading"
        @click="attention"
      >{{article.is_followed?'已':''}}关注</van-button>
    </div>
  </div>
</template>

<script>
import { focusUser, unFollowUser } from '@/api/user'
export default {
  name: 'AuthorInfo',
  props: ['article'],
  data () {
    return {
      loading: false // 设置按钮加载
    }
  },
  methods: {
    // 点击按钮关注 或者取消关注
    async   attention () {
      if (!this.$checkLogin()) {
        return
      }
      this.loading = true
      // 判断是否登录
      try {
        //   如果未关注
        if (!this.article.is_followed) {
          await focusUser(this.article.aut_id)
          this.article.is_followed = false
        } else {
          // 未关注
          await unFollowUser(this.article.aut_id)
          this.article.is_followed = false
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.auth-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 26px;
  .base-info {
    display: flex;
    align-items: center;
  }
  .avatar {
    margin-right: 20px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
  }
}
</style>
