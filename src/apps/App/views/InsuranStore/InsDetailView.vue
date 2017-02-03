<template>
    <div class="ins-detail-view" ref="insDetail">
        <div class="ins-content">
            <div class="p-x p-y bg-white ins-con-title">
                <span>{{result.productName}}</span>
                <i class="text-bule icon-fenxiang iconfont pull-right" v-show="" @click="share"></i>
            </div>
            <img :src="result.imageUrl" alt=""  width="100%">
            <div class="text-muted">
                <div class="grid-row p-x bg-white">
                    <div class="grid-12 p-t">
                        承保地区: {{result.contractArea}}
                    </div>
                </div>
                <div class="grid-row p-x bg-white">
                    <div class="grid-12 p-t">
                        适用年龄: {{result.applicableAge}}
                    </div>
                </div>
                <div class="grid-row p-x bg-white" v-for="items in result.projectList" v-show="!items.flag">
                    <div class="grid-6 p-t">
                        保障期限: {{items.duration}}{{items.durationUnit}}
                    </div>
                    <div class="grid-6 text-right p-y">
                        <a href="javascript:void(0)" @click="seeInsCliam" type="primary">
                            查看保险条款
                        </a>
                    </div>
                </div>
            </div>
            <div class="p-x p-y bg-white vux-1px-t text-muted">
                <span style="font-size:12px">本保险由{{result.supplierName}}承保并负责理赔</span>
                <a href="javascript:void(0);" class="pull-right">
                    <img :src="result.logoUrl" alt style="max-height:24px;">
                </a>
            </div>
            <div class="h6">
            </div>
            <div class="ins-type bg-white" v-show="result.projectList.length > 1">
                <div>
                    <mt-button v-for="item in this.result.projectList" class="m-l m-y"
                    @click.native="select(item)"
                    type="primary"
                    v-bind:class="{'warning': !item.flag, 'gray': item.flag}"
                    size="small">
                        {{item.projectName}}
                    </mt-button>
                </div>
            </div>
            <div class="clearfix p-x p-y bg-white" v-show="result.projectList.length == 1">
                <mt-button size="small"  class="warning pull-left" >
                    保障方案
                </mt-button>
            </div>
            <div v-for="items in result.projectList" v-show="!items.flag">
                <div v-for="(item, index) in items.projectEnsureList">
                    <a class="mint-cell ensure-item text-muted" :class="{'vux-1px-t': index != 0, '': index == 0}">
                        <div class="mint-cell-left"></div>
                        <div class="mint-cell-wrapper p-y">
                            <div class="mint-cell-title">
                                <span class="mint-cell-text">
                                    {{item.ensureName}}
                                    <span class="pull-right">
                                        {{item.ensureAmount}}
                                    </span>
                                </span>
                                <p class="mint-cell-label p-r line15">
                                    {{item.claimStatement}}
                                </p>
                                <p class="mint-cell-label p-r">
                                    {{item.ensureStatement}}
                                </p>
                            </div>
                        </div>
                        <div class="mint-cell-right"></div>
                    </a>
                </div>

                <cell>
                    <span class="text-warning">
                        ¥{{items.minPrice}}
                        <span class="p2" v-show="items.maxPrice">-</span>
                        <span v-show="items.maxPrice">¥{{items.maxPrice}}</span>
                    <span>
                </cell>
            </div>
            <div class="h6">
            </div>
            <div class="p-x p-y bg-white ins-con-title">
                <i class="text-bule icon-icon iconfont">
                </i>
                产品介绍
            </div>
            <img :src="productIntroduction.imageUrl" alt="" width="100%">
            <div class="h6">
            </div>
            <div class="p-x p-y bg-white ins-con-title vux-1px-b">
                <i class="text-bule icon-lipeiguanli iconfont">
                </i>
                <span>理赔介绍</span>
            </div>
            <div class="grid-row p-x bg-white p-y vux-1px-b">
                <div class="grid-6 text-left">
                    理赔热线:
                    <a href="javascript:void(0);" @click="callIphone">
                        {{productClaim.claimPhone}}
                    </a>
                </div>
                <div class="grid-6 text-right" @click="foldImg">
                    <i v-bind:class="{'icon-arrowup': imgShow, 'icon-arrowdown': !imgShow}" class="iconfont icon-arrowdown">
                    </i>
                </div>
            </div>
            <div v-show="imgShow">
                <img :src="productClaim.imageUrl" alt=""  width="100%">
            </div>
            <div class="h6">
            </div>
            <div class="p-x p-y-2 bg-white ins-con-title">
                <i class="text-bule icon-question iconfont">
                </i>
                <span>常见问题</span>
            </div>
            <div class="bg-white">
                <div class="answer p-x p-t">
                    <div v-for="item in lessData" v-show="lessData.length > 0" class="p-y question">
                        <h4 class="ins-que">
                            Q: {{item.question}}
                        </h4>
                        <p class="ins-answer text-muted line15">
                            A: {{item.answer}}
                        </p>
                    </div>
                </div>
                <div class="answer p-x p-y" v-show="isMore" ref="moreAns" v-for="item in moreData">
                    <div>
                        <h4 class="ins-que">
                            Q: {{item.question}}
                        </h4>
                        <p class="ins-answer text-muted line15">
                            A: {{item.answer}}
                        </p>
                    </div>
                </div>
                <div class="more-que ins-con-title text-center p-y p-x mt20" @click="fold" v-show="productFAQList.length > 3">
                    <a href="javascript:void(0)" style="color:#5b90db">
                        {{seeMore}}
                        <i class="iconfont" v-bind:class="{'icon-arrowdown':!isMore, 'icon-arrowup': isMore}">
                        </i>
                    </a>
                </div>
            </div>
        </div>
        <popup v-model="popupVisible" v-show="popupVisible" position="bottom" class="mint-popup-4 page-popup" style="width:100%;" popup-transition="popup-fade">
            <div class="ins-type p-t" v-show="result.projectList.length > 1">
                <div class="grid-row">
                    <div class="grid-4 text-center">
                        请选择保障套餐
                    </div>
                </div>
                <div class="p-t">
                    <mt-button v-for="item in this.result.projectList" class="m-l m-y"
                        @click.native="select(item)"
                        type="primary"
                        v-bind:class="{'warning': !item.flag, 'gray': item.flag}"
                        size="small">
                        {{item.projectName}}
                    </mt-button>
                </div>
                <div class="grid-row bg-gray h64 pr" v-show="!item.flag" v-for="item in result.projectList">
                    <div class="grid-8 text-left p-x p-t">
                        <span class="ins-price-title">价格:
                            <span class="ins-price text-warning">
                                ¥{{item.minPrice}}
                                <span class="p2" v-show="item.maxPrice">-</span>
                                <span v-show="item.maxPrice">¥{{item.maxPrice}}</span>
                            </span>
                        </span>
                        <p class="ins-info-price">
                            投保价格根据个人的资料精确计算
                        </p>
                    </div>
                    <div class="grid-4 text-center p15 p-x">
                        <mt-button type="primary" size="small" @click.native="effectCover" class="pull-right bg-warning bd-warning text-white">
                            立即投保
                        </mt-button>
                    </div>
                </div>
            </div>
        </popup>
        <div v-show="result.projectList.length == 1" class="fixed h64">
            <div class="grid-row bg-gray" v-show="!item.flag" v-for="item in result.projectList">
                <div class="grid-8 p-t text-left p-x">
                    <span class="ins-price-title">价格:
                        <span class="ins-price text-warning">
                            ¥{{item.minPrice}}
                            <span class="p2" v-show="item.maxPrice">-</span>
                            <span v-show="item.maxPrice">¥{{item.maxPrice}}</span>
                        </span>
                    </span>
                    <p class="p-b ins-info-price text-muted">
                        投保价格根据个人的资料精确计算
                    </p>
                </div>
                <div class="grid-4 text-center p15">
                    <mt-button type="primary" size="small" @click.native="effectCover" class="pull-right m-x bg-warning bd-warning text-white">
                        立即投保
                    </mt-button>
                </div>
            </div>
        </div>
        <div class="btn-cover p-x" v-show="result.projectList.length > 1">
            <div class="full-bg">
                <mt-button class="bg-warning bd-warning text-white" type="primary" size="large" @click.native="cover">
                    我要投保
                </mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import {header, button, cell, popup, toast} from 'mint-ui'
