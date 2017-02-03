<template>
    <div class="insured-orders-view">
        <insured-info
            v-model="inputInfo1"
            :state="state1"
            title="投保人信息"
            :showInputInfo="true"
            :showEmail="true"
            :data="noUse"></insured-info>
        <insured-info
            v-model="inputInfo2"
            title="被保人信息"
            :showInputInfo="showInputInfo"
            :isShowBt="true"
            :showRel="true"
            v-on:showData="fshowData"
            :state="state2"
            :data="noUse"></insured-info>
        <div class="order-info">
            <div class="inbox title m-t m-b">
                <span>订单信息</span>
            </div>
            <div class="info">
                <div class="cells">
                    <div class="t-left text-left pull-left">产品名称</div>
                    <div class="t-right text-right pull-right">{{coverObject.productName}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">套餐类型</div>
                    <div class="t-right text-right pull-right">{{coverObject.projectName}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">保障额度</div>
                    <div class="t-right text-right pull-right text-warning">￥{{coverObject.totalAmount}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">购买份数</div>
                    <div class="t-right text-right pull-right">
                        <mt-button class="btn text-center pull-right" @touchstart.native="btnAddClick()">+</mt-button>
                        <div class="num pull-right text-center">{{num}}</div>
                        <mt-button class="btn text-center pull-right" @touchstart.native="btnLessClick()">-</mt-button>
                    </div>
                </div>
                <div class="cells" v-if="coverObject.maxPrice">
                    <div class="t-left text-left pull-left">价格区间</div>
                    <div class="t-right text-right pull-right text-warning">￥{{coverObject.minPrice}} —￥{{coverObject.maxPrice}}</div>
                </div>
                <div class="cells" v-else>
                    <div class="t-left text-left pull-left">单价</div>
                    <div class="t-right text-right pull-right  text-warning" >￥{{coverObject.minPrice}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">观察期</div>
                    <div class="t-right text-right pull-right">{{coverObject.period}}{{coverObject.periodUnit}}</div>
                </div>
                <div class="cells">
                    <div class="t-left text-left pull-left">保障时长</div>
                    <div class="t-right text-right pull-right">{{coverObject.duration}}{{coverObject.durationUnit}}</div>
                </div>
            </div>
            <div class="add-option">
                <div class="cells">
                    <div class="t-left text-left">扩展被保人</div>
                    <p class="in-lab m-t-0">扩展被保险人享有与被保险人相同的保障</p>
                    <div class="t-right text-left sel-box">
                        <mt-button plain class="sel-btn pull-left m-r-2 m-t" v-bind:class="{active : isActive1 }" :plain="!isActive1" @touchstart.native="isActive(1)">
                            <span class="bt-sp p-l p-r">父母</span>
                            <span class="sx" :class="{'text-warning': isActive1 }">|</span>
                            <span class="bt-sp p-l p-r">￥5</span>
                        </mt-button>
                        <mt-button plain class="sel-btn pull-left m-t" v-bind:class="{active : isActive2 }" :plain="!isActive2" @touchstart.native="isActive(2)">
                            <span class="bt-sp p-l p-r">配偶</span>
                            <span class="sx" :class="{'text-warning': isActive2 }">|</span>
                            <span class="bt-sp p-l p-r">￥5</span>
                        </mt-button>
                        <mt-button plain class="sel-btn pull-left m-r-2 m-t m-b" v-bind:class="{'active' : isActive3}" :plain="!isActive3" @touchstart.native="isActive(3)">
                            <span class="bt-sp p-l p-r">子女</span>
                            <span class="sx" :class="{'text-warning' : isActive3 }">|</span>
                            <span class="bt-sp p-l p-r">￥5</span>
                        </mt-button>
                        <mt-button plain class="sel-btn pull-left m-t m-b" v-bind:class="{active: isActive4 }" :plain="!isActive4" @touchstart.native="isActive(4)">
                            <span class="bt-sp p-l p-r">其他人</span>
                            <span class="sx" :class="{'text-warning': isActive4 }">|</span>
                            <span class="bt-sp p-l p-r">￥15</span>
                        </mt-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn-box vux-1px-t">
            <mt-button type="primary" size="large" class="submit-btn m-t m-b" @click.native="onSubmit">提交订单</mt-button>
        </div>
    </div>
</template>
<style lang="less">
    @import '../../../../styles/vars';
    .insured-orders-view {
        .inbox {
            margin: 0 10px;
        }
        .title {
            font-size: 16px;
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
                    color: #333;
                }
                >.t-right {
                    width: 70%;
                    color: #999999;
                    >.btn {
                        height: 30px;
                        width: 30px;
                        margin-top: 7px;
                        padding: 0;
                        border: none;
                        background-color: #f5f5f5;
                        opacity: 0.2;
                        margin-left: 3px;
                        box-shadow: none;
                        border-radius: 2px;
                        .mint-button-text {
                            line-height: 20px;
                            font-size: 30px;
                            color: #999999;
                        }
                    }
                    .num {
                        height: 30px;
                        width: 30px;
                        background-color: #f5f5f5;
                        margin-top: 7px;
                        line-height: 30px;
                        margin-left: 3px;
                        border-radius: 2px;
                    }
                }
                .mint-button--normal {
                    padding: 0 5px;
                }
            }
            >.info {
                background-color: #ffffff;
            }
            .active {
                border: 1px solid #fc7845;
                box-shadow: none;
                color: @color-warning;
                background-color: rgba(252,120,68,0.15);
                >.mint-button-text{
                    .sx {
                        color: @color-warning;
                    }
                }

            }
            >.add-option {
                background-color: #ffffff;
                overflow: hidden;
                .mint-button--default.is-plain{
                    border: 1px solid #cbcbcb;
                }
                .in-lab {
                    font-size: 12px;
                    color: #999999;
                    line-height: 1;
                }
                .sel-box {
                    width: 100%;
                    >.sel-btn {
                        width: 46%;
                        font-size: 14px;
                        height: 28px;
                        .sx {
                            color: #d8d8d8;
                            font-size: 16px;
                        }
                    }
                }

            }
        }
        .btn-box {
            margin-left: 10px;
            margin-right: 10px;
            .submit-btn {
                background-color: @color-warning;
                width: 100%;
                font-size: 18px;
                letter-spacing: 0.32px;
            }
        }
    }
</style>
<script>
import InsuredInfo from './InsuredInfo'
import {button} from 'mint-ui'
import {httpPostOrderInfo} from '../../apis/is.api.js'
import {Loading, Msg} from 'components'
import {checkAuthError} from 'utils/httpconfig'
import {gotoLogin} from 'utils/appUtil'

export default {
    data () {
        return {
            state1: {
                name: null,
                cardType: null,
                cardId: null,
                phoneNum: null,
                eMail: null,
                inrelation: null
            },
            state2: {
                name: null,
                cardType: null,
                cardId: null,
                phoneNum: null,
                eMail: null,
                inrelation: null
            },
            inputInfo1: {},
            inputInfo2: {},
            showInputInfo: true,
            noUse: {
                name: '',
                cardType: '',
                cardId: '',
                phoneNum: '',
                email: ''
            },
            num: 1,
            isActive1: false,
            isActive2: false,
            isActive3: false,
            isActive4: false,
            selected: true,
            postParam: {},
            nextPageData: {}
        }
    },
    components: {
        'insured-info': InsuredInfo,
        'mt-button': button
    },
    methods: {
        fshowData: function () {
            this.showInputInfo = !this.showInputInfo
        },
        btnLessClick () {
            if (this.num > 1) {
                this.num = this.num - 1
            }
        },
        btnAddClick () {
            // this.num = this.num + 1
        },
        isActive (num) {
            switch (num) {
                case 1 :
                    this.isActive1 = !this.isActive1
                    break
                case 2 :
                    this.isActive2 = !this.isActive2
                    break
                case 3 :
                    this.isActive3 = !this.isActive3
                    break
                case 4 :
                    this.isActive4 = !this.isActive4
                    break
            }
        },
        checkId (card) {
            let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            return reg.test(card)
        },
        checkEmail (email) {
            let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
            return reg.test(email)
        },
        checkPhoneNum (num) {
            let reg = /^1\d{10}$/
            return reg.test(num)
        },
        checkedInfo1 (a, b, c, d, state, e) {
            let hasError = false
            if (!a || a.length < 2 || a.length > 10) {
                state.name = 'error'
                hasError = true
            }
            if (!b || b === '0') {
                state.cardType = 'error'
                hasError = true
            }
            if (!c) {
                state.cardId = 'error'
                hasError = true
            } else if (b === '01' && !this.checkId(c)) {
                state.cardId = 'error'
                hasError = true
            }
            if (!d || !this.checkPhoneNum(d)) {
                state.phoneNum = 'error'
                hasError = true
            }
            if (!e || !this.checkEmail(e)) {
                state.eMail = 'error'
                hasError = true
            }
            return hasError
        },
        checkedInfo2 (a, b, c, d, state, e) {
            let hasError = false
            if (!a || a.length < 2 || a.length > 10) {
                state.name = 'error'
                hasError = true
            }
            if (!b || b === '0') {
                state.cardType = 'error'
                hasError = true
            }
            if (!c) {
                state.cardId = 'error'
                hasError = true
            } else if (b === '01' && !this.checkId(c)) {
                state.cardId = 'error'
                hasError = true
            }
            if (!d || !this.checkPhoneNum(d)) {
                state.phoneNum = 'error'
                hasError = true
            }
            if (!e || e === '0') {
                state.inrelation = 'error'
                hasError = true
            }
            return hasError
        },
        resetState (r) {
            r.name = null
            r.cardType = null
            r.cardId = null
            r.phoneNum = null
            r.eMail = null
            r.inrelation = null
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
            /*
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
            */
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
        },
        onSubmit () {
            // 初始化表单的状态
            this.resetState(this.state1)
            this.resetState(this.state2)
            let info1 = this.inputInfo1
            let info2 = this.inputInfo2
            // 判断是否同投保人
            if (!this.showInputInfo) {
                info2 = info1
                this.state2 = this.state1
                info2.iRel = '01'
            }
            // 校验输入格式是否正确
            let a = this.checkedInfo1(info1.iname, info1.icardType, info1.icardid, info1.iphonenum, this.state1, info1.iemail)
            let b = this.checkedInfo2(info2.iname, info2.icardType, info2.icardid, info2.iphonenum, this.state2, info2.iRel)

            // 判断校验结果，失败则跳出，并在页面显示错误提示
            if (a || b) {
                Msg.error('您的输入有错误，请修改')
                return
            }

            // 将扩展被保人塞进数组
            let c = []
            let cRelationShip = []
            if (this.isActive1) {
                c.push('50')
                cRelationShip.push({person: '父母', price: '5'})
            }
            if (this.isActive2) {
                c.push('10')
                cRelationShip.push({person: '配偶', price: '5'})
            }
            if (this.isActive3) {
                c.push('40')
                cRelationShip.push({person: '子女', price: '5'})
            }
            if (this.isActive4) {
                c.push('99')
                cRelationShip.push({person: '其他人', price: '15'})
            }

            // 对最后的post值进行赋值
            this.postParam.holderName = info1.iname
            this.postParam.holderCertType = info1.icardType
            this.postParam.holderCertNo = info1.icardid
            this.postParam.holderPhone = info1.iphonenum
            this.postParam.holderEmail = info1.iemail
            this.postParam.insuredName = info2.iname
            this.postParam.insuredCertType = info2.icardType
            this.postParam.insuredCertNo = info2.icardid
            this.postParam.insuredPhone = info2.iphonenum
            this.postParam.count = this.num + ''
            this.postParam.addtionalInsured = c.join(',')
            this.postParam.isSame = this.showInputInfo ? '0' : '1'
            this.postParam.relationship = !this.showInputInfo ? '01' : info2.iRel
            this.postParam.productId = this.$store.state.insure.coverObject.productId
            this.postParam.productCode = this.$store.state.insure.coverObject.productCode
            this.postParam.projectId = this.$store.state.insure.coverObject.projectId
            this.postParam.projectCode = this.$store.state.insure.coverObject.projectCode

            // 加载loading
            Loading.show()
            // 调用ajax
            httpPostOrderInfo(this.postParam).then((res) => {
                if (res.body.resultCode === '000000') {
                    Loading.close()
                    let result = res.body.result

                    // 调用成功，给下一页面传值
                    let theInsured = {
                        // 投保人姓名
                        name: result.holderName,
                        // 投保人证件类型
                        cardType: this.cardType(result.holderCertType),
                        // 投保人证件号
                        cardId: result.holderCertNo,
                        // 投保人手机号
                        phoneNum: result.holderPhone,
                        // 投保人邮箱
                        email: result.holderEmail
                    }
                    let insuredPerson = {
                        // 被保人姓名
                        name: result.insuredName,
                        // 被保人证件类型
                        cardType: this.cardType(result.insuredCertType),
                        // 被保人证件号
                        cardId: result.insuredCertNo,
                        // 被保人手机号
                        phoneNum: result.insuredPhone,
                        // 投保人与被保人关系
                        relationship: this.relationShip(result.relationship),
                        // 是否同投保人
                        isSame: result.isSame
                    }
                    // 投保人信息
                    this.nextPageData.theInsured = theInsured
                    // 被保人信息
                    this.nextPageData.insuredPerson = insuredPerson
                    // 产品名称
                    this.nextPageData.productName = result.productName
                    // 套餐类型
                    this.nextPageData.packageType = result.projectName
                    // 购买份数
                    this.nextPageData.count = result.count
                    // 保障总额
                    this.nextPageData.totalAmount = result.totalAmount
                    // 观察期
                    this.nextPageData.period = this.$store.state.insure.coverObject.period
                    // 观察期单位
                    this.nextPageData.periodUnit = this.$store.state.insure.coverObject.periodUnit
                    // 保障时长
                    this.nextPageData.duration = this.$store.state.insure.coverObject.duration
                    // 保障时长单位
                    this.nextPageData.durationUnit = this.$store.state.insure.coverObject.durationUnit
                    // 扩展被保人
                    this.nextPageData.addtionalInsured = cRelationShip
                    // 最高保费
                    this.nextPageData.maxPrice = this.$store.state.insure.coverObject.maxPrice
                    // 最低保费
                    this.nextPageData.minPrice = this.$store.state.insure.coverObject.minPrice
                    // 四个必要参数
                    this.nextPageData.productId = result.productId
                    this.nextPageData.productCode = result.productCode
                    this.nextPageData.projectId = result.projectId
                    this.nextPageData.projectCode = result.projectCode
                    // 保险费用
                    this.nextPageData.insuranceAmount = result.insuranceAmount
                    // 保单ID
                    this.nextPageData.policyOrderId = result.policyOrderId

                    this.$store.commit('setConfirmInfo', this.nextPageData)

                    this.$router.push('/InsuranStore/InsuredInfoConfirm')
                } else if (res.body.resultCode === '100000') {
                    Loading.close()
                    Msg.error('参数丢失')
                } else {
                    Loading.close()
                    Msg.error('其他错误')
                }
            }).catch((res) => {
                Loading.close()
                if (checkAuthError(res.body.resultCode)) {
                    gotoLogin()
                }
            })
        }
    },
    computed: {
        // 调用vuex数据
        coverObject () {
            return this.$store.state.insure.coverObject
        }
    },
    created () {
        this.inputInfo1.icardType = '0'
        this.inputInfo2.icardType = '0'
        this.inputInfo2.iRel = '0'
    }
}
</script>
