<template>
    <div class="order-detail-view">
        <div class="header wp bg-white" v-if="state">
            <div class="left-state pull-left">
                <span class="icon01 icon-dairenling"></span>待付款
            </div>
            <div class="right-msg pull-left">
                <p class="ddh m-b">订单号：{{info.orderNo}}</p>
                <p>下单时间：{{info.orderTime}}</p>
            </div>
        </div>
        <div class="header sp bg-white" v-else>
            <div class="left-state pull-left">
                <span class="icon02 icon-roundcheck"></span>交易成功
            </div>
            <div class="right-msg pull-left">
                <p class="ddh m-b">订单号：{{info.orderNo}}</p>
                <p class="m-b">付款时间：{{info.payTime}}</p>
                <p>付款总额：￥{{info.insuranceAmount}}</p>
            </div>
        </div>

        <div class="logo bg-white m-t">
            <div class="cells">
                <div class="t-left text-left pull-left">{{info.supplierName}}</div>
                <div class="t-right text-right pull-right"><img :src="info.logoUrl" alt="logo"></div>
            </div>
        </div>

        <order-det-info
            :data="info"
            :state="state"
            v-on:toEpage="toEpage"
            v-on:toProDetail="toProDetail"
        ></order-det-info>

        <div class="footer m-b-2 clearfix" v-if="state">
            <p class="text-right m-r m-t-0 m-b-0">共1份保单&nbsp;合计：<span class="text-warning">￥{{info.insuranceAmount}}</span> </p>
            <mt-button class="pull-left m-l btn-l" plain @touchstart.native="cancelClick()">取消订单</mt-button>
            <mt-button class="pull-right m-r btn-r" @touchstart.native="payClick()" >立即支付</mt-button>

        </div>

        <div class="logo bg-white m-t" v-if="!state">
            <div class="cells">
                <div class="t-left text-left pull-left">保单金额</div>
                <div class="t-right text-right pull-right">￥{{info.insuranceAmount}}</div>
            </div>
        </div>
    </div>
</template>
<style lang="less">
    @import "../../../../assets/iconfont/iconfont.css";
    .order-detail-view {
        overflow: hidden;
        .inbox {
            margin: 0 10px;
        }

        .header {
            box-shadow: 0 2px 12px 0 #e6e6e6;
            .icon01 {
                font-family:"iconfont" !important;
                font-size:16px;
                font-style:normal;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
                -moz-osx-font-smoothing: grayscale;
            }
            .icon02 {
                font-family:"iconfont" !important;
                font-size:16px;
                font-style:normal;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
                -moz-osx-font-smoothing: grayscale;
            }
        }
        .wp {
            height: 76px;
            >.left-state {
                width: 40%;
                height: 76px;
                color: #ff662a;
                font-size: 16px;
                line-height: 76px;
                text-align: center;
            }
            >.right-msg {
                width: 60%;
                height: 76px;
                font-size: 12px;
                color: #666666;
                >.ddh {
                    margin-top: 15px;
                }
            }
        }
        .sp {
            height: 96px;
            >.left-state {
                width: 40%;
                height: 96px;
                color: #1cc07f;
                font-size: 16px;
                line-height: 96px;
                text-align: center;
            }
            >.right-msg {
                width: 60%;
                height: 96px;
                font-size: 12px;
                color: #666666;
                >.ddh {
                    margin-top: 15px;
                }
            }
        }

        .logo {
            >.cells {
                color: #666666;
                height: 45px;
                line-height: 45px;
                margin: 0 10px;
                >.t-left {
                    width: 35%;
                }
                >.t-right {
                    width: 65%;
                    color: #999999;
                    >.person {
                        color: #666666;
                    }
                    img {
                        height: 25px;
                        width: 40px;
                        line-height: inherit;
                        margin-top: 10px;
                        border: 0;
                    }
                }
            }
        }

        .footer {
            p {
                line-height: 45px;
            }
            .btn-l {
                border-color: #fc7845;
                color: #fc7845;
                height: 32px;
                line-height: 32px;
                width: 42%;
            }
            .btn-r {
                height: 32px;
                width: 42%;
                line-height: 32px;
                background: #fc7845;
                box-shadow: none;
                color: white;
            }
        }

    }
