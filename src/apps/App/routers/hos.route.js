import HealthRecordIndex from '../views/HealthRecord/IndexView.vue'
import HosMainView from '../views/HealthRecord/HosRecordsMainView.vue'
import CaseDetails from '../views/HealthRecord/CaseDetailsView.vue'
import Timeline from '../views/HealthRecord/TimelineView.vue'
import BeforeLogin from '../views/HealthRecord/LoginView.vue'

const BillChart = r => require.ensure([],
    () => r(require('../views/HealthRecord/BillChartView.vue')), 'bill-chart')

export default [{
    name: 'healthRecordIndex',
    path: '/healthRecord/index', // 家庭成员列表页
    component: HealthRecordIndex,
    meta: {
        title: '健康档案',
        auth: {
            fail (next) {
                next({
                    path: '/beforeLogin',
                    query: {
                        from: '/healthRecord/index'
                    }
                })
            }
        },
        channelCheck: {
            fail: false
        }
    }
}, {
    path: '/healthRecord/main/:id', // 就医记录主页
    name: 'hosMain',
    component: HosMainView,
    meta: {
        title: '就医记录'
    }
}, {
    path: '/healthRecord/caseDetailsView/:id', // 病例详情
    name: 'caseDetails',
    component: CaseDetails,
    meta: {
        title: '病例详情'
    }
}, {
    path: '/healthRecord/mainSample', // 就医记录主页(样例)
    name: 'hosMainSample',
    component: HosMainView
}, {
    path: '/healthRecord/billChart/:id', // 医疗账单
    name: 'billChart',
    component: BillChart,
    meta: {
        title: '医疗账单'
    }
}, {
    path: '/healthRecord/timeLine/:id/:disDes', // 病例时间轴
    name: 'timeLine',
    component: Timeline
}, {
    path: '/beforeLogin', // 登录页面
    name: 'beforeLogin',
    component: BeforeLogin,
    meta: {
        title: '健康档案'
    }
}]
