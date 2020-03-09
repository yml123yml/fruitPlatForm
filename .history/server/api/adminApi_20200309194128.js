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

// 查找用户接口
router.post('/selectadmin', (req, res) => {
  var sql_name = $sql.admin.select_name
  var sql_password = $sql.admin.select_password
  var params = req.body
  conn.query(sql_name, params.username, function (err, result) {
    if (err) {
      console.log(err)
    }
    if (result[0] === undefined) {
      res.send('-1')
    } else {
      conn.query(sql_password, params.password, function (err, result) {
        if (err) {
          console.log(err)
        }
        if (result[0] === undefined) {
          res.send('0')
        } else {
          jsonWrite(res, result)
        }
      })
    }
  })
})

module.exports = router
