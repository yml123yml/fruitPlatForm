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
      <el-table-column min-width="10%" align="center" label="标题" prop="title">
      </el-table-column>
      <el-table-column min-width="20%" align="center" label="名称" prop="bigTitle2">
      </el-table-column>
      <el-table-column
        min-width="20%"
        align="center"
        label="描述"
        prop="littleTitle"
      >
      </el-table-column>
      <el-table-column
        min-width="10%"
        align="center"
        label="价格"
        prop="price"
      >
      </el-table-column>
      <el-table-column
        min-width="10%"
        align="center"
        label="数量"
        prop="num"
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
            <el-input v-model="addList.bigTitle1"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="addList.bigTitle2"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              @change="uploadAvatar"
            />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addList.littleTitle"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="addList.price"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="addList.num"></el-input>
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
            <el-input v-model="updateList.bigTitle1"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="updateList.bigTitle2"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="updateList.littleTitle"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="updateList.price"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="updateList.num"></el-input>
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
  name: 'heavyCommendtManage',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false, // 添加数据弹层
      editFormVisible: false, // 默认不显示编辑弹层
      addList: {
        thumb: '',
        bigTitle1: '',
        bigTitle2: '',
        littleTitle: '',
        price: '',
        num: ''
      },
      updateList: {
        bigTitle1: '',
        bigTitle2: '',
        littleTitle: '',
        price: '',
        num: ''
      }
    }
  },
  methods: {
    getList () {
      axios.post('/api/heavycommend/list').then(res => {
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
          axios.get('/api/heavycommend/delete?id=' + id)
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
        .post('/api/heavycommend/addFruit', {
          thumb: this.addList.thumb,
          bigTitle2: this.addList.bigTitle2,
          bigTitle1: this.addList.bigTitle1,
          price: this.addList.price,
          littleTitle: this.addList.littleTitle,
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
        .post('/api/heavycommend/update?id=' + id, {
          bigTitle2: this.updateList.bigTitle2,
          bigTitle1: this.updateList.bigTitle1,
          price: this.updateList.price,
          littleTitle: this.updateList.littleTitle,
          num: this.updateList.num
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
