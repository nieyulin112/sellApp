<template lang="html">
  <li class="insure-order">
      <ul v-on:click="linkToContent">
          <li class="title">
              <span class="insure-company">{{info.supplierName}}</span>
              <span class="order-status iconfont" :class="{'icon-roundcheckfill':(info.orderStatus !== '0'), 'icon-dairenling':(info.orderStatus === '0'), 'font-color':(info.orderStatus !== '0')}">{{info.orderStatus === '0' ? '待付款' : '交易成功'}}</span>
          </li>
          <li class="name">
              <span class="insure-name">{{info.productName}}</span>
              <span class="insure-count">×1</span>
          </li>
          <!-- 通用选项用for循环来实现 -->
          <li class="commen">
              <span class="insure-person">
                  {{'投保人：' + info.holderName}}
              </span>
          </li>
          <li class="commen person">
              <span>
                  {{'被保人：' + info.insuredName}}
              </span>
              <span class="insure-amount">
                  {{'¥' + Number(info.unitPrice).toFixed(2)}}
              </span>
          </li>
          <!-- 扩展被保人 -->
          <li class="commen" v-for="item in addtionalInsured" v-show="addtionalInsuredShow">
              <div is='extend-insure' :info = "item">
              </div>
          </li>
          <li class="commen">
              <span>
                  {{'保障期限：' + insureTime}}
              </span>
          </li>
      </ul>
      <div>
          <div class="total">
              <span>共1份保单</span>
              <span>合计：<span class="total-amount">{{'¥'+this.sum}}</span></span>
          </div>
         <div class="options" v-show="optionsShow">
             <div class="cancel button" v-on:click="cancel">
                取消订单
             </div>
             <div class="pay button focus" v-on:click="pay">
                 立即支付
             </div>
         </div>
      </div>
  </li>
</template>

<script>
import {MessageBox} from 'mint-ui'
import Vue from 'vue'
import ExtendInsure from './ExtendInsure'
import loading from 'components/Loading'
import {httpOrderPay} from '../../apis/is.api.js'
import Msg from 'components/Msg.js'

function selectCount (type) {
    switch (type) {
        case '50':
        case '40':
        case '10':
            return 5
        case '99':
            return 15
    }
}

export default {
    data () {
        return {
            amount: 0,
            focus: true
        }
    },
    components: {
        'extend-insure': ExtendInsure
    },
    props: {
        info: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    computed: {
        addtionalInsured () {
            if (this.info.addtionalInsured) {
                return this.info.addtionalInsured.split(',')
            } else {
                return []
            }
        },
        mapTime () {
            switch (this.info.durationUnit) {
                case 'Y':
                    return '年'
                case 'M':
                    return '月'
                case 'D':
                    return '日'
            }
        },
        insureTime () {
            if (this.info.orderStatus === '0') {
                return '自保单生效起' + this.info.duration + this.mapTime
            } else {
                return this.info.effectiveDate + ' - ' + this.info.expDate
            }
        },
        sum () {
            let amount = 0
            this.addtionalInsured.forEach((item) => {
                amount += selectCount(item)
            })
            return ((Number(this.info.unitPrice) + amount).toFixed(2))
            // switch (length) {
            //     case 0:
            //     case 1:
            //     case 2:
            //     case 3:
            //         return (Number(this.info.unitPrice) + length * 5).toFixed(2)
            //     case 4:
            //         return (Number(this.info.unitPrice) + length * 3 + 15).toFixed(2)
            // }
        },
        addtionalInsuredShow () {
            if (this.addtionalInsured.length === 0) {
                return false
            } else {
                return true
            }
        },
        optionsShow () {
            if (this.info.orderStatus === '0') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        linkToContent () {
            window.localStorage.policyOrderId = this.info.policyOrderId
            window.localStorage.orderStatus = this.info.orderStatus
            this.$router.push({
                name: 'orderDetail'
            })
        },
        pay () {
            // this.focus = true
            httpOrderPay({
                policyOrderId: this.info.policyOrderId,
                payWay: '02',
                redirectUrl: '/hmcp-hp/h5/static/pay_redirect.html'
            }).then((res) => {
                if (res.body.resultCode === '000000') {
                    loading.close()
                    let url = res.body.result.payUrl
                    window.location.href = window.decodeURIComponent(url)
                } else if (res.body.resultCode === '100000') {
                    loading.close()
                    Msg.error('参数丢失')
                } else {
                    loading.close()
                    Msg.error('其他错误')
                }
            })
        },
        cancel () {
            // this.focus = false
            MessageBox({
                title: '',
                message: '是否确定取消该条订单？',
                showCancelButton: true
            }).then((action) => {
                if (action === 'confirm') {
                    console.log(this.info.policyOrderId)
                    this.$http.put(Vue.getUrl('/api/product/v2/insurance/order'), {policyOrderId: this.info.policyOrderId}, {
                        before () {
                            loading.show('正在删除...')
                        }
                    })
                    .then(({body}) => {
                        if (body.resultCode === '000000') {
                            this.$store.commit('removeInsureOrders', this.info)
                            this.focus = true
                        } else {
                            MessageBox.alert(body.msg)
                        }
                        loading.close()
                    }).catch(({body}) => {
                        loading.close()
                        MessageBox.alert(body)
                    })
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../../styles/common.less";
.insure-order{
    background: #fff;
    margin-bottom: 12px;
    width: 100%;
    height: 100%;
    padding: 0 @gap;
    // padding-bottom: 2*@gap;
    ul{
        border-bottom: 1px solid #f5f5f5;
        li{
            font-size: 13px;
            color: #666666;
        }
        li.title{
            height: 23px;
            font-size: 14px;
            line-height: 23px;
            padding: @gap 0;
            overflow: hidden;
            box-sizing: content-box;
            color: #666666;
            span{
                display: block;
            }
            .insure-company{
                float: left;
            }
            .order-status{
                float: right;
                font-size: 12px;
                color: #ff662a;
            }
            .font-color{
                color: #1cc07f;
                display: block;
            }
        }
        li.name{
            border-top: 1px solid #f5f5f5;
            height: 23px;
            box-sizing: content-box;
            padding-top: 9px;
            padding-bottom: 7px;
            font-size: 16px;
            color: #454545;
            span{
                color: #454545;
            }
            .insure-name{
                float: left;
            }
            .insure-count{
                float: right;
            }
        }
        li.commen{
            padding-bottom: 5px;
        }
        li.person{
            overflow: hidden;
            span.insure-person{
                float: left;
            }
            span.insure-amount{
                float: right;
            }
        }
    }
    div.total{
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        color: #454545;
        text-align: right;
        .total-amount{
            color: #fc7845;
        }
    }
    div.options{
        overflow: hidden;
        padding-bottom: 20px;
        .button{
            width: 48%;
            text-align: center;
            border-radius: 4px;
            border: 1px solid #fc7845;
            height: 32px;
            line-height: 32px;
            color: #fc7845;
        }
        .cancel{
            float: left;
        }
        .pay{
            float: right;
        }
        .focus{
            background:#fc7845;
            color: white;
        }
    }
}
</style>
