const express = require('express')
const router = express.Router();
const db = require('../link.js')
const md5 = require('./enc.js')
const jwt = require('jsonwebtoken')

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

// 管理员注册
router.post('/adminReg', (req, res) => {
    if (!isEmptyStr(req.body.username) || !isEmptyStr(req.body.password) || !isEmptyStr(req.body.email) || !isEmptyStr(req.body.gender) || !isEmptyStr(req.body.name)) {
        tw(res, 401, '请填写完整')
    } else if (!/^[A-Za-z0-9]+$/.test(req.body.username) || !/^[A-Za-z0-9]+$/.test(req.body.password)) {
        tw(res, 401, '账号或密码不能含有中文')
    } else if (req.body.username.length > 20 || req.body.username.length < 6 || req.body.password.length > 20 || req.body.password.length < 6) {
        tw(res, 401, '账号或密码长度应在6-20位')
    } else if (req.body.gender != 0 && req.body.gender != 1) {
        tw(res, 500, '操作非法')
    } else if (req.body.name.length > 20) {
        tw(res, 401, '昵称长度过长')
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)) {
        tw(res, 401, '邮箱格式错误')
    } else {
        const pass = md5(req.body.password);
        const sql = `insert into admin (name,username,password,gender,email,grade) values 
                ('${req.body.name}','${req.body.username}','${pass}','${req.body.gender}','${req.body.email}',1)`;
        db.query(sql, (err, results) => {
            if (err) {
                if (err.code == 'ER_DUP_ENTRY') {
                    console.log(err);
                    tw(res, 401, '账号或邮箱已存在')
                } else {
                    res.send(sqlErr)
                }
            } else {
                if (results.affectedRows == 1) {
                    tw(res, 200, '注册成功')
                } else {
                    tw(res, 400, '注册失败')
                }
            }
        })
    }
})

//管理员登录
router.post('/adminLogin', (req, res) => {
    //确保账号密码不为空
    if (!isEmptyStr(req.body.username) || !isEmptyStr(req.body.password)) {
        tw(res, 401, '账号或密码不能为空')
    } else {
        const pass = md5(req.body.password);
        let sql = `select id,username,name from admin where username = '${req.body.username}' and password = '${pass}'`
        db.query(sql, (err, results) => {
            if (err) console.log(err)
            if (err) return res.send(sqlErr);
            if (results.length <= 0) {
                tw(res, 400, '账号或密码错误')
            } else {
                let obj = { 'id': results[0].id, 'username': results[0].username }
                const token = jwt.sign(obj, 'moyc^-^', { expiresIn: '7d' })
                res.send({
                    code: 200,
                    msg: '登录成功',
                    adminName:results[0].name,
                    token: token
                })
            }
        })
    }
})



module.exports = router