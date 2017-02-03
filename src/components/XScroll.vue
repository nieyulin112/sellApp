<template>
<div class="pd-xs">
    <div class="xs-container">
        <div class="xs-content">
            <slot></slot>
        </div>
    </div>
</div>
</template>
<script>
import XScroll from 'vux-xscroll/build/cmd/xscroll'

let C = 0
export default {
    created () {
        this._id = ++C
        this.myid = `pd-xs-${this._id}`
        this.$nextTick(() => {
            this.$el.setAttribute('id', this.myid)
        })
    },
    updated () {
        this.reset()
    },
    beforeDestroy () {
        this._xs && this._xs.destroy()
        this._xs = null
    },
    methods: {
        reset () {
            if (this._xs) {
                this._xs.destroy()
            }
            this._xs = new XScroll({
                renderTo: '#' + this.myid,
                useOriginScroll: false,
                lockX: true,
                scrollbarY: true
            })
            this._xs.render()
        }
    }
}
</script>