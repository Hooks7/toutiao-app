<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      background="pink"
    />
    <!-- 温馨提示 -->
    <van-cell-grouo>
      <van-cell title="单元格" icon="search" />
      <van-cell title="单元格" icon="search" />
    </van-cell-grouo>

    <!-- 历史记录 -->
    <van-cell-grouo>
      <van-cell title="历史记录">
          <!-- 自定义右侧内容 -->
            <div>
                <span>全部删除</span>&nbsp;
                <span>完成</span>&nbsp;
                <van-icon  name="delete" size="18px"/>
            </div>
      </van-cell>
      <van-cell title="单元格">
        <!-- 自定义右侧内容 -->
        <van-icon name="close" size="18px" />
      </van-cell>

    </van-cell-grouo>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    onSearch () {},
    onCancel () {}
  }
}
</script>

<style>
</style>