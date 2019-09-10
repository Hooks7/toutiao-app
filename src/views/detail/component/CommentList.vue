<template>
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <van-cell v-for="item in list" :key="item.com_id.toString()">
      <div slot="icon">
        <img class="avatar" :src='item.aut_photo' alt />
      </div>
      <div slot="title">
        <span>{{item.aut_name}}</span>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{item.content}}</p>
        <p>
          <span>{{item.pubdate |fmtDate}}</span>
          ·
          <span @click="reply">回复{{item.reply_count}}</span>
        </p>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
export default {
  name: 'commentList',
  // isArticle 是否是文章
  // id  如果获取文章的评论，id文章的id，如果获取评论的评论 id是评论的id
  props: ['isArticle', 'id'],
  data () {
    return {
      loading: false,
      finished: false,
      list: [], // 评论列表
      // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      offset: null,
      // 每页获取多少条数据
      limit: 10
    }
  },
  methods: {
    reply () {
      // 点击回复按钮，显示回复评论的列表
      this.$store.commit('setShowReplyList', true)
    },
    async onLoad () {
      // 获取评论列表
      try {
        const data = await getComments({
          isArticle: this.isArticle,
          source: this.id,
          offset: this.offset,
          limit: this.limit
        })

        // 当前获取的最后一条数据的id存储
        this.offset = data.last_id
        this.list.push(...data.results)
        this.loading = false
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取评论失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
}

</style>
