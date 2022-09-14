<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">其他缴费管理</p>
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
            <el-button type="primary" plain class="cj" @click="utw = true">
                创建订单
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
                <el-table-column prop="patName" label="患者姓名" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="card" label="就诊卡号" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="type" label="缴费类型" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="dep" label="科室" min-width="100" align="center">
                </el-table-column>
                <el-table-column label="状态" min-width="90" align="center">
                    <template slot-scope="scope">
                        <el-tag style="height:25px; line-height:25px;"
                            :type="scope.row.state == '0' ? 'danger' : 'success'" disable-transitions>{{
                                    scope.row.state == '0' ? "未支付" : '已付款'
                            }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="auantity" label="支付金额" min-width="100" align="center" :sortable="true">
                    <template slot-scope="scope">
                        ￥{{ scope.row.price.toFixed(2) }}
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
            <el-dialog title="添加缴费订单" :visible.sync="utw">
                <p style="position:absolute;top:78px;left:500px">总金额：<span style="color:#1a7cff;">￥{{ price }}</span>
                </p>
                <el-form style="width:450px;" label-position="left" label-width="60">
                    <el-form-item label="选择就诊人">
                        <el-cascader clearable filterable :props="props" :options="options" v-model="pat"
                            style="width:300px;margin-left:-13px;">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="缴费类型">
                        <el-input v-model="type" style="width:300px;" autocomplete="off" placeholder="请输入缴费类型，如西药费">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="所属科室">
                        <el-input v-model="dep" style="width:300px;" autocomplete="off" placeholder="请输入所属科室">
                        </el-input>
                    </el-form-item>
                    <p style="width:100%;text-align: center; margin: 10px 0 10px 0; color: #1a7cff;">缴费类目</p>
                    <el-form-item :label="'第' + (index + 1) + '条'" v-for="(item, index) in dom" :key="index">
                        <el-input v-model="dom[index].name" style="width:300px; position:relative;" autocomplete="off"
                            placeholder="请输入支付小类名称">
                        </el-input>
                        <el-input v-model="dom[index].price" style="width:300px;margin-left:48px;margin-top:7px;"
                            autocomplete="off" placeholder="请输入支付小类单价" @change="sumPrice">
                        </el-input>
                        <el-input v-model="dom[index].num" style="width:300px;margin-left:48px;margin-top:7px;"
                            autocomplete="off" placeholder="请输入支付小类数量" @change="sumPrice">
                        </el-input>
                        <el-tooltip class="item" effect="dark" content="删除此小类" placement="right">
                            <i class="el-icon-circle-close" @click="delDom(index)"
                                style="color:red;position:absolute;top:6px;right:-9px; font-size:25px;"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="添加一条小类" placement="right">
                            <i class="el-icon-plus" v-if="index == dom.length - 1" @click="addDom"
                                style="color:#1a7cff;position:absolute;top:104px;right:-9px; font-size:20px;"></i>
                        </el-tooltip>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="utw = false">取 消</el-button>
                    <el-button type="primary" @click="add">提交</el-button>
                </div>
            </el-dialog>
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
            userPat: {},
            utw: false,
            options: [],
            props: {
                lazy: true,
                lazyLoad: this.lazyLoad
            },
            pat: [],
            type: '',
            dep: '',
            dom: [{
                name: '',
                price: '',
                num: '1',
            }],
            price: 0
        }
    },
    methods: {
        lazyLoad(node, resolve) {
            const { level } = node;
            if (level == 1) {
                this.$http.get(`admin/patientQuery/0?userId=${node.value}`).then(res => {
                    let arr = res.data.data;
                    let arr2 = []
                    arr.forEach(item => {
                        arr2.push({
                            value: item.id,
                            label: item.name,
                            leaf: level >= 1
                        })
                    })
                    resolve(arr2);
                })
            }
        },
        delDom(index) {
            if (this.dom.length == 1) {
                this.$message.error('至少保留一条小类');
                return;
            } else {
                this.dom.splice(index, 1);
            }
            this.sumPrice();

        },
        addDom() {
            this.dom.push({
                name: '',
                price: '',
                num: '1',
            })
        },
        sumPrice() {
            let price = 0;
            this.dom.forEach(item => {
                price += Number(item.price) * Number(item.num);
            })
            this.price = price;
        },
        add() {
            if (this.pat[1] == undefined) {
                this.$message.error('请选择就诊人');
                return;
            } else if (this.type == '' || this.dep == '') {
                this.$message.error('请输入完整');
                return;
            }
            let isok = false
            for (let i = 0; i < this.dom.length; i++) {
                if (this.dom[i].name == '' || this.dom[i].price == '' || this.dom[i].num == '') {
                    this.$message.error('请输入完整的缴费类目');
                    isok = false
                    return;
                }
                isok = true
            }
            if (isok) {
                //loading
                this.$confirm('确定提交吗？', '提示', {
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
                        patId: this.pat[1],
                        type: this.type,
                        dep: this.dep,
                        price: this.price,
                        rows: this.dom
                    }
                    function formatDateTime(time) {
                        var date = new Date(time);
                        var year = date.getFullYear(),
                            month = date.getMonth() + 1,//月份是从0开始的
                            day = date.getDate(),
                            hour = date.getHours(),
                            min = date.getMinutes(),
                            sec = date.getSeconds();
                        var newTime = year + '-' +
                            (month < 10 ? '0' + month : month) + '-' +
                            (day < 10 ? '0' + day : day) + ' ' +
                            (hour < 10 ? '0' + hour : hour) + ':' +
                            (min < 10 ? '0' + min : min) + ':' +
                            (sec < 10 ? '0' + sec : sec);
                        return newTime;
                    }
                    this.$http.post('order/patient/payCreate', data).then(res => {
                        loading.close();
                        if (res.data.code == 200) {
                            this.$message.success('提交成功');
                            let obj = {
                                "id": 0,
                                "orderId": res.data.orderId,
                                "time": formatDateTime(new Date()),
                                "price": this.price,
                                "type": "消化内科",
                                "dep": this.dep,
                                "patName": "初始化中",
                                "card": "初始化中",
                                "userId": 1,
                                "patId": 1,
                                "state": 0
                            }
                            this.list.push(obj)
                            this.utw = false;
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
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
            this.$http.get(`admin/payOrderList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`admin/payOrderList?page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get('admin/payOrderList?page=1&limit=12').then(res => {
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
            this.$http.get(`admin/payOrderList?page=1&limit=15&${search}`).then(res => {
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
            this.$http.get(`admin/payOrderList?page=1&limit=${this.pageSize}`).then(res => {
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
                    orderType: 'JF'
                }
            })

        },
        // 导出当前页
        exportDataNow() {
            this.exportNewList(this.list);
        },
        // 全部导出，请求全部数据
        exportDataoz() {
            this.$http.get(`admin/payOrderList?page=1&limit=${this.count}`).then(res => {
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
                    支付金额: item.price,
                    创建时间: item.time,
                    缴费类型: item.type,
                    科室: item.dep,
                    支付状态: item.state == '0' ? "未支付" : '已付款'
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "缴费订单");
            let name = "缴费订单明细.xlsx";
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
        this.$http.get('admin/users').then(res => {
            let arr = res.data.data;
            let arr2 = []
            arr.forEach(item => {
                arr2.push({
                    value: item.id,
                    label: item.name + '--' + item.username,
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

        .cj {
            position: absolute;
            right: 220px;
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