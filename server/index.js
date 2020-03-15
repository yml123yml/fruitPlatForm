// node 后端服务器

const adminApi = require('./api/adminApi')
const allFruitApi = require('./api/allFruitApi')
const hotFruitApi = require('./api/hotFruitApi')
const importFruitApi = require('./api/importFruitApi')
const landmankFruitApi = require('./api/landmankFruitApi')
const seasonalFruitApi = require('./api/seasonalFruitApi')
const twoFruitApi = require('./api/twoFruitApi')
const bannerApi = require('./api/bannerApi')
const tuijianApi = require('./api/tuijianApi')
const heavycommendApi = require('./api/heavyrecommendApi.js')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// 后端api路由
app.use('/api/admin', adminApi)
app.use('/api/allFruit', allFruitApi)
app.use('/api/hotFruit', hotFruitApi)
app.use('/api/importFruit', importFruitApi)
app.use('/api/landmankFruit', landmankFruitApi)
app.use('/api/twoFruit', twoFruitApi)
app.use('/api/reasonalFruit', seasonalFruitApi)
app.use('/api/banner', bannerApi)
app.use('/api/tuijian', tuijianApi)
app.use('/api/heavycommend', heavycommendApi)

// 监听端口
app.listen(3000)
console.log('3000端口服务器已连接')
