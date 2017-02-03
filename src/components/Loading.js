import Vue from 'vue'
import LoadingView from './LoadingView'

const LoadingViewClass = Vue.extend(LoadingView)
let instance
let timer
export default {
    show (msg = '') {
        if (!instance) {
            instance = new LoadingViewClass({
                el: document.createElement('div')
            })
            document.body.appendChild(instance.$el)
        }
        if (timer) {
            clearTimeout(timer)
            timer = null
        }

        if (instance.show) {
            return
        }
        instance.text = msg
        Vue.nextTick(() => {
            instance.show = true
        })
    },
    close () {
        if (instance) {
            timer = setTimeout(() => {
                instance.show = false
            }, 500)
        }
    }
}
