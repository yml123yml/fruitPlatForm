// node 后端服务器

const adminApi = require('./api/adminApi')
const allFruitApi = require('./api/allFruitApi')
const bodyParser = require('body-parser')
const express = require('express')
var router = express.Router()
var formidable = require('formidable')
var fs = require('fs')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

router.post('/',function(req,res,next){
    var from = new formidable.IncomingForm()
    formidable.parse(req,function(err,fields,files){
        console.log('files:', files)
        console.log('fields:', fields)
    })
})

// 后端api路由
app.use('/api/admin', adminApi)
app.use('/api/allFruit', allFruitApi)

// 监听端口
app.listen(3000)
console.log('3000端口服务器已连接')
