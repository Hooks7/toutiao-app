<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '85%' }"
  >
    <van-cell icon="cross" />

    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button round type="danger" size="mini" v-show="!isEdit" @click="isEdit=true">编辑</van-button>
      <van-button round type="danger" size="mini" v-show="isEdit" @click="isEdit=false">完成</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item v-for="item in channels" :key="item.id" :text="item.name">
        <van-icon slot="icon" class="close-icon" name="close"
        v-show="isEdit"
         />
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item v-for="item in recommendChannels"
      :key="item.id"
      :text="item.name" />
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels } from '@/api/channel'
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    channels: {
      type: Array,
      required: true
    }
  },

  computed: {
    // 推荐频道
    recommendChannels () {
      // 1.获取我的频道中所有id组成的数组
      // map() 遍历数组，返回一个新的数组
      const ids = this.channels.map(item => {
        return item.id
      })
      // 2. 过滤所有频道，把频道id出现在上面数组中的项去除
      // filter() 把满足条件的item，返回组成一个新的数组
      return this.allChannels.filter(item => {
        // includes() 判断数组是否包含某一项
        return !ids.includes(item.id)
      })
    }
  },

  data () {
    return {
      // 是否为编辑模式
      isEdit: false,
      // 存储所有的频道
      allChannels: []
    }
  },

  methods: {
    // 加载所有的频道列表
    async loadAllChannels () {
      try {
        const reslut = await getAllChannels()
        this.allChannels = reslut.channels
      } catch (err) {
        console.log(err)
      }
    }
  },
  created () {
    // 加载所有的频道列表
    this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
.close-icon {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
