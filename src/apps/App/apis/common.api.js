import Vue from 'vue'

export function pv () {
    Vue.http.get(Vue.getUrl({
        url: '/api/uc/v1/thirdPart',
        mockUrl: '/common/pv.json',
        mock: true
    }))
}