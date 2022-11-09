const express = require('express');
const app = express();

//接口
//用户登录注册
app.use('/api', require('./loginReg/users.js'))

// 管理员注册登录
app.use('/api', require('./loginReg/admin.js'))

//用户重置密码
app.use('/api/seek', require('./loginReg/seek/retpass.js'))

//管理员信息修改
app.use('/modify', require('./loginReg/modify/admin.js'))

//用户信息部分
app.use('/owner', require('./user/user.js'))

//用户信息修改
app.use('/modify', require('./loginReg/modify/user.js'))

//前台获取信息类，不使用token，包含轮播图、文章
app.use('/api', require('./system/get.js'))
//后台系统信息管理类，需要使用token
app.use('/admin', require('./system/swiper.js')) //轮播图
app.use('/admin', require('./system/article.js')) //文章

//需要用户传入token的共用接口
app.use('/simple', require('./simple/simple.js'))

//用户数据管理
app.use('/admin', require('./admin/users.js')) //用户，就诊人
app.use('/admin', require('./system/navigation.js'))

//就诊人部分接口
app.use('/user', require('./user/patient.js'))

//用户反馈接口
app.use('/feedback', require('./user/feedback.js'))

//消息接口
app.use('/message', require('./admin/message.js'))

//订单类
app.use('/order', require('./order/order.js'))

//医院科室管理部分
app.use('/admin/dep', require('./admin/dep.js'))

//管理员医生管理预约部分
app.use('/make', require('./admin/make.js'))

//用户预约部分
app.use('/make', require('./user/userMake.js'))

//管理员医生排班部分
app.use('/arrange', require('./admin/arrange.js'))

//用户医生排班部分
app.use('/arrange', require('./user/userArrange.js'))

//管理员数据
app.use('/admin',require('./admin/administrators.js'))

//统计数据
app.use('/admin', require('./admin/Statistics.js'))
module.exports = app;