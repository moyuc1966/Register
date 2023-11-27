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

const uploadFun = (req, res, next) => {
    let storage = multer.diskStorage({
        //指定保存位置
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../', '/images/swiper'))
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
        fileSize: 1024 * 1024 * 8 // 5MB
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
    }).single('swiperImg');
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

//添加轮播图
router.post('/swiperPut', uploadFun, (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            // 上传成功，开始写入数据库
            let sql = `insert into swiper (imgUrl, detId) values ('/images/swiper/${req.filename}', ${req.body.detId})`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 1) {
                    res.send({
                        code: 200,
                        msg: '添加成功'
                    })
                } else {
                    //删除图片
                    fs.unlink(path.join(__dirname, '../', '/images/swiper/' + req.filename), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    })

                    tw(res, 400, '添加失败')
                }
            })
        }
    })
})


//删除轮播图
router.delete('/swiperDel', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            let sql = `delete from swiper where id = ${req.query.id}`
            db.query(sql, (err, data) => {
                 if (err) console.log(err)
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 1) {
                    res.send({
                        code: 200,
                        msg: '删除成功'
                    })
                } else {
                    tw(res, 400, '删除失败')
                }
            })
        }
    })
})

//修改轮播图detId
router.post('/swiperMod', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限修改')
        } else {
            let sql = `update swiper set detId = ${req.body.detId} where id = ${req.body.id}`
            db.query(sql, (err, data) => {
                 if (err) console.log(err);
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 1) {
                    res.send({
                        code: 200,
                        msg: '修改成功'
                    })
                } else {
                    tw(res, 400, '修改失败')
                }
            })
        }
    })
})




module.exports = router;