<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      :show-confirm-button="false"
      close-on-click-overlay
    >
      <van-cell-group style="text-align:center">
        <van-cell title="从相册选择图片" />
        <van-cell title="拍照" />
        <van-cell title="取消" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {}
  }
}
</script>

<style>
</style>
