<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">医院导航管理</p>
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
            <el-button type="primary" plain class="dy" @click="utw = true">
                添加
            </el-button>
        </div>
        <el-card class="box-card">
            <!-- 表格 -->
            <el-table :row-style="{ height: '55px' }" id="out-table" :data="list" style="width: 100%" height="660"
                :fit="true">
                <el-table-column prop="id" label="ID" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="floorName" label="楼层名称" min-width="140" align="center">
                </el-table-column>
                <el-table-column prop="content" :show-overflow-tooltip="true" label="楼层内容" min-width="300"
                    align="center">
                </el-table-column>

                <el-table-column fixed="right" label="操作" min-width="130" align="center">
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
            <el-dialog v-el-drag-dialog title="添加楼层导航信息" :visible.sync="utw" width="500px">
                <el-form label-width="60">
                    <el-form-item label="楼层名称">
                        <el-input v-model="modinfo.floorName" autocomplete="off" placeholder="例如：一楼"></el-input>
                    </el-form-item>
                    <el-form-item label="楼层内容">
                        <el-input v-model="modinfo.content" type="textarea" autocomplete="off" placeholder="请输入楼层中涉及科室">
                        </el-input>
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
import elDragDialog from "../../tools/el-dragDialog";
import * as XLSX from 'xlsx'
export default {
    directives: {
        elDragDialog,
    },
    data() {
        return {
            list: [],
            currentPage: 1,
            count: 0,
            pageSize: 12,
            height: 670,
            sw: [],
            utw: false,
            name: '',
            id: 0,
            index: 0,
            hosId: 0,
            modinfo: {
                floorName: '',
                content: '',
            }
        }
    },
    methods: {

        // 分页，页数改变时触发
        handleCurrentChange(val) {
            this.currentPage = val
            this.$http.get(`api/navigation?hosId=${this.hosId}&and=floor&paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`api/navigation?hosId=${this.hosId}&and=floor&paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`api/navigation?hosId=${this.hosId}&and=floor&paging=on&page=1&limit=12`).then(res => {
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
        //修改
        mod(index, id) {
            this.utw = true;
            this.name = this.list[index].name;
            this.id = id;
            this.index = index
        },
        //提交添加
        post() {
            if (this.modinfo.floorName == '' || this.modinfo.content == '') return this.$message.error('请输入完整');
            this.$http.post('admin/navigationAddFloor', {
                floorName: this.modinfo.floorName,
                content: this.modinfo.content,
                hosId: this.hosId,
            }).then(res => {
                if (res.data.code == 200) {
                    this.$message.success(res.data.msg);
                    this.utw = false;
                    let obj = {};
                    obj.id = 'new'
                    obj.floorName = this.modinfo.floorName;
                    obj.content = this.modinfo.content;
                    this.list.push(obj);
                    this.utw = false
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        },
        uigo(id) {
            this.$router.push({
                path: '/navigation/floor',
                query: {
                    id: id
                }
            })
        },
        //删除
        del(index, id) {
            this.$prompt('请输入 “确认删除” 来强制删除所有内容', '警告，危险操作', {
                confirmButtonText: '强制删除',
                cancelButtonText: '取消',
                inputPattern: /确认删除/,
                inputErrorMessage: '确认信息错误'
            }).then(({ value }) => {
                //强制删除
                this.$http.delete(`admin/navigationDelFloor?floorId=${id}`).then(res => {
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

        // 导出当前页
        exportDataNow() {
            this.exportNewList(this.list);
        },
        // 全部导出，请求全部数据
        exportDataoz() {
            this.$http.get(`api/navigation?hosId=${this.hosId}&and=floor&paging=on&paging=on&page=1&limit=${this.count}`).then(res => {
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
                    楼层名称: item.floorName,
                    内容: item.content
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "楼层列表");
            let name = "楼层导航明细.xlsx";
            loading.close()
            XLSX.writeFile(bookNew, name); // 保存的文件名
        },
    },
    created() {
        this.hosId = this.$route.query.id;
        this.getInfo();
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

        .el-pagination {
            margin-top: 10px;
            display: flex;
            justify-content: flex-end;
            margin-right: 15px;
        }
    }
}
</style>