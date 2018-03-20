<template>
    <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    require('echarts/theme/macarons') // echarts 主题
    require('echarts/lib/chart/bar')
    require('echarts/lib/component/tooltip')
    require('echarts/lib/component/title')
    import {debounce} from 'untils'
    import {statistic} from 'api'

    export default {
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '400px'
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            chartData: {
                type: Object
            }
        },
        data() {
            return {
                chart: null,
                weekday: [],
                commentList:[],
                likeList:[],
                topicList:[]
            }
        },
        mounted() {
            this.fetchData()
            if (this.autoResize) {
                this.__resizeHanlder = debounce(() => {
                    if (this.chart) {
                        this.chart.resize()
                    }
                }, 100)
                window.addEventListener('resize', this.__resizeHanlder)
            }
            // 监听侧边栏的变化
            const sidebarElm = document.getElementsByTagName('aside')[0]
            sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            if (this.autoResize) {
                window.removeEventListener('resize', this.__resizeHanlder)
            }

            const sidebarElm = document.getElementsByTagName('aside')[0]
            sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

            this.chart.dispose()
            this.chart = null
        },
        watch: {
            chartData: {
                deep: true,
                handler(val) {
                    this.setOptions(val)
                }
            }
        },
        methods: {
            fetchData(){
                let that = this
                statistic().then(res => {
                    let result = res.data.result
                    for(let i in result){
                        that.weekday.push(result[i].date)
                        that.commentList.push(result[i].comment)
                        that.likeList.push(result[i].like)
                        that.topicList.push(result[i].topic)
                    }
                    that.initChart()
                })
            },
            setOptions({data} = {}) {
                let that = this
                this.chart.setOption({
                    title : {
                        text: '最近一周数据柱状图',
                        x:'2%'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['评论数量', '点赞数量', '新增话题数量']
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{type: 'category', data: this.weekday}],
                    yAxis: [{type: 'value'}],
                    series: [
                        {name: '评论数量', type: 'bar', data: that.commentList},
                        {name: '点赞数量', type: 'bar', data: that.likeList},
                        {name: '新增话题数量', type: 'bar', data: that.topicList},
                    ]
                })
            },
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                this.setOptions(this.chartData)
            }
        }
    }
</script>
