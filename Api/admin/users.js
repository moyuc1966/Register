// 用户数据管理
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

//获取用户列表
router.get('/users', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql;
            if(req.query.ison == 'is'){
                sql = `select * from users`
            }else{
                 sql = `select * from users LIMIT ${(page - 1) * limit} , ${limit};`
            }
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                let sql = `select count(*) as count from users`;
                db.query(sql, (err, data1) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data1[0].count,
                        data
                    })
                })
            })
        }
    })
})

//删除用户
router.delete('/usersDel', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let sql = `delete from users where id = ${req.query.userId}`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 1) {
                    res.send({
                        code: 200,
                        msg: '删除成功'
                    })
                } else {
                    res.send({
                        code: 400,
                        msg: '删除失败'
                    })
                }
            })
        }
    })
})

//封禁用户
router.post('/usersFrozen', (req, res) => {
    if (!isEmptyStr(req.body.userId)) {
        tw(req, 400, '请确认需操作用户id')
    } else if (req.body.state == 0 || req.body.state == 1) {
        let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr);
            if (data.length == 0) {
                tw(res, 403, '您没有权限')
            } else {
                let sql = `update users set state = ${req.body.state} where id = ${req.body.userId}`
                db.query(sql, (err, data) => {
                    if (err) return res.send(sqlErr);
                    if (data.affectedRows == 1) {
                        res.send({
                            code: 200,
                            msg: '操作成功'
                        })
                    } else {
                        res.send({
                            code: 400,
                            msg: '操作失败'
                        })
                    }
                })
            }
        })
    } else {
        tw(res, 400, '请确认封禁状态')
    }
})

//管理员获取用户信息
router.get('/userInf', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            const sql = `SELECT id,username,name,gender,age,email,phone,avatar,createTime,state 
            FROM users where id = '${req.query.userId}'`;
            db.query(sql, (err, data) => {
                if (err) {
                    tw(res, 500, '数据库错误');
                } else if (data.length == 0) {
                    tw(res, 404, '数据不存在');
                } else {
                    res.send({ code: 200, msg: '获取成功', data: data[0] })
                }
            })
        }
    })
})



//管理员搜索用户
router.get('/userQuery/:id', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql;
            let sql2;
            if (isEmptyStr(req.query.state)) {
                sql = `select id,username,name,gender,age,email,phone,avatar,createTime,state from users where state = 0 LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from users where state = 0`
            } else {
                sql = `select id,username,name,gender,age,email,phone,avatar,createTime,state from users where username = '${req.params.id}' or id = '${req.params.id}'
                or name = '${req.params.id}' or phone = '${req.params.id}' or email = '${req.params.id}' 
                LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) count from users where username = '${req.params.id}' or id = '${req.params.id}'
                or name = '${req.params.id}' or phone = '${req.params.id}' or email = '${req.params.id}'`
            }
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                db.query(sql2, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].count,
                        data
                    })
                })
            })
        }
    })
})


//管理员获取就诊人列表
router.get('/patientList', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql = `select * from patient LIMIT ${(page - 1) * limit} , ${limit};`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                let sql = `select count(*) as count from patient`
                db.query(sql, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].count,
                        data
                    })
                })
            })
        }
    })
})


//管理员搜索就诊人
router.get('/patientQuery/:id', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql, sql2;
            if (isEmptyStr(req.query.userId)) {
                sql = `select * from patient where userId = ${req.query.userId}`
                sql2 = `select count(*) as count from patient where userId = ${req.query.userId}`
            } else {
                sql = `select * from patient where name = '${req.params.id}' or id = '${req.params.id}'
                or card = '${req.params.id}' or phone = '${req.params.id}' or certificate = '${req.params.id}' 
                LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) count from patient where name = '${req.params.id}' or id = '${req.params.id}'
                or card = '${req.params.id}' or phone = '${req.params.id}' or certificate = '${req.params.id}'`
            }
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                db.query(sql2, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].count,
                        data
                    })
                })
            })
        }
    })
})

//获取反馈列表
router.get('/feedbackList', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql = `select * from feedback LIMIT ${(page - 1) * limit} , ${limit};`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                let sql = `select count(*) as count from feedback`
                db.query(sql, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].count,
                        data
                    })
                })
            })
        }
    })
})


//搜索反馈
router.get('/feedbackQuery', (req, res) => {
    if (!isEmptyStr(req.query.type) && !isEmptyStr(req.query.user)) return tw(res, 400, '请输入搜索条件')
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql, sql2;
            if (isEmptyStr(req.query.type)) {
                sql = `select * from feedback where type = '${req.query.type}' LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from feedback where type = '${req.query.type}'`
            } else {
                sql = `select * from feedback where username = '${req.query.user}' Limit ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from feedback where username = '${req.query.user}'`
            }
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                db.query(sql2, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].count,
                        data
                    })
                })
            })
        }
    })
})

