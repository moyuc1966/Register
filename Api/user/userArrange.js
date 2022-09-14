//医生排班用户部分
const express = require('express');
const router = express.Router();
const db = require('../link.js');
const dateTool = require('../tool/DateTool.js')

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


//通过日期获取医生列表
router.get('/fromTime', (req, res) => {
    if (!isEmptyStr(req.query.time) || !isEmptyStr(req.query.depTwoId)) return tw(res, 400, '参数不完整');
    let sql = `select * from doctor where id in (select doctorId from arrange where time = '${req.query.time}' and depTwoId = ${req.query.depTwoId} and (if(Mstate = Astate and Mstate = 1,false,true))) and state != 0`;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        res.send({ code: 200, msg: "获取成功", data });
    })
})

//获取当天此医生可预约列表
router.get('/fromDoctor', (req, res) => {
    if (!isEmptyStr(req.query.time) || !isEmptyStr(req.query.doctorId)) return tw(res, 400, '参数不完整');
    let sql = `select * from doctor where id = ${req.query.doctorId} and state != 0`;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) return tw(res, 204, '没有此数据');
        let sql = `select * from arrange where doctorId = ${req.query.doctorId} and time = '${req.query.time}' and (if(Mstate = Astate and Mstate = 1,false,true))`;
        db.query(sql, (err, data1) => {
            if (err) return res.send(sqlErr);
            if (data1.length == 0) return tw(res, 204, '没有可预约的时间');
            data[0].rows = data1;
            res.send({
                code: 200,
                msg: '获取成功',
                data
            })
        })
    })
})


//获取此科室医生推荐
router.get('/redDoctor', (req, res) => {
    if (!isEmptyStr(req.query.doctorId) || !isEmptyStr(req.query.depTwoId)) return tw(res, 400, '参数不完整');
    let sql = `select * from doctor where id in (select doctorId from arrange where depTwoId = ${req.query.depTwoId} and (if(Mstate = Astate and Mstate = 1,false,true))) and state != 0 and id != ${req.query.doctorId} LIMIT 0,5 `;
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        res.send({ code: 200, msg: "获取成功", data });
    })
})

module.exports = router;