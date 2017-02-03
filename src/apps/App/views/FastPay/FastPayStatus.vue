<template lang="html">
  <div class="fast-pay-status">
      <div class="content" :class="{'show-image': show}">
      </div>
      <div class="fail">
          {{'授权理赔' + status}}
      </div>
      <div class="options">
          <p class="return" v-on:click="returnback">
              返回光速赔
          </p>
          <p class="history" v-on:click="linkToHistory">
              查看历史记录
          </p>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            show: false
        }
    },
    computed: {
        status () {
            if (this.$route.params.status === '0') {
                return '成功'
            } else {
                return '失败'
            }
        }
    },
    methods: {
        returnback () {
            this.$router.push({
                name: 'fastPayIndex'
            })
        },
        linkToHistory () {
            this.$router.push({
                name: 'fastPayResult'
            })
        }
    }
}
</script>

<style lang="less" scoped>
.fast-pay-status{
    padding: 0 10px;
    div.content{
        height: 230px;
        background: url(../../../../assets/images/fastpay_result_failed.png) no-repeat center center;
    }
    div.show-image{
        background: url(../../../../assets/images/fastpay_result_ok.png) no-repeat center center;
    }
    div.fail{
        text-align: center;
        color: #92989d;
        margin-bottom: 50px;
    }
    .options{
        p.return{
            background: #fc7845;
            width: 100%;
            color: #fff;
            font-size: 18px;
            height: 37px;
            line-height: 37px;
            text-align: center;
            border-radius: 4px;
        }
        p.history{
            color: #5b90d6;
            color: 16px;
            line-height: 16px;
            height: 16px;
            width: 100%;
            text-align: center;
            padding: 0;
        }
    }
}
</style>
