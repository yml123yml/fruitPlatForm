<template>
  <div>
     <p ref="content">www.baidu.com</p>
     <button @click="hint">提示</button>
     <p v-cloak>{{ message }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message : '我是文本'
    }
  },
  methods: {
    hint() {
      //得到p标签里的内容
      alert(this.$refs.content.textContent)
    }
  }
}
</script>

<style>
/* 属性选择器 */
[v-cloak] {
  display: none;
}
</style>