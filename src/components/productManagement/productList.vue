<template>
  <div>
    <button @click="destoryVM">销毁</button>
    <p v-show="isShow">每隔一秒显示一次</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true
    }
  },
  // 初始化显示之后立即调用
  mounted() {
    this.intervalId = setInterval(() => {
      this.isShow = !this.isShow
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  methods: {
    destoryVM() {
      this.$destroy()
    }
  }
}
</script>

<style>

</style>