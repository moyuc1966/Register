<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">挂号详情</p>
            <el-button type="primary" @click="back" plain style="position:absolute;right:36px;">返回
            </el-button>
        </div>
        <el-card class="cardTop">
            <p class="cardTitle">患者信息</p>
            <div class="cardBox">
                <div class="cardBoxOne" style="width:28%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">患者姓名</p>
                        <p class="cardBoxOneContent">{{ patInfo.name }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">证件类型</p>
                        <p class="cardBoxOneContent">{{ patInfo.doctype }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">账号昵称</p>
                        <p class="cardBoxOneContent">{{ userInfo.name }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">患者地址</p>
                        <p class="cardBoxOneContent">{{ patInfo.addrss }}</p>
                    </div>
                </div>
                <div class="cardBoxOne" style="width:35%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">就诊卡号</p>
                        <p class="cardBoxOneContent">{{ patInfo.card }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">证件号</p>
                        <p class="cardBoxOneContent">{{ patInfo.certificate }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">手机号</p>
                        <p class="cardBoxOneContent">{{ patInfo.phone }}</p>
                    </div>
                </div>
                <div class="cardBoxTwo" style="width:36%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">患者头像</p>
                        <el-image class="avatar" style="width: 100px; height: 100px" :src="apiUrl + userInfo.avatar"
                            :preview-src-list="[apiUrl + userInfo.avatar]">
                        </el-image>
                    </div>
                    <div class="countBox countG">
                        <p class="cardBoxOneTitle">关系</p>
                        <p class="cardBoxOneContent">{{ patInfo.relation }}</p>
                    </div>
                </div>
            </div>
        </el-card>
        <!-- 充值订单 -->
        <el-card class="cardBottom" v-if="orderType == 'CZ'" style="height:auto;padding-bottom:35px;">
            <p class="cardTitle">充值订单信息</p>
            <div class="cardBox">
                <div class="cardBoxOne" style="width:36%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">创建时间</p>
                        <p class="cardBoxOneContent">{{ makeInfo.time }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">订单号</p>
                        <p class="cardBoxOneContent">{{ makeInfo.orderId }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">支付状态</p>
                        <p class="cardBoxOneContent">
                            <el-tag style="height:25px; line-height:25px;"
                                :type="makeInfo.balance == '0' ? 'danger' : 'success'" disable-transitions>{{
                                        makeInfo.balance == '0' ? "未完成" : "已完成"
                                }}
                            </el-tag>
                        </p>
                    </div>
                </div>
                <div class="cardBoxOne" style="width:35%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">充值金额</p>
                        <p class="cardBoxOneContent">￥{{ makeInfo.auantity.toFixed(2) }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">账户余额</p>
                        <p class="cardBoxOneContent">￥{{ makeInfo.balance == 0 ? patInfo.balance.toFixed(2)
                                : makeInfo.balance.toFixed(2)
                        }}</p>
                    </div>
                </div>
            </div>
        </el-card>

        <!-- 其他缴费 -->
        <el-card class="cardBottom" v-if="orderType == 'JF'" style="height:auto;padding-bottom:35px;">
            <p class="cardTitle">缴费订单详情</p>
            <div class="cardBox">
                <div class="cardBoxOne" style="width:32%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">创建时间</p>
                        <p class="cardBoxOneContent">{{ makeInfo.time }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">订单号</p>
                        <p class="cardBoxOneContent">{{ makeInfo.orderId }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">缴费类型</p>
                        <p class="cardBoxOneContent">{{ makeInfo.type }}</p>
                    </div>
                </div>
                <div class="cardBoxOne" style="width:28%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">出单科室</p>
                        <p class="cardBoxOneContent">{{ makeInfo.dep }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">总金额</p>
                        <p class="cardBoxOneContent">￥{{ makeInfo.price.toFixed(2) }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">支付状态</p>
                        <p class="cardBoxOneContent">
                            <el-tag style="height:25px; line-height:25px;"
                                :type="makeInfo.state == '0' ? 'danger' : 'success'" disable-transitions>{{
                                        makeInfo.state == '0' ? "未支付" : "已支付"
                                }}
                            </el-tag>
                        </p>
                    </div>
                </div>
                <div class="cardBoxOne" style="width:40%;">
                    <div class="countBox" style="flex-wrap: wrap;
                                    padding-left: 10px;
                                    height: auto;
                                    border-radius: 5px;
                                    padding-bottom: 8px;
                                    box-shadow: 0px 0px 20px rgb(215 215 215);
                                    max-height: 299px;
                                    overflow: auto;">
                        <p class="cardBoxOneTitle" style="width:100%;text-align: left;;">详细列表</p>
                        <p class="cardBoxOneContent" v-for="(item, index) in makeInfo.rows" :key="index"
                            style="width:100%;margin:0;text-align: left;margin-bottom: 8px;color:#8c8cad;">
                            {{ item.name }}：￥{{ item.price.toFixed(2) }} × {{ item.num }}
                        </p>
                    </div>
                </div>
            </div>
        </el-card>

        <!-- 退款申请详情 -->
        <el-card class="cardBottom" v-if="orderType == 'TK'" style="height:auto;padding-bottom:35px;">
            <p class="cardTitle">退款申请信息</p>
            <div class="cardBox">
                <div class="cardBoxOne" style="width:36%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">创建时间</p>
                        <p class="cardBoxOneContent">{{ makeInfo.time }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">订单号</p>
                        <p class="cardBoxOneContent">{{ makeInfo.orderId }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">申请进度</p>
                        <p class="cardBoxOneContent">
                            <el-tag style="height:25px; line-height:25px;"
                                :type="makeInfo.state == '0' ? 'primary' : makeInfo.state == '1' ? 'success' : 'danger'"
                                disable-transitions>{{
                                        makeInfo.state == '0' ? "待处理" : makeInfo.state == '1' ? '已退款' : '已驳回'
                                }}
                            </el-tag>
                        </p>
                    </div>
                </div>
                <div class="cardBoxOne" style="width:35%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">退款金额</p>
                        <p class="cardBoxOneContent">￥{{ makeInfo.money.toFixed(2) }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">退款后余额</p>
                        <p class="cardBoxOneContent">￥{{ makeInfo.balance.toFixed(2)
                        }}</p>
                    </div>
                </div>
            </div>
            <div class="but" style="left:70%;" v-if="makeInfo.state == 0">
                <el-button type="primary" plain @click="to">同意退款</el-button>
                <el-button type="primary" plain @click="bo">驳回退款</el-button>
            </div>
        </el-card>
        <div style="height:60px;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orderId: 0,
            orderType: '',
            makeInfo: {},
            userInfo: {},
            patInfo: {},
            hui: ''
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        to() {
            this.$confirm('是否确认同意此退款?', '提示', {
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
                let data = {
                    userId: this.userInfo.id,
                    patId: this.makeInfo.patId,
                    orderId: this.orderId,
                    state: 1
                }
                this.$http.post('admin/refundHandle', data).then(res => {
                    if (res.data.code == 200) {
                        this.$http.post('message/send', {
                            userId: this.userInfo.id,
                            source: '管理员',
                            type: '退款处理',
                            title: '您的退款申请已通过',
                            content: `您的订单号为${this.orderId}的申请已通过，<br>退款金额为：${this.makeInfo.money}元，退款后余额为：${this.makeInfo.balance}元。`,
                        }).then(res => {
                            loading.close();
                            if (res.data.code == 200) {
                                this.makeInfo.state = 1;
                                this.$message.success('已成功退款');
                            } else {
                                this.$message.error('退款成功，消息' + res.data.msg);
                            }
                        })
                    } else {
                        loading.close();
                        this.$message.error(res.data.msg);
                    }
                })

            }).catch(() => {
            });
        },

        bo() {
            this.$confirm('是否确认驳回此申请?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {

                let data = {
                    userId: this.userInfo.id,
                    patId: this.makeInfo.patId,
                    orderId: this.orderId,
                    state: 2
                }
                this.$prompt('请输入驳回原因', '提示', {
                    confirmButtonText: '提交',
                    cancelButtonText: '取消',
                    inputPattern: /^.+$/,
                    inputErrorMessage: '请输入驳回原因'
                }).then(({ value }) => {
                    this.hui = value;
                    get()
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消驳回操作'
                    });
                });
                let get = () => {
                    const loading = this.$loading({
                        lock: true,
                        text: 'Loading',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)',
                    })
                    this.$http.post('admin/refundHandle', data).then(res => {
                        if (res.data.code == 200) {
                            this.$http.post('message/send', {
                                userId: this.userInfo.id,
                                source: '管理员',
                                type: '退款处理',
                                title: '您的退款申请被驳回',
                                content: `您的订单号为${this.orderId}的申请被驳回，<br><br>驳回原因为：${this.hui}。`,
                            }).then(res => {
                                loading.close();
                                if (res.data.code == 200) {
                                    this.makeInfo.state = 2;
                                    this.$message.success('已驳回退款申请');
                                } else {
                                    this.$message.error('退款成功，消息' + res.data.msg);
                                }
                            })
                        } else {
                            loading.close();
                            this.$message.error(res.data.msg);
                        }
                    })
                }

            }).catch(() => {
            });
        },
    },
    created() {
        const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        this.orderId = this.$route.query.orderId;
        this.orderType = this.$route.query.orderType;
        let url = '';
        if (this.orderType == 'CZ') url = 'order/userRecInf';
        if (this.orderType == 'TK') url = 'order/userRefundInf'
        if (this.orderType == 'JF') url = 'order/userPayOrderInf'
        if (this.$route.query.orderType == '' || this.$route.query.orderType == null) return this.$message.error('访问异常');
        this.$http.get(`${url}?orderId=${this.orderId}`).then(res => {

            if (res.data.code == 200) {
                this.makeInfo = res.data.data[0];
                this.$http.get(`admin/userInf?userId=${res.data.data[0].userId}`).then(resmy => {

                    if (resmy.data.code == 200) {
                        this.userInfo = resmy.data.data;
                        this.$http.get(`user/patientInfo/${res.data.data[0].patId}`).then(respat => {

                            loading.close();
                            if (respat.data.code == 200) {
                                this.patInfo = respat.data.data[0];
                            } else {
                                this.$message.error(respat.data.msg);
                            }
                        })
                    } else {
                        loading.close()
                        this.$message.error(resmy.data.msg);
                    }
                })
            } else {
                loading.close()
                this.$message.error(res.data.msg);
            }
        })
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

            .countBox {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                height: 55px;
                font-size: 14px;
                min-width: 200px;
                width: 60%;
                margin: 0 auto;

                .cardBoxOneTitle {
                    color: rgb(170, 170, 170);
                    margin-right: 15px;
                }

                .cardBoxOneContent {
                    color: #000;
                }
            }

            /deep/.avatar {
                width: 65px !important;
                height: 65px !important;
                border: 1px solid #ccc;
                border-radius: 100%;
                margin: 22px 0 0 15px;
            }

            .countG {
                margin-top: 30px;
            }
        }
    }

    .but {
        margin-top: 20px;
        display: flex;
        padding-left: 10%;
    }

    .cardTop {
        height: 308px;
        margin-top: 30px;
    }

    .cardBottom {
        height: 420px;
        margin-top: 20px;
    }
}
</style>