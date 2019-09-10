<template>
  <div class="add-comment">
    <div class="input-wrap">
      <input type="text" v-model="content">
    </div>
    <div class="more-wrap">
      <van-icon
        v-if="!isArticle"
        name="star-o"></van-icon>
      <van-button
        size="small"
        @click="handleSend">发布</van-button>
    </div>
  </div>
</template>

<script>
import { sendComment } from '@/api/comment'
export default {
  name: 'SendComment',
  props: ['isArticle', 'target'],
  data () {
    return {
      content: '' // 评论内容
    }
  },
  methods: {
    async handleSend () {
      // 判断是否登录
      if (!this.$checkLogin()) {
        return
      }
      // 没值不发送请求
      if (this.content.length === 0) {
        return
      }
      // 发布评论
      try {
        await sendComment({
          target: this.target,
          content: this.content,
          art_id: this.target
        })
        // 输入框清空
        this.content = ''
      } catch (err) {
        this.$toast.fail('发送失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-comment {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding: 10px;
  border-top: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 10px;
    height: 30px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 15px;
    }
  }
  .more-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>
