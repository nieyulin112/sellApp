<template>
  <div id="otp-login">
    <div class="icon">
    </div>
    <div class="otp-login-main">
      <div class="phone-section">
        <input type="tel" placeholder="请输入手机号码" v-model="phoneNumber" v-on:change="change" class="phone" v-on:focus="phoneFocus" v-on:blur="phoneBlur" maxLength="11">
        <div class="delete" v-if="seen" v-on:touchstart="deletePhone"></div>
      </div>
      <div class="otp-section">
        <input class="otp" type="tel" placeholder="请输入验证码" v-model="otpNumber">
        <label @touchstart="getOtpNumber" :class="classes">{{content}}</label>
      </div>
      <div class="otp-picture">
         <input type="text" name="name" value="" placeholder="请输入右侧图形验证码" v-model="picNumber">
         <div class="pic-number">
             <img src="" alt="" />
         </div>
      </div>
    </div>
    <div class="login-btn">
        <my-button type="primary" size="large" @click.native="loginMethod">{{loginStatus === 1 ? '登录中...' : '登录'}}</my-button>
    </div>
    <div class="login-password">
      <span @touchstart.native="goToPasswordLogin">账号密码登录</span>
    </div>
  </div>
</template>
<style lang="less">
  @import "../../../../styles/common.less";
  @inputGap: @gap/2;
  #otp-login {
    padding-left: @gap;
    padding-right: @gap;
    height: 100%;
    width: 100%;
    background: #fff;
    input{
      -webkit-appearance: none;
      outline: none;
      border:none;
    }
    > .icon {
      width: 100%;
      height: 250px;
      background: url(../../../../../static/otp-icon.png) no-repeat center center;
    }
    > .otp-login-main{
      width:100%;
      > div.phone-section{
        border-bottom: 1px solid #eaeaea;
        position: relative;
        height: 50px;
        padding: 15px 5px;
        // box-sizing: border-box;
        > input.phone{
          width: 100%;
          font-size: 16px;
          line-height: 20px;
          height: 20px;
          display: block;
        }
        > div.delete{
          position: absolute;
          width: 16px;
          height: 16px;
          border-radius: 8px;
          top: 18px;
          right: 18px;
          background: url(../../../../../static/delete.png) no-repeat center center;
        }
        > div.del-is-show{
          display: block;
        }
        > div.del-is-hide{
          display: none;
        }
      }
      > div.otp-section{
        width:100%;
        padding: 15px 5px;
        border-bottom: 1px solid #eaeaea;
        height: 50px;
        >label{
          display: inline-block;
          float: right;
          width:30%;
          text-align: center;
          border-left:1px solid #eaeaea;
          font-size: 16px;
          height: 20px;
          line-height: 20px;
        }
        >.active{
          color: #000;
        }
        >.normal{
          color: #18b0cc;
        }
        >input{
          display: inline-block;
          float: left;
          width:70%;
          height: 20px;
          font-size: 16px;
          line-height: 20px;
        }
      }
      >.otp-picture{
          width:100%;
          padding: 15px 5px;
          border-bottom: 1px solid #eaeaea;
          height: 50px;
        >input{
            display: inline-block;
            float: left;
            width: 70%;
            height: 20px;
            font-size: 16px;
            line-height: 20px;
        }
        >div.pic-number{
            float: right;
            width:30%;
        }
      }
    }
    .login-btn{
      width:100%;
      margin-top: 60px;
    }
    .login-password{
      width:100%;
      text-align: center;
      color: #18b0cc;
      margin-top: 15px;
      font-size: 16px
    }
  }
</style>
<script>
    import {button} from 'mint-ui'
    // import {getOtpNumber, login} from '../../apis/hos.api'
    import {mapState} from 'vuex'
    export default{
        components: {
            myButton: button
        },
        data () {
            return {
                phoneNumber: '',
                otpNumber: '',
                content: '发送验证码',
                lock: false,
                classes: {
                    active: false,
                    normal: true
                },
                seen: false,
                timesLock: false,
                loginContent: '登录',
                picNumber: ''
            }
        },
        computed: {
            ...mapState({
                otpSuccess: 'otpSuccess',
                loginStatus: 'loginStatus'
            })
        },
        methods: {
            getOtpNumber () {
                // 判断手机号码是否格式正确
                console.log('getin')
                if (!/\d{11}/.test(this.phoneNumber)) {
                    console.log('手机号码不正确')
                    return
                }
                this.getOtp()
            },

            getOtp: function () {
                if (this.timesLock) return
                this.timesLock = true
                var count = 60
                var vm = this
                this.lock = true
                // 设置状态
                this.$store.commit('setOtpStatus', 1)
                // 调用请求otp的异步接口的action
                this.$store.dispatch('getOtp', {})
                var id = setInterval(function () {
                    if (count === 0) {
                        clearInterval(id)
                        vm.lock = false
                        vm.content = '重发验证码'
                        vm.timesLock = false
                        return
                    }
                    vm.content = count + '后重发'
                    count--
                }, 1000)
            },
            loginMethod () {
                // 调用登录接口
                if (this.loginStatus === 1) return
                this.$store.commit('setLoginStatus', 1)
                this.$store.dispatch('loginIN', {})
            },
            phoneFocus () {
                this.seen = true
            },
            phoneBlur () {
                this.seen = false
                // 需要验证手机号和验证码和需要图形验证码时获取图形验证码
                // 首先判断该手机号
            },
            deletePhone () {
                this.phoneNumber = ''
            },
            goToPasswordLogin () {
                this.$router.push('/beforeLogin')
            },
            change () {
                // 在该事件中验证手机号是否需要图形验证码
                this.$store.dispatch('validatePhoneNumberAndNeedPic', this.phoneNumber)
            }
        },
        watch: {
            lock (newLock) {
                this.classes.active = !this.classes.active
                this.classes.normal = !this.classes.normal
            },
            otpStatus (newState) {
                switch (newState) {
                    case 0:
                    case 1:
                        break
                    case 2:
                        // 提示获取成功
                        break
                    case 3:
                        // 获取失败
                        break
                }
            }
        }
    }
</script>
