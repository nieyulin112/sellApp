// import md5hex from 'md5hex'
import {isPrd} from './index'
import Vue from 'vue'

const tempCache = {}

function mockSign () {
    const ts = new Date().getTime()
    return {
        ts,
        appId: '201609181024457b0b272887cd4e6098b3ed31',
        sign: '' // md5hex(ts + '51b94fc5a6994c3da5a0b47971f59000')
    }
}

function getAppChannelInfo () {
    if (tempCache.channelInfo) {
        return tempCache.channelInfo
    }

    if (window.localStorage && window.localStorage.channelInfo) {
        tempCache.channelInfo = JSON.parse(window.localStorage.channelInfo)
        return tempCache.channelInfo
    }

    if (!isPrd()) {
        return mockSign()
    }
}

function parseAppChannelInfo (appId, ts, sign) {
    if (!appId) {
        return null
    }
    tempCache.channelInfo = {appId, ts, sign}
    window.localStorage.channelInfo = JSON.stringify(tempCache.channelInfo)
    return tempCache.channelInfo
}

function checkSignParams (to, next) {
    let info
    const winSearch = window.location.search
    if (to && to.query) {
        const {appId, timeStamp, appSign} = to.query
        info = parseAppChannelInfo(appId, timeStamp, appSign)
    }

    if (!info && winSearch) {
        const searchObj = {}
        winSearch.slice(1).split('&').forEach((d) => {
            const tmp = d.split('=')
            if (tmp && tmp.length === 2) {
                searchObj[tmp[0].trim()] = tmp[1].trim()
            }
        })
        info = parseAppChannelInfo(searchObj.appId, searchObj.timeStamp,
            searchObj.appSign)
    }

    if (!info) {
        info = getAppChannelInfo()
    }

    if (!info) {
        if (!isPrd()) {
            console.warn('非法跳转缺少渠道签名')
        }
        return false
    }

    return true
}

Vue.use((vue) => {
    vue.checkSignParams = checkSignParams
})

export {
    getAppChannelInfo,
    parseAppChannelInfo,
    checkSignParams
}
