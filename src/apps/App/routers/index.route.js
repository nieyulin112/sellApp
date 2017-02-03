import IndexView from '../views/IndexView.vue'
export default [{
    path: '/',
    component: IndexView,
    beforeEnter: (to, from, next) => {
        // if (window.location.search) {
        //     const res = window.location.search.slice(1)
        //         .split('&')
        //         .map((kv) => {
        //             const kvs = kv.split('=')
        //             if (kvs && kvs.length === 2) {
        //                 return {key: kvs[0], value: kvs[1]}
        //             }
        //         })
        //         .filter((param) => {
        //             if (!param) {
        //                 return false
        //             }
        //             return param.key === 'to'
        //         })
        //     if (res && res.length) {
        //         next(res[0].value)
        //         return
        //     }
        // }
        // next('/insuranStore/myInsureOrders?appId=201609181024457b0b272887cd4e6098b3ed31')
        next()
    }
}]