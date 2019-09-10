<template>
<van-popup
  :value='value'
  @input="$store.commit('setShowReplyList',$event)"
  position="bottom"
  :style="{ height: '80%' }"
v-if='currentComment'
>
<van-nav-bar
:title="currentComment.reply_count + '条评论'"/>

 <!-- 待评论的 内容 -->
     <van-cell>
      <div slot="icon">
        <img class="avatar" :src="currentComment.aut_photo" alt="">
      </div>
      <div slot="title">
        <span>{{ currentComment.aut_name }}</span>&nbsp;
        <van-tag>楼主</van-tag>
      </div>
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <div slot="label">
        <p>{{ currentComment.content }}</p>
        <p>
          <span>{{ currentComment.pubdate | fmtDate }}</span>

        </p>
      </div>
    </van-cell>

</van-popup>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ReplyList',
  props: ['value'],
  computed: {
    ...mapState(['currentComment'])
  },
  data () {
    return {
      show: true
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
