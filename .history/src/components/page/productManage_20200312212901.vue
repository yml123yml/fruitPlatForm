<template>
  <div class="">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          ><i class="el-icon-lx-copy"></i> 商品管理</el-breadcrumb-item
        >
      </el-breadcrumb>
    </div>
    <el-button type="text" @click="dialogVisible = true">添加数据</el-button>
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
      <el-table-column label="描述" prop="description"> </el-table-column>
      <el-table-column label="标签分类" prop="tip"> </el-table-column>
      <el-table-column label="价格" prop="price"> </el-table-column>
      <el-table-column label="编辑">
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
    >
    </el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose"
    >
      <div class="form">
        <el-form ref="form" label-width="100px" label-position="left">
          <el-form-item label="添加数据">
            <el-input v-model="addList.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload-demo"
              :before-upload="beforeupload"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              style="margin-left:80px;"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em>点击上传</em>
              </div>
            </el-upload>
            <!-- <el-input v-model="addList.picture"></el-input> -->
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="addList.description"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="addList.tip"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="addList.price"></el-input>
          </el-form-item>
          <el-form-item label="详情图">
            <el-input v-model="addList.proDetailImg1"></el-input>
          </el-form-item>
          <el-form-item label="轮播图1">
            <el-input v-model="addList.proSwipeImg1"></el-input>
          </el-form-item>
          <el-form-item label="轮播图2">
            <el-input v-model="addList.proSwipeImg2"></el-input>
          </el-form-item>
          <el-form-item label="轮播图3">
            <el-input v-model="addList.proSwipeImg3"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑"
      :visible.sync="editFormVisible"
      :close-on-click-modal="false"
      class="edit-form"
      :before-close="handleClose"
    >
      <div class="form">
        <el-form
          :model="updateList"
          ref="form"
          label-width="100px"
          label-position="left"
        >
          <el-form-item label="标题">
            <el-input v-model="updateList.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <template slot-scope="scope">
              <img :src="scope.row.pic" width="80" height="80" class="head_pic" />
            </template>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="updateList.description"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="updateList.tip"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="updateList.price"></el-input>
          </el-form-item>
          <el-form-item label="详情图">
            <el-input v-model="updateList.proDetailImg1"></el-input>
          </el-form-item>
          <el-form-item label="轮播图1">
            <template slot-scope="scope">
          <img :src="scope.row.prodetailImg1" width="80" height="80" class="head_pic" />
        </template>
          </el-form-item>
          <el-form-item label="轮播图2">
            <el-input v-model="updateList.proSwipeImg2"></el-input>
          </el-form-item>
          <el-form-item label="轮播图3">
            <el-input v-model="updateList.proSwipeImg3"></el-input>
          </el-form-item>
          <el-form-item>
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
import axios from "axios";
export default {
  name: "productManage",
  data() {
    return {
      tableData: [],
      search: "",
      currentPage: 1,
      pagesize: 5,
      dialogVisible: false,
      editFormVisible: false, //默认不显示编辑弹层
      addList: {
        picture: "",
        title: "",
        description: "",
        tip: "",
        price: "",
        proDetailImg1: "",
        proSwipeImg1: "",
        proSwipeImg2: "",
        proSwipeImg3: ""
      },
      updateList: {
        title: "",
        description: "",
        tip: "",
        price: "",
        proDetailImg1: "",
        proSwipeImg1: "",
        proSwipeImg2: "",
        proSwipeImg3: ""
      }
    };
  },
  methods: {
    getList() {
      axios.post("/api/allFruit/list").then(res => {
        this.tableData = res.data;
      });
    },
    handleEdit(row) {
      console.log("更新的id是：", row.id);
      this.editFormVisible = true;
      this.updateList = Object.assign({}, row);
    },
    // 根据id删除用户
    async handleDelete(id) {
      console.log(id);
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axios.get("/api/allFruit/delete?id=" + id);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getList();
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
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
    //阻止upload的自己上传，进行再操作
    beforeupload(file) {
      console.log(file);
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL;

      this.src = windowURL.createObjectURL(file);
      //重新写一个表单上传的方法
      this.param = new FormData();
      this.param.append("file", file, file.name);
      return false;
    },
    //覆盖默认的上传行为
    httprequest() {},
    onSubmit() {
      let config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      }
      axios
        .post("/api/allFruit/addFruit", {
          pic: this.addList.picture,
          title: this.addList.title,
          description: this.addList.description,
          tip: this.addList.tip,
          price: this.addList.price,
          proDetailImg1: this.addList.proDetailImg1,
          proSwipeImg1: this.addList.proSwipeImg1,
          proSwipeImg2: this.addList.proSwipeImg2,
          proSwipeImg3: this.addList.proSwipeImg3,
          config
        })
        .then(response => {
          console.log(response+'gggggg');
        });
      this.dialogVisible = false;
      this.getList();
    },
    handleUpdate(id) {
      this.editFormVisible = false;
      console.log(id + "我是id");
      axios
        .post("/api/allFruit/update?id=" + id, {
          title: this.updateList.title,
          description: this.updateList.description,
          tip: this.updateList.tip,
          price: this.updateList.price,
          proDetailImg1: this.updateList.proDetailImg1,
          proSwipeImg1: this.updateList.proSwipeImg1,
          proSwipeImg2: this.updateList.proSwipeImg2,
          proSwipeImg3: this.updateList.proSwipeImg3
        })
        .then(response => {
          console.log(response);
        });
      this.getList();
    }
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
