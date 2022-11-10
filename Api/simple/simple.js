//简单且需要用户token接口

const express = require('express');
const router = express.Router();
const db = require('../link.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const sqlErr = {
    code: 500,
    msg: '数据库错误'
}
// 封装固定格式的返回体
const tw = (res, code, msg) => {
    res.send({
        'code': code,
        'msg': msg
    })
}

function isEmptyStr(s) {
    if (s == null || s === '') {
        return false
    }
    return true
}

//文章阅读接口
router.get('/article/read', (req, res) => {
    let sql = `select * from article where id = ${req.query.id}`
    db.query(sql, (err, data) => {
        if (err) return res.send({ code: 500, msg: '数据库错误' });
        if (data.length == 0) {
            res.send({ code: 404, msg: '数据不存在' })
        } else {
            sql = `update article a set a.readNum = (a.readNum + 1) where id = ${req.query.id}`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                tw(res, 200, '阅读+1')
            })
        }
    })
})

//获取用户消息列表
router.get('/getMessageList', (req, res) => {
    let sql = `select id,source,isread,time,type,title,content from message where userId = 0 or userId = ${req.auth.id} order by time desc`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr)
        res.send({
            code: 200,
            msg: '获取成功',
            data
        })
    })
})

//获取消息详情
router.get('/getMessage/:id', (req, res) => {
    let sql = `select id,source,isread,time,type,title,content from message where id =  ${req.params.id}`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr)
        res.send({
            code: 200,
            msg: '获取成功',
            data
        })
    })
})

//阅读消息
router.get('/messageRead/:id', (req, res) => {
    let sql = `update message set isread = 1 where id =  ${req.params.id} and userId = ${req.auth.id}`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr)
        if (data.affectedRows == 1) {
            tw(res, 200, '已阅读')
        } else {

            tw(res, 400, '出现错误')
        }
    })
})

//获取未读消息数量
router.get('/getMessageNum',(req,res)=>{
    if(!isEmptyStr(req.auth.id)) return tw(res,400,'参数不完整')
    let sql = `select count(id) as num from message where userId = ${req.auth.id} and isread = 0`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr)
        res.send({
            code:200,
            msg:'获取成功',
            num:data[0].num
        })
    })
})



//获取科室--医院
router.get('/getHospital', (req, res) => {
    let sql, sql2;
    let switchinfo = req.query.switch == 'on' ? 'where state = 1' : ''
    if (req.query.paging == 'on') {
        let page = req.query.page || 1;
        let limit = req.query.limit || 10;
        sql = `select * from depHospital LIMIT ${(page - 1) * limit} , ${limit}  ${switchinfo};`
        sql2 = `select count(*) as total from depHospital ${switchinfo}`
    } else {
        sql = `select * from depHospital ${switchinfo}`
        sql2 = `select count(*) as total from depHospital ${switchinfo}`
    }
    db.query(sql, (err, data) => {
        if (err) console.log(err)
        if (err) return res.send(sqlErr)
        db.query(sql2, (err, data2) => {
             if (err) console.log(err)
            if (err) return res.send(sqlErr)
            res.send({
                code: 200,
                msg: '获取成功',
                count: data2[0].total,
                data
            })
        })
    })
})

//获取科室--一级科室
router.get('/getDepOne', (req, res) => {
    let sql, sql2;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let switchinfo = req.query.switch == 'on' ? ' and state = 1' : ''
    if (req.query.paging == 'on' && !isEmptyStr(req.query.hosId)) {
        sql = `select *,(select name from depHospital where id = hosId) as hosName from depOwn LIMIT ${(page - 1) * limit} , ${limit} ${switchinfo};`
        sql2 = `select count(*) as total from depOwn where state = 1`
    } else if (req.query.paging == 'on' && isEmptyStr(req.query.hosId)) {
        sql = `select *,(select name from depHospital where id = hosId) as hosName from depOwn where hosId = ${req.query.hosId} LIMIT ${(page - 1) * limit} , ${limit} ${switchinfo};`
        sql2 = `select count(*) as total from depOwn where hosId = ${req.query.hosId} ${switchinfo}`
    } else if (req.query.paging != 'on' && isEmptyStr(req.query.hosId)) {
        sql = `select *,(select name from depHospital where id = hosId) as hosName from depOwn where hosId = ${req.query.hosId} ${switchinfo}`
        sql2 = `select count(*) as total from depOwn where hosId = ${req.query.hosId} ${switchinfo}`
    } else {
        sql = `select *,(select name from depHospital where id = hosId) as hosName from depOwn where state = 1`
        sql2 = `select count(*) as total from depOwn where state = 1`
    }
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr)
        db.query(sql2, (err, data2) => {
            if (err) return res.send(sqlErr)
            res.send({
                code: 200,
                msg: '获取成功',
                count: data2[0].total,
                data
            })
        })
    })
})


