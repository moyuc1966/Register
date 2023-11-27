<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">医生管理</p>
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
            <el-button type="primary" plain class="dy" @click="addpost">
                新增
            </el-button>
        </div>
        <el-card class="box-card">
            <div class="tableHead">
                <el-cascader :props="props" :options="options" v-model="dep" style="width:300px;"></el-cascader>
                <el-button class="searchButton" size="primary" plain @click="searchBind">搜索</el-button>
                <el-button v-if="isyuan" class="yuan" size="primary" plain @click="yuan">原数据
                </el-button>
            </div>
            <!-- 表格 -->
            <el-table :row-style="{ height: '55px' }" id="out-table" :data="list" style="width: 100%" height="660"
                :fit="true">
                <el-table-column fixed prop="name" label="医生姓名" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="photo" label="照片" min-width="60" align="center">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="单击预览，下拉修改" placement="top-start">
                            <el-dropdown>
                                <el-image
                                    style="width: 40px;top:3px; height: 40px;border:1px solid #eee; padding:1px;border-radius: 3px;"
                                    :src="apiUrl + scope.row.photo"
                                    :preview-src-list="[apiUrl + list[scope.$index].photo]">
                                </el-image>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><span @click="modp(scope.row.id, scope.$index)">修改</span>
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column prop="position" label="职称" min-width="90" align="center">
                </el-table-column>
                <el-table-column prop="reg" label="问诊费" min-width="90" align="center">
                    <template slot-scope="scope">
                        ￥{{ two(scope.row.reg) }}
                    </template>
                </el-table-column>
                <el-table-column prop="dia" label="诊查费" min-width="90" align="center">
                    <template slot-scope="scope">
                        ￥{{ two(scope.row.dia) }}
                    </template>
                </el-table-column>
                <el-table-column prop="hosName" label="所属分院" min-width="170" align="center">
                </el-table-column>
                <el-table-column prop="depName" label="所属科室" min-width="140" align="center">
                </el-table-column>
                <el-table-column prop="brief" label="简介" min-width="100" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" plain @click="look(scope.row.brief)">查看
                        </el-button>
                    </template>
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
            <el-dialog title="修改医生信息" :visible.sync="utw" width="500px">
                <el-form label-width="60">
                    <el-form-item label="名称">
                        <el-input v-model="info.name" autocomplete="off" placeholder="请输入医生姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="职称">
                        <el-select v-model="info.position" placeholder="请选择职称" style="width: 100%;">
                            <el-option v-for="item in ['主治医师', '主任医师', '副主任医师']" :key="item" :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="问诊费">
                        <el-input v-model="info.reg" type="number" autocomplete="off" placeholder="请输入问诊费金额"></el-input>
                    </el-form-item>
                    <el-form-item label="诊查费">
                        <el-input v-model="info.dia" type="number" autocomplete="off" placeholder="除挂号费以外的诊查费">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input v-model="info.brief" type="textarea" autocomplete="off" placeholder="医生的简介">
                        </el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer">
                    <el-button @click="utw = false">取 消</el-button>
                    <el-button type="primary" @click="post">提交</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改医生照片" :visible.sync="modutw" width="500px">
                <el-upload class="centerImg" :action="' '" list-type="picture-card" :auto-upload="false" :limit="1"
                    :on-change="complete" ref="uploadicon">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="modutw = false">取 消</el-button>
                    <el-button type="primary" @click="photoMod">提交</el-button>
                </div>
            </el-dialog>
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
            utw: false,
            info: {
                name: '',
                position: '',
                reg: '',
                dia: '',
                brief: '',
            },
            id: 0,
            index: 0,
            options: [],
            props: {
                lazy: true,
                lazyLoad: this.lazyLoad
            },
            dep: [],
            modutw: false,
            modinfo: {
                id: 0,
                index: 0,
            },
            photo: '',
        }
    },
    methods: {
        two(val) {
            return Number(val).toFixed(2)
        },
        look(brief) {
            this.$alert(brief, '医生简介', {
                confirmButtonText: '确定',
                callback: action => {
                }
            });
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
                            leaf: level >= 2
                        })
                    })
                    resolve(arr2);
                })
            }
            else if (level == 2) {
                this.$http.get(`simple/getDepTwo?depId=${node.value}`).then(res => {
                    let arr = res.data.data;
                    let arr2 = []
                    arr.forEach(item => {
                        arr2.push({
                            value: item.id,
                            label: item.name,
                            leaf: level >= 2
                        })
                    })
                    resolve(arr2);
                })
            }
        },
        //新增提交
        addpost() {
            this.$router.push('/dep//doctor/add')
        },
        complete(file, fileList) {
            const isJPG = file.raw.type === 'image/jpeg'
            const isPNG = file.raw.type === 'image/png'
            const isLt2M = file.raw.size / 1024 / 1024 < 5
            this.hideUploadIcon = fileList.length >= 1;
            if (!isPNG && !isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
                return false
            } else if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 5MB!')
                return false
            } else if (isLt2M && (isPNG || isJPG)) {
                this.photo = file.raw;//图片的url
            }
        },
        //修改
        modp(id, index) {
            this.modutw = true;
            this.modinfo.id = id;
            this.modinfo.index = index;
        },
        //修改提价
        photoMod() {
            let config = {
                "Content-Type": "multipart/form-data"
            }
            let data = new FormData();
            data.append('photo', this.photo);
            data.append('doctorId', this.modinfo.id);
            this.$http.post('admin/dep/moddepDocImg', data, config).then(res => {
                if (res.data.code == 200) {
                    this.$message.success('修改成功');
                    this.list[this.modinfo.index].photo = res.data.photo
                } else {
                    this.$message.error(res.data.msg);
                }
            })
        },
        // 字段筛选
        filterHandler(value, row, column) {
            const property = column['property'];
            return row[property] == value;
        },

        // 分页，页数改变时触发
        handleCurrentChange(val) {
            this.currentPage = val
            this.$http.get(`simple/getDoctor?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`simple/getDoctor?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get('simple/getDoctor?paging=on&page=1&limit=12').then(res => {
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
        },
        //修改
        mod(index, id) {
            this.utw = true;
            this.info = {
                name: this.list[index].name,
                position: this.list[index].position,
                reg: this.list[index].reg,
                dia: this.list[index].dia,
                brief: this.list[index].brief,
            },
                this.id = id;
            this.index = index
        },
        //提交修改
        post() {
            if (this.name == '' && this.address) return this.$message.error('请输入修改内容');
            let data = {
                doctorId: this.id,
                name: this.info.name,
                position: this.info.position,
                reg: this.info.reg,
                dia: this.info.dia,
                brief: this.info.brief,
            }
            this.$http.post('admin/dep/moddepDoc', data).then(res => {
                if (res.data.code == 200) {
                    this.$message.success(res.data.msg);
                    this.utw = false;
                    let obj = {
                        photo: this.list[this.index].photo,
                        name: this.info.name,
                        position: this.info.position,
                        reg: this.info.reg,
                        dia: this.info.dia,
                        brief: this.info.brief,
                        depName: this.list[this.index].depName,
                        hosName: this.list[this.index].hosName,
                        state: this.list[this.index].state ? true : false
                    }
                    this.list[this.index] = obj;
                } else {
                    this.$message.error(res.data.msg);
                }
            })

        },
        //删除
        del(index, id) {

            this.$prompt('请输入 “确认删除” 来强制删除所有内容', '警告，此操作会直接删除一个医生', {
                confirmButtonText: '强制删除',
                cancelButtonText: '取消',
                inputPattern: /确认删除/,
                inputErrorMessage: '确认信息错误'
            }).then(({ value }) => {
                //强制删除
                this.$http.delete(`admin/dep/delDoctor?id=${id}`).then(res => {
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
        //开关科室
        onoroff($event, index) {
            let map = { false: 0, true: 1 }
            let tw = $event ? '开启' : '关闭';
            let data = {
                state: map[$event],
                id: this.list[index].id
            }
            this.$confirm(`此操作将${tw}此医生, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$http.put('admin/dep/switchDoctor', data).then(res => {
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
            console.log('this.dep', this.dep[2])
            if (this.dep[2] == null) return this.$message.error('请选择科室')
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get(`simple/getDoctor?paging=on&depTwoId=${this.dep[2]}&page=1&limit=12`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data
                    this.count = res.data.count
                    this.isyuan = true
                    let arr = new Array(this.list.length)
                    for (let i = 0; i < this.list.length; i++) {
                        arr[i] = this.list[i].state ? true : false
                        console.log('arr[i]', arr[i])
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
            this.$http.get(`simple/getDoctor?paging=on&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
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
            this.$http.get(`simple/getDoctor?paging=on&page=1&limit=${this.count}`).then(res => {
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
                    医生姓名: item.name,
                    职称: item.position,
                    问诊费: item.reg,
                    诊查费: item.dia,
                    所属分院: item.hosName,
                    所属科室: item.depName,
                    状态: item.state == '0' ? '已关闭' : '开放中',
                    简介: item.brief,
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
                left: 358px;
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