import nativeMethods, {Observer, callbackTagName} from './bridgeNative'
const mocks = {
    'app_get_login_info': {
        token: '72ABB07D24FD1B03F2C44575E1AFB86F1B528B08349A3BA67B5097DF32031DCE4B182F57905D9F3783B97586D434D671E9160F359258BA17C2B0C237D1E08FE4'
    }
}

export const Native = {
    isNative () {
        return !!window.__webView_Info__
    },
    callHandler (tagname, params, options) {
        if (!tagname || !nativeMethods[tagname]) {
            console.log('数据不合法')
            return
        }
        // 非app环境
        if (!this.isNative()) {
            return new Promise((resolve, reject) => {
                resolve(mocks[tagname])
            })
        }
        // app环境下
        if (callbackTagName[tagname]) {
            return new Promise((resolve, reject) => {
                var instance = new Observer()
                // 设置超时时间
                var id = setTimeout(function () {
                    instance.subscribers[tagname].length = 0
                    reject(new Error('请求超时'))
                }, 30000)

                instance.sub(tagname, function (data) {
                    clearInterval(id)
                    if (!data) throw new Error('原生返回的数据不可用')
                    resolve(data)
                })

                nativeMethods[tagname](params)
            })
        } else {
            nativeMethods[tagname](params)
            return this
        }
    }
}
