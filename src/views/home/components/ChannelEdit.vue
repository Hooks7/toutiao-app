<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '85%' }"
  >
    <van-cell>
      <div>
        <van-icon name="cross" slot="icon" />
      </div>
    </van-cell>

    <!-- 我的频道 -->
    <van-cell title="我的频道" label="点击进入频道">
      <van-button round type="danger" size="mini" v-show="!isEdit" @click="isEdit=true">编辑</van-button>
      <van-button round type="danger" size="mini" v-show="isEdit" @click="isEdit=false">完成</van-button>
    </van-cell>
    <van-grid>
      <van-grid-item v-for="(item,index) in channels" :key="item.id">
        <div
          slot="text"
          class="van-grid-item__text"
          :class="{active :active===index}"
          @click="jumpMyChannelItem(index)"
        >{{item.name}}</div>
        <!-- 关闭按钮 -->
        <van-icon
          slot="icon"
          class="close-icon"
          name="close"
          v-show="isEdit && index !== 0"
          @click="handleMyChannelItem(index,item.id)"
        />
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道" label="点击添加频道" />
    <van-grid>
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        @click="handleChannelItem(item)"
      />
    </van-grid>
  </van-popup>
</template>

<script>
import { getAllChannels, delAllChannels, addChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/localStorage'
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    // 接收父组件传过来的我的频道
    channels: {
      type: Array,
      required: true
    },
    // 接受父组件频道索引
    active: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState(['user']),
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
      hah: true,
      // 是否为编辑模式
      isEdit: false,
      // 存储所有的频道
      allChannels: []
    }
  },

  methods: {
    // 点击推荐频道
    async handleChannelItem (channel) {
      if (!this.isEdit) {
        return
      }
      this.$set(channel, 'timestamp', null)
      this.$set(channel, 'articles', [])
      this.$set(channel, 'loading', false)
      this.$set(channel, 'finished', false)
      this.$set(channel, 'pullLoading', false)
      //  把channel添加到我的频道
      this.channels.push(channel)
      // 登录
      if (this.user) {
        try {
          await addChannel({ id: channel.id, seq: this.channels.length })
        } catch (err) {
          this.$toast.fail('操作失败')
        }
        return
      }
      // 没登录，把频道列表记录到本地
      setItem('channels', this.channels)
    },

    // 点击我的频道非编辑模式
    jumpMyChannelItem (index) {
      if (!this.isEdit) {
        // 告诉父组件，选中的频道的索引
        // 关闭对话框
        this.$emit('activeChange', index)
      }
    },

    // 点击我的频道
    async handleMyChannelItem (index, id) {
      if (!this.isEdit) {
        return
      }
      // 2.编辑模式
      // 把点击的频道，从我的频道删除
      this.channels.splice(index, 1)
      // 登录
      if (this.user) {
        try {
          await delAllChannels(id)
        } catch (err) {
          this.$toast.success('操作失败')
        }
        return
      }
      // 没登录，把频道列表记录到本地
      setItem('channels', this.channels)
    },

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

.active {
  color: red;
}
</style>
