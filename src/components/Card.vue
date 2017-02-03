<template>
<div class="pd-card vux-1px-radius">
    <slot></slot>
</div>
</template>
<script>
export default {}
</script>
<style lang="less">
@import "../styles/vars.less";

.pd-card {
    padding: @gap;
}

// .pd-card:before {
//     display: block;
//     box-sizing: border-box;
//     content: '';
//     border: 1px solid @border-color;
//     width: 199.9999%;
//     height: 199.9999%;
//     position: absolute;
//     top: -50%;
//     left: -50%;
//     transform: scale(0.5, 0.5);
//     border-radius: 8px;
//     overflow: hidden;
// }
</style>
