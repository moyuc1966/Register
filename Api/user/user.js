//用户信息部分
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

router.get('/information', (req, res) => {
    const sql = `SELECT id,username,name,gender,age,email,phone,avatar,createTime,state FROM users where username = '${req.auth.username}'`;
    db.query(sql, (err, data) => {
        if (err) {
            tw(res, 500, '数据库错误');
        } else if (data.length == 0) {
            tw(res, 404, '数据不存在');
        } else {
            res.send({ code: 200, msg: '获取成功', data: data[0] })
        }
    })
})

module.exports = router;