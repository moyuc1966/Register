<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">用户管理</p>
            <el-dropdown>
                <el-button type="primary" plain>
                    导出<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <span @click="exportDataNow">导出当前页</span>
                    </el-dropdown-item>
                    <el-dropdown-item>
                        <span @click="exportDataoz">导出全部</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-card class="box-card">
            <div class="tableHead">
                <el-input style="width: 360px" :maxlength="25" show-word-limit clear="searchInput" clearable
                    placeholder="支持搜索姓名，id，证件号，就诊卡号，手机号" prefix-icon="el-icon-search" v-model="search">
                </el-input>
                <el-button class="searchButton" size="primary" plain @click="searchBind">搜索</el-button>
                <el-button v-if="isyuan" class="yuan" size="primary" plain @click="yuan">原数据
                </el-button>
            </div>
            <!-- 表格 -->
            <el-table :row-style="{ height: '55px' }" id="out-table" :data="list" style="width: 100%" height="660"
                :fit="true">
                <el-table-column fixed prop="name" label="昵称" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="photo" label="照片" min-width="60" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="单击预览" placement="top-start">
                            <el-image
                                style="width: 40px; top:3px;height: 40px;border:1px solid #eee; padding:1px;border-radius: 3px;"
                                :src="apiUrl + scope.row.avatar"
                                :preview-src-list="[apiUrl + list[scope.$index].avatar]">
                            </el-image>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="username" label="账号" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="gender" label="性别" min-width="90" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.gender == 1 ? '女' : '男' }}
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" min-width="90" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.age }}岁
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="唯一邮箱" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="createTime" label="注册时间" min-width="160" align="center">
                </el-table-column>
                <el-table-column prop="state" label="状态" min-width="80" align="center"
                    :filters="[{ text: '封禁中', value: '0' }, { text: '正常', value: '1' },]"
                    :filter-method="filterHandler">
                    <template slot-scope="scope">
                        <el-switch :name="'sw' + scope.$index" v-model="sw[scope.$index]"
                            @change="onoroff($event, scope.$index)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="220" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain @click="uigo(scope.row.id)">就诊人
                        </el-button>
                        <el-button size="mini" type="primary" plain @click="msg(scope.row.id, scope.row.name)">发消息
                        </el-button>
                        <el-button size="mini" type="danger" plain @click="del(scope.$index, scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 12, 20, 30, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="count">
            </el-pagination>

        </el-card>
    </div>
</template>

<script>

