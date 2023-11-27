<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">医生名下挂号列表</p>
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
            <el-button type="primary" plain class="cx" @click="dialogFormVisible = true">
                重新选择
            </el-button>
        </div>
        <el-card class="box-card">
            <!-- 表格 -->
            <el-table :row-style="{ height: '55px' }" id="out-table" :data="list" style="width: 100%" height="660"
                size="mini" :fit="true">
                <el-table-column fixed prop="name" label="患者姓名" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="card" label="就诊卡号" min-width="110" align="center">
                </el-table-column>
                <el-table-column prop="idCard" label="身份证号" min-width="160" align="center">
                </el-table-column>
                <el-table-column prop="phone" label="手机号" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="type" label="挂号类型" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="price" label="挂号费" min-width="90" align="center" :sortable="true">
                    <template slot-scope="scope">
                        {{ scope.row.price }}元
                    </template>
                </el-table-column>
                <el-table-column prop="state" label="状态" min-width="80" align="center"
                    :filters="[{ text: '等待中', value: '0' }, { text: '已完成', value: '1' }, { text: '已取消', value: '2' }]"
                    :filter-method="filterHandler">
                    <template slot-scope="scope">
                        <el-tag style="height:25px; line-height:25px;"
                            :type="scope.row.state == '0' ? 'primary' : scope.row.state == '1' ? 'success' : 'error'"
                            disable-transitions>{{
                                    scope.row.state == '0' ? "等待中" : scope.row.state == '1' ? "已完成" : "已取消"
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="预约日期" min-width="160" align="center" :sortable="true">
                </el-table-column>
                <el-table-column prop="datetime" label="时间" min-width="80" align="center">
                </el-table-column>
                <el-table-column prop="depName" label="预约科室" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="doctorName" label="预约医生" min-width="100" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="100" align="center">
                    <template slot-scope="scope">
                        <i class="el-icon-s-order" style="color:#1a7cff; font-size:20px; cursor:pointer;"
                            @click="det(scope.row.id)"></i>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[10, 12, 20, 30, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="count">
            </el-pagination>
        </el-card>
        <el-dialog title="选择医生" :visible.sync="dialogFormVisible" width="500px" :close-on-click-modal="false"
            :before-close="backcx">

            <el-cascader :props="props" :options="options" v-model="doctorId"></el-cascader>

            <div slot="footer" class="dialog-footer">
                <el-button @click="backcx">取 消</el-button>
                <el-button type="primary" @click="getInfo">确 定</el-button>
            </div>
        </el-dialog>
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
            pageSize: 1,
            height: 670,
            doctorId: 0,
            dialogFormVisible: true,
            hos: [],
            options: [],
            props: {
                lazy: true,
                lazyLoad: this.lazyLoad
            },
            isonce: false
        }
    },
    methods: {
        backcx() {
            if (this.isonce == false) {
                this.dialogFormVisible = false;
                this.$router.go(-1)
            } else {
                this.dialogFormVisible = false;
            }
        },
        handleChange(value) {
            console.log(value);
        },
        lazyLoad(node, resolve) {
            const { level } = node;
            if (level == 1) {
                this.$http.get(`simple/getDepOne?hosId=${node.value}`).then(res => {
                    let arr = res.data.data;
                    let arr2 = []
                    arr.forEach(item => {
                        arr2.push({
                            value: item.id,
                            label: item.name,
                            leaf: level >= 3
                        })
                    })
                    resolve(arr2);
                })
            } else if (level == 2) {
                this.$http.get(`simple/getDepTwo?depId=${node.value}`).then(res => {
                    let arr = res.data.data;
                    let arr2 = []
                    arr.forEach(item => {
                        arr2.push({
                            value: item.id,
                            label: item.name,
                            leaf: level >= 3
                        })
                    })
                    resolve(arr2);
                })
            } else if (level == 3) {
                this.$http.get(`simple/getDoctor?depTwoId=${node.value}`).then(res => {
                    let arr = res.data.data;
                    let arr2 = []
                    arr.forEach(item => {
                        arr2.push({
                            value: item.id,
                            label: item.name,
                            leaf: level >= 3
                        })
                    })
                    resolve(arr2);
                })
            }
        },
        // 字段筛选
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] == value;
        },

        // 分页，页数改变时触发
        handleCurrentChange(val) {
            this.currentPage = val
            this.$http.get(`make/admin/makeList?page=${this.pageSize}&limit=${this.currentPage}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data,
                        this.count = res.data.count
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 分页，每页条数改变时触发
        handleSizeChange(val) {
            this.pageSize = val
            this.$http.get(`make/admin/makeList?page=${this.pageSize}&limit=${this.currentPage}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data,
                        this.count = res.data.count
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 初始化函数
        getInfo() {
            this.isonce = true
            if (this.doctorId == 0 || this.doctorId == '') {
                this.$message.error('请选择医生')
                return
            }
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.dialogFormVisible = false
            this.$http.get(`make/doctorMake?page=1&limit=12&doctorId=${this.doctorId[3]}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                    loading.close()
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 操作，跳转
        det(id) {
            this.$router.push({
                path: '/make/Detail',
                query: {
                    id: id
                }
            })

        },
        // 导出当前页
        exportDataNow() {
            this.exportNewList(this.list);
        },
        // 全部导出，请求全部数据
        exportDataoz() {
            this.$http.get(`make/admin/makeList?page=1&limit=${this.count}`).then(res => {
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
                    姓名: item.name,
                    就诊卡号: item.card,
                    身份证号: item.idCard,
                    手机号: item.phone,
                    挂号类型: item.type,
                    挂号费: item.price,
                    状态: item.state == '0' ? '等待中' : item.state == '1' ? '已完成' : '已取消',
                    预约日期: item.time,
                    时间: item.datetime,
                    预约科室: item.depName,
                    所属医院: item.hosName,
                    预约医生: item.doctorName,
                    备注: item.remarks
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "预约列表");
            let name = "预约就诊明细.xlsx";
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
        this.$http.get('simple/getHospital').then(res => {
            this.hos = res.data.data;
            let arr = res.data.data;
            let arr2 = []
            arr.forEach(item => {
                arr2.push({
                    value: item.id,
                    label: item.name,
                    children: []
                })
            })
            this.options = arr2;
        })
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

        .cx {
            position: absolute;
            right: 225px;
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
        height: calc(100% - 90px);
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