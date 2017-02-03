<template>
    <div class="case-body">
        <div class="item-list" v-for="items in data" >
            <div class="case-item" v-if="items.type === '用药'">
                <div class="inbox">
                    <div class="top-msg">
                        <span class="medication-icon"></span>
                        <span class="category">{{items.type}}</span>
                        <span class="det-time pull-right">{{items.startDate}}</span>
                    </div>
                    <div class="msg">
                        <div class="items m-t" v-for="item in items.detail">
                            <p class="d-name m-b-0">{{item.pspName}}</p>
                            <p class="m-t-0">
                                <span class="d-num" v-show="!!item.dosage">数量：{{item.dosage}}{{item.dosageName}}</span>
                                <span class="d-useMethod pull-right" v-show="!!item.frequency">用法：{{item.frequency}}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="case-item" v-else>
                <div class="inbox">
                    <div class="top-msg">
                        <span class="surgery-icon"></span>
                        <span class="category">{{items.type}}</span>
                        <span class="det-time pull-right">{{items.startDate}}</span>
                    </div>
                    <div class="msg" v-for="item in items.oper">
                        <p class="s-name">{{item.operName}}</p>
                        <span class="s-doc">手术医师：{{item.docName}}</span>
                        <span class="a-type pull-right" v-if="item.anesType">麻醉方式：{{item.anesType}}</span><br>
                        <span class="a-doc" v-if="item.anesDoc">麻醉医师：{{item.anesDoc}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Array
        }
    },
    name: 'case-drug'
}
</script>
<style lang="less">
.case-body {
    >.item-list {
        >.case-item {
            >.inbox {
                border-bottom: 2px solid #f5f5f5;
                >.top-msg {
                    height: 50px;
                    line-height: 50px;
                    >.medication-icon {
                        background: url('../../../../assets/images/icon-medication.png') no-repeat;
                        background-size: cover;
                        padding: 3px 9px 0 10px;
                        margin-right: 5px;
                    }
                    >.surgery-icon {
                        background: url('../../../../assets/images/icon-surgery.png') no-repeat;
                        background-size: cover;
                        padding: 2px 16px 0 0;
                        margin-right: 5px;
                    }
                    >.category {
                        font-size: 16px;
                        color: #454545;
                    }
                    >.det-time {
                        font-size: 14px;
                        color: #949a9f;
                    }
                }
                >.msg {
                    >.items {
                        .d-name {
                            font-size: 14px;
                            color: #454545;
                        }
                        .d-num {
                            font-size: 14px;
                            color: #949a9f;
                            line-height: 23px;
                        }
                        .d-useMethod {
                            font-size: 14px;
                            color: #949a9f;
                            line-height: 23px;
                        }
                    }
                    >.s-doc, .a-doc, .a-type {
                        font-size: 14px;
                        color: #949a9f;
                        line-height: 23px;
                    }
                    >.s-name {
                        font-size: 14px;
                        color: #454545;
                    }
                }
            }
        }
    }
    >.item-list:last-child {
        >.case-item {
            >.inbox {
                border-bottom: none;
            }
        }
    }

}
</style>
