<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="头条" />
    <!-- 频道列表 -->
    <van-tabs>
      <van-tab v-for="item in list" :title="item.name" :key="item.id">

        <van-list v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        >
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { channel } from '@/api/user'
export default {
  name: 'Home',
  data () {
    return {
      list: [], // 频道列表
      loading: false,
      finished: false
    }
  },

  methods: {
    // 频道列表
    async getList () {
      let result = await channel()
      this.list = result.channels
    },

    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }

  },
  created () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
// 在scoped中书写的样式，动态生成的标签或者子组件中不可用
// 深度作用选择器   /deep/
.van-tabs /deep/ .van-tabs__content {
  // margin-top: 46px;
  margin-bottom: 50px;
}

</style>
