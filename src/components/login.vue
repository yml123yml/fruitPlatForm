<template>
  <div class="container">
    <img class="bgimg" src="../assets/img/bg.jpg" />
    <div class="loginBox">
      <div class="loginContent">
        <div class="content">
          <div class="title">xxx后台管理系统</div>
          <div>
            <el-input placeholder="请输入用户名">
              <i slot="prefix" class="iconfont">&#xe612;</i>
            </el-input>
            <el-input placeholder="请输入密码">
              <i slot="prefix" class="iconfont">&#xe694;</i>
            </el-input>
          </div>
          <div>
            <el-button type="success" plain @click="login">登录</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login : function() {
      this.$router.push({path:'/index'})
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .loginBox {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 240px;
    .loginContent {
      width: 400px;
      height: 350px;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .content {
        width: 300px;
        .title {
          font-size: 20px;
          font-weight: bolder;
          padding: 40px;
          text-align: center;
        }
        .el-input {
          margin: 10px;
          i {
            display: block;
            line-height: 40px;
            margin-left: 5px;
          }
        }
        .el-button {
          margin: 20px 0 0 10px;
          width: 300px;
        }
      }
    }
  }
}
</style>