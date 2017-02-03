<template>
    <div class="insured-info">
        <div class="inbox">
            <div class="title" :class="{ 'b-b' : !showInputInfo }">
                <div class="pull-left">{{title}}</div>
                <div class="pull-right text-right"  v-if="isShowBt" @click="showData()">
                    <span class="pull-right cc m-l">同投保人</span>
                    <div class="pull-right inputcheck" :class="{'inputcheck-box' : showInputInfo}">
                    </div>
                </div>
            </div>
        </div>
        <div class="input-info bg-white" v-show="showInputInfo" @input.stop="onInput">
            <mt-field class="fff i-input"
                label="姓名"
                placeholder="请输入"
                :attr="{ maxlength: 10 }"
                v-model="value.iname"
                :state="state.name">
                <div class="ccc" v-show="state.name">姓名不能为空或填写错误</div>

            </mt-field>
            <div class="cells select-box bg-white clearfix">
                <div class="s-left text-left pull-left m-l">证件类型</div>

                <div class="s-right text-right pull-right" >
                    <span class="mint-field-state is-error pull-right m-r" v-show="state.cardType">
                        <i class="mintui mintui-field-error"></i>
                    </span>
                    <span class="se fff">
                        <select   v-model="value.icardType" class="text-after" dir="rtl">
                            <option value="0" dir="">请选择</option>
                            <option value="01">居民身份证</option>
                            <!--<option value="02">军官证</option>-->
                            <!--<option value="03">护照</option>-->
                            <!--<option value="04">户名户口簿</option>-->
                            <!--<option value="05">士兵证</option>-->
                            <!--<option value="06">学生证</option>-->
                            <!--<option value="07">驾驶证</option>-->
                            <!--<option value="08">军官退休证</option>-->
                            <!--<option value="09">外国人居留证</option>-->
                            <!--<option value="10">警官证</option>-->
                            <!--<option value="11">其他</option>-->
                        </select>
                        <div class="down-icon"></div>
                        <div class="ccf" v-show="state.cardType">证件类型不能为空</div>
                    </span>

                </div>
            </div>
            <mt-field style="clear:both;"
                label="证件号码"
                placeholder="请输入"
                :attr="{ maxlength: 18 }"
                v-model="value.icardid"
                :state="state.cardId">
                <div class="ccc" v-show="state.cardId">证件号码不能为空或填写错误</div>
            </mt-field>
            <mt-field
                type="tel"
                label="手机号码"
                placeholder="请输入"
                :attr="{ maxlength: 11 }"
                v-model="value.iphonenum"
                :state="state.phoneNum">
                <div class="ccc" v-show="state.phoneNum">手机号码不能为空或填写错误</div>
            </mt-field>
            <mt-field
                type="mail"
                label="电子邮箱"
                placeholder="请输入"
                v-show="showEmail"
                v-model="value.iemail"
                :state="state.eMail">
                <div class="ccc" v-show="state.eMail">电子邮箱不能为空或填写错误</div>
            </mt-field>
            <div class="cells select-box bg-white" v-if="showRel">
                <div class="s-left text-left pull-left m-l">与投保人关系</div>

                <div class="s-right text-right pull-right">
                    <span class="mint-field-state is-error pull-right m-r" v-show="state.inrelation">
                        <i class="mintui mintui-field-error"></i>
                    </span>
                    <span class="se">
                        <select  v-model="value.iRel" class="text-after" dir="rtl">
                            <option :value="relationList.value" v-for="relationList in relaData">{{relationList.name}}</option>
                        </select>
                        <div class="down-icon"></div>
                        <div class=" ccf" v-show="state.inrelation">与投保人关系不能为空</div>
                    </span>
                </div>
            </div>
        </div>
        <div class="confirm-info" v-if="showConfirmInfo">
            <div class="cells">
                <div class="t-left text-left pull-left">姓名</div>
                <div class="t-right text-right pull-right">{{data.name}}</div>
            </div>
            <div class="cells" v-if="showCardType">
                <div class="t-left text-left pull-left">证件类型</div>
                <div class="t-right text-right pull-right">{{data.cardType}}</div>
            </div>
            <div class="cells">
                <div class="t-left text-left pull-left">证件号码</div>
                <div class="t-right text-right pull-right">{{data.cardId}}</div>
            </div>
            <div class="cells">
                <div class="t-left text-left pull-left">手机号码</div>
                <div class="t-right text-right pull-right">{{data.phoneNum}}</div>
            </div>
            <div class="cells" v-if="showEmail">
                <div class="t-left text-left pull-left">电子邮箱</div>
                <div class="t-right text-right pull-right">{{data.email}}</div>
            </div>
            <div class="cells" v-if="showRelationship">
                <div class="t-left text-left pull-left">与投保人关系</div>
                <div class="t-right text-right pull-right">{{relationship}}</div>
            </div>
        </div>

    </div>
