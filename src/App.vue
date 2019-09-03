<template>
  <div id="app">
    <router-view/>
    <van-count-down :time="time" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      time: 30 * 60 * 60 * 1000
    }
  }
}
</script>

<style lang="less">

</style>
