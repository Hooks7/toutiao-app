<template>
<van-popup
  :value='value'
  @input="$store.commit('setShowReplyList',$event)"
  position="bottom"
  :style="{ height: '70%' }"

/>
</template>

<script>
export default {
  name: 'ReplyList',
  props: ['value'],
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>

</style>
