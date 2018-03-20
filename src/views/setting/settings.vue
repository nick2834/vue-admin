<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column
                prop="id"
                label="id"
                width="180">
        </el-table-column>
        <el-table-column
                prop="date"
                label="日期"
                width="180">
        </el-table-column>
        <el-table-column
                prop="name"
                label="姓名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="address"
                label="地址"
                width="180">
        </el-table-column>
        <el-table-column
                prop="proname"
                label="产品名"
                width="300">
        </el-table-column>
        <el-table-column
                prop="level"
                label="等级">
        </el-table-column>
    </el-table>
</template>
<script>
    import data from '../../mock';
    export default{
        data(){
            return{
                tableData:[]
			}
		},
		methods:{
            getList(){
                this.$http.get('api/user').then(res =>{
                    this.tableData = res.data.tableData
                })
            }
		},
		mounted(){
			this.getList()
		}
	}

</script>
<style lang="scss" type="text/scss">

</style>
