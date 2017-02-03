<template>
    <div class="hos-card-norecords-view">
        <!-- 没有就医记录 -->
        <div class="has-no-records-view text-center">
            <img src="../../../../assets/images/no_records@3x.png">
            <p class="lab text-muted">保养得实在太好了，找不到就医记录</p>
        </div>

        <!-- <div class="p-x return-btn">
            <mt-button size="large" type="primary" @touchstart.native="onReturn">返回</mt-button>
        </div> -->
    </div>
</template>
<script>
export default {
}
</script>
<style scoped lang="less">
.hos-card-norecords-view {
    position: absolute;
    top: 40px;
    bottom: 0px;
    width: 100%;
    z-index: 200;
    background-color: #f9f9f9;
}

  .has-no-records-view{
    margin-top: 120px;
    >.lab{
      font-size: 15px;
     }
    >img{
      height: 140px;
      width: 140px;
     }
  }

  .return-btn {
    position: fixed;
    bottom: 20px;
    width: 100%;
  }
</style>
