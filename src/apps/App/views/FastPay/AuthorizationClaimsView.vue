<template>
    <!-- 授权理赔 -->
    <div class="authorization-claims-view">
        <div class="header bg-white">
            <p class="m-t-2 m-l m-b jzr">就诊人</p>
            <p class="m-l m-t-0 clearfix"><span class="name pull-left">{{header.name}}</span><span class="pull-right m-r co">商保公司：{{header.com}}</span></p>
        </div>
        <div class="page-infinite-wrapper" ref="wrapper" :style="{ height: wrapperHeight - 90 + 'px' }">
            <div class="scroll-body m-t bg-white"
                 v-infinite-scroll="pageLoading"
                 infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10"
                 infinite-scroll-immediate-check="check"
            >
                <div class="item-box" v-for="info in pageResult">
                    <div class="inbox p-b">
                        <span class="case-type text-center pull-right" :class="[info.medicalType === '2' ? 'bg-success' : '', info.medicalType === '1' ? 'bg-primary' : '']">{{info.medicalType == '1'? '门诊' : '住院'}}</span>
                        <p class="lsh m-t">就诊流水号：{{info.medicalNum}}</p>
                        <p class="hospname m-t m-b">{{info.hospName}}</p>
                        <p class="jztime m-t">就诊时间：{{info.treatStartDate.replace(/\-/g, '.')}}至{{info.treatEndDate.replace(/\-/g, '.')}}</p>
                        <!--<p class="jzreason">就诊原因：{{info.yy}}</p>-->
                        <p class="totalno text-right">总金额：<span class="no">￥{{info.billCount}}</span></p>
                    </div>
                </div>
            </div>
            <div v-show="!loading" class="page-infinite-listitem">
                <mt-spinner type="fading-circle"></mt-spinner>
                <span>加载中...</span>
            </div>
        </div>
        <div class="b-bg  bg-white vux-1px-t ">
            <div class="btn-box">
                <mt-button class="confirm bg-warning text-white m-t" @touchstart.native="confirmBtn()">确认授权理赔</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
// import {toast} from 'mint-ui'
import { InfiniteScroll, Button, Spinner } from 'mint-ui'
import { httpGetPayDet, httpPostAuthClaims } from '../../apis/fast.api.js'
import { Loading, Msg } from 'components'

export default {
    components: {
        InfiniteScroll,
        'mt-button': Button,
        'mt-spinner': Spinner
    },
    data () {
        return {
            pageResult: [],
            info: {
                medicalNum: '12132132132323123',
                medicalType: '1',
                hospName: '上海杨浦区中心医院',
                treatStartDate: '2016-11-11',
                treatEndDate: '2016-11-29',
                yy: '不明',
                billCount: '1928.00'
            },
            loading: false,
            wrapperHeight: 0,
            param: {},
            check: true,
            header: {},
            page: 1,
            professionalCode: ''
        }
    },
    methods: {
        confirmBtn () {
            Loading.show()
            let sParam = {
                beginDate: this.$store.state.fastPay.fastPay.startDay,
                endDate: this.$store.state.fastPay.fastPay.endDay,
                professionalCode: this.professionalCode,
                hospNum: this.$store.state.fastPay.fastPay.hospNum
            }
            httpPostAuthClaims(sParam).then((res) => {
                if (res.body.resultCode === '000000') {
                    Loading.close()
                    this.$router.push({name: 'fastPayResult',
                        params: {
                            type: '0'
                        }
                    })
                } else {
                    Loading.close()
                    this.$router.push({name: 'fastPayResult',
                        params: {
                            type: '1'
                        }
                    })
                }
            }).catch(() => {
                Loading.close()
            })
        },
        pageLoading () {
            this.param = {
                applyPaySign: '0',
                beginDate: this.$store.state.fastPay.fastPay.startDay,
                endDate: this.$store.state.fastPay.fastPay.endDay,
                hospNum: this.$store.state.fastPay.fastPay.hospNum,
                pageNum: this.page
            }
            httpGetPayDet(this.param).then((res) => {
                let data = res.body.result
                if (res.body.resultCode === '000000') {
                    Loading.close()
                    this.page = this.page + 1
                    this.header = {
                        name: data.name,
                        com: data.professionalName
                    }
                    this.professionalCode = data.professionalCode
                    this.pageResult = this.pageResult.concat(data.claimRecords.pageResult)
                    if (data.claimRecords.pageResult.length < 3) {
                        this.loading = true
                        this.check = false
                    }
                    if (!this.loading && data.claimRecords.pageResult.length < 1) {
                        this.check = false
                        this.loading = true
                    }
                    Loading.close()
                } else if (res.body.resultCode === '100000') {
                    Loading.close()
                    Msg.error('参数丢失')
                } else {
                    Loading.close()
                    Msg.error('其他错误')
                }
            }).catch(() => {
                Loading.close()
            })
        }
    },
    mounted () {
        this.wrapperHeight = document.documentElement.clientHeight + 80 - this.$refs.wrapper.getBoundingClientRect().top
    },
    computed: {
    },
    created () {
        Loading.show()
    }
}
</script>
<style lang="less">
    .authorization-claims-view {
        >.header {
            height: 103px;
            overflow: hidden;
            box-shadow: 0 2px 12px 0 #e6e6e6;
            >.jzr {
                color: #999999;
                font-size: 14px;
                line-height: 23px;
            }
            p >.name {
                font-size: 20px;
                color: #000000;
                line-height: 23px;
            }
            p >.co {
                font-size: 16px;
                color: #454545;
                line-height: 23px;
            }
        }
        .page-infinite-wrapper {
            margin-bottom: 80px;
        }

        .page-infinite-listitem span:first-child{
            float: left;
            margin-left: 42%;
        }
        .page-infinite-listitem {
            height: 20px;
            line-height: 30px;
        }

        .item-box {
            overflow: hidden;
            >.inbox {
                color: #929292;
                line-height: 23px;
                margin: 0 10px;
                position: relative;
                border-bottom: 1px solid #eaeaea;
                >.case-type {
                    position: absolute;
                    right: 0;
                    top: 0;
                    border-radius: 4px;
                    width: 38px;
                    height: 24px;
                    color: #ffffff;
                    line-height: 24px;
                    font-size: 12px;
                    margin-left: 2px;
                }
                >.lsh {
                    font-size: 12px;
                }
                >.hospname {
                    font-size: 16px;
                    color: #454545;
                }
                >.jztime {
                    font-size: 14px;
                }
                >.totalno {
                    font-size: 12px;
                    >.no {
                        font-size: 24px;
                        color: #ff662a;
                    }
                }
            }

        }
        .item-box:last-child {
            >.inbox {
                border-bottom: none;
            }
        }
        >.b-bg {
            position: fixed;
            bottom: 0;
            width: 100%;
            .btn-box {
                margin-left: 10px;
                margin-right: 10px;

                .confirm {
                    box-shadow: none;
                    width: 100%;
                    font-size: 18px;
                    height: 37px;
                    line-height: 37px;
                    margin-bottom: 10px;
                    margin-top: 10px
                }
            }
        }

    }
</style>
