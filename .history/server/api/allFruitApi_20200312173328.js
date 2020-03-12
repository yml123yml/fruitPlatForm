/* eslint-disable camelcase */
var models = require('../db')
var express = require('express')
var router = express.Router()
var mysql = require('mysql')
var $sql = require('../sqlMap')

// 连接数据库
var conn = mysql.createConnection(models.mysql)

conn.connect()
var jsonWrite = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

router.post('/list', (req, res) => {
  var sql = $sql.allFruit.query
  conn.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 删除
router.get('/delete', (req, res) => {
  let id = parseInt(req.query.id)
  let sql = $sql.allFruit.delete
  conn.query(sql, id, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result) {
      jsonWrite(res, result)
    }
  })
})

// 增加
router.post('/addFruit',(req,res)=> {
  var sql = $sql.allFruit.addFruit
  var params = req.body
  conn.query(sql,[params.pic,params.title,params.desc,params.tip,params.price,params.proDetailImg1,params.proSwipeImg1,params.proSwipeImg2,params.proSwipeImg3],function(err,result){
    if(err){
      console.log(err)
    }
    if(result) {
      jsonWrite(res,result)
    }
  })
})
//修改
router.post('updateFruit',(req,res)=> {
  let id = parseInt(req.query.id)
  var sql = $sql.allFruit.update
  var params = req.body
  console.log(params)
  conn.query(sql,[params.pic,params.title,params.desc,params.tip,params.price,params.proDetailImg1,params.proSwipeImg1,params.proSwipeImg2,params.proSwipeImg3,params.id],function(err,result){
    if(err){
      console.log(err)
    }
    if(result) {
      jsonWrite(res,result)
    }
  })
})
module.exports = router
