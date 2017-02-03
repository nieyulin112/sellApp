<template>
    <div class="time-line-view">
        <!--事件轴-->
        <section class="cd-container cd-timeline" v-show="arrayList.length > 0">
            <div class="cd-timeline-block" v-for="item in arrayList">
                <div class="cd-date">
                    <div>
                        {{item.beginDate}}
                        <span v-for="data in item.data"
                        v-bind:class="{'bg-primary': data==='门诊', 'bg-success': data==='住院', 'bg-danger': data==='急诊', 'bg-default': data==='其它'}" 
                        class="pull-right text-center treat-type ml15">
                            {{data}}
                        </span>
                    </div>
                    <h1 class="hosp-title">
                        {{item.hosName}}
                    </h1>
                </div> 
                <div class="cd-timeline-content bg-white" @click="skipDetail(item)">
                    <div class="hosp-detail">
                        <h3 class="drug" v-show="item.pspName !=='0'">
                            <span class="item-drug">用药:</span>
                            <span class="pull-right">{{item.pspName}}</span>
                        </h3>
                        <h3 class="charge">
                            <span class="item-charge">本次费用:</span>
                            <span class="pull-right">￥{{(item.cost/100).toFixed(2)}}</span>
                        </h3>
                    </div>
                    <div class="cd-timeline-img cd-picture">
                    </div> 
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import {getTimelineData} from '../../apis/hos.api'
    import {Loading} from 'components'
    import {setBarTitle} from 'utils/appUtil'
    import {toast} from 'mint-ui'
    import {Native} from '../../../../utils/native'
    export default {
        components: {
            Loading,
            toast
        },
        data () {
            return {
                arrayList: [],
                dataObj: {}
            }
        },
        methods: {
            skipDetail (item) {
                this.dataObj = {
                    type: item.data,
                    caseName: this.$route.params.disDes,
                    startTime: item.beginDate,
                    endTime: item.endDate,
                    hospName: item.hosName,
                    trmentId: item.trmentId,
                    cost: item.cost,
                    departmentName: item.subName
                }
                this.$store.commit('setRecDetail', this.dataObj)
                this.$router.push({name: 'caseDetails',
                    params: {
                        id: item.trmentId
                    }
                })
            }
        },
        mounted () {
            Loading.show()
            let params = {
                center: {
                    title: this.$route.params.disDes
                }
            }
            Native.callHandler('app_refresh_navbar', params)
            setBarTitle(this.$route.params.disDes)
            getTimelineData(this.$route.params.id, this.$route.params.disDes).then(({body: {result}}) => {
                this.arrayList = result || []
                Loading.close()
            }).catch(({body: {msg}}) => {
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
    .time-line-view{
        .cd-container {
            background-color:#f8f8f8;
            max-width: 1170px;
            margin: 0 auto;
        }
        .cd-container::after {
            /* clearfix */
            content: '';
            display: table;
            clear: both;
        }

        .cd-timeline {
            position: relative;
            padding: 2em 0;
            margin-top: 2em;
            margin-bottom: 2em;
            top: -42px;
        }
        .cd-timeline::before {
            content: '';
            position: absolute;
            // top: 10;
            left: 19px;
            height: 100%;
            width: 2px;
            background: #ccc;
        }
        .cd-timeline-block {
            position: relative;
            margin: 2em 2em;
        }
        .cd-timeline-block:after {
            content: "";
            display: table;
            clear: both;
        }
        .cd-timeline-block:first-child {
            margin-top: -16px;
        }
        .cd-timeline-block:last-child {
            margin-bottom: 0;
        }
        .cd-timeline-img {
            position: absolute;
            top: -54px;
            left: -26px;
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
        .cd-timeline-img.cd-picture {
            background: #ccc;
        }
        .cd-timeline-img.cd-movie {
            background: #c03b44;
        }
        .cd-timeline-img.cd-location {
            background: #f0ca45;
        }

        .cd-timeline-content {
            .hosp-detail {
                margin-top:6px;
                border: 1px solid #ccc;
                border-radius: 4px;
                margin-left: -14px;
                .drug,.charge{
                    font-size:14px;
                    span.item-drug, span.item-charge{
                        color:#949a9f;
                    }
                    padding-left:10px;
                    font-weight: lighter;
                    span{
                        margin-right:6px;
                        color:#454545;
                    }
                }
            }
            position: relative;
            z-index: 0;
            margin-left: 14px;
            background: white;
            border-radius: 0.25em;
            padding-left:1em;
            width: 100%;
            h2 {
                color: #303e49;
            }
            p {
                font-size: 13px;
                font-size: 0.8125rem;
                margin: 1em 0;
                line-height: 1.6;
            }
        }
        .cd-timeline-content:after {
            content: "";
            display: table;
            clear: both;
        }
        .cd-date{
            .ml15{
                margin-left: 15px;
            }
            .treat-type {
                margin-right: -12px;
                font-size:12px;
                display: inline-block;
                width:38px;
                height:20px;
                line-height:12px;
                border-radius:4px;
                color:#fff;
            }
            .hosp-title {
                height:25px;
                margin-top: 4px;
                margin-bottom: 4px;
                font-size: 14px;
            }
            margin-left: 14px;
            font-size: 12px;
            div{
                padding-left:4px;
                margin-top:10px;
                font-weight: lighter;
                width:100%;
                span{
                    padding:4px;
                    color:#fff;
                }
            }
        }
    }
</style>

