<template>
  <van-dialog
  :value = "value"
  @input="$emit('input',$event)"
  :showConfirmButton="false"
  close-on-click-overlay>
    <van-cell-group v-show="!showReports">
      <van-cell title="不感兴趣" icon="location-o" />
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports=true" />
      <van-cell title="拉黑作者" icon="location-o" />
    </van-cell-group>

    <!-- 举报文章 -->
    <van-cell-group v-show="showReports">
      <van-cell icon="arrow-left" @click="showReports=false" />
      <van-cell title="标题夸张" />
      <van-cell title="低俗色情" />
      <van-cell title="错别字多" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传递的文章对象
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // show: true,
      showReports: false
    }
  },
  created () {
  }
}
</script>

<style>
</style>
