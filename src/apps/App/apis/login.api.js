import {getPromise} from '../../../utils/httpUtil'
import Vue from 'vue'

export function httpValidate (mobileNo) {
    const urlValidatePhone = '/api/uc/pinganone/v1/checkMobileNo'
    const urlNeedPic = '/api/uc/pinganone/v1/isShowImageVcode'
    const params = {
        deviceId: Math.random() * 1000000000000000000,
        deviceIp: '192.168.0.1',
        deviceType: 'sh',
        mobileNo
    }
    const validatePhone = getPromise('post', urlValidatePhone, params)
    const needPic = getPromise('post', urlNeedPic, params)
    Promise([validatePhone, needPic]).then((data) => {
        return ''
    })
}

// 获取otp验证码
// options需要传递的参数
export function getOtpNumber (options) {
    return Vue.http.get(Vue.getUrl('/jsons/otp.json'), options)
            .then((data) => {
                return data
            }).catch((error) => {
                return error
            })
}

// 登录的接口
export function login (options) {
    return Vue.http.get(Vue.getUrl('jsons/login.json'), options)
            .then((data) => {
                return data
            }).catch((error) => {
                return error
            })
}
