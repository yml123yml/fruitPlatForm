<template>
  <!-- <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">悠果后台管理系统</div>
      <el-form
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="userName">
          <el-input
          placeholder="请输入用户名"
          v-model="userName"></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            type="password"
            v-model="passWord"
            placeholder="请输入密码"
            @keyup.enter.native="submitForm()"
          >
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
      </el-form>
    </div>
  </div> -->
  <div class="container">
    <img class="bgimg" src="../../assets/img/bg.jpg" />
    <div class="loginBox"></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: function () {
    return {
      userName: '',
      passWord: ''
    }
  },
  methods: {
    submitForm () {
      var self = this
      if (this.username === '' || this.password === '') {
        alert('请输入用户名或密码')
      } else {
        let data = {'username': this.userName, 'password': this.passWord}
        axios.post('/api/admin/selectAdmin', data).then((res) => {
          /* 接口的传值是(-1,该用户不存在),(0,密码错误)，同时还会检测管理员账号的值 */
          if (res.data === -1) {
            alert('该用户不存在')
          } else if (res.data === 0) {
            alert('密码输入错误')
          } else {
            localStorage.setItem('ms_username', this.userName)
            setTimeout(function () {
              self.$router.push('/')
            }, 1000)
          }
        })
      }
    }
  }
}

</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-bg.jpg);
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
