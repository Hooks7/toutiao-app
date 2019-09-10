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
    <van-cell-group v-show="value">
      <van-cell
        @click="onSearch(item)"
        v-for="item in suggestionList"
        :key="item"
        :title="item"
        icon="search"
      > <div slot="title" v-html="highlight(item)"></div>
      </van-cell>

    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="!value">
      <van-cell title="历史记录">
        <!-- 自定义右侧内容 -->
        <div v-show="isEdit" style="display:inline-block">
          <span @click="handleDeleteAll">全部删除</span>&nbsp;
          <span @click="isEdit=false">完成</span>
&nbsp;
        </div>
        <van-icon @click="isEdit=true" v-show="!isEdit" name="delete" size="18px" />
      </van-cell>
      <van-cell v-for="(item,index) in histories"  @click="onSearch(item)" :key="item" :title="item">
        <!-- 自定义右侧内容 -->
        <van-icon name="close" size="18px" @click.stop="handleDelete(index)" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {
  getSuggestion,
  searchSuggestion,
  searchResult,
  delHistory
} from '@/api/search'
import { mapState } from 'vuex'
import * as storageTools from '@/utils/localStorage'
import _ from 'lodash'

export default {
  name: 'Search',
  data () {
    return {
      value: '',
      // 存储搜索建议
      suggestionList: [],
      // 历史记录
      histories: [],
      isEdit: false
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
    // 搜索高亮
    highlight (item) {
      const reg = new RegExp(this.value, 'gi')
      return item.replace(reg, `<span style='color:red'>${this.value}</span>`)
    },

    // 确认搜索
    async onSearch (item) {
      this.$router.push({
        name: 'search-result',
        params: {
          q: item
        }
      })
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

    onCancel () {
      this.$router.push('/')
    },

    // 删除
    async handleDelete (index) {
      // 登录
      this.histories.splice(index, 1)
      if (this.user) {
        await delHistory()
        return
      }
      // 没登录
      storageTools.setItem('history', this.histories)
    },
    // 全部删除
    handleDeleteAll () {
      this.$dialog
        .confirm({
          title: '您确认全部删除吗'
        })
        .then(() => {
          this.histories.splice(0)
          this.isEdit = false
          // 登录
          if (this.user) {
            delHistory()
            return
          }
          // 没登录
          storageTools.setItem('history', this.histories)
        })
        .catch(() => {
          // on cancel
        })
    },

    // 在文本框输入的过程中获取搜索提示
    handleInput: _.debounce(async function () {
      if (this.value.length === 0) {
        return
      }
      try {
        const res = await getSuggestion(this.value)
        this.suggestionList = res.options
      } catch (err) {
        console.log(err)
      }
    }, 300)
    // 判断是否为空
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style>
</style>
