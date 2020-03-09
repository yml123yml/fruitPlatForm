<template>
  <div>
    <h1>我是首页</h1>
    <!-- 数据添加 -->
    <el-form :inline="true" :model="userInfo" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="userInfo.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input v-model="userInfo.gender" placeholder="请输入性别"></el-input>
      </el-form-item>
      <el-form-item label="电话号">
        <el-input v-model="userInfo.phoneNum" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item  label="日期">
        <el-date-picker
            v-model="userInfo.birthday"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addUser">添加信息</el-button>
      </el-form-item>
    </el-form>
    <!-- 数据显示 -->
    <div>
      <el-table :data="tableData" style="width: 100%">
        <!-- 加序号 -->
        <el-table-column label="序号" width="180">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="phoneNum" label="电话"></el-table-column>
        <el-table-column prop="birthday" label="生日"></el-table-column>
        <el-table-column prop="birthday" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="editUser(scope.row,scope.$index)"
            ></el-button>
            <el-button type="danger" icon="el-icon-delete" circle @click="delUser(scope.$index)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 查看详情 -->
    <div>
      <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <detail :editObj="editObj"></detail>
        <span slot="footer" class="dialog-footer">
        <div>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import detail from './edit.vue'
export default {
  components: {
    detail
  },
  data () {
    return {
      userInfo: {
        // 显示的用户信息
        name: '',
        gender: '',
        phoneNum: '',
        birthday: ''
      },
      tableData: [
        {
          name: '王小虎',
          gender: '男',
          phoneNum: '12345678900',
          birthday: '2001-02-24'
        },
        {
          name: '王小虎',
          gender: '男',
          phoneNum: '12345678900',
          birthday: '2001-02-24'
        }
      ],
      dialogVisible: false, // 控制弹框的显示(不显示)
      editObj: {
        name: '',
        gender: '',
        phoneNum: '',
        birthday: ''
      },
      userIndex: 0
    }
  },
  mounted () {
    axios.post('/api/productList/allList').then(res => {
      console.log('dd')
      console.log(res.data)
    })
  },
  methods: {
    // 添加用户信息
    addUser () {
      // 将文本框数据push到tableData中
      this.tableData.push(this.userInfo)
      // 每添加一次，就将原来的数据清空一下
      this.userInfo = {
        name: '',
        gender: '',
        phoneNum: '',
        birthday: ''
      }
    },
    // 删除一组数据
    delUser (idX) {
      console.log(idX)
      this.$confirm('确认删除？')
        .then(_ => {
          this.tableData.splice(idX, 1)
        })
        .catch(_ => {})
    },
    // 编辑数据
    editUser (item, idX) {
      this.userIndex = idX
      // console.log(item);
      this.editObj = {
        name: item.name,
        gender: item.gender,
        phoneNum: item.phoneNum,
        birthday: item.birthday
      }
      this.dialogVisible = true
    },
    // 弹框关闭按钮
    handleClose () {
      this.dialogVisible = false
    }
  }
</script>

<style lang="scss" scoped>

</style>
