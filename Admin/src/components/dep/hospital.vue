<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">分院管理</p>
            <el-button type="primary" @click="add" plain style="position:absolute;right:36px;">新增
            </el-button>
        </div>
        <el-card class="card">
            <div class="list">
                <div class="block" v-for="(item, index) in list" :key="index">
                    <p class="minname"> {{ item.minname }}</p>
                    <p class="name">{{ item.name }}</p>
                    <el-tooltip class="item" effect="dark" content="医院开关" placement="top-start">
                        <el-switch :name="'sw' + index" v-model="swith[index]" @change="onoroff($event, index)">
                        </el-switch>
                    </el-tooltip>
                    <el-dropdown :hide-on-click="false" style="position:absolute;bottom:10px;right:20px;">
                        <i class="el-icon-arrow-down el-icon--right"
                            style="color:#1a7cff !important;font-size:18px;"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item><span @click="mod(index)">修改</span></el-dropdown-item>
                            <el-dropdown-item><span @click="del(index)">删除</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <el-dialog :title="addormod ? '新增分院信息' : '修改分院信息'" :visible.sync="utw" width="500px">
                <el-form label-width="60">
                    <el-form-item label="简称">
                        <el-input v-model="minname" autocomplete="off" placeholder="请输入医院简称，如东院"></el-input>
                    </el-form-item>
                    <el-form-item label="全称">
                        <el-input v-model="name" autocomplete="off" placeholder="请输入医院全称"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="utw = false">取 消</el-button>
                    <el-button type="primary" @click="post">提交</el-button>
                </div>
            </el-dialog>
        </el-card>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            swith: [],
            addormod: true, //true为新增，false为修改
            utw: false,
            minname: '',
            name: '',
            index: 0

        }
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$http.get('simple/getHospital').then(res => {
                loading.close();
                if (res.data.code == 200) {
                    this.list = res.data.data;
                    let arr = new Array(this.list.length)
                    for (let i = 0; i < arr.length; i++) {
                        arr[i] = this.list[i].state == 1 ? true : false
                    }
                    this.swith = arr;
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        },
        onoroff($event, index) {
            let map = { false: 0, true: 1 }
            let tw = $event ? '开启' : '关闭';
            let data = {
                state: map[$event],
                id: this.list[index].id
            }
            this.$confirm(`此操作将${tw}此医院, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.put('admin/dep/switchHospital', data).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                    } else {
                        this.swith[index] = !this.swith[index];
                        this.$message.error(res.data.msg);
                    }
                })
            }).catch(() => {
                let arr = this.swith
                arr[index] = !this.swith[index];
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                });
                this.swith = arr;
                this.swith[index] = this.swith[index];
            });
        },
        add() {
            this.name = '';
            this.minname = '';
            this.addormod = true;
            this.utw = true;
        },
        mod(index) {
            this.addormod = false;
            this.utw = true;
            this.name = this.list[index].name;
            this.minname = this.list[index].minname;
            this.index = index;
        },

        post() {
            if (this.addormod) {
                //新增
                if (this.name == '' || this.minname == '') return this.$message.error('请输入完整');
                this.$http.post('admin/dep/addHospital', {
                    name: this.name,
                    minname: this.minname
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                        this.utw = false;
                        this.list.push({
                            name: this.name,
                            minname: this.minname,
                            state: 1
                        })
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })

            } else {
                //修改
                if (this.name == '' && this.minname == '') return this.$message.error('至少输入一项修改内容');
                this.$http.post('admin/dep/moddepHos', {
                    name: this.name,
                    minname: this.minname,
                    hosId: this.list[this.index].id
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                        this.utw = false;
                        this.list[this.index].name = this.name;
                        this.list[this.index].minname = this.minname;
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }
        },
        del(index) {
            this.$confirm(`此操作将删除此医院, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.$http.delete(`admin/dep/delHospital?id=${this.list[index].id}`).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                        this.list.splice(index, 1);
                    } else if (res.data.code == 204) {
                        this.$prompt('请输入 “确认删除” 来强制删除所有内容', '警告，此医院下还有科室或医生', {
                            confirmButtonText: '强制删除',
                            cancelButtonText: '取消',
                            inputPattern: /确认删除/,
                            inputErrorMessage: '确认信息错误'
                        }).then(({ value }) => {
                            //强制删除
                            this.$http.delete(`admin/dep/delHospital?id=${this.list[index].id}&isStrict=strict`).then(res => {
                                if (res.data.code == 200) {
                                    this.$message.success(res.data.msg);
                                    this.list.splice(index, 1);
                                } else {
                                    this.$message.error(res.data.msg);
                                }
                            })

                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '取消删除'
                            });
                        });
                    } else {
                        this.$message.error(res.data.msg);
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        }
    },
}
</script>

<style lang="less" scoped>
.el-table /deep/ .el-icon-arrow-down:before {
    color: #000 !important;
    font-size: 20px !important;
    position: relative;
    top: 5px;
}

.main {
    width: 100%;
    height: 100%;
    line-height: auto;

    .head {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;

        .tag {
            height: 8px;
            width: 25px;
            border-radius: 4px;
            background-color: #1a7cff;
        }

        .tagTitle {
            font-size: 23px;
            color: #000;
            margin-left: 15px;
        }
    }

    .card {
        width: 100%;
        min-height: 300px;
        margin-top: 10px;
        background: #fff;
        height: calc(100% - 90px);

        .list {
            display: flex;
            flex-wrap: wrap;

            .block {
                min-width: 240px;
                box-shadow: 0px 0px 20px rgba(215, 215, 215, 1);
                max-width: 320px;
                height: 120px;
                position: relative;
                margin: 15px 20px;

                .el-switch {
                    position: absolute;
                    top: 14px;
                    right: 15px;
                }

                .minname {
                    display: block;
                    width: calc(100% - 80px);
                    font-size: 16px;
                    font-weight: bold;
                    text-align: left;
                    margin-left: 25px;
                    word-wrap: break-word;
                }

                .name {
                    font-size: 14px;
                    text-align: left;
                    margin-left: 25px;
                    display: block;
                    width: calc(100% - 70px);
                }

                .el-icon-arrow-down:before {
                    color: #1a7cff !important;
                }
            }
        }
    }
}
</style>