<template>
<transition name="fade" mode="out-in">
    <router-view class="main-container"></router-view>  
</transition>
</template>
<script>
</script>
<style>
body > iframe {
    width: 0px;
    height: 0px;
    border: none;
}

.main-container {
    transition: all .3s ease;
    position: absolute;
    width: 100%;
    min-height: 100%;
}

.fade-enter, .fade-leave-active {
    opacity: 0;
}

.fade-enter {
    transform: translate(30px, 0);
}

.fade-leave-active {
    transform: translate(30px, 0);
}

</style>
