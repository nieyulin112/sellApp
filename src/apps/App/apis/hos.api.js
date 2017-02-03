import Vue from 'vue'
import json from './sample_data.json'
// import caseJson from './case_data.json'

// 获取家庭成员信息列表
export function getFamilyMembers () {
    const url = Vue.getUrl({
        url: '/api/medical/v1/emr/document',
        mockUrl: '/HealthRecord/familyMembers.json',
        mock: true
    })
    return Vue.http.get(url)
}

// 获取就医记录报表数据
export function getHosTotalReport (isSample, id) {
    if (isSample) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({body: {result: json}})
            }, 1000)
        })
    } else {
        return Vue.http.get(Vue.getUrl({
            url: '/api/trment/getTrmentRecord',
            mockUrl: '/HealthRecord/trmentRecord.json',
            mock: true
        }), {
            params: {id}
        })
    }
}

// 账单图接口
export function getBillReport (id) {
    return Vue.http.get(Vue.getUrl('/api/trment/getTrmentBill'), {
        params: {
            id
        }
    })
}

// 就诊时间轴数据接口
export function getTimelineData (id, disDes) {
    return Vue.http.get(Vue.getUrl('/api/trment/getDiagnoseList'), {
        params: {
            id, disDes
        }
    })
}

// 获取病例详情的接口
export function getCaseListData (trmentId) {
    return Vue.http.get(Vue.getUrl('/api/trment/getDiagnoseDetail?trmentId=' + trmentId))
}