//获取科室--二级科室
router.get('/getDepTwo', (req, res) => {
    let sql, sql2;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let switchinfo = req.query.switch == 'on' ? ' where state = 1' : ''
    if (req.query.paging == 'on' && !isEmptyStr(req.query.depId)) {
        sql = `select *,(select name from depHospital where id = d.hosId) as hosName,(select name from depOwn where id = d.depId) as depName from depInclude d LIMIT ${(page - 1) * limit} , ${limit} ${switchinfo};`
        sql2 = `select count(*) as total from depInclude ${switchinfo}`
    } else if (req.query.paging == 'on' && isEmptyStr(req.query.depId)) {
        sql = `select *,(select name from depHospital where id = d.hosId) as hosName,(select name from depOwn where id = d.depId) as depName from depInclude d where depId = ${req.query.depId}  and state = 1 LIMIT ${(page - 1) * limit} , ${limit};`
        sql2 = `select count(*) as total from depInclude where depId = ${req.query.depId} and state = 1`
    } else if (req.query.paging != 'on' && isEmptyStr(req.query.depId)) {
        sql = `select *,(select name from depHospital where id = d.hosId) as hosName,(select name from depOwn where id = d.depId) as depName from depInclude d where depId = ${req.query.depId} and state = 1`
        sql2 = `select count(*) as total from depInclude where depId = ${req.query.depId} and state = 1`
    } else {
        sql = `select *,(select name from depHospital where id = d.hosId) as hosName,(select name from depOwn where id = d.depId) as depName from depInclude d ${switchinfo}`
        sql2 = `select count(*) as total from depInclude ${switchinfo}`
    }
    db.query(sql, (err, data) => {
         if (err) console.log(err)
        if (err) return res.send(sqlErr)
        db.query(sql2, (err, data2) => {
            if (err) console.log(err)
            if (err) return res.send(sqlErr)
            res.send({
                code: 200,
                msg: '获取成功',
                count: data2[0].total,
                data
            })
        })
    })
})

// 获取医生列表
router.get('/getDoctor', (req, res) => {
    let sql, sql2;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    let switchinfo = req.query.switch == 'on' ? ' where state = 0' : ''
    if (req.query.paging == 'on' && !isEmptyStr(req.query.depTwoId)) {
        sql = `select *,(select name from depHospital where id = hosId) as hosName,(select name from depInclude where id = depTwoId) as depName from doctor LIMIT ${(page - 1) * limit} , ${limit} ${switchinfo};`
        sql2 = `select count(*) as total from doctor ${switchinfo}`
    } else if (req.query.paging == 'on' && isEmptyStr(req.query.depTwoId)) {
        sql = `select *,(select name from depHospital where id = hosId) as hosName,(select name from depInclude where id = depTwoId) as depName from doctor where depTwoId = ${req.query.depTwoId}  and state = 1 LIMIT ${(page - 1) * limit} , ${limit};`
        sql2 = `select count(*) as total from doctor where depTwoId = ${req.query.depTwoId} and state = 1`
    } else if (req.query.paging != 'on' && isEmptyStr(req.query.depTwoId)) {
        sql = `select *,(select name from depHospital where id = hosId) as hosName,(select name from depInclude where id = depTwoId) as depName from doctor where depTwoId = ${req.query.depTwoId} and state = 1`
        sql2 = `select count(*) as total from doctor where depTwoId = ${req.query.depTwoId} and state = 1`
    } else {
        sql = `select *,(select name from depHospital where id = hosId) as hosName,(select name from depInclude where id = depTwoId) as depName from doctor ${switchinfo}`
        sql2 = `select count(*) as total from doctor ${switchinfo}`
    }
    db.query(sql, (err, data) => {
        if(err) console.log(err)
        if (err) return res.send(sqlErr)
        db.query(sql2, (err, data2) => {
            if(err) console.log(err)
            if (err) return res.send(sqlErr)
            res.send({
                code: 200,
                msg: '获取成功',
                count: data2[0].total,
                data
            })
        })
    })
})


//获取医生详情消息
router.get('/getDoctorInfo',(req,res)=>{
    if(!isEmptyStr(req.query.id)) return tw(res,400,'参数不完整')
    let sql = `select * from doctor where id = ${req.query.id}`
    db.query(sql,(err,data)=>{
        if(err) console.log(err)
        if(err) return res.send(sqlErr)
        res.send({
            code:200,
            msg:'获取成功',
            data:data
        })
    })
})


//判断管理员token
router.get('/isLogin', (req, res) => {
    res.send({code:200,msg:'已登录'})
})

module.exports = router;