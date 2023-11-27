//医院科室管理员部分接口
const express = require('express');
const router = express.Router();
const db = require('../link.js');;
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

//文件上传中间件
const uploadFun = (req, res, next) => {
    let storage = multer.diskStorage({
        //指定保存位置
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../', '/images/doctor'))
        },
        //指定保存文件名
        filename: (req, file, cb) => {
            //处理保存文件名
            let extname = path.extname(file.originalname);
            filename = file.fieldname + "-" + Date.now() + extname;
            cb(null, filename);
        }
    })

    let limits = {
        //设置上传数量，大小
        files: 1,
        fileSize: 1024 * 1024 * 5 // 5MB
    }
    const upload = multer({
        storage: storage,
        //限制文件大小
        limits: limits,
        fileFilter: function (req, file, cb) {
            // 限制文件上传类型，仅可上传png格式图片
            if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
                cb(null, true)
            } else {
                cb(null, false) //不接受文件，此时会直接跳过此文件，如果不抛出异常，之后会无法得到req.file
                let err = new Error();
                //抛出错误
                err.code = 'LIMIT_FILE_TYPES';
                cb(err)
            }
        }
    }).single('photo');
    upload(req, res, (err) => {
        if (err) {
            if (err.code == 'LIMIT_FILE_SIZE') {
                res.send({
                    code: '500',
                    msg: '上传失败，文件过大',
                })
            } else if (err.code == 'LIMIT_FILE_TYPES') {
                res.send({
                    code: '500',
                    msg: '文件类型不合法',
                })

            } else {
                console.log(err);
                res.send({
                    code: '500',
                    msg: '服务器错误'
                })
            }
        } else {
            //将文件名单独拿出来
            req.filename = req.file.filename
            next()
        }
    })
}

function isEmptyStr(s) {
    if (s == null || s === '') {
        return false
    }
    return true
}

//添加医院
router.post('/addHospital', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!req.body.name || !req.body.minname) return tw(res, 500, '参数错误');
            let sql = `insert into depHospital(name,minname) values('${req.body.name}','${req.body.minname}')`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                if (data.affectedRows == 0) return tw(res, 404, '添加失败');
                tw(res, 200, '添加成功');
            })
        }
    })
});

//开启或关闭医院
router.put('/switchHospital', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.id) || !isEmptyStr(req.body.state) || ![0, 1, '1', '0'].includes(req.body.state)) return tw(res, 500, '参数错误');
            let sql = `update depHospital set state = ${req.body.state} where id = ${req.body.id}`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                if (data.affectedRows == 0) return tw(res, 404, req.body.state == '1' ? '开启失败' : '关闭失败');
                tw(res, 200, req.body.state == '1' ? '开启成功' : '关闭成功');
            })
        }
    })
})

//删除医院
router.delete('/delHospital', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.query.id)) return tw(res, 500, '参数错误');
            if (req.query.isStrict == 'strict') {
                //严格模式
                let sql = `select id from depOwn where hosId = ${req.query.id}`;
                db.query(sql, (err, data) => {
                    if (err) return tw(res, 500, '数据库错误');
                    if (data.length == 0) return tw(res, 404, '删除失败');
                    let sql = `delete o,i,d from depOwn o,depInclude i,doctor d where o.hosId = ${req.query.id} and i.hosId = ${req.query.id} 
                    and d.hosId = ${req.query.id}`;
                    db.query(sql, (err, data) => {
                        if(err) console.log('err', err)
                        if (err) return tw(res, 500, '数据库错误');
                        if (data.affectedRows == 0) return tw(res, 404, '一级科室删除失败');
                        let sql = `delete from depHospital where id = ${req.query.id}`;
                        db.query(sql, (err, data) => {
                            if(err) console.log('err', err)
                            if (err) return tw(res, 500, '数据库错误');
                            if (data.affectedRows == 0) return tw(res, 404, '医院删除失败');
                            tw(res, 200, '删除成功');
                        })
                    })
                })
            } else {
                //普通模式
                let sql = `select id from depOwn where hosId = ${req.query.id}`;
                db.query(sql, (err, data) => {
                    if (err) return tw(res, 500, '数据库错误');
                    if (data.length != 0) return tw(res, 204, '该医院下有科室，不能删除');
                    let sql = `delete from depHospital where id = ${req.query.id}`;
                    db.query(sql, (err, data) => {
                        if (err) return tw(res, 500, '数据库错误');
                        if (data.affectedRows == 0) return tw(res, 404, '删除失败');
                        tw(res, 200, '删除成功');
                    })
                })
            }
        }
    })
})

