<template>
  <div class="more-action">
    <van-button
    :icon="article.attitude ===1 ?'star':'star-o'" round :loading="false" type="danger" @click="like">{{article.attitude ===1 ?'取消':''}}点赞</van-button>

    <van-button icon="delete" round :loading="false" type="danger">不喜欢</van-button>
  </div>
</template>

<script>
import { ThumbUpArticles, CancelThumbUp } from '@/api/user'
export default {
  name: 'MoreActon',
  props: ['article'],
  data () {
    return {

    }
  },
  methods: {
    // 点赞功能 和取消点赞
    async like () {
      //   判断是否登录

      try {
        // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
        if (this.article.attitude === 1) {
          await CancelThumbUp(this.article.art_id)
          // 取消点赞
          this.article.attitude = -1
          // 没点赞
        } else {
          await ThumbUpArticles(this.article.art_id)
          // 点赞
          this.article.attitude = 1
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
