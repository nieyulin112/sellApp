<template lang="html">
  <div class="insureClause">
      <my-cell :title="item.termsName" v-for="(item, index) in insureClause" is-link @click.native='link(index)'></my-cell>
  </div>
</template>

<script>
import {Cell} from 'mint-ui'
export default {
    components: {
        'my-cell': Cell
    },
    // mounted () {
    //     // 请求数据的action
    //     this.$store.dispatch('getInsureClause', {})
    // },
    computed: {
        insureClause () {
            return this.$store.state.insure.insureClause
            // return ['保险条款保险条款保险条款保险条款保险条款保险条款保险条款']
        }
    },
    methods: {
        link (index) {
            this.$router.push({
                name: 'insureClauseDetail',
                params: {
                    index
                }
            })
        }
    }
}
</script>

<style lang="less">
.insureClause{
    .mint-cell-wrapper{
        padding-left: 20px;
    }
    a{
        div.mint-cell-wrapper{
            div.mint-cell-title{
                span.mint-cell-text{
                    color: #454545;
                    width: 250px;
                    font-size: 14px;
                    display: block;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }
            }
        }
    }
}
</style>
