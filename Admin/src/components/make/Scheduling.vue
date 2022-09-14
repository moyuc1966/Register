<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">医生排班</p>
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
            <el-button type="primary" plain class="dytj" @click="addUtw = true">
                添加排班
            </el-button>
        </div>
        <el-card>
            <div class="tableHead">
                <el-radio-group v-model="week.seat" size="small" @change="weekseat">
                    <el-radio-button label="上一周"></el-radio-button>
                    <el-radio-button label="本周"></el-radio-button>
                    <el-radio-button label="下一周"></el-radio-button>
                </el-radio-group>
            </div>
            <dir id="out-table">
                <el-table :key="week.value" :row-style="{ height: '55px' }" id="out-table" :data="list"
                    style="width: 100%" height="640" size="mini" :fit="true" :border="true">
                    <el-table-column fixed prop="doctorName" label="医生姓名" min-width="100" align="center">
                    </el-table-column>
                    <el-table-column fixed prop="depName" label="科室" min-width="100" align="center"></el-table-column>

                    <el-table-column label="周一" min-width="120" align="center">
                        <template slot="header">
                            {{ weeks[0] }}
                        </template>
                        <el-table-column fixed prop="Mnum1" label="上午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Mstate1)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Msurplus1 }}</span>/{{ scope.row.Mnum1 }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="Anum1" label="下午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Astate1)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Asurplus1 }}</span>/{{ scope.row.Anum1 }}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column label="周二" min-width="120" align="center">
                        <template slot="header">
                            {{ weeks[1] }}
                        </template>
                        <el-table-column fixed prop="Mnum2" label="上午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Mstate2)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Msurplus2 }}</span>/{{ scope.row.Mnum2 }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="Anum2" label="下午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Astate2)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Asurplus2 }}</span>/{{ scope.row.Anum2 }}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column label="周三" min-width="120" align="center">
                        <template slot="header">
                            {{ weeks[2] }}
                        </template>
                        <el-table-column fixed prop="Mnum3" label="上午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Mstate3)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Msurplus3 }}</span>/{{ scope.row.Mnum3 }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="Anum3" label="下午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Astate3)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Asurplus3 }}</span>/{{ scope.row.Anum3 }}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column label="周四" min-width="120" align="center">
                        <template slot="header">
                            {{ weeks[3] }}
                        </template>
                        <el-table-column fixed prop="Mnum4" label="上午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Mstate4)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Msurplus4 }}</span>/{{ scope.row.Mnum4 }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="Anum2" label="下午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Astate4)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Asurplus4 }}</span>/{{ scope.row.Anum4 }}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column label="周五" min-width="120" align="center">
                        <template slot="header">
                            {{ weeks[4] }}
                        </template>
                        <el-table-column fixed prop="Mnum5" label="上午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Mstate5)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Msurplus5 }}</span>/{{ scope.row.Mnum5 }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="Anum2" label="下午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Astate5)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Asurplus5 }}</span>/{{ scope.row.Anum5 }}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table-column>

                    <el-table-column label="周六" min-width="120" align="center">
                        <template slot="header">
                            {{ weeks[5] }}
                        </template>
                        <el-table-column fixed prop="Mnum6" label="上午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Mstate6)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Msurplus6 }}</span>/{{ scope.row.Mnum6 }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="Anum2" label="下午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Astate6)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Asurplus6 }}</span>/{{ scope.row.Anum6 }}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column label="周日" min-width="120" align="center">
                        <template slot="header">
                            {{ weeks[6] }}
                        </template>
                        <el-table-column fixed prop="Mnum7" label="上午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Mstate7)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Msurplus7 }}</span>/{{ scope.row.Mnum7 }}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed prop="Anum2" label="下午" min-width="60" align="center">
                            <template slot-scope="scope">
                                <span v-if="isfalse(scope.row.Astate7)">
                                    休息
                                </span>
                                <span v-else>
                                    <span style="color:red;">{{ scope.row.Asurplus7 }}</span>/{{ scope.row.Anum7 }}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" min-width="90" align="center">
                        <template slot-scope="scope">
                            <i class="el-icon-s-tools" style="color:#1a7cff; font-size:20px; cursor:pointer;"
                                @click="det(scope.$index)"></i>
                        </template>
                    </el-table-column>
                </el-table>
            </dir>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="currentPage" :page-sizes="[12, 10, 20, 30, 50]" :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper" :total="count">
            </el-pagination>

            <!-- 设置弹窗 -->
            <el-dialog :show-close="false" width="930px" :visible.sync="dialogTableVisible" class="setUtw">
                <div class="setMain">
                    <div class="set-left">
                        <p class="set-title">{{ setList.doctorName }}医生排班详情</p>
                        <p class="ri">{{ weekList[bindIndex] }}</p>
                        <p class="MorA">上午</p>
                        <p class="isxiu" v-if="isfalse(setList['Mstate' + (bindIndex + 1)])">休息</p>
                        <div class="MorAxiang" v-else>
                            <p class="xiang-t">时间段：{{ setList['MtimeSegment' + (Number(bindIndex) + 1)] }}</p>
                            <p class="xiang-t">接诊人数：{{ setList['Mnum' + (Number(bindIndex) + 1)] }}</p>
                            <p class="xiang-t">剩余人数：{{ setList['Msurplus' + (Number(bindIndex) + 1)] }}</p>
                        </div>
                        <p class="MorA">下午</p>
                        <p class="isxiu" v-if="isfalse(setList['Astate' + (bindIndex + 1)])">休息</p>
                        <div class="MorAxiang" v-else>
                            <p class="xiang-t">时间段：{{ setList['AtimeSegment' + (Number(bindIndex) + 1)] }}</p>
                            <p class="xiang-t">接诊人数：{{ setList['Anum' + (Number(bindIndex) + 1)] }}</p>
                            <p class="xiang-t">剩余人数：{{ setList['Asurplus' + (Number(bindIndex) + 1)] }}</p>
                        </div>
                    </div>
                    <div class="set-right">
                        <div class="set-right-head">
                            <el-radio-group v-model="swtWeek.seat" size="small" @change="setWeekChange">
                                <el-radio-button label="上一周"></el-radio-button>
                                <el-radio-button label="本周"></el-radio-button>
                                <el-radio-button label="下一周"></el-radio-button>
                            </el-radio-group>
                            <div>
                                <el-button type="primary" size="medium" @click="setMod">设置排班</el-button>
                                <el-button type="primary" size="medium" plain @click="dialogTableVisible = false">关闭
                                </el-button>
                            </div>
                        </div>
                        <div class="list-box">
                            <div class="block" @click="blockBind(index)"
                                :style="{ background: isbag[index] ? '#2783ff' : '#fff' }"
                                v-for="(item, index) in weekList" :key="index">
                                <p class="set-zhou" :style="{ color: isbag[index] ? '#fff' : '#1a7cff' }">{{
                                        item.slice(-2)
                                }}</p>
                                <p class="set-ri" :style="{ color: isbag[index] ? '#eee' : '#1a7cff' }">{{
                                        item.slice(0, -3)
                                }}</p>
                                <p class="Na">
                                    <span :style="{ color: isbag[index] ? '#fdf60a' : '#06a52f' }" v-if="(isfalse(setList['Mstate' + (index + 1)]) &&
                                isfalse(setList['Astate' +
                                    (index + 1)]))">
                                        休息
                                    </span>
                                    <span v-else :style="{ color: isbag[index] ? '#fff' : '#1a7cff' }">

                                        {{ '号源' + ((isfalse(setList['Mstate' + (index + 1)]) ?
                                                0 : Number(setList['Mnum' + (index + 1)]))
                                                + (isfalse(setList['Astate' + (index + 1)]) ? 0 :
                                                    Number(setList['Anum'
                                                        + (index + 1)])))
                                        }}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 修改排班弹窗 -->
                <el-dialog close="modBox" :append-to-body="true" title="修改排班安排" :visible.sync="modUtw" class="addUtwBox"
                    width="430px">

                    <div class="addrow">
                        <P>上午状态</P>
                        <el-switch inactive-text="休息" active-text="工作" v-model="modobj.Mstate"></el-switch>
                    </div>
                    <div class="addrow">
                        <P>下午状态</P>
                        <el-switch inactive-text="休息" active-text="工作" v-model="modobj.Astate"></el-switch>
                    </div>
                    <div class="addMorA" style="margin-top:50px;">
                        <div class="addMorABlock M" v-if="modobj.Mstate">
                            <P class="tit">上午排班</P>
                            <el-time-picker style="width: 250px;" is-range v-model="modobj.MtimeSegment"
                                range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                                placeholder="选择时间范围">
                            </el-time-picker>
                            <el-input style="width: 250px;margin-top:15px;" type="Number" placeholder="上午可预约人数"
                                v-model="modobj.Mnum" maxlength="2" show-word-limit></el-input>
                        </div>
                        <div class="addMorABlock A" v-if="modobj.Astate">
                            <P class="tit">下午排班</P>
                            <el-time-picker style="width: 250px;" is-range v-model="modobj.AtimeSegment"
                                range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间"
                                placeholder="选择时间范围">
                            </el-time-picker>
                            <el-input type="Number" style="width: 250px;margin-top:15px;" placeholder="下午可预约人数"
                                v-model="modobj.Anum" maxlength="2" show-word-limit></el-input>
                        </div>
                    </div>

                    <div slot="footer" class="dialog-footer">
                        <el-button @click="modUtw = false">取 消</el-button>
                        <el-button type="primary" @click="mod">提交</el-button>
                    </div>
                </el-dialog>

            </el-dialog>

            <!-- 添加部分弹窗 -->
            <el-dialog title="添加一条排班" :visible.sync="addUtw" style="min-width:730px;" class="addUtwBox">
                <div class="addrow">
                    <P>选择医生</P>
                    <el-cascader class="seatDoctor" label="选择医生" :props="props" :options="options" v-model="addValue">
                    </el-cascader>
                </div>
                <div class="addrow">
                    <P>选择日期</P>
                    <el-date-picker v-model="addobj.time" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="addrow">
                    <P>上午状态</P>
                    <el-switch inactive-text="休息" active-text="工作" v-model="addobj.Mstate"></el-switch>
                </div>
                <div class="addrow">
                    <P>下午状态</P>
                    <el-switch inactive-text="休息" active-text="工作" v-model="addobj.Astate"></el-switch>
                </div>
                <div class="addMorA">
                    <div class="addMorABlock M" v-if="addobj.Mstate">
                        <P class="tit">上午排班</P>
                        <el-time-picker style="width: 250px;" is-range v-model="addobj.MtimeSegment" range-separator="至"
                            start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                        </el-time-picker>
                        <el-input style="width: 250px;margin-top:15px;" type="Number" placeholder="上午可预约人数"
                            v-model="addobj.Mnum" maxlength="2" show-word-limit></el-input>
                    </div>
                    <div class="addMorABlock A" v-if="addobj.Astate">
                        <P class="tit">下午排班</P>
                        <el-time-picker style="width: 250px;" is-range v-model="addobj.AtimeSegment" range-separator="至"
                            start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                        </el-time-picker>
                        <el-input type="Number" style="width: 250px;margin-top:15px; " placeholder="下午可预约人数"
                            v-model="addobj.Anum" maxlength="2" show-word-limit></el-input>
                    </div>
                </div>

                <div slot="footer" class="dialog-footer">
                    <el-button @click="addUtw = false">取 消</el-button>
                    <el-button type="primary" @click="add">添加</el-button>
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
            currentPage: 1,
            count: 0,
            pageSize: 12,
            week: {
                seat: '本周',
                value: 1
            },
            list: [],
            dataIndex: 0,
            dialogTableVisible: false,
            weeks: [],
            addUtw: false,
            options: [],
            props: {
                lazy: true,
                lazyLoad: this.lazyLoad
            },
            addValue: [],
            addobj: {
                time: '',
                Mstate: true,
                Astate: true,
                MtimeSegment: '',
                AtimeSegment: '',
                Mnum: '',
                Anum: '',
            },
            modobj: {
                time: '',
                Mstate: true,
                Astate: true,
                MtimeSegment: '',
                AtimeSegment: '',
                Mnum: '',
                Anum: '',
            },
            swtWeek: {
                seat: '本周',
                value: 1
            },
            weekList: [],
            setIndex: 0,
            isbag: [true, false, false, false, false, false, false],
            bindIndex: 0,
            setList: {},
            modUtw: false,
        }
    },
    created() {
        this.getInfo()
        this.getweeks(0)
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
    },
    methods: {
        getInfo() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get('arrange/admin/getList?week=1&page=1&limit=12').then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        isfalse(mun) {
            if (mun == '0' || mun == 0) return false
            return true
        },
        det(index) {
            this.setIndex = index;
            this.swtWeek = this.week;
            this.setList = this.list[index];
            let mapweek = { 0: -7, 1: 0, 2: 7 }
            let arr = this.getLorNweek(mapweek[this.swtWeek.value])
            this.weekList = arr
            this.dialogTableVisible = true;
        },
        blockBind(index) {
            this.bindIndex = index;
            let arr = new Array(this.isbag.length);
            arr.fill(false);
            arr[index] = true;
            this.isbag = arr;


        },
        weekseat(e) {
            let map = { '上一周': 0, '本周': 1, '下一周': 2 }
            let mapweek = { 0: -7, 1: 0, 2: 7 }
            this.getweeks(mapweek[map[e]])
            this.week.value = map[e]
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get(`arrange/admin/getList?week=${this.week.value}&page=1&limit=${this.pageSize}`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    this.list = res.data.data;
                    this.count = res.data.count;
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        setWeekChange(e) {
            let map = { '上一周': 0, '本周': 1, '下一周': 2 }
            let mapweek = { 0: -7, 1: 0, 2: 7 }
            // let arr = this.getLorNweek(mapweek[map[e]])
            // this.weekList = arr
            this.swtWeek.value = map[e]
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.get(`arrange/admin/weekArrange?week=${this.swtWeek.value}&doctorId=${this.list[this.setIndex].doctorId}`).then(res => {
                loading.close()
                if (res.data.code == 200) {
                    if (res.data.data.length == 0) {
                        this.swtWeek = {
                            seat: '本周',
                            value: 1
                        }
                        this.$message.error('没有数据，请先添加')
                    } else {
                        let arr = this.getLorNweek(mapweek[map[e]])
                        this.weekList = arr
                        this.setList = res.data.data[0];
                    }
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        getweeks(n) {
            var currentFirstDate = new Date();
            var formatDate = function (date) {
                var year = date.getFullYear() + '-';
                var month = (date.getMonth() + 1) + '-';
                var day = date.getDate();
                var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];

                return year + month + day + ' ' + week;
            };
            let date = currentFirstDate
            let m = n
            var addDate = function (date, m) {
                date.setDate(date.getDate() + m);
                return date;
            };
            var arr = []
            var setDate = function (dates) {
                var week = dates.getDay() - 1;
                dates = addDate(dates, week * -1);
                currentFirstDate = new Date(date);
                for (var i = 0; i < 7; i++) {
                    arr[i] = formatDate(i == 0 ? dates : addDate(dates, 1))
                }
            };
            setDate(addDate(new Date(), n))

            this.weeks = arr;
        },
        getLorNweek(n) {
            var currentFirstDate = new Date();
            var formatDate = function (date) {
                var year = date.getFullYear() + '-';
                var month = (date.getMonth() + 1) + '-';
                var day = date.getDate();
                var week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()];

                return year + month + day + ' ' + week;
            };
            let date = currentFirstDate
            let m = n
            var addDate = function (date, m) {
                date.setDate(date.getDate() + m);
                return date;
            };
            var arr = []
            var setDate = function (dates) {
                var week = dates.getDay() - 1;
                dates = addDate(dates, week * -1);
                currentFirstDate = new Date(date);
                for (var i = 0; i < 7; i++) {
                    arr[i] = formatDate(i == 0 ? dates : addDate(dates, 1))
                }
            };
            setDate(addDate(new Date(), n))
            return arr;
        },
        add() {
            if (!this.addobj.Mstate && !this.addobj.Astate) return this.$message.error('请选择一个排班时间')
            if (this.addobj.MtimeSegment == '' && this.addobj.AtimeSegment == '') return this.$message.error('请选择时间段')
            if (this.addobj.Mnum == '' && this.addobj.Anum == '') return this.$message.error('请输入可预约人数')
            if (this.addobj.time == '') return this.$message.error('请选择排班时间')
            if (this.addValue[0] == null) return this.$message.error('请选择医生')
            if (this.addobj.Astate == true && (this.addobj.Anum == '' || this.addobj.AtimeSegment == '')) return this.$message.error('请输入完整')
            if (this.addobj.Mstate == true && (this.addobj.Mnum == '' || this.addobj.MtimeSegment == '')) return this.$message.error('请输入完整')
            let doctorId = this.addValue[3]
            let hosId = this.addValue[0]
            let depTwoId = this.addValue[2]
            let Astate = this.addobj.Astate ? 0 : 1;
            let Mstate = this.addobj.Mstate ? 0 : 1;
            let AtimeSegment, MtimeSegment;
            function resTime(time) {
                const d = new Date(time)
                const resTime = p(d.getHours()) + '.' + p(d.getMinutes())
                function p(s) {
                    return s < 10 ? '0' + s : s
                }
                return resTime
            }
            if (this.addobj.Mstate) {
                MtimeSegment = resTime(this.addobj.MtimeSegment[0]) + '-' + resTime(this.addobj.MtimeSegment[1])
            } else {
                MtimeSegment = ''
            }
            if (this.addobj.Astate) {
                AtimeSegment = resTime(this.addobj.AtimeSegment[0]) + '-' + resTime(this.addobj.AtimeSegment[1])
            } else {
                AtimeSegment = ''
            }
            let data = {
                doctorId,
                hosId,
                depTwoId,
                Astate,
                Mstate,
                AtimeSegment,
                MtimeSegment,
                time: this.addobj.time
            }
            this.addUtw = false;
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.post('arrange/admin/createArrange', data).then(res => {
                if (res.data.code == 200) {
                    this.$http.get(`arrange/admin/getList?week=${this.week.value}&page=1&limit=${this.pageSize}`).then(res => {
                        loading.close()
                        if (res.data.code == 200) {
                            this.list = res.data.data;
                            this.count = res.data.count;
                            this.$message.success('提交成功')
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                } else {
                    loading.close()
                    this.$message.error(res.data.msg)
                }
            })
        },
        setMod() {
            this.modobj = {
                time: this.list[this.setIndex]['time' + (this.bindIndex + 1)],
                Mstate: this.isfalse(this.list[this.setIndex]['Mstate' + (this.bindIndex + 1)]) ? false : true,
                Astate: this.isfalse(this.list[this.setIndex]['Astate' + (this.bindIndex + 1)]) ? false : true,
                MtimeSegment: '',
                AtimeSegment: '',
                Mnum: this.list[this.setIndex]['Mnum' + (this.bindIndex + 1)] == '休息' ? 0 : this.list[this.setIndex]['Mnum' + (this.bindIndex + 1)],
                Anum: this.list[this.setIndex]['Anum' + (this.bindIndex + 1)] == '休息' ? 0 : this.list[this.setIndex]['Anum' + (this.bindIndex + 1)],
            }
            this.modUtw = true;

        },
        mod() {
            if (this.modobj.Mnum == '' && this.modobj.Anum == '') return this.$message.error('请输入可预约人数')
            if (this.modobj.Astate == true && (this.modobj.Anum == '' || this.modobj.AtimeSegment == '')) return this.$message.error('请输入完整')
            if (this.modobj.Mstate == true && (this.modobj.Mnum == '' || this.modobj.MtimeSegment == '')) return this.$message.error('请输入完整')

            let Astate = this.modobj.Astate ? 0 : 1;
            let Mstate = this.modobj.Mstate ? 0 : 1;
            let AtimeSegment, MtimeSegment;
            function resTime(time) {
                const d = new Date(time)
                const resTime = p(d.getHours()) + '.' + p(d.getMinutes())
                function p(s) {
                    return s < 10 ? '0' + s : s
                }
                return resTime
            }
            if (this.modobj.Mstate) {
                MtimeSegment = resTime(this.modobj.MtimeSegment[0]) + '-' + resTime(this.modobj.MtimeSegment[1])
            } else {
                MtimeSegment = ''
            }
            if (this.modobj.Astate) {
                AtimeSegment = resTime(this.modobj.AtimeSegment[0]) + '-' + resTime(this.modobj.AtimeSegment[1])
            } else {
                AtimeSegment = ''
            }
            let data = {
                id: this.list[this.setIndex]['id' + (this.bindIndex + 1)],
                Astate,
                Mstate,
                AtimeSegment,
                MtimeSegment,
                Anum: this.modobj.Anum,
                Mnum: this.modobj.Mnum,
                Asurplus: this.list[this.setIndex]['Asurplus' + (this.bindIndex + 1)] == '休息' ? 0 : this.list[this.setIndex]['Asurplus' + (this.bindIndex + 1)],
                Msurplus: this.list[this.setIndex]['Msurplus' + (this.bindIndex + 1)] == '休息' ? 0 : this.list[this.setIndex]['Msurplus' + (this.bindIndex + 1)],
            }


            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
            })
            this.$http.post('arrange/admin/modeArrange', data).then(res => {
                if (res.data.code == 200) {
                    this.$http.get(`arrange/admin/getList?week=${this.week.value}&page=1&limit=${this.pageSize}`).then(res => {
                        loading.close()
                        if (res.data.code == 200) {
                            this.list = res.data.data;
                            this.count = res.data.count;
                            this.setList = this.list[this.setIndex]
                            this.modUtw = false;
                            this.$message.success('修改成功')
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                } else if (res.data.code == 400 && res.data.msg == '参数错误') {
                    loading.close()
                    this.$message({
                        message: '请先添加当天的排班',
                        type: 'warning'
                    });

                } else {
                    loading.close()
                    this.$message.error(res.data.msg)
                }
            })
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
            this.$http.get(`arrange/admin/getList?week=${this.week.value}&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data;
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        // 分页，每页条数改变时触发
        handleSizeChange(val) {
            this.pageSize = val
            this.$http.get(`arrange/admin/getList?week=${this.week.value}&page=${this.currentPage}&limit=${this.pageSize}`).then(res => {
                if (res.data.code == 200) {
                    this.list = res.data.data
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
        exportDataNow() {
            this.exportNewList(this.list);
        },
        // 全部导出，请求全部数据
        exportDataoz() {
            this.$http.get(`arrange/admin/getList?page=1&limit=${this.count}`).then(res => {
                if (res.data.code == 200) {
                    this.exportNewList(res.data.data);
                } else {
                    this.$message.error(res.data.msg)
                }
            })
        },
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
        },
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
                    姓名: item.doctorName,
                    科室: item.depName,
                    医院: item.hosName,
                    周一日期: item.time1,
                    周一上午状态: item.Mstate1 == '0' ? '正常' : '休息',
                    周一上午时间段: item.Mstate1 == 0 ? item.MtimeSegment1 : '',
                    周一上午数量: item.Mstate1 == 0 ? item.Mnum1 : '',
                    周一上午余量: item.Mstate1 == 0 ? item.Msurplus1 : '',
                    周一下午状态: item.Astate1 == '0' ? '正常' : '休息',
                    周一下午时间段: item.Astate1 == 0 ? item.AtimeSegment1 : '',
                    周一下午数量: item.Astate1 == 0 ? item.Anum1 : '',
                    周一下午余量: item.Astate1 == 0 ? item.Asurplus1 : '',
                    周二日期: item.time2,
                    周二上午状态: item.Mstate2 == '0' ? '正常' : '休息',
                    周二上午时间段: item.Mstate2 == 0 ? item.MtimeSegment2 : '',
                    周二上午数量: item.Mstate2 == 0 ? item.Mnum2 : '',
                    周二上午余量: item.Mstate2 == 0 ? item.Msurplus2 : '',
                    周二下午状态: item.Astate2 == '0' ? '正常' : '休息',
                    周二下午时间段: item.Astate2 == 0 ? item.AtimeSegment2 : '',
                    周二下午数量: item.Astate2 == 0 ? item.Anum2 : '',
                    周二下午余量: item.Astate2 == 0 ? item.Asurplus2 : '',
                    周三日期: item.time3,
                    周三上午状态: item.Mstate3 == '0' ? '正常' : '休息',
                    周三上午时间段: item.Mstate3 == 0 ? item.MtimeSegment3 : '',
                    周三上午数量: item.Mstate3 == 0 ? item.Mnum3 : '',
                    周三上午余量: item.Mstate3 == 0 ? item.Msurplus3 : '',
                    周三下午状态: item.Astate3 == '0' ? '正常' : '休息',
                    周三下午时间段: item.Astate3 == 0 ? item.AtimeSegment3 : '',
                    周三下午数量: item.Astate3 == 0 ? item.Anum3 : '',
                    周三下午余量: item.Astate3 == 0 ? item.Asurplus3 : '',
                    周四日期: item.time4,
                    周四上午状态: item.Mstate4 == '0' ? '正常' : '休息',
                    周四上午时间段: item.Mstate4 == 0 ? item.MtimeSegment4 : '',
                    周四上午数量: item.Mstate4 == 0 ? item.Mnum4 : '',
                    周四上午余量: item.Mstate4 == 0 ? item.Msurplus4 : '',
                    周四下午状态: item.Astate4 == '0' ? '正常' : '休息',
                    周四下午时间段: item.Astate4 == 0 ? item.AtimeSegment4 : '',
                    周四下午数量: item.Astate4 == 0 ? item.Anum4 : '',
                    周四下午余量: item.Astate4 == 0 ? item.Asurplus4 : '',
                    周五日期: item.time5,
                    周五上午状态: item.Mstate5 == '0' ? '正常' : '休息',
                    周五上午时间段: item.Mstate5 == 0 ? item.MtimeSegment5 : '',
                    周五上午数量: item.Mstate5 == 0 ? item.Mnum5 : '',
                    周五上午余量: item.Mstate5 == 0 ? item.Msurplus5 : '',
                    周五下午状态: item.Astate5 == '0' ? '正常' : '休息',
                    周五下午时间段: item.Astate5 == 0 ? item.AtimeSegment5 : '',
                    周五下午数量: item.Astate5 == 0 ? item.Anum5 : '',
                    周五下午余量: item.Astate5 == 0 ? item.Asurplus5 : '',
                    周六日期: item.time6,
                    周六上午状态: item.Mstate6 == '0' ? '正常' : '休息',
                    周六上午时间段: item.Mstate6 == 0 ? item.MtimeSegment6 : '',
                    周六上午数量: item.Mstate6 == 0 ? item.Mnum6 : '',
                    周六上午余量: item.Mstate6 == 0 ? item.Msurplus6 : '',
                    周六下午状态: item.Astate6 == '0' ? '正常' : '休息',
                    周六下午时间段: item.Astate6 == 0 ? item.AtimeSegment6 : '',
                    周六下午数量: item.Astate6 == 0 ? item.Anum6 : '',
                    周六下午余量: item.Astate6 == 0 ? item.Asurplus6 : '',
                    周日日期: item.time7,
                    周日上午状态: item.Mstate7 == '0' ? '正常' : '休息',
                    周日上午时间段: item.Mstate7 == 0 ? item.MtimeSegment7 : '',
                    周日上午数量: item.Mstate7 == 0 ? item.Mnum7 : '',
                    周日上午余量: item.Mstate7 == 0 ? item.Msurplus7 : '',
                    周日下午状态: item.Astate7 == '0' ? '正常' : '休息',
                    周日下午时间段: item.Astate7 == 0 ? item.AtimeSegment7 : '',
                    周日下午数量: item.Astate7 == 0 ? item.Anum7 : '',
                    周日下午余量: item.Astate7 == 0 ? item.Asurplus7 : ''
                }
                tableData.push(obj);
            });
            var xlsxParam = { raw: true };
            let workSheet = XLSX.utils.json_to_sheet(tableData, xlsxParam);
            let bookNew = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(bookNew, workSheet, "排班列表");
            let name = "医生排班明细.xlsx";
            loading.close()
            XLSX.writeFile(bookNew, name); // 保存的文件名
        },

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

        .dytj {
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
                // position: absolute;
                // left: 90px;
                margin-left: 50px;
            }

            .searchButton {
                margin-left: 15px;
            }

            .yuan {
                margin-left: 15px;
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

    .addrow {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 25px 0 25px 0;

        .seatDoctor {
            display: block;
            width: 380px;
        }

        p {
            margin-left: 35px;
            display: block;
            width: 100px;
            color: #858282cc;
        }
    }

    .addMorA {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        flex-wrap: wrap;

        .addMorABlock {
            width: 49%;
            min-width: 285px;
            border: 1px solid #eee;
            border-radius: 3px;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 15px;

            .tit {
                font-size: 14px;
                color: #858282cc;
            }
        }
    }

    .addrow {
        display: flex;
        align-items: center;
        width: 100%;
        margin: 25px 0 25px 0;

        .seatDoctor {
            display: block;
            width: 380px;
        }

        p {
            margin-left: 35px;
            display: block;
            width: 100px;
            color: #858282cc;
        }
    }

    .addMorA {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        flex-wrap: wrap;

        .addMorABlock {
            width: 49%;
            min-width: 285px;
            border: 1px solid #eee;
            border-radius: 3px;
            padding: 10px;
            box-sizing: border-box;
            margin-bottom: 15px;

            .tit {
                font-size: 14px;
                color: #858282cc;
            }
        }
    }
}

.setUtw /deep/ .el-dialog__header {
    padding: 0 !important;
}

.setUtw {
    padding: 0;

    /deep/ .el-dialog__body {
        padding: 0;
    }

    .setMain {
        height: 500px;
        width: 100%;
        display: flex;

        .set-left {
            height: 100%;
            width: 200px;
            background: #ff9138;

            .set-title {
                font-size: 15px;
                color: #fff;
                display: block;
                width: 100%;
                text-align: center;
                margin-top: 10px;
                padding: 0 10px;
            }

            .ri {
                color: #fff;
                font-size: 22px;
                font-weight: bold;
                padding: 0 10px;
                margin-top: 10px;
            }

            .MorA {
                color: #fff;
                text-align: left;
                margin: 15px 0 0 10px;
                font-size: 17px;
            }

            .MorAxiang {
                text-align: left;
                padding-left: 25px;
                color: #fff;
            }

            .isxiu {
                font-size: 15px;
                display: block;
                width: 80%;
                height: 40px;
                text-align: center;
                line-height: 40px;
                border: 1px dashed #cdbbad;
                margin: 10px auto;
                color: #fff;
            }
        }

        .set-right {
            height: 100%;
            width: calc(100% - 200px);

            .set-right-head {
                display: flex;
                justify-content: space-between;
                padding: 20px 20px 0 20px;
            }

            .list-box {
                margin-top: 25px;
                margin-left: 20px;
                width: auto;
                height: auto;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;

                .block {
                    width: 120px;
                    height: 150px;
                    margin: 0.5px;
                    border: 1px solid #eee;
                    margin: 0 -1px -1px 0;

                    .set-zhou {
                        margin-top: 15px;
                        font-size: 18px;
                        color: #1a7cff;
                        text-align: center;
                        margin-bottom: 0;
                        font-weight: bold;
                    }

                    .set-ri {
                        margin-top: 6px;
                        color: #4390f5;
                        font-size: 15px;
                        text-align: center;
                    }

                    .Na {
                        color: #1a7cff;
                        font-size: 13px;
                        margin-top: 28px;
                    }
                }
            }
        }
    }
}

.modBox /deep/ .el-dialog__body {
    padding-top: 0 !important;
}
</style>