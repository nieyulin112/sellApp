import {getOtpNumber, login, httpValidate} from '../../apis/login.api.js'
export default {
    state: {
        otpStatus: 0, // 有三种状态：0未开始 1进行中 2成功 3失败
        loginStatus: 0, // 有三种状态：0未开始 1进行中 2成功 3失败
        recDetail: {} // 病历详情
    },
    mutations: {
        setOtpStatus (state, data) {
            state.otpStatus = data
        },
        setLoginStatus (state, data) {
            state.loginStatus = data
        }
    },
    actions: {
        async getOtp ({commit}, data) {
            commit('setOtpStatus', await getOtpNumber(data))
        },
        async loginIN ({commit}, data) {
            commit('setLoginStatus', await login(data))
        },
        async validatePhoneNumberAndNeedPic ({commit}, data) {
            await httpValidate(data)
        }
    }
}
