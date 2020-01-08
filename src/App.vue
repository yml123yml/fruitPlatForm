<template>
  <div id="app">
    <el-container v-if="$route.meta.keepAlive">
      <el-aside width="201px">
        <keep-alive>
          <aside-nav></aside-nav>
        </keep-alive>
      </el-aside>
      <el-container>
        <el-header>
          <keep-alive>
            <header-nav></header-nav>
          </keep-alive>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <router-view  v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
import asideNav from '../src/components/fixedPart/asideNav';
import headerNav from '../src/components/fixedPart/header';
export default {
  name: 'App',
  components: {
    asideNav,
    headerNav
  }
}
</script>

<style>
.el-header {
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  color: #333;
  line-height: 60px;
  margin: 0;
}
.el-aside {
  height: 100vh;
  overflow-y: auto;
  background: #1f2530;
  transition: all 0.3s;
}
</style>
