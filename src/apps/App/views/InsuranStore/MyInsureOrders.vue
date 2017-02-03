<template lang="html">
  <div class="my-insure-orders">
      <ul v-if="show">
          <li is="insure-order" v-for="(item, index) in insureOrders" :info="item" :index="index"></li>
      </ul>
      <div class="no-insure-order" v-if="!show">
          <div class="title">
              <div class="image">
              </div>
              <div class="contents">
                    {{content}}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import insureOrder from './insure.vue'
import {mapState, mapActions} from 'vuex'
import {Loading} from 'components'
export default {
    data () {
        return {
            show: true,
            content: '当前无保险订单'
        }
    },
    components: {
        'insure-order': insureOrder,
        Loading
    },
    computed: {
        ...mapState({
            insureOrders ({insure}) {
                return insure.insureOrders
            }
        })
    },
    mounted () {
        // 发起请求订单数据的接口
        this.getInsureOrders().catch(() => {
            Loading.close()
        })
    },
    methods: {
        ...mapActions({
            getInsureOrders: 'getInsureOrders'
        })
    },
    watch: {
        insureOrders (newData) {
            if (newData.length === 0) {
                this.show = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
.my-insure-orders{
    background: #eaeaea;
    height: 100%;
    ul{
        li:last-child{
            margin-bottom: 0;
        }
    }
    .no-insure-order{
        height: 100%;
        padding: 0 27px;
        width: 100%;
        background: #fff;
        .title{
            height: 300px;
            width: 100%;
            padding: 30px 0;
            .image{
                height: 160px;
                width: 100%;
                background: url(../../../../assets/images/no-insure.png) no-repeat center center;
            }
            .contents{
                text-align: center;
                color: #91989d;
                font-size: 16px;
                margin-top: 20px;
            }
        }
        // .look-insure{
        //     width: 100%;
        //     height: 37px;
        //     border: 1px solid #fc7845;
        //     border-radius: 4px;
        //     line-height: 37px;
        //     text-align: center;
        //     color: #fc7845;
        //     font-size: 18px;
        //     margin-top: 80px;
        // }
    }
}
</style>
