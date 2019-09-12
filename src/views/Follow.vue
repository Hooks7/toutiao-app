<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar
      :title="this.$route.query.type==='1'?'关注列表':'粉丝列表'"
      left-arrow
      @click-left="$router.back()"
      ref='titles'
    />
    <!-- tabs -->
    <van-tabs v-model="active" @click="onClick">
      <van-tab title="关注">内容</van-tab>
      <van-tab title="粉丝">内容</van-tab>
    </van-tabs>
    <!-- list列表 -->
  </div>
</template>

<script>
export default {
  name: 'Follow',
  data () {
    return {
      active: 1
    }
  },
  methods: {
    onClick (name, title) {

    }
  },
  activated () {
    const type = this.$route.query.type
    if (type === '1') {
      this.active = 0
    } else {
      this.active = 1
    }
  }
}
</script>

<style>
</style>
