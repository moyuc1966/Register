//意见反馈部分接口
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

//用户提交反馈
router.post('/submit', (req, res) => {
    if (req.body.title.length > 30) return tw(res, 400, '标题超长');
    if (req.body.content.length > 150) return tw(res, 400, '内容超长');
    let typeArr = ['挂号相关', '缴费相关', '使用问题']
    if (!typeArr.includes(req.body.type)) return tw(res, 400, '类型错误');
    let email = req.body.email || '匿名';
    let phone = req.body.phone || '匿名';
    let time = formatDate(new Date().getTime());
    const sql = `INSERT INTO feedback (title,type,content,email,phone,time,username) VALUES 
    ('${req.body.title}','${req.body.type}','${req.body.content}','${email}','${phone}','${time}','${req.auth.username}')`;
    db.query(sql, (err, data) => {
        if (err) return tw(res, 500, '数据库错误');
        tw(res, 200, '提交成功');
    })
})

//用户获取自己提价的反馈
router.get('/my', (req, res) => {
    let sql = `select title,type,content,time,email,phone from feedback where username='${req.auth.username}'`;
    db.query(sql, (err, data) => {
        if (err) return tw(res, 500, '数据库错误');
        res.send({ code: 200, msg: '获取成功', data: data });
    })
})

module.exports = router;