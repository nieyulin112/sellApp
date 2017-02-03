<template>
<div class="home-view">
    <cell is-link title="健康档案" @click.native="skip('/healthRecord/index')"></cell>

    <cell is-link title="家庭联系人" @click.native="skip('/familyConcat/index')"></cell>

    <cell is-link title="保险产品详情" @click.native="skip('/insurance/insDetail/:productId', true)"></cell>

    <cell is-link title="我的保险订单" @click.native="skip('/insuranStore/myInsureOrders')"></cell>

    <cell is-link title="管理本地Token" @click.native="token"></cell>
</div>
</template>
<script>
import {Cell, MessageBox} from 'mint-ui'
import {ls} from 'utils'

const TOKEN_NAME = 'SYSTEM_TOKEN'
export default {
    components: {
        Cell, MessageBox
    },
    methods: {
        skip (path, input) {
            if (input) {
                MessageBox.prompt(' ', '输入参数').then(({value}) => {
                    path = path.replace(/:[^/\s]+/, value)
                    this.$router.push(path)
                })
            } else {
                this.$router.push(path)
            }
        },
        token () {
            MessageBox.prompt(' ', '输入Token').then(({value}) => {
                ls.put(TOKEN_NAME, value)
            })
        }
    }
}
</script>