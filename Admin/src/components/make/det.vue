<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">挂号详情</p>
        </div>
        <el-card class="cardTop">
            <p class="cardTitle">患者信息</p>
            <div class="cardBox">
                <div class="cardBoxOne" style="width:28%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">患者姓名</p>
                        <p class="cardBoxOneContent">{{ makeInfo.name }}</p>
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
        <el-card class="cardBottom">
            <p class="cardTitle">预约信息</p>
            <div class="cardBox">
                <div class="cardBoxOne" style="width:36%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">就诊医院</p>
                        <p class="cardBoxOneContent">{{ makeInfo.hosName }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">就诊医生</p>
                        <p class="cardBoxOneContent">{{ makeInfo.doctorName }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">门诊时间</p>
                        <p class="cardBoxOneContent">{{ makeInfo.time }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">就诊时间</p>
                        <p class="cardBoxOneContent">{{ makeInfo.datetime }}</p>
                    </div>
                </div>
                <div class="cardBoxOne" style="width:35%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">就诊科室</p>
                        <p class="cardBoxOneContent">{{ makeInfo.depName }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">医生职称</p>
                        <p class="cardBoxOneContent">{{ makeInfo.position }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">创建时间</p>
                        <p class="cardBoxOneContent">{{ makeInfo.createTime }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">就诊状态</p>
                        <el-tag style="height:25px; line-height:25px;"
                            :type="makeInfo.state == '0' ? 'primary' : makeInfo.state == '1' ? 'success' : 'error'"
                            disable-transitions>{{
                                    makeInfo.state == '0' ? "等待中" : makeInfo.state == '1' ? "已完成" : "已取消"
                            }}
                        </el-tag>
                    </div>
                </div>
                <div class="cardBoxTwo" style="width:28%;">
                    <div class="countBox">
                        <p class="cardBoxOneTitle">挂号类型</p>
                        <p class="cardBoxOneContent">{{ makeInfo.type }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">挂号费</p>
                        <p class="cardBoxOneContent">￥{{ makeInfo.price }}</p>
                    </div>
                    <div class="countBox">
                        <p class="cardBoxOneTitle">备注</p>
                        <p class="cardBoxOneContent">{{ makeInfo.remarks }}</p>
                    </div>
                </div>
            </div>
            <div class="but">
                <el-button type="primary" plain @click="dialogVisibleBack = true">完成挂号</el-button>
                <el-button type="primary" @click="back">返回</el-button>
            </div>
            <el-dialog title="提示" :visible.sync="dialogVisibleBack" width="380px">
                <span><i class="el-icon-warning-outline" style="margin-right: 10px"></i>是否确认此挂号已完成</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleBack = false">取 消</el-button>
                    <el-button type="warning" @click="complete">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
        <div style="height:60px;"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: 0,
            makeInfo: {},
            userInfo: {},
            patInfo: {},
            dialogVisibleBack: false,
        }
    },
    methods: {
        back() {
            this.$router.go(-1);
        },
        complete() {
            this.dialogVisibleBack = false;
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.put('make/endMake', { id: this.makeInfo.id }).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    let obj = this.makeInfo;
                    obj.state = '1';
                    this.makeInfo = obj;
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        }
    },
    created() {
        const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)',
        })
        this.id = this.$route.query.id;
        this.$http.get(`make/getMakeInf?id=${this.id}`).then(res => {
            if (res.data.code == 200) {
                this.makeInfo = res.data.rows[0];
                this.$http.get(`admin/userInf?userId=${res.data.rows[0].userId}`).then(resmy => {
                    if (resmy.data.code == 200) {
                        this.userInfo = resmy.data.data;
                        this.$http.get(`user/patientInfo/${res.data.rows[0].patId}`).then(respat => {
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