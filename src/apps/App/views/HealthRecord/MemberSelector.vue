<template>
<div class="mem-selector">
    <div class="f-w text-center p-y">
        <a class="pull-down-btn" @click="popupShow">{{selected.name}} <span class="icon-arrowdown iconfont"></span></a>
    </div>

    <popup v-model="popShow" position="bottom" class="members-list p-y">
        <ul class="bg-white">
            <li v-for="(user, $index) in members" @click="changeMember(user)" :class="{'vux-1px-b':$index!==members.length-1}">{{user.name}}</li>
        </ul>
    </popup>
</div>
</template>
<script>
import {popup} from 'mint-ui'
export default {
    components: {
        popup
    },
    props: {
        isSample: Boolean,
        members: Array,
        selected: Object
    },
    data () {
        return {
            popShow: false
        }
    },
    methods: {
        popupShow () {
            if (this.isSample) {
                return
            }
            this.popShow = true
        },
        changeMember (member) {
            this.popShow = false
            this.$emit('selected-changed', member)
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../../../styles/vars.less';

.pull-down-btn {
    color: #636f7f;
    .iconfont {
        font-size: 12px;
    }
}
.members-list {
    width: 100%;

    ul {
        text-align: center;
        font-size: 16px;
        padding-left: @gap;
        padding-right: @gap;

        li {
            padding: @gap 0px;
            margin-bottom: 1px;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>