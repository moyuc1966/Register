//用户预约部分
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


//用户提交预约
router.post('/createMake', (req, res) => {
    if (!isEmptyStr(req.body.patId) || !isEmptyStr(req.body.type) || !isEmptyStr(req.body.price) || !isEmptyStr(req.body.time) ||
        !isEmptyStr(req.body.datetime) || !isEmptyStr(req.body.depTwoId) || !isEmptyStr(req.body.hosName) || !isEmptyStr(req.body.doctorId)) return tw(res, 400, '参数错误')
    let time = formatDate(new Date().getTime());
    let remarks = req.body.remarks || '无';
    let sql = `insert into make (userId,patId,name,card,idCard,phone,type,price,state,time,datetime,createTime,depName,hosName,
        hosId,depId,depTwoId,doctorId,doctorName,position,remarks) values (${req.auth.id},${req.body.patId},(select name from patient where id = ${req.body.patId}),
        (select card from patient where id = ${req.body.patId}),(select certificate from patient where id = ${req.body.patId}),(select phone from patient where id = ${req.body.patId}),
        '${req.body.type}',${req.body.price},0,'${req.body.time}','${req.body.datetime}','${time}',(select concat(depName,'-',name) from depInclude where id = ${req.body.depTwoId}),
        '${req.body.hosName}',(select hosId from depInclude where id = ${req.body.depTwoId}),(select depId from depInclude where id = ${req.body.depTwoId}),${req.body.depTwoId},
        ${req.body.doctorId},(select name from doctor where id = ${req.body.doctorId}),(select position from doctor where id = ${req.body.doctorId}),'${remarks}')`;
    db.query(sql, (err, data) => {
        if(err) console.log(err)
        if (err) return res.send(sqlErr);
        if (data.affectedRows == 1) {
            //减少医生剩余量
            let map = {'上午':'Msurplus','下午':'Asurplus'}
            let sql = `update arrange set ${map[req.body.time.substr(req.body.time.length - 2)]} = (${map[req.body.time.substr(req.body.time.length - 2)]} - 1) where doctorId = ${req.body.doctorId} and time = '${req.body.time.substr(0,10)}'`
                    // console.log(sql)
            db.query(sql,(err,aset)=>{
                if(err) console.log(err)
                if(err) return res.send(sqlErr)
                if (aset.affectedRows == 1) {
                    let sql = `insert into message (userId, title, content, time,source,type,isread) values 
                    (${req.auth.id}, '预约挂号成功', '您已成功在${req.body.hosName}预约挂号，请于${req.body.time}准时就诊。', '${time}',(select id from make where createTime = '${time}' and patId = ${req.body.patId}),'预约成功',0)`;
                    db.query(sql, (err, data) => {
                        if(err) console.log(err)
                        if (err) return res.send(sqlErr)
                        if (data.affectedRows == 1) {
                            tw(res, 200, '预约成功');
                        } else {
                            tw(res, 204, '成功，消息发送失败');
                        }
                    })
                } else {
                    tw(res, 400, '出现错误');
                }
            })
            
        }else{
            tw(res, 500, '预约失败');
        }
    })
})

//用户取消预约
router.post('/cancelMake', (req, res) => {
    if (!isEmptyStr(req.body.id) || !isEmptyStr(req.body.remarks)) return tw(res, 400, '参数不完整')
    let sql = `select * from make where id = ${req.body.id} and userId = ${req.auth.id} `
    db.query(sql,(err,selt)=>{
        if(err) console.log(err)
        if(err) return res.send(sqlErr)
        let money = selt[0].price;
        let sql = `update make set state = 2,remarks= '${req.body.remarks}' where id = ${req.body.id}`
        db.query(sql, (err, data) => {
            if(err) console.log(err)
            if (err) return res.send(sqlErr);
            if (data.affectedRows == 1) {
                let time = formatDate(new Date().getTime());
                let sql = `insert into message (userId, title, content, time,source,type,isread) values 
                (${req.auth.id}, '预约挂号已取消', '您在${selt[0].hosName}预约于${selt[0].time}的挂号已成功取消', '${time}','系统通知','新消息',0)`;
                console.log(sql)
                db.query(sql, (err, data) => {
                    if(err) console.log(err)
                    if (err) return res.send(sqlErr)
                    if (data.affectedRows == 1) {
                        tw(res, 200, '取消成功');
                    } else {
                        tw(res, 204, '成功，消息发送失败');
                    }
                })
            }else{
                tw(res, 500, '取消失败');
            }
        })
    })
})


