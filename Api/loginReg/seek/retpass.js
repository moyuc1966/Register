const express = require('express');
const router = express.Router();
const db = require('../../link.js')
const md5 = require('../enc.js')
const email = require('./email.js')

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

//发送邮件验证码接口
router.post('/retpass', (req, res) => {
    if (!isEmptyStr(req.body.email)) {
        tw(res, 400, '请先输入绑定邮箱')
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)) {
        tw(res, 400, '请输入正确的邮箱格式')
    } else {
        const sqlc = `select id,time from code where email = '${req.body.email}' and state = 1`
        db.query(sqlc, (err, results) => {
            if (err) return res.send(sqlErr);
            if (results.length <= 0) {
                go()
            } else {
                let now = Math.round(new Date().getTime() / 1000).toString();
                if (Number(results[results.length - 1].time) + 60 >= Number(now)) {
                    tw(res, 400, '请勿频繁操作')
                } else {
                    db.query(`update code set state = 2 where email = '${req.body.email}';`)
                    go()
                }
            }
        })
        function go() {
            const sql = `select id,name,username from users where email = '${req.body.email}'`
            db.query(sql, (err, data) => {
                if (err) {
                    res.send(sqlErr);
                    console.log(err);
                } else {
                    if (data.length == 0) {
                        tw(res, 400, '该邮箱未注册')
                    } else {
                        //生成验证码
                        let code = Math.random().toString().slice(2, 8);
                        //当前10位时间戳
                        let now = Math.round(new Date().getTime() / 1000).toString();
                        //验证码写入数据库
                        let sql = `insert into code (code,time,state,uid,email) values ('${code}','${now}',1,${data[0].id},'${req.body.email}')`;
                        db.query(sql, (err, results) => {
                            if (err) {
                                res.send(sqlErr);
                                console.log(err);
                            } else {
                                if (results.affectedRows == 1) {
                                    //发送邮件
                                    const ret = email(req.body.email, code, data).then((info) => {
                                        if (!info.accepted[0]) return tw(res, 400, '邮件发送失败')
                                        tw(res, 200, '邮件发送成功,请在10分钟内完成操作')
                                    });
                                } else {
                                    tw(res, 500, '数据库错误')
                                }
                            }
                        })
                    }
                }
            })
        }
    }
})

//验证验证码接口
router.post('/confirm', (req, res) => {
    if (!req.body.code || !req.body.email) {
        tw(res, 400, "验证失败")
    } else {
        const sql = `select id,time from code where code = '${req.body.code}' and email = '${req.body.email}' and state = 1`
        db.query(sql, (err, results) => {
            if (err) return res.send(sqlErr);
            if (results.length <= 0) {
                tw(res, 400, '验证失败');
            } else {
                let now = Math.round(new Date().getTime() / 1000).toString();
                if (Number(results[results.length - 1].time) + 600 >= Number(now)) {
                    tw(res, 200, '验证成功')
                    db.query(`update code set state = 3 where email = '${req.body.email}' and id = '${results[results.length - 1].id}';`)
                } else {
                    tw(res, 504, '操作超时')
                    db.query(`update code set state = 2 where email = '${req.body.email}';`)
                }
            }
        })
    }
})

//修改密码接口
router.post('/modpass', (req, res) => {
    if (!isEmptyStr(req.body.code) || !isEmptyStr(req.body.email) || !isEmptyStr(req.body.password) || req.body.password.length < 6 || req.body.password.length > 20 || !/^[A-Za-z0-9]+$/.test(req.body.password)) {
        tw(res, 400, '修改失败')
    } else {
        const sql = `select id,time from code where code = '${req.body.code}' and email = '${req.body.email}' and state = 3`
        db.query(sql, (err, results) => {
            if (err) return res.send(sqlErr);
            if (results.length <= 0) {
                tw(res, 400, '身份验证失败');
            } else {
                let now = Math.round(new Date().getTime() / 1000).toString();
                if (Number(results[results.length - 1].time) + 600 >= Number(now)) {
                    //开始修改密码
                    const pass = md5(req.body.password)
                    db.query(`update users set password = '${pass}' where email = '${req.body.email}';`, (err, results) => {
                        if (err) return tw(res, 400, '修改失败,请重试')
                        db.query(`update code set state = 2 where email = '${req.body.email}';`)
                        tw(res, 200, '密码重置成功')
                    })
                } else {
                    tw(res, 504, '操作超时')
                    db.query(`update code set state = 2 where email = '${req.body.email}';`)
                }
            }
        })
    }
})


module.exports = router