import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index.vue'
import login from '@/components/login.vue';
import addProduct from '@/components/productManagement/addProduct.vue';
import statistics from '@/components/statistics.vue';
import orderManagement from '@/components/orderManagement.vue';
import productList from '@/components/productManagement/productList.vue';
import stockManagement from '@/components/stockManagement.vue';
import logisticsManagement from '@/components/logisticsManagement.vue';
import membershipManagement from '@/components/membershipManagement.vue';






Vue.use(Router)

export default new Router({
  mode: 'history', // 去掉URL上的#
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: '登录',
      component: login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/statistics',
      name: '统计页面',
      component: statistics,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/addProduct',
      name: '增加产品',
      component: addProduct,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/orderManagement',
      name: 'orderManagement',
      component: orderManagement,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/productList',
      name: 'productList',
      component: productList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/stockManagement',
      name: 'stockManagement',
      component: stockManagement,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/logisticsManagement',
      name: 'logisticsManagement',
      component: logisticsManagement,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/membershipManagement',
      name: 'membershipManagement',
      component: membershipManagement,
      meta: {
        keepAlive: true
      }
    }

    
  ]
})
