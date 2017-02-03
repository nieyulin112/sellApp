import {getPromise} from '../../../utils/httpUtil.js'
import Vue from 'vue'
import loading from 'components/Loading'
/**
** 保单详情
**/
export function insDetail (productId) {
    return Vue.http.get(Vue.getUrl('/api/product/v2/insurance/' + productId))
}
// import Vue from 'vue'
// import {getPromise} from '../../../utils/httpUtil.js'

// 个人保单接口
export function httpInsure (data) {
    // return getPromise('get', url, data)
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve([{
                title: '熊孩子综合保障保险',
                name: '张三',
                time: '2016年10月25日至2017年10月24日',
                money: '5万元',
                status: '0' // 0待付款 1观察期 2保障中 3已失效
            }, {
                title: '熊孩子综合保障保险',
                name: '张三',
                time: '2016年10月25日至2017年10月24日',
                money: '5万元',
                status: '1'
            }, {
                title: '熊孩子综合保障保险',
                name: '张三',
                time: '2016年10月25日至2017年10月24日',
                money: '5万元',
                status: '1'
            }, {
                title: '熊孩子综合保障保险',
                name: '张三',
                time: '2016年10月25日至2017年10月24日',
                money: '5万元',
                status: '1'
            }, {
                title: '熊孩子综合保障保险',
                name: '张三',
                time: '2016年10月25日至2017年10月24日',
                money: '5万元',
                status: '1'
            }, {
                title: '熊孩子综合保障保险',
                name: '张三',
                time: '2016年10月25日至2017年10月24日',
                money: '5万元',
                status: '3'
            }, {
                title: '熊孩子综合保障保险',
                name: '张三',
                time: '2016年10月25日至2017年10月24日',
                money: '5万元',
                status: '2'
            }])
        })
    }).then((data) => {
        return data
    })
}

// 无限加载保险接口
export function httpInsureList (data) {
    const url = '/api/product/v2/insurance?page=' + data.page + '&pageSize=' + data.pageSize
    return getPromise('get', url)
}

// 无限加载贷款接口
export function httpLoanList (data) {
    // return getPromise('get', url, data)
}

// 保险须知接口
// export function httpNeedKnowContent (data) {
//     return getPromise('get', url, data)
//     return new Promise((resolve, reject) => {
//         setTimeout(function () {
//             resolve({
//                 content: '1.使用或曾经使用镇静安眠药、迷幻药、违禁药品、强力胶、毒品、酒精中毒、药物中毒'
//             })
//         }, 1000)
//     }).then((data) => {
//         return data.content
//     })
// }

export function httpInsureClause (data) {
    // return getPromise('get', url, data)
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve({
                productInsuranceClauseList: [{
                    imageUrl: '',
                    name: '第一条款'
                }, {
                    imageUrl: '',
                    name: '第二条款'
                }, {
                    imageUrl: '',
                    name: '第三条款'
                }]
            })
        }, 1000)
    }).then((data) => {
        return data
    })
}

// 提交保单接口
export function httpPostOrderInfo (postParam) {
    return Vue.http.post(Vue.getUrl('/api/product/v2/insurance/order'), {
        ...postParam
    }, {
        autoLogin: false
    })
}
// 发起支付按钮接口
export function httpOrderPay (Param) {
    return Vue.http.post(Vue.getUrl('/api/product/v2/insurance/order/h5pay'), {
        ...Param
    }, {
        before () {
            loading.show()
        }
    })
}
// 取消支付订单按钮接口
export function httpOrderCancel (Param) {
    return Vue.http.put(Vue.getUrl('/api/product/v2/insurance/order'), {
        ...Param
    })
}

// 获取订单列表的接口
export function httpInsureOrders (data) {
    return getPromise('get', Vue.getUrl('/api/product/v2/insurance/order'), {
        params: data,
        before () {
            loading.show()
        }
    })
    // return getPromise('get', Vue.getUrl({
    //     mockUrl: '/insure/insureCards.json',
    //     mock: true
    // }))
}

// 查询订单详情接口
export function httpGetOrderDetInfo (Param) {
    return Vue.http.get(Vue.getUrl('/api/product/v2/insurance/order?policyOrderId=' + Param))
}
