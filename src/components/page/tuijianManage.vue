<template>
  <div class="">
    <el-button
      type="primary"
      @click="dialogVisible = true"
      style="margin:10px 0;"
      >添加数据</el-button
    >
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      style="width: 100%"
    >
      <el-table-column min-width="5%" align="center" label="编号" prop="id">
      </el-table-column>
      <el-table-column min-width="15%" align="center" label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.pic" width="85" height="85" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column min-width="20%" align="center" label="标题" prop="title">
      </el-table-column>
      <el-table-column
        min-width="20%"
        align="center"
        label="描述"
        prop="saletip"
      >
      </el-table-column>
      <el-table-column
        min-width="20%"
        align="center"
        label="价格"
        prop="price"
      >
      </el-table-column>
      <el-table-column min-width="15%" align="center" label="编辑">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
      :hide-on-single-page="true"
    >
    </el-pagination>
    <el-dialog
      title="添加数据"
      center
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div class="form">
        <el-form ref="form" label-width="100px" label-position="left">
          <el-form-item label="标题">
            <el-input v-model="addList.name"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              @change="uploadAvatar"
            />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addList.saletip"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="addList.price"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑数据"
      center
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
      :before-close="handleClose"
      width="30%"
    >
      <div class="form">
        <el-form
          :model="updateList"
          ref="form"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="标题">
            <el-input v-model="updateList.name"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="updateList.saletip"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="updateList.price"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button type="primary" @click="handleUpdate(updateList.id)"
              >更新</el-button
            >
            <el-button @click="editFormVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'tuijianManage',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false, // 添加数据弹层
      editFormVisible: false, // 默认不显示编辑弹层
      addList: {
        picture: '',
        name: '',
        saletip: '',
        price: ''
      },
      updateList: {
        name: '',
        saletip: '',
        price: ''
      }
    }
  },
  methods: {
    getList () {
      axios.post('/api/tuijian/list').then(res => {
        this.tableData = res.data
      })
    },
    // 分页
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    // 根据id删除用户
    async handleDelete (id) {
      console.log(id)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          axios.get('/api/tuijian/delete?id=' + id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
          this.currentPage = 1
        })
        .catch(err => {
          this.$message({
            type: 'error',
            message: err
          })
        })
    },
    // 添加数据
    onSubmit () {
      axios
        .post('/api/tuijian/addFruit', {
          pic: this.addList.picture,
          name: this.addList.name,
          saletip: this.addList.saletip,
          price: this.addList.price,
          num: this.addList.num,
          proDetailImg1: this.addList.proDetailImg1,
          proDetailImg2: this.addList.proDetailImg2,
          proSwipeImg1: this.addList.proSwipeImg1,
          proSwipeImg2: this.addList.proSwipeImg2,
          proSwipeImg3: this.addList.proSwipeImg3
        })
        .then(response => {
          console.log(response)
        })
      this.dialogVisible = false
      this.getList()
      this.addList = {}
    },
    // 上传图片
    uploadAvatar (avatar) {
      var url = 'http://localhost:3000'
      console.log(avatar.target.files[0])
      let file = avatar.target.files[0]
      let data = new FormData()
      data.append('file', file, file.name)
      data.append('data', 12)
      console.log(data.get('file'))
      axios.post(url + '/zhutu', data).then(
        function (data) {
          console.log(data)
        },
        function (response) {
          console.log(response)
        }
      )
    },
    // 更新数据
    handleEdit (row) {
      console.log('更新的id是：', row.id)
      this.editFormVisible = true
      this.updateList = Object.assign({}, row)
    },
    handleUpdate (id) {
      this.editFormVisible = false
      console.log(id + '我是id')
      axios
        .post('/api/tuijian/update?id=' + id, {
          name: this.updateList.title,
          saletip: this.updateList.saletip,
          price: this.updateList.price
        })
        .then(response => {
          console.log(response)
        })
      this.getList()
    },
    // 关闭弹窗
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
.el-pagination {
  white-space: nowrap;
  color: #303133;
  font-weight: 700;
  text-align: center;
  margin-top: 5px;
  background: #fff;
}
</style>
