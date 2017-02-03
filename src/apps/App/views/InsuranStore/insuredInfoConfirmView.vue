<template>
    <div class="insured-info-confirm-view">
        <insured-info
            v-model="noUse"
            :state="noUsestate"
            title="投保人信息"
            v-bind:showConfirmInfo="true"
            v-bind:showEmail="true"
            :data="info.theInsured"></insured-info>
        <insured-info
            v-model="noUse"
            :state="noUsestate"
            title="被保人信息"
            v-bind:showConfirmInfo="true"
            v-bind:showEmail="false"
            :showRelationship="true"
            :relationship="info.insuredPerson.relationship"
            :data="info.insuredPerson"></insured-info>

        <div class="order-info">
            <div class="title inbox m-t m-b">
                <span>订单信息</span>
            </div>
            <div class="info">
                <div class="cells">
                    <div class="t-left text-left pull-left">产品名称</div>
                    <div class="t-right text-right pull-right">{{info.productName}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">套餐类型</div>
                    <div class="t-right text-right pull-right">{{info.packageType}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">保障额度</div>
                    <div class="t-right text-right pull-right">￥{{info.totalAmount}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">购买份数</div>
                    <div class="t-right text-right pull-right">{{info.count}}</div>
                </div>
                <div class="cells" v-if="info.maxPrice">
                    <div class="t-left text-left pull-left">价格区间</div>
                    <div class="t-right text-right pull-right text-warning">￥{{info.minPrice}} —￥{{info.maxPrice}}</div>
                </div>
                <div class="cells" v-else>
                    <div class="t-left text-left pull-left">单价</div>
                    <div class="t-right text-right pull-right  text-warning">￥{{info.minPrice}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">观察期</div>
                    <div class="t-right text-right pull-right">{{info.period}}{{info.periodUnit}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">保障时长</div>
                    <div class="t-right text-right pull-right">{{info.duration}}{{info.durationUnit}}</div>
                </div>
                <div class="cells"  v-for="p in info.addtionalInsured">
                    <div class="t-left text-left pull-left">扩展被保人</div>
                    <div class="t-right pull-right"><span class="pull-left person">{{p.person}}</span><span class="pull-right">￥{{p.price}}</span></div>
                </div>
            </div>
        </div>
        <div class="checked-box inbox">
            <input type="checkbox" v-model="ck">
            <span>本人已同意并阅读&nbsp;<span class="xy" @click="bxtk()">保险条款</span>
            <!-- &nbsp;和&nbsp;<span class="xy" @click="fwxy()">平台服务协议</span>&nbsp;</span> -->
        </div>
        <div class="submit-btn">
            <div class="total-price pull-left text-center bg-white">合计 :<span class="text-warning"> ￥{{info.insuranceAmount}}</span></div>
            <mt-button class="pull-left text-center sub-bt" :class="ck ? 'bg-warning' : 'bg-gray'" type="primary" @touchstart.native="payBtnClick()">支付</mt-button>
        </div>
    </div>
</template>
<style lang="less">
    @import "../../../../styles/vars";
    .insured-info-confirm-view {
        .inbox {
            margin: 0 10px;
        }
        .title {
            font-size: 16px;

        }
        .vux-1px-b {
            border: 0;
        }
        >.order-info {
            .cells {
                height: 45px;
                line-height: 45px;
                margin: 0 10px;
                color: #666666;
                >.t-left {
                    width: 30%;
                    font-size: 14px;
                }
                >.t-right {
                    width: 70%;
                    color: #999999;
                    >.person {
                        color: #666666;
                    }
                }
            }
            >.info {
                background-color: #ffffff;
                border-bottom: 1px solid #eeeeee;
            }
        }
        >.checked-box {
            height:45px;
            line-height: 45px;
            margin-bottom: 55px;
            margin-right: 5px;
            .xy {
                color: #4E8BD9;
            }
            input[type=checkbox] {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                margin: 0;
                cursor: pointer;
                background: #fff;
                border: 1px solid #4E8BD9;
                -webkit-border-radius: 1px;
                -moz-border-radius: 1px;
                border-radius: 3px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                position: relative;
                display: inline-flex;
            }
            input[type=checkbox]:checked {
                background: #4E8BD9;
            }
            input[type=checkbox]:checked::after {
                content: url(../../../../assets/images/icon-checked.png);
                display: block;
                position: absolute;
                top: -1px;
                right: 0;
                left: -1px
            }
        }
        >.submit-btn {
            height: 50px;
            width: 100%;
            line-height: 50px;
            position: fixed;
            bottom: 0;
            border-top: 1px solid #eeeeee;
            color: black;
            z-index: 99;

            >.total-price {
                width: 65%;
                height: 50px;
            }
            >.sub-bt {
                width: 35%;
                height: 50px;
                border: none;
                line-height: 50px;
                border-radius: 0;
            }
            .bg-gray {
            }

        }
    }
</style>
<script>
import InsuredInfo from './InsuredInfo'
import {httpOrderPay} from '../../apis/is.api.js'
import {Loading, Msg} from 'components'
import {toast, button} from 'mint-ui'
export default {
    data () {
        return {
            ck: true,
            totalNum: '0',
            noUse: {},
            noUsestate: {
                name: null,
                cardType: null,
                cardId: null,
                phoneNum: null,
                eMail: null
            },
            subData: {
                // 产品名称
                productName: 'qqqqq',
                // 套餐类型
                packageType: '豪华型',
                // 投保人
                theInsured: {
                    // 投保人姓名
                    name: '张三',
                    // 投保人证件类型
                    cardType: '身份证',
                    // 投保人证件号
                    cardId: '123456789012345678',
                    // 投保人手机号
                    phoneNum: '12345678901',
                    // 投保人邮箱
                    email: '1@qq.com'
                },
                // 被投保人
                insuredPerson: {
                    // 被保人姓名
                    name: '123',
                    // 被保人证件类型
                    cardType: '11',
                    // 被保人证件号
                    cardId: '098765432112345678',
                    // 被保人手机号
                    phoneNum: '12345678900',
                    // 投保人与被保人关系
                    relationship: '其他人',
                    // 是否同投保人
                    isSame: '1'
                },
                // 购买份数
                count: '1',
                // 保障总额
                totalAmount: '15000',
                // 观察期
                period: '50',
                // 观察期单位
                periodUnit: '天',
                // 保障时长
                duration: '2016.10.11',
                // 保障时长单位
                expDate: '1016.12.07',
                // 扩展被保人
                addtionalInsured: [{
                    person: '父母',
                    price: '5'
                }, {
                    person: '子女',
                    price: '5'
                }, {
                    person: '配偶',
                    price: '5'
                }, {
                    person: '其他人',
                    price: '15'
                }],
                // 保险总费用
                insuranceAmount: '200'
            },
            param: {} // 支付按钮的请求参数
        }
    },
    components: {
        'insured-info': InsuredInfo,
        toast,
        'mt-button': button
    },
    methods: {
        payBtnClick () {
            if (this.ck === true) {
                this.param = {
                    policyOrderId: this.$store.state.insure.confirmInfo.policyOrderId,
                    payWay: '02',
                    redirectUrl: '/hmcp-hp/h5/static/pay_redirect.html'  // 回调地址
                }

                Loading.show()

                httpOrderPay(this.param).then((res) => {
                    if (res.body.resultCode === '000000') {
                        Loading.close()
                        let url = res.body.result.payUrl
                        window.location.href = window.decodeURIComponent(url)
                    } else if (res.body.resultCode === '100000') {
                        Loading.close()
                        Msg.error('参数丢失')
                    } else {
                        Loading.close()
                        Msg.error('其他错误')
                    }
                }).catch((res) => {
                    Loading.close()
                    toast({
                        message: '请求失败',
                        duration: 2000
                    })
                })
            }
        },
        bxtk () {
            this.$router.push('/insuranStore/insureClause')
        },
        fwxy () {}
    },
    computed: {
        info () {
            return this.$store.state.insure.confirmInfo
        }
    }
}
</script>
