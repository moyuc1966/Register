<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">一级科室管理</p>
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
            <el-button type="primary" plain class="dy2" @click="addutw = true">
                新增
            </el-button>
        </div>
        <el-card class="box-card">
            <div class="tableHead">
                <el-select v-model="hosvalue" clearable filterable placeholder="请选择分院">
                    <el-option v-for="item in hoslist" :key="item.id" :label="item.name" :value="item.id">
                    </el-option>
                </el-select>
                <el-button class="searchButton" size="primary" plain @click="searchBind">搜索</el-button>
                <el-button v-if="isyuan" class="yuan" size="primary" plain @click="yuan">原数据
                </el-button>
            </div>
            <!-- 表格 -->
            <el-table :row-style="{ height: '55px' }" id="out-table" :data="list" style="width: 100%" height="660"
                :fit="true">
                <el-table-column fixed prop="id" label="科室id" min-width="100" align="center">
                </el-table-column>
                <el-table-column prop="name" label="名称" min-width="160" align="center">
                </el-table-column>
                <el-table-column prop="hosName" label="所属分院" min-width="160" align="center">
                </el-table-column>
                <el-table-column prop="hosId" label="分院id" min-width="160" align="center">
                </el-table-column>
                <el-table-column prop="state" label="状态" min-width="80" align="center"
                    :filters="[{ text: '已关闭', value: '0' }, { text: '正常', value: '1' },]"
                    :filter-method="filterHandler">
                    <template slot-scope="scope">
                        <el-switch :name="'sw' + scope.$index" v-model="sw[scope.$index]"
                            @change="onoroff($event, scope.$index)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" min-width="220" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain @click="mod(scope.$index, scope.row.id)">编辑
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
            <el-dialog title="修改科室信息" :visible.sync="utw" width="500px">
                <el-form label-width="60">
                    <el-form-item label="全称">
                        <el-input v-model="name" autocomplete="off" placeholder="请输入科室全称"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="utw = false">取 消</el-button>
                    <el-button type="primary" @click="post">提交</el-button>
                </div>
            </el-dialog>
            <el-dialog title="添加一级科室" :visible.sync="addutw" width="500px">
                <el-form label-width="60">
                    <el-form-item label="所属分院">
                        <el-select v-model="addhosvalue" clearable filterable placeholder="请选择分院" style="width:360px;">
                            <el-option v-for="item in hoslist" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="科室名称">
                        <el-input v-model="addname" autocomplete="off" placeholder="请输入科室全称" style="width:360px;">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="utw = false">取 消</el-button>
                    <el-button type="primary" @click="theadd">提交</el-button>
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
            sw: [],
            hoslist: [],
            hosvalue: '',
            utw: false,
            name: '',
            id: 0,
            index: 0,
            addutw: false,
            addhosvalue: '',
            addname: '',
        }
    },
    methods: {
        // 字段筛选
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] == value;
        },
        theadd() {
            if (this.addname == '' || this.addhosvalue == '') return this.$message.error('请填写完整信息')
            let data = {
                name: this.addname,
                hosId: this.addhosvalue,
            }
            this.$http.post(`admin/dep/addDepOne`, data).then(res => {
                if (res.data.code == 200) {
                    this.$message.success('添加成功')
                    this.getInfo()
                    this.addutw = false
                } else {
                    this.$message.error(res.data.msg)
                }
            })

        },
        // 分页，页数改变时触发
        handleCurrentChange(val) {
            this.currentPage = val
            this.$http.get(`simple/getDepOne?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            console.log(' ', val)
            this.$http.get(`simple/getDepOne?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get('simple/getDepOne?paging=on&page=1&limit=12').then(res => {
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
            this.$http.get('simple/getHospital').then(res => {
                if (res.data.code == 200) {
                    this.hoslist = res.data.data;
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        //修改
        mod(index, id) {
            this.utw = true;
            this.name = this.list[index].name;
            this.id = id;
            this.index = index
        },
        //提交修改
        post() {
            if (this.name == '') return this.$message.error('请输入修改内容');
            this.$http.post('admin/dep/moddepOne', {
                name: this.name,
                depId: this.id
            }).then(res => {
                if (res.data.code == 200) {
                    this.$message.success(res.data.msg);
                    this.utw = false;
                    this.list[this.index].name = this.name;
                } else {
                    this.$message.error(res.data.msg);
                }
            })

        },
        //删除
        del(index, id) {
            this.$confirm(`此操作将删除此科室, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            }).then(() => {
                this.$http.delete(`admin/dep/delDepOne?id=${id}`).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success(res.data.msg);
                        this.list.splice(index, 1);
                    } else if (res.data.code == 204) {
                        this.$prompt('请输入 “确认删除” 来强制删除所有内容', '警告，此科室下还有二级科室或医生', {
                            confirmButtonText: '强制删除',
                            cancelButtonText: '取消',
                            inputPattern: /确认删除/,
                            inputErrorMessage: '确认信息错误'
                        }).then(({ value }) => {
                            //强制删除
                            this.$http.delete(`admin/dep/delDepOne?id=${id}&isStrict=strict`).then(res => {
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

        },
        //开关科室
        onoroff($event, index) {
            let map = { false: 0, true: 1 }
            let tw = $event ? '开启' : '关闭';
            let data = {
                state: map[$event],
                id: this.list[index].id
            }
            this.$confirm(`此操作将${tw}此科室, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.put('admin/dep/switchDepOne', data).then(res => {
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
            if (this.hosvalue == '') return this.$message.error('请输入完整')
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            console.log('this.hosvalue', this.hosvalue)
            this.$http.get(`simple/getDepOne?paging=on&hosId=${this.hosvalue}&page=1&limit=15`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    console.log(' ', res.data.data)
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
            this.$http.get(`simple/getDepOne?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data
                    this.count = res.data.count
                    this.isyuan = false
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
            this.$http.get(`simple/getDepOne?paging=on&paging=on&page=1&limit=${this.count}`).then(res => {
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
                    科室ID: item.id,
                    名称: item.name,
                    所属分院: item.hosName,
                    分院id: item.hosId,
                    状态: item.state == '0' ? '已关闭' : '开放中'
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "一级科室列表");
            let name = "一级科室明细.xlsx";
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

        .dy2 {
            position: absolute;
            right: 230px;
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

        .el-pagination {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
            margin-right: 15px;
        }
    }
}
</style>