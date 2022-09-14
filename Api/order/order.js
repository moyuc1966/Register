//就诊人部分接口
const express = require('express');
const router = express.Router();
const db = require('../link.js');

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

//订单号生成
function orderId(type) {
    const now = new Date()
    let month = now.getMonth() + 1
    let day = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let orderCode = type + month.toString() + hour + day + minutes + now.getFullYear().toString() + seconds + (Math.random().toFixed(4).slice(-4)).toString();
    return orderCode;
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


//余额充值订单生成接口
router.post('/patient/orderCreate', (req, res) => {
    if (!isEmptyStr(req.body.auantity) || !isEmptyStr(req.body.card) || !isEmptyStr(req.body.payType) || !isEmptyStr(req.body.patId) || req.body.auantity < 0) {
        tw(res, 400, '请提交完整信息')
    } else {
        let time = formatDate(new Date().getTime());
        //唯一订单号
        let theOrderId = orderId('CZ');
        let sql = `insert into recorder (orderId,patId,payType,card,auantity,time,patName,userId,balance) values
         ('${theOrderId}','${req.body.patId}','${req.body.payType}','${req.body.card}','${req.body.auantity}',
         '${time}',(select name from patient where id = ${req.body.patId}),'${req.auth.id}',0)`;
        db.query(sql, (err, data) => {
            if (err) {
                console.log('err', err.sqlMessage)
                tw(res, 500, '数据库错误')
            } else {
                if (data.affectedRows == 1) {
                    res.send({
                        code: 200,
                        msg: '订单创建成功',
                        orderId: theOrderId
                    })
                } else {
                    tw(res, 400, '订单生成失败')
                }
            }
        })
    }
})


//创建退款订单
router.post('/patient/refundSend', (req, res) => {
    console.log(req.body.patId,req.body.money)
    if (!isEmptyStr(req.body.patId) || !isEmptyStr(req.body.money)) return tw(res, 400, '请提交完整信息');
    let sql = `select * from patient where userId = ${req.auth.id} and id = ${req.body.patId}`;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 400, '患者不存在');
        if (req.body.money > data[0].balance) return tw(res, 403, '操作非法');
        let time = formatDate(new Date().getTime());
        let balance = data[0].balance - req.body.money;
        let theOrderId = orderId('TK');
        let sql = `insert into refund (time,orderId,name,card,balance,money,userId,patId,state) values
            ('${time}','${theOrderId}','${data[0].name}','${data[0].card}','${balance}','${req.body.money}',
            '${req.auth.id}','${req.body.patId}',0)`;
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr);
            if (data.affectedRows == 1) return res.send({ code: 200, msg: '提交申请成功', orderId: theOrderId });
            return tw(res, 400, '订单生成失败');
        })
    })
})


//用户获取充值订单列表
router.get('/userRecList', (req, res) => {
    let sql;
    if (isEmptyStr(req.query.patId)) {
        sql = `select * from recorder where userId = ${req.auth.id} and patId = ${req.query.patId}  order by time desc`;
        console.log('sql', sql)
    } else {
        sql = `select * from recorder where userId = ${req.auth.id} order by time desc`;
    }
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 204, '还没有充值订单');
        return res.send({ code: 200, msg: '获取成功', data: data });
    })
})


//用户获取充值订单详情
router.get('/userRecInf', (req, res) => {
    if (!isEmptyStr(req.query.orderId)) return tw(res, 204, '请提交订单号');
    let sql = `select * from recorder where orderId = '${req.query.orderId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 404, '数据不存在');
        return res.send({ code: 200, msg: '获取成功', data: data });
    })
})



//用户获取退款订单列表
router.get('/userRefundList', (req, res) => {
    let sql;
    if (isEmptyStr(req.query.patId)) {
        sql = `select * from refund where userId = ${req.auth.id} and patId = ${req.query.patId} order by time desc`;
    } else {
        sql = `select * from refund where userId = ${req.auth.id} order by time desc`;
    }
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 204, '您还没有退款订单');
        return res.send({ code: 200, msg: '获取成功', data: data });
    })
})


//用户获取退款订单详情
router.get('/userRefundInf', (req, res) => {
    if (!isEmptyStr(req.query.orderId)) return tw(res, 204, '请提交订单号');
    let sql = `select * from refund where orderId = '${req.query.orderId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 404, '数据不存在');
        return res.send({ code: 200, msg: '获取成功', data: data });
    })
});



