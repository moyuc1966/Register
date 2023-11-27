<template>
    <div class="main">
        <div class="head">
            <div class="tag"></div>
            <p class="tagTitle">首页-数据总览</p>
        </div>
        <div class="card" :v-loading="loading">
            <div class="lan">
                <div class="block">
                    <img src="../../images/u2803.svg"
                        style="background:linear-gradient(270deg, rgba(98, 156, 244, 1) 0%, rgba(0, 110, 255, 1) 100%)" />
                    <div class="lan-unm">
                        <p class="number">{{ list.appointments }}</p>
                        <p class="ts">今日预约人数</p>
                    </div>
                </div>
                <div class="block">
                    <img src="../../images/u2809.svg"
                        style="background:linear-gradient(270deg, rgba(236, 128, 141, 1) 0%, rgba(244, 99, 99, 1) 100%)" />
                    <div class="lan-unm">
                        <p class="number">￥{{ list.recharge }}</p>
                        <p class="ts">今日充值总额</p>
                    </div>
                </div>
                <div class="block">
                    <img src="../../images/u2814.svg"
                        style="background:linear-gradient(270deg, rgba(202, 249, 130, 1) 0%, rgba(46, 212, 119, 1) 100%)" />
                    <div class="lan-unm">
                        <p class="number">￥{{ list.outpatient }}</p>
                        <p class="ts">今日诊费总额</p>
                    </div>
                </div>
                <div class="block">
                    <img src="../../images/u2821.svg"
                        style="background:linear-gradient(270deg, rgba(250, 205, 145, 1) 1%, rgba(255, 145, 56, 1) 100%)" />
                    <div class="lan-unm">
                        <p class="number">￥{{ list.refund }}</p>
                        <p class="ts">今日退款总额</p>
                    </div>
                </div>
                <div class="block">
                    <img src="../../images/u2827.svg"
                        style="background:linear-gradient(270deg, rgba(194, 128, 255, 1) 0%, rgba(132, 0, 255, 1) 100%)" />
                    <div class="lan-unm">
                        <p class="number">{{ list.users }}</p>
                        <p class="ts">今日注册用户</p>
                    </div>
                </div>
            </div>
            <div class="chars">
                <div class="chars-left chars-block">
                    <p class="title">近7日挂号预约情况</p>
                    <div id="gua" style="width: 100%; height: 400px;"></div>
                </div>
                <div class="chars-right chars-block">
                    <p class="title">近7日门诊充值趋势</p>
                    <div id="zhen" style="width: 100%; height: 400px;"></div>
                </div>
            </div>
            <div class="table">
                <div class="table-left table-block">
                    <p class="title">最新挂号</p>
                    <i :class="icon" style="color: rgb(26, 124, 255);
    position: absolute;
    top: 24px;
    right: 30px;
    font-size: 20px;
    cursor: pointer;" @click="again"></i>
                    <el-table :stripe="true" class="table-left-table" :data="guaList" size="mini">
                        <el-table-column prop="type" label="预约类型" width="70">
                        </el-table-column>
                        <el-table-column prop="name" label="患者姓名">
                        </el-table-column>
                        <el-table-column prop="phone" label="手机号" min-width="100">
                        </el-table-column>
                        <el-table-column prop="depName" label="科室" min-width="100">
                        </el-table-column>
                        <el-table-column prop="price" label="挂号费">
                        </el-table-column>
                        <el-table-column prop="time" label="预约时间" min-width="160">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="table-right table-block">

                    <div class="table-right-left table-right-block">
                        <p class="title">热门科室</p>
                        <el-table class="table-right-left-table" :data="list.hotDep" size="mini">
                            <el-table-column type="index" label="排名" width="90">
                                <template slot-scope="scope">
                                    <p :style="{
                                        background: scope.$index == 0 ? '#f37477' : scope.$index == 1 ? '#4edb79' : scope.$index == 2 ? '#fda150' : '#c7c7c7',
                                    }" class="index"> {{ scope.$index + 1 }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="depName" label="科室">
                            </el-table-column>
                            <el-table-column prop="num" label="挂号量" width="70">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="table-right-right table-right-block">
                        <p class="title">热门医生</p>
                        <el-table class="table-right-left-table" :data="list.hotDoctor" size="mini">
                            <el-table-column type="index" label="排名" width="90">
                                <template slot-scope="scope">
                                    <p :style="{
                                        background: scope.$index == 0 ? '#f37477' : scope.$index == 1 ? '#4edb79' : scope.$index == 2 ? '#fda150' : '#c7c7c7',
                                    }" class="index"> {{ scope.$index + 1 }}</p>
                                </template>
                            </el-table-column>
                            <el-table-column prop="doctorName" label="医生" width="90">
                            </el-table-column>
                            <el-table-column prop="num" label="挂号量" width="90">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <div style="height:60px;width:1px;"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data() {
        return {
            loading: true,
            list: {},
            guaList: [],
            icon: 'el-icon-refresh'
        }
    },
    created() {
        this.mainInfo();
    },
    mounted() {
        this.echartsGua()

    },
    methods: {
        mainInfo() {
            this.$http.get('admin/statistics/latestReg').then(res => {
                this.guaList = res.data.data
            })
            this.$http.get('admin/statistics').then(res => {
                this.list = res.data
                this.loading = false
            })
        },
        again() {
            this.icon = 'el-icon-loading'
            this.$http.get('admin/statistics/latestReg').then(res => {
                this.guaList = res.data.data
                this.icon = 'el-icon-refresh'
                this.$message({
                    offset: 150,
                    type: 'success',
                    message: '刷新成功'
                })
            })
        },
        echartsGua() {
            this.$http.get('admin/statistics').then(res => {
                let makeList = res.data.makeList

                var chartDom = document.getElementById('gua');
                var myChart = echarts.init(chartDom);
                var option;
                let arr = [];
                let arr1 = [];
                makeList.forEach(item => {
                    arr.push(item.date)
                    arr1.push(item.num)
                })

                option = {
                    color: ['#77affc'],
                    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
                    xAxis: [{ type: 'category', data: arr, axisTick: { alignWithLabel: true } }],
                    yAxis: [{ type: 'value' }],
                    series: [{
                        name: '预约人数', type: 'bar', barWidth: '20%', data: arr1,
                        itemStyle: {
                            barBorderRadius: 5, borderWidth: 1, borderType: 'solid',
                            shadowColor: '#5470c6', shadowBlur: 3,
                            normal: {
                                label: { show: true, position: 'top', textStyle: { color: 'black', fontSize: 16 } }
                            }
                        }
                    },
                    ]
                };
                option && myChart.setOption(option);

                // 折线图
                var myChart = echarts.init(document.getElementById('zhen'));
                var option;
                let rechargeList = res.data.rechargeList
                arr = [];
                arr1 = [];
                rechargeList.forEach(item => {
                    arr.push(item.date)
                    arr1.push(item.money)
                })

                option = {
                    color: ['#fda150'],
                    xAxis: { type: 'category', data: arr },
                    yAxis: { type: 'value' },
                    series: [
                        {
                            data: arr1,
                            type: 'line',
                            name: '挂号费',
                            smooth: true,
                            label: { show: true, position: 'top', textStyle: { fontSize: 16 } },
                            lineStyle: { normal: { width: 6 } }
                        }
                    ]
                };
                option && myChart.setOption(option);




            })
        }
    },

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

        .tag {
            height: 8px;
            width: 25px;
            border-radius: 4px;
            background-color: #1a7cff;
        }

        .tagTitle {
            font-size: 23px;
            color: #000;
            margin-left: 15px;
        }
    }

    .card {
        width: 100%;
        min-height: 300px;
        margin-top: 10px;
        max-width: 1588px;

        .lan {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .block {
                height: 100px;
                min-width: 200px;
                max-width: 280px;
                width: calc(20% - 20px);
                background: #fff;
                border-radius: 5px;
                margin: 10px;
                box-shadow: 0px 0px 20px rgb(215 215 215);
                padding: 10px 20px;
                box-sizing: border-box;
                display: flex;
                justify-content: flex-start;

                img {
                    width: 80px;
                    height: 80px;
                    padding: 26px;
                    box-sizing: border-box;
                    border-radius: 4px;
                }

                .number {
                    font-family: 'PingFangSC-Semibold',
                        'PingFang SC Semibold',
                        'PingFang SC';
                    font-weight: 650;
                    font-size: 30px;
                    margin: 0;
                }

                .ts {
                    font-size: 12px;
                    color: #AAA;
                    margin-left: 20px;
                }
            }
        }

        .chars {
            width: 100%;
            height: 450px;
            margin: 22px 0 30px 0;
            display: flex;
            justify-content: flex-start;

            .chars-block {
                min-width: 630px;
                height: 450px;
                width: calc(50% - 30px);
                margin: 0 15px;
                border-radius: 5px;
                background: #fff;
                box-shadow: 0px 0px 20px rgb(215 215 215);

                #gua {
                    width: 100%;
                    height: 100%;
                }
            }
        }

        .table {
            height: 450px;
            width: 100%;
            display: flex;
            justify-content: flex-start;

            .table-block {
                min-width: 630px;
                height: 450px;
                width: calc(50% - 30px);
                margin: 0 15px;
                position: relative;
            }

            .table-left {
                border-radius: 5px;
                background: #fff;
                box-shadow: 0px 0px 20px rgb(215 215 215);

                .table-left-table {
                    width: 95% !important;
                    margin: 10px auto 0 auto;
                }

                .table-left-table /deep/ tr {
                    height: 55px !important;
                }
            }

            .table-right {
                display: flex;
                justify-content: space-between;

                .table-right-left-table {
                    width: 91% !important;
                    margin: 10px auto 0 auto;
                }

                .table-right-left-table /deep/ tr {
                    height: 55px !important;
                }

                .index {
                    display: block;
                    width: 32px;
                    height: 32px;
                    border-radius: 100%;
                    line-height: 32px;
                    text-align: center;
                    color: #fff;
                    font-size: 13px;
                    font-weight: bold;
                    margin: 0;
                }
            }

            .table-right-block {
                width: calc(50% - 15px);
                height: 100%;
                border-radius: 5px;
                background: #fff;
                box-shadow: 0px 0px 20px rgb(215 215 215);
                // margin: 0 15px;
            }

        }
    }

    .title {
        color: #000;
        font-size: 20px;
        font-weight: 650;
        text-align: left;
        margin: 0;
        margin-left: 21px;
        margin-top: 20px;
    }
}
</style>