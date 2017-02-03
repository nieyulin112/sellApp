<template>
    <div class="fast-pay-index-view">
        <mt-cell title="一键授权光速赔, 医疗理赔好便捷" class="ft">
            <span class="text-right" @click="historyPay">
                <a href="javascript:void(0);">历史记录</a>
            </span>
        </mt-cell>
        <mt-cell title="就诊时间">
            <span @click="open('picker0')" class="date text-right">
                <span>{{startDay}}</span><i class="iconfont icon-arrowdown"></i>
            </span>
                <span style="margin-left:2px;">至</span>
            <span @click="open('picker1')" class="date text-right">
                <span>{{endDay}}</span>
                <i class="iconfont icon-arrowdown"></i>
            </span>
        </mt-cell>
        <mt-cell title="就诊医院">
            <span @click="selectHos">
                <span class="hosp-name text-right">{{hospitalName}}</span>
                <span v-show="selectFlag">请选择</span><i class="iconfont icon-arrowdown"></i>
            </span>
        </mt-cell>
        <mt-datetime-picker
            ref="picker0"
            type="date"
            v-model="startDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="startChange">
        </mt-datetime-picker>
        <mt-datetime-picker
            ref="picker1"
            type="date"
            v-model="endDate"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="endChange">
        </mt-datetime-picker>
        <div class="p-x p-y-2 agree">
            <div class="checked" @click="selected">
                <input type="checkbox" :checked='isChecked'>
            </div>
            <div class="agree-sign">
                <span>同意</span>
                <a href="javascript:void(0)" @click="skipRoute">医疗信息收集及使用条款</a>
            </div>
        </div>
        <div class="btn-save p-x">
            <mt-button type="primary" size="large" @click.native="queryClaim" :disabled="!isChecked">
                申请医疗理赔
            </mt-button>
        </div>
        <!-- <div class="fast-words text-center">
            一键授权光速赔, 医疗理赔好便捷
        </div> -->
        <mt-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
            <div class="page-picker-wrapper">
                <mt-picker :slots="dataSlots" @change="onHosChange" :visible-item-count="5"></mt-picker>
            </div>
        </mt-popup>
    </div>
</template>

<script>
import {datetimePicker, cell, picker, popup, button, toast} from 'mint-ui'
import {getHospitals, httpGetPayDet} from '../../apis/fast.api.js'
import {Loading} from 'components'
let now = new Date()
let month = (now.getMonth() + 1) >= 10 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)
let day = now.getDate() > 10 ? now.getDate() : '0' + day
let nowDate = now.getFullYear() + '.' + month + '.' + day

