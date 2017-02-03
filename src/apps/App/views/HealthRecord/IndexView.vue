<template>
<div class="health-record">
    <navbar v-model="selected" v-if="showBar" ref="ddd">
        <tab-item :attr="index" :id="index" v-for="(user, index) in users">{{user.name}}</tab-item>
    </navbar>
    <tab-container v-model="selected" class="p-b" :swipeable="swipeable" :style="{top:showBar?'49px':'20px'}">
        <tab-container-item :id="index" v-for="(user, index) in users">
            <div class="grid-12 grid-gap p-t-2">

                <hos-card :is-sample="isSample" :data="user" title="就医记录本" @click.native="onView(0, user)" class="p-x-2">
                    <div class="diag-card pull-right" slot>
                        <img src="../../../../assets/images/is_card@3x.png">
                    </div>
                </hos-card>

                <hos-card :is-sample="isSample && !hasCheckInfos" :data="user" title="体检记录本" class="m-t-2 p-x-2" @click.native="onView(1, user)">
                    <div class="diag-card pull-right" slot>
                        <img src="../../../../assets/images/hc_card@3x.png">
                    </div>
                </hos-card>
            </div>
        </tab-container-item>
    </tab-container>

    <div class="p-x" id="addNewBtn">
        <mt-button size="large" type="primary" @click.native="onClickNew">添加新档案</mt-button>
    </div>
</div>
</template>
<script>
import {tabContainer, tabContainerItem, navbar, tabItem, button} from 'mint-ui'
import HosCard from './HosCard'
import {mapActions} from 'vuex'
import {Loading} from 'components'
import {getFamilyMembers} from '../../apis/hos.api'
import {setModelCode} from 'utils/httpconfig'

const SAMPLE_USER = {
    name: '样例',
    age: 12,
    sex: '男'
}
setModelCode('EMR')
export default {
    components: {
        tabContainer,
        tabContainerItem,
        navbar,
        tabItem,
        HosCard,
        mtButton: button
    },
    data () {
        return {
            users: [],
            selected: 0,
            isSample: false,
            hasCheckInfos: false,
            swipeable: true
        }
    },
    computed: {
        showBar () {
            return !this.isSample && this.users && this.users.length > 1
        }
    },
    mounted () {
        Loading.show()
        getFamilyMembers().then(({body: {result}}) => {
            Loading.close()
            const vm = this
            vm.isSample = !(result.memberDocs.length > 0)
            vm.hasCheckInfos = result.hasCheckRecord

            if (vm.isSample) {
                vm.users = [SAMPLE_USER]
            } else {
                for (let i = 0; i < result.memberDocs.length; i++) {
                    if (result.memberDocs[i].name.length > 4) {
                        result.memberDocs[i].name = result.memberDocs[i].name.substring(0, 4) + '...'
                    }
                }
                vm.users = result.memberDocs
                vm.setMembers(result.memberDocs)
            }
        })
    },
    methods: {
        onView (type, user) {
            if (type === 0 && this.isSample) {
                this.$router.push('/healthRecord/mainSample')
                return
            } else if (type === 0) {
                this.selectMember(user)
                this.$router.push({name: 'hosMain', params: {id: user.id}})
                return
            }

            if (type === 1 && this.isSample && !this.hasCheckInfos) {
                return
            } else if (type === 1) {
                window.location = window.location.origin + '/hmcp-hp/expArchive/app/index.html?name=' + (window.encodeURI(user.name)).replace(/%/g, 'Z')
            }
        },
        onClickNew () {
            this.$router.push({
                path: '/familyConcat/addConcat',
                query: {
                    from: window.location.hash.slice(1)
                }
            })
        },
        ...mapActions({
            inc: 'inc',
            setMembers: 'setMembers',
            selectMember: 'selectMember'
        })
    }
}
</script>
<style lang="less">
.diag-card {
    display: inline-block;
    margin-top: 20px;

    img {
        width: 3.7333333rem;
        height: 2.48rem;
    }
}

.circle-button {
    position: fixed;
    text-align: center;
    padding-top: 10px;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    border-radius: 60px;
    background-color: #26a2ff;
    box-shadow: 1px 1px 8px #777;

    a:-webkit-any-link {
        color: #fff;
    }

    &:hover, &:focus, &:active {
        background-color: darken(#26a2ff, 20%);
    }
}
#addNewBtn {
    position: fixed;
    width: 100%;
    bottom: 20px;

    a {
        color: #fff;
    }
}

.health-record {
    .pd-card:last-child {
        margin-bottom: 80px;
    }

    .mint-tab-container {
        top: 49px;
    }

    .mint-navbar {
        position: fixed;
        z-index: 1000;
        width: 100%;
        overflow: auto;

        .mint-tab-item {
            min-width: 50px;
            margin-left: 10px;
            margin-right: 10px;
            &.is-selected {
                margin-bottom: 0px;
            }
            .mint-tab-item-label {
                font-size: 15px;
            }
        }
    }
}
</style>
