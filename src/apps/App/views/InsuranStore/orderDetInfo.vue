<template>
    <div class="order-det-info">
        <div class="inbox"  v-if="state">
            <div class="title">
                <div class="pull-left">保单信息</div>
            </div>
        </div>
        <div class="wait" v-if="state">
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">保单名称</div>
                <div class="t-right text-right pull-right" v-if="data.projectName">{{data.productName}} - {{data.projectName}}</div>
                <div class="t-right text-right pull-right" v-else>{{data.productName}}</div>
            </div>
            <div class="cells clearfix cl-height">
                <div class="t-left text-left pull-left"></div>
                <div class="t-right text-right pull-right"><span class="a-href" @click="toProDetail()">查看产品详情</span></div>
            </div>
            <div class="cells clearfix p-b" v-for=" (p, index) in data.projectEnsureList " :class="{'pro': index != 0, '': index == 0}">
                <div class="t-left text-left pull-left b-no-l">
                    <p class="m-t-0">{{p.ensureName}}</p>
                    <p class="mp m-b" v-if="p.claimStatement">{{p.claimStatement}}</p>
                    <p class="mp">{{p.ensureStatement}}</p>
                </div>
                <div class="t-right text-right pull-right b-no-r">{{p.ensurePrice}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">单价</div>
                <div class="t-right text-right pull-right">￥{{data.unitPrice}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">购买份数</div>
                <div class="t-right text-right pull-right">{{data.count}}份</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">保障期限</div>
                <div class="t-right text-right pull-right">{{data.duration}}{{data.durationUnit}}</div>
            </div>
        </div>
        <div class="success" v-else>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left b-no-l">保单号：<span class="b-no">{{data.policyNo}}</span></div>
                <div class="t-right text-right pull-right b-no-r text-mm" :class="{'text-warning' : data.state == '保障中'}">{{data.state}}</div>
            </div>
            <div class="cells clearfix  cl-height">
                <div class="t-left text-left pull-left"></div>
                <div class="t-right text-right pull-right"><span class="a-href" @click="toEpage()">查看电子保单</span></div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">保单名称</div>
                <div class="t-right text-right pull-right">{{data.productName}} - {{data.projectName}}</div>
            </div>
            <div class="cells clearfix cl-height">
                <div class="t-left text-left pull-left"></div>
                <div class="t-right text-right pull-right"><span class="a-href" @click="toProDetail()">查看产品详情</span></div>
            </div>
            <div class="cells clearfix p-b" v-for=" (p, index) in data.projectEnsureList " :class="{'pro': index != 0, '': index == 0}">
                <div class="t-left text-left pull-left b-no-l">
                    <p class="m-t-0">{{p.ensureName}}</p>
                    <p class="mp m-b" v-if="p.claimStatement">{{p.claimStatement}}</p>
                    <p class="mp">{{p.ensureStatement}}</p>
                </div>
                <div class="t-right text-right pull-right b-no-r">{{p.ensurePrice}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">单价</div>
                <div class="t-right text-right pull-right">￥{{data.unitPrice}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">购买份数</div>
                <div class="t-right text-right pull-right">{{data.count}}份</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">观察期</div>
                <div class="t-right text-right pull-right">{{data.period}}{{data.periodUnit}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">生效日期</div>
                <div class="t-right text-right pull-right">{{data.effectiveDate}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">失效日期</div>
                <div class="t-right text-right pull-right">{{data.expDate}}</div>
            </div>
        </div>
        <div class="inbox">
            <div class="title">
                <div class="pull-left">投保人信息</div>
            </div>
        </div>
        <div class="confirm-info">
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">姓名</div>
                <div class="t-right text-right pull-right">{{data.holderName}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">证件类型</div>
                <div class="t-right text-right pull-right">{{data.holderCertType}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">证件号码</div>
                <div class="t-right text-right pull-right">{{data.holderCertNo}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">手机号码</div>
                <div class="t-right text-right pull-right">{{data.holderPhone}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">电子邮箱</div>
                <div class="t-right text-right pull-right">{{data.holderEmail}}</div>
            </div>
        </div>
        <div class="inbox">
            <div class="title">
                <div class="pull-left">被保人信息</div>
            </div>
        </div>
        <div class="confirm-info">
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">姓名</div>
                <div class="t-right text-right pull-right">{{data.insuredName}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">证件类型</div>
                <div class="t-right text-right pull-right">{{data.insuredCertType}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">证件号码</div>
                <div class="t-right text-right pull-right">{{data.insuredCertNo}}</div>
            </div>
            <div class="cells clearfix">
                <div class="t-left text-left pull-left">手机号码</div>
                <div class="t-right text-right pull-right">{{data.insuredPhone}}</div>
            </div>
            <div class="cells clearfix"  v-for="p in data.addtionalInsured" v-if="p.person">
                <div class="t-left text-left pull-left">扩展被保人</div>
                <div class="t-right pull-right"><span class="pull-left person">{{p.person}}</span><span class="pull-right">￥{{p.price}}</span></div>
            </div>
        </div>

    </div>
</template>
<style lang="less">
    @import "../../../../assets/iconfont/iconfont.css";

    .order-det-info {
        .text-mm {
            color: #959a9f;
        }
        .text-after {
            color: #666666 ;
        }
        .text-before {
            color: #999999 !important;
        }
        .mint-cell::before{
            border: 0;
        }
        .mint-cell::after{
            border: 0;
        }
        .b-b {
            border-bottom: 1px solid #eeeeee;
        }
        >.inbox {
            margin: 0 10px;
        }
        .title {
            font-size: 16px;
            height: 50px;
            line-height: 50px;
            color: #454545;
        }

        >.confirm-info, .success, .wait {
            background-color: #ffffff;
            >.cells {
                color: #666666;
                line-height: 45px;
                margin: 0 10px;

                >.t-left {
                    width: 30%;

                }
                >.t-right {
                    width: 70%;
                    >.person {
                        color: #666666;
                    }
                    .a-href {
                        color: #4b89dc;
                    }
                }
                >.b-no-l {
                    width: 75%;
                    .b-no {
                        font-size: 12px;
                    }
                    .mp {
                        font-size: 12px;
                        color: #959a9f;
                        line-height: 1;
                    }
                }
                >.b-no-r {
                    width: 25%;
                }
            }
            .pro {
                border-top: 1px solid #eeeeee;
            }
            .cl-height {
                line-height: 30px;
            }
        }
    }
</style>
<script>
export default {
    props: {
        data: Object,
        state: Boolean
    },
    components: {
    },
    methods: {
        toProDetail () {
            this.$emit('toProDetail')
        },
        toEpage () {
            this.$emit('toEpage')
        }

    },
    watch: {}
}
</script>
