<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="头条" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <!-- 遍历，显示频道列表 -->
      <van-tab v-for="item in channels" :title="item.name" :key="item.id">
        <van-list
        v-model="currentChannel.loading"
        :finished="currentChannel.finished"
        finished-text="没有更多了"
        @load="onLoad">
          <van-cell v-for="item in currentChannel.articles" :key="item.art_id" :title="item.title" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  name: 'Home',
  data () {
    return {
      // 频道列表
      channels: [],
      // 频道索引
      activeIndex: 0,
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {

    async onLoad () {
      // 异步更新数据
      const data = await getArticles({
        // 频道id
        channelId: this.currentChannel.id,
        // 时间戳
        timestamp: this.currentChannel.timestamp || Date.now(),
        // 置顶
        withTop: 1
      })

      // 记录文章列表，记录最后一条数据的时间戳
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articles.push(...data.results)

      this.currentChannel.loading = false
      // 文章加载完毕
      // 如果某一个频道加载完毕，其它频道中的finished 也是加载完毕
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    },

    // 频道列表
    async loadChannels () {
      try {
        let result = await getDefaultOrUserChannels()
        // 给所有频道设置，时间戳和文章数组
        console.log(result)
        result.channels.forEach((item) => {
          item.timestamp = null
          item.articles = []
          item.loading = false
          item.finished = false
        })

        this.channels = result.channels
      } catch (err) {
        console.log(err)
      }
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
