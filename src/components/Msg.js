import {Toast, MessageBox} from 'mint-ui'

export default {
    success (msg = '操作成功') {
        Toast({
            duration: 1500,
            message: msg,
            iconClass: 'mintui mintui-success'
        })
    },
    toast (msg) {
        Toast({
            duration: 1500,
            message: msg
        })
    },
    alert (msg) {
        MessageBox.alert(msg)
    },
    confirm (msg, callback, title = '确认') {
        return MessageBox.confirm(msg, title, {
            callback (v) {
                if (callback) {
                    callback(v)
                }
            }
        })
    },
    error (msg = '系统繁忙，请稍后再试!') {
        MessageBox.alert(msg)
    }
}