//添加一级科室
router.post('/addDepOne', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.name) || !isEmptyStr(req.body.hosId)) return tw(res, 500, '参数错误');
            let sql = `insert into depOwn(name,hosId) values('${req.body.name}','${req.body.hosId}')`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                if (data.affectedRows == 0) return tw(res, 404, '添加失败');
                tw(res, 200, '添加成功');
            })
        }
    })
});

//开启或关闭一级科室
router.put('/switchDepOne', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.id) || !isEmptyStr(req.body.state) || ![0, 1, '1', '0'].includes(req.body.state)) return tw(res, 500, '参数错误');
            let sql = `update depOwn set state = ${req.body.state} where id = ${req.body.id}`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                if (data.affectedRows == 0) return tw(res, 404, req.body.state == '1' ? '开启失败' : '关闭失败');
                tw(res, 200, req.body.state == '1' ? '开启成功' : '关闭成功');
            })
        }
    })
})

//删除一级科室
router.delete('/delDepOne', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.query.id)) return tw(res, 500, '参数错误');
            if (req.query.isStrict == 'strict') {
                //严格模式
                let sql = `select id from depInclude where depId = ${req.query.id}`;
                db.query(sql, (err, data) => {
                    if (err) return tw(res, 500, '数据库错误');
                    if (data.length == 0) return tw(res, 404, '删除失败');
                    let sql = `delete o,i,d from depOwn o,depInclude i,doctor d where o.id = ${req.query.id} and i.depId = ${req.query.id}
                    and d.depId = ${req.query.id}`;
                    db.query(sql, (err, data) => {
                        console.log('err', err)
                        if (err) return tw(res, 500, '数据库错误');
                        if (data.affectedRows == 0) return tw(res, 404, '删除失败');
                        tw(res, 200, '删除成功');
                    })
                })
            } else {
                //普通模式
                let sql = `select id from depInclude where depId = ${req.query.id}`;
                db.query(sql, (err, data) => {
                    if (err) return tw(res, 500, '数据库错误');
                    if (data.length != 0) return tw(res, 204, '该科室下有内容，不能删除');
                    let sql = `delete from depOwn where id = ${req.query.id}`;
                    db.query(sql, (err, data) => {
                        if (err) return tw(res, 500, '数据库错误');
                        if (data.affectedRows == 0) return tw(res, 404, '删除失败');
                        tw(res, 200, '删除成功');
                    })
                })
            }
        }
    })
})

//添加二级科室
router.post('/addDepTwo', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.name) || !isEmptyStr(req.body.depId)) return tw(res, 500, '参数错误');
            let sql = `insert into depInclude(name,depId,address,depName,hosId) values('${req.body.name}',
            '${req.body.depId}','${req.body.address}',(select name from depOwn where id = '${req.body.depId}'),
            (select hosId from depOwn where id = '${req.body.depId}'))`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                if (data.affectedRows == 0) return tw(res, 404, '添加失败');
                tw(res, 200, '添加成功');
            })
        }
    })
});

//开启或关闭二级科室
router.put('/switchDepTwo', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.id) || !isEmptyStr(req.body.state) || ![0, 1, '1', '0'].includes(req.body.state)) return tw(res, 500, '参数错误');
            let sql = `update depInclude set state = ${req.body.state} where id = ${req.body.id}`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                if (data.affectedRows == 0) return tw(res, 404, req.body.state ? '开启失败' : '关闭失败');
                tw(res, 200, req.body.state ? '开启成功' : '关闭成功');
            })
        }
    })
})

