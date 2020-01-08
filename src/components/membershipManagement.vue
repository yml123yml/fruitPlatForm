<template>
  <div>
    <h2>v-for 遍历数组并筛选</h2>
    <input type="text" v-model="searchName">
    <ul>
      <li v-for="(p,index) in filterPersons" :key="index">
        {{ index }}---{{ p.name }}----{{ p.age }}
        <button @click="deleteP(index)">删除</button>
      </li>
    </ul>
    <div>
      <button @click="setOrderType(2)">年龄升序</button>
      <button @click="setOrderType(1)">年龄降序</button>
      <button @click="setOrderType(0)">原本顺序</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      searchName: '',
      orderType: 0, // 0代表不排序, 1代表降序, 2代表升序
      persons: [
        {name: '张小虎', age:18},
        {name: '王晓红', age:17},
        {name: '张晓', age:17},
        {name: '赵柳虎', age:16}
      ]
    }
  },
  computed: {
    filterPersons () {
//        debugger
        // 取出相关数据
        const {searchName, persons, orderType} = this
        let arr = [...persons]
        // 过滤数组
        if(searchName.trim()) {
          arr = persons.filter(p => p.name.indexOf(searchName)!==-1)
        }
        // 排序
        if(orderType) {
          arr.sort(function (p1, p2) {
            if(orderType===1) { // 降序
              return p2.age-p1.age
            } else { // 升序
              return p1.age-p2.age
            }

          })
        }
        return arr
      }
  },
  methods: {
    deleteP(index) {
      //删除persons中指定index的p
      this.persons.splice(index,1);
    },
     setOrderType (orderType) {
        this.orderType = orderType
      }
  }
};
</script>

<style>
</style>