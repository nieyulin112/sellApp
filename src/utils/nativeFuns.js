const WebViewJavascriptBridge = window.WebViewJavascriptBridge

const mocks = {
    test (params, cb) {
        window.alert('call:[test]')
        cb(params)
    },
    getToken (cb) {
        cb(window.localStorage['SYSTEM_TOKEN'])
    },
    goToLogin (cb) {
        window.alert('去登录')
    }
}

function mockCall (name, params, cb) {
    if (mocks[name]) {
        if (params) {
            mocks[name].call(this, params, cb)
        } else {
            mocks[name].call(this, cb)
        }
    } else {
        cb({name, params})
    }
}

const Native = {
    isNative: !!WebViewJavascriptBridge,
    callHandler (name, params, scope) {
        scope = scope || this
        const callFn = (WebViewJavascriptBridge && WebViewJavascriptBridge.callHandler) || mockCall
        return new Promise((resolve, reject) => {
            callFn.call(scope, name, params, (result) => {
                resolve(result)
            })
        })
    }
}

function mapFunctions (fnsMap = {}) {
    const res = {}
    Object.keys(fnsMap).forEach((key) => {
        res[key] = (...args) => {
            args = [
                fnsMap[key],
                ...args
            ]
            return Native.callHandler.apply(this, args)
        }
    })
    return res
}

export {
    Native,
    mapFunctions
}