import * as XLSX from 'xlsx'
export default {
    data() {
        return {
            list: [],
            currentPage: 1,
            count: 0,
            pageSize: 12,
            height: 670,
            search: '',
            isyuan: false,
            sw: [],
            hoslist: [],
            hosvalue: '',
            id: 0,
            index: 0,
            search: ''
        }
    },
    methods: {
        // 字段筛选
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] == value;
        },
        uigo(id) {
            this.$router.push({
                path: '/users/depList',
                query: {
                    id: id
                }
            })
        },
        msg(id, name) {
            this.$router.push({
                path: '/users/message/post',
                query: {
                    id: id,
                    name: name
                }
            })
        },

        // 分页，页数改变时触发
        handleCurrentChange(val) {
            this.currentPage = val
            this.$http.get(`admin/users?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data
                    let arr = new Array(this.list.length)
                    for (let i = 0; i < this.list.length; i++) {
                        arr[i] = this.list[i].state ? true : false
                        console.log('arr[i]', arr[i])
                    }
                    this.sw = arr
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 分页，每页条数改变时触发
        handleSizeChange(val) {
            this.pageSize = val
            this.$http.get(`admin/users?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data
                    let arr = new Array(this.list.length)
                    for (let i = 0; i < this.list.length; i++) {
                        arr[i] = this.list[i].state ? true : false
                        console.log('arr[i]', arr[i])
                    }
                    this.sw = arr
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 初始化函数
        getInfo() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get('admin/users?limit=12&page=1').then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                    let arr = new Array(this.list.length)
                    for (let i = 0; i < this.list.length; i++) {
                        arr[i] = this.list[i].state ? true : false
                    }
                    this.sw = arr
                    loading.close()
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        //删除
        del(index, id) {

            this.$prompt('请输入 “确认删除” 来强制删除所有内容', '警告，此操作会直接删除用户数据', {
                confirmButtonText: '强制删除',
                cancelButtonText: '取消',
                inputPattern: /确认删除/,
                inputErrorMessage: '确认信息错误'
            }).then(({ value }) => {
                //强制删除
                this.$http.delete(`admin/usersDel?userId=${id}`).then(res => {
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


        },
        //开关用户
        onoroff($event, index) {
            let map = { false: 0, true: 1 }
            let tw = $event ? '恢复' : '封禁';
            let data = {
                userId: this.list[index].id,
                state: map[$event],
            }
            this.$confirm(`此操作将${tw}此用户, 是否继续?`, '提示', {
                type: 'warning'
            }).then(() => {
                this.$http.post('admin/usersFrozen', data).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                    } else {
                        this.sw[index] = !this.sw[index];
                        this.$message.error(res.data.msg);
                    }
                })
            }).catch(() => {
                let arr = this.sw
                arr[index] = !this.sw[index];
                this.$message({
                    type: 'info',
                    message: '已取消修改'
                });
                this.sw = arr;
                this.sw[index] = this.sw[index];
            });
        },
        // 搜索功能
        searchBind() {
            if (this.search == '') return this.$message.error('请输入搜索内容')
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get(`admin/userQuery/${this.search}?page=1&limit=12`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data
                    console.log(' ', res.data)
                    this.count = res.data.count
                    this.isyuan = true
                    let arr = new Array(this.list.length)
                    for (let i = 0; i < this.list.length; i++) {
                        arr[i] = this.list[i].state ? true : false
                    }
                    this.sw = arr
                    this.$message.success('搜索完成')
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },

        // 切换原来的数据
        yuan() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get(`admin/users?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data
                    this.count = res.data.count
                    this.isyuan = false
                    this.dep = []
                    let arr = new Array(this.list.length)
                    for (let i = 0; i < this.list.length; i++) {
                        arr[i] = this.list[i].state ? true : false
                        console.log('arr[i]', arr[i])
                    }
                    this.sw = arr
                } else {
                    this.$message.error(res.data.msg)
                }
            })

        },
        // 导出当前页
        exportDataNow() {
            this.exportNewList(this.list);
        },
        // 全部导出，请求全部数据
        exportDataoz() {
            this.$http.get(`admin/users?page=1&limit=${this.count}`).then(res => {
                if (res.data.code == 200) {
                    this.exportNewList(res.data.data);
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        //导出Excel
        exportNewList(arr) {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            let tableData = [];
            arr.forEach((item) => {
                let obj = {
                    用户昵称: item.name,
                    账号: item.username,
                    年龄: item.age,
                    性别: item.gender == 1 ? '女' : '男',
                    唯一邮箱: item.email,
                    手机号: item.phone,
                    状态: item.state == '0' ? '已封禁' : '正常',
                    注册时间: item.createTime,
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "用户列表");
            let name = "用户数据明细.xlsx";
            loading.close()
            XLSX.writeFile(bookNew, name); // 保存的文件名
        },
    },
    created() {
        this.getInfo();
    }
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
        position: relative;

        .el-button /deep/ .el-icon-arrow-down:before {
            color: #1a7cff !important;
        }

        .el-dropdown {
            position: absolute;
            right: 20px;
        }

        .dy {
            position: absolute;
            right: 130px;
        }

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

        .daoBack {
            position: absolute;
            right: 10px
        }
    }


    .el-card {
        height: calc(100% - 60px);
        position: relative;
        margin-top: 10px;
        box-shadow: 0px 0px 20px rgba(215, 215, 215, 1);
        overflow: auto;

        .tableHead {
            height: 60px;
            display: flex;
            align-items: center;

            /deep/ .searchInput {
                width: 300px !important;
                position: absolute;
                left: 30px;
            }

            .searchButton {
                position: absolute;
                left: 418px;
            }

            .yuan {
                position: absolute;
                left: 488px;
            }
        }

        .el-table {
            height: 100%;
        }

        .el-pagination {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
            margin-right: 15px;
        }
    }
}
</style>