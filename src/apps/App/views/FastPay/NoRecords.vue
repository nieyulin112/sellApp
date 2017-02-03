<template lang="html">
  <div class="records">
      <p class="image">
          <img src="../../../../assets/images/no_records@3x.png" alt="" width="200" height="200" />
      </p>
      <p class="content">
          当年无可理赔的就医记录
      </p>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less">
.records{
    p.image{
        width: 100%;
        // background: url(../../../../assets/images/no_records@3x.png) no-repeat center center;
        background-size: cover;
        img{
            display: block;
            margin: 0 auto;
            margin-top: 50px;
        }
    }
    p.content{
        text-align: center;
        font-size: 16px;
        color: #92989d;
    }
}
</style>