//删除二级科室
router.delete('/delDepTwo', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.query.id)) return tw(res, 500, '参数错误');
            if (req.query.isStrict == 'strict') {
                //严格模式
                let sql = `delete i,d from depInclude i,doctor d where o.id = ${req.query.id} and i.depTwoId = ${req.query.id}
                    and d.depId = ${req.query.id}`;
                db.query(sql, (err, data) => {
                    console.log('err', err)
                    if (err) return tw(res, 500, '数据库错误');
                    if (data.affectedRows == 0) return tw(res, 404, '删除失败');
                    tw(res, 200, '删除成功');
                })
            } else {
                let sql = `select id from doctor where depTwoId = ${req.query.id}`;
                db.query(sql, (err, data) => {
                    if (err) return tw(res, 500, '数据库错误');
                    if (data.length != 0) return tw(res, 404, '该科室下有内容，不能删除');
                    let sql = `delete from depInclude where id = ${req.query.id}`;
                    db.query(sql, (err, data) => {
                        if (err) return tw(res, 500, '数据库错误');
                        if (data.affectedRows == 0) return tw(res, 404, '删除失败');
                        tw(res, 200, '删除成功');
                    })
                })
            }
        }
    })
})


//添加医生
router.post('/addDoctor', uploadFun, (req, res) => {
    if (!isEmptyStr(req.body.name) || !isEmptyStr(req.body.hosId) || !isEmptyStr(req.body.depId) ||
        !isEmptyStr(req.body.depTwoId) || !isEmptyStr(req.body.position) || !isEmptyStr(req.body.reg) ||
        !isEmptyStr(req.body.brief)) return tw(res, 500, '参数错误');
    if (!['主治医师', '主任医师', '副主任医师'].includes(req.body.position)) return tw(res, 500, '职称错误');
    let sql = `insert into doctor(name,hosId,depId,depTwoId,position,reg,brief,photo,dia) values('${req.body.name}',
    '${req.body.hosId}','${req.body.depId}','${req.body.depTwoId}','${req.body.position}','${req.body.reg}',
    '${req.body.brief}','${'/images/doctor/' + req.filename}','${req.body.dia}')`;
    db.query(sql, (err, data) => {
        if(err) console.log(err)
        if (err) return tw(res, 500, '数据库错误');
        if (data.affectedRows == 0) return tw(res, 400, '添加失败');
        tw(res, 200, '添加成功');
    })
})


//删除医生
router.delete('/delDoctor', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.query.id)) return tw(res, 500, '参数错误');
            let sql = `delete from doctor where id = ${req.query.id}`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                if (data.affectedRows == 0) return tw(res, 404, '删除失败');
                tw(res, 200, '删除成功');
            })
        }
    })
})

//开启或关闭医生
router.put('/switchDoctor', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.id) || !isEmptyStr(req.body.state) || ![0, 1, '1', '0'].includes(req.body.state)) return tw(res, 500, '参数错误');
            let sql = `update doctor set state = ${req.body.state} where id = ${req.body.id}`;
            db.query(sql, (err, data) => {
                if (err) return tw(res, 500, '数据库错误');
                if (data.affectedRows == 0) return tw(res, 404, req.body.state ? '开启失败' : '关闭失败');
                tw(res, 200, req.body.state ? '开启成功' : '关闭成功');
            })
        }
    })
})

