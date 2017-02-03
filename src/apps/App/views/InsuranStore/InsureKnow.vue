<template lang="html">
  <div class="need-know">
      <div class="title">
          被保险人是否有以下任一情况
      </div>
      <div class="main">
          <div class="content">
              {{needKnowContent}}
          </div>
      </div>
      <div class="options">
          <div class="left">
              <div class="has" v-on:click="hasDo">
                  有以上任一情况
              </div>
          </div>
          <div class="right">
              <div class="nothing select" v-on:click="normalDo">
                  以上情况全无
              </div>
              <!-- <my-button size="large" type="primary" @click.native="normalDo">以上情况全无</my-button> -->
          </div>
      </div>
  </div>
</template>

<script>
import {Button, MessageBox} from 'mint-ui'
import {Loading} from 'components'
export default {
    data () {
        return {
            status: true
        }
    },
    components: {
        'my-button': Button,
        Loading
    },
    methods: {
        hasDo () {
            // this.status = false
            MessageBox({
                message: '被保险人不符合该产品投保条件暂时无法购买该产品',
                confirmButtonClass: 'my-alert'
            }).then((action) => {
                this.$router.push({
                    name: 'insDetail',
                    params: {
                        productId: this.$route.params.productId
                    }
                })
            })
        },
        normalDo () {
            // this.status = true
            // 跳转填写投保信息流程
            this.$router.push({
                name: 'insuredOrders'
            })
        }
    },
    computed: {
        needKnowContent () {
            return this.$store.state.insure.coverObject.healthNote
        }
    }
}
</script>

<style lang="less" scoped>
.need-know{
    background: #fff;
    height: 100%;
    padding: 0 10px;
    .options{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 62px;
        background: #f8f8f8;
        padding: 12px 0;
        left: 0;
        >div{
            width: 50%;
            box-sizing: border-box;
            float: left;
            height: 38px;
            .mint-button--large{
                height: 100%;
            }
            >div{
                height: 38px;
                text-align: center;
                border: 1px solid #fc7845;
                border-radius: 4px;
                color: #fc7845;
                line-height: 38px;
                font-size: 16px;
            }
            >.select{
                background: #fc7845;
                color: #fff;
            }
        }
        >.left{
            padding-left: 20px;
            padding-right: 10px;

        }
        >.right{
            padding-right: 20px;
            padding-left: 10px;
        }
    }

    .title{
        width: 100%;
        padding: 10px 0;
        font-size: 14px;
        color: #454545;
        line-height: 23px;
        text-align: left;
    }
    .main{
        width: 100%;
        overflow-y: scroll;
        background: #fff;
        font-size: 12px;
    }
}
// .my-alert{
//     font-size: 16px;
//     color: #4b89dc;
// }
// .mint-msgbox-header{
//     display: none;
// }
// .mint-msgbox-header{
//     height: 145px;
// }
// .mint-msgbox-wrapper{
//     height: 145px;
// }
// .mint-msgbox-content{
//     height: 120px;
//     padding: 38px 18px 15px;
// }
// .mint-msgbox{
//     width: 263px;
// }
// .mint-msgbox-message{
//     line-height: 24px;
// }
</style>
