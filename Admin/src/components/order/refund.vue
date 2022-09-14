<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">退款申请管理</p>
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
                    placeholder="支持订单号，用户id" prefix-icon="el-icon-search" v-model="search">
                </el-input>
                <el-button class="searchButton" size="primary" plain @click="searchBind">搜索</el-button>
                <el-button v-if="isyuan" class="yuan" size="primary" plain @click="yuan">原数据
                </el-button>
            </div>
            <!-- 表格 -->
            <el-table :row-style="{ height: '55px' }" id="out-table" :data="list" style="width: 100%" height="660"
                size="mini" :fit="true">
                <el-table-column fixed prop="time" label="创建时间" min-width="150" align="center" :sortable="true">
                </el-table-column>
                <el-table-column prop="orderId" label="流水单号" min-width="150" align="center">
                </el-table-column>
                <el-table-column prop="name" label="患者姓名" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="card" label="就诊卡号" min-width="100" align="center">
                </el-table-column>
                <el-table-column label="业务类型" min-width="100" align="center">
                    余额退款
                </el-table-column>
                <el-table-column label="申请进度" min-width="90" align="center">
                    <template slot-scope="scope">
                        <el-tag style="height:25px; line-height:25px;"
                            :type="scope.row.state == '0' ? 'primary' : scope.row.state == '1' ? 'success' : 'danger'"
                            disable-transitions>{{
                                    scope.row.state == '0' ? "待处理" : scope.row.state == '1' ? '已退款' : '已驳回'
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="auantity" label="退款金额" min-width="100" align="center" :sortable="true">
                    <template slot-scope="scope">
                        ￥{{ scope.row.money.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column prop="balance" label="退款后余额" min-width="110" align="center" :sortable="true">
                    <template slot-scope="scope">
                        {{ "￥" + scope.row.balance.toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="100" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-s-order" style="color:#1a7cff; font-size:20px; cursor:pointer;"
                            @click="det(scope.row.orderId)"></i>
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
import printJS from 'print-js'
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
            this.$http.get(`admin/refundOrderList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`admin/refundOrderList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get('admin/refundOrderList?page=1&limit=12').then(res => {
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
            let search;
            if (this.search == '') {
                return this.$message.warning('请输入合法的搜索内容')
            } else if (this.search.length < 5) {
                search = `userId=${this.search}`
            } else if (this.search.length > 5) {
                search = `orderId=${this.search}`
            } else {
                return this.$message.warning('请输入合法的搜索内容')
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get(`admin/refundOrderList?page=1&limit=15&${search}`).then(res => {
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
            this.$http.get(`admin/refundOrderList?page=1&limit=${this.pageSize}`).then(res => {
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
        // 操作，跳转
        det(id) {
            this.$router.push({
                path: '/order/Detail',
                query: {
                    orderId: id,
                    orderType: 'TK'
                }
            })

        },
        // 导出当前页
        exportDataNow() {
            this.exportNewList(this.list);
        },
        // 全部导出，请求全部数据
        exportDataoz() {
            this.$http.get(`admin/refundOrderList?page=1&limit=${this.count}`).then(res => {
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
                    ID: item.id,
                    患者姓名: item.name,
                    订单号: item.orderId,
                    就诊卡号: item.card,
                    退款金额: item.money,
                    退款后余额: item.balance,
                    创建时间: item.time,
                    申请进度: item.state == '0' ? "待处理" : item.state == '1' ? '已退款' : '已驳回'
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "退款申请");
            let name = "退款申请列表明细.xlsx";
            loading.close()
            XLSX.writeFile(bookNew, name); // 保存的文件名
        },
        //打印
        printHTML(id) {
            const html = document.querySelector('#' + id).innerHTML
            const div = document.createElement('div')
            const printDOMID = 'printDOMElement'
            div.id = printDOMID
            div.innerHTML = html
            const ths = div.querySelectorAll('.el-table__header-wrapper th')
            const ThsTextArry = []
            for (let i = 0, len = ths.length; i < len; i++) {
                if (ths[i].innerText !== '') ThsTextArry.push(ths[i].innerText)
            }
            div.querySelector('.hidden-columns').remove()
            div.querySelector('.el-table__header-wrapper').remove()
            let newHTML = '<tr>'
            for (let i = 0, len = ThsTextArry.length; i < len; i++) {
                newHTML += '<td style="text-align: center; font-weight: bold">' + ThsTextArry[i] + '</td>'
            }

            newHTML += '</tr>'
            div.querySelector('.el-table__body-wrapper table').insertAdjacentHTML('afterbegin', newHTML)
            document.querySelector('body').appendChild(div)
            printJS({
                printable: printDOMID,
                type: 'html',
                scanStyles: false,
                style: 'table { border-collapse: collapse }' // 表格样式
            })
            div.remove()
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