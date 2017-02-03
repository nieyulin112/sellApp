import {Native} from './native'
import {ls} from './index'

// 检查登录是否已经
export function checkLogin () {
    const token = getToken()
    return !!token
}

const TOKEN_FIELD = 'SYSTEM_TOKEN'
export function getToken () {
    if (Native.isNative()) {
        return getTokenFromNative()
    } else {
        return getTokenFromLocal()
    }
}

// 从Native获取token, 并保存在本地
function getTokenFromNative () {
    const {loginInfo} = window.__webView_Info__
    if (loginInfo) {
        ls.put(TOKEN_FIELD, loginInfo.token)
        return loginInfo.token
    }
    return null
}

// 从本地获取token
function getTokenFromLocal () {
    return ls.get(TOKEN_FIELD)
}

export function closeWebView () {
    Native.callHandler('app_webview_finish')
}

export function setBarTitle (title = ' ') {
    window.document.title = title
    Native.callHandler('app_refresh_navbar', {
        center: {
            title
        }
    })
}

export function gotoLogin () {
    return Native.callHandler('app_show_loginView').then((loginInfo) => {
        window.__webView_Info__.loginInfo = loginInfo || {}
        if (!window.__webView_Info__.loginInfo.token) {
            return Promise.reject('login failed')
        }
        return loginInfo
    })
}
