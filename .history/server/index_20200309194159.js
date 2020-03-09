// node 后端服务器

const adminApi = require('./api/adminApi')
const tuijianApi = require('./api/tuijianApi')
const categoryApi = require('./api/categoryApi')
const bannerApi = require('./api/bannerApi')
const seachApi = require('./api/searchApi')
const cartApi = require('./api/cartApi')
const productListApi = require('./api/productListApi')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 后端api路由
app.use('/api/admin', adminApi)
app.use('/api/tuijian', tuijianApi)
app.use('/api/category', categoryApi)
app.use('/api/banner', bannerApi)
app.use('/api/search', seachApi)
app.use('/api/cart', cartApi)
app.use('/api/productList', productListApi)

// 监听端口
app.listen(3000)
console.log('3000端口服务器已连接')