import {Loading} from 'components'
import {Native} from '../../../../utils/native'
import {insDetail} from '../../apis/is.api'
import {checkLogin, gotoLogin} from '../../../../utils/appUtil'
import {setModelCode} from 'utils/httpconfig'
setModelCode('Fin')
export default {
    components: {
        mtHeader: header, mtButton: button, cell, popup, toast, Loading
    },
    data () {
        return {
            seeMore: '查看更多',
            imgShow: true,
            popupVisible: false,
            popupFlag: false,
            isMore: false,
            productId: '',
            result: {
                projectList: [],
                productTermsList: [
                ],
                productClaim: {
                },
                productFAQList: [
                ]
            },
            productIntroduction: {
            },
            productClaim: {
            },
            productFAQList: [],
            dataObj: {
            },
            lessData: [],
            moreData: []
        }
    },
    methods: {
        callIphone () {
            let phoneNumber = this.productClaim.claimPhone
            Native.callHandler('app_make_call', phoneNumber)
        },
        share () {
            let params = {
                title: this.result.productName,
                platform: [0, 1],
                content: this.result.adWord,
                imageUrl: '../../../../static/otp-icon.png',
                weburl: window.location.href,
                type: 0
            }
            Native.callHandler('app_share', params)
        },
        seeInsCliam () {
            this.$router.push(({name: 'insureClause'}))
        },
        cover () {
            this.popupVisible = true
        },
        unit (rc) {
            switch (rc) {
                case 'Y':
                    return '年'
                case 'M':
                    return '月'
                case 'D':
                    return '天'
            }
        },
        select (item) {
            this.result.projectList.forEach(val => {
                val.flag = true
            })
            item.flag = false
            this.dataObj = {
                productId: this.result.productId,
                productName: this.result.productName,
                productCode: this.result.productCode,
                period: this.result.period,
                periodUnit: this.unit(this.result.periodUnit),
                projectId: item.projectId,
                projectName: item.projectName,
                projectCode: item.projectCode,
                totalAmount: item.totalAmount,
                duration: item.duration,
                durationUnit: item.durationUnit,
                maxPrice: item.maxPrice,
                minPrice: item.minPrice,
                healthNote: this.result.healthNote
            }
        },
        effectCover () {
            // 立即投保时需要判断是否登录
            this.popupFlag = false
            let that = this
            function skipNext () {
                that.$store.commit('setCoverObject', that.dataObj)
                if (!that.result.healthNote) {
                    that.$router.push(({name: 'insuredOrders'}))
                } else {
                    that.$router.push(({
                        name: 'insureKnow',
                        params: {
                            productId: that.result.productId
                        }
                    }))
                }
            }
            if (!checkLogin()) {
                gotoLogin().then(() => {
                    skipNext()
                })
            } else {
                skipNext()
            }
        },
        fold ($event) {
            this.isMore = !this.isMore
            if (this.isMore) {
                this.seeMore = '收起'
            } else {
                this.seeMore = '查看更多'
            }
        },
        foldImg () {
            this.imgShow = !this.imgShow
        }
    },
    mounted () {
        this.productId = this.$route.params.productId
        Loading.show()
        insDetail(this.productId).then((res) => {
            this.result = res.data.result
            this.result.projectList.forEach((val, index) => {
                val.durationUnit = this.unit(val.durationUnit)
                this.$set(val, 'flag', false)
                if (index === 0) {
                    val.flag = false
                } else {
                    val.flag = true
                }
            })
            this.$store.commit('insureClause', this.result.productTermsList)
            let item = this.result.projectList[0]
            this.dataObj = {
                productId: this.result.productId,
                productName: this.result.productName,
                productCode: this.result.productCode,
                period: this.result.period,
                periodUnit: this.unit(this.result.periodUnit),
                projectId: item.projectId,
                projectName: item.projectName,
                projectCode: item.projectCode,
                totalAmount: item.totalAmount,
                duration: item.duration,
                durationUnit: item.durationUnit,
                maxPrice: item.maxPrice,
                minPrice: item.minPrice,
                healthNote: this.result.healthNote
            }
            this.$store.commit('setCoverObject', this.dataObj)
            this.productFAQList = this.result.productFAQList
            this.productClaim = this.result.productClaim
            if (!this.productClaim.imageUrl) {
                this.productClaim.imageUrl = ''
            }
            this.productIntroduction = this.result.productIntroduction
            if (!this.productIntroduction.imageUrl) {
                this.productIntroduction.imageUrl = ''
            }
            if (this.productFAQList.length > 3) {
                for (var i = 3; i < this.productFAQList.length; i++) {
                    this.moreData.push(this.productFAQList[i])
                }
            }
            for (var j = 0; j < this.productFAQList.length; j++) {
                if (j < 3) {
                    this.lessData.push(this.productFAQList[j])
                }
            }
            Loading.close()
        }).catch(({body: {msg}}) => {
            Loading.close()
        })
    }
}
</script>
<style lang="less">
    .ins-detail-view {
        .p2{
            padding-left:2px;
            padding-right:2px;
        }
        .pr {
            position:relative;
            top:8px;
        }
        .h168 {
            height:168px;
        }
        .p15 {
            padding-top:15px;
            padding-bottom:15px;
        }
        .h64 {
            height:64px;
        }
        .warning {
            background-color: rgba(252, 120, 68, 0.15);
            color: #fc7845;
            border: 1px solid #fc7845;
        }
        .gray {
            background-color: #fff;
            color: #454545;
            border: 1px solid #bfbfbf;
        }
        .line15{
            line-height:1.5;
        }
        .text-bule {
            color:#87B8F7;
            font-size:18px;
        }
        .mint-cell-text {
            font-size:14px;
        }
        overflow-y: auto;
        .mint-navbar .mint-tab-item.is-selected {
            border-bottom: 0px;
        }
        .ins-content {
            .h6 {
                padding:3px 0;
                background:#e6e6e6;
            }
            .ensure-item::before {
                border:0;
            }
            .ensure-item::after {
                border:0;
            }
            .ins-con-title {
                height: 42px;
                font-weight: bolder;
                font-size:16px;
                span{
                    color:#454545
                }
            }
            padding-bottom:60px;
            .answer {
                margin:0;
                .ins-que {
                    margin:0;
                    font-size: 12px;
                    font-weight: border;
                    color:#454545
                }
                .ins-answer {
                    margin:0;
                    margin-top:6px;
                    font-size:12px;
                }

            }
            .img-ins {
                vertical-align: middle;
                img{
                    border:0px;
                }
            }
        }
        .page-popup {
            .ins-price-title{
                font-size: 14px;
                font-weight:bolder;
            }
            .ins-info-price {
                font-size: 12px;
                color:#777;
                margin:4px 0;
            }
        }
        .pr20 {
            padding-right:20px;
        }
        .btn-cover {
            z-index:1000;
            position: fixed;
            width:100%;
            bottom: 0px;
            background-color:#ffffff;
            .full-bg {
                padding-top:10px;
                position:relative;
                margin-bottom:10px;
                background-color:#ffffff;
            }
        }
        .fixed {
           position: fixed;
           width:100%;
           bottom:0px;
           .ins-info-price {
                font-size:12px;
                margin: 4px 0;
            }
        }
        .mt20 {
            margin-bottom: 20px;
        }
    }
</style>
