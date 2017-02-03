<template>
    <div class="bill-chart">
        <div class="treat-money p-t">
            <h1 class="total-money text-left">
                ￥{{totalMoney | pd-currency}}
                <p class="text-left text-muted">总医疗费(元)</p>
            </h1>
        </div>
        <div class="main bg-white">
            <div class="text-center treat-type">
                就诊类型
            </div>
            <div class="chart clearfix">
                <div class="pull-left w50">
                    <div ref='treatChart' :style="{width:'100%', height:'210px'}" class="text-left treat-chart">
                    </div>
                </div>
                <div class="pull-right treat-legend text-left m-r-2">
                    <ul>
                        <li class="color0" v-show="counts.clinicCount">
                            <div>
                                <div class="text-default">￥{{clinicAmount}}</div>
                                <span class="text-muted">门诊: {{counts.clinicCount}}次</span>
                            </div>
                        </li>
                        <li class="color1" v-show="counts.inhosCount" v-bind:class="{'color0': counts.clinicCount == '0'}">
                            <div>
                                <div class="text-default">￥{{inhosAmount}}</div>
                                <span class="text-muted">住院: {{counts.inhosCount}}次</span>
                            </div>
                        </li>
                        <li class="color2"
                            v-show="counts.emrgCount"
                            v-bind:class="{'color0': counts.clinicCount == '0' && counts.inhosCount == '0', 'color1': counts.clinicCount == '0' || counts.inhosCount == '0'}">
                            <div>
                                <div class="text-default">￥{{emrgAmount}}</div>
                                <span class="text-muted">急诊: {{counts.emrgCount}}次</span>
                            </div>
                        </li>
                        <li class="color3" v-show="counts.othCount"
                            v-bind:class="{'color0': counts.clinicCount == '0' && counts.inhosCount == '0' && counts.emrgCount == '0', 'color1': counts.clinicCount == '0' || counts.inhosCount == '0' || counts.emrgCount == '0'}">
                            <div>
                                <div class="text-default">￥{{othAmount}}</div>
                                <span class="text-muted">其他: {{counts.othCount}}次</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <hr/>
            <div class="text-center treat-type">
                就诊医院
            </div>
            <div class="chart clearfix">
                <div class="pull-left w50">
                    <div ref='hospChart' :style="{width:'100%', height:'210px'}" class="text-left hos-chart">
                    </div>
                </div>
                <div class="pull-right hos-legend text-left m-r-2">
                    <ul>
                        <li v-for="(item, index) in datas" v-bind:class="{'color0': index==0, 'color1': index==1, 'color2': index==2, 'color3': index==3}" v-show="item.hosCount">
                            <div class="text-default">￥{{item.hosAmount}}</div>
                            <span class="text-muted">
                                {{item.hosName}} {{item.hosCount}}次
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {button, cell, toast} from 'mint-ui'
import echarts from '../../../../libs/echarts.min'
import {getBillReport} from '../../apis/hos.api'
import {Loading} from 'components'
const legend = {
    show: false
}
const itemStyle = {
    emphasis: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
    },
    normal: {
        label: {
            show: false,
            labelLine: {
                show: false
            }
        }
    }
}
const color = ['#5d91d4', '#5bcc9f', '#fa784d', '#f1aa38']
const tooltip = {
    trigger: 'item',
    formatter: '{b}<br/>费用:{c}(元)<br/>费用比例:({d}%)',
    position: [50, 10]
}
const label = {
    normal: {
        formatter: '{b}\n{c}(元)',
        textStyle: {
            fontSize: 12
        }
    }
}
const type = 'pie'
const radius = ['42%', '70%']
function changeFormat (v) {
    return (v / 100).toFixed(2)
}
export default {
    components: {
        mtButton: button,
        cell,
        Loading,
        toast
    },
    data () {
        return {
            treatOptions: {
                calculabel: true,
                tooltip: tooltip,
                legend: legend,
                series: [
                    {
                        radius: radius,
                        name: '就诊类型',
                        type: type,
                        data: [],
                        itemStyle: itemStyle,
                        label: label
                    }
                ],
                color: color
            },
            hospOptions: {
                calculabel: true,
                tooltip: tooltip,
                legend: legend,
                series: [
                    {
                        name: '就诊医院',
                        radius: radius,
                        type: type,
                        data: [],
                        itemStyle: itemStyle,
                        label: label
                    }
                ],
                color: color
            },
            clinicAmount: '',
            inhosAmount: '',
            emrgAmount: '',
            othAmount: '',
            datas: []
        }
    },
    methods: {
    },
    computed: {
        totalMoney () {
            return (this.$store.state.hosCard.reportData.total / 100).toFixed(2)
        },
        counts () {
            return this.$store.state.hosCard.reportData
        }
    },
    mounted () {
        let treatChart = echarts.init(this.$refs.treatChart)
        let hospChart = echarts.init(this.$refs.hospChart)
        Loading.show()
        getBillReport(this.$route.params.id).then(({body: {result}}) => {
            this.clinicAmount = changeFormat(result.clinicAmount)
            this.inhosAmount = changeFormat(result.inhosAmount)
            this.emrgAmount = changeFormat(result.emrgAmount)
            this.othAmount = changeFormat(result.othAmount)
            this.treatOptions.series[0].data = [
                {value: changeFormat(result.clinicAmount), name: '' + '门诊' + ''},
                {value: changeFormat(result.inhosAmount), name: '' + '住院' + ''},
                {value: changeFormat(result.emrgAmount), name: '' + '急诊' + ''},
                {value: changeFormat(result.othAmount), name: '' + '其它' + ''}
            ]
            treatChart.setOption(this.treatOptions)
            if (result.data) {
                result.data.forEach((data) => {
                    data.hosAmount = changeFormat(data.hosAmount)
                    data.hosName = data.hosName === null ? '' : data.hosName
                    this.hospOptions.series[0].data.push({
                        value: data.hosAmount,
                        name: data.hosName
                    })
                })
                this.datas = result.data
            }
            hospChart.setOption(this.hospOptions)
            Loading.close()
        }).catch(({body: {msg}}) => {
            Loading.close()
            toast({
                message: msg,
                position: 'center',
                duration: 1000
            })
        })
    }
}
</script>
<style lang="less">
    .bill-chart{

        .color0 {
            color: #5d91d4;
        }
        .color1 {
            color: #5bcc9f;
        }
        .color2 {
            color: #fa784d;
        }
        .color3 {
            color: #f1aa38;
        }
        .main{
            .chart {
                .w50 {
                    width: 50%;
                }
                .hos-legend {
                    width:120px;
                }
                .treat-legend {
                    width: 120px;
                    margin-top:40px;
                }
                ul {
                    list-style: disc;
                    li {
                        line-height: 16px;
                        font-size:20px;
                        border:0;
                        span.text-muted {
                            font-size:12px;
                            width:120px;
                            display:inline-block;
                            word-wrap:break-word;
                        }
                        div.text-default {
                            font-size:14px;
                            font-weight: 500;
                        }
                    }
                }
            }
            .treat-type{
                font-size:16px;
                color:#454545;
                width:100px
            }
            background:#fff;
            .mint-cell{
                background-color: #fff;
            }
            hr{
                margin-top:40px;
                margin-bottom: 15px;
                border:0px;
                border-top:1px solid #e6e6e6;
            }
        }
        .treat-money{
            background:#ffffff;
            box-shadow:0px 2px 12px 0px #e6e6e6;
            .total-money {
                padding-left:20px;
                font-size:36px;
                color:#ff4800;
                p{
                    font-size: 12px;
                    color: #949a9f;
                    margin-top: 4px;
                    padding-bottom: 20px;
                }
            }
        }
    }
</style>
