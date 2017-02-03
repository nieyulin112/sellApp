<template>
<transition name="pd-loading">
    <div class="pd-loading" v-show="show">
        <div class="pd-loading-wrapper">
            <img src="../assets/images/ajax-loader.gif">
            <span class="pd-loading-text" v-if="text">{{text}}</span>
        </div>
    </div>
</transition>
</template>
<style lang="less">
.pd-loading-enter, .pd-loading-leave-active {
    opacity: 0;
}

.pd-loading {
    transition: opacity 0.3s linear;
}

.pd-loading-wrapper {
    position: fixed;
    top: 40%;
    left: 50%;
    padding: 20px;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    text-align: center;
    background-color: rgba(0,0,0, 0.7);
    border-radius: 5px;
    line-height: 1;

    img {
        width: 36px;
    }

    .pd-loading-text {
        display: block;
        color: #fff;
    }
}
</style>
<script>
export default {
    props: {
        text: String
    },
    data () {
        return {
            show: false
        }
    }
}
</script>
