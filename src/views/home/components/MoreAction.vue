<template>
  <van-dialog v-model="show" :show-cancel-button="false" close-on-click-overlay></van-dialog>
</template>

<script>
export default {
  name: "MoreAction",
  data(){
    return {
      show:true
    }
  }
};
</script>

<style>
</style>
