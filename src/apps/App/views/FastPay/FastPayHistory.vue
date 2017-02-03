<template>
    <div id="fastpay_historyContainer">
        <ul
            v-if="fastHistoryData.length"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="fastpay_history_listview  vux-1px-b" v-for="(item, index) in fastHistoryData">
                <div class="fastpay_history_left">
                    <div class="fastpay_history_time">
                        理赔授权时间:{{item.claimTime}}
                    </div>
                    <div class="fasstpay_history_total">
                        总花费{{' ¥' + parseFloat(item.billCount).toFixed(2)}}
                    </div>
                </div>

                <div class="fastpay_history_right">
                        {{item.claimStatus}}
                </div>
            </li>
        </ul>
        <div v-if="!fastHistoryData.length" class="no-data text-center">
            <img src="../../../../assets/images/no_data@3x.png" alt="" height="90px">
            <h2>无历史数据</h2>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import {Loading} from 'components'
import {httpGetPayDet} from '../../apis/fast.api.js'

export default{
    data () {
        return {
            fastHistoryData: [],
            pageCount: 1,
            loading: false
        }
    },
    computed: {
        activeColor () {
            switch (this.fastHistoryData.status) {
                case '0':
                    return '#ff662a'
                case '1':
                    return '#454545'
                case '2':
                    return '#88888'
            }
        }
    },
    methods: {
        loadMore () {
            let that = this
            Loading.show()
            that.loading = true
            httpGetPayDet({
                applyPaySign: '1',
                pageNum: that.pageCount
            }).then(({body}) => {
                if (body.resultCode === '000000') {
                    if (!body.result.claimRecords.pageResult) throw new Error('后台返回数据格式不正确')
                    if (body.result.claimRecords.pageResult.length === 0) {
                        that.loading = true
                        Loading.close()
                        return
                    }
                    // this.fastHistoryData = body.reult.pageResult
                    that.fastHistoryData = that.fastHistoryData.concat(body.result.claimRecords.pageResult)
                    that.pageCount++
                    that.loading = false
                    Loading.close()
                } else {
                    that.loading = false
                    Loading.close()
                    throw new Error(body.msg)
                }
            }).catch((error) => {
                that.loading = false
                Loading.close()
                Toast({
                    message: error,
                    duration: 1000
                })
            })
        }
    }
}

</script>


<style lang="less">
    @import "../../../../styles/border.less";

    #fastpay_historyContainer{
        .no-data {
            margin-top:50%;
            h2{
                color:#92989d;
                font-size:16px;
            }
        }
        padding-left: 10px;
        .fastpay_history_listview{
            height: 76px;
            >.fastpay_history_left{
                height: 76px;
                float: left;

                >.fastpay_history_time{
                    margin-top: 15px;
                    font-size: 12px;
                    color: #929292;
                    line-height: 23px;
                }

                >.fastpay_history_total{
                    margin-top: 5px;
                    font-size: 16px;
                    color: #454545;
                    line-height: 23px;
                }
            }

            >.fastpay_history_right{
                height: 76px;
                line-height: 76px;
                width: 50px;
                float: right;
                color: #ff662a;
            }
        }
    }

</style>
