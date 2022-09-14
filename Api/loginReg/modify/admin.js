const express = require('express');
const router = express.Router();
const db = require('../../link.js')
const md5 = require('../enc.js')

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

//修改管理员信息
router.post('/adminMod', (req, res) => {
    if (!isEmptyStr(req.body.name) && !isEmptyStr(req.body.username)) {
        tw(res, 400, '请输入要修改项目')
    } else {
        //防止token伪造
        let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr);
            if (data.length == 0) {
                tw(res, 403, '您没有权限修改')
            } else {
                // if (req.body.name.length > 20) tw(res, 400, '昵称过长');
                // if (req.body.username.length > 20 || req.body.username < 6) tw(res, 400, '账号长度应在6-20位之间');
                if (isEmptyStr(req.body.name) && !isEmptyStr(req.body.username)) {
                    sql = `update admin set name = '${req.body.name}' where id = ${req.auth.id}`
                } else if (isEmptyStr(req.body.username) && !isEmptyStr(req.body.name)) {
                    sql = `update admin set username = '${req.body.username}' where id = ${req.auth.id}`
                } else {
                    sql = `update admin set name = '${req.body.name}',username = '${req.body.username}' where id = ${req.auth.id}`
                }
                db.query(sql, (err, data) => {
                    if (err) return res.send(sqlErr);
                    if (data.affectedRows == 1) {
                        tw(res, 200, '修改成功')
                    } else {
                        tw(res, 400, '修改失败')
                    }
                })
            }
        })
    }
})



//修改密码
router.post('/adminModPass', (req, res) => {
    if (!req.body.newpass) {
        tw(res, 400, '请输入新密码')
    } else {
        //防止token伪造
        let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
        db.query(sql, (err, data) => {
            if (/^[A-Za-z0-9]+$/.test(req.body.newpass) && req.body.newpass.length >= 6 && req.body.newpass.length <= 20) {
                if (err) return res.send(sqlErr);
                if (data.length == 0) {
                    tw(res, 403, '您没有权限修改')
                } else {
                    const pass = md5(req.body.newpass);
                    sql = `update admin set password = '${pass}' where id = ${req.auth.id}`
                    db.query(sql, (err, data) => {
                        if (err) return res.send(sqlErr);
                        if (data.affectedRows == 1) {
                            tw(res, 200, '修改成功')
                        } else {
                            tw(res, 400, '修改失败')
                        }
                    })
                }
            } else {
                tw(res, 400, '密码不合法')
            }
        })
    }
})

module.exports = router;