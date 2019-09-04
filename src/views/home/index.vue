<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="标题" />
    <!-- 频道列表 -->
    <van-tabs>
      <van-tab v-for="item in list" :title="item.name" :key="item.id">内容 {{ item.name }}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { channel } from '@/api/user'
export default {
  data () {
    return {
      list: [] // 频道列表
    }
  },
  methods: {
    // 频道列表
    async getList () {
      let result = await channel()
      this.list = result.channels
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style>
</style>
