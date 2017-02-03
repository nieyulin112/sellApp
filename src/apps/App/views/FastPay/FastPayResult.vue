<template>
    <div id="fastpay_result_container" v-show="show">
        <div class="fastpay_result_img" :class="[result==0 ? fastpay_result_img_ok : fastpay_result_img_failed ]">
        </div>

        <div class="fastpay_reslut_content">
            {{ result == 0 ? '授权理赔成功' : '授权理赔失败' }}
        </div>
        <div class="return-back">
            <my-button class="fastpay_result_return" size="large" @click.native="backLoadPage">
                返回光速赔
            </my-button>
        </div>
        <div class="fastpay_result_seeHistory" @click="goToHistory">
            查看历史记录
        </div>
    </div>
</template>

<script>
    import {button} from 'mint-ui'

    export default{
        components: {
            'my-button': button
        },
        data () {
            return {
                result: 0,
                fastpay_result_img_ok: 'fastpay_result_img_ok',
                fastpay_result_img_failed: 'fastpay_result_img_failed',
                show: false
            }
        },

        methods: {
            goToHistory () {
                this.$router.push({name: 'fastPayHistory'})
            },
            backLoadPage () {
                this.$router.push({name: 'fastPayIndex'})
            }
        },

        mounted () {
            this.result = this.$route.params.type
            this.show = true
        }
    }

</script>


<style lang="less">

    #fastpay_result_container {
        .fastpay_result_img{
            height: 200px;
            width: 100%;
        }

        .fastpay_result_img_ok {
            background: url("../../../../assets/images/fastpay_result_ok.png") center 40px no-repeat;

        }

        .fastpay_result_img_failed {
            background: url("../../../../assets/images/fastpay_result_failed.png") center 40px no-repeat;
        }

        > .fastpay_reslut_content {
            margin: 40px auto 0 auto;
            text-align: center;
            color: #92989d;
            font-size: 16px;
        }

        > .return-back{
            padding: 0 10px;
            > .fastpay_result_return {
                background-color: #fc7845;
                display: block;
                width: 100%;
                color: white;
                font-size: 14px;
                margin: 67px auto 0 auto;
                font-size: 18px;
                color: #ffffff;
            }
        }

        > .fastpay_result_seeHistory {
            height: 24px;
            line-height: 24px;
            color: #5b90d6;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
            font-size: 16px;
        }
    }
</style>
