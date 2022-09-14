// 医院导航
const express = require('express');
const router = express.Router();
const db = require('../link.js');
// const multer = resire('path');

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

//添加医院导航
router.post('/navigationAdd', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            let sql = `insert into navigation(name,telephone,reco,address) values
            ('${req.body.name}','${req.body.telephone}','${req.body.reco}','${req.body.address}')`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 1) {
                    tw(res, 200, '添加成功')
                } else {
                    tw(res, 400, '添加失败')
                }
            })
        }
    })
})


//添加楼层导航
router.post('/navigationAddFloor', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            let sql = `select id from navigation where id = ${req.body.hosId}`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.length == 0) {
                    tw(res, 400, '数据不存在')
                } else {
                    let sql = `insert into navigationFloor(hosId,floorName,content) values 
                   (${req.body.hosId},'${req.body.floorName}','${req.body.content}')`
                    db.query(sql, (err, data) => {
                        if (err) return res.send(sqlErr);
                        if (data.affectedRows == 1) {
                            tw(res, 200, '添加成功')
                        } else {
                            tw(res, 400, '添加失败')
                        }
                    })

                }
            })
        }
    })
})

//删除楼层导航
router.delete('/navigationDelFloor', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            let sql = `select id from navigationFloor where id = ${req.query.floorId}`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.length == 0) {
                    tw(res, 404, '数据不存在')
                } else {
                    let sql = `delete from navigationFloor where id = ${req.query.floorId}`
                    db.query(sql, (err, data) => {
                        if (err) return res.send(sqlErr);
                        if (data.affectedRows == 1) {
                            tw(res, 200, '删除成功')
                        } else {
                            tw(res, 400, '删除失败')
                        }
                    })
                }
            })
        }
    })
})

//删除楼层
router.delete('/navigationDel', (req, res) => {
    function del(id) {
        let sql = `delete from navigation where id = ${id}`
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr);
            if (data.affectedRows == 1) {
                tw(res, 200, '删除成功')
            } else {
                tw(res, 400, '删除失败')
            }
        })
    }
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            let sql = `select id from navigation where id = ${req.query.hosId}`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.length == 0) {
                    tw(res, 404, '数据不存在')
                } else {
                    let sql = `select id from navigationFloor where hosId = ${req.query.hosId}`
                    db.query(sql, (err, data) => {
                        if (err) return res.send(sqlErr);
                        if (data.length == 0) {
                            del(req.query.hosId)
                        } else {
                            if (req.query.mode == 'strict') {
                                let sql = `delete from navigationFloor where hosId = ${req.query.hosId}`
                                db.query(sql, (err, data) => {
                                    if (err) return res.send(sqlErr);
                                    del(req.query.hosId)
                                })

                            } else {
                                tw(res, 400, '请先清空楼层导航')
                            }
                        }
                    })
                }
            })
        }
    })
})

//修改医院导航
router.post('/navigationMod', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限操作')
        } else {
            if (!isEmptyStr(req.body.hosId)) return tw(res, 400, '请填写医院id')
            let sql = `select name,telephone,reco,address from navigation where id = ${req.body.hosId}`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.length == 0) {
                    tw(res, 404, '数据不存在')
                } else {
                    if (!req.body.name && !req.body.telephone && !req.body.reco && !req.body.address) return tw(res, 400, '请至少填写一项修改内容')
                    let name = req.body.name || data[0].name;
                    let telephone = req.body.telephone || data[0].telephone;
                    let reco = req.body.reco || data[0].reco;
                    let address = req.body.address || data[0].address;
                    let sql = `update navigation set name = '${name}',telephone = '${telephone}',reco = '${reco}',address = '${address}' where id = ${req.body.hosId}`
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
})


module.exports = router;