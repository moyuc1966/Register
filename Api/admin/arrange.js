//医生排班管理员部分
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

//医生排班添加
router.post('/admin/createArrange', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.doctorId) || !isEmptyStr(req.body.hosId) || !isEmptyStr(req.body.depTwoId) || !isEmptyStr(req.body.time))
                return tw(res, 403, '参数错误')
            let sql = `select * from arrange where doctorId = ${req.body.doctorId} and time = '${req.body.time}'`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if(data.length > 0) return tw(res,400,'请勿重复添加')
                let Mstate = isEmptyStr(req.body.Mstate) ? req.body.Mstate : 0;
                let Astate = isEmptyStr(req.body.Astate) ? req.body.Astate : 0;
                let Mnum = isEmptyStr(req.body.Mnum) ? req.body.Mnum : 10;
                let Anum = isEmptyStr(req.body.Anum) ? req.body.Anum : 10;
                let MtimeSegment, AtimeSegment;
                if (Mstate == 1) {
                    MtimeSegment = 0;
                } else {
                    MtimeSegment = req.body.MtimeSegment;
                }
                if (Astate == 1) {
                    AtimeSegment = 0;
                } else {
                    AtimeSegment = req.body.AtimeSegment;
                }
                //直接添加
                let sql = `insert into arrange (doctorName,doctorId,hosName,hosId,depName,depTwoId,time,MtimeSegment,Mnum,
                        Msurplus,Mstate,AtimeSegment,Anum,Asurplus,Astate) values 
                        ((select name from doctor where id = ${req.body.doctorId}),${req.body.doctorId},
                        (select name from depHospital where id=${req.body.hosId}),${req.body.hosId},
                        (select concat(o.name,'-',t.name) from depInclude t,depOwn o where t.id = ${req.body.depTwoId} and o.id = t.depId),${req.body.depTwoId},'${req.body.time}',
                        '${MtimeSegment}',${Mnum},${Mnum},${Mstate},'${AtimeSegment}',${Anum},${Anum},${Astate})`;
                db.query(sql, (err, data) => {
                    console.log('err', err)
                    if (err) return res.send(sqlErr);
                    tw(res, 200, '添加成功')
                })
            })
        }
    })
})


//编辑医生排班
router.post('/admin/modeArrange', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.id)) return tw(res, 400, '参数错误')
            let sql = `select * from arrange where id = ${req.body.id}`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.length == 0) return tw(res, 400, '没有该条数据')
                let Mstate = isEmptyStr(req.body.Mstate) ? req.body.Mstate : data[0].Mstate,
                    Astate = isEmptyStr(req.body.Astate) ? req.body.Astate : data[0].Astate,
                    Mnum = isEmptyStr(req.body.Mnum) ? req.body.Mnum : data[0].Mnum,
                    Anum = isEmptyStr(req.body.Anum) ? req.body.Anum : data[0].Anum,
                    MtimeSegment = isEmptyStr(req.body.MtimeSegment) ? req.body.MtimeSegment : data[0].MtimeSegment,
                    AtimeSegment = isEmptyStr(req.body.AtimeSegment) ? req.body.AtimeSegment : data[0].AtimeSegment,
                    Msurplus = isEmptyStr(req.body.Msurplus) ? req.body.Msurplus : data[0].Msurplus,
                    Asurplus = isEmptyStr(req.body.Asurplus) ? req.body.Asurplus : data[0].Asurplus;
                let sql = `update arrange  set MtimeSegment = '${MtimeSegment}',Mnum =${Mnum} ,Mstate=${Mstate},AtimeSegment='${AtimeSegment}',
                Anum=${Anum},Asurplus=${Asurplus},Astate=${Astate},Msurplus=${Msurplus} where id = ${req.body.id}`;
                db.query(sql, (err, data) => {
                    console.log('err', err)
                    if (err) return res.send(sqlErr);
                    if (data.affectedRows == 0) return tw(res, 400, '修改失败')
                    tw(res, 200, '修改成功')
                })
            })
        }
    })
})

//管理员获取排班列表
router.get('/admin/getList', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            let page = isEmptyStr(req.query.page) ? req.query.page : 1;
            let limit = isEmptyStr(req.query.limit) ? req.query.limit : 10;
            let dateArr = []
            if (req.query.week == 0) {
                dateArr = dateTool.PrevWeek()
            } else if (req.query.week == 2) {
                dateArr = dateTool.NextWeek()
            } else {
                dateArr = dateTool.CurrWeek()
            }
            let sql = `call getArrange('${dateArr[0]}',${(page - 1) * limit},${limit});`
            db.query(sql, (err, data) => {
                if (err) console.log(err)
                if (err) return res.send(sqlErr);
                let sql = `select count(distinct doctorId) as total from arrange where time between '${dateArr[0]}' and '${dateArr[1]}'`
                db.query(sql, (err, data2) => {
                    if (err) console.log(err)
                if (err) return res.send(sqlErr);
                    let result = {
                        code: 200,
                        msg: '获取成功',
                        count: data2[0].total,
                        data: data[0]
                    }
                    res.send(result)
                })
            })
        }
    })
})


//删除一条排班
router.delete('/admin/del', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.query.id)) return tw(res, 400, '参数不完整');
            let sql = `delete from arrange where id = ${req.query.id}`;
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 0) return tw(res, 400, '删除失败');
                tw(res, 200, '删除成功')
            })
        }
    })
})


//获取某医生一周内排班
router.get('/admin/weekArrange', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.query.doctorId)) return tw(res, 400, '参数不完整');
            let dateArr = []
            if (req.query.week == 0) {
                dateArr = dateTool.PrevWeek()
            } else if (req.query.week == 2) {
                dateArr = dateTool.NextWeek()
            } else {
                dateArr = dateTool.CurrWeek()
            }
            let sql = `call getArrangeById('${dateArr[0]}',${req.query.doctorId});`
            db.query(sql, (err, data) => {
                if (err) return res.send(sqlErr);
                let result = {
                    code: 200,
                    msg: '获取成功',
                    data: data[0]
                }
                res.send(result)
            })
        }
    })
})

module.exports = router;