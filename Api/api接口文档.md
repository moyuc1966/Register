---
title: 预约挂号小程序 v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.17"

---

# 预约挂号小程序

> v1.0.0

Base URLs:

* <a href="http://127.0.0.1:8088">测试环境: http://127.0.0.1:8088</a>

# 注册登录

<a id="opIduserReg"></a>

## POST 用户注册

POST /api/userReg

> Body 请求参数

```yaml
username: string
password: string
name: string
gender: 0
age: 0
email: string
phone: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |账号|
|» password|body|string| 是 |密码|
|» name|body|string| 是 |昵称|
|» gender|body|integer| 是 |性别，0男，1女|
|» age|body|integer| 是 |年龄|
|» email|body|string| 是 |电子邮箱|
|» phone|body|string| 是 |手机号|

> 返回示例

> 成功

```json
{
  "msg": "注册成功",
  "code": 200
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示|
|» code|number|true|none||状态码，200成功其他失败|

## POST 用户登录

POST /api/userLogin

> Body 请求参数

```yaml
username: string
password: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |用户登录账号|
|» password|body|string| 是 |登录密码|

> 返回示例

> 成功

```json
{
  "msg": "登录成功",
  "code": 200,
  "token": "token值"
}
```

> 密码错误

```json
{
  "msg": "密码错误",
  "code": 400
}
```

> 账号不存在

```json
{
  "msg": "账号不存在",
  "code": 404
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|密码错误|Inline|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|账号不存在|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none|提示信息|none|
|» code|number|true|none|状态码|200为成功，其他错误|
|» token|string|true|none|token|none|

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示|
|» code|number|true|none||状态码|

状态码 **404**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示|
|» code|number|true|none||状态码|

## POST 管理员登录

POST /api/adminLogin

> Body 请求参数

```yaml
username: string
password: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |管理员账号|
|» password|body|string| 是 |管理员密码|

> 返回示例

> 成功

```json
{
  "msg": "登录成功",
  "code": 200,
  "token": "token值"
}
```

> 请求有误

```json
{
  "msg": "账号或密码错误",
  "code": 400
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|请求有误|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none|返回提示|none|
|» token|string|true|none|token值|none|
|» code|number|true|none|状态码|none|

状态码 **400**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none|返回提示|none|
|» code|number|true|none|状态码|none|

## POST 管理员注册

POST /api/adminReg

> Body 请求参数

```yaml
username: string
password: string
name: string
gender: "0"
email: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |账号|
|» password|body|string| 是 |密码，8-20位|
|» name|body|string| 是 |管理员昵称|
|» gender|body|integer| 是 |性别0男，1女|
|» email|body|string| 是 |唯一邮箱|

> 返回示例

> 成功

```json
{
  "msg": "注册成功",
  "code": 200
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示|
|» code|number|true|none||状态码，200成功其他错误|

## GET 检测是否已登录

GET /api/isLogin

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 注册登录/用户密码重置

## POST 发送邮箱验证

POST /api/seek/retpass

在发送验证码至修改完成密码，需在10分钟内完成

> Body 请求参数

```yaml
email: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» email|body|string| 是 |用户邮箱，限时10分钟完成操作|

> 返回示例

> 成功

```json
{
  "msg": "验证码发送成功",
  "code": 200
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示|
|» code|number|true|none||状态码，200成功，其他失败|

## POST 修改密码

POST /api/seek/modpass

需要提交邮箱验证码，并且在验证码发送10分钟内完成操作，在使用本接口前验证码需要先经过验证接口验证

> Body 请求参数

```yaml
password: string
email: string
code: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» password|body|string| 是 |新密码|
|» email|body|string| 是 |绑定邮箱|
|» code|body|string| 是 |验证码|

> 返回示例

> 成功

```json
{
  "msg": "密码重置成功",
  "code": 200
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示，200成功，其他失败|
|» code|number|true|none||状态码|

## POST 验证码验证接口

POST /api/seek/confirm

验证所填写验证码是否正确

> Body 请求参数

```yaml
email: string
code: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» email|body|string| 是 |绑定邮箱|
|» code|body|string| 是 |验证码|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "验证成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200正确，其他错误|
|» msg|string|true|none||返回提示|

# 账号修改

## POST 管理员信息修改

POST /modify/adminMod

提价name则表示修改昵称，提交username表示修改账号，都提交表示都修改，修改账号后需要下次重新登录

> Body 请求参数

```yaml
name: string
username: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» name|body|string| 否 |name和username至少提交其中一个|
|» username|body|string| 否 |none|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功，403没有权限，400修改失败|
|» msg|string|true|none||返回提示|

## POST 管理员密码修改

POST /modify/adminModPass

修改密码后立即重新登录

> Body 请求参数

```yaml
newpass: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» newpass|body|string| 是 |新密码|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功其他失败|
|» msg|string|true|none||返回提示|

## POST 用户信息修改

POST /modify/userMod

name，age，phone只需要传递需要修改的参数

> Body 请求参数

```yaml
name: string
age: string
phone: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» name|body|string| 否 |昵称，三者至少提交一个|
|» age|body|string| 否 |年龄|
|» phone|body|string| 否 |手机号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功，其他错误|
|» msg|string|true|none||返回提示|

## POST 用户密码修改

POST /modify/userModPass

> Body 请求参数

```yaml
newpass: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» newpass|body|string| 是 |新密码|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功其他错误|
|» msg|string|true|none||返回提示|

## POST 用户头像上传

POST /modify/avatar

限制格式jpg和png，限制大小5MB

> Body 请求参数

```yaml
avatar: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» avatar|body|string(binary)| 是 |头像文件，限制jpg和png格式，限制大小5MB|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "上传成功",
  "data": "/images/avatar/avatar-1657022312507.jpg"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功，其他错误|
|» msg|string|true|none||返回提示|
|» data|string|true|none||所上传文件路径，上传失败不存在此值|

## GET 获取用户详细信息

GET /modify/information

获取信息提交token即可

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需提交Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "id": 1,
    "username": "12345678",
    "name": "墨羽晨",
    "gender": 0,
    "age": 19,
    "email": "749038898@qq.com",
    "phone": "18091111111",
    "avatar": "/images/avatar/avatar-1657022312507.jpg",
    "createTime": "2022-07-04T07:02:19.000Z",
    "state": 1
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» data|object|true|none||数据列表|
|»» id|integer|true|none||id|
|»» username|string|true|none||账号|
|»» name|string|true|none||昵称|
|»» gender|integer|true|none||性别|
|»» age|integer|true|none||年龄|
|»» email|string|true|none||邮箱|
|»» phone|string|true|none||手机号|
|»» avatar|string|true|none||头像|
|»» createTime|string|true|none||注册时间|
|»» state|integer|true|none||状态，0为封禁|

# 轮播图

## GET 前--获取轮播图

GET /api/swiper

获取首页轮播图

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "rows": {
    "id": 3,
    "imgUrl": "/images/swiper/swiper-12445454545.jpg",
    "detId": 28
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码|
|» msg|string|true|none||返回提示|
|» count|integer|true|none||数据条数|
|» rows|object|true|none||数据列表|
|»» id|integer|true|none||轮播图id|
|»» imgUrl|string|true|none||图片url|
|»» detId|integer|true|none||跳转文章id|

## POST 后--轮播图添加

POST /admin/swiperPut

> Body 请求参数

```yaml
swiperImg: string
detId: 0

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» swiperImg|body|string(binary)| 是 |轮播图，支持png和jpg格式，限制大小8MB|
|» detId|body|integer| 是 |跳转文章详情id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功，其他失败|
|» msg|string|true|none||返回提示|

## DELETE 后--轮播图删除

DELETE /admin/swiperDel

> Body 请求参数

```yaml
id: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» id|body|string| 是 |轮播图id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功其他错误|
|» msg|string|true|none||返回提示|

## POST 后--轮播图修改

POST /admin/swiperMod

> Body 请求参数

```yaml
detId: 0
id: 0

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» detId|body|integer| 是 |新跳转文章id|
|» id|body|integer| 是 |轮播图id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示|
|» code|number|true|none||状态码，200成功，其他失败|

# 文章

## GET 前--获取文章列表/详情

GET /api/article

传入detId则返回文章详情，不传入则返回全部文章列表，传入cat则返回指定分类全部文章

当获取文章列表时，必须传入页码和每页数量

> Body 请求参数

```yaml
{}

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|cat|query|string| 否 |文章分类|
|detId|query|integer| 否 |文章详情id|
|page|query|integer| 否 |页码，当detId为空时，此项为必须值|
|limit|query|integer| 否 |每页数量，当detId为空时，此项为必须值|
|body|body|object| 否 |none|

> 返回示例

> 成功

```json
{
  "msg": "获取成功",
  "code": 200,
  "count": 1,
  "data": {
    "readNum": 97,
    "title": "医院广告",
    "time": "2016-01-31 10:52:09",
    "author": "墨羽晨",
    "imgUrl": "/imges/article/article-4545454.jpg",
    "content": "文章内容。。。。"
  }
}
```

```json
{
  "msg": "获取成功",
  "code": 200,
  "rows": [
    {
      "readNum": 97,
      "title": "医院广告",
      "time": "2016-01-31 10:52:09",
      "author": "墨羽晨",
      "imgUrl": "/imges/article/article-4545454.jpg",
      "content": "文章内容。。。。"
    },
    {
      "readNum": 98,
      "title": "医院广告",
      "time": "2016-01-31 10:52:09",
      "author": "墨羽晨",
      "imgUrl": "/imges/article/article-4545454.jpg",
      "content": "文章内容。。。。"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示|
|» code|number|true|none||状态码，200成功|
|» count|integer|true|none||数据条数|
|» data|object|true|none||文章详情|
|»» readNum|number|true|none||阅读数量|
|»» title|string|true|none||文章标题|
|»» time|string|true|none||发表时间|
|»» author|string|true|none||作者|
|»» imgUrl|string|true|none||缩略图|
|»» content|string|true|none||文章内容|
|» rows|[string]|true|none||文章列表，格式如data|

## POST 后--文章添加

POST /admin/articlePut

> Body 请求参数

```yaml
title: string
author: string
imgUrl: string
cat: string
content: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» title|body|string| 是 |标题|
|» author|body|string| 是 |作者|
|» imgUrl|body|string(binary)| 是 |缩略图限制jpg和png格式，限制5MB大小|
|» cat|body|string| 是 |文章类别，公告，健康百科，分享|
|» content|body|string| 是 |文章内容|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "发布成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功，其他错误|
|» msg|string|true|none||返回提示|

## DELETE 后--文章删除

DELETE /admin/articleDel

> Body 请求参数

```yaml
detId: 0

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» detId|body|integer| 是 |文章详情id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码200成功|
|» msg|string|true|none||返回提示|

## POST 后--文章修改

POST /admin/articleMod

至少提交其中一个项

> Body 请求参数

```yaml
id: string
title: string
author: string
cat: string
content: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |token值，需要携带Bearer|
|body|body|object| 否 |none|
|» id|body|string| 是 |文章id|
|» title|body|string| 否 |新标题|
|» author|body|string| 否 |新作者|
|» cat|body|string| 否 |新类别|
|» content|body|string| 否 |新内容|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码200成功|
|» msg|string|true|none||返回提示|

## GET 前--文章阅读

GET /simple/article/read

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |文章id|
|Authorization|header|string| 否 |用户token，需要提交Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "阅读+1"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码|
|» msg|string|true|none||返回提示|

## POST 文章缩略图修改

POST /admin/articleMod/img

> Body 请求参数

```yaml
imgUrl: string
id: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |用户token值，需要携带Bearer|
|body|body|object| 否 |none|
|» imgUrl|body|string(binary)| 是 |新缩略图|
|» id|body|string| 是 |文章id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码|
|» msg|string|true|none||返回提示|

## GET 文章搜索

GET /api/articlePut/{title}

至此模糊搜索，搜索标题

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|title|path|string| 是 |none|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10条|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 1,
      "readNum": 3,
      "title": "医院广告",
      "author": "管理员",
      "cat": "分享",
      "imgUrl": "/images/article/imgUrl-1657363433635.jpg",
      "time": "2022-07-09T10:43:53.000Z",
      "content": "这里是第一条医院公告"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» count|integer|true|none||数据条数|
|» data|[object]|true|none||数据列表|
|»» id|integer|false|none||文章id|
|»» readNum|integer|false|none||阅读数量|
|»» title|string|false|none||标题|
|»» author|string|false|none||作者|
|»» cat|string|false|none||分类|
|»» imgUrl|string|false|none||缩略图|
|»» time|string|false|none||发布时间|
|»» content|string|false|none||内容|

# 系统用户管理

## GET 获取用户列表

GET /admin/users

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 是 |页码|
|limit|query|string| 是 |每页数量|
|ison|query|string| 否 |是否获取全部，固定值on|
|Authorization|header|string| 是 |管理员token，需要携带Bearer|

> 返回示例

> 成功

```json
{
  "msg": "获取成功",
  "code": 200,
  "count": 1,
  "data": {
    "id": 55,
    "username": "123456",
    "name": "世积住",
    "gender": 0,
    "age": 27,
    "email": "k.jjfquut@qq.com",
    "phone": "18133628284",
    "avatar": "http://dummyimage.com/100x100",
    "createTime": "2005-04-27 21:26:25",
    "state": 1
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» msg|string|true|none||返回提示|
|» code|number|true|none||状态码，200成功|
|» count|integer|true|none||返回数据条数|
|» data|object|true|none||用户数据列表|
|»» id|integer|true|none||用户id|
|»» username|string|true|none||账号|
|»» name|string|true|none||昵称|
|»» gender|integer|true|none||性别，0男1女|
|»» age|integer|true|none||年龄|
|»» email|string|true|none||邮箱|
|»» phone|string|true|none||手机号|
|»» avatar|string|true|none||用户头像|
|»» createTime|string|true|none||注册时间|
|»» state|integer|true|none||账号状态，0是已被封禁|

## DELETE 删除用户

DELETE /admin/usersDel

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|query|integer| 是 |用户id|
|Authorization|header|string| 否 |管理员token，需要携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码|
|» msg|string|true|none||返回提示|

## POST 封禁用户

POST /admin/usersFrozen

> Body 请求参数

```yaml
userId: string
state: 0

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» userId|body|string| 否 |用户id|
|» state|body|integer| 否 |1是正常，0是是封禁|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "封禁成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

## GET 用户搜索

GET /admin/userQuery/{id}

path参数支持传入姓名，id，证件号，就诊卡号，手机号，当state参数存在时返回账号下全部数据，其他参数失效，但是path参数必须传入

path参数权重：username > id > name > phone > email

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|page|query|integer| 是 |none|
|limit|query|integer| 是 |none|
|state|query|integer| 否 |固定值，当此参数传入时获取封禁用户列表|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 2,
      "username": "123456789",
      "password": "78d609a308db4a83d77eac6f9d486262",
      "name": "嗨害",
      "gender": 0,
      "age": 18,
      "email": "7490388988@qq.com",
      "phone": "18093556455",
      "avatar": "/images/default/boy.jpeg",
      "createTime": "2022-07-04T07:05:49.000Z",
      "state": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» data|[object]|true|none||数据列表|
|»» id|integer|false|none||id|
|»» username|string|false|none||账号|
|»» name|string|false|none||昵称|
|»» gender|integer|false|none||性别|
|»» age|integer|false|none||年龄|
|»» email|string|false|none||邮箱|
|»» phone|string|false|none||手机号|
|»» avatar|string|false|none||头像|
|»» createTime|string|false|none||注册时间|
|»» state|integer|false|none||状态，0为封禁状态|

## GET 管理员获取用户详情消息

GET /admin/userInf

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|query|integer| 是 |用户id|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": {
    "id": 1,
    "username": "12345678",
    "name": "墨羽晨",
    "gender": 0,
    "age": 19,
    "email": "749038898@qq.com",
    "phone": "18091111111",
    "avatar": "/images/avatar/avatar-1657022312507.jpg",
    "createTime": "2022-07-04T07:02:19.000Z",
    "state": 1
  }
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|object|true|none||none|
|»» id|integer|true|none||none|
|»» username|string|true|none||none|
|»» name|string|true|none||none|
|»» gender|integer|true|none||none|
|»» age|integer|true|none||none|
|»» email|string|true|none||none|
|»» phone|string|true|none||none|
|»» avatar|string|true|none||none|
|»» createTime|string|true|none||none|
|»» state|integer|true|none||none|

# 系统信息

## GET 获取医院导航

GET /api/navigation

直接请求为医院地址列表，携带hosId获取医院导航详情，携带hosId 并且携带and参数获取对应楼层导航

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|hosId|query|string| 否 |医院id，获取医院导航详情|
|and|query|string| 否 |在有医院id的前提下获取楼层导航，传入固定值floor|
|page|query|string| 否 |none|
|limit|query|string| 否 |每页数量，默认10|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "北京市第一人民医院-东院",
      "telephone": "021-5889090",
      "reco": "市内乘4、5、20、24、27、49、46路车可直达东茅岭院本部",
      "address": "北京市大兴区**路990号"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功|
|» msg|string|true|none||返回提示|
|» count|integer|true|none||返回数据条数|
|» data|object|true|none||返回数据列表|
|»» name|string|true|none||医院名称|
|»» address|string|true|none||地址|
|»» phone|string|true|none||电话|
|»» floor|object|true|none||楼层导航|
|»»» floorNum|number|true|none||楼层|
|»»» room|string|true|none||层内科室|

## POST 添加医院位置

POST /admin/navigationAdd

> Body 请求参数

```yaml
name: string
telephone: string
reco: string
address: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需要携带Bearer|
|body|body|object| 否 |none|
|» name|body|string| 是 |地址名称|
|» telephone|body|string| 是 |电话|
|» reco|body|string| 是 |推荐到达方式|
|» address|body|string| 是 |地址|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码|
|» msg|string|true|none||返回提示|

## POST 添加医院楼层导航

POST /admin/navigationAddFloor

> Body 请求参数

```yaml
hosId: 0
floorName: string
content: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需要携带Bearer|
|body|body|object| 否 |none|
|» hosId|body|integer| 是 |所属医院id|
|» floorName|body|string| 是 |名称|
|» content|body|string| 是 |楼层内容|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg ": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码|
|» msg|string|true|none||返回提示|

## DELETE 删除楼层导航

DELETE /admin/navigationDelFloor

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|floorId|query|string| 是 |楼层导航id|
|Authorization|header|string| 是 |管理员token，需要携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码|
|» msg|string|true|none||返回提示|

## DELETE 删除医院导航

DELETE /admin/navigationDel

删除医院导航前先确认对应楼层导航的处理方式，如果需要一起删除，需手动提交mode参数为strict

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|hosId|query|string| 是 |医院id|
|mode|query|string| 否 |连带楼层一起删除，需传入固定值strict|
|Authorization|header|string| 是 |管理员token，需要携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

## POST 修改医院导航

POST /admin/navigationMod

传入某值表示修改某内容，但至少传入一个项

> Body 请求参数

```yaml
hosId: string
name: string
telephone: string
reco: string
address: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需要携带Bearer|
|body|body|object| 否 |none|
|» hosId|body|string| 是 |医院id|
|» name|body|string| 否 |医院名称|
|» telephone|body|string| 否 |医院电话|
|» reco|body|string| 否 |推荐方式|
|» address|body|string| 否 |地址|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

## GET 获取统计数据

GET /admin/statistics

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "appointments": 0,
  "refund": 0,
  "recharge": 0,
  "outpatient": 0,
  "users": 0,
  "makeList": [
    {
      "date": "7月27日",
      "num": 2
    }
  ],
  "rechargeList": [
    {
      "date": "7月20日",
      "money": 100
    }
  ],
  "hotDep": [
    {
      "depName": "内科-呼吸内科",
      "num": 2
    }
  ],
  "hotDoctor": [
    {
      "doctorName": "赵马",
      "num": 2
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» appointments|integer|true|none||今日预约人数|
|» refund|integer|true|none||今日退款总额|
|» recharge|integer|true|none||今日充值总额|
|» outpatient|integer|true|none||今日挂号费总额|
|» users|integer|true|none||今日注册用户数|
|» makeList|[object]|true|none||近七天预约人数|
|»» date|string|false|none||日期|
|»» num|integer|false|none||数量|
|» rechargeList|[object]|true|none||近七天充值趋势|
|»» date|string|false|none||日期|
|»» money|integer|false|none||金额|
|» hotDep|[object]|true|none||热门科室|
|»» depName|string|false|none||科室名称|
|»» num|integer|false|none||预约数量|
|» hotDoctor|[object]|true|none||热门医生|
|»» doctorName|string|false|none||医生姓名|
|»» num|integer|false|none||预约数量|

## GET 最新挂号

GET /admin/statistics/latestReg

获取最新预约挂号前五条

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "name": "张三",
      "phone": "18096654833",
      "time": "2022年7月27日周三上午",
      "depName": "内科-呼吸内科",
      "price": 60,
      "type": "专家号"
    },
    {
      "name": "张三",
      "phone": "18096654833",
      "time": "2022年7月27日周三上午",
      "depName": "内科-呼吸内科",
      "price": 60,
      "type": "专家号"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» name|string|true|none||患者姓名|
|»» phone|string|true|none||手机号|
|»» time|string|true|none||预约时间|
|»» depName|string|true|none||科室|
|»» price|integer|true|none||挂号费|
|»» type|string|true|none||类型|

## GET 获取管理员列表

GET /admin/getAdministratorsList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需要携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 2,
      "name": "墨羽晨",
      "username": "12345678",
      "gender": 0,
      "email": "3216354195@qq.com"
    },
    {
      "id": 1,
      "name": "超级管理员",
      "username": "123456",
      "gender": 1,
      "email": null
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||管理员id|
|»» name|string|true|none||管理员昵称|
|»» username|string|true|none||管理员账号|
|»» gender|integer|true|none||管理员性别，0男1女|
|»» email|string¦null|true|none||管理员邮箱|

## GET 管理员搜索

GET /admin/administratorsSearch

> Body 请求参数

```yaml
{}

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|user|query|string| 是 |管理员账号|
|Authorization|header|string| 是 |管理员token|
|body|body|object| 否 |none|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 就诊人

## POST 添加就诊人

POST /user/patientAdd

就诊人添加，不允许重复，每个账号最多添加5位就诊人

> Body 请求参数

```yaml
name: string
docType: string
certificate: 0
relation: string
card: 0
phone: 0
address: string
isdefault: 0

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|
|body|body|object| 否 |none|
|» name|body|string| 是 |真实姓名|
|» docType|body|string| 是 |证件类型，允许身份证，港澳通行证，护照|
|» certificate|body|number| 是 |证件号|
|» relation|body|string| 是 |与账号所属关系，只允许，本人，父母，朋友，夫妻，子女|
|» card|body|number| 是 |就诊卡号|
|» phone|body|number| 是 |手机号|
|» address|body|string| 否 |地址，非必填|
|» isdefault|body|integer| 是 |是否默认，默认就诊人只允许一个，默认为非，1表示默认，2表示非默认|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功|
|» msg|string|true|none||返回提示|

## GET 获取就诊人信息详情

GET /user/patientInfo/{id}

path提交就诊人id

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "name": "张三",
      "relation": "本人",
      "doctype": "身份证",
      "certificate": "622225200209561516",
      "card": "202208564456",
      "phone": "18096654833",
      "address": null,
      "isdefault": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» data|[object]|true|none||数据数组|
|»» name|string|false|none||姓名|
|»» relation|string|false|none||关系|
|»» doctype|string|false|none||证件类型|
|»» certificate|string|false|none||证件号|
|»» card|string|false|none||就诊卡号|
|»» phone|string|false|none||手机号|
|»» address|null|false|none||地址|
|»» isdefault|integer|false|none||是否默认|

## PUT 修改就诊人信息

PUT /user/patientMod

支持修改姓名，证件类型，证件号，关系，手机号，地址，就诊卡号，至少提交一项

> Body 请求参数

```yaml
id: 0
name: string
docType: string
certificate: string
relation: string
phont: string
address: string
card: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需提交Bearer|
|body|body|object| 否 |none|
|» id|body|integer| 是 |就诊人id|
|» name|body|string| 否 |姓名|
|» docType|body|string| 否 |证件类型|
|» certificate|body|string| 否 |证件号|
|» relation|body|string| 否 |关系|
|» phont|body|string| 否 |手机号|
|» address|body|string| 否 |地址|
|» card|body|string| 否 |就诊卡号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

## DELETE 删除就诊人

DELETE /user/patientDel/{id}

path提交就诊人id

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

## GET 账号下就诊人列表

GET /user/patientList

只返回就诊人姓名，关系，证件号（打码），是否默认

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|def|query|string| 否 |获取默认就诊人，固定值yes|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "name": "张三",
      "relation": "本人",
      "certificate": "6222*****1516",
      "isdefault": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码，200成功|
|» msg|string|true|none||返回提示|
|» rows|object|true|none||数据列表|
|»» name|string|true|none||姓名|
|»» relation|string|true|none||关系|
|»» certificate|string|true|none||证件号|
|»» isdefault|integer|true|none||是否默认|

## POST 修改默认

POST /user/patientModDef

必须保留一个默认，并且最多只有一个 默认，当提交新的默认时，就默认会被修改

> Body 请求参数

```yaml
id: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|
|body|body|object| 否 |none|
|» id|body|string| 是 |就诊人id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||烦会提示|

## GET 管理员获取就诊人列表

GET /admin/patientList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 是 |页码|
|limit|query|integer| 是 |每页数量|
|Authorization|header|string| 是 |管理员token，需要携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "docType": "身份证",
      "certificate": "622225200209561516",
      "relation": "本人",
      "card": "202208564456",
      "phone": "18096654833",
      "address": null,
      "isdefault": 2,
      "balance": 20,
      "userId": 1
    },
    {
      "id": 11,
      "name": "李四",
      "docType": "身份证",
      "certificate": "623225200209561516",
      "relation": "子女",
      "card": "202208562256",
      "phone": "18056854833",
      "address": "null",
      "isdefault": 2,
      "balance": 0,
      "userId": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» count|integer|true|none||返回数据条数|
|» data|[object]|true|none||数据列表|
|»» id|integer|true|none||就诊人id|
|»» name|string|true|none||真实姓名|
|»» docType|string|true|none||证件类型|
|»» certificate|string|true|none||证件号|
|»» relation|string|true|none||关系|
|»» card|string|true|none||就诊卡号|
|»» phone|string|true|none||手机号|
|»» address|string¦null|true|none||地址|
|»» isdefault|integer|true|none||是否默认，1是默认，2是非默认|
|»» balance|integer|true|none||账户余额|
|»» userId|integer|true|none||账号id|

## GET 就诊人搜索

GET /admin/patientQuery/{id}

path参数支持传入姓名，id，证件号，就诊卡号，手机号，当userId参数存在时返回账号下全部数据，其他参数失效，但是path参数必须传入

path参数权重：name > id > card > phone > cartificate

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |可以是姓名，id，证件号，就诊卡号，手机号|
|page|query|integer| 是 |页码|
|limit|query|integer| 是 |每页数量|
|userId|query|string| 否 |用户id，如果传入则返回账号下列表，其他path参数失效|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 1,
      "name": "张三",
      "docType": "身份证",
      "certificate": "622225200209561516",
      "relation": "本人",
      "card": "202208564456",
      "phone": "18096654833",
      "address": null,
      "isdefault": 2,
      "balance": 20,
      "userId": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» count|integer|true|none||返回数据条数|
|» data|[object]|true|none||数据列表|
|»» id|integer|false|none||id|
|»» name|string|false|none||姓名|
|»» docType|string|false|none||证件类型|
|»» certificate|string|false|none||证件号|
|»» relation|string|false|none||关系|
|»» card|string|false|none||就诊卡号|
|»» phone|string|false|none||手机号|
|»» address|null|false|none||地址|
|»» isdefault|integer|false|none||是否k默认|
|»» balance|integer|false|none||张华余额|
|»» userId|integer|false|none||账号id|

# 就诊人/余额充值

## POST 创建余额充值订单

POST /order/patient/orderCreate

首先调用此接口创建订单，返回成功后开始支付，此时订单状态为待支付

> Body 请求参数

```yaml
auantity: string
card: string
payType: string
patId: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|
|body|body|object| 否 |none|
|» auantity|body|string| 是 |充值金额|
|» card|body|string| 是 |就诊卡号|
|» payType|body|string| 是 |支付方式|
|» patId|body|string| 是 |就诊人id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "订单生成成功",
  "orderId": "CZ072320442022582139"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» orderId|string|true|none||订单id|

## PUT 增加余额

PUT /user/patient/pay

用户付款完成后调用此接口完成充值，返回成功后完成支付，此时会修改订单状态为已支付

> Body 请求参数

```yaml
patId: string
card: 0
orderId: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|
|body|body|object| 否 |none|
|» patId|body|string| 是 |就诊人id|
|» card|body|number| 是 |就诊卡号|
|» orderId|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "充值成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

# 就诊人/余额退款

## POST 提交申请

POST /patient/refundSend

> Body 请求参数

```yaml
"patId ": string
money: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|
|body|body|object| 否 |none|
|» patId|body|string| 是 |就诊人id|
|» money|body|string| 是 |退款金额|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "提交申请成功",
  "orderId": "TK071624182022208038"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码，200成功|
|» msg|string|true|none||返回提示|
|» orderId|string|true|none||订单id|

## POST 处理申请，同意/驳回

POST /refundHandle

在调用此接口处理完申请后，需发送已退款/已驳回的消息（type：退款处理）

state的值只能是1或2

> Body 请求参数

```yaml
state: 0
patId: 0
userId: 0
orderId: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» state|body|integer| 是 |是否同意，1表示同意，12表示驳回|
|» patId|body|integer| 是 |就诊人id|
|» userId|body|integer| 是 |用户id|
|» orderId|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "退款成功"
}
```

```json
{
  "code": 200,
  "msg": "已驳回"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

# 订单

## GET 用户获取充值订单列表

GET /order/userRecList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|patId|query|string| 否 |就诊人id，传入表示获取此就诊人充值记录|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "auantity": 60,
      "card": "202214679589",
      "payType": "微信支付",
      "time": "2022-07-20T15:24:52.000Z",
      "orderId": "CZ072320242022520983",
      "userId": 1,
      "patId": 1,
      "balance": 0
    },
    {
      "id": 2,
      "auantity": 20,
      "card": "454545454545",
      "payType": "微信支付",
      "time": "2022-07-20T15:44:58.000Z",
      "orderId": "CZ072320442022582139",
      "userId": 1,
      "patId": 1,
      "balance": 800
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» data|[object]|true|none||数据列表|
|»» id|integer|true|none||id|
|»» auantity|integer|true|none||充值金额|
|»» card|string|true|none||就诊卡号|
|»» payType|string|true|none||支付方式|
|»» time|string|true|none||创建时间|
|»» orderId|string|true|none||订单id|
|»» userId|integer|true|none||用户id|
|»» patId|integer|true|none||就诊人id|
|»» balance|integer|true|none||余额（充值后）|

## GET 获取充值订单详情

GET /order/userRecInf

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|orderId|query|string| 是 |订单号|
|Authorization|header|string| 是 |token值，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "auantity": 60,
      "card": "202214679589",
      "payType": "微信支付",
      "time": "2022-07-20T15:24:52.000Z",
      "orderId": "CZ072320242022520983",
      "userId": 1,
      "patId": 1,
      "balance": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» auantity|integer|false|none||充值金额|
|»» card|string|false|none||none|
|»» payType|string|false|none||none|
|»» time|string|false|none||none|
|»» orderId|string|false|none||none|
|»» userId|integer|false|none||none|
|»» patId|integer|false|none||none|
|»» balance|integer|false|none||none|

## GET 用户获取退款申请列表

GET /order/userRefundList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|patId|query|string| 否 |就诊人id，传入表示获取此就诊人充值记录|
|Authorization|header|string| 是 |用户token，需提交Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "time": "2022-07-24T08:18:20.000Z",
      "orderId": "TK071624182022208038",
      "name": "张三",
      "card": "202208564456",
      "balance": 5,
      "money": 15,
      "userId": 1,
      "patId": 1,
      "state": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» data|[object]|true|none||数据列表|
|»» id|integer|false|none||id|
|»» time|string|false|none||提交时间|
|»» orderId|string|false|none||订单id|
|»» name|string|false|none||就诊人姓名|
|»» card|string|false|none||就诊卡号|
|»» balance|integer|false|none||退款后余额|
|»» money|integer|false|none||申请退款金额|
|»» userId|integer|false|none||用户id|
|»» patId|integer|false|none||就诊人id|
|»» state|integer|false|none||状态，0是待处理，1是同意，2是驳回|

## GET 获取退款申请详情

GET /order/userRefundInf

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|orderId|query|string| 是 |订单id|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "time": "2022-07-24T08:18:20.000Z",
      "orderId": "TK071624182022208038",
      "name": "张三",
      "card": "202208564456",
      "balance": 5,
      "money": 15,
      "userId": 1,
      "patId": 1,
      "state": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» time|string|false|none||none|
|»» orderId|string|false|none||none|
|»» name|string|false|none||none|
|»» card|string|false|none||none|
|»» balance|integer|false|none||none|
|»» money|integer|false|none||none|
|»» userId|integer|false|none||none|
|»» patId|integer|false|none||none|
|»» state|integer|false|none||none|

## GET 管理员搜索/获取充值列表

GET /admin/recOrderList

不传递参数默认分页获取全部订单，时间顺序降序，每页10条，返回第一页

三个参数不共存，权重：用户 > 就诊人 > 订单号

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|query|string| 否 |用户id|
|patId|query|string| 否 |就诊人id|
|orderId|query|string| 否 |订单号|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 3,
      "auantity": 20,
      "card": "454545454545",
      "payType": "微信支付",
      "time": "2022-07-20T15:59:07.000Z",
      "orderId": "CZ072320592022076898",
      "userId": 1,
      "patId": 1,
      "balance": 20
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» count|integer|true|none||数据返回条数|
|» data|[object]|true|none||none|
|»» id|integer|false|none||数据id|
|»» auantity|integer|false|none||充值金额|
|»» card|string|false|none||就诊卡号|
|»» payType|string|false|none||支付类型|
|»» time|string|false|none||创建时间|
|»» orderId|string|false|none||订单id|
|»» userId|integer|false|none||用户id|
|»» patId|integer|false|none||就诊人id|
|»» balance|integer|false|none||此时余额|

## GET 管理员搜索/获取退款列表

GET /admin/refundOrderList

不传递参数默认分页获取全部订单，时间顺序降序，每页10条，返回第一页

三个参数不共存，权重：用户 > 就诊人 > 订单号

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|query|string| 否 |用户id|
|patId|query|string| 否 |就诊人id|
|orderId|query|string| 否 |订单号|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 1,
      "time": "2022-07-24T08:18:20.000Z",
      "orderId": "TK071624182022208038",
      "name": "张三",
      "card": "202208564456",
      "balance": 5,
      "money": 15,
      "userId": 1,
      "patId": 1,
      "state": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|integer|true|none||返回数据条数|
|» data|[object]|true|none||none|
|»» id|integer|false|none||数据id|
|»» time|string|false|none||创建时间|
|»» orderId|string|false|none||订单号|
|»» name|string|false|none||就诊人姓名|
|»» card|string|false|none||就诊卡号|
|»» balance|integer|false|none||此时余额|
|»» money|integer|false|none||退款金额|
|»» userId|integer|false|none||用户id|
|»» patId|integer|false|none||就诊id|
|»» state|integer|false|none||状态，0是待处理，1是同意，2是驳回|

## POST 创建缴费订单

POST /order/patient/payCreate

> Body 请求参数

```json
{
  "price": 600,
  "type": "西药费",
  "dep": "消化内科",
  "patId": 1,
  "rows": [
    {
      "name": "阿莫西林",
      "price": 100,
      "num": 2
    },
    {
      "name": "胶囊",
      "price": 100,
      "num": 2
    }
  ]
}
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» price|body|integer| 是 |总价|
|» type|body|string| 是 |缴费类型，如西药费|
|» dep|body|string| 是 |科室|
|» patId|body|string| 是 |就诊人id|
|» rows|body|[object]| 是 |订单详情列表|
|»» name|body|string| 是 |名称|
|»» price|body|string| 是 |单价|
|»» num|body|string| 是 |数量|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "提交成功",
  "orderId": "JF071325452022042144"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» orderId|string|true|none||订单号|

## GET 用户获取缴费订单列表

GET /order/userPayOrder

不错传递任何参数默认获取所有订单，

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|patId|query|integer| 否 |就诊人id|
|state|query|integer| 否 |订单状态，可传参数为0或1,0表示待支付，1表示已支付|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 3,
      "orderId": "JF071325452022042144",
      "time": "2022-07-25T05:45:04.000Z",
      "price": 600,
      "type": "消化内科",
      "dep": "西药费",
      "patName": "张三",
      "card": "202208564456",
      "userId": 1,
      "patId": 1,
      "state": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» data|[object]|true|none||数据列表|
|»» id|integer|false|none||id|
|»» orderId|string|false|none||订单id|
|»» time|string|false|none||时间|
|»» price|integer|false|none||总金额|
|»» type|string|false|none||类型|
|»» dep|string|false|none||科室|
|»» patName|string|false|none||就诊人姓名|
|»» card|string|false|none||就诊卡号|
|»» userId|integer|false|none||用户id|
|»» patId|integer|false|none||就诊人id|
|»» state|integer|false|none||状态，0未支付，1已支付|

## POST 用户支付待缴费订单

POST /order/paymentOrder

> Body 请求参数

```yaml
orderId: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|
|body|body|object| 否 |none|
|» orderId|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "缴费成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 获取缴费订单详情

GET /order/userPayOrderInf

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|orderId|query|string| 是 |订单id|
|Authorization|header|string| 是 |token 需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 3,
      "orderId": "JF071325452022042144",
      "time": "2022-07-25 13:45:04",
      "price": 600,
      "type": "消化内科",
      "dep": "西药费",
      "patName": "张三",
      "card": "202208564456",
      "userId": 1,
      "patId": 1,
      "state": 1,
      "rows": [
        {
          "id": 3,
          "orderId": "JF071325452022042144",
          "name": "阿莫西林",
          "price": 100,
          "num": 2,
          "total": 200
        },
        {
          "id": 4,
          "orderId": "JF071325452022042144",
          "name": "胶囊",
          "price": 100,
          "num": 2,
          "total": 200
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» orderId|string|false|none||none|
|»» time|string|false|none||none|
|»» price|integer|false|none||none|
|»» type|string|false|none||none|
|»» dep|string|false|none||none|
|»» patName|string|false|none||none|
|»» card|string|false|none||none|
|»» userId|integer|false|none||none|
|»» patId|integer|false|none||none|
|»» state|integer|false|none||none|
|»» rows|[object]|false|none||none|
|»»» id|integer|true|none||none|
|»»» orderId|string|true|none||none|
|»»» name|string|true|none||none|
|»»» price|integer|true|none||none|
|»»» num|integer|true|none||none|
|»»» total|integer|true|none||none|

## GET 管理员搜索/获取缴费列表

GET /admin/payOrderList

不传递参数默认分页获取全部订单，时间顺序降序，每页10条，返回第一页

三个参数不共存，权重：用户 > 就诊人 > 订单号

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|query|string| 否 |用户id|
|patId|query|string| 否 |就诊人id|
|orderId|query|string| 否 |订单号|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 3,
      "orderId": "JF071325452022042144",
      "time": "2022-07-25T05:45:04.000Z",
      "price": 600,
      "type": "消化内科",
      "dep": "西药费",
      "patName": "张三",
      "card": "202208564456",
      "userId": 1,
      "patId": 1,
      "state": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|integer|true|none||数据返回条数|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» orderId|string|false|none||none|
|»» time|string|false|none||none|
|»» price|integer|false|none||none|
|»» type|string|false|none||none|
|»» dep|string|false|none||none|
|»» patName|string|false|none||none|
|»» card|string|false|none||none|
|»» userId|integer|false|none||none|
|»» patId|integer|false|none||none|
|»» state|integer|false|none||none|

## POST 处理用户的退款申请

POST /admin/refundHandle

> Body 请求参数

```yaml
patId: 0
userId: 0
orderId: string
state: 0

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» patId|body|integer| 是 |就诊人id|
|» userId|body|integer| 是 |用户id|
|» orderId|body|string| 是 |订单号|
|» state|body|integer| 是 |处理方式，1表示同意，2表示驳回|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "退款成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

# 用户反馈

## POST 提交反馈

POST /feedback/submit

反馈类型包括：挂号相关，缴费相关，使用问题

邮箱和手机号非必填

> Body 请求参数

```yaml
title: string
type: string
content: string
email: string
phone: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需提交Bearer|
|body|body|object| 否 |none|
|» title|body|string| 是 |反馈标题，限制30字之内|
|» type|body|string| 是 |反馈类型，包含：挂号相关，缴费相关，使用问题|
|» content|body|string| 是 |反馈内容，限制150字之内|
|» email|body|string| 否 |邮箱|
|» phone|body|string| 否 |手机号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "提交成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码，200成功其他失败|
|» msg|string|true|none||返回提示|

## GET 我的反馈

GET /feedback/my

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需提交Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "title": "充值失败",
      "type": "缴费相关",
      "content": "刚刚我充值失败了",
      "time": "2022-07-21T11:44:23.000Z",
      "email": "3216354195@qq.com",
      "phone": "匿名"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» data|[object]|true|none||none|
|»» title|string|false|none||标题|
|»» type|string|false|none||类型|
|»» content|string|false|none||内容|
|»» time|string|false|none||时间|
|»» email|string|false|none||邮箱|
|»» phone|string|false|none||手机号|

## GET 管理员获取反馈列表

GET /admin/feedbackList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|integer| 否 |页码|
|limit|query|integer| 否 |每页数量，默认10|
|Authorization|header|string| 是 |管理员token|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "充值失败",
      "type": "缴费相关",
      "content": "刚刚我充值失败了",
      "email": "3216354195@qq.com",
      "phone": "匿名",
      "time": "2022-07-21T11:44:23.000Z",
      "username": "12345678"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» count|integer|true|none||数据返回条数|
|» data|[object]|true|none||数据列表|
|»» id|integer|false|none||none|
|»» title|string|false|none||none|
|»» type|string|false|none||none|
|»» content|string|false|none||none|
|»» email|string|false|none||none|
|»» phone|string|false|none||none|
|»» time|string|false|none||none|
|»» username|string|false|none||none|

## GET 管理员搜索反馈

GET /admin/feedbackQuery

type参数提交反馈类型，分类查看
user参数提交用户账号，获取用户提交的反馈

两者只能提交其一，并且必须提交一个，当两个参数都提交时，type权重高于user

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|user|query|string| 否 |用户账号username|
|type|query|string| 否 |反馈类型|
|Authorization|header|string| 是 |管理员token，需提交Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 1,
      "title": "充值失败",
      "type": "缴费相关",
      "content": "刚刚我充值失败了",
      "email": "3216354195@qq.com",
      "phone": "匿名",
      "time": "2022-07-21T11:44:23.000Z",
      "username": "12345678"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|integer|true|none||数据返回条数|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» title|string|false|none||none|
|»» type|string|false|none||none|
|»» content|string|false|none||none|
|»» email|string|false|none||none|
|»» phone|string|false|none||none|
|»» time|string|false|none||none|
|»» username|string|false|none||none|

## DELETE 删除反馈

DELETE /admin/feedbackDel/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

# 消息

## POST 公共发送消息接口

POST /message/send

消息类型，包括：预约成功，退款处理，公告，新消息，除前三个分类，其他全部属于“新消息”

> Body 请求参数

```yaml
userId: string
source: string
type: string
title: string
content: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» userId|body|string| 是 |接受消息的用户id，0表示所有用户|
|» source|body|string| 是 |消息来源，如系统，管理员...|
|» type|body|string| 是 |消息类型，包括：预约成功，退款处理，公告，新消息，除前三个分类，其他全部属于“新消息”|
|» title|body|string| 是 |消息标题，20字以内|
|» content|body|string| 是 |消息内容，780字以内|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "发送成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码，200成功|
|» msg|string|true|none||返回提示|

## GET 用户获取消息列表

GET /simple/getMessageList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 2,
      "source": "管理员",
      "isread": 0,
      "time": "2022-07-23T02:21:18.000Z",
      "type": "公告",
      "title": "医院里的公告",
      "content": "这里是公告内容"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» data|[object]|true|none||数据列表|
|»» id|integer|false|none||id|
|»» source|string|false|none||来源|
|»» isread|integer|false|none||是否已读，0表示未读|
|»» time|string|false|none||时间|
|»» type|string|false|none||类型|
|»» title|string|false|none||标题|
|»» content|string|false|none||内容|

## GET 获取消息详情

GET /simple/getMessage/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 2,
      "source": "管理员",
      "isread": 0,
      "time": "2022-07-23T02:21:18.000Z",
      "type": "公告",
      "title": "医院里的公告",
      "content": "这里是公告内容"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» source|string|false|none||none|
|»» isread|integer|false|none||none|
|»» time|string|false|none||none|
|»» type|string|false|none||none|
|»» title|string|false|none||none|
|»» content|string|false|none||none|

## GET 阅读消息

GET /simple/messageRead/{id}

将消息未读变成已读，接受消息为全体的，不使用此接口

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |none|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "已阅读"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

## GET 管理员获取消息列表

GET /message/adminList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 5,
      "userId": 2,
      "source": "管理员",
      "time": "2022-07-23T02:22:37.000Z",
      "type": "新消息",
      "isread": 0,
      "title": "2222",
      "content": "4544444444"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|integer|true|none||数据返回条数|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» userId|integer|true|none||none|
|»» source|string|true|none||none|
|»» time|string|true|none||none|
|»» type|string|true|none||none|
|»» isread|integer|true|none||none|
|»» title|string|true|none||none|
|»» content|string|true|none||none|

## DELETE 删除消息

DELETE /message/messageDel/{id}

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|path|string| 是 |消息id|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

## GET 消息搜索

GET /message/query

type和userId必选其一，且只能选其一，当两个参数与同时存在时userId权重高于type

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 否 |消息分类|
|userId|query|string| 否 |用户id|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页矢量，默认10|
|Authorization|header|string| 是 |管理员token，需提交Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 2,
      "userId": 0,
      "source": "管理员",
      "time": "2022-07-23T02:21:18.000Z",
      "type": "公告",
      "isread": 0,
      "title": "医院里的公告",
      "content": "这里是公告内容"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|integer|true|none||返回数据条数|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» userId|integer|false|none||none|
|»» source|string|false|none||none|
|»» time|string|false|none||none|
|»» type|string|false|none||none|
|»» isread|integer|false|none||none|
|»» title|string|false|none||none|
|»» content|string|false|none||none|

## GET 获取未读消息数量

GET /simple/getMessageNum

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 否 |用户token。需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "num": 2
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|number|true|none||状态码|
|» msg|string|true|none||返回提示|
|» num|integer|true|none||未读消息数量|

# 医院科室

## POST 添加医院

POST /admin/dep/addHospital

> Body 请求参数

```yaml
name: string
minname: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» name|body|string| 是 |医院分院名称|
|» minname|body|string| 是 |分院简称|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|

## POST 添加一级科室

POST /admin/dep/addDepOne

> Body 请求参数

```yaml
hosId: string
name: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» hosId|body|string| 是 |分院id|
|» name|body|string| 是 |科室名称|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 添加二级科室

POST /admin/dep/addDepTwo

> Body 请求参数

```yaml
depId: string
name: string
address: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» depId|body|string| 是 |一级科室id|
|» name|body|string| 是 |科室名称|
|» address|body|string| 是 |楼层地址|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## PUT 开启或关闭医院

PUT /admin/dep/switchHospital

> Body 请求参数

```yaml
state: 0
id: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» state|body|integer| 是 |开启或关闭，1表示开启，0表示关闭|
|» id|body|string| 是 |分院id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "关闭成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## PUT 开启或关闭一级科室

PUT /admin/dep/switchDepOne

> Body 请求参数

```yaml
state: 0
id: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» state|body|integer| 是 |开启或关闭，1表示开启，0表示关闭|
|» id|body|string| 是 |一级科室id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "开启成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## PUT 开启或关闭二级科室

PUT /admin/dep/switchDepTwo

> Body 请求参数

```yaml
state: 0
id: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» state|body|integer| 是 |开启或关闭，1表示开启，0表示关闭|
|» id|body|string| 是 |二级科室id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "开启成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## DELETE 删除分院

DELETE /admin/dep/delHospital

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 否 |分院id|
|isStrict|query|string| 否 |严格模式，固定值strict，如果传递此参数，则会删除下一级及其之后所有内容|
|Authorization|header|string| 是 |管理员token，需写携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## DELETE 删除一级科室

DELETE /admin/dep/delDepOne

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 否 |一级科室id|
|isStrict|query|string| 否 |严格模式，固定值strict，如果传递此参数，则会删除下一级所有内容|
|Authorization|header|string| 是 |管理员token，需写携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## DELETE 删除二级科室

DELETE /admin/dep/delDepTwo

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 否 |二级科室id|
|isStrict|query|string| 否 |严格模式，固定值strict，如果传递此参数，则会删除下一级所有内容|
|Authorization|header|string| 是 |管理员token，需写携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 获取分院列表

GET /simple/getHospital

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|paging|query|string| 否 |固定值on，如果传递此参数则开启分页|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|switch|query|string| 否 |当此值为on时，值获取开启的值|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "count": "string",
  "data": [
    {
      "id": 0,
      "minname": "string",
      "name": "string",
      "state": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||id|
|»» minname|string|false|none||简称|
|»» name|string|false|none||名称|
|»» state|integer|false|none||状态，0表示关闭|

## GET 获取一级科室列表

GET /simple/getDepOne

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|hosId|query|string| 否 |分院id，如果不传递则获取全部|
|paging|query|string| 否 |固定值on，如果传递此参数则开启分页|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 3,
      "hosId": 2,
      "name": "内科",
      "state": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||id|
|»» hosId|integer|false|none||分院id|
|»» name|string|false|none||名称|
|»» state|integer|false|none||状态，0表示关闭|

## GET 获取二级科室列表

GET /simple/getDepTwo

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|depId|query|string| 否 |一级科室id，如果不传递则获取全部|
|paging|query|string| 否 |固定值on，如果传递此参数则开启分页|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 4,
      "depId": 3,
      "hosId": 2,
      "depName": "内科",
      "name": "呼吸内科",
      "address": "急诊大楼501",
      "state": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||id|
|»» depId|integer|false|none||一级科室id|
|»» hosId|integer|false|none||分院id|
|»» depName|string|false|none||一级科室名称|
|»» name|string|false|none||名称|
|»» address|string|false|none||地址|
|»» state|integer|false|none||状态，0表示关闭|

## POST 添加医生

POST /admin/dep/addDoctor

> Body 请求参数

```yaml
photo: string
name: string
hosId: 0
depId: 0
depTwoId: 0
position: string
reg: 0
dia: 0
brief: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» photo|body|string(binary)| 是 |头像，限制png和jpg格式，5MB之内|
|» name|body|string| 是 |姓名|
|» hosId|body|integer| 是 |分院id|
|» depId|body|integer| 是 |一级科室id|
|» depTwoId|body|integer| 是 |二级科室id|
|» position|body|string| 是 |职称，['主治医师', '主任医师', '副主任医师']|
|» reg|body|integer| 是 |挂号费|
|» dia|body|integer| 否 |诊查费，默认0.00|
|» brief|body|string| 是 |简介，200字之内|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## DELETE 删除医生

DELETE /admin/dep/delDoctor

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|integer| 否 |医生id|
|Authorization|header|string| 是 |管理员token，需写携带Bearer|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## PUT 开启或关闭医生

PUT /admin/dep/switchDoctor

> Body 请求参数

```yaml
state: 0
id: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» state|body|integer| 是 |开启或关闭，1表示开启，0表示关闭|
|» id|body|string| 是 |医生id|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 获取医生列表

GET /simple/getDoctor

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|depTwoId|query|string| 否 |二级科室id，如果不传递则获取全部|
|paging|query|string| 否 |固定值on，如果传递此参数则开启分页|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "赵马",
      "photo": "/images/doctor/photo-1658843317509.jpg",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "position": "主任医师",
      "reg": "60",
      "dia": "",
      "brief": "医生简介",
      "state": 1
    },
    {
      "id": 2,
      "name": "找李四",
      "photo": "/images/doctor/photo-1659190077028.jpg",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "position": "主治医师",
      "reg": "60",
      "dia": "5",
      "brief": "简介",
      "state": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|integer|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» name|string|true|none||none|
|»» photo|string|true|none||none|
|»» hosId|integer|true|none||none|
|»» depId|integer|true|none||none|
|»» depTwoId|integer|true|none||none|
|»» position|string|true|none||none|
|»» reg|string|true|none||none|
|»» dia|string|true|none||none|
|»» brief|string|true|none||none|
|»» state|integer|true|none||none|

## POST 修改医院信息

POST /admin/dep/moddepHos

提交哪个就是修改哪个，至少提交一项

> Body 请求参数

```yaml
minname: string
name: string
hosId: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» minname|body|string| 否 |简称|
|» name|body|string| 否 |全称|
|» hosId|body|string| 是 |医院id|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 修改一级科室信息

POST /admin/dep/moddepOne

> Body 请求参数

```yaml
name: string
depId: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» name|body|string| 否 |全称|
|» depId|body|string| 是 |一级科室id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 修改二级科室信息

POST /admin/dep/moddepTwo

提交某个参数则修改某个参数，至少提交一个项目

> Body 请求参数

```yaml
name: string
address: string
depTwoId: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» name|body|string| 否 |全称|
|» address|body|string| 否 |地址|
|» depTwoId|body|string| 是 |二级科室id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 修改医生信息 

POST /admin/dep/moddepDoc

提交某个参数则修改某个参数，至少提交一个项目

> Body 请求参数

```yaml
doctorId: 0
name: string
position: string
reg: 0
dia: 0
brief: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» doctorId|body|integer| 是 |医生id|
|» name|body|string| 否 |医生名称|
|» position|body|string| 否 |职称，'主治医师', '主任医师', '副主任医师'|
|» reg|body|number| 否 |挂号费|
|» dia|body|number| 否 |问诊费|
|» brief|body|string| 否 |医生简介|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 修改医生照片

POST /admin/dep/moddepDocImg

> Body 请求参数

```yaml
doctorId: 0
photo: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» doctorId|body|integer| 是 |医生id|
|» photo|body|string(binary)| 是 |医生头像|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功",
  "photo": "/images/doctor/photo-1659798654328.png"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» photo|string|true|none||none|

## GET 获取医生信息详情

GET /simple/getDoctorInfo

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |医生id|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 预约挂号

## POST 用户预约

POST /simple/getDepTwo

> Body 请求参数

```yaml
patId: 0
type: string
price: string
time: string
datetime: string
depTwoId: 0
hosName: string
doctorId: 0

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|
|body|body|object| 否 |none|
|» patId|body|integer| 是 |就诊人id|
|» type|body|string| 是 |挂号类型，专家号普通号|
|» price|body|string| 是 |需支付费用|
|» time|body|string| 是 |预约的就诊日期|
|» datetime|body|string| 是 |预约的就诊时间|
|» depTwoId|body|integer| 是 |二级科室id|
|» hosName|body|string| 是 |分院名称|
|» doctorId|body|integer| 是 |医生id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "预约成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 用户取消预约

POST /make/cancelMake

> Body 请求参数

```yaml
id: 0
remarks: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |用户token，需携带Bearer|
|body|body|object| 否 |none|
|» id|body|integer| 是 |预约id|
|» remarks|body|string| 是 |取消原因|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "取消成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 用户获取预约列表

GET /make/userGetList

不传入任何参数表示获取当前用户下所有列表
id表示获取预约详情
patId表示获取就诊人下预约列表
state表示分类获取

id参数存在时，其他参数失效
patId和state参数需同时存在

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 否 |预约id|
|state|query|string| 否 |预约状态，0表示正在排队，1以完成，2以取消|
|patId|query|string| 否 |就诊人id|
|Authorization|header|string| 是 |用户token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "rows": [
    {
      "id": 1,
      "userId": 1,
      "patId": 1,
      "name": "张三",
      "card": "202208564456",
      "idCard": "622225200209561516",
      "phone": "18096654833",
      "type": "专家号",
      "price": 60,
      "state": 0,
      "time": "2022年7月27日周三上午",
      "datetime": "9.30",
      "createTime": "2022-07-27 21:25:56",
      "depName": "内科-呼吸内科",
      "hosName": "东院",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "doctorName": "赵马",
      "doctorId": 1,
      "position": "主任医师",
      "remarks": "undefined"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» rows|[object]|true|none||none|
|»» id|integer|true|none||id|
|»» userId|integer|true|none||用户id|
|»» patId|integer|true|none||就诊人id|
|»» name|string|true|none||就诊人姓名|
|»» card|string|true|none||就诊卡号|
|»» idCard|string|true|none||身份证号|
|»» phone|string|true|none||手机号|
|»» type|string|true|none||预约类型|
|»» price|integer|true|none||支付费用|
|»» state|integer|true|none||状态，0表示等待，1表示以完成，2是以取消|
|»» time|string|true|none||所预约日期|
|»» datetime|string|true|none||所预约时间|
|»» createTime|string|true|none||预约提交时间|
|»» depName|string|true|none||科室|
|»» hosName|string|true|none||医院名称|
|»» hosId|integer|true|none||医院id|
|»» depId|integer|true|none||一级科室id|
|»» depTwoId|integer|true|none||二级科室id|
|»» doctorName|string|true|none||医生姓名|
|»» doctorId|integer|true|none||医生id|
|»» position|string|true|none||医生职称|
|»» remarks|string|true|none||备注|

## GET 获取预约详情

GET /make/getMakeInf

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |预约id|
|Authorization|header|string| 否 |token，需携带BEarer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "rows": [
    {
      "id": 1,
      "userId": 1,
      "patId": 1,
      "name": "张三",
      "card": "202208564456",
      "idCard": "622225200209561516",
      "phone": "18096654833",
      "type": "专家号",
      "price": 60,
      "state": 0,
      "time": "2022年7月27日周三上午",
      "datetime": "9.30",
      "createTime": "2022-07-27 21:25:56",
      "depName": "内科-呼吸内科",
      "hosName": "东院",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "doctorName": "赵马",
      "doctorId": 1,
      "position": "主任医师",
      "remarks": "undefined"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» rows|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» userId|integer|false|none||none|
|»» patId|integer|false|none||none|
|»» name|string|false|none||none|
|»» card|string|false|none||none|
|»» idCard|string|false|none||none|
|»» phone|string|false|none||none|
|»» type|string|false|none||none|
|»» price|integer|false|none||none|
|»» state|integer|false|none||none|
|»» time|string|false|none||none|
|»» datetime|string|false|none||none|
|»» createTime|string|false|none||none|
|»» depName|string|false|none||none|
|»» hosName|string|false|none||none|
|»» hosId|integer|false|none||none|
|»» depId|integer|false|none||none|
|»» depTwoId|integer|false|none||none|
|»» doctorName|string|false|none||none|
|»» doctorId|integer|false|none||none|
|»» position|string|false|none||none|
|»» remarks|string|false|none||none|

## GET 管理员获取预约列表

GET /make/admin/makeList

传入某个参数则按照传入参数条件搜索，附加state参数则获取此条件下state状态的预约
限制单一条件搜索

直接传入state参数则分类获取

支持分页，默认每页10条

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|name|query|string| 否 |就诊人姓名，支持模糊搜索|
|userId|query|integer| 否 |用户id|
|patId|query|integer| 否 |就诊人id|
|card|query|integer| 否 |就诊卡号|
|depTwoId|query|integer| 否 |二级科室id|
|state|query|integer| 否 |状态|
|page|query|integer| 否 |页码|
|limit|query|integer| 否 |每页数量|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "data": [
    {
      "id": 2,
      "userId": 1,
      "patId": 1,
      "name": "张三",
      "card": "202208564456",
      "idCard": "622225200209561516",
      "phone": "18096654833",
      "type": "专家号",
      "price": 60,
      "state": 2,
      "time": "2022年7月27日周三上午",
      "datetime": "9.30",
      "createTime": "2022-07-27 21:27:31",
      "depName": "内科-呼吸内科",
      "hosName": "东院",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "doctorName": "赵马",
      "doctorId": 1,
      "position": "主任医师",
      "remarks": "没时间"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» userId|integer|false|none||none|
|»» patId|integer|false|none||none|
|»» name|string|false|none||none|
|»» card|string|false|none||none|
|»» idCard|string|false|none||none|
|»» phone|string|false|none||none|
|»» type|string|false|none||none|
|»» price|integer|false|none||none|
|»» state|integer|false|none||none|
|»» time|string|false|none||none|
|»» datetime|string|false|none||none|
|»» createTime|string|false|none||none|
|»» depName|string|false|none||none|
|»» hosName|string|false|none||none|
|»» hosId|integer|false|none||none|
|»» depId|integer|false|none||none|
|»» depTwoId|integer|false|none||none|
|»» doctorName|string|false|none||none|
|»» doctorId|integer|false|none||none|
|»» position|string|false|none||none|
|»» remarks|string|false|none||none|

## GET 医生获取名下预约

GET /make/doctorMake

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|doctorId|query|integer| 是 |医生id|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量|
|state|query|string| 否 |状态，0待处理，1已完成，2以取消|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 1,
  "rows": [
    {
      "id": 1,
      "userId": 1,
      "patId": 1,
      "name": "张三",
      "card": "202208564456",
      "idCard": "622225200209561516",
      "phone": "18096654833",
      "type": "专家号",
      "price": 60,
      "state": 0,
      "time": "2022年7月27日周三上午",
      "datetime": "9.30",
      "createTime": "2022-07-27 21:25:56",
      "depName": "内科-呼吸内科",
      "hosName": "东院",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "doctorName": "赵马",
      "doctorId": 1,
      "position": "主任医师",
      "remarks": "undefined"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|string|true|none||none|
|» rows|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» userId|integer|false|none||none|
|»» patId|integer|false|none||none|
|»» name|string|false|none||none|
|»» card|string|false|none||none|
|»» idCard|string|false|none||none|
|»» phone|string|false|none||none|
|»» type|string|false|none||none|
|»» price|integer|false|none||none|
|»» state|integer|false|none||none|
|»» time|string|false|none||none|
|»» datetime|string|false|none||none|
|»» createTime|string|false|none||none|
|»» depName|string|false|none||none|
|»» hosName|string|false|none||none|
|»» hosId|integer|false|none||none|
|»» depId|integer|false|none||none|
|»» depTwoId|integer|false|none||none|
|»» doctorName|string|false|none||none|
|»» doctorId|integer|false|none||none|
|»» position|string|false|none||none|
|»» remarks|string|false|none||none|

## PUT 完成预约

PUT /make/endMake

扣款，不足则添加至缴费

> Body 请求参数

```yaml
id: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token|
|body|body|object| 否 |none|
|» id|body|string| 是 |预约id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "已完成，扣款成功"
}
```

> 已完成，创建订单

```json
{
  "code": 202,
  "msg": "已完成，余额不足，以创建缴费订单"
}
```

> 已完成，创建失败

```json
{
  "code": 204,
  "msg": "已完成，缴费订单创建失败"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|
|202|[Accepted](https://tools.ietf.org/html/rfc7231#section-6.3.3)|已完成，创建订单|Inline|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|已完成，创建失败|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||none|

状态码 **202**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

状态码 **204**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

# 医生排班/获取

## POST 添加医生排班

POST /arrange/admin/createArrange

同一个时间段同一位医生不可以多次添加，但同一个日期可添加多个时间段，例如9.30-10.00,10.00-11.00

上午和下午的状态state权重最高，当为1时，此阶段全部数据为休息

> Body 请求参数

```yaml
doctorId: string
hosId: string
depTwoId: string
time: string
MtimeSegment: string
Mnum: string
Mstate: string
AtimeSegment: string
Anum: string
Astate: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» doctorId|body|string| 是 |医生id|
|» hosId|body|string| 是 |医院id|
|» depTwoId|body|string| 是 |二级科室id|
|» time|body|string| 是 |日期|
|» MtimeSegment|body|string| 是 |上午时间段，格式：时.分-时.分，例如9.30-11.30|
|» Mnum|body|string| 否 |上午时间段号原数量，默认10|
|» Mstate|body|string| 否 |上午状态，0表示排班，1表示休息，默认0|
|» AtimeSegment|body|string| 否 |下午时间段，格式：时.分-时.分，例如9.30-11.30|
|» Anum|body|string| 否 |下午时间段号原数量|
|» Astate|body|string| 否 |下午状态，0表示排班，1表示休息，默认为0|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 编辑医生排班

POST /arrange/admin/modeArrange

提交某个值表示修改某个值，至少提交一项修改内容

> Body 请求参数

```yaml
id: string
MtimeSegment: string
Mnum: string
Msurplus: string
Mstate: string
AtimeSegment: string
Anum: string
Astaet: string
Asurplus: string

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |管理员token，需携带Bearer|
|body|body|object| 否 |none|
|» id|body|string| 是 |需修改日期对应id|
|» MtimeSegment|body|string| 否 |上午时间段，格式：时.分-时.分，例如9.30-11.30|
|» Mnum|body|string| 否 |上午时间段号原数量，默认10|
|» Msurplus|body|string| 否 |上午预约剩余数量|
|» Mstate|body|string| 否 |上午状态，0表示排班，1表示休息，默认0|
|» AtimeSegment|body|string| 否 |下午时间段，格式：时.分-时.分，例如9.30-11.30|
|» Anum|body|string| 否 |下午时间段号原数量|
|» Astaet|body|string| 否 |下午状态，0表示排班，1表示休息，默认为0|
|» Asurplus|body|string| 否 |下午预约剩余数量|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 获取排班列表

GET /arrange/admin/getList

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|week|query|string| 是 |周次，0表示上一周，1表示当前，2表示下一周|
|page|query|string| 否 |页码|
|limit|query|string| 否 |每页数量，默认10|
|Authorization|header|string| 是 |管理员token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "count": 2,
  "data": [
    {
      "id": 2,
      "doctorName": "赵马",
      "doctorId": 1,
      "hosName": "北京市第一人民医院-东院",
      "hosId": 2,
      "depName": "内科-呼吸内科",
      "id1": 2,
      "time1": "2022-07-31T16:00:00.000Z",
      "MtimeSegment1": "9.20-11.00",
      "Mnum1": "20",
      "Msurplus1": "20",
      "Mstate1": 0,
      "AtimeSegment1": "休息",
      "Anum1": "休息",
      "Asurplus1": "休息",
      "Astate1": 1,
      "id2": 3,
      "time2": "2022-08-01T16:00:00.000Z",
      "MtimeSegment2": "9.20-11.00",
      "Mnum2": "20",
      "Msurplus2": "20",
      "AtimeSegment2": "休息",
      "Anum2": "休息",
      "Asurplus2": "休息",
      "Astate2": 1,
      "id3": null,
      "time3": null,
      "MtimeSegment3": null,
      "Mnum3": null,
      "Msurplus3": null,
      "Mstate3": null,
      "AtimeSegment3": null,
      "Anum3": null,
      "Asurplus3": null,
      "Astate3": null,
      "id4": null,
      "time4": null,
      "MtimeSegment4": null,
      "Mnum4": null,
      "Msurplus4": null,
      "Mstate4": null,
      "AtimeSegment4": null,
      "Anum4": null,
      "Asurplus4": null,
      "Astate4": null,
      "id5": null,
      "time5": null,
      "MtimeSegment5": null,
      "Mnum5": null,
      "Msurplus5": null,
      "Mstate5": null,
      "AtimeSegment5": null,
      "Anum5": null,
      "Asurplus5": null,
      "Astate5": null,
      "id6": null,
      "time6": null,
      "MtimeSegment6": null,
      "Mnum6": null,
      "Msurplus6": null,
      "Mstate6": null,
      "AtimeSegment6": null,
      "Anum6": null,
      "Asurplus6": null,
      "Astate6": null,
      "id7": null,
      "time7": null,
      "MtimeSegment7": null,
      "Mnum7": null,
      "Msurplus7": null,
      "Mstate7": null,
      "AtimeSegment7": null,
      "Anum7": null,
      "Asurplus7": null,
      "Astate7": null
    },
    {
      "id": 4,
      "doctorName": "找李四",
      "doctorId": 2,
      "hosName": "北京市第一人民医院-东院",
      "hosId": 2,
      "depName": "内科-呼吸内科",
      "id1": null,
      "time1": null,
      "MtimeSegment1": null,
      "Mnum1": null,
      "Msurplus1": null,
      "Mstate1": null,
      "AtimeSegment1": null,
      "Anum1": null,
      "Asurplus1": null,
      "Astate1": null,
      "id2": null,
      "time2": null,
      "MtimeSegment2": null,
      "Mnum2": null,
      "Msurplus2": null,
      "AtimeSegment2": null,
      "Anum2": null,
      "Asurplus2": null,
      "Astate2": null,
      "id3": 4,
      "time3": "2022-08-02T16:00:00.000Z",
      "MtimeSegment3": "休息",
      "Mnum3": "休息",
      "Msurplus3": "休息",
      "Mstate3": 1,
      "AtimeSegment3": "14.00-16.00",
      "Anum3": "20",
      "Asurplus3": "20",
      "Astate3": 0,
      "id4": null,
      "time4": null,
      "MtimeSegment4": null,
      "Mnum4": null,
      "Msurplus4": null,
      "Mstate4": null,
      "AtimeSegment4": null,
      "Anum4": null,
      "Asurplus4": null,
      "Astate4": null,
      "id5": null,
      "time5": null,
      "MtimeSegment5": null,
      "Mnum5": null,
      "Msurplus5": null,
      "Mstate5": null,
      "AtimeSegment5": null,
      "Anum5": null,
      "Asurplus5": null,
      "Astate5": null,
      "id6": null,
      "time6": null,
      "MtimeSegment6": null,
      "Mnum6": null,
      "Msurplus6": null,
      "Mstate6": null,
      "AtimeSegment6": null,
      "Anum6": null,
      "Asurplus6": null,
      "Astate6": null,
      "id7": null,
      "time7": null,
      "MtimeSegment7": null,
      "Mnum7": null,
      "Msurplus7": null,
      "Mstate7": null,
      "AtimeSegment7": null,
      "Anum7": null,
      "Asurplus7": null,
      "Astate7": null
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||状态码|
|» msg|string|true|none||返回提示|
|» count|integer|true|none||总数|
|» data|[object]|true|none||数据列表|
|»» id|integer|true|none||数据id|
|»» doctorName|string|true|none||医生姓名|
|»» doctorId|integer|true|none||医生id|
|»» hosName|string|true|none||医院名称|
|»» hosId|integer|true|none||医院id|
|»» depName|string|true|none||所属二级科室|
|»» id1|integer|true|none||周一数据对应id|
|»» time1|string|true|none||周一日期|
|»» MtimeSegment1|string|true|none||周一上午时间段|
|»» Mnum1|string|true|none||周一上午数量|
|»» Msurplus1|string|true|none||周一上午剩余数量|
|»» Mstate1|integer|true|none||周一上午状态|
|»» AtimeSegment1|string|true|none||周一下午时间段|
|»» Anum1|string|true|none||周一下午数量|
|»» Asurplus1|string|true|none||周一下午剩余数量|
|»» Astate1|integer|true|none||周一下午状态，0表示正常，1表示休息|
|»» id2|integer|true|none||周二对应数据id|
|»» time2|string|true|none||周二|
|»» MtimeSegment2|string|true|none||none|
|»» Mnum2|string|true|none||none|
|»» Msurplus2|string|true|none||none|
|»» AtimeSegment2|string|true|none||none|
|»» Anum2|string|true|none||none|
|»» Asurplus2|string|true|none||none|
|»» Astate2|integer|true|none||none|
|»» time3|string|true|none||周三|
|»» MtimeSegment3|string|true|none||none|
|»» Mnum3|string|true|none||none|
|»» Msurplus3|string|true|none||none|
|»» Mstate3|integer|true|none||none|
|»» AtimeSegment3|string|true|none||none|
|»» Anum3|string|true|none||none|
|»» Asurplus3|string|true|none||none|
|»» Astate3|integer|true|none||none|
|»» time4|null|true|none||周四|
|»» MtimeSegment4|null|true|none||none|
|»» Mnum4|null|true|none||none|
|»» Msurplus4|null|true|none||none|
|»» Mstate4|null|true|none||none|
|»» AtimeSegment4|null|true|none||none|
|»» Anum4|null|true|none||none|
|»» Asurplus4|null|true|none||none|
|»» Astate4|null|true|none||none|
|»» time5|null|true|none||周五|
|»» MtimeSegment5|null|true|none||none|
|»» Mnum5|null|true|none||none|
|»» Msurplus5|null|true|none||none|
|»» Mstate5|null|true|none||none|
|»» AtimeSegment5|null|true|none||none|
|»» Anum5|null|true|none||none|
|»» Asurplus5|null|true|none||none|
|»» Astate5|null|true|none||none|
|»» time6|null|true|none||周六|
|»» MtimeSegment6|null|true|none||none|
|»» Mnum6|null|true|none||none|
|»» Msurplus6|null|true|none||none|
|»» Mstate6|null|true|none||none|
|»» AtimeSegment6|null|true|none||none|
|»» Anum6|null|true|none||none|
|»» Asurplus6|null|true|none||none|
|»» Astate6|null|true|none||none|
|»» time7|null|true|none||周日|
|»» MtimeSegment7|null|true|none||none|
|»» Mnum7|null|true|none||none|
|»» Msurplus7|null|true|none||none|
|»» Mstate7|null|true|none||none|
|»» AtimeSegment7|null|true|none||none|
|»» Anum7|null|true|none||none|
|»» Asurplus7|null|true|none||none|
|»» Astate7|null|true|none||none|

## DELETE 删除一个排班

DELETE /arrange/admin/del

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |某条数据id|
|Authorization|header|string| 是 |管理员token，需提交Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 获取医生一周内排班情况

GET /arrange/admin/weekArrange

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|week|query|string| 是 |周次，0表示上一周，1表示现在，2表示下一周|
|doctorId|query|string| 是 |医生id|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 200 Response

```json
{
  "code": 0,
  "msg": "string",
  "count": "string",
  "data": [
    {
      "id": 0,
      "doctorName": "string",
      "doctorId": 0,
      "hosName": "string",
      "hosId": 0,
      "depName": "string",
      "id1": null,
      "time1": null,
      "MtimeSegment1": null,
      "Mnum1": null,
      "Msurplus1": null,
      "Mstate1": null,
      "AtimeSegment1": null,
      "Anum1": null,
      "Asurplus1": null,
      "Astate1": null,
      "id2": null,
      "time2": null,
      "MtimeSegment2": null,
      "Mnum2": null,
      "Msurplus2": null,
      "AtimeSegment2": null,
      "Anum2": null,
      "Asurplus2": null,
      "Astate2": null,
      "id3": 0,
      "time3": "string",
      "MtimeSegment3": "string",
      "Mnum3": "string",
      "Msurplus3": "string",
      "Mstate3": 0,
      "AtimeSegment3": "string",
      "Anum3": "string",
      "Asurplus3": "string",
      "Astate3": 0,
      "id4": null,
      "time4": null,
      "MtimeSegment4": null,
      "Mnum4": null,
      "Msurplus4": null,
      "Mstate4": null,
      "AtimeSegment4": null,
      "Anum4": null,
      "Asurplus4": null,
      "Astate4": null,
      "id5": null,
      "time5": null,
      "MtimeSegment5": null,
      "Mnum5": null,
      "Msurplus5": null,
      "Mstate5": null,
      "AtimeSegment5": null,
      "Anum5": null,
      "Asurplus5": null,
      "Astate5": null,
      "id6": null,
      "time6": null,
      "MtimeSegment6": null,
      "Mnum6": null,
      "Msurplus6": null,
      "Mstate6": null,
      "AtimeSegment6": null,
      "Anum6": null,
      "Asurplus6": null,
      "Astate6": null,
      "id7": null,
      "time7": null,
      "MtimeSegment7": null,
      "Mnum7": null,
      "Msurplus7": null,
      "Mstate7": null,
      "AtimeSegment7": null,
      "Anum7": null,
      "Asurplus7": null,
      "Astate7": null
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» count|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||总id|
|»» doctorName|string|false|none||医生名称|
|»» doctorId|integer|false|none||医生id|
|»» hosName|string|false|none||医院名称|
|»» hosId|integer|false|none||医院id|
|»» depName|string|false|none||二级科室名称|
|»» id1|null|false|none||周一对应数据id|
|»» time1|null|false|none||周一日期|
|»» MtimeSegment1|null|false|none||周一上午时间段|
|»» Mnum1|null|false|none||周一上午数量|
|»» Msurplus1|null|false|none||周一上午余量|
|»» Mstate1|null|false|none||周一上午状态，1表示休息|
|»» AtimeSegment1|null|false|none||周一下午时间段|
|»» Anum1|null|false|none||周一下午数量|
|»» Asurplus1|null|false|none||周一下午余量|
|»» Astate1|null|false|none||周一下午状态|
|»» id2|null|false|none||none|
|»» time2|null|false|none||none|
|»» MtimeSegment2|null|false|none||none|
|»» Mnum2|null|false|none||none|
|»» Msurplus2|null|false|none||none|
|»» AtimeSegment2|null|false|none||none|
|»» Anum2|null|false|none||none|
|»» Asurplus2|null|false|none||none|
|»» Astate2|null|false|none||none|
|»» id3|integer|false|none||none|
|»» time3|string|false|none||none|
|»» MtimeSegment3|string|false|none||none|
|»» Mnum3|string|false|none||none|
|»» Msurplus3|string|false|none||none|
|»» Mstate3|integer|false|none||none|
|»» AtimeSegment3|string|false|none||none|
|»» Anum3|string|false|none||none|
|»» Asurplus3|string|false|none||none|
|»» Astate3|integer|false|none||none|
|»» id4|null|false|none||none|
|»» time4|null|false|none||none|
|»» MtimeSegment4|null|false|none||none|
|»» Mnum4|null|false|none||none|
|»» Msurplus4|null|false|none||none|
|»» Mstate4|null|false|none||none|
|»» AtimeSegment4|null|false|none||none|
|»» Anum4|null|false|none||none|
|»» Asurplus4|null|false|none||none|
|»» Astate4|null|false|none||none|
|»» id5|null|false|none||none|
|»» time5|null|false|none||none|
|»» MtimeSegment5|null|false|none||none|
|»» Mnum5|null|false|none||none|
|»» Msurplus5|null|false|none||none|
|»» Mstate5|null|false|none||none|
|»» AtimeSegment5|null|false|none||none|
|»» Anum5|null|false|none||none|
|»» Asurplus5|null|false|none||none|
|»» Astate5|null|false|none||none|
|»» id6|null|false|none||none|
|»» time6|null|false|none||none|
|»» MtimeSegment6|null|false|none||none|
|»» Mnum6|null|false|none||none|
|»» Msurplus6|null|false|none||none|
|»» Mstate6|null|false|none||none|
|»» AtimeSegment6|null|false|none||none|
|»» Anum6|null|false|none||none|
|»» Asurplus6|null|false|none||none|
|»» Astate6|null|false|none||none|
|»» id7|null|false|none||none|
|»» time7|null|false|none||none|
|»» MtimeSegment7|null|false|none||none|
|»» Mnum7|null|false|none||none|
|»» Msurplus7|null|false|none||none|
|»» Mstate7|null|false|none||none|
|»» AtimeSegment7|null|false|none||none|
|»» Anum7|null|false|none||none|
|»» Asurplus7|null|false|none||none|
|»» Astate7|null|false|none||none|

## GET 用户通过日期获取医生列表

GET /arrange/fromTime

根据科室获取指定id下可选择医生列表，返回医生信息，预约时间段，数量

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|time|query|string| 是 |日期|
|depTwoId|query|string| 是 |搜选科室id|
|Authorization|header|string| 否 |token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "name": "赵马",
      "photo": "/images/doctor/photo-1658843317509.jpg",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "position": "主任医师",
      "reg": "60",
      "dia": "",
      "brief": "医生简介",
      "state": 0
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||医生id|
|»» name|string|false|none||医生名字|
|»» photo|string|false|none||头像|
|»» hosId|integer|false|none||分院id|
|»» depId|integer|false|none||一级科室id|
|»» depTwoId|integer|false|none||二级科室id|
|»» position|string|false|none||职称|
|»» reg|string|false|none||挂号费|
|»» dia|string|false|none||诊费|
|»» brief|string|false|none||简介|
|»» state|integer|false|none||状态，0表示关闭|

## GET 用户获取当天医生可预约列表

GET /arrange/fromDoctor

返回医生信息，预约日期，时间段，数量

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|doctorId|query|integer| 是 |医生id|
|time|query|string| 是 |日期|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 1,
      "name": "赵马",
      "photo": "/images/doctor/photo-1658843317509.jpg",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "position": "主任医师",
      "reg": "60",
      "dia": "",
      "brief": "医生简介",
      "state": 1,
      "rows": [
        {
          "id": 3,
          "doctorName": "赵马",
          "doctorId": 1,
          "hosName": "北京市第一人民医院-东院",
          "hosId": 2,
          "depName": "内科-呼吸内科",
          "depTwoId": 4,
          "time": "2022-08-01T16:00:00.000Z",
          "MtimeSegment": "9.20-11.00",
          "Mnum": 20,
          "Msurplus": 20,
          "Mstate": 0,
          "AtimeSegment": "0",
          "Anum": 10,
          "Asurplus": 10,
          "Astate": 1
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||医生id|
|»» name|string|false|none||医生名称|
|»» photo|string|false|none||医生头像|
|»» hosId|integer|false|none||医院id|
|»» depId|integer|false|none||一级科室id|
|»» depTwoId|integer|false|none||二级科室id|
|»» position|string|false|none||职称|
|»» reg|string|false|none||诊费|
|»» dia|string|false|none||问诊费|
|»» brief|string|false|none||简介|
|»» state|integer|false|none||医生状态，0表示关闭|
|»» rows|[object]|false|none||当天可预约日期列表|
|»»» id|integer|false|none||此条数据对应id|
|»»» doctorName|string|false|none||医生姓名|
|»»» doctorId|integer|false|none||医生id|
|»»» hosName|string|false|none||医院名称|
|»»» hosId|integer|false|none||医院id|
|»»» depName|string|false|none||科室名称|
|»»» depTwoId|integer|false|none||二级科室id|
|»»» time|string|false|none||日期|
|»»» MtimeSegment|string|false|none||上午时间段|
|»»» Mnum|integer|false|none||上午可预约数量|
|»»» Msurplus|integer|false|none||上午余量|
|»»» Mstate|integer|false|none||上午状态，1表示休息|
|»»» AtimeSegment|string|false|none||下午时间段|
|»»» Anum|integer|false|none||下午可预约数量|
|»»» Asurplus|integer|false|none||下午余量|
|»»» Astate|integer|false|none||下午状态|

## GET 获取此科室其他医生推荐

GET /arrange/redDoctor

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|doctorId|query|string| 是 |当前医生id|
|depTwoId|query|string| 是 |当前二级科室id|
|Authorization|header|string| 是 |token，需携带Bearer|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "获取成功",
  "data": [
    {
      "id": 2,
      "name": "找李四",
      "photo": "/images/doctor/photo-1659190077028.jpg",
      "hosId": 2,
      "depId": 3,
      "depTwoId": 4,
      "position": "主治医师",
      "reg": "60",
      "dia": "5",
      "brief": "简介",
      "state": 1
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» name|string|false|none||none|
|»» photo|string|false|none||none|
|»» hosId|integer|false|none||none|
|»» depId|integer|false|none||none|
|»» depTwoId|integer|false|none||none|
|»» position|string|false|none||none|
|»» reg|string|false|none||none|
|»» dia|string|false|none||none|
|»» brief|string|false|none||none|
|»» state|integer|false|none||none|

# 数据模型

