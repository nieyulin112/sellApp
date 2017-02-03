import Vue from 'vue'

export function addMember (name, cno) {
    return Vue.http.post(Vue.getUrl('/api/medical/v1/emr/document'), {
        name: name,
        certiNo: cno
    })
}
// 删除联系人
export function deleteMember (docID) {
    return Vue.http.post(Vue.getUrl('/api/medical/v1/emr/document/' + docID))
}
// 查询是否有电子病历
export function isExistRecord (id) {
    let url = Vue.getUrl({
        url: '/api/trment/isExistRecord?id=' + id,
        mockUrl: '/family/record.json',
        mock: true
    })
    return Vue.http.get(url)
}