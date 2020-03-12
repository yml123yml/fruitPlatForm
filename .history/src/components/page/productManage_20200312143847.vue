<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-lx-copy"></i> 商品管理</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <el-button type="text" @click="dialogVisible = true"
      >点击打开 Dialog</el-button
    >
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
     <div class="form">
      <el-form ref="form" label-width="100px" label-position="left">
        <el-form-item label="标题">
          <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "productManage",
  data() {
    return {
      tableData: [],
      search: "",
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false
    };
  },
  methods: {
    getList() {
      axios.post("/api/allFruit/list").then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    //根据id删除用户
    // async handleDelete(id){
    //     console.log(id);
    //     this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     axios.get('/api/allFruit/delete?id='+id)
    //     this.$message({
    //       type: 'success',
    //       message: '删除成功!',
    //     })
    //     this.getList()
    //   }).catch((err) => {
    //     this.$message({
    //       type: 'error',
    //       message: err
    //     })
    //   })
    // },
    handleDelete(id) {
      axios.get("/api/allFruit/delete?id=" + id).then(res => {
        console.log("dddd");
        console.log(id);
        console.log(res.data);
        this.getList();
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    onSubmit() {}
  },
  created() {
    this.getList();
  }
};
</script>

<style>
.message-title {
  cursor: pointer;
}
.handle-row {
  margin-top: 30px;
}
</style>
