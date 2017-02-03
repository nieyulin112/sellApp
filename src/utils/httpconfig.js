import VueResource from 'vue-resource'
import Vue from 'vue'
import {isPrd, isString} from './index'
import {Msg, Loading} from 'components'
import {getAppChannelInfo} from 'utils/channelInfoHandlers'
import {getToken, gotoLogin, closeWebView} from 'utils/appUtil'

Vue.use(VueResource)

let modelCode
function addToken (request) {
    const token = getToken()
    token && request.headers.set('token', token + '')
}

function addChannelSign (headers) {
    const appInfo = getAppChannelInfo()
    if (!appInfo) {
        return
    }
    appInfo.appId && headers.set('appId', appInfo.appId)
    appInfo.ts && headers.set('timeStamp', appInfo.ts + '')
    appInfo.sign && headers.set('appSign', appInfo.sign)
    headers.set('channelType', 'internal')
    if (!modelCode) {
        console.warn('modelCode is null')
    } else {
        headers.set('modelCode', modelCode)
    }
}

const TIMEOUT = 10000
function _timeout (req, next) {
    if (req.timeout === 0) {
        next()
        return
    }
    const timer = setTimeout(() => {
        req.abort()

        Loading.close()

        Msg.toast('请求超时')
    }, req.timeout || TIMEOUT)

    next((response) => {
        clearTimeout(timer)
    })
}
Vue.http.interceptors[1] = _timeout

const UNAUTH_CODES = ['400003', '400004', '400005', '400006']
export function checkAuthError (resultCode) {
    let isIn = false
    UNAUTH_CODES.forEach((d) => {
        if (d === resultCode) {
            isIn = true
        }
    })
    console.log('check token fail:', resultCode, isIn)
    return isIn
}
Vue.http.interceptors.push((request, next) => {
    request.headers.set('Content-Type', 'application/json;charset=utf-8')

    addToken(request)

    addChannelSign(request.headers)

    function errorAlert (response) {
        Loading.close()
        let msg
        if (response.body && response.body.msg) {
            msg = response.body.msg
        }
        Msg.error(msg)
    }

    function checkError (response) {
        if (response.status >= 500 && response.status < 600) {
            errorAlert(response)
        } else if (response.status === 200 && response.body && response.body.resultCode !== '000000') {
            if (isString(response.body)) {
                response.body = JSON.parse(response.body)
            }
            if (checkAuthError(response.body.resultCode)) {
                // 放弃自动处理, 业务层自行处理token异常
                if (request.autoLogin === false) {
                    response.ok = false
                    return
                }
                // 自动处理
                gotoLogin().then(() => {
                    closeWebView()
                }, () => {
                    closeWebView()
                })
                response.ok = false
            } else {
                errorAlert(response)
                response.ok = false
            }
        } else if (response.status === 404) {
            errorAlert({
                body: {
                    msg: '服务地址错误:404'
                }
            })
        }
    }

    next(checkError)
})

let URL_TABLES, mockCfg
function getURL (url, type = 'default') {
    if (typeof url === 'object') {
        const {mockUrl, mock} = url
        url = url.url
        if (mockCfg() === 'all' || (mockCfg() === 'private' && mock)) {
            return '/mock' + mockUrl
        }
    }
    return URL_TABLES[type] + url
}

Vue.use((vue) => {
    vue.getUrl = getURL
})

// mock = private (根据自有配置决定), all (强制所有mock), none (强制所有非mock)
export default function config (urlTable, mock = 'private') {
    URL_TABLES = urlTable()

    mockCfg = function () {
        if (isPrd()) {
            return 'none'
        } else {
            return mock
        }
    }
}

export function setModelCode (code) {
    modelCode = code
}
