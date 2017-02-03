<template>
    <div class="login-view">
        <mt-swipe :auto="0" :continuous="false">
            <mt-swipe-item><img src="../../../../assets/images/guide1.png"> </mt-swipe-item>
            <mt-swipe-item><img src="../../../../assets/images/guide2.png"> </mt-swipe-item>
            <mt-swipe-item><img src="../../../../assets/images/guide3.png"> </mt-swipe-item>
        </mt-swipe>
        <div class="box">
            <div class="btn-box">
                <mt-button class="login-btn bg-warning" @touchstart.native="loginClick()" size="large" >登录</mt-button>
            </div>
        </div>

    </div>
</template>

<script>
import {button} from 'mint-ui'
import {gotoLogin} from 'utils/appUtil'

export default {
    components: {
        mtButton: button
    },
    methods: {
        loginClick () {
            gotoLogin().then((loginInfo) => {
                this.$router.replace(this.$route.query.from)
            })
        }
    }
}

</script>

<style lang="less">
    html, body {
        height: 100%;
    }
    .login-view {
        overflow: hidden;
        height:100%;
        background: #ffffff;
        .mint-swipe {
            height:80%;
            margin-top: 80px;
            .mint-swipe-indicators {
                bottom: 40px;
                .mint-swipe-indicator {
                    margin-left: 5px;
                    background: #CFEBFA;
                    opacity: 1;
                    height: 10px;
                    width: 10px;
                }
                .is-active {
                    background: #92CEEE;
                }
            }
            .mint-swipe-item {
                text-align: center;
            }
        }
        img{
            width: 80%;
        }
        .box {
            position: fixed;
            bottom: 0;
            width: 100%;
            .btn-box {
                margin-left: 10px;
                margin-right: 10px;
                > .login-btn {
                    width: 100%;
                    bottom: 10px;
                    letter-spacing: 5px;
                    color: white;
                }
            }
        }
    }
</style>
