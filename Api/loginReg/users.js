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


// 用户注册
router.post('/userReg', (req, res) => {
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
    } else if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(req.body.phone)) {
        tw(res, 401, '手机号格式错误')
    } else {
        const pass = md5(req.body.password);
        let avatar;
        if (req.body.gender == 0) {
            avatar = '/images/default/boy.jpeg';
        } else {
            avatar = '/images/default/girl.jpeg';
        }
        //查找邮箱账号或手机号是否已被注册
        let lookfor = `select if((select username from users where username = '${req.body.username}'),'username',
        if((select username from users where email = '${req.body.email}'),'email','phone')) as copy from users where phone = '${req.body.phone}' or username = '${req.body.username}' or email = '${req.body.email}'`
        db.query(lookfor, (err, results) => {
            if (err) {
                res.send(sqlErr);
                console.log(err);
            } else {
                if (results.length >= 1) {
                    let map = { 'username': '账号', 'email': '邮箱', 'phone': '手机号' }
                    tw(res, 400, map[results[0].copy] + '已被注册')
                } else {
                    //没有问题，开始注册
                    let createTime = formatDate(new Date().getTime());
                    const sql = `insert into users (name,username,password,gender,email,age,phone,avatar,createTime) values 
                ('${req.body.name}','${req.body.username}','${pass}','${req.body.gender}','${req.body.email}','${req.body.age}','${req.body.phone}','${avatar}','${createTime}')`;
                    db.query(sql, (err, results) => {
                        if (err) {
                            console.log(err);
                            res.send(sqlErr)
                        } else {
                            if (results.affectedRows == 1) {
                                tw(res, 200, '注册成功')
                            } else {
                                tw(res, 400, '注册失败')
                            }
                        }
                    })
                }
            }
        })
    }
})

//用户登录
router.post('/userLogin', (req, res) => {
    //确保账号密码不为空
    if (!isEmptyStr(req.body.username) || !isEmptyStr(req.body.password)) {
        tw(res, 401, '账号或密码不能为空')
    } else {
        const pass = md5(req.body.password);
        let sql = `select id,username from users where username = '${req.body.username}'`
        db.query(sql, (err, results) => {
            if (err) return res.send(sqlErr);
            if (results.length <= 0) {
                tw(res, 404, '账号不存在')
            } else {
                let sql = `select id,username,state from users where username = '${req.body.username}' and password = '${pass}'`
                db.query(sql, (err, results) => {
                    if (err) return res.send(sqlErr);
                    if (results.length <= 0) {
                        tw(res, 400, '密码错误')
                    } else {
                        if (results[0].state == 0) {
                            tw(res, 400, '账号已被冻结')
                        } else {
                            let obj = { 'id': results[0].id, 'username': results[0].username }
                            const token = jwt.sign(obj, 'moyc^-^', { expiresIn: '7d' })
                            res.send({
                                code: 200,
                                msg: '登录成功',
                                token: token
                            })
                        }
                    }
                })
            }
        })
    }
})

module.exports = router