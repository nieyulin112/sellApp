<template>
	<div class="del-concat-view">
        <div class="page-msgbox">
        </div>
        <div class="page-cell">
            <mt-cell title="姓名" :value="member.name"></mt-cell>
            <mt-cell title="身份证" :value="member.docNo"></mt-cell>
            <mt-cell title="性别" :value="member.gender==='F'?'女':'男'"></mt-cell>
            <mt-cell title="年龄" :value="member.age"></mt-cell>
        </div>
        <div class="btn-delete p-x">
            <mt-button type="danger" size="large" @click.native="remove" v-show="this.$route.params.id !=='0'">
                删除
            </mt-button>
        </div>
    </div>
</template>
<script>
import {header, button, messageBox, cell, toast} from 'mint-ui'
import {deleteMember, isExistRecord} from '../../apis/family.api'
import {Loading} from 'components'
export default {
    components: {
        mtHeader: header,
        mtButton: button,
        messageBox,
        cell,
        toast,
        Loading
    },
    data () {
        return {
            message: ''
        }
    },
    computed: {
        member () {
            return this.$store.state.family.selectedMember
        }
    },
    methods: {
        remove () {
            // 需要添加逻辑
            let isRecord
            isExistRecord(this.$route.params.id).then(({body: {result}}) => {
                isRecord = result
            })
            if (isRecord) {
                this.message = '删除联系人将会同步删除健康档案是否确认删除?'
            } else {
                this.message = '是否确认删除该联系人?'
            }
            messageBox.confirm(this.message).then(() => {
                // 接口的添加
                Loading.show()
                deleteMember(this.$route.params.id).then(({body: {resultCode, msg}}) => {
                    if (resultCode === '000000') {
                        this.$router.push({name: 'familyConcat'})
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
        }
    },
    mounted () {
    }
}
</script>
<style lang="less">
	.del-concat-view{
        height:100%;
        .btn-delete {
            width: 100%;
            position:fixed;
            bottom:10px;
        }
	}
</style>
