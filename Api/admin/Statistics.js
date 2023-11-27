//统计数据
const express = require('express');
const router = express.Router();
const db = require('../link.js');


//获取最新五条预约记录
router.get('/statistics/latestReg', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let sql = `select id,name,phone,time,depName,price,type from make order by id desc limit 5`;
            db.query(sql, (err, data) => {
                if (err) return res.send({ code: 500, msg: '数据库错误' });
                if (data.length == 0) {
                    res.send({ code: 404, msg: '数据不存在' });
                } else {
                    res.send({ code: 200, msg: '获取成功', data });
                }
            })
        }
    })
})


//统计数据
router.get('/statistics', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let sql = 'call getStatistics();';
            db.query(sql, (err, data) => {
                if (err) return res.send({ code: 500, msg: '数据库错误' });
                //预约数量
                let sql = `select DATE_FORMAT(createTime,'%c月%e日') as date,count(id) as num from make group by datediff(createTime,now()) order by createTime asc limit 7;`
                db.query(sql, (err, data2) => {
                    if (err) return res.send({ code: 500, msg: '数据库错误' });
                    //充值数量
                    let sql = `select DATE_FORMAT(time,'%c月%e日') as date,sum(auantity) as money from recorder group by datediff(time,now()) order by time asc limit 7;`
                    db.query(sql, (err, data3) => {
                        if (err) return res.send({ code: 500, msg: '数据库错误' });
                        let sql = `select depName,count(*) as num from make group by depTwoId order by count(*) desc limit 5;`
                        db.query(sql, (err, data4) => {
                            if (err) return res.send({ code: 500, msg: '数据库错误' });
                            let sql = `select doctorName,count(*) as num from make group by doctorId order by count(*) desc limit 5;`
                            db.query(sql, (err, data5) => {
                                if (err) return res.send({ code: 500, msg: '数据库错误' });
                                res.send({
                                    code: 200, msg: '获取成功',
                                    "appointments": data[0][0].appointments,
                                    "refund": data[0][0].refund,
                                    "recharge": data[0][0].recharge,
                                    "outpatient": data[0][0].outpatient,
                                    "users": data[0][0].users,
                                    "makeList": data2,
                                    "rechargeList": data3,
                                    "hotDep": data4,
                                    "hotDoctor": data5
                                });
                            })
                        })
                    })
                })
            })
        }
    })
})


module.exports = router;
