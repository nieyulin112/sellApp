import Vue from 'vue'
export function getPromise (method, url, body, options) {
    if (method === 'get') {
        return Vue.http.get(url, body)
                .then(({body}) => {
                    if (body.resultCode === '000000') {
                        return body.result
                    } else {
                        throw new Error(body.msg)
                    }
                })
                .catch(({body}) => {
                    return body
                })
    } else if (method === 'post') {
        return Vue.http.post(url, body, options)
                .then(({body}) => {
                    if (body.resultCode === '000000') {
                        return body.result
                    } else {
                        throw new Error(body.msg)
                    }
                })
                .catch(({body}) => {
                    return body
                })
    }
}
