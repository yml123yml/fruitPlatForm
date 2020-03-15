<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#324157"
      text-color="#fff"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item
                v-else
                :index="subItem.index"
                :key="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon" style="color:#fff;"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import bus from '../common/bus'
export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-s-home',
          index: 'index',
          title: '系统首页'
        },
        {
          icon: 'el-icon-s-order',
          index: 'productList',
          title: '订单管理'
        },
        {
          icon: 'el-icon-goods',
          index: 'productManage',
          title: '商品分类管理'
        },
        {
          icon: 'el-icon-sold-out',
          index: 'hotFruitManage',
          title: '商品促销管理',
          subs: [
            {
              index: 'hotFruitManage',
              title: '热销水果管理'
            },
            {
              index: 'importedFruitManage',
              title: '进口水果管理'
            },
            {
              index: 'reasonalFruitManage',
              title: '时令水果管理'
            },
            {
              index: 'twoFruitManage',
              title: '买一赠一管理'
            },
            {
              index: 'landmarkFruitManage',
              title: '地标水果管理'
            },
            {
              index: 'heavyCommendManage',
              title: '重磅推荐管理'
            },
            {
              index: 'bannerManage',
              title: 'banner管理'
            },
            {
              index: 'tuijianManage',
              title: '推荐管理'
            }
          ]
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
      bus.$emit('collapse-content', msg)
    })
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
/deep/ .el-submenu__title i {
    color: #fff;
}
</style>
