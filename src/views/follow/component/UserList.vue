<template>
<van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
>
    <van-cell
     v-for="item in list"
    :key="item.id.toString()"
    :title="item.name"/>
</van-list>
</template>

<script>
import { getFollowings, getFollowers } from '@/api/user'
export default {
  name: 'UserList',
  // 0 关注用户列表  1 粉丝列表
  props: ['type'],
  data () {
    return {
      list: [], // 关注或粉丝列表
      loading: false,
      finished: false,
      page: 1,
      perpage: 10
    }
  },
  methods: {
    // 获取数据
    async onLoad () {
      try {
        let res = null
        if (this.type === 0) {
          res = await getFollowings({
            page: this.page,
            perPage: this.perpage
          })
        } else {
          res = await getFollowers({
            page: this.page,
            perPage: this.perpage
          })
        }
        this.page++
        this.list.push(...res.results)
        this.loading = false
        if (res.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取失败')
        console.log(err)
      }
    }
  }
}
</script>

<style>

</style>