//创建缴费订单
router.post('/patient/payCreate', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let sql = `select * from patient where id = ${req.body.patId}`;
            db.query(sql, (err, data) => {
                if (err || data.length == 0) return tw(res, 404, '患者不存在');
                let time = formatDate(new Date().getTime());
                let theOrderId = orderId('JF');
                let sql = `insert into payOrder (time,orderId,price,dep,type,patName,card,userId,patId,state) values
                    ('${time}','${theOrderId}',${req.body.price},'${req.body.dep}','${req.body.type}',
                    '${data[0].name}','${data[0].card}','${data[0].userId}','${req.body.patId}',0)`;
                db.query(sql, (err, data) => {
                    if (err) return res.send({ sqlErr, err });
                    if (data.affectedRows == 1) {
                        let sql = `insert into payOrderList (orderId,name,price,num,total) values`;
                        for (let i = 0; i < req.body.rows.length; i++) {
                            sql += `('${theOrderId}','${req.body.rows[i].name}',${req.body.rows[i].price},${req.body.rows[i].num},${req.body.rows[i].price * req.body.rows[i].num}),`;
                        }
                        sql = sql.substr(0, sql.length - 1)
                        db.query(sql, (err, data) => {
                            if (err) return res.send(sqlErr);
                            res.send({
                                code: 200,
                                msg: '提交成功',
                                orderId: theOrderId
                            })
                        })
                    } else {
                        tw(res, 400, '订单生成失败')
                    }
                })
            })
        }
    })
});


//用户获取缴费订单列表
router.get('/userPayOrder', (req, res) => {
    let sql;
    if (!isEmptyStr(req.query.patId) && !isEmptyStr(req.query.state)) {
        sql = `select * from payOrder where userId = ${req.auth.id} order by time desc`;
    } else if (!isEmptyStr(req.query.patId) && isEmptyStr(req.query.state)) {
        if (![0, 1, '0', '1'].includes(req.query.state)) return tw(res, 400, '状态错误');
        sql = `select * from payOrder where userId = ${req.auth.id} and state = ${req.query.state} order by time desc`;
    } else if (!isEmptyStr(req.query.state) && isEmptyStr(req.query.patId)) {
        sql = `select * from payOrder where userId = ${req.auth.id} and patId = ${req.query.patId}  order by time desc`;
    } else {
        if (![0, 1, '0', '1'].includes(req.query.state)) return tw(res, 400, '状态错误');
        sql = `select * from payOrder where userId = ${req.auth.id} and patId = ${req.query.patId} and state = ${req.query.state} order by time desc`;
    }
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 204, '还没有缴费订单');
        return res.send({ code: 200, msg: '获取成功', data: data });
    })
});

//用户获取缴费订单详情
router.get('/userPayOrderInf', (req, res) => {
    if (!isEmptyStr(req.query.orderId)) return tw(res, 204, '请提交订单号');
    let sql = `select * from payOrder where orderId = '${req.query.orderId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 404, '数据不存在');
        let sql = `select * from payOrderList where orderId = '${req.query.orderId}'`;
        db.query(sql, (err, resulter) => {
            if (err) return res.send(sqlErr);
            data[0].rows = resulter;
            return res.send({ code: 200, msg: '获取成功', data });
        })
    })
})


//用户支付待缴费订单
router.post('/paymentOrder', (req, res) => {
    if (!isEmptyStr(req.body.orderId)) return tw(res, 400, '请提交订单号');
    let sql = `select state,price,patId from payOrder where orderId = '${req.body.orderId}'`;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 404, '订单不存在');
        if (data[0].state == 1) return tw(res, 400, '订单已支付');
        let sql = `select balance from patient where id = ${data[0].patId}`
        db.query(sql, (err, resulte) => {
            if (err) return res.send(sqlErr);
            if (resulte[0].balance < data[0].price) return tw(res, 400, '余额不足');
            let sql = `update patient p,payOrder o set p.balance = p.balance - ${data[0].price},o.state = 1 where p.id = ${data[0].patId} and o.orderId = '${req.body.orderId}'`
            db.query(sql, (err, result) => {
                if (err) return res.send(sqlErr);
                tw(res, 200, '缴费成功')
            })
        })
    })
})

module.exports = router;