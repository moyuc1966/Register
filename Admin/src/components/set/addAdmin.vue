<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">添加管理员</p>
        </div>
        <el-card class="cardTop">
            <p class="cardTitle">管理员注册</p>
            <el-form ref="form" label-width="110px" class="form" label-position="left">
                <el-form-item label="管理员昵称">
                    <el-input v-model="name" placeholder="请填写管理员昵称"></el-input>
                </el-form-item>
                <el-form-item label="管理员账号">
                    <el-input v-model="username" placeholder="请填写管理员登录账号"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码">
                    <el-input v-model="password" placeholder="请填写管理员密码,8-20位"></el-input>
                </el-form-item>
                <el-form-item label="重复密码">
                    <el-input v-model="newPassword" placeholder="请重复填写管理员密码"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="gender.label" @change="genderChange">
                        <el-radio border label="男"></el-radio>
                        <el-radio border label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="管理员邮箱">
                    <el-input v-model="email" placeholder="请填写管理员唯一邮箱"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 52px;display: flex;justify-content: flex-end;">
                    <el-button @click="again">重置</el-button>
                    <el-button type="primary" @click="submitForm">添加</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <div style="height:60px;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            newPassword: '',
            name: '',
            gender: {
                value: '0',
                label: '男',
            },
            email: '',
        }
    },
    methods: {
        again() {
            this.username = ''
            this.password = ''
            this.newPassword = ''
            this.name = ''
            this.gender = {
                value: '0',
                label: '男',
            }
            this.email = ''
        },
        genderChange(e) {
            let map = {
                '男': '0',
                '女': '1',
            }
            this.gender.value = map[e];
            console.log('this.gender', this.gender)
        },
        submitForm() {
            if (this.name == '' || this.username == '' || this.password == '' || this.newPassword == '' || this.email == '') {
                this.$message({
                    message: '请填写完整信息',
                    type: 'warning',
                })
                return
            } else if (this.password != this.newPassword) {
                this.$message({
                    message: '两次密码不一致',
                    type: 'warning',
                })
                return
            } else {
                let data = {
                    username: this.username,
                    password: this.password,
                    name: this.name,
                    email: this.email,
                    gender: this.gender.value,
                }
                this.$http.post('api/adminReg', data).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            message: '添加成功',
                            type: 'success',
                        })
                    } else {
                        this.$message({
                            message: res.data.msg,
                            type: 'warning',
                        })
                    }
                })
            }
        }
    }

}
</script>

<style lang="less" scoped>
.main {
    width: 100%;
    height: 100%;
    line-height: auto;

    .head {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        position: relative;

        .tag {
            height: 8px;
            width: 25px;
            border-radius: 4px;
            background-color: #1a7cff;
        }

        .tagTitle {
            font-size: 23px;
            color: #000;
            margin-left: 20px;
        }

    }


    .el-card {
        position: relative;
        box-shadow: 0px 0px 20px rgba(215, 215, 215, 1);
        overflow: auto;
        padding: 0;

        /deep/.el-card__body {
            padding: 0;
        }

        .cardTitle {
            display: block;
            color: #1a7cff;
            background: #f2f2f2;
            width: 100%;
            height: 55px;
            line-height: 55px;
            padding-left: 20px;
            text-align: left;
            box-sizing: border-box;
            margin: 0;
        }

        .cardBox {
            display: flex;
            justify-content: flex-start;
            padding: 15px 20px;
            flex-wrap: wrap;

            .cardBoxOne {
                min-width: 170px;

            }
        }

        .form {
            width: 480px;
            margin: 36px 0px 0 40px;
        }

    }


    .cardTop {
        margin-top: 30px;
        padding-bottom: 60px;
    }

}
</style>