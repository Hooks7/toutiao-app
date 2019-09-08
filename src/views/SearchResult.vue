<template>
<div>
 <div>
    <van-nav-bar
      title="搜索结果"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
      class="title"
    />

    <van-list
    style="margin-top:46px"
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    >
    <van-cell
    v-for="item in list"
    :key ='item.art_id.toString()'
    :title="item.title"
    >
        <div slot="label">
          <!-- grid 显示封面
            item.cover.type   0 没有图片   1 1个图片 3 3个图片
            -->
          <van-grid v-if="item.cover.type" :border="false" :column-num="3">
            <van-grid-item
              v-for="(img, index) in item.cover.images"
              :key="img + index"
            >
              <van-image lazy-load height="80" :src="img" >
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
            <span>{{ item.aut_name }}</span>&nbsp;
            <span>{{ item.comm_count }}评论</span>&nbsp;
            <span>{{ item.pubdate | fmtDate }}</span>&nbsp;
          </p>
        </div>
      </van-cell>

    </van-list>
  </div>
</div>
</template>

<script>
import { searchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async onLoad () {
      try {
        // 搜索结果
        const res = await searchResult({
          page: this.page,
          per_page: 10,
          q: this.q
        })
        // 把获取结果添加到数组
        this.list.push(...res.results)
        this.page++
        this.loading = false

        if (res.results.length === 0) {
          this.loading = true
        }
      } catch (err) {
        this.$toast.fail('出现了点小错误')
      }
    }
  }

}
</script>

<style lang='less' scoped>
.title{
    position: fixed;
    width: 100%;
    top:0
}
</style>
