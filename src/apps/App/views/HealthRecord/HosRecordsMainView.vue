<template>
<!-- 就医记录主页 -->
<div class="hos-records-main">
    <div>
        <mem-selector :is-sample="isSample" :members="members" :selected="selected" @selected-changed="selectedChanged"></mem-selector>

        <div class="header-card p-x p-y vux-1px-t" @click="skip2BillChart">
            <div class="grid-row">
                <div class="grid-8">
                    <h2><small class="money-mark">￥</small>{{finalTotal | pd-currency}}</h2>
                    <p><small class="text-muted">总医疗费</small></p>
                </div>
                <div class="grid-4">
                    <a type="primary" size="small" class="pull-right">账单详情</a>
                </div>
            </div>

            <div class="grid-row m-t">
                <div class="grid-3 fee-item">
                    {{overview.mCount}}<br>
                    <small class="text-muted">门诊(次)</small>
                </div>
                <div class="grid-3 fee-item">
                    {{overview.jCount}}<br>
                    <small class="text-muted">急诊(次)</small>
                </div>
                <div class="grid-3 fee-item">
                    {{overview.zCount}}</br>
                    <small class="text-muted">住院(次)</small>
                </div>
                <div class="grid-3 fee-item">
                    {{overview.othCount}}</br>
                    <small class="text-muted">其他(次)</small>
                </div>
            </div>
        </div>
    </div>

    <h3 class="item-list-hd">
        <span class="iconfont icon-edit"></span>
        我的病历 <small class="text-muted">(共{{diseases.length}}种疾病)</small>
    </h3>
    <pd-scroll class="item-list">
        <div>
            <mt-cell :title="disease.disDes" class="disease-item" is-link v-for="disease in diseases" @click.native="onDiseaseClick(disease)">
                <div class="disease-item-desc">
                    <small class="text-default">共{{disease.trmentCount}}次就诊</small>
                    <small class="text-muted">最近就诊: {{disease.lastDate}}</small>
                </div>
            </mt-cell>
        </div>
    </pd-scroll>

    <div class="bottom-bar" v-if="isSample">
        <mt-button size="large" type="primary" @click.native="onClickNew">添加新档案</mt-button>
    </div>

    <sample-mark top="70px" right="20px" v-if="isSample"></sample-mark>

    <has-no-records-view v-show="diseases && diseases.length===0"></has-no-records-view>
</div>
</template>
<script>
import {button, cell, popup, picker} from 'mint-ui'
import {getHosTotalReport} from '../../apis/hos.api'
import {mapActions} from 'vuex'
import {Loading, SampleMark, Msg} from 'components'
import PdScroll from 'components/XScroll'
import MemSelector from './MemberSelector'
import HasNoRecordsView from './HasNoRecordsView'

function setData (res, vm) {
    res = res || {}
    vm.diseases = res.data || []

    let {amount: total, clinicCount: mCount, emrgCount: jCount, inhosCount: zCount, othCount, status} = res

    if (status === '1') {
        const name = vm.selected ? vm.selected.name : '您'
        Msg.alert(`正在为[${name}]收集数据, 需要一段时间, 请稍后再试...`)
        return
    }

    vm.overview = {total, mCount, jCount, zCount, othCount}

    vm.setReportData({
        total: total,
        clinicCount: mCount,
        emrgCount: jCount,
        inhosCount: zCount,
        othCount: othCount
    })
}

export default {
    components: {
        mtButton: button,
        mtCell: cell,
        popup,
        picker,
        PdScroll,
        SampleMark,
        MemSelector,
        HasNoRecordsView
    },
    data () {
        return {
            diseases: [],
            popShow: false,
            // selected: {},
            overview: {
                total: 0,
                mCount: 0,
                jCount: 0,
                zCount: 0
            }
        }
    },
    computed: {
        members () {
            return this.$store.state.hosCard.members
        },
        finalTotal () {
            return (this.overview.total / 100).toFixed(2)
        },
        selected () {
            if (this.isSample) {
                return {name: '莫小美'}
            }
            return this.$store.state.hosCard.selectedMember || {}
        },
        isSample () {
            return this.$route.name === 'hosMainSample'
        }
    },
    watch: {
        selected (newV, oldV) {
            if (newV.id !== oldV.id) {
                this.fetchData(this.isSample)
            }
        }
    },
    beforeRouteEnter (to, from, next) {
        Loading.show()
        getHosTotalReport(to.name === 'hosMainSample', to.params.id).then(({body: {result: res}}) => {
            Loading.close()
            res = res || {}
            next(vm => {
                setData(res, vm)
            })
        })
    },
    methods: {
        selectedChanged (member) {
            this.selectMember(member)
        },
        onDiseaseClick (dis) {
            if (this.isSample) {
                return
            }
            this.$router.push({
                name: 'timeLine',
                params: {disDes: dis.disDes, id: this.selected.id}
            })
        },
        fetchData (isSample) {
            Loading.show()
            getHosTotalReport(isSample, this.selected.id).then(({body: {result: res}}) => {
                Loading.close()
                setData(res, this)
            })
        },
        skip2BillChart () {
            this.$router.push({name: 'billChart', params: {id: this.selected.id}})
        },
        ...mapActions({
            setReportData: 'setReportData',
            selectMember: 'selectMember'
        }),
        popupShow () {
            if (this.isSample) {
                return
            }
            this.popShow = true
        },
        onClickNew () {
            this.$router.push({
                path: '/familyConcat/addConcat',
                query: {
                    from: '/healthRecord/index'
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../../styles/vars.less';

.hos-records-main {
}

.circle-button {
    line-height: 35px;
}


.bottom-bar {
    background-color: #f9f9f9;
    padding: 10px;
    position: fixed;
    bottom: 0px;
    width: 100%;
}

.header-card {
    background-color: #fff;
    box-shadow: 0px 2px 12px #ddd;

    p {
        margin: 0px;
    }

    h2 {
        font-size: 36px;
        line-height: 38px;
        font-weight: normal;
        margin: 0px;
        color: #ff4800;
        small {
            font-size: 12px;
        }

        .money-mark {
            font-size: 24px;
            margin-right: 4px;
        }
    }
}

.fee-item {
    line-height: 1.4;
    font-size: 18px;
    text-align: center;
    small {
        font-size: 14px;
    }
}

.item-list-hd {
    font-size: 16px;
    font-weight: normal;
    margin-top: @gap;
    padding: @gap;
    background-color: #fff;
}

.item-list {
    background-color: #fff;
    position: absolute;
    top: 234px;
    bottom: 0px;
    width: 100%;
}

.disease-item {
    small {
        font-size: 12px;
        display: block;
    }
}

.disease-item-desc {
    line-height: 1.5;
    text-align: right;
    padding: 8px 0px;

    .text-default {
        margin-bottom: 4px;
    }
}

.icon-edit {
    color: #4b89dc;
}
</style>
