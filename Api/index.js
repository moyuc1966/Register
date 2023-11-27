const express = require('express');
var https = require('https');
const fs = require('fs');
const cors = require('cors');
const app = express();
var { expressjwt } = require("express-jwt");
//配置跨域
app.use(cors())

/*
let privateKey = fs.readFileSync('./ssl/api.ntvuts.cn.key');
let certificate = fs.readFileSync('./ssl/api.ntvuts.cn_bundle.pem')
//配置https
var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials, app);
*/

//开启token鉴权
app.use(expressjwt({ secret: "moyc^-^", algorithms: ["HS256"] }).unless({
    path: [/\/api\//, /\/images\//]
}))

//托管静态资源
app.use('/images', express.static('./images'))

//解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//引入路由
app.use(require('./router.js'));


//全局错误中间件
app.use((err, req, res, next) => {
    //token验证为通过
    if (err.name === 'UnauthorizedError') {
        res.send({ code: 403, msg: '非法请求' })
        //数据库错误
    } else if (err.name == 'DatabaseError') {
        res.send({ code: err.status, msg: err.message })
        //其他错误
    } else {
        console.log('----ERROR: ' + err.message);
        res.send({ code: 500, msg: '服务器错误' })
    }
})

/*
//https开启服务器
httpsServer.listen(8088, function() {
    console.log('HTTPS Server is running ok', 8088);
});
*/
app.listen(8088, () => {
    console.log("The server started successfully and is running on port 8088");
})