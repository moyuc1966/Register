<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">用户反馈</p>
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
            <el-button type="primary" plain class="dy" @click="printHTML('out-table')">
                打印
            </el-button>
        </div>
        <el-card class="box-card">
            <div class="tableHead">
                <el-input style="width: 300px" :maxlength="25" show-word-limit clear="searchInput" clearable
                    placeholder="搜索用户账号" prefix-icon="el-icon-search" v-model="search">
                </el-input>
                <el-button class="searchButton" size="primary" plain @click="searchBind">搜索</el-button>
                <el-button v-if="isyuan" class="yuan" size="primary" plain @click="yuan">原数据
                </el-button>
            </div>
            <!-- 表格 -->
            <el-table :stripe="true" :row-style="{ height: '55px' }" id="out-table" :data="list" style="width: 100%"
                height="660" size="mini" :fit="true">
                <el-table-column prop="username" label="反馈用户" min-width="100" align="center">
                </el-table-column>
                <!-- 挂号相关，缴费相关，使用问题 -->
                <el-table-column prop="type" label="反馈类型" min-width="110" align="center"
                    :filters="[{ text: '挂号相关', value: '挂号相关' }, { text: '缴费相关', value: '缴费相关' }, { text: '使用问题', value: '使用问题' }]"
                    :filter-method="filterHandler">
                </el-table-column>
                <el-table-column fixed prop="title" label="反馈标题" min-width="160" align="center">
                </el-table-column>
                <el-table-column prop="content" label="反馈内容" min-width="150" align="center">
                </el-table-column>
                <el-table-column prop="email" label="用户邮箱" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="time" label="反馈时间" min-width="140" align="center" :sortable="true">
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
            userPat: {}
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
            this.$http.get(`admin/feedbackList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 分页，每页条数改变时触发
        handleSizeChange(val) {
            this.pageSize = val
            this.$http.get(`admin/feedbackList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data
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
            this.$http.get('admin/feedbackList?page=1&limit=12').then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 搜索功能
        searchBind() {
            if (this.search == '') return this.$message.warning('请输入合法的搜索内容')
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get(`admin/feedbackQuery?page=1&limit=15&user=${this.search}`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data
                    this.count = res.data.count
                    this.isyuan = true
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
            this.$http.get(`admin/feedbackList?page=1&limit=${this.pageSize}`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data
                    this.count = res.data.count
                    this.isyuan = false
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
            this.$http.get(`admin/feedbackList?page=1&limit=${this.count}`).then(res => {
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
                    反馈用户: item.username,
                    反馈标题: item.title,
                    反馈内容: item.content,
                    反馈时间: item.time,
                    反馈类型: item.type,
                    用户邮箱: item.email,
                    用户手机号: item.phone
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "用户反馈");
            let name = "用户反馈列表明细.xlsx";
            loading.close()
            XLSX.writeFile(bookNew, name); // 保存的文件名
        }
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
                left: 348px;
            }

            .yuan {
                position: absolute;
                left: 428px;
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