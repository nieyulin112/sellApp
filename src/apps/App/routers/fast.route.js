// import fastPayLogin from '../views/FastPay/FastLoginView.vue'
import fastPayHistory from '../views/FastPay/FastPayHistory.vue'
import AuthorizationClaims from '../views/FastPay/AuthorizationClaimsView.vue'
import fastPayResult from '../views/FastPay/FastPayResult.vue'
import fastPayIndex from '../views/FastPay/FastPayIndexView.vue'
import fastPayStatus from '../views/FastPay/FastPayStatus.vue'
import NoRecords from '../views/FastPay/NoRecords.vue'
import fastMedicalCollection from '../views/FastPay/MedicalCollection.vue'
export default [{
    path: '/fastpay/history', // 历史记录
    name: 'fastPayHistory',
    meta: {
        title: '历史记录'
    },
    component: fastPayHistory
}, {
    path: '/fastpay/authClim', // 授权理赔
    name: 'authorizationClaims',
    meta: {
        title: '授权理赔'
    },
    component: AuthorizationClaims
}, {
    path: '/fastpay/result/:type', // 结果状态页
    name: 'fastPayResult',
    meta: {
        title: '光速赔'
    },
    component: fastPayResult
}, {
    path: '/fastPay/index', // 光速赔
    name: 'fastPayIndex',
    meta: {
        title: '光速赔',
        auth: {
            fail (next) {
                next({
                    path: '/beforeLogin',
                    query: {
                        from: '/fastPay/index'
                    }
                })
            }
        },
        channelCheck: {
            fail: false
        }
    },
    component: fastPayIndex
}, {
    path: '/fastPay/payStatus', // 空态页
    name: 'payStatus',
    meta: {
        title: '光速赔'
    },
    component: fastPayStatus
}, {
    path: '/fastPay/noRecords', // 就医记录为空的时候的页面
    name: 'noRecords',
    meta: {
        title: '就医记录'
    },
    component: NoRecords
}, {
    path: '/fastPay/medicalCollection',
    name: 'medicalCollection',
    meta: {
        title: '医疗数据收集及使用授权条款'
    },
    component: fastMedicalCollection
}]
