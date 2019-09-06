<template>
  <div>
    <!-- 导航头 -->
    <van-nav-bar title="头条" />
    <!-- 频道列表 -->
    <van-tabs animated v-model="activeIndex">
      <van-icon slot="nav-right" name="ascending" class="nav-btn"  @click="showChannelEdit='true' "/>
      <!-- 遍历，显示频道列表 -->
      <van-tab v-for="item in channels" :title="item.name" :key="item.id" type='card' >
        <!-- 下拉加载更多组件 -->
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
        >
          <!-- 文章列表，不同标签不同列表 -->
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell
              v-for="item in currentChannel.articles"
              :key="item.art_id.toString()"
              :title="item.title"
            >
              <div slot="label">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="(img,index) in item.cover.images" :key="img+index">
                    <van-image height="80" :src="img">
                      <!-- 图片的加载提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- 自定义加载失败提示 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <p>
                  <span>{{item.aut_name}}</span> &nbsp;
                  <span>{{item.comm_count}}评论</span>&nbsp;
                  <span>{{item.pubdate|fmtDate}}</span>
                  <!-- 点击x按钮，记录当前的文章对象 -->
                  <van-icon name="cross" style="float:right" @click="handleAction(item)" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <!-- 弹出层组件 -->
    <!-- 如果article的值为null 不显示more-action -->
    <more-action
      @handleSuccess="handleSuccess"
      v-model="showMoreAction"
      :article="currentArticle"
      v-if="currentArticle"
    ></more-action>

    <!-- 弹出频道管理 -->
    <channel-edit
    v-model="showChannelEdit"
    ></channel-edit>
  </div>
</template>

<script>
import { getDefaultOrUserChannels } from '@/api/channel'
import { getArticles } from '@/api/article'
import { getItem, setItem } from '@/utils/localStorage'
import Vue from 'vue'
import { Lazyload } from 'vant'
import MoreAction from './components/MoreAction'
import ChannelEdit from './components/ChannelEdit'

// options 为可选参数，无则不传
Vue.use(Lazyload)
export default {
  name: 'Home',
  components: {
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      // 频道列表
      channels: [],
      // 频道索引
      activeIndex: 0,
      // 下拉更新完毕之后显示，成功的提示
      successText: '',
      // 弹框默认关闭
      showMoreAction: false,
      // 点击x的时候，记录的当前文章对象
      currentArticle: null,
      // 控制频道管理的弹出层显示隐藏
      showChannelEdit: false
    }
  },
  computed: {
    // 返回当前的频道对象
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  methods: {
    // 不感兴趣删除列表中的数据
    handleSuccess () {
      this.showMoreAction = false
      const articles = this.currentChannel.articles
      const index = articles.findIndex(item => {
        return item.art_id === this.currentArticle.art_id
      })
      // 删除指定位置的元素
      articles.splice(index, 1)
    },

    // 点击x按钮，弹出MoreAction，并且记录对应的文章对象
    handleAction (article) {
      // console.log(article)
      this.showMoreAction = true
      this.currentArticle = article
    },

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

    // 下拉事件 加载更多
    async onRefresh () {
      try {
        const data = await getArticles({
          // 频道的id
          channelId: this.currentChannel.id,
          // 时间戳
          timestamp: Date.now(),
          // 是否包含置顶1，0不包含
          withTop: 1
        })
        // 设置加载完毕
        this.currentChannel.pullLoading = false
        // 把数据放到数组的最前面（最新数据）
        this.currentChannel.articles.unshift(...data.results)

        this.successText = `加载了${data.results.length}条`
      } catch (err) {
        console.log(err)
      }
    },

    // 频道列表
    async loadChannels () {
      try {
        let channels = []
        // 1.用户登录发送请求获取数据
        if (this.$store.state.user) {
          const data = await getDefaultOrUserChannels()
          channels = data.channels
        } else {
          // 2. 如果用户没有登录，先去本地存储中获取数据，如果没有数据再发送请求
          // 如果本地存储中没有值，获取的是null
          channels = getItem('channels')
          if (!channels) {
            const data = await getDefaultOrUserChannels()
            channels = data.channels
            // 存储本地
            setItem('channels', channels)
          }
        }
        // 给所有频道设置，时间戳和文章数组
        // console.log(result)
        channels.forEach(item => {
          item.timestamp = null
          item.articles = []
          // 上拉加载
          item.loading = false
          item.finished = false
          // 下拉加载
          item.pullLoading = false
        })

        this.channels = channels
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
    position: fixed;
    left:0;
    right: 0;
    top: 46px;
    z-index: 100;
    .nav-btn {
      position: fixed;
      right: 3px;
      line-height: 44px;
      font-size: 20px;
      opacity: 0.8;
    }
  }
  /deep/ .van-tabs__content {
    margin-bottom: 50px;
    margin-top: 46px;
  }
}
.van-nav-bar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}
</style>