//删除反馈
router.delete('/messageDel/:id', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.params.id)) tw(res, 400, '请选择需删除的反馈');
            let sql = `delete from feedback where id = ${req.params.id}`;
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 1) {
                    tw(res, 200, '删除成功');
                } else {
                    tw(res, 400, '删除失败');
                }
            })
        }
    })
});



//处理用户提交的退款申请
router.post('/refundHandle', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.patId) || !isEmptyStr(req.body.userId) || !isEmptyStr(req.body.orderId) || ![1, 2, '1', '2'].includes(req.body.state)) return tw(res, 400, '请提交完整参数');
            if (req.body.state == 1) {
                let sql = `update refund set state = 1 where orderId = '${req.body.orderId}'`
                db.query(sql, (err, data) => {
                    if (err) return res.send(sqlErr);
                    if (data.affectedRows == 1) {
                        tw(res, 200, '退款成功');
                    } else {
                        tw(res, 400, '退款失败');
                    }
                })
            } else {
                if(!isEmptyStr(req.body.reason)) return tw(res,400,'请提交驳回原因')
                let sql = `update refund set state = 2 where orderId = '${req.body.orderId}'`
                db.query(sql, (err, data) => {
                    if (err) return res.send(sqlErr);
                    if (data.affectedRows == 1) {
                        tw(res, 200, '驳回成功');
                    } else {
                        tw(res, 400, '驳回失败');
                    }
                })
            }
        }
    })
});


//获取充值订单列表以及搜索
router.get('/recOrderList', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql, sql2;
            if (!isEmptyStr(req.query.userId) && !isEmptyStr(req.query.patId) && !isEmptyStr(req.query.orderId)) {
                sql = `select * from recorder order by time desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from recorder;`
            } else if (isEmptyStr(req.query.userId)) {
                sql = `select * from recorder where userId = '${req.query.userId}' order by time desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from recorder where userId = '${req.query.userId}';`
            } else if (isEmptyStr(req.query.patId)) {
                sql = `select * from recorder where patId = '${req.query.patId}' order by time desc Limit ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from recorder where patId = '${req.query.patId}';`
            } else {
                sql = `select * from recorder where orderId = '${req.query.orderId}'`
                sql2 = `select count(*) as count from recorder where orderId = '${req.query.orderId}';`
            }
            db.query(sql, (err, data) => {
                if(err) console.log(err)
                if (err) return res.send(sqlErr);
                db.query(sql2, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].count,
                        data
                    })
                })
            })
        }
    })
})


//获取退款订单列表以及搜索
router.get('/refundOrderList', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql, sql2;
            if (!isEmptyStr(req.query.userId) && !isEmptyStr(req.query.patId) && !isEmptyStr(req.query.orderId)) {
                sql = `select * from refund order by time desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from refund;`
            } else if (isEmptyStr(req.query.userId)) {
                sql = `select * from refund where userId = '${req.query.userId}' order by time desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from refund where userId = '${req.query.userId}';`
            } else if (isEmptyStr(req.query.patId)) {
                sql = `select * from refund where patId = '${req.query.patId}' order by time desc Limit ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from refund where patId = '${req.query.patId}';`
            } else {
                sql = `select * from refund where orderId = '${req.query.orderId}'`
                sql2 = `select count(*) as count from refund where orderId = '${req.query.orderId}';`
            }
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                db.query(sql2, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].count,
                        data
                    })
                })
            })
        }
    })
})


//获取缴费订单列表以及搜索
router.get('/payOrderList', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sql, sql2;
            if (!isEmptyStr(req.query.userId) && !isEmptyStr(req.query.patId) && !isEmptyStr(req.query.orderId)) {
                sql = `select * from payOrder order by time desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from payOrder;`
            } else if (isEmptyStr(req.query.userId)) {
                sql = `select * from payOrder where userId = '${req.query.userId}' order by time desc LIMIT ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from payOrder where userId = '${req.query.userId}';`
            } else if (isEmptyStr(req.query.patId)) {
                sql = `select * from payOrder where patId = '${req.query.patId}' order by time desc Limit ${(page - 1) * limit} , ${limit};`
                sql2 = `select count(*) as count from payOrder where patId = '${req.query.patId}';`
            } else {
                sql = `select * from payOrder where orderId = '${req.query.orderId}'`
                sql2 = `select count(*) as count from payOrder where orderId = '${req.query.orderId}';`
            }
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                db.query(sql2, (err, data2) => {
                    if (err) return res.send(sqlErr);
                    res.send({
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].count,
                        data
                    })
                })
            })
        }
    })
})





module.exports = router;