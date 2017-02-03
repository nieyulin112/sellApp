<template>
	<div class="family-concat-view" v-show="showBody">
        <!--有联系人-->
        <div v-if="!show">
            <div class="bg-gray text-left p-x p-y">
                共{{arrayList.length}}位联系人
            </div>
            <div ref="cellList">
                <cell-swipe icon="more"
                  v-for="item in arrayList"
                  :right="rightButtonsFn(item)"
                  :title="item.name">
                    <span  @click="skipDetail(item)" class="text-right">
                        <div class="p-y">{{item.age}}</div>
                        <div class="p-y">{{item.docNoDesc}}</div>
                    </span>
                    <img slot="icon" src="../../../../assets/images/boy@3x.png" alt="" height="16" v-show="item.gender!=='F'">
                    <img slot="icon" v-show="item.gender==='F'" src="../../../../assets/images/girl@3x.png" alt="" height="16">
                </cell-swipe>
            </div>
        </div>
        <!--没有联系人-->
        <div v-if="show" class="no-concat text-center">
            <img src="../../../../assets/images/no_data@3x.png" alt="" height="90px">
            <h2>当前无联系人</h2>
        </div>
        <div class="p-x btn-add" v-if="!show">
            <mt-button type="primary" size="large" @touchstart.native="add">
                添加联系人
            </mt-button>
        </div>
    </div>
</template>
<script>
import {header, button, cell, cellSwipe, toast} from 'mint-ui'
import {getFamilyMembers} from '../../apis/hos.api'
import {deleteMember, isExistRecord} from '../../apis/family.api'
import {mapActions} from 'vuex'
import {Loading} from 'components'
import {setModelCode} from 'utils/httpconfig'
setModelCode('UC')
let o = Array.prototype
o.remove = function (obj) {
    const index = this.indexOf(obj)
    if (index === -1) {
        return
    }
    this.splice(index, 1)
}
export default {
    components: {
        mtHeader: header,
        mtButton: button,
        cell,
        cellSwipe,
        Loading,
        toast
    },
    data () {
        return {
            arrayList: [],
            message: '是否确认删除该联系人',
            title: '提示',
            isRecord: false,
            show: false,
            showBody: false
        }
    },
    methods: {
        add () {
            this.$router.push({name: 'addConcat'})
        },
        skipDetail (item) {
            this.selectMember(item)
            this.$router.push({name: 'delConcat',
                params: {
                    id: item.id
                }
            })
        },
        // 删除的方法
        rightButtonsFn (item) {
            let that = this
            return [{
                content: '删除',
                style: { background: 'red', color: '#fff' },
                handler: () => {
                    if (item.id === '0') {
                        toast({
                            title: '提示',
                            message: '不能删除自己',
                            position: 'center',
                            duration: 1000
                        })
                    } else {
                        // 判断是否具有电子病历档案
                        isExistRecord(item).then(({body: {result}}) => {
                            that.isRecord = result
                            if (that.isRecord) {
                                this.message = '删除联系人将会同步删除健康档案是否确认删除?'
                            } else {
                                this.message = '是否确认删除该联系人?'
                            }
                            that.$messagebox
                            .confirm(this.message, {
                                confirmButtonText: '删除'
                            })
                            .then(() => {
                                Loading.show()
                                deleteMember(item.id).then(({body: {resultCode, msg, result}}) => {
                                    if (resultCode === '000000') {
                                        this.arrayList.remove(item)
                                    } else {
                                        toast({
                                            message: msg,
                                            position: 'center',
                                            duration: 1000
                                        })
                                    }
                                    Loading.close()
                                })
                            }).catch(({body: {msg}}) => {
                                Loading.close()
                                toast({
                                    message: msg,
                                    position: 'center',
                                    duration: 1000
                                })
                            })
                        })
                    }
                }
            }]
        },
        ...mapActions({
            selectMember: 'selectMember'
        })
    },
    mounted () {
        Loading.show()
        getFamilyMembers().then(({body: {result}}) => {
            this.showBody = true
            this.arrayList = result.memberDocs
            if (this.arrayList === 0) this.show = true
            this.arrayList.forEach(val => {
                if (val.age) {
                    val.age = val.age + '岁'
                }
                if (val.docNo) {
                    val.docNoDesc = val.docNo
                } else {
                    val.docNoDesc = '未填写身份证'
                }
            })
            Loading.close()
        }).catch(({body: {msg}}) => {
            this.showBody = true
            toast({
                message: msg,
                position: 'center',
                duration: 2000
            })
            Loading.close()
        })
    }
}
</script>
<style lang="less">
	.family-concat-view {
        height:100%;
        .mint-cell-swipe-button {
            line-height:68px;
        }
        .no-concat {
            margin-top:50%;
            h2{
                color:#92989d;
                font-size:16px;
            }
        }
        .btn-add{
            position:fixed;
            bottom:10px;
            width: 100%;
        }

        .mint-cell-swipe {
            .mint-cell-wrapper {
                position: relative;
            }
        }
	}
</style>
