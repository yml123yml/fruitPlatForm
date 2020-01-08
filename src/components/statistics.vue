<template>
  <div id="demo">
    <div>我是计算和监听属性</div><br />
    姓:
    <input type="text" placeholder="姓" v-model="firstName" />
    <br />
    名:
    <input type="text" placeholder="名" v-model="lastName" />
    <br />
    姓名1(单向):
    <input type="text" v-model="fullName1" />
    <br />姓名2(单向):
    <input type="text" v-model="fullName2" />
    <br />姓名3(双向):
    <input type="text" v-model="fullName3" />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'A',
      lastName: 'B',
      fullName2: 'A B'
    }
  },
  computed: {
    fullName1() {
      return this.firstName + "  " + this.lastName
    },
    fullName3: {
        // 当获取当前属性值时自动调用, 将返回值(根据相关的其它属性数据)作为属性值
        get () {
          return this.firstName + '-' + this.lastName
        },
        // 当属性值发生了改变时自动调用, 监视当前属性值变化, 同步更新相关的其它属性值
        set (value) {
          // 更新firstName和lastName
          const names = value.split('-')
          this.firstName = names[0]
          this.lastName = names[1]
        }
      }
  },
  watch: {
    //监听姓
    firstName:function(val) {
      //firstName 发生了变化
      this.fullName2 = val + " " + this.lastName;
    },
    //监听名
    lastName:function(val) {
      this.fullName2 = this.firstName + " " + val;
    }
  }
};
</script>

<style>
</style>