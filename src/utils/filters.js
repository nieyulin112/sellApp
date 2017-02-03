import Vue from 'vue'

Vue.filter('pd-currency', (v, decimals) => {
    if (typeof v === 'string') {
        v = parseFloat(v)
    }
    decimals = decimals != null ? decimals : 2
    const tmp = Math.abs(v).toFixed(decimals)
    const _int = decimals ? tmp.slice(0, -1 - decimals) : tmp
    const headCount = _int.length % 3
    const head = headCount > 0 ? _int.slice(0, headCount) + (_int.length > 3 ? ',' : '') : ''
    let other = _int.slice(headCount).replace(/(\d{3})/g, '$1,')
    other = other.substring(0, other.length - 1)
    return (v < 0 ? '-' : '') + head + other + (decimals ? tmp.slice(-1 - decimals) : '')
})