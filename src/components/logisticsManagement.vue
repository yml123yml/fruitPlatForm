<template>
  <div>
    <p class="cClass" :class="a">class样式绑定</p>   
    <p :class="{aClass:isA,bClass:isB}">class样式绑定2</p>   
    <p :style="{color:activeColor,fontSize:fontSize}">style样式绑定</p>   
    <button @click="update">更新样式</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 'aClass',
      isA: false,
      isB: true,
      activeColor:'red',
      fontSize:'20px'
    }
  },
  methods: {
    update : function() {
      this.a = 'bClass',
      this.activeColor = 'green'
      this.fontSize = '30px'
    }
  }
}
</script>

<style lang="scss" scoped>
  .aClass {
    color: red;
  }
  .bClass {
    color: blue;
  }
  .cClass {
    font-size: 20px;
  }
</style>