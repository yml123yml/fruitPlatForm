import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/index',
                    component: () => import(/* webpackChunkName: "index" */ '../components/page/index.vue'),
                    meta: { title: '首页' }
                },
                {
                    path: '/productList',
                    component: () => import(/* webpackChunkName: "productList" */ '../components/page/productList.vue'),
                    meta: { title: '订单管理' }
                },
                {
                    path: '/productManage',
                    component: () => import(/* webpackChunkName: "productManage" */ '../components/page/productManage.vue'),
                    meta: { title: '商品分类管理' }
                },
                {
                    path: '/hotFruitManage',
                    component: () => import(/* webpackChunkName: "hotFruitManage" */ '../components/page/hotFruitManage.vue'),
                    meta: { title: '热销水果管理' }
                },
                {
                    path: '/importedFruitManage',
                    component: () => import(/* webpackChunkName: "importedFruitManage" */ '../components/page/importedFruitManage.vue'),
                    meta: { title: '进口水果管理' }
                },{
                    path: '/reasonalFruitManage',
                    component: () => import(/* webpackChunkName: "reasonalFruitManage" */ '../components/page/reasonalFruitManage.vue'),
                    meta: { title: '时令水果管理' }
                },{
                    path: '/twoFruitManage',
                    component: () => import(/* webpackChunkName: "twoFruitManage" */ '../components/page/twoFruitManage.vue'),
                    meta: { title: '买一赠一管理' }
                },{
                    path: '/landmarkFruitManage',
                    component: () => import(/* webpackChunkName: "landmarkFruitManage" */ '../components/page/landmarkFruitManage.vue'),
                    meta: { title: '地标水果管理' }
                },{
                    path: '/heavyCommendManage',
                    component: () => import(/* webpackChunkName: "heavyCommendManage" */ '../components/page/heavyCommendManage.vue'),
                    meta: { title: '重磅推荐管理' }
                },{
                    path: '/bannerManage',
                    component: () => import(/* webpackChunkName: "bannerManage" */ '../components/page/bannerManage.vue'),
                    meta: { title: 'banner管理' }
                },{
                    path: '/tuijianManage',
                    component: () => import(/* webpackChunkName: "tuijianManage" */ '../components/page/tuijianManage.vue'),
                    meta: { title: '推荐水果管理' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        }
    ]
});
