<template>
    <div class="dashboard-editor-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
    </div>
</template>

<script>

    import PanelGroup from './admin/components/PanelGroup'

    export default {
        name: 'dashboard-admin',
        components: {
            PanelGroup
        },
        data() {
            return {

            }
        },
        methods: {
            handleSetLineChartData(type) {
                this.lineChartData = lineChartData[type]
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .dashboard-editor-container {
        /*padding: 32px;*/
        background-color: rgb(240, 242, 245);
        .chart-wrapper {
            background: #fff;
            padding: 16px 16px 0;
            margin-bottom: 32px;
        }
    }
</style>
