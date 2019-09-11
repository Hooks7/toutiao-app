<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <van-cell-group style="text-align:center">
        <van-cell title="从相册选择图片" @click="handleSelectFile" />
        <input type="file" style="display:none" ref="file" />
        <van-cell title="拍照" />
        <van-cell title="取消" @click="$emit('input',false)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'
import { uploadPhoto } from '@/api/user'

Vue.use(ImagePreview)
export default {
  props: ['value'],
  data () {
    return {}
  },
  methods: {
    // 上传图片
    handleSelectFile () {
      this.$refs.file.click()

      // 输入框设置事件
      this.$refs.file.onchange = e => {
        if (e.target.files === 0) {
          return
        }
        // 图片在内存中可以访问的临时路径
        const url = URL.createObjectURL(this.$refs.file.files[0])

        // 关闭对话框
        this.$emit('input', false)
        // 图片预览
        ImagePreview({
          images: [url],
          showIndex: false,
          onClose: () => {
            this.handleUploadPhoto()
          }
        })
      }
    },
    // 请求
    async handleUploadPhoto () {
      this.$dialog
        .confirm({
          message: '是否确认更换头像'
        })
        .then(async () => {
          // 加载提示
          this.$toast.loading({
            mask: true,
            message: '加载中...'
          })
          try {
            const res = await uploadPhoto('photo', this.$refs.file.files[0])
            this.$emit('photo', res.photo)
            this.$toast.success('更换成功')
          } catch (err) {
            this.$toast.fail('更换失败')
            console.log(err)
          }
        })
        // 关闭提示
      this.$toast.clear()
    }
  }
}
</script>

<style>
</style>
