<template>
<card class="bg-white">
    <div slot class="grid-row">
        <p class="m-t m-b-0">
            <img src="../../../../assets/images/health_card_logo@3x.png">上海市基本医疗保险
            <span class="pull-right" style="color:#85b7f9;">点击查看</span>
        </p>
        <div class="grid-6"> 
            <h3>{{title}}</h3>
            <dl class="records-list">
                <dt>姓名 </dt>
                <dd>{{data.name}}</dd>

                <dt>性别 </dt>
                <dd>{{data.gender==='F'?'女':'男'}}</dd>

                <dt>年龄 </dt>
                <dd>{{data.age}}</dd>
            </dl>
        </div>
        <div class="grid-6">
            <slot></slot>
        </div>

        <sample-mark top="20px" right="0px" v-if="isSample"></sample-mark>
    </div>
</card>
</template>
<script>
import {Card, SampleMark} from 'components/index'
export default {
    components: {Card, SampleMark},
    props: {
        data: Object,
        title: String,
        isSample: Boolean
    }
}
</script>
<style scoped lang="less">
.records-list {
    line-height: 1.8;
    dl {
        padding-top: 0px;
        padding-bottom: 0px;
    }
    dt {
       float: left;
       width: 50px; 
    }
    dd {
        margin-left: 50px;
    }
}
.pd-card {
    h3 {
        margin-top: 12px;
        margin-bottom: 8px;
        font-size: 18px;
        font-weight: normal;
    }
    
    .grid-row > p {
        line-height: 20px;
        color: #2f318f;
        > img {
            width: 20px;
            height: 20px;
            display: inline-block;
            float: left;
        }
    }

    .records-list {
        margin: 0px;
        dt {
            color: #999;
        }
    }
}
</style>