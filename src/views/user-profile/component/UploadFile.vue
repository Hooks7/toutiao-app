<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <van-cell-group style="text-align:center">
        <van-cell title="从相册选择图片" @click="handleSelectFile"/>
        <input type="file" style="display:none" ref='file'>
        <van-cell title="拍照" />
        <van-cell title="取消"  @click="$emit('input',false)"/>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
export default {
  props: ['value'],
  data () {
    return {}
  },
  methods: {
    // 上传头像
    handleSelectFile () {
      this.$refs.file.click()

      // 输入框设置事件
      this.$refs.file.onchange = (e) => {
        if (e.target.files === 0) {
          return
        }
        // 图片在内存中可以访问的临时路径
        const url = URL.createObjectURL(this.$refs.file.files[0])
        console.log(url)

        // 关闭对话框
        this.$emit('input', false)
        // 图片预览
        ImagePreview({
          images: [
            url
          ],
          showIndex: false,
          onClose () {
            // do something
          }
        })
      }
    }
  }
}
</script>

<style>
</style>
