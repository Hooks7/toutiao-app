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
import eventHub from '@/utils/eventHub'
export default {
  name: 'SendComment',
  props: ['isArticle', 'target', 'art_id'],
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
        const res = await sendComment({
          target: this.target,
          content: this.content,
          artId: this.art_id
        })

        eventHub.$emit('sendSuccess', {
          comment: res.new_obj,
          isArticle: this.isArticle
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
  padding: 20px;
  border-top: 4px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .input-wrap {
    padding: 10px;
    border: 2px solid #ccc;
    border-radius: 20px;
    height: 60px;
    display: flex;
    align-items: center;
    width: 50%;
    input {
      border: none;
      color: #999;
      font-size: 30px;
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
