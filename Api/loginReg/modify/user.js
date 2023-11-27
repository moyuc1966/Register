const express = require('express');
const router = express.Router();
const db = require('../../link.js')
const md5 = require('../enc.js')
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

//修改用户信息
router.post('/userMod', (req, res) => {
    if (!isEmptyStr(req.body.name) && !isEmptyStr(req.body.age) && !isEmptyStr(req.body.phone)) {
        tw(res, 400, '请输入要修改项目')
    } else {
        //防止token伪造
        let sql = `select id,name,age,phone from users where id = ${req.auth.id} and username = '${req.auth.username}'`
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr);
            if (data.length == 0) {
                tw(res, 403, '您没有权限修改')
            } else {
                let user = data[0];
                let name = req.body.name || user.name;
                let age = req.body.age || user.age;
                let phone = req.body.phone || user.phone;
                if (name.length > 20) {
                    tw(res, 400, '昵称过长');
                } else if (age > 120 || age < 1) {
                    tw(res, 400, '年龄不合法');
                } else if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(phone)) {
                    tw(res, 400, '手机号不合法');
                } else {
                    sql = `update users set name = '${name}',age = ${age},phone = '${phone}' where id = ${req.auth.id}`
                    db.query(sql, (err, data) => {
                        if (err) return res.send(sqlErr);
                        if (data.affectedRows == 1) {
                            tw(res, 200, '修改成功')
                        } else {
                            tw(res, 400, '修改失败')
                        }
                    })
                }

            }
        })
    }
})



//修改密码
router.post('/userModPass', (req, res) => {
    if (!req.body.newpass) {
        tw(res, 400, '请输入新密码')
    } else {
        //防止token伪造
        let sql = `select id from users where id = ${req.auth.id} and username = '${req.auth.username}'`
        db.query(sql, (err, data) => {
            if (/^[A-Za-z0-9]+$/.test(req.body.newpass) && req.body.newpass.length >= 6 && req.body.newpass.length <= 20) {
                if (err) return res.send(sqlErr);
                if (data.length == 0) {
                    tw(res, 403, '您没有权限修改')
                } else {
                    const pass = md5(req.body.newpass);
                    sql = `update users set password = '${pass}' where id = ${req.auth.id}`
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

const uploadFun = (req, res, next) => {
    let storage = multer.diskStorage({
        //指定保存位置
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../','../', '/images/avatar'))
        },
        //指定保存文件名
        filename: (req, file, cb) => {
            //处理保存文件名
            let extname = path.extname(file.originalname);
            filename = file.fieldname + "-" + Date.now() + extname;
            cb(null, filename);
        }
    })

    let limits = {
        //设置上传数量，大小
        files: 1,
        fileSize: 1024 * 1024 * 5 // 5MB
    }
    const upload = multer({
        storage: storage,
        //限制文件大小
        limits: limits,
        fileFilter: function (req, file, cb) {
            // 限制文件上传类型，仅可上传png格式图片
            if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
                cb(null, true)
            } else {
                cb(null, false) //不接受文件，此时会直接跳过此文件，如果不抛出异常，之后会无法得到req.file
                let err = new Error();
                //抛出错误
                err.code = 'LIMIT_FILE_TYPES';
                cb(err)
            }
        }
    }).single('avatar');
    upload(req, res, (err) => {
        if (err) {
            if (err.code == 'LIMIT_FILE_SIZE') {
                res.send({
                    code: '500',
                    msg: '上传失败，文件过大',
                })
            } else if (err.code == 'LIMIT_FILE_TYPES') {
                res.send({
                    code: '500',
                    msg: '文件类型不合法',
                })

            } else {
                console.log(err);
                res.send({
                    code: '500',
                    msg: '服务器错误'
                })
            }
        } else {
            //将文件名单独拿出来
            req.filename = req.file.filename
            next()
        }
    })
}

//用户上传头像
router.post('/avatar', uploadFun, (req, res) => {
    //上传成功，开始写入数据库
    let sql = `update users set avatar = '/images/avatar/${req.filename}' where id = ${req.auth.id}`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.affectedRows == 1) {
            res.send({
                code: '200',
                msg: '上传成功',
                data: '/images/avatar/' + req.filename
            })
        } else {
            tw(res, 400, '上传失败')
        }
    })
})



module.exports = router;