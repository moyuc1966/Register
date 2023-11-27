//管理医生员管理预约
const express = require('express');
const router = express.Router();
const db = require('../link.js');

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

//管理员获取预约列表
router.get('/admin/makeList', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let state = isEmptyStr(req.query.state) ? ` and state = ${req.query.state}` : '';
            let sql, sql2;
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            if (isEmptyStr(req.query.name)) {
                sql = `select * from make where name like '%${req.query.name}%' ${state} order by createTime desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from make where name like '%${req.query.name}%' ${state}`
            } else if (isEmptyStr(req.query.userId)) {
                sql = `select * from make where userId = ${req.query.userId} ${state} order by createTime desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from make where userId = ${req.query.userId} ${state}`
            } else if (isEmptyStr(req.query.patId)) {
                sql = `select * from make where patId = ${req.query.patId} ${state} order by createTime desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from make where patId = ${req.query.patId} ${state}`
            } else if (isEmptyStr(req.query.card)) {
                sql = `select * from make where card = '${req.query.card}' ${state} order by createTime desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from make where card = '${req.query.card}' ${state}`
            } else if (isEmptyStr(req.query.depTwoId)) {
                sql = `select * from make where depTwoId = ${req.query.depTwoId} ${state} order by createTime desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from make where depTwoId = ${req.query.depTwoId} ${state}`
            } else {
                if (isEmptyStr(req.query.state)) {
                    sql = `select * from make where state = ${req.query.state} order by createTime desc LIMIT ${(page - 1) * limit} , ${limit};`
                    sql2 = `select count(*) as count from make where state = ${req.query.state}`
                } else {
                    sql = `select * from make order by createTime desc LIMIT ${(page - 1) * limit} , ${limit};`
                    sql2 = `select count(*) as count from make`
                }
            }
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                db.query(sql2, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        'code': 200,
                        'msg': '获取成功',
                        'count': data2[0].count,
                        'data': data
                    })
                })
            })
        }
    })
})













module.exports = router;