在线预约挂号小程序
====
一个简单的医院在线预约挂号系统，前台使用微信小程序承载，后端技术栈使用`node+mysql`，管理后台为`Vue`</br>
作为一个练手项目还是可以的
### 目录
- [简介](#简介)
  * [小程序部分](#小程序部分)
  * [管理后台部分](#管理后台部分)
- [部署示例](#部署示例)
  * [后端部署（api）](#后端部署（api）)
  * [管理后台部署](#管理后台部署)
  * [微信小程序搭建](#微信小程序搭建)
- [截图预览](#截图预览)

# 简介
## 小程序部分
整体功能有：
```
用户注册部分、就诊人部分、就诊人管理、对预约记录，缴费充值退款记录的管理
意见反馈、医院公告（文章）、自助缴费、余额充值、医院导航、消息管理、在线预约
```
整体采用注册用户绑定就诊人（就诊卡）的模式，除消息为其他数据绑定在对应的就诊人</br>
#### 就诊人
就诊人为一对多模式，最多绑定五位就诊人，有且只有一位默认就诊人，通过就诊卡唯一，对应自己的数据，包括各种记录和余额，且设置与账号所属人的关系，如父母或子女
</br>
#### 在线预约
所有记录和预约操作依然是在单独的就诊人名下进行，选择合适分院（可设置多医院），一级科室，二级科室后通过医生简介等方式选择医生后提交信息预约，，可预约日期限制在今日起7天内
，预约是否完成的操作在医生的控制，用户可对已预约单未完成的记录进行取消等操作
## 管理后台部分
整体功能有：
```
注册用户管理、就诊人管理，医生排班
医院信息（包括分院，各级科室，对应分院、楼层导航，小程序轮播图，各类文章）
充值缴费退款记录管理，预约记录管理和操作，近7天数据分析
```
![管理后台首页](https://github.com/moyuc1966/Register/blob/main/images/admin-index.png "管理后台首页") 

# 部署示例
## 后端部署（api）
*理应有限部署此部分，首先需要node环境*<br><br>
在安装有[node环境](http://nodejs.cn/ )的平台内打开终端，`cd`至api文件夹下
```
npm install
```
安装依赖，之后配置邮件和数据库<br>
打开根目录`link.js`文件，按照注释配置MySQL数据库账号密码等信息
```javascript
const config = {
    host: 'localhost', 
    user: '账号',
    password: '密码',
    database: '库名',
    timezone:"SYSTEM"
}

```
之后配置邮件，打开`Api\loginReg\seek\email.js`文件
```javascript
const transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true,
    auth: {
        user: '发件邮箱',
        pass: '邮箱密码'

    }
});

//省略中间

 const mailInfo = {
        from: '发件邮箱',
        to: qq,
        subject: '预约挂号小程序密码找回',
        text: `尊敬的用户${data[0].name}:  您好，您正在对账号${data[0].username}进行找回密码的操作，验证码为${code}，请在10分钟内完成密码重置操作`,
        html: html
    }


```
此处修改`transporter.auth`的账号密码以及`mailInfo`的发件邮箱，当前项目使用的是QQ邮箱，其他邮箱配置可参考[nodemailer插件](https://nodemailer.com/about/ )
<br>

#### https配置
其实当前文件已经是https，其根目录`ssl`文件夹存放ssl证书，其他http与https配置在`index.js`中调整即可

#### 数据库导入
在根目录中`register.sql`为初始数据，管理员账号密码为123456
<br><br>
根目录`test.sql.gz`是一些测试数据

#### 运行
```
node index.js
```
## 管理后台部署
本项目属于`vue-cli`搭建，推荐后续使用`vue ui`打包和运行

<br><br>
此处打包方式使用命令行（vue ui点点点操作就不截图了）<br>
#### 首先配置api地址
打开`Adim\src\main.js`文件
```javascript

Vue.prototype.apiUrl = 'https://'      //全局api地址，跟路径，不带/，例如https://baidu.com

axios.defaults.baseURL = 'https://..../';   //拦截器地址配置，根路径，携带/
```
之后在Admin文件夹打开终端安装依赖
```
npm install
```
打包
```
npm run build
```
生成文件在`Admin\dist`文件夹，其文件夹内为已经打包好的内容<br><br>
使打包好内容在本地跑起来

1、按照express创建出基本的结构
```
mkdir myapp
cd myapp
npm init
```
package.json会被创建出来

2、安装express
```
npm install express --save
```
会创建 node_modules 

3、同级目录下创建`index.js`文件和www文件夹，其中`index.js`中写入
```javascript
const express = require('express')
const app = express()
 
app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('./www'))
 
app.listen(3000, () => console.log('Example app listening on port 3000!'))
```
4、`npm run build`之后将你打包出的文件目录放到`www`文件夹下，如打包出来的文件目录为dist,dist里面有index.html和page文件夹，page文件夹是所有的打包之后的文件

5、加路由访问`localhost:3000/index.html`即可访问到你打包出的页面了

如果其他电脑也需要访问，将localhost换成本地的ip地址就OK

## 微信小程序搭建

微信小程序开发者工具和小程序账号此处不做多介绍，详细看官方文档：[微信小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/devtools/devtools.html )
<br>
#### api配置
打开`Applet\app.js`文件
```javascript
globalData: {
    $url : 'https://'         //此处是全局api地址配置，根路径，不携带/，记得删除此注释
  },
```

# 截图预览
![管理后台首页](https://github.com/moyuc1966/Register/blob/main/images/admin-index.png "管理后台首页") 
![管理-医生排班](https://github.com/moyuc1966/Register/blob/main/images/admin-his.png "医生排班") 
![管理排班设置](https://github.com/moyuc1966/Register/blob/main/images/admin-2.png "管理排班设置") 
![文章编辑](https://github.com/moyuc1966/Register/blob/main/images/admin-3.png "文章编辑") 
![小程序首页](https://github.com/moyuc1966/Register/blob/main/images/wx-1.jpg "小程序首页")
![小程序预约](https://github.com/moyuc1966/Register/blob/main/images/wx-2.jpg "小程序预约") 
![小程序退款](https://github.com/moyuc1966/Register/blob/main/images/wx-3.jpg "小程序退款") 
![小程序预约记录](https://github.com/moyuc1966/Register/blob/main/images/wx-4.jpg "小程序预约记录") 


