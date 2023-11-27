// 消息发送，阅读，删除，获取
const express = require('express');
const router = express.Router();
const db = require('../link.js');

const sqlErr = (err, res) => {
    console.log(err);
    res.send({
        code: 500,
        msg: '数据库错误'
    })
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

//格式化时间
function formatDate(time) {
    var date = new Date(time);
    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
        (month < 10 ? '0' + month : month) + '-' +
        (day < 10 ? '0' + day : day) + ' ' +
        (hour < 10 ? '0' + hour : hour) + ':' +
        (min < 10 ? '0' + min : min) + ':' +
        (sec < 10 ? '0' + sec : sec);
    return newTime;
}

//发送消息
router.post('/send', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.userId)) tw(res, 400, '请选择接收人');
            if (!isEmptyStr(req.body.content) || req.body.content.length > 780) tw(res, 400, '请消息内容不合法');
            if (!isEmptyStr(req.body.title) || req.body.title.length > 780) tw(res, 400, '请消息内容不合法');
            let time = formatDate(new Date().getTime());
            let source = req.body.source || '管理员';
            let type = ['预约成功', '退款处理', '公告', '新消息'].includes(req.body.type) ? req.body.type : '新消息';
            let sql = `insert into message (userId, title, content, time,source,type,isread) values 
            (${req.body.userId}, '${req.body.title}', '${req.body.content}', '${time}','${source}','${type}',0)`;
            db.query(sql, (err, data) => {
                if (err) return sqlErr(err, res);
                if (data.affectedRows == 1) {
                    tw(res, 200, '发送成功');
                } else {
                    tw(res, 400, '发送失败');
                }
            })
        }
    })
})


//获取消息列表，管理员
router.get('/adminList', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql = `select *,(select name from users where id = userId) as userName,(select avatar from users where id = userId) as avatar
,(select username from users where id = userId) as username from message order by time desc LIMIT ${(page - 1) * limit} , ${limit}`;
            db.query(sql, (err, data) => {
                if (err) return sqlErr(err, res);
                let sql = `select count(*) as total from message`;
                db.query(sql, (err, data2) => {
                    if (err) return sqlErr(err, res);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].total,
                        data: data
                    })
                })
            })
        }
    })
})


//删除消息
router.delete('/messageDel/:id', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!req.params.id) tw(res, 400, '请选择需删除的消息');
            let sql = `delete from message where id = ${req.params.id}`;
            db.query(sql, (err, data) => {
                if (err) return sqlErr(err, res);
                if (data.affectedRows == 1) {
                    tw(res, 200, '删除成功');
                } else {
                    tw(res, 400, '删除失败');
                }
            })
        }
    })
})

//消息搜索
router.get('/query', (req, res) => {
    if (!req.query.type && !req.query.userId) return tw(res, 400, '请输入搜索条件')
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql, sql2;
            if (req.query.userId) {
                sql = `select *,(select name from users where id = userId) as userName,(select avatar from users where id = userId) as avatar
,(select username from users where id = userId) as username from message where userId = '${req.query.userId}' Limit ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as total from message where userId = '${req.query.userId}'`
            } else {
                sql = `select *,(select name from users where id = userId) as userName,(select avatar from users where id = userId) as avatar
,(select username from users where id = userId) as username from message where type = '${req.query.type}' LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as total from message where type = '${req.query.type}'`
            }
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                db.query(sql2, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].total,
                        data: data
                    })
                })
            })
        }
    })
})

module.exports = router;