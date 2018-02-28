<template>
    <section style="overflow: hidden">
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="form">
                <el-form-item label="日期筛选">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="开始日期" v-model="form.date1"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="结束日期" v-model="form.date2"
                                        style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="fetchSearch">查询</el-button>
                    <el-button type="primary" @click="resetSearch">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;clear: both">
            <el-table
                    :data="fetchItems"
                    style="width: 100%"
                    v-loading:loading
                    height="250">
                <el-table-column
                        fixed
                        prop="date"
                        label="日期"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="comment"
                        label="评论数量"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="like"
                        label="点赞数量"
                        width="300">
                </el-table-column>
                <el-table-column
                        prop="topic"
                        label="新增话题">
                </el-table-column>
            </el-table>
        </el-row>
        <el-row class="panel-group" :gutter="40" style="clear: both">
            <line-chart></line-chart>
        </el-row>
    </section>
</template>

<script>
    import {statistic} from 'api'
    import CountTo from 'vue-count-to'
    import LineChart from './LineChart'

    export default {
        data(){
            return {
                fetchItems: [],
                form: {
                    date1: '',
                    date2: ''
                },
                loading:false
            }
        },
        components: {
            CountTo,
            LineChart
        },
        methods: {
            getStatistics(para){
                this.loading = true
                statistic(para).then(res => {
                    if (res.code === 1) {
                        this.loading = false
                        this.fetchItems = res.data.result
                    }
                })
            },
            //搜索
            fetchSearch(){
                let that = this
                let start = new Date(this.form.date1).format("Y-MM-dd")
                let ending = new Date(this.form.date2).format("Y-MM-dd")
                let nowDate = new Date(new Date()).format("Y-MM-dd")
                if (start === '' || ending === '') {
                    return
                } else if (ending > nowDate) {
                    that.$notify.error({
                        title: '错误',
                        message: '结束日期不能超过当前日期',
                        showClose: false
                    })
                    return
                } else if (ending < start) {
                    that.$notify.error({
                        title: '错误',
                        message: '开始日期不能超过结束日期',
                        showClose: false
                    })
                    return
                } else {
                    let para = '?st=' + start + '&et=' + ending
                    that.getStatistics(para)
                }
            },
            resetSearch(){
                let that = this
                this.form.date1 = ''
                this.form.date2 = ''
                let para = ''
                that.getStatistics(para)
            }
        },
        mounted(){
            this.getStatistics()
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .panel-group {
        /*margin-top: 18px;*/
        .card-panel-col {
            margin-bottom: 32px;
        }
        .card-panel {
            box-sizing: border-box;
            height: 108px;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            overflow: hidden;
            color: #666;
            background: #fff;
            box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
            border-color: rgba(0, 0, 0, .05);
            &:hover {
                .card-panel-icon-wrapper {
                    color: #fff;
                }
                .icon-people {
                    background: #40c9c6;
                }
                .icon-message {
                    background: #36a3f7;
                }
                .icon-money {
                    background: #f4516c;
                }
                .icon-shoppingCard {
                    background: #34bfa3
                }
            }
            .icon-people {
                color: #40c9c6;
            }
            .icon-message {
                color: #36a3f7;
            }
            .icon-money {
                color: #f4516c;
            }
            .icon-shoppingCard {
                color: #34bfa3
            }
            .card-panel-icon-wrapper {
                float: left;
                margin: 14px 0 0 14px;
                padding: 16px;
                transition: all 0.38s ease-out;
                border-radius: 6px;
            }
            .card-panel-icon {
                float: left;
                font-size: 48px;
            }
            .card-panel-description {
                float: right;
                font-weight: bold;
                margin: 26px;
                margin-left: 0px;
                .card-panel-text {
                    line-height: 18px;
                    color: rgba(0, 0, 0, 0.45);
                    font-size: 16px;
                    margin-bottom: 12px;
                }
                .card-panel-num {
                    font-size: 20px;
                }
            }
        }
    }
</style>
