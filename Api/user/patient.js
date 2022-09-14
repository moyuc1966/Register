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

//就诊人添加数据合法验证中间件
const check = (req, res, next) => {
    let doctypeArr = ['身份证', '护照', '港澳通行证'];
    let relaArr = ['本人', '父母', '朋友', '夫妻', '子女'];
    if (req.body.name.length > 20) {
        tw(res, 400, '姓名过长');
    } else if (doctypeArr.indexOf(req.body.docType) == -1) {
        tw(res, 400, '证件类型错误');
    } else if (!/^\d+$/.test(req.body.card)) {
        tw(res, 400, '就诊卡号错误');
    } else if (relaArr.indexOf(req.body.relation) == -1) {
        tw(res, 400, '关系不合法');
    } else if (!/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(req.body.phone)) {
        tw(res, 400, '手机号不合法');
    } else if (req.body.isdefault != 1 && req.body.isdefault != 2) {
        tw(res, 400, '默认值不合法');
    } else {
        next();
    }
}

//添加就诊人接口
router.post('/patientAdd', check, (req, res) => {
    let sql = `select count(*) as count from patient where userId = ${req.auth.id}`;
    db.query(sql, (err, data) => {
        if(err) console.log(err)
        if (err) return res.send(sqlErr);
        if (data[0].count >= 5) {
            tw(res, 400, '就诊人数量超过5个');
        } else {
            let sql = `select name from patient where userId = ${req.auth.id} and name = '${req.body.name}'`;
            db.query(sql, (err, data) => {
                if(err) console.log(err)
                if (err) return res.send(sqlErr);
                if (data.length > 0) {
                    tw(res, 400, '该就诊人已存在');
                } else {
                    let sql = `select count(*) as def from patient where userId = userId = ${req.auth.id} and isdefault = 1`
                    db.query(sql, (err, data) => {
                        if(err) console.log(err)
                        if (err) return res.send(sqlErr);
                        if (data[0].def > 0  && req.body.isdefault == 1) {
                            tw(res, 400, '已有默认就诊人')
                        } else {
                            let address = req.body.address || ''
                            sql = `insert into patient (userId,name,docType,certificate,card,relation,phone,isdefault,balance,address) values
                            (${req.auth.id},'${req.body.name}','${req.body.docType}','${req.body.certificate}','${req.body.card}',
                            '${req.body.relation}','${req.body.phone}',${req.body.isdefault},0,'${address}')`;
                            db.query(sql, (err, data) => {
                                if(err) console.log(err)
                                if (err) return res.send(sqlErr);
                                if (data.affectedRows == 1) {
                                    tw(res, 200, '添加成功');
                                } else {
                                    tw(res, 400, '添加失败');
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})


//获取就诊人列表
router.get('/patientList', (req, res) => {
    let sql;
    if(req.query.def == 'yse'){
        sql = `select id,name,relation,card,balance,concat(substring(certificate, 1, 4),'*****',substring(certificate, -4, 4)) as certificate,
        isdefault from patient where userId = ${req.auth.id} and isdefault == 1` ;
    }else{
        sql = `select id,name,relation,card,balance,concat(substring(certificate, 1, 4),'*****',substring(certificate, -4, 4)) as certificate,
        isdefault from patient where userId = ${req.auth.id}`;
    }
    
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        res.send({ code: 200, msg: '获取成功', data: data })
    })
})

//获取就诊人信息详情
router.get('/patientInfo/:id', (req, res) => {
    if (!isEmptyStr(req.params.id)) {
        tw(res, 400, '请提交就诊人id')
    } else {
        let sql = `select name,relation,doctype,certificate,card,phone,address,isdefault,balance
    from patient where id = ${req.params.id}`;
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr);
            res.send({ code: 200, msg: '获取成功', data: data })
        })
    }
})

//删除指定就诊人
router.delete('/patientDel/:id', (req, res) => {
    if (!isEmptyStr(req.params.id)) {
        tw(res, 400, '请提交就诊人id')
    } else {
        let sql = `delete from patient where id = ${req.params.id}`;
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


//修改就诊人信息
router.put('/patientMod', (req, res) => {
    if (!isEmptyStr(req.body.id)) {
        tw(res, 400, '请提交就诊人id')
    } else if (!isEmptyStr(req.body.name) && !isEmptyStr(req.body.docType) && !isEmptyStr(req.body.certificate)
        && !isEmptyStr(req.body.card) && !isEmptyStr(req.body.relation) && !isEmptyStr(req.body.phone) && !isEmptyStr(req.body.address)) {
        tw(res, 400, '请提交修改信息')
    } else {
        let sql = `select * from patient where id = ${req.body.id}`;
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr);
            let name = req.body.name || data[0].name;
            let docType = req.body.docType || data[0].docType;
            let certificate = req.body.certificate || data[0].certificate;
            let card = req.body.card || data[0].card;
            let relation = req.body.relation || data[0].relation;
            let phone = req.body.phone || data[0].phone;
            let address = req.body.address || data[0].address;
            let doctypeArr = ['身份证', '护照', '港澳通行证'];
            let relaArr = ['本人', '父母', '朋友', '夫妻', '子女'];
            if (!doctypeArr.includes(docType)) return tw(res, 400, '请提交正确的证件类型');
            if (!relaArr.includes(relation)) return tw(res, 400, '请提交正确的关系');
            let sql = `update patient set name = '${name}',docType = '${docType}',certificate = '${certificate}',
            card = '${card}',relation = '${relation}',phone = '${phone}',address = '${address}' where id = ${req.body.id}`;
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 1) {
                    tw(res, 200, '修改成功');
                } else {
                    tw(res, 400, '修改失败');
                }
            })
        })
    }
})


//修改就诊人默认
router.post('/patientModDef', (req, res) => {
    if (!isEmptyStr(req.body.id)) {
        tw(res, 400, '请提交就诊人id')
    } else {
        let sql = `select id,isdefault from patient where id = ${req.body.id} and userId = ${req.auth.id}`;
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr)
            if (data.length == 0) {
                tw(res, 400, '该数据不存在')
            } else {
                let sql = `call patDefMod(${req.auth.id},${req.body.id})`;
                db.query(sql, (err, data) => {
                    if (err) return res.send(sqlErr)
                    if (data.affectedRows >= 1) {
                        tw(res, 200, '修改成功')
                    } else {
                        tw(res, 400, '修改失败')
                    }
                })
            }
        })
    }
})

//增加余额接口
router.put('/patient/pay', (req, res) => {
    if (!isEmptyStr(req.body.card) || !isEmptyStr(req.body.orderId) || !isEmptyStr(req.body.patId)) {
        tw(res, 400, '请提交完整信息')
    } else {
        let sql = `select balance from patient where id = ${req.body.patId}`;
        db.query(sql, (err, data) => {
            if (err) return res.send(sqlErr)
            if (data.length == 0) return tw(res, 400, '该数据不存在')
            let balancep = data[0].balance;
            let sql = `select auantity,balance from recorder where patId = ${req.body.patId} and orderId = '${req.body.orderId}'; `
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr)
                if (data.length == 0) return tw(res, 400, '订单未创建')
                let auantity = data[0].auantity;
                let balanceo = data[0].balance;
                if (balanceo != 0) return tw(res, 400, '订单已付款')
                let balance = balancep + auantity;
                let sql = `update recorder o,patient p set o.balance = ${balance} ,p.balance = ${balance} where
                 p.id = ${req.body.patId} and o.patId = ${req.body.patId} and o.orderId = '${req.body.orderId}';`
                db.query(sql, (err, data) => {
                    if (err) return res.send(sqlErr)
                    tw(res, 200, '充值成功')
                })
            })
        })
    }
})


module.exports = router;