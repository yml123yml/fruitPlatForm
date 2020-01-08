<template>
  <div class="aside_nav">
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#1f2530"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      mode="history"
    >
      <el-menu-item index="/index">
        <i class="iconfont">&#xe611;</i>
        <span slot="title">
          首页
          <i class="iconfont">&#xe74b;</i>
        </span>
      </el-menu-item>
      <el-menu-item index="/statistics">
        <i class="iconfont">&#xe609;</i>
        <span slot="title">
          计算和监听属性
          <i class="iconfont">&#xe74b;</i>
        </span>
      </el-menu-item>
      <el-menu-item index="/orderManagement">
        <i class="iconfont">&#xe61b;</i>
        <span slot="title">
          常用内置指令
          <i class="iconfont">&#xe74b;</i>
        </span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont">&#xe67c;</i>
          <span slot="title">产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addProduct">
            过渡动画
            <i class="iconfont" style="float:right;font-size: 12px;">&#xe74b;</i>
          </el-menu-item>
          <el-menu-item index="/productList">
            生命周期
            <i class="iconfont" style="float:right;font-size: 12px;">&#xe74b;</i>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/stockManagement">
        <i class="iconfont">&#xe610;</i>
        <span slot="title">
          自动收集表单数据
          <i class="iconfont">&#xe74b;</i>
        </span>
      </el-menu-item>
      <el-menu-item index="/logisticsManagement">
        <i class="iconfont">&#xe669;</i>
        <span slot="title">
          样式绑定
          <i class="iconfont">&#xe74b;</i>
        </span>
      </el-menu-item>
      <el-menu-item index="/membershipManagement">
        <i class="iconfont">&#xe641;</i>
        <span slot="title">
          列表渲染
          <i class="iconfont">&#xe74b;</i>
        </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    goTo(path) {
      this.$router.replace(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 600px;
}
span {
  margin-left: 5px;
  i {
    font-size: 12px;
    float: right;
  }
}
</style>