</style>
<script>
import orderDetInfo from './orderDetInfo'
import {httpGetOrderDetInfo, httpOrderPay, httpOrderCancel} from '../../apis/is.api.js'
import {Loading, Msg} from 'components'
import {toast, MessageBox, button} from 'mint-ui'

export default {
    data () {
        return {
            state: false,
            info: {
             /*   orderNo: '123456789012345678',
                supplierName: '易安保险',
                logoUrl: '',
                policyNo: '123456789123456789123456',
                state: '理赔完成',
                productName: '测试用产品挂号赔偿服务',
                projectName: '豪华版',
                projectEnsureList: [{
                    ensureName: '第一者财产损失',
                    claimStatement: '免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明',
                    ensureStatement: '保障说明保障说明保障说明保障说明保障说明保障说明保障说明保障说明保障说明保障说明保障说明',
                    ensurePrice: '保障金额'
                }, {
                    ensureName: '第二者财产损失',
                    claimStatement: '免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明免赔说明',
                    ensureStatement: '',
                    ensurePrice: '不限次数'
                }, {
                    ensureName: '第三者财产损失',
                    claimStatement: '',
                    ensureStatement: '保障说明保障说明保障说明保障说明保障说明保障说明保障说明保障说明保障说明保障说明保障说明',
                    ensurePrice: '500.00'
                }],
                count: '12',
                period: '1',
                periodUnit: 'Y',
                effectiveDate: '2016.11.11',
                expDate: '2017.11.12',
                holderName: '王大傻',
                holderCertType: '01',
                holderCertNo: '123456789123456789',
                holderPhone: '12345678900',
                holderEmail: '222.qq.com',
                insuredName: '王二傻',
                insuredCertType: '01',
                insuredCertNo: '0987654321098765432',
                insuredPhone: '12345678900',
                addtionalInsured: '10,99',
                duration: '1',
                insuranceAmount: '456.10',
                unitPrice: '50.99',
                orderTime: '2016-11-21 09:44',
                payTime: '2016-11-21 09:44' */
            },
            productId: '',
            policyOrderId: ''
        }
    },
    components: {
        'order-det-info': orderDetInfo,
        'mt-button': button,
        MessageBox,
        toast
    },
    methods: {
        payClick () {
            let param = {
                policyOrderId: this.policyOrderId,
                payWay: '02',
                redirectUrl: '/hmcp-hp/h5/static/pay_redirect.html'  // 回调地址
            }
            Loading.show()
            httpOrderPay(param).then((res) => {
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
                // toast({
                //     message: '请求失败',
                //     duration: 2000
                // })
            })
        },
        cancelClick () {
            MessageBox({
                title: '',
                message: '是否确定取消该条订单？',
                showCancelButton: true
            }).then((action) => {
                if (action === 'confirm') {
                    let param = {
                        policyOrderId: this.policyOrderId
                    }
                    Loading.show()
                    httpOrderCancel(param).then((res) => {
                        if (res.body.resultCode === '000000') {
                            Loading.close()
                            this.$router.push({name: 'myInsureOrders'})
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
            })
        },
        toProDetail () {
            this.$router.push({name: 'insDetail', params: {productId: this.productId}})
        },
        toEpage () {
            window.location.href = this.epolicyUrl
        },
        unit (rc) {
            switch (rc) {
                case 'Y' :
                    return '年'
                case 'M' :
                    return '月'
                case 'D' :
                    return '天'
            }
        },
        cardType (rc) {
            switch (rc) {
                case '01' :
                    return '居民身份证'
                case '02' :
                    return '军官证'
                case '03' :
                    return '护照'
                case '04' :
                    return '居民户口簿'
                case '05' :
                    return '士兵证'
                case '06' :
                    return '学生证'
                case '07' :
                    return '驾驶证'
                case '08' :
                    return '军官退休证'
                case '09' :
                    return '外国人居留证'
                case '10' :
                    return '警官证'
                case '11' :
                    return '其他'
            }
        },
        relationShip (rc) {
            switch (rc) {
                case '01' :
                    return '本人'
                case '02' :
                    return '父女'
                case '03' :
                    return '母女'
                case '04' :
                    return '母子'
                case '05' :
                    return '父子'
                case '06' :
                    return '孙子女'
                case '07' :
                    return '祖父母'
                case '08' :
                    return '未知'
                case '09' :
                    return '租赁'
                case '10' :
                    return '配偶'
                case '11' :
                    return '丈夫'
                case '12' :
                    return '妻子'
                case '13' :
                    return '雇佣'
                case '14' :
                    return '夫妻'
                case '15' :
                    return '朋友'
                case '16' :
                    return '婆媳'
                case '17' :
                    return '祖孙'
                case '18' :
                    return '法定'
                case '19' :
                    return '指定多人'
                case '20' :
                    return '儿子'
                case '30' :
                    return '女儿'
                case '40' :
                    return '子女'
                case '50' :
                    return '父母'
                case '51' :
                    return '父亲'
                case '52' :
                    return '母亲'
                case '53' :
                    return '继父'
                case '54' :
                    return '继母'
                case '55' :
                    return '叔伯'
                case '56' :
                    return '阿姨'
                case '57' :
                    return '兄弟'
                case '58' :
                    return '姐妹'
                case '59' :
                    return '外公'
                case '60' :
                    return '亲属'
                case '61' :
                    return '兄弟'
                case '62' :
                    return '奶奶'
                case '67' :
                    return '姐妹'
                case '80' :
                    return '单位'
                case '81' :
                    return '雇员'
                case '82' :
                    return '雇主'
                case '99' :
                    return '其他'
            }
        }
    },
    mounted: function () {
        // 加载loading
        Loading.show()
        // 获取policyOrderId的参数值
        this.policyOrderId = window.localStorage['policyOrderId']
        // 除0外，都是已付款
        if (window.localStorage['orderStatus'] === '0') {
            this.state = true
        } else {
            this.state = false
        }
        // ajax
        httpGetOrderDetInfo(this.policyOrderId).then((res) => {
            if (res.body.resultCode === '000000') {
                let result = res.body.result
                // 处理单位
                result.periodUnit = this.unit(result.periodUnit)
                result.durationUnit = this.unit(result.durationUnit)
                // 处理证件类型
                result.holderCertType = this.cardType(result.holderCertType)
                result.insuredCertType = this.cardType(result.insuredCertType)
                // 处理扩展被保人
                let a = result.addtionalInsured.split(',')
                let b = []
                for (let i = 0; i < a.length; i++) {
                    if (a.length !== 0) {
                        b.push({
                            person: this.relationShip(a[i]),
                            price: a[i] === '99' ? '15' : '5'
                        })
                    }
                }
                result.addtionalInsured = b
                // 处理日期格式
                result.orderTime = result.orderTime ? result.orderTime.substring(0, 16) : ''
                result.payTime = result.payTime ? result.payTime.substring(0, 16) : ''

                // 处理项目后金额
                let la = parseFloat(result.projectEnsureList.ensurePrice)
                if (!isNaN(la)) {
                    result.projectEnsureList.ensurePrice = '￥' + result.projectEnsureList.ensurePrice
                }

                // 保单状态
                if (result.orderStatus === '2') {
                    result.state = '投保中'
                } else if (result.orderStatus === '3') {
                    result.state = '保障中'
                } else if (result.orderStatus === '4') {
                    result.state = '投保失败'
                } else if (result.orderStatus === '5') {
                    result.state = '已退保'
                } else if (result.orderStatus === '9') {
                    result.state = '已过期'
                }
                // 给info赋值
                this.info = result

                Loading.close()
                // productId 赋值
                this.productId = result.productId
                // 电子保单
                this.epolicyUrl = result.epolicyUrl
            } else if (res.body.resultCode === '100000') {
                Loading.close()
                Msg.error('参数丢失')
            } else {
                Loading.close()
                Msg.error('其他错误')
            }
        })
    }
}
</script>
