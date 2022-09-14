<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">用户消息管理</p>
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
            <el-button type="primary" plain class="dy" @click="add">
                新增
            </el-button>
        </div>
        <el-card class="box-card">
            <div class="tableHead">
                <el-select v-model="userLo" filterable placeholder="请选择用户">
                    <el-option v-for="item in userList" :key="item.name" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-button class="searchButton" size="primary" plain @click="searchBind">搜索</el-button>
                <el-button v-if="isyuan" class="yuan" size="primary" plain @click="yuan">原数据
                </el-button>
            </div>
            <!-- 表格 -->
            <el-table :row-style="{ height: '50px', padding: '0 auto' }" id="out-table" :data="list" style="width: 100%"
                height="660" :fit="true" size="mini">
                <el-table-column fixed prop="username" label="收信账号" min-width="90" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userId == 0" style="color:red;">所有人</span>
                        <span v-else>{{ scope.row.username }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="avatar" label="用户头像" min-width="60" align="center">
                    <template slot-scope="scope">
                        <img class="el-image" v-if="scope.row.userId == 0"
                            style="width: 40px; height: 40px;border:1px solid #eee;top:3px; padding:1px;border-radius: 3px;"
                            src="../../../images/ou.png">
                        <el-image v-else
                            style="width: 40px; height: 40px;border:1px solid #eee;top:3px; padding:1px;border-radius: 3px;"
                            :src="apiUrl + scope.row.avatar" :preview-src-list="[apiUrl + list[scope.$index].avatar]">
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="用户昵称" min-width="100" align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.userId == 0" style="color:red;">所有人</span>
                        <span v-else>{{ scope.row.userName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="source" label="来源" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="time" label="发信时间" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="type" label="类型" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="title" label="标题" min-width="140" align="center">
                </el-table-column>
                <el-table-column prop="content" label="内容" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain @click="look(scope.row.content)">查看
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="isread" label="状态" min-width="90" align="center"
                    :filters="[{ text: '未读', value: '0' }, { text: '已读', value: '1' },]" :filter-method="filterHandler">
                    <template slot-scope="scope">
                        <el-tag style="height:25px; line-height:25px;"
                            :type="scope.row.isread == '0' ? 'info' : 'success'" disable-transitions>{{
                                    scope.row.isread == '0' ? "未读" : '已读'
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="120" align="center">
                    <template slot-scope="scope">
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
            userList: [],
            userLo: '',
        }
    },
    methods: {
        add() {
            this.$router.push('/users/message/post')
        },
        look(brief) {
            this.$alert(brief, '消息内容', {
                confirmButtonText: '确定',
                dangerouslyUseHTMLString: true,
                callback: action => {
                }
            });
        },
        // 字段筛选
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] == value;
        },

        // 分页，页数改变时触发
        handleCurrentChange(val) {
            this.currentPage = val
            this.$http.get(`message/adminList?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`message/adminList?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get('message/adminList?paging=on&page=1&limit=12').then(res => {
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
            this.$http.get('admin/users?ison=is').then(res => {
                let arr = res.data.data;
                arr.unshift({
                    id: 0,
                    name: '全部'
                })
                this.userList = arr;
            })
        },
        //删除
        del(index, id) {

            this.$prompt('请输入 “确认删除” 来强制删除内容', '警告，此操作会撤销一条消息', {
                confirmButtonText: '强制删除',
                cancelButtonText: '取消',
                inputPattern: /确认删除/,
                inputErrorMessage: '确认信息错误'
            }).then(({ value }) => {
                //强制删除
                this.$http.delete(`message/messageDel/${id}`).then(res => {
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
        // 搜索功能
        searchBind() {
            console.log('this.userLo', this.userLo)
            if (this.userLo === '') return this.$message.error('请选择用户')
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get(`message/query?userId=${this.userLo}&page=1&limit=12`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data
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
            this.$http.get(`message/adminList?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`message/adminList?paging=on&page=1&limit=${this.count}`).then(res => {
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
                    收信账号: item.name,
                    账号昵称: item.position,
                    来源: item.reg,
                    发信时间: item.dia,
                    类型: item.hosName,
                    标题: item.depName,
                    内容: item.brief,
                    是否已读: item.state == '0' ? '否' : '已读',
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "医生列表");
            let name = "医生数据诊明细.xlsx";
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
                left: 258px;
            }

            .yuan {
                position: absolute;
                left: 328px;
            }
        }

        .el-table {
            height: 100%;
        }

        .el-table td,
        .el-table {
            padding: 0 !important;
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