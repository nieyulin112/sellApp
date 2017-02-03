import Vue from 'vue'
export function getFastPayHistory () {
    // let url = '/api/clinicorder/v2/order' + eid
    let url = Vue.getUrl({
        url: '/api/medical/v1/emr/document',
        mockUrl: '/fastpay/fastpay_history.json',
        mock: true
    })
    return Vue.http.get(url)
}

// 查询理赔记录接口
export function httpGetPayDet (Param) {
    return Vue.http.post(Vue.getUrl('/api/claim/v2/records'), {
        ...Param
    })
}

// 授权理赔接口
export function httpPostAuthClaims (Param) {
    return Vue.http.post(Vue.getUrl('/api/claim/v2/authorization'), {
        ...Param
    })
}
// 获取医院的接口
export function getHospitals () {
    let url = Vue.getUrl({
        url: '/api/claim/v2/hospitals',
        mockUrl: '/fastpay/fastpay_hos.json',
        mock: false
    })
    return Vue.http.get(url)
}