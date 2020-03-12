<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-lx-copy"></i> 商品管理</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
      "
      style="width: 100%"
    >
      <el-table-column label="编号" prop="id"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="scope.row.pic" width="80" height="80" class="head_pic" />
        </template>
      </el-table-column>
      <el-table-column label="标题" prop="title"> </el-table-column>
      <el-table-column label="描述" prop="desc"> </el-table-column>
      <el-table-column label="标签分类" prop="tip"> </el-table-column>
      <el-table-column label="价格" prop="price"> </el-table-column>
      <el-table-column label="编辑">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
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
    >
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'
import request from '../../utils/request'
export default {
  name: 'productManage',
  data () {
    return {
      tableData: [],
      search: '',
      currentPage: 1,
      pagesize: 5
    }
  },
  methods: {
    getList () {
      axios.post('/api/allFruit/list').then(res => {
        this.tableData = res.data
      })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (id) {
      console.log(id)
      // request({
      //   url: '/api/allFruit/delete',
      //   method: 'post',
      //   data: {id: id}
      // }).then(res => {
      //   console.log(res)
      //   if (res.msg === '删除成功') {
      //     this.$message({
      //       message: '删除成功！',
      //       type: 'success'
      //     })
      //     this.getList()
      //   }
      // })
      axios.post('/api/allFruit/delete?id='+id).then(res => {
        console.log('aahahhaahhaha')
        console.log(res.data)
        this.getList()
      })
      
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>
