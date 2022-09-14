//不需要用户token


const express = require('express');
const router = express.Router();
const db = require('../link.js')

const sqlErr = {
    code: 500,
    msg: '数据库错误'
}

function isEmptyStr(s) {
    if (s == null || s === '') {
        return false
    }
    return true
}

//获取轮播图列表
router.get('/swiper', (req, res) => {
    const sql = `SELECT * FROM swiper`;
    db.query(sql, (err, data) => {
        if (err) {
            res.send(sqlErr);
        } else {
            let sql = `select count(*) as count from swiper`;
            db.query(sql, (err, data1) => {
                if (err) {
                    res.send(sqlErr);
                } else {
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data1[0].count,
                        data
                    })
                }
            })
        }
    })
})
//获取文章
router.get('/article', (req, res) => {
    let sql;
   
        if (isEmptyStr(req.query.detId)) {
            let sql = `select * from article where id = ${req.query.detId}`
            db.query(sql, (err, data) => {
                if (err) return res.send({ code: 500, msg: '数据库错误' });
                if (data.length == 0) {
                    res.send({ code: 404, msg: '数据不存在' })
                } else {
                    res.send({ code: 200, msg: '获取成功', data })
                }
            })
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql2;
            if (isEmptyStr(req.query.cat)) {
                sql = `select * from article where cat = '${req.query.cat}' LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from article where cat = '${req.query.cat}'`
            } else {
                sql = `select * from article LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from article`;
            }
            db.query(sql, (err, data) => {
                if (err) return res.send({ code: 500, msg: '数据库错误' });
                if (data.length == 0) {
                    res.send({ code: 404, msg: '数据为空' })
                } else {
                    // let sql = `select count(*) as count from article`;
                    db.query(sql2, (err, data1) => {
                        if (err) return res.send({ code: 500, msg: '数据库错误' });
                        res.send({
                            code: 200,
                            msg: '获取成功',
                            count: data1[0].count,
                            data
                        })
                    })
                }
            })
        }
    
})
//获取医院导航
router.get('/navigation', (req, res) => {
    let sql, sql2;
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
    if (!isEmptyStr(req.query.hosId) && !isEmptyStr(req.query.and)) {
        sql = `select * from navigation limit ${(page - 1) * limit} , ${limit};`
        sql2 = `select count(*) as count from navigation`
    } else if (isEmptyStr(req.query.hosId) && !isEmptyStr(req.query.and)) {
        sql = `select * from navigation where id = ${req.query.hosId} limit ${(page - 1) * limit} , ${limit};`
        sql2 = `select 1 as count`
    } else if (isEmptyStr(req.query.hosId) && isEmptyStr(req.query.and)) {
        sql = `select * from navigationFloor where hosId = ${req.query.hosId} limit ${(page - 1) * limit} , ${limit};`
        sql2 = `select count(*) as count from navigationFloor where hosId = ${req.query.hosId}`
    } else {
        res.send({ code: 400, msg: '请传入完整的参数' })
    }
    db.query(sql, (err, data) => {
         if (err) console.log(err)
        if (err) return res.send({ code: 500, msg: '数据库错误' });
        if (data.length == 0) {
            res.send({ code: 202, msg: '数据为空' })
        } else {
            db.query(sql2, (err, data1) => {
                if (err) return res.send({ code: 500, msg: '数据库错误' });
                res.send({
                    code: 200,
                    msg: '获取成功',
                    count: data1[0].count,
                    data
                })
            })
        }
    })
})


//文章搜索
router.get('/articlePut/:title', (req, res) => {
    let page = req.query.page || 1;
    let limit = req.query.limit || 10;
     let sql;
    if(isEmptyStr(req.query.cat)){
        sql = `select * from article where cat = '${req.query.cat}' and title like '%${req.params.title}%' LIMIT ${(page - 1) * limit} , ${limit};`
    }else{
         sql = `select * from article where title like '%${req.params.title}%' LIMIT ${(page - 1) * limit} , ${limit};;`
     }
    db.query(sql, (err, data) => {
        if (err) return res.send({ code: 500, msg: '数据库错误' });
        if (data.length == 0) {
            res.send({ code: 201, msg: '无数据' })
        } else {
            res.send({ code: 200, msg: '获取成功', data })
        }
    })
})

module.exports = router;