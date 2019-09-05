<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="头条" />
    <!-- 频道列表 -->
    <van-tabs>
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
export default {
  name: 'Home',
  data () {
    return {
      // 频道列表
      channels: [],
      list: [],
      loading: false,
      finished: false
    }
  },

  methods: {

    // 频道列表
    async loadChannels () {
      try {
        let result = await getDefaultOrUserChannels()
        this.channels = result.channels
      } catch (err) {
        console.log(err)
      }
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
    this.loadChannels()
  }
}
</script>

<style lang="less" scoped>
// 在scoped中书写的样式，动态生成的标签或者子组件中不可用
// 深度作用选择器   /deep/
.van-tabs {

  /deep/ .van-tabs__wrap {
    // position: fixed;
    top: 46px;
    left: 0px;
    z-index: 100;
  }
  /deep/ .van-tabs__content {
    margin-bottom: 50px;
    margin-top: 46px;

}
}
 .van-nav-bar{
    position: fixed;
  top: 0;
  width: 100%;
    z-index: 100
  }

</style>