//修改医院信息
router.post('/moddepHos', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.minname) && !isEmptyStr(req.body.name)) return tw(res, 500, '参数错误');
            let sql = `select * from depHospital where id = ${req.body.hosId}`;
            db.query(sql, (err, data) => {
                if (err) console.log(err)
                if (err) return res.send(sqlErr);
                if (data.length == 0) return tw(res, 404, '该医院不存在');
                let minname = req.body.minname || data[0].minname;
                let name = req.body.name || data[0].name
                sql = `update depHospital set minname = '${minname}' , name = '${name}' where id = ${req.body.hosId}`;
                db.query(sql, (err, data) => {
                    if (err) console.log(err)
                    if (err) return res.send(sqlErr);
                    if (data.affectedRows == 0) return tw(res, 400, '修改失败');
                    tw(res, 200, '修改成功');
                })
            })

        }
    })
})

//修改一级科室信息
router.post('/moddepOne', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.name) && !isEmptyStr(req.body.depId)) return tw(res, 500, '参数错误');
            sql = `update depOwn set name = '${req.body.name}' where id = ${req.body.depId}`;
            db.query(sql, (err, data) => {
                if (err) console.log(err)
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 0) return tw(res, 400, '修改失败');
                tw(res, 200, '修改成功');
            })
        }
    })
})


//修改二级科室信息
router.post('/moddepTwo', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.name) && !isEmptyStr(req.body.address) && !isEmptyStr(req.body.depTwoId)) return tw(res, 500, '参数错误');
            let sql = `select * from depInclude where id = ${req.body.depTwoId}`;
            db.query(sql, (err, data) => {
                if (err) console.log(err)
                if (err) return res.send(sqlErr);
                if (data.length == 0) return tw(res, 404, '该二级科室不存在');
                let address = req.body.address || data[0].address;
                let name = req.body.name || data[0].name
                sql = `update depInclude set address = '${address}' , name = '${name}' where id = ${req.body.depTwoId}`;
                db.query(sql, (err, data) => {
                    if (err) console.log(err)
                    if (err) return res.send(sqlErr);
                    if (data.affectedRows == 0) return tw(res, 400, '修改失败');
                    tw(res, 200, '修改成功');
                })
            })

        }
    })
})


//修改医生信息
router.post('/moddepDoc', (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.name) && !isEmptyStr(req.body.position) && !isEmptyStr(req.body.reg) && !isEmptyStr(req.body.dia) && !isEmptyStr(req.body.brief))
                return tw(res, 500, '参数错误');
            let sql = `select * from doctor where id = ${req.body.doctorId}`;
            db.query(sql, (err, data) => {
                if (err) console.log(err)
                if (err) return res.send(sqlErr);
                if (data.length == 0) return tw(res, 404, '该医生不存在');
                let position = req.body.position || data[0].position;
                let name = req.body.name || data[0].name;
                let reg = req.body.reg || data[0].reg;
                let dia = req.body.dia || data[0].dia;
                let brief = req.body.brief || data[0].brief;
                sql = `update doctor set position = '${position}' , name = '${name}',reg= ${reg},dia=${dia},brief = '${brief}' where id = ${req.body.doctorId}`;
                db.query(sql, (err, data) => {
                    if (err) console.log(err)
                    if (err) return res.send(sqlErr);
                    if (data.affectedRows == 0) return tw(res, 400, '修改失败');
                    tw(res, 200, '修改成功');
                })
            })

        }
    })
})

//修改医生头像
router.post('/moddepDocImg', uploadFun, (req, res) => {
    let sql = `select id from admin where id = ${req.auth.id} and username = '${req.auth.username}'`
    db.query(sql, (err, data) => {
        if (err) return res.send(sqlErr);
        if (data.length == 0) {
            tw(res, 403, '您没有权限')
        } else {
            if (!isEmptyStr(req.body.doctorId)) return tw(res, 500, '参数不完整');
            let sql = `update doctor set photo = '${'/images/doctor/' + req.filename}' where id = ${req.body.doctorId}`;
            db.query(sql, (err, data) => {
                if (err) console.log(err)
                if (err) return res.send(sqlErr);
                if (data.affectedRows == 0) return tw(res, 400, '修改失败');
                res.send({
                    code: 200,
                    msg: '修改成功',
                    photo: '/images/doctor/' + req.filename
                })
            })
        }
    })
})


module.exports = router;