//管理员数据
const express = require('express');
const router = express.Router();
const db = require('../link.js');

router.get('/getAdministratorsList',(req,res)=>{
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '禁止访问')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql = `select id,name,username,gender,email from admin order by id desc LIMIT ${(page - 1) * limit} , ${limit}`;
            db.query(sql, (err, data) => {
                let s = `select count(*) as count from admin`
                db.query(s,(e,d)=>{
                    if (err || e) return res.send({ code: 500, msg: '数据库错误' });
                    if (data.length == 0) {
                        res.send({ code: 404, msg: '数据为空' });
                    } else {
                        res.send({ code: 200, msg: '获取成功', data, count: d[0].count }); 
                    }
                })
            })
        }
    })
})


router.get('/administratorsSearch',(req,res)=>{
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '禁止访问')
        } else {
            if(req.query.user == '' || req.query.user == null) return res.send({ code: 404, msg: '参数不完整' });
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql = `select id,name,username,gender,email from admin where username = ${req.query.user} order by id desc LIMIT ${(page - 1) * limit} , ${limit}`;
            db.query(sql, (err, data) => {
                let s = `select count(*) as count from admin where username = ${req.query.user}`
                db.query(s,(e,d)=>{
                    if (err || e) return res.send({ code: 500, msg: '数据库错误' });
                    if (data.length == 0) {
                        res.send({ code: 404, msg: '数据为空' });
                    } else {
                        res.send({ code: 200, msg: '获取成功', data, count: d[0].count }); 
                    }
                })
            })
        }
    })
})


module.exports = router;