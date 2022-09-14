<template>
    <el-container>
        <!-- 头部区域 -->
        <el-header>
            <div class="title">预约挂号管理中心</div>
            <div class="back">
                <img src="../../images/u2705.svg" />
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">{{ adminName }}<i class="el-icon-arrow-down el-icon--right"
                            style="color: #000"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item><span @click="goBack">退出登录</span></el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisibleBack" width="380px">
                <span><i class="el-icon-warning-outline" style="margin-right: 10px"></i>是否确认退出??</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleBack = false">取 消</el-button>
                    <el-button type="warning" @click="readGoBack">确 定</el-button>
                </span>
            </el-dialog>
        </el-header>
        <el-container>
            <!-- 侧边栏菜单 -->
            <el-aside width="240px">
                <el-menu background-color="#1a7cff" text-color="#fff" active-text-color="#fff" :unique-opened="true"
                    :router="true" :default-active="menu">
                    <el-menu-item index="/index" @click="saveMenu('/index')">
                        <i class="el-icon-s-home"></i>
                        <span slot="title">首页</span>
                    </el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-phone"></i>
                            <span>预约管理</span>
                        </template>
                        <el-menu-item index="/makeList" @click="saveMenu('/makeList')">预约挂号</el-menu-item>
                        <el-menu-item index="/Scheduling" @click="saveMenu('/Scheduling')">医生排班</el-menu-item>
                        <el-menu-item index="/doctorMakeList" @click="saveMenu('/doctorMakeList')">医生名下</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-s-order"></i>
                            <span>费用管理</span>
                        </template>
                        <el-menu-item index="/order/recorder" @click="saveMenu('/order/recorder')">充值订单</el-menu-item>
                        <el-menu-item index="/order/payOrder" @click="saveMenu('/order/payOrder')">其他缴费</el-menu-item>
                        <el-menu-item index="/order/refund" @click="saveMenu('/order/refund')">退款管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                            <i class="el-icon-s-check"></i>
                            <span>人员科室</span>
                        </template>
                        <el-menu-item index="/dep/hospital" @click="saveMenu('/dep/hospital')">分院管理</el-menu-item>
                        <el-menu-item index="/dep/depOne" @click="saveMenu('/dep/depOne')">一级科室</el-menu-item>
                        <el-menu-item index="/dep/depTwo" @click="saveMenu('/dep/depTwo')">二级科室</el-menu-item>
                        <el-menu-item index="/dep/doctor" @click="saveMenu('/dep/doctor')">医生管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title">
                            <i class="el-icon-s-platform"></i>
                            <span>医院信息</span>
                        </template>
                        <el-menu-item index="/systemInfo/swiper" @click="saveMenu('/systemInfo/swiper')">轮播图设置
                        </el-menu-item>
                        <el-menu-item index="/systemInfo/navigation" @click="saveMenu('/systemInfo/navigation')">医院导航
                        </el-menu-item>
                        <el-menu-item index="/systemInfo/notice" @click="saveMenu('/systemInfo/notice')">医院公告
                        </el-menu-item>
                        <el-menu-item index="/systemInfo/encyclopedias" @click="saveMenu('/systemInfo/encyclopedias')">
                            健康百科
                        </el-menu-item>
                        <el-menu-item index="/systemInfo/share" @click="saveMenu('/systemInfo/share')">
                            文章分享</el-menu-item>
                        <el-menu-item index="/systemInfo/addDrticle" @click="saveMenu('/systemInfo/addDrticle')">
                            发布文章</el-menu-item>
                        <el-menu-item index="/systemInfo/feedback" @click="saveMenu('/systemInfo/feedback')">用户反馈
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="/users/userlist" @click="saveMenu('/users/userlist')">用户管理</el-menu-item>
                        <el-menu-item index="/users/depList" @click="saveMenu('/users/depList')">就诊人管理</el-menu-item>
                        <el-menu-item index="/users/Message" @click="saveMenu('/users/Message')">消息管理</el-menu-item>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title">
                            <i class="el-icon-s-tools"></i>
                            <span>系统设置</span>
                        </template>
                        <el-menu-item index="/set/addAdmin" @click="saveMenu('/set/addAdmin')">添加管理员</el-menu-item>
                        <el-menu-item index="/set/setPass" @click="saveMenu('/set/setPass')">信息修改</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- main区域 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            adminName: '',
            dialogVisibleBack: false,
            menu: '',
        }
    },
    mounted() {
        this.adminName = localStorage.getItem('adminName')
    },
    created() {
        this.menu = localStorage.getItem('menu')
    },
    methods: {
        goBack() {
            this.dialogVisibleBack = true
            console.log('this.dialogVisibleBack', this.dialogVisibleBack)
        },
        readGoBack() {
            this.dialogVisibleBack = false
            localStorage.setItem('adminName', '')
            localStorage.setItem('tokenStartTime', '')
            localStorage.setItem('menu', '')
            this.$router.push('/login')
        },
        saveMenu(menu) {
            localStorage.setItem('menu', menu)
            this.menu = menu
        },
    },
}
</script>

<style lang="less" scoped>
/deep/.el-icon-arrow-down:before {
    color: #fff !important;
}

.el-header {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    //   line-height: 60px;
    display: flex;
    padding: 0;
    margin: 0;
    justify-content: space-between;
    padding-right: 30px;
    box-sizing: border-box;
    box-shadow: 0px 5px 5px rgb(215 215 215 / 35%) !important;

    .title {
        font-size: 23px;
        color: #fff;
        background: #1a7cff;
        width: 240px;
        height: 60px;
        line-height: 60px;
    }

    .back {
        display: flex;
        align-items: center;
        padding-right: 15px;

        img {
            width: 40px;
            height: 40px;
            border-radius: 100%;
            background: #1a7cff;
            border: 1px solid #ccc;
            padding: 5px;
            box-sizing: border-box;
            margin-right: 10px;
        }

        .el-dropdown-link {
            //设置鼠标样式为手指
            cursor: pointer;
        }

        .el-icon-arrow-down:before {
            color: #000 !important;
            font-size: 16px;
        }
    }
}

.el-aside {
    background-color: #1a7cff;
    color: #333;
    //   text-align: center;
    line-height: 200px;

    .el-menu {
        border: 1px solid rgb(26, 124, 255);
        margin-top: 20px;

        .el-submenu .el-menu-item {
            padding-left: 70px !important;
        }

        i:before {
            color: #fff;
        }

        .el-icon-arrow-down:before {
            color: #fff;
            font-size: 16px;
        }
    }

    .el-menu-item:hover {
        background: #006eff !important;
    }

    .el-menu-item.is-active {
        background: #006eff !important;
    }

    .el-submenu__title:focus,
    .el-submenu__title:hover {
        background: #006eff !important;
    }

    .el-submenu /deep/ .el-submenu__title:hover {
        background: #006eff !important;
    }
}

.el-main {
    background-color: #f3f8ff;
    color: #333;
    text-align: center;
    margin-top: 5px;
    margin-right: 20px;
    margin-left: 20px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}

.el-container {
    height: 100%;
    overflow: auto;
}
</style>