</template>
<style lang="less">
    @import "../../../../assets/iconfont/iconfont.css";

    .insured-info {
        .mint-field-other , .fff{
            position: relative;
        }
        .mint-field-clear {
            margin-top: 5px;
        }
        .is-error {
            color: #ff5757;
            >.mintui-field-error:before {
                font-family:"iconfont" !important;
                font-size:22px;
                font-style:normal;
                -webkit-font-smoothing: antialiased;
                -webkit-text-stroke-width: 0.2px;
                -moz-osx-font-smoothing: grayscale;
                content: "\e809";
            }
        }
        .ccc {
            font-size: 12px;
            height: 18px;
            width: 190px;
            background: #ffe7e7;
            margin-top: 40px;
            border: 1px solid #ffd5d5;
            border-radius: 5px;
            color: #ff5757;
            text-align: center;
            padding: 0 10px;
            line-height: 18px;
            position: absolute;
            top: -18px !important;
            right: 27px !important;
            z-index: 99;
        }
        .ccc::before {
            display: inline-block;
            width: 0;
            height: 0;
            border: solid transparent;
            border-width: 8px;
            border-bottom-color: #ffd5d5;
            content: '';
            position: absolute;
            top: -16px;
            right: 14px;
        }
        .ccc::after {
            display: inline-block;
            width: 0;
            height: 0;
            border: solid transparent;
            border-width: 7px;
            border-bottom-color: #ffe7e7;
            content: '';
            position: absolute;
            top: -14px;
            right: 15px;
        }
        .ccf {
            font-size: 12px;
            height: 18px;
            width: 150px;
            background: #ffe7e7;
            margin-top: 30px;
            border: 1px solid #ffd5d5;
            border-radius: 5px;
            color: #ff5757;
            text-align: center;
            padding: 0 10px;
            line-height: 18px;
            position: absolute;
            right: -5px;
            top: -9px;
            z-index: 99;
        }
        .ccf::before {
            display: inline-block;
            width: 0;
            height: 0;
            border: solid transparent;
            border-width: 8px;
            border-bottom-color: #ffd5d5;
            content: '';
            position: absolute;
            top: -16px;
            right: 14px;
        }
        .ccf::after {
            display: inline-block;
            width: 0;
            height: 0;
            border: solid transparent;
            border-width: 7px;
            border-bottom-color: #ffe7e7;
            content: '';
            position: absolute;
            top: -14px;
            right: 15px;
        }
        .mint-field-state {
            margin-left: 10px;
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
            .cc {
                font-size: 14px;
            }
            .inputcheck {
                background: url(../../../../assets/images/icon-checked.png);
                border: 1px solid #4E8BD9;
                border-radius: 3px;
                height: 17px;
                width: 17px;
                margin-top: 17px;
            }
            .inputcheck-box {
                background-image: none;
                background-size: cover;
                border: 1px solid #cccccc;

            }

        }
        >.input-info {
            .mint-cell {
                width: 100%;
                overflow: initial;
                .mint-cell-wrapper {
                    overflow: initial;
                }
            }
            .i-input {

                .mint-cell::before{
                    border: 0;
                }
                .mint-cell::after{
                    border: 0;
                }
            }
            .mint-cell-title {
                width: 28%;
                padding-right: 5px;
                font-size: 14px;
            }
            .mint-cell-value {
                margin-left: 10px;
                width: 72%;
                >input {
                    text-align: right;
                    font-size: 14px;
                    color: #666666;
                    width: 100%;
                }
            }
            .mint-cell-value {
                display: -webkit-flex;
            }
            .select-box {
                height: 45px;
                line-height: 45px;
                >.s-left {}
                >.s-right {
                    font-size: 14px;
                    width: 65%;
                    color: #666666 !important;
                    .se {
                        position: relative;
                        select{
                            font-size: 14px;
                            outline:none;
                            -webkit-appearance: none;
                            border: none;
                            background: #fff;
                            margin-right: 20px;
                            width: 70%;
                            option {
                                text-align: center;
                            }
                        }
                        .down-icon {
                            width: 10px;
                            height: 5px;
                            position: absolute;
                            right: 7px;
                            top: 6px;
                            background: url('../../../../assets/images/icon-down.png');
                            background-size: cover;
                        }
                    }

                }
            }
        }
        >.confirm-info {
            background-color: #ffffff;
            >.cells {
                color: #666666;
                height: 45px;
                line-height: 45px;
                margin: 0 10px;
                >.t-left {
                    width: 35%;
                }
                >.t-right {
                    width: 65%;
                    color: #999999;
                }
            }
        }
    }
