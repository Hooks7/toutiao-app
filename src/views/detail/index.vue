<template>
  <div>
    <van-nav-bar title="文章详情" left-text="返回" left-arrow @click-left="$router.back()" />
    <div class="article" v-if="article">
      <!-- 文章标题 -->
      <h2 :class="article-title">{{article.title}}</h2>
      <!-- 作者信息 -->
      <!-- 文章内容 -->
      <div class="article-content">
        <div class="article-content" v-html="article.content"></div>
      </div>
      <!-- 点赞和取消 -->
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  name: 'detail',
  props: ['id'],
  data () {
    return {
      article: {}
    }
  },
  methods: {
    // 加载文章详情
    async loadData () {
      try {
        const res = await getArticle(this.id)
        this.article = res
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
