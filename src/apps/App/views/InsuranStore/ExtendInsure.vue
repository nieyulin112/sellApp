<template lang="html">
  <div class="extend">
      <span class="extend-name">{{'扩展保障人：' + this.name}}</span>
      <span class="extend-amount">{{'¥' + (parseInt(this.count)).toFixed(2)}}</span>
  </div>
</template>

<script>
export default {
    data () {
        return {
            count: ''
        }
    },
    props: {
        info: {
            type: String,
            required: true
        }
    },
    computed: {
        name () {
            switch (this.info) {
                case '10':
                    this.count = '5'
                    return '配偶'
                case '50':
                    this.count = '5'
                    return '父母'
                case '40':
                    this.count = '5'
                    return '子女'
                case '99':
                    this.count = '15'
                    return '其他'
            }
        }
    }
}
</script>

<style lang="less">
div.extend{
    width: 100%;
    overflow: hidden;
    span{
        display: block;
    }
    span.extend-name{
        float: left;
    }
    span.extend-amount{
        float: right;
    }
}
</style>
