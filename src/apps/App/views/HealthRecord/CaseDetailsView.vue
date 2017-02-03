<template>
    <!-- 病例详情 -->
    <div class="case-details-view m-b">
        <div class="top-intr m-b">
                <p class="case-time text-right m-t m-b-2"><span class="pull-right">{{(herder.startTime).replace(/\-/g, '.')}}-{{(herder.endTime).replace(/\-/g, '.')}}</span></p>
                <p class="case-type-name">
                    <span class="case-type text-center pull-right" :class="[tp === '住院' ? 'bg-success' : '', tp === '门诊' ? 'bg-primary' : '', tp === '急诊' ? 'bg-danger' : '', tp === '其它' ? 'bg-default' : '']" v-for="tp in herder.type">{{tp}}</span>
                    <span class="case-name">{{herder.caseName}}</span>
                </p>
                <p class="m-t m-b">{{herder.hospName}}<span v-show="!!herder.departmentName">•{{herder.departmentName}}</span></p>
                <p class="m-b-2 m-t-0">费用￥{{(herder.cost/100).toFixed(2)}}</p>
        </div>
        <div class="case-msg bg-white">
            <case-drug :data="details"></case-drug>
        </div>
    </div>
</template>
<script>
import CaseDrug from './CaseDrug.vue'
import {getCaseListData} from '../../apis/hos.api'
import {Loading, Msg} from 'components'
import {toast} from 'mint-ui'

export default {
    components: {
        CaseDrug: CaseDrug
    },
    data () {
        return {
            herder: {},
            details: [],
            urlParams: {}
        }
    },
    methods: {},
    mounted: function () {
        let trmentId = this.$store.state.hosCard.recDetail.trmentId
        Loading.show()
        getCaseListData(trmentId).then((res) => {
            if (res.body.resultCode === '000000') {
                this.details = res.body.result
                Loading.close()
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
    },
    computed: {
        herder () {
            return this.$store.state.hosCard.recDetail
        }
    }
}
</script>
<style lang="less">
    @import "../../../../styles/common.less";
    .case-details-view {
        .inbox {
            margin: 0 10px;
        }
        >.top-intr {
            background: #FFFFFF;
            box-shadow:0 2px 12px 0 #e6e6e6;
            overflow: hidden;
            >p {
                 margin: 0 10px;
            }
            .case-type-name {
                >.case-type {
                    border-radius: 4px;
                    width: 38px;
                    height: 24px;
                    color: #ffffff;
                    line-height: 24px;
                    font-size: 12px;
                    margin-left: 2px;
                }
                >.case-name {
                    font-size: 22px;
                    color: #010101;
                }
            }
            .case-time {
                font-size: 14px;
                color: #949a9f;
                line-height: 23px;
                height: 23px;
            }
            p {
                font-size: 16px;
                color: #666666;
                line-height: 23px;
                text-align: left;
            }
        }
    }
</style>
