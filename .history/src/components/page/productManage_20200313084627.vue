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
          <el-form-item label="标题">
            <el-input v-model="addList.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              action="myUrl"
              :on-change="(file,fileList)=>{handleChange(file,fileList,1)}"
              :on-remove="(file,fileList)=>{handleRemove(file,fileList,1)}"
              :auto-upload="false"
              :file-list="fileList[0]"
              ref="file1"
            >
              <el-button size="small">选择图片</el-button>
            </el-upload>
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
            <el-upload
  action="myUrl"
  :on-change="(file,fileList)=>{handleChange(file,fileList,2)}"
  :on-remove="(file,fileList)=>{handleRemove(file,fileList,2)}"
  :auto-upload="false"
  :file-list="fileList[1]"
  ref="file2"
>
  <el-button size="small">选择图片</el-button>
</el-upload>
          </el-form-item>
          <el-form-item label="轮播图2">
            <el-upload
  action="myUrl"
  :on-change="(file,fileList)=>{handleChange(file,fileList,3)}"
  :on-remove="(file,fileList)=>{handleRemove(file,fileList,3)}"
  :auto-upload="false"
  :file-list="fileList[2]"
  ref="file3"
>
  <el-button size="small">选择图片</el-button>
</el-upload>
          </el-form-item>
          <el-form-item label="轮播图3">
            <el-upload
  action="myUrl"
  :on-change="(file,fileList)=>{handleChange(file,fileList,4)}"
  :on-remove="(file,fileList)=>{handleRemove(file,fileList,4)}"
  :auto-upload="false"
  :file-list="fileList[2]"
  ref="file3"
>
  <el-button size="small">选择图片</el-button>
</el-upload>
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
          <el-form-item label="描述">
            <el-input v-model="updateList.description"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="updateList.tip"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="updateList.price"></el-input>
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
      fileList: [0,0,0,0], //缓存区文件
  uploadFile:[[],[],[],[]], //  上传用文件
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
        price: ""
      }
    };
  },
  methods: {
    handleChange(file, fileList, type) {
  //  限制单张上传，超过限制即覆盖
  if (fileList.length > 1) {
    fileList.splice(0, 1);
  }

  //  校验
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    this.$message.error("上传图片大小不能超过 5MB!");
    this.removeUploadedFile(type);  //  不符合要求删除文件
    return false;
  }

  const isImage = file.raw.type.includes("image");
  if (!isImage) {
    this.$message.error("上传的格式必须是图片!");
    this.removeUploadedFile(type);
    return false;
  }
  //  验证通过之后，将缓存区文件存入上传区文件中
  this.formData.files[type] = file.raw;
},
//  从缓存区移除文件
removeUploadedFile(type) {
  if (type === 0) {
    this.$refs.file1.clearFiles();
  }
  if (type === 1) {
    this.$refs.file2.clearFiles();
  }
  if (type === 2) {
    this.$refs.file3.clearFiles();
  }
}
//  删除文件
handleRemove(file, fileList, type) {
  //  删除文件时要移除缓存区文件和上传区文件
  this.fileList[type] = 0;
  this.uploadFile[type] = [];
},
//  上传文件
submitData() {
  //  校验是否选择文件
  let fileNum = this.flatten(this.uploadFile).length;
  if (fileNum === 0) {
    this.$error("未选择任何文件!");
    return false;
  }

  //  使用formdata格式
  let formData = new FormData();
  if (this.formData.files[0]) {
    formData.append("file1", this.formData.files[0]);
  }
  if (this.formData.files[1]) {
    formData.append("file2", this.formData.files[1]);
  }
  if (this.formData.files[2]) {
    formData.append("file2", this.formData.files[2]);
  }

  //  请求:在headers上务必加上content-Type,指定表单形式发送
  axios
  .post("uploadUrl", formData, {headers: { "Content-Type": "multipart/form-data" }})
  .then(res => {
    this.$success("上传图片成功!");
    this.fileList = [0,0,0];
    this.uploadFile =[[],[],[]];
  })
  .catch(e => {
    console.log(e);
  });
}
//  扁平化数组
flatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(this.flatten(arr[i]));
    } else {
      res.push(arr[i]);
    }
  }
  return res;
},
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
    onSubmit() {     
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
          proSwipeImg3: this.addList.proSwipeImg3
        })
        .then(response => {
          console.log(response);
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
