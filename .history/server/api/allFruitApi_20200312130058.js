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
// router.delete('/delete', (req, res) => {
//   var sql = $sql.allFruit.delete
//   conn.query(sql, function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     if (result) {
//       jsonWrite(res, result)
//     }
//   })
// })

router.post('/delete', (req, res) => {
  var sql = $sql.allFruit.delete
  // var params = req.body;
  console.log(req)
  conn.query(sql, [req.body.id], function (_err, result) {
    var data = result
    console.log(result)
    return res.send({
      status: 1,
      msg: '删除成功',
      data: data
    })
  })
})
module.exports = router
