<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar
      :title="this.active===0?'关注列表':'粉丝列表'"
      left-arrow
      @click-left="$router.back()"
      ref='titles'
    />
    <!-- tabs -->
    <van-tabs v-model="active" @click="onClick">
      <van-tab title="关注" >
          <!-- 子组件 -->
          <user-list :type="active"></user-list>
      </van-tab>
      <van-tab title="粉丝">
           <user-list :type="active"></user-list>
      </van-tab>
    </van-tabs>
    <!-- list列表 -->
  </div>
</template>

<script>
import UserList from './component/UserList'
export default {
  name: 'Follow',
  data () {
    return {
      active: 0,
      //   1显示关注用户，2 显示粉丝
      type: '1'
    }
  },
  components: {
    UserList
  },
  methods: {
    onClick (name, title) {

    }
  },
  activated () {
    this.type = this.$route.query.type
    if (this.type === '1') {
      this.active = 0
    } else {
      this.active = 1
    }
  }

}
</script>

<style>
</style>
