<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch(value)"
      @cancel="onCancel"
      background="pink"
      @input="handleInput"
      clearable
    />
    <!-- 搜索提示 -->
    <van-cell-grouo v-show="value">
      <van-cell
        @click="onSearch(item)"
        v-for="item in suggestionList"
        :key="item"
        :title="item"
        icon="search"
/>
    </van-cell-grouo>

    <!-- 历史记录 -->
    <van-cell-grouo v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div>
          <span>全部删除</span>&nbsp;
          <span>完成</span>&nbsp;
          <van-icon name="delete" size="18px" />
        </div>
      </van-cell>
      <van-cell v-for="item in histories" :key="item" :title="item">
        <!-- 自定义右侧内容 -->
        <van-icon name="close" size="18px" />
      </van-cell>
    </van-cell-grouo>
  </div>
</template>

<script>
import { getSuggestion, searchSuggestion, searchResult } from '@/api/search'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'
export default {
  name: 'Search',
  data () {
    return {
      value: '',
      // 存储搜索建议
      suggestionList: [],
      // 历史记录
      histories: []
    }
  },

  async created () {
    // 加载历史记录
    // 登录
    if (this.user) {
      let res = await searchSuggestion()
      this.histories = res.keywords
      return
    }
    // 没有登录
    this.histories = storageTools.getItem('history') || []
  },

  methods: {
    // 确认搜索
    async onSearch (item) {
      // 判断histories中是否已经存在item
      if (this.histories.includes(item)) {
        return
      }
      // 记录搜索历史
      this.histories.unshift(item)
      // 判断用户是否登录
      if (this.user) {
        await searchResult({
          q: item
        })
        return
      }
      //   没有登录
      storageTools.setItem('history', this.histories)
    },
    onCancel () {},

    // 在文本框输入的过程中获取搜索提示
    async handleInput () {
      // 判断是否为空

      if (this.value.length === 0) {
        return
      }
      try {
        const res = await getSuggestion(this.value)
        this.suggestionList = res.options
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
</style>
