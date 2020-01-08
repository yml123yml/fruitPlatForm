<template>
  <div>
        <div>
          <el-form ref="form" :model="editObj" label-width="80px">
            <el-form-item label="姓名"><el-input v-model="editObj.name"></el-input></el-form-item>
            <el-form-item label="性别"><el-input v-model="editObj.gender"></el-input></el-form-item>
            <el-form-item label="生日"><el-date-picker v-model="editObj.birthday" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker></el-form-item>
            <el-form-item label="电话号码"><el-input v-model="editObj.phoneNum"></el-input></el-form-item>
        </el-form>
        </div>
    </div>
</template>

<script>
export default {
  props: ['editObj']
}
</script>

<style>

</style>
