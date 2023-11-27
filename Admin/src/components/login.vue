<template>
    <div class="main">
        <div class="bacg left"></div>
        <div class="loginBox">
            <p class="title">登录</p>
            <p class="minTitle">在线预约挂号服务平台管理端</p>
            <el-form class="form" :rules="rules" ref="loginForm" :model="user">
                <el-form-item prop="username">
                    <el-input prefix-icon="el-icon-user" placeholder="请输入登录账号" v-model="user.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input show-password prefix-icon="el-icon-warning-outline" placeholder="请输入密码"
                        v-model="user.password">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="bacg right"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            rules: {
                username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        }
    },
    methods: {
        login() {
            this.$refs.loginForm.validate(async (valid) => {
                if (!valid) return
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                })
                const { data: res } = await this.$http.post('api/adminLogin', {
                    username: this.user.username,
                    password: this.user.password,
                })
                loading.close()
                if (res.code == 200) {
                    this.$message.success('登录成功')
                    //获取当前面时间戳
                    var timestamp = Math.round(new Date().getTime() / 1000).toString()
                    localStorage.setItem('tokenStartTime', timestamp)
                    localStorage.setItem('adminToken', 'Bearer ' + res.token)
                    localStorage.setItem('adminName', res.adminName)
                    this.$router.push('/home')
                } else {
                    this.$message.error(res.msg)
                }
            })
        },
    },
}
</script>

<style lang="less" scoped>
.main {
    background-color: #fff;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    align-content: center;
    justify-content: center;

    .bacg {
        width: 30%;
        background-color: #fff;
        height: 100%;
        background-repeat: no-repeat;
        background-position: center;
        background-size: 50% 50%;
    }

    .left {
        background-image: url('../../images/u2669.svg');
    }

    .right {
        background-image: url('../../images/u2670.svg');
    }

    .loginBox {
        width: 440px;
        height: 510px;
        border-radius: 5px;
        background-color: #006eff;
        position: relative;
        top: calc(50% - 285px);
    }

    .title {
        font-size: 40px;
        margin: 0;
        color: #fff;
        width: 100%;
        text-align: center;
        margin-top: 40px;
    }

    .minTitle {
        font-size: 17px;
        text-align: center;
        color: #fff;
        margin-top: 25px;
        letter-spacing: 2px;
    }

    .form {
        margin: 0 auto;
        margin-top: 50px;
        width: 80%;

        .el-button {
            margin-top: 50px;
            width: 100%;
        }
    }
}
</style>