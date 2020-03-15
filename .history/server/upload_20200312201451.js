var express = require('express')
var router = express.Router()
var formidable = require('formidable')
var fs = require('fs')

router.post('/',function(req,res,next){
    var from = new formidable.IncomingForm()
    formidable.parse(req,function(err,fields,files){
        console.log('files:', files)
        console.log('fields:', fields)
    })
})