let start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
let month1 = (start.getMonth() + 1) >= 10 ? (start.getMonth() + 1) : '0' + (start.getMonth() + 1)
let day1 = start.getDate() > 10 ? start.getDate() : '0' + day1
let start1Date = start.getFullYear() + '.' + month1 + '.' + day1
let o = Array.prototype
o.remove = function (obj) {
    const index = this.indexOf(obj)
    if (index === -1) {
        return
    }
    this.splice(index, 1)
}
export default{
    components: {
        datetimePicker,
        cell,
        picker,
        popup,
        mtButton: button
    },
    data () {
        return {
            startDay: start1Date,
            endDay: nowDate,
            startDate: start1Date,
            endDate: nowDate,
            isChecked: true,
            popupVisible: false,
            selectFlag: true,
            dataSlots: [
                {
                    flex: 1,
                    values: [''],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ],
            hospitals: [],
            hospitalName: null,
            hospNum: '',
            info: {},
            pageNum: 1,
            applyPaySign: '0'
        }
    },
    methods: {
        historyPay () {
            this.$router.push({name: 'fastPayHistory'})
        },
        skipRoute () {
            this.$router.push({name: 'medicalCollection'})
        },
        open (picker) {
            this.$refs[picker].open()
        },
        // 选择时间的数理
        startChange (value) {
            let sM = (new Date(value).getMonth() + 1) >= 10 ? (new Date(value).getMonth() + 1) : '0' + (new Date(value).getMonth() + 1)
            let sD = new Date(value).getDate() > 10 ? new Date(value).getDate() : '0' + new Date(value).getDate()
            this.startDay = new Date(value).getFullYear() + '.' + sM + '.' + sD
        },
        endChange (value) {
            let sM = (new Date(value).getMonth() + 1) >= 10 ? (new Date(value).getMonth() + 1) : '0' + (new Date(value).getMonth() + 1)
            let sD = new Date(value).getDate() >= 10 ? new Date(value).getDate() : '0' + new Date(value).getDate()
            this.endDay = new Date(value).getFullYear() + '.' + sM + '.' + sD
        },
        selected () {
            this.isChecked = !this.isChecked
        },
        onHosChange (picker, values, index) {
            this.hospitalName = values[0]
            if (this.hospitalName) {
                this.selectFlag = false
            } else {
                this.selectFlag = true
            }
            this.hospNum = this.hospitals[this.hospitalName]
        },
        selectHos () {
            this.popupVisible = true
        },
        queryClaim () {
            let params = {
                beginDate: this.startDay.replace(/\./g, '-'),
                endDate: this.endDay.replace(/\./g, '-'),
                hospNum: this.hospNum,
                applyPaySign: this.applyPaySign,
                pageNum: this.pageNum
            }
            this.info = {
                startDay: this.startDay.replace(/\./g, '-'),
                endDay: this.endDay.replace(/\./g, '-'),
                hospNum: this.hospNum
            }
            this.$store.commit('setFastPay', this.info)
            if (new Date(params.beginDate) > new Date(params.endDate)) {
                toast({
                    title: '提示',
                    message: '开始时间大于结束时间',
                    position: 'center',
                    duration: 1000
                })
            } else {
                if (!this.isChecked) {
                    toast({
                        title: '提示',
                        message: '请选择同意使用条款',
                        position: 'center',
                        duration: 1000
                    })
                } else {
                    if (!this.hospitalName) {
                        toast({
                            title: '提示',
                            message: '请选择就诊医院',
                            position: 'center',
                            duration: 1000
                        })
                    } else {
                        Loading.show()
                        httpGetPayDet(params).then(({body: {result}}) => {
                            if (result.claimRecords.pageResult.length > 0) {
                                this.$router.push({name: 'authorizationClaims'})
                            } else {
                                this.$router.push({name: 'noRecords'})
                            }
                            Loading.close()
                        }).catch(() => {
                            Loading.close()
                        })
                    }
                }
            }
        }
    },
    mounted () {
        Loading.show()
        getHospitals().then(({body: {result}}) => {
            result.pageResult.forEach(value => {
                this.hospitals[value.hospName] = value.hospNum
                this.dataSlots[0].values.push(value.hospName)
            })
            this.dataSlots[0].values.remove(this.dataSlots[0].values)
            Loading.close()
        })
    }
}
</script>
<style lang="less">
    .fast-pay-index-view {
        height:100%;
        .ft {
            height:50px;
            background: #f8f8f8;
            color:#454545;
            .mint-cell-title{
                font-size:14px;
                color:#999999
            }
            .mint-cell-value {
                font-size:14px;
                color:#4B89DC;
            }
        }
        .hosp-name {
            display: inline-block;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            width: 160px;
        }
        .icon-arrowdown {
            margin-left:4px;
        }
        .date {
            display: inline-block;
            width:100px;
            font-size: 14px;
            span{
                color:#454545;
            }
        }
        .agree {
            font-size:12px;
            .checked {
                display:inline-block;
            }
            .agree-sign {
                display:inline-block;
                position: relative;
                top: -3px
            }
        }
        .btn-save{
            width: 100%;
            position:relative;
        }
        .fast-words {
            font-size:14px;
            color:#999;
            position:relative;
            top:30%;
        }
        .picker-selected {
            color:#fc7845;
        }
        .mint-popup-4 {
            width: 100%;
            .picker-slot-wrapper{
                backface-visibility: hidden;
                text-center:center
                .picker-item {
                    backface-visibility: hidden;
                    text-center:center
                }
            }
        }
        input[type=checkbox] {
                -webkit-appearance: none;
                appearance: none;
                width: 15px;
                height: 15px;
                margin: 0;
                cursor: pointer;
                background: #fff;
                border: 1px solid #4E8BD9;
                -webkit-border-radius: 1px;
                -moz-border-radius: 1px;
                border-radius: 3px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                position: relative;
                display: inline-flex;
        }
        input[type=checkbox]:checked {
            background: #4E8BD9;
        }
        input[type=checkbox]:checked::after {
            content: url(../../../../assets/images/icon-checked.png);
            display: block;
            position: absolute;
            top: -1px;
            right: 0;
            left: -1px
        }
    }
</style>
