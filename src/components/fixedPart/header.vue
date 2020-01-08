<template>
  <div>
      <el-row :gutter="20">
        <el-col :span="4"><div class="">xxx后台管理系统</div></el-col>
        <el-col :span="18"><div class="quitLogin">退出登录</div></el-col>
        <el-col :span="2"><img class="avatar" src="../../assets/img/avatar.png"></el-col>
      </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .quitLogin {
    float: right;
  }
  .avatar {
    margin-top: 13px;
    margin: 13px 30px 0 0;
    float: right;
  }
</style>