//用户获取预约列表
router.get('/userGetList', (req, res) => {
    let sql;
    let st = false;
    if (!isEmptyStr(req.query.id) && !isEmptyStr(req.query.state) && !isEmptyStr(req.query.patId)) {
        sql = `select * from make where userId = ${req.auth.id} order by createTime desc`;
    } else if (isEmptyStr(req.query.id)) {
        sql = `select * from make where id = ${req.query.id} and userId = ${req.auth.id} order by createTime desc`;
    } else if (isEmptyStr(req.query.state) && isEmptyStr(req.query.patId)) {
        sql = `select * from make where state = ${req.query.state} and userId = ${req.auth.id} and patId = ${req.query.patId} order by createTime desc`;
    } else if (isEmptyStr(req.query.state) && !isEmptyStr(req.query.patId)) {
        sql = `select * from make where state = ${req.query.state} and userId = ${req.auth.id} order by createTime desc`;
    } else if (!isEmptyStr(req.query.state) && isEmptyStr(req.query.patId)) {
        sql = `select * from make where  userId = ${req.auth.id} and patId = ${req.query.patId} order by createTime desc`;
    } else {
        st = true;
    }
    if (st) return tw(res, 400, '参数错误')
    db.query(sql, (err, data) => {
        console.log('sql', sql)
        if (err) return res.send(sqlErr);
        res.send({ code: 200, msg: '获取成功', rows: data });
    })
})

//获取预约详情
router.get('/getMakeInf', (req, res) => {
    if (!isEmptyStr(req.query.id)) return tw(res, 400, '参数错误');
    let sql = `select * from make where id = ${req.query.id}`;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        res.send({ code: 200, msg: '获取成功', rows: data });
    })
})

//获取医生名下预约列表
router.get('/doctorMake', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let state = isEmptyStr(req.query.state) ? ` and state = ${req.query.state}` : '';
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            const sql = `SELECT * FROM make where doctorId = '${req.query.doctorId}' ${state} order by createTime desc LIMIT ${(page - 1) * limit} , ${limit}`;
            db.query(sql, (err, data) => {
                if (err) {
                    tw(res, 500, '数据库错误');
                } else {
                    let sql = `select count(*) as total from make where doctorId = '${req.query.doctorId}' ${state}`;
                    db.query(sql, (err, data2) => {
                        if (err) {
                            tw(res, 500, '数据库错误');
                        } else {
                            res.send({ code: 200, msg: '获取成功', count: data2[0].total, data: data })
                        }
                    })
                }
            })
        }
    })
})
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
//完成预约
router.put('/endMake', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.id)) return tw(res, 400, '参数错误')
            let sql = `select p.balance,m.state,m.price,m.patId,m.userId,m.depName,m.name,m.card from make m,patient p where m.id = ${req.body.id} and p.id = m.patId;`;
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr)
                if (data[0].state != 0) return tw(res, 400, '此订单不可处理');
                if (data[0].balance < data[0].price) {
                    //余额不足
                    let time = formatDate(new Date().getTime());
                    let theOrderId = orderId('JF');
                    let sql = `insert into payOrder (time,orderId,price,type,dep,patName,card,userId,patId,state) values('${time}','${theOrderId}',${data[0].price},'挂号费',
                    '${data[0].depName}','${data[0].name}','${data[0].card}','${data[0].userId}','${data[0].patId}',0)`;
                    db.query(sql, (err, data2) => {
                        if (err) return res.send(sqlErr);
                        if (data2.affectedRows == 0) return tw(res, 400, '操作失败')
                        
                        let sql = `insert into payOrderList (orderId,name,price,num,total) values ('${theOrderId}','挂号费',${data[0].price},1,${data[0].price})`;
                        db.query(sql,(err,data3)=>{
                            if (err) console.log(err)
                            if (err) return res.send(sqlErr);
                            
                                let sql = `update make  set state = 1 where id = ${req.body.id}`;
                                db.query(sql, (err, data3) => {
                                    if (err) return res.send(sqlErr);
                                    if (data3.affectedRows == 0) return tw(res, 204, '已完成，缴费订单创建失败')
                                    res.send({ code: 202, msg: '已完成，余额不足，以创建缴费订单' })
                                })
                        })
                        
                    })
                } else {
                    let sql = `update make m,patient p set m.state = 1,p.balance = p.balance - ${data[0].price} where m.id = ${req.body.id} and p.id = ${data[0].patId}`;
                    db.query(sql, (err, data) => {
                        if (err) return res.send(sqlErr);
                        if (data.affectedRows == 0) return tw(res, 400, '操作失败')
                        else tw(res, 200, '已完成，扣款成功')
                    })
                }
            })
        }
    })
})


module.exports = router;