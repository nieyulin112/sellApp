export function Observer () {
    if (typeof Observer.instance === 'object') {
        return Observer.instance
    }
    this.subscribers = []
    Observer.instance = this
}

Observer.prototype = {
    constructor: Observer,
    sub (evt, fn) {
        // 订阅方法，并返回订阅标示符
        if (this.subscribers[evt]) {
            // this.subscribers[evt].push(fn) 兼容单页面应用，永远只会注册一个事件
            this.subscribers[evt][0] = fn
        } else {
            this.subscribers[evt] = []
            // this.subscribers[evt].push(fn) 兼容单页面应用，永远只会注册一个事件
            this.subscribers[evt][0] = fn
        }
        return '{"event":"' + evt + '","fn":"' + (this.subscribers[evt].length - 1) + '"}'
    },
    // 发布方法，返回自生
    pub (evt, args) {
        if (this.subscribers[evt]) {
            this.subscribers[evt].forEach((callback) => {
                if (typeof callback === 'function') {
                    callback(args)
                }
            })
            return this
        }
        return false
    },

    // 解除订阅
    unsub (eventId) {
        if (!eventId) {
            this.subscribers = []
        }
        try {
            var id = JSON.parse(eventId)
            this.subscribers[id.event][id.fn] = null
        } catch (error) {
            console.log(error)
        }
    }
}

function bridgeCallback (param) {
    var jsonObj = JSON.parse(param)
    if (jsonObj !== null) {
        Observer.instance && Observer.instance.pub(jsonObj.tagname, jsonObj.param)
        return true
    }
    return false
}
window.hybrid = {}
window.hybrid.bridgeCallback = bridgeCallback

var __HC_JS_PARAM = '?jsparam='
var __HC_URL_PLUGIN = 'healthmedical://hybrid/'
var isReadPlatformInfo = false

function readPlatformInfo () {
    if (isReadPlatformInfo) {
        return
    }
    isReadPlatformInfo = true
    var ua = navigator.userAgent
    if (ua.indexOf('iPhone OS') > 0) {
        Internal.isIOS = true
    } else if (ua.indexOf('Android') > 0) {
        Internal.isAndroid = true
    } else {
        Internal.hello = true
    }
}

var URL = {
    navigation: 'navigation',
    alert: 'alert',
    loading: 'loading',
    webviewex: 'webviewex',
    share: 'share',
    user: 'user',
    util: 'util',
    system: 'system',
    gallery: 'gallery',
    pay: 'pay'
}

var Internal = {
    makeParamString (tagname, params) {
        var paramObject = {}
        paramObject.tagname = tagname
        if (params) {
            paramObject.param = params
        }
        return JSON.stringify(paramObject)
    },
    makeURLWithParam (paramsString, type) {
        return __HC_URL_PLUGIN + type + __HC_JS_PARAM + paramsString
    },
    loadURL (url) {
        var iframeEle = document.createElement('iframe')
        var cont = document.body || document.documentElement
        iframeEle.onload = iframeEle.onreadystatechange = this.iframeload
        iframeEle.style.dispaly = 'none'
        iframeEle.src = url
        cont.appendChild(iframeEle)
    },
    iframeload () {
        if (!this.readyState || this.readyState === 'complete') {
            this.outerHTML = ''
        }
    }
}

readPlatformInfo()

// 分享的方法
var PinganShare = {
    app_share (title, platform, content, image, weburl, type) {
        var tagname = 'app_share'
        var params = {
            title: title,
            platform: platform,
            content: content,
            image: image,
            weburl: weburl,
            type: type
        }
        var paramsString = Internal.makeParamString(tagname, params)
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramsString, URL.share)
            Internal.loadURL(url)
        } else if (Internal.isAndroid) {
            window.share.appShare(paramsString)
        }
    }
}

var PinganUser = {
    // 读取用户信息
    app_get_login_info (username) {
        var tagname = 'app_get_login_info'
        var params = {
            username
        }
        var paramsString = Internal.makeParamString(tagname, params)

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramsString, URL.user)
            Internal.loadURL(url)
        } else if (Internal.isAndroid) {
            window.user.appGetLoginInfo(paramsString)
        }
    }
}

var PinganNavBar = {
    app_refresh_navbar ({right = {}, center = {}, left = {}}) {
        var tagname = 'app_refresh_navbar'
        var params = {
            right: right,
            center: center,
            left: left
        }

        var paramsString = Internal.makeParamString(tagname, params)
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramsString, URL.navigation)
            Internal.loadURL(url)
        } else if (Internal.isAndroid) {
            window.navigation.appRefreshNavbar(paramsString)
        }
    },
    app_webview_finish () {
        var params = {}
        var tagname = 'app_webview_finish'
        var paramsString = Internal.makeParamString(tagname, params)
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramsString, URL.navigation)
            Internal.loadURL(url)
        } else if (Internal.isAndroid) {
            window.navigation.appWebviewFinish()
        }
    }
}

var PinganPage = {
    app_show_loginView () {
        var tagname = 'app_show_loginView'
        var params = {}

        var paramsString = Internal.makeParamString(tagname, params)
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramsString, URL.webviewex)
            Internal.loadURL(url)
        } else if (Internal.isAndroid) {
            window.webviewex.appShowLoginView(paramsString)
        }
    },
    app_show_relogin_alert () {
        var tagname = 'app_show_relogin_alert'
        var paramsString = Internal.makeParamString(tagname)
        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramsString, URL.alert)
            Internal.loadURL(url)
        } else if (Internal.isAndroid) {
            window.hcalert.appShowReLoginAlert(paramsString)
        }
    }
}

var PinganSystem = {
    app_make_call (phoneNumber) {
        var tagname = 'app_make_call'
        var params = {
            phoneNumber: phoneNumber
        }
        var paramsString = Internal.makeParamString(tagname, params)

        if (Internal.isIOS) {
            var url = Internal.makeURLWithParam(paramsString, URL.system)
            Internal.loadURL(url)
        } else if (Internal.isAndroid) {
            window.system.appMakeCall(paramsString)
        }
    }
}

export const callbackTagName = {
    'app_get_device_info': true,
    'app_get_location': true,
    'app_get_login_info': true,
    'app_md5_hash': true,
    'app_base64_encode': true,
    'app_base64_decode': true,
    'app_check_install_status': true,
    'app_take_phone': true,
    'app_photo_album': true,
    // 二维码扫描
    'app_scan': true,
    'app_pay': true,
    'app_show_loginView': true
}

export default {
    ...PinganShare,
    ...PinganUser,
    ...PinganNavBar,
    ...PinganPage,
    ...PinganSystem
}
