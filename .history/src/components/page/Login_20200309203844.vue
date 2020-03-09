<template>
  <div class="contain">
    <img class="bgimg" src="../../assets/img/bg.jpg" />
    <div class="loginBox">
      <div class="loginContent">
        <div class="content">
          <div class="title">xxx后台管理系统</div>
          <div>
            <el-input placeholder="请输入用户名" v-model="userName">
              <i slot="prefix" class="iconfont">&#xe612;</i>
            </el-input>
            <el-input placeholder="请输入密码" v-model="passWord" type="password">
              <i slot="prefix" class="iconfont">&#xe694;</i>
            </el-input>
          </div>
          <div>
            <el-button type="success" plain @click="submitForm()">登录</el-button>
          </div>
        </div>
      </div>
    </div>
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
        let data = { username: this.userName, password: this.passWord }
        axios.post('/api/admin/selectAdmin', data).then(res => {
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
<style lang="scss" scoped>
.contain {
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
    margin-top: 200px;
    .loginContent {
      width: 400px;
      height: 350px;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .content {
        width: 300px;
        overflow: hidden;
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
