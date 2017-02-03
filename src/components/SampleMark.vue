<template>
<div class="sample-mark" :style="{top: top, left: left, right: right, bottom: bottom}">
</div>
</template>
<script>
export default {
    props: {
        top: String,
        left: String,
        right: String,
        bottom: String
    }
}
</script>
<style lang="less">
.sample-mark {
    width: 77px;
    height: 79px;

    position: absolute;

    background-image: url(../assets/images/sample_mark@3x.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
}
</style>