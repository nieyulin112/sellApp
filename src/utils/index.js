export function isPrd () {
    return process.env.NODE_ENV === 'production'
}

// localStorage
export const ls = {
    put (key, value) {
        if (!key || !value) {
            return
        }
        window.localStorage[key] = JSON.stringify(value)
    },
    get (key) {
        if (!key) {
            return null
        }
        const vTemp = window.localStorage[key]
        if (!vTemp) {
            return null
        }
        return JSON.parse(window.localStorage[key])
    }
}

export const isArray = Array.isArray

export function isString (val) {
    return typeof val === 'string'
}

export function isBoolean (val) {
    return val === true || val === false
}

export function isFunction (val) {
    return typeof val === 'function'
}

export function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

export function isPlainObject (obj) {
    return isObject(obj) && Object.prototype.toString.call(obj) === '[object Object]'
}
