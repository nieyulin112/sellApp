import {getOtpNumber, login, httpValidate} from '../../apis/hos.api.js'
export default {
    state: {
        members: [],
        selectedMember: null,
        reportData: {},
        otpStatus: 0, // 有三种状态：0未开始 1进行中 2成功 3失败
        loginStatus: 0, // 有三种状态：0未开始 1进行中 2成功 3失败
        recDetail: {} // 病历详情
    },
    mutations: {
        setMembers (state, members) {
            state.members = members
        },
        selectMember (state, member) {
            state.selectedMember = member
        },
        setReportData (state, data) {
            state.reportData = data
        },
        setOtpStatus (state, data) {
            state.otpStatus = data
        },
        setLoginStatus (state, data) {
            state.loginStatus = data
        },
        // 病历详情
        setRecDetail (state, newData) {
            state.recDetail = newData
        }
    },
    actions: {
        setMembers ({commit}, payload) {
            commit('setMembers', payload)
        },
        setReportData ({commit}, data) {
            commit('setReportData', data)
        },
        async getOtp ({commit}, data) {
            commit('setOtpStatus', await getOtpNumber(data))
        },
        async loginIN ({commit}, data) {
            commit('setLoginStatus', await login(data))
        },
        async validatePhoneNumberAndNeedPic ({commit}, data) {
            await httpValidate(data)
        },
        // 病历详情
        setRecDetail ({commit}, newData) {
            commit('setRecDetail', newData)
        }
    }
}
