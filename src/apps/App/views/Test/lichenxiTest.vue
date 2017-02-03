<template lang="html">
  <div id="app">
      <div v-init.a.b.c="times">
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
Vue.directive('init', {
    bind (el, binding, vnode) {
        const s = JSON.stringify
        el.innerHTML = 'name' + s(binding.name) + '<br/>' +
                        'value' + s(binding.value) + '<br/>' +
                        'expression' + s(binding.expression) + '<br/>' +
                        'arguments' + s(binding.arg) + '<br/>' +
                        'key' + Object.keys(vnode).join(',')
    }
})
export default {
    data () {
        return {
            times: 0
        }
    }
}
</script>
<style lang="less">
</style>
