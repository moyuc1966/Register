<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">就诊人管理</p>
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
                <el-table-column fixed prop="name" label="姓名" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="docType" label="证件类型" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="certificate" label="证件号" min-width="180" align="center">
                </el-table-column>
                <el-table-column prop="card" label="就诊卡号" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="relation" label="关系" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="isdefault" label="状态" min-width="80" align="center"
                    :filters="[{ text: '默认', value: '1' }, { text: '非默认', value: '2' },]"
                    :filter-method="filterHandler">
                    <template slot-scope="scope">
                        <el-tag style="height:25px; line-height:25px;"
                            :type="scope.row.isdefault == '1' ? 'danger' : 'success'" disable-transitions>{{
                                    scope.row.isdefault == '1' ? "默认" : '非默认'
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="balance" label="余额" min-width="90" align="center">
                    <template slot-scope="scope">
                        ￥{{ scope.row.balance.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="address" label="地址" min-width="130" align="center">
                    <template slot-scope="scope">
                        {{ scope.row.address == '' || scope.row.address == null ? '暂无' : scope.row.address }}
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
            search: '',
            uigoid: ''
        }
    },
    methods: {
        // 字段筛选
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] == value;
        },

        // 分页，页数改变时触发
        handleCurrentChange(val) {
            this.currentPage = val
            this.$http.get(`admin/patientList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`admin/patientList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            let url;
            console.log('url', this.uigoid)
            if (this.uigoid == '' || this.uigoid == null) {
                url = `admin/patientList?limit=12&page=1`
            } else {
                url = `admin/patientQuery/0?userId=${this.uigoid}&limit=12&page=1`
                this.isyuan = true
                this.search = this.$route.query.id;
            }
            this.$http.get(url).then(res => {
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

            this.$prompt('请输入 “确认删除” 来强制删除所有内容', '警告，此操作会直接删除就诊人数据', {
                confirmButtonText: '强制删除',
                cancelButtonText: '取消',
                inputPattern: /确认删除/,
                inputErrorMessage: '确认信息错误'
            }).then(({ value }) => {
                //强制删除
                this.$http.delete(`user/patientDel/${id}`).then(res => {
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
                this.$http.post('admin/patientListFrozen', data).then(res => {
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
            this.$http.get(`admin/patientQuery/${this.search}?page=1&limit=12`).then(res => {
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
            this.$http.get(`admin/patientList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`admin/patientList?page=1&limit=${this.count}`).then(res => {
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
                    患者姓名: item.name,
                    证件类型: item.docType,
                    证件号: item.card,
                    是否默认: item.gender == 1 ? '默认' : '非默认',
                    手机号: item.phone,
                    关系: item.relation,
                    余额: item.balance,
                    地址: item.address,
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "就诊人列表");
            let name = "就诊人明细.xlsx";
            loading.close()
            XLSX.writeFile(bookNew, name); // 保存的文件名
        },
    },
    created() {
        this.uigoid = this.$route.query.id;

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