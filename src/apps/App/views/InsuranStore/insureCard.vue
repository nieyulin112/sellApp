<template lang="html">
  <li v-on:click="link">
      <div class="image">
          <img v-lazy.container="info.imageUrl" height="120" alt/>
      </div>
      <div class="card-first">
          <h3 class="product-name">{{info.productName}}</h3>
          <h4 class="supplier-name">{{info.supplierName}}</h4>
          <span class="min-price">
              <span class="unit">￥</span><span class="number">{{info.minPrice}}</span><span class="under">起</span>
          </span>
      </div>
      <div class="card-second">
          <span class="ad-word">{{info.adWord}}</span>
          <span class="applicable-age">{{info.applicableAge}}</span>
      </div>
  </li>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            required: true
        }
    },
    methods: {
        link () {
            this.$router.push({
                name: 'insDetail',
                params: {
                    productId: this.info.productId
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    li{
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #eaeaea;
        position: relative;
        margin-bottom: 10px;
        >div.image{
            width: 100%;
            height: 120px;
            >img{
                width: 100%;
            }
        }
        >div.card-first{
            width: 100%;
            padding: 0 20px;
            padding-top: 8px;
            h3{
                display: inline-block;
            }
            h4{
                display: inline-block;
            }
            .supplier-name{
                background: #3ebf8c;
                width: 70px;
                height: 24px;
                position: absolute;
                border-radius: 4px;
                top: 0;
                right: 0;
                font-size: 14px;
                color: #fff;
                text-align: center;
                line-height: 24px;
            }
            span.min-price{
                display: inline-block;
                float: right;
                color: red;
                position: relative;
                > .unit{
                    font-size: 20px;
                    color: #ff662a;
                    display: inline-block;
                }
                > .under{
                    font-size: 14px;
                    display: inline-block;
                }
                > .number{
                    font-size: 20px;
                    color: #ff662a;
                    line-height: 23px;
                    text-align: left;
                    display: inline-block;
                }
            }
        }
        >div.card-second{
            width: 100%;
            padding: 0 20px;
            color: #929292;
            overflow: hidden;
            margin-top: 5px;
            >.ad-word{
                display: block;
                float: left;
            }
            >.applicable-age{
                display: block;
                float: right;
            }
        }
    }
    image[lazy=loading]{
        width: 40px;
        height: 300px;
        margin: auto;
    }
</style>
