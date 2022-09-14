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

function formatDate(time) {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
        month + '-' +
        day + ' ' +
        hour + ':' +
        min + ':' +
        sec;
    return newTime;
}

const uploadFun = (req, res, next) => {
    let storage = multer.diskStorage({
        //指定保存位置
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../', '/images/article'))
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
    }).single('imgUrl');
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

//验证发表文章时提交数据是否合法
const checkArticle = (req, res, next) => {
    let arr = ['公告', '健康百科', '医院介绍', '分享'];
    if (!isEmptyStr(req.body.title) || !isEmptyStr(req.body.content) || !isEmptyStr(req.body.cat)) {
        fs.unlink(path.join(__dirname, '../', '/images/article/' + req.filename), (err) => {
            if (err) {
                console.log(err);
            }
        })
        res.send({
            code: 500,
            msg: '请输入完整'
        })
    } else if (arr.indexOf(req.body.cat) == -1) {
        fs.unlink(path.join(__dirname, '../', '/images/article/' + req.filename), (err) => {
            if (err) {
                console.log(err);
            }
        })
        res.send({
            code: 500,
            msg: '请选择正确的分类'
        })
    } else {
        next()
    }
}


//发表文章
router.post('/articlePut', uploadFun, checkArticle, (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            // 上传成功，开始写入数据库
            let time = formatDate(new Date().getTime());
            let sql = `insert into article (readNum,title,author,cat,imgUrl,time,content) values 
            (0,'${req.body.title}','${req.body.author}','${req.body.cat}','/images/article/${req.filename}', 
            '${time}','${req.body.content}')`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 1) {
                    res.send({
                        code: 200,
                        msg: '添加成功'
                    })
                } else {
                    //删除图片
                    fs.unlink(path.join(__dirname, '../', '/images/article/' + req.filename), (err) => {
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


//删除文章
router.delete('/articleDel', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            let id = req.query.detId;
            let sql = `delete from article where id = ${id}`
            db.query(sql, (err, data) => {
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

//修改文章核验数据中间件
const have = (req, res, next) => {
    let arr = ['公告', '健康百科', '医院介绍', '分享'];
    if (!isEmptyStr(req.body.id)) {
        res.send({ code: 400, msg: '请确定修改文章id' })
    } else if (!isEmptyStr(req.body.title) && !isEmptyStr(req.body.author) && !isEmptyStr(req.body.cat) && !isEmptyStr(req.body.content)) {
        res.send({ code: 400, msg: '请输入需要修改的项目' })
    } else if (isEmptyStr(req.body.cat)) {
        if (arr.indexOf(req.body.cat) == -1) {
            res.send({ code: 400, msg: '分类不合法' })
        } else {
            next()
        }
    } else {
        next()
    }
}

//修改文章
router.post('/articleMod', have, (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限修改')
        } else {
            let sql = `select title,author,cat,content from article where id = ${req.body.id}`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.length == 0) return res.send({ code: 404, msg: '数据不存在' });
                let title = req.body.title || data[0].title;
                let author =req.body.author || data[0].author;
                let cat = req.body.cat || data[0].cat ;
                let content =req.body.content || data[0].content 
                let sql = `update article set title = '${title}',author = '${author}',cat = '${cat}',content = '${content}'
                 where id = ${req.body.id}`
                db.query(sql, (err, data) => {
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
            })
        }
    })
})

//文章缩略图修改
router.post('/articleMod/img', uploadFun, (req, res) => {
    if (!isEmptyStr(req.body.id)) {
        res.send({ code: 400, msg: '请输入需要修改的项目' })
    } else {
        let sql = `update article set imgUrl = '/images/article/${req.filename}' where id = ${req.body.id}`
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr);
            if (data.affectedRows == 1) {
                res.send({
                    code: 200,
                    msg: '修改成功'
                })
            } else {
                //删除图片
                fs.unlink(path.join(__dirname, '../', '/images/article/' + req.filename), (err) => {
                    if (err) {
                        console.log(err);
                        // tw(res, 400, '修改失败')
                    }
                })
                tw(res, 400, '修改失败')
            }
        })
    }
})

module.exports = router;