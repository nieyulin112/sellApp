<template lang="html">
    <div class="sure-index">
        <nav-bar v-model="header.pointer" :fixed="true">
            <div v-for="(item, index) in header.contents" id="wrap">
                <div class="deep-wrap">
                    <tab-item :id="index">{{header.contents[index]}}</tab-item>
                </div>
            </div>
        </nav-bar>
        <tab-container v-model="header.pointer" v-show="isShow">
            <tab-container-item :id="index" v-for="(data, index) in allData">
                <div id="container">
                    <ul v-infinite-scroll="allLoadMore[index]" infinite-scroll-disabled="insureLoading" infinite-scroll-distance="10">
                        <li is="insure-card" v-for="item in data" :info="item"></li>
                    </ul>
                </div>
            </tab-container-item>
        </tab-container>
    </div>
</template>

<script>
import {Navbar, TabItem, TabContainer, TabContainerItem} from 'mint-ui'
import InsureCard from './InsureCard'
import {mapState} from 'vuex'
export default {
    data () {
        return {
            header: {
                pointer: 0,
                contents: ['保险', '贷款']
            }
        }
    },
    components: {
        'nav-bar': Navbar,
        'tab-item': TabItem,
        'tab-container': TabContainer,
        'tab-container-item': TabContainerItem,
        'insure-card': InsureCard
    },
    computed: {
        ...mapState({
            insureList ({insure}) {
                return insure.insureList
            },
            insureLoading ({insure}) {
                return insure.insureLoading
            },
            insureTimes ({insure}) {
                return insure.insureTimes
            },
            loanList ({insure}) {
                return insure.loanList
            },
            loanLoading ({insure}) {
                return insure.loanLoading
            },
            loanTimes ({insure}) {
                return insure.loanTimes
            }
        }),
        // 判断主部分是不是要显示
        isShow () {
            return this.insureList.length !== 0
        },
        allData () {
            return [[...this.insureList], [...this.loanList]]
        },
        allLoadMore () {
            return [this.loadInsureMore, this.loadLoanMore]
        }
    },
    methods: {
        loadInsureMore () {
            this.$store.commit('setInsureLoading', false)
            this.$store.dispatch('getInsureList', {page: this.insureTimes, pageSize: 10})
        },
        loadLoanMore () {
            this.$store.commit('setLoanLoading', false)
            this.$store.dispatch('getLoanList', {})
        }
    }
}
</script>

<style lang="less" scoped>
.sure-index{
    ul{
        li{
            width: 100%;
            height: 190px;
        }
    }
    #wrap{
        width: 50%;
        height: 53px;
        background: #fff;
        .deep-wrap{
            margin: 0 auto;
            width: 32px;
        }
    }
    .mint-tab-item-label{
        font-size: 16px;
        color: #586576;
        font-weight:bold;
    }
    .mint-navbar .mint-tab-item.is-selected{
        border-bottom: 3px solid #5b90d6;
        color: #5b90d6;
        margin-bottom: -3px;
    }
    .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
        color: #5b90d6;
    }
    .mint-tab-container{
        margin-top: 3px;
    }
}
</style>
