<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.id" placeholder="用户ID" @focus="getFilters"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.phone" placeholder="手机号" @focus="getFilters"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户名" @focus="getFilters"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUsers">查询</el-button>
                    <el-button type="danger" @click="cancelSearch">取消</el-button>
                </el-form-item>
                <el-input style='width:240px;' placeholder="请输入文件名(默认excel-list)" prefix-icon="el-icon-document" v-model="filename"></el-input>
                <el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload" :loading="downloadLoading">导出excel</el-button>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users"
                  highlight-current-row
                  border
                  fit
                  v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 100%;"
                  height="450">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="260" fixed="right">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
                    <el-button v-if="!scope.row.internal_user"  size="small"
                               @click="handleInternal(scope.$index, scope.row)">设置内部用户
                    </el-button>
                    <el-button v-if="scope.row.internal_user" type="danger" size="small" :plane="true"
                               @click="handleInternal(scope.$index, scope.row)">取消内部用户
                    </el-button>
                    <el-button type="danger" size="small" :plane="true" @click="handleCancle(scope.$index, scope.row)">注销</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="nickname" label="用户名" width="200" sortable>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="90" :formatter="formatSex" sortable>
            </el-table-column>
            <el-table-column prop="created_at" label="注册时间" width="180" :formatter="dateFormat" sortable>
            </el-table-column>
            <el-table-column prop="last_login_time" label="最后登录时间" width="200" :formatter="dateFormat" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="手机号" width="200" sortable></el-table-column>
            <el-table-column prop="invite" label="邀请码" width="100" sortable></el-table-column>
            <el-table-column prop="internal_user" label="内部用户" width="120" :formatter="internal" sortable></el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="1"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-col>

    </section>
</template>

<script>
    import {userList,logOutUser,InternalUsers,Identity} from 'api'
    import {parseTime,formatSex} from 'untils'
    export default {
        data() {
            return {
                filename: '',
                downloadLoading: false,
                filters: {
                    id: '',
                    phone: '',
                    name: ''
                },
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],
                params:{
                    page:1
                },
                map:new Map()
            }
        },
        methods: {
            //性别显示转换
            formatSex: function (row, column) {
                return row.gender == 'male' ? '男' : row.gender == 'female' ? '女' : '未知';
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return new Date(date).format("Y-MM-dd hh:mm:ss")
            },
            internal: function (row, column) {
                return (!row.internal_user) ? '否' : '是'
            },
            handleCurrentChange(val) {
                this.filters.id = ''
                this.filters.phone = ''
                this.filters.name = ''
                this.params.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                let that = this
                for(const i in that.filters){
                    that.map.set(i, that.filters[i])
                    that.map.forEach((val, key, obj) => {
                        that.params[key] = val
                    })
                }
                this.getList(this.params)
            },
            getList(params){
                this.listLoading = true;
                userList(params).then((res) => {
                    if(res.code === 1){
                        this.total = res.data.paging.total_pages
                        this.users = res.data.users
                        this.listLoading = false;
                    }else{
                        this.$router.push({path: '/login'});
                    }
                }).catch(err =>{
                    this.$router.push({path: '/login'});
                })
            },
            cancelSearch () {
                this.map.forEach((val, key, obj) => {
                    this.params[key] = ''
                })
                this.getList(this.params)
            },
            getFilters(){
                this.$nextTick(() =>{
                    for(const i in this.filters){
                        this.filters[i] = ''
                    }
                    this.map.forEach((val, key, obj) => {
                        this.params[key] = ''
                    })
                })
            },
            //查看
            handleEdit: function (index, row) {
                this.$router.push({path: `/userInfo/${row.id}`});
            },
            //内部用户设置
            handleInternal(index, row){
                this.$confirm('是否将该用户设为内部用户?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    let para = row.id
                    InternalUsers(para).then((res) =>{
                        if(res.code == 1){
                            this.$message({
                                type: 'success',
                                message: '设置成功!'
                            });
                        }else{
                            this.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                        this.getUsers()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消设置'
                    });
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleCancle(index, row) {
                this.$confirm('此操作将永久注销该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    logOutUser(row.id).then((res) => {
                        if(res.code == 1){
                            this.$message({
                                type: 'success',
                                message: '注销成功!'
                            });
                        }else{
                            this.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消注销'
                    });
                });
            },
            handleDownload () {
                this.downloadLoading = true
                require.ensure([], () => {
                    const { export_json_to_excel } = require('vendor/Export2Excel')
                    const tHeader = ['序号', '昵称', '性别', '注册时间', '手机号','邀请码']
                    const filterVal = ['id', 'nickname', 'gender', 'created_at', 'phone','invite']
                    const list = this.users
                    const data = this.formatJson(filterVal, list)
                    export_json_to_excel(tHeader, data, this.filename)
                    this.downloadLoading = false
                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    console.log(v[j])
                    if (j === 'created_at') {
                        return parseTime(v[j])
                    }else if(j === 'gender'){
                        return formatSex(v[j])
                    } else {
                        return v[j]
                    }

                }))
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getUsers()
            })
        }
    }

</script>

<style scoped>

</style>