<template>
  <div>
    <van-nav-bar title="文章详情" left-text="返回" left-arrow @click-left="$router.push('/')"
    fixed/>
    <div class="article" v-if="article">
      <!-- 文章标题 -->
      <h2 class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
  <author-info :article='article'></author-info>
      <!-- 文章内容 -->
      <div class="article-content">
        <div class="article-content" v-html="article.content"></div>
      </div>
      <!-- 点赞和取消 -->
      <more-Action :article='article'></more-Action>
        <!-- 评论列表 -->
      <comment-list :isArticle='true' :id='article.art_id.toString()'></comment-list>
    </div>
          <!-- 发布评论 -->
      <send-comment v-if="show" :isArticle="true" :target="article.art_id.toString()"></send-comment>
      <reply-list v-model="showReplyList" :art_id='id'></reply-list>

  </div>
</template>

<script>
import { getArticle } from '@/api/article'
import AuthorInfo from './component/AuthorInfo'
import MoreAction from './component/MoreAction'
import CommentList from './component/CommentList'
import SendComment from './component/SendComment'
import ReplyList from './component/ReplyList'
import { mapState } from 'vuex'
export default {
  name: 'detail',
  // 文章的id
  props: ['id'],
  computed: {
    ...mapState(['showReplyList'])
  },
  data () {
    return {
      article: null,
      show: false
    }
  },
  components: {
    AuthorInfo,
    MoreAction,
    CommentList,
    SendComment,
    ReplyList

  },
  methods: {
    // 加载文章详情
    async loadData () {
      try {
        const res = await getArticle(this.id)
        this.article = res
        this.show = true
      } catch (err) {
        this.$toast.fail('获取失败')
      }
    }
  },
  created () {
    this.loadData()
  }
}
</script>

<style lang="less" scoped>
.article {
  margin-top: 48px;
  padding: 0px 20px;
  .article-title {
    font-size: 20px;
    font-weight: bold;
  }
  .article-content {
    font-size: 13px;
  }
}
</style>