</style>
<script>
import {field} from 'mint-ui'

export default {
    data () {
        return {
            relaData: [{
                value: '0',
                name: '请选择'
            }, {
                value: '01',
                name: '本人'
            }, {
                value: '02',
                name: '父女'
            }, {
                value: '03',
                name: '母女'
            }, {
                value: '04',
                name: '母子'
            }, {
                value: '05',
                name: '父子'
            }, {
                value: '06',
                name: '孙子女'
            }, {
                value: '07',
                name: '祖父母'
            }, {
                value: '08',
                name: '未知'
            }, {
                value: '09',
                name: '租赁'
            }, {
                value: '10',
                name: '配偶'
            }, {
                value: '11',
                name: '丈夫'
            }, {
                value: '12',
                name: '妻子'
            }, {
                value: '13',
                name: '雇佣'
            }, {
                value: '14',
                name: '夫妻'
            }, {
                value: '15',
                name: '朋友'
            }, {
                value: '16',
                name: '婆媳'
            }, {
                value: '17',
                name: '祖孙'
            }, {
                value: '18',
                name: '法定'
            }, {
                value: '19',
                name: '指定多人'
            }, {
                value: '20',
                name: '儿子'
            }, {
                value: '30',
                name: '女儿'
            }, {
                value: '40',
                name: '子女'
            }, {
                value: '50',
                name: '父母'
            }, {
                value: '51',
                name: '父亲'
            }, {
                value: '52',
                name: '母亲'
            }, {
                value: '53',
                name: '继父'
            }, {
                value: '54',
                name: '继母'
            }, {
                value: '55',
                name: '叔伯'
            }, {
                value: '56',
                name: '阿姨'
            }, {
                value: '57',
                name: '兄弟'
            }, {
                value: '58',
                name: '姐妹'
            }, {
                value: '59',
                name: '外公'
            }, {
                value: '60',
                name: '亲属'
            }, {
                value: '61',
                name: '兄弟'
            }, {
                value: '62',
                name: '奶奶'
            }, {
                value: '67',
                name: '姐妹'
            }, {
                value: '80',
                name: '单位'
            }, {
                value: '81',
                name: '雇员'
            }, {
                value: '82',
                name: '雇主'
            }, {
                value: '99',
                name: '其他'
            }]
        }
    },
    props: {
        title: String,      // 抬头
        isShowBt: {
            type: Boolean,
            default: false
        },
        isChecked: {    // 选择框的值
            type: Boolean,
            default: false
        },
        showInputInfo: {    // 是否显示输入框
            type: Boolean,
            default: false
        },
        showConfirmInfo: {  // 是否显示确认信息
            type: Boolean,
            default: false
        },
        showEmail: {        // 是否显示邮箱信息
            type: Boolean,
            default: false
        },
        showCardType: {     // 是否显示证件类型
            type: Boolean,
            default: true
        },
        showRel: {         // 是否显示选择关系
            ype: Boolean,
            default: false
        },
        showRelationship: { // 是否显示与投保人关系
            type: Boolean,
            default: false
        },
        data: {             // 绑定的数据（必须）
            require: false,
            type: Object
        },
        value: {            // 绑定的传向父组件的数据
            require: false,
            type: Object
        },
        relationship: {     // 与投保人关系 字段
            type: String
        },
        state: {            // 当前的输入状态
            type: Object,
            required: true
        }
    },
    components: {
        field
    },
    methods: {
        showData () {
            this.$emit('showData')
        },
        onInput () {
            this.$emit('input', this.value)
        }
    },
    watch: {}
}
</script>
