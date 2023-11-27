<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">修改信息</p>
        </div>
        <el-card class="cardTop">
            <p class="cardTitle">填写某项则修改某项，都填写则都修改</p>
            <el-form label-position="left" label-width="100px" class="form">
                <el-form-item label="修改昵称">
                    <el-input v-model="name" placeholder="请输入新的昵称"></el-input>
                </el-form-item>
                <el-form-item label="修改账号">
                    <el-input v-model="username" placeholder="请输入新的账号"></el-input>
                </el-form-item>
                <el-form-item label="修改密码">
                    <el-input v-model="password" placeholder="请输入新的密码"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" v-if="password.length > 0">
                    <el-input v-model="newPassword" placeholder="请重复输入新密码"></el-input>
                </el-form-item>
                <el-form-item style="margin-top: 52px;display: flex;justify-content: flex-end;">
                    <el-button @click="again">重置</el-button>
                    <el-button type="primary" @click="submitForm">提交修改</el-button>
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
            name: '',
            username: '',
            password: '',
            newPassword: ''
        }
    },
    methods: {
        again() {
            this.name = ''
            this.username = ''
            this.password = ''
            this.newPassword = ''
            this.$message({
                message: '已重置',
                type: 'success'
            })

        },
        submitForm() {
            if (this.name == '' && this.username == '' && this.password == '' && this.newPassword == '') {
                this.$message({
                    message: '请填写修改信息',
                    type: 'error'
                })
                return
            }
            this.$confirm('是否确认修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                let data = '', url = '';

                if (this.name != '' && this.username == '' && this.password == '') {
                    url = 'modify/adminMod';
                    data = {
                        name: this.name
                    }
                } else if (this.name == '' && this.username != '' && this.password == '') {
                    url = 'modify/adminMod';
                    data = {
                        username: this.username
                    }
                } else if (this.name == '' && this.username == '' && this.password != '') {
                    if (this.password == this.newPassword) {
                        url = 'modify/adminModPass';
                        data = {
                            newpass: this.password
                        }
                    } else {
                        loading.close();
                        this.$message.error('两次密码不一致')
                    }
                } else if (this.name != '' && this.username != '' && this.password == '') {
                    url = 'modify/adminMod';
                    data = {
                        name: this.name,
                        username: this.username
                    }
                } else if (this.name != '' && this.username == '' && this.password != '') {
                    if (this.password == this.newPassword) {
                        data = {
                            name: this.name,
                            newpass: this.password
                        }
                    } else {
                        loading.close();
                        this.$message.error('两次密码不一致')
                    }
                } else if (this.name == '' && this.username != '' && this.password != '') {
                    if (this.password == this.newPassword) {
                        data = {
                            username: this.username,
                            newpass: this.password
                        }
                    } else {
                        loading.close();
                        this.$message.error('两次密码不一致')
                    }
                } else if (this.name != '' && this.username != '' && this.password != '') {
                    if (this.password == this.newPassword) {
                        data = {
                            name: this.name,
                            username: this.username,
                            newpass: this.password
                        }
                    } else {
                        loading.close();
                        this.$message.error('两次密码不一致')
                    }
                }
                if (url == '') {
                    let data = {
                        newpass: this.password
                    }
                    this.$http.post('modify/adminModPass', data).then(res => {
                        loading.close();
                        if (res.data.code == 200) {
                            data = {}
                            if (this.name != '' && this.username == '') {
                                data = {
                                    name: this.name
                                }
                            } else if (this.name == '' && this.username != '') {
                                data = {
                                    username: this.username
                                }
                            } else if (this.name != '' && this.username != '') {
                                data = {
                                    name: this.name,
                                    username: this.username
                                }
                            }
                            this.$http.post('modify/adminMod', data).then(res => {
                                if (res.data.code == 200) {
                                    this.$notify({
                                        title: '成功',
                                        message: '修改成功，请重新登录',
                                        type: 'success'
                                    });
                                    localStorage.setItem('adminName', '')
                                    localStorage.setItem('tokenStartTime', '')
                                    localStorage.setItem('menu', '')
                                    this.$router.push('/login')
                                } else {
                                    loading.close();
                                    this.$message.error(res.data.msg)
                                }
                            })
                        } else {
                            loading.close();
                            this.$message.error(res.data.msg)
                        }
                    })
                } else {
                    this.$http.post(url, data).then(res => {
                        loading.close();
                        if (res.data.code == 200) {
                            this.$notify({
                                title: '成功',
                                message: '修改成功，请重新登录',
                                type: 'success'
                            });
                            localStorage.setItem('adminName', '')
                            localStorage.setItem('tokenStartTime', '')
                            localStorage.setItem('menu', '')
                            this.$router.push('/login')
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                }

            }).catch(() => {

            });
        }
    },
    created() {

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
            width: 400px;
            margin: 36px 0px 0 40px;
        }

    }


    .cardTop {
        margin-top: 30px;
        padding-bottom: 60px;
    }

}
</style>