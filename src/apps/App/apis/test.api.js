import Vue from 'vue'

export function getFamilyMembers () {
    return Vue.http.get(Vue.getUrl('echo.do'))
}