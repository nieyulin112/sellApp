// 保险商城
import InsDetailView from '../views/InsuranStore/InsDetailView.vue'
import InsuredOrdersView from '../views/InsuranStore/InsuredOrdersView.vue'
import InsuredInfoConfirmView from '../views/InsuranStore/insuredInfoConfirmView.vue'
import OrderDetailView from '../views/InsuranStore/orderDetailView.vue'
import MyInsureOrdersView from '../views/InsuranStore/MyInsureOrders.vue'
import InsureIndexView from '../views/InsuranStore/InsureIndex'
import InsureKnowView from '../views/InsuranStore/InsureKnow'
import InsureClauseView from '../views/InsuranStore/InsureClause'
import InsureClauseDetailView from '../views/InsuranStore/InsureClauseDetail'
export default [{
    path: '/insurance/insDetail/:productId', // 保险详情
    name: 'insDetail',
    meta: {
        title: '保险详情'
    },
    component: InsDetailView
}, {
    path: '/insuranStore/insuredOrders', // 投保下单
    name: 'insuredOrders',
    component: InsuredOrdersView,
    meta: {
        title: '投保下单'
    }
}, {
    path: '/insuranStore/insuredInfoConfirm', // 投保信息确认
    name: 'insuredInfoConfirm',
    component: InsuredInfoConfirmView,
    meta: {
        title: '投保信息确认'
    }
}, {
    path: '/insuranStore/orderDetail', // 订单（保单）详情
    name: 'orderDetail',
    component: OrderDetailView,
    meta: {
        title: '订单详情'
    }
}, {
    path: '/insuranStore/myInsureOrders', // 我的保险订单
    name: 'myInsureOrders',
    component: MyInsureOrdersView,
    meta: {
        title: '我的保险订单',
        auth: {
            fail (next) {
                next({
                    path: '/beforeLogin',
                    query: {
                        from: '/insuranStore/myInsureOrders'
                    }
                })
            }
        },
        channelCheck: {
            fail: false
        }
    }
}, {
    path: '/insuranStore/insureIndex', // 首页
    name: 'insureIndex',
    component: InsureIndexView,
    meta: {
        title: '保障'
    }
}, {
    path: '/insuranStore/insureKnow:productId', // 告知页
    name: 'insureKnow',
    component: InsureKnowView,
    meta: {
        title: '保险告知'
    }
}, {
    path: '/insuranStore/insureClause', // 条款页
    name: 'insureClause',
    component: InsureClauseView,
    meta: {
        title: '保险条款'
    }
}, {
    path: '/insuranStore/insureClauseDetail:index',
    name: 'insureClauseDetail',
    component: InsureClauseDetailView,
    meta: {
        title: '条款详情'
    }
}]
