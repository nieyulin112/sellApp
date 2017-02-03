<template>
	<div class="add-concat-view">
        <div class="page-field">
            <div class="page-part">
                <field label="姓名" placeholder="请输入真实姓名" v-model="name" @input="onNameChange"
                    :attr="{maxlength: 10, minlength: 2}" :state="state.name">
                </field>
                <field label="身份证" placeholder="请输入真实的身份证号" v-model="cno" @input="onCNoChange"
                    :attr="{maxlength: 18, minlength: 12}" :state="state.cno">
                </field>
            </div>
        </div>
        <div class="btn-save p-x">
            <mt-button type="primary" size="large" @touchstart.native="save">
                保存
            </mt-button>
        </div>
    </div>
</template>
<script>
import {header, button, field, toast} from 'mint-ui'
import {addMember} from '../../apis/family.api'
import {Loading} from 'components'
export default {
    components: {
        mtHeader: header,
        mtButton: button,
        field,
        toast,
        Loading
    },
    data () {
        return {
            name: '',
            cno: '',
            state: {
                name: null,
                cno: null
            }
        }
    },
    methods: {
        check () {
            let hasError = false
            if (!this.name || this.name.length < 2 || this.name.length > 10) {
                this.state.name = 'error'
                hasError = true
            }
            if (!this.cno || this.cno.length !== 15 && this.cno.length !== 18) {
                this.state.cno = 'error'
                hasError = true
            }
            return hasError
        },
        save () {
            if (!this.check()) {
                Loading.show()
                addMember(this.name, this.cno).then(({body: {resultCode}}) => {
                    if (resultCode === '000000') {
                        if (this.$route.query.from && this.$route.query.out) {
                            window.location = this.$route.query.from
                        } else {
                            this.$router.back()
                        }
                    }
                    Loading.close()
                }).catch(({body: {msg}}) => {
                    Loading.close()
                })
            }
        },
        onNameChange () {
            this.state.name = ''
        },
        onCNoChange () {
            this.state.cno = ''
        }
    },
    mounted () {
    }
}
</script>
<style lang="less">
	.add-concat-view {
        height:100%;
        .btn-save{
            width: 100%;
            position:relative;
            top:20px;
        }
	}
</style>
