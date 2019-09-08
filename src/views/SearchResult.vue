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
    />

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
