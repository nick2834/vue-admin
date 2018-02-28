<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form>
                <el-form-item >
                    <div class="block">
                        <span class="demonstration">开始时间</span>
                        <el-date-picker
                                v-model="value1"
                                type="date"
                                placeholder="选择日期"
                                @change="getSTimes"
                                format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item >
                    <div class="block">
                        <span class="demonstration">结束时间</span>
                        <el-date-picker
                                v-model="value2"
                                type="date"
                                placeholder="选择日期"
                                @change="getSTimee"
                                format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUsers">查询</el-button>
                </el-form-item>
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
            <el-table-column prop="author_id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="nickname" label="用户名" width="200" sortable>
            </el-table-column>
            <el-table-column prop="num" label="评论次数" width="200" sortable>
            </el-table-column>
            <el-table-column prop="time" label="时间" width="180" :formatter="dateFormat" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="手机号"  sortable>
            </el-table-column>
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
    //    import NProgress from 'nprogress'
    import {userList,logOutUser,InternalUsers,Identity,dailyLsit} from 'api'
    import {parseTime,formatSex} from 'untils'
    export default {
        data() {
            return {
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now();
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                value1:'',
                value2:'',
                downloadLoading: false,
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
            getSTimes(val) {
                this.value1 = val;
            },
            getSTimee(val) {
                this.value2 = val;
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
                this.filters.user_id = ''
                this.filters.phone = ''
                this.filters.name = ''
                this.params.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                var date = new Date();
                var yesDate = new Date(date.getTime() - 24*60*60*1000); //前一天
                var startTime = '';
                var endTime = '';
                this.listLoading = true;
                if(this.value1==''){
                    startTime = date.format("Y-MM-dd")
                }else{
                    startTime =this.value1
                }
                if(this.value2 ==''){
                    endTime = yesDate.format("Y-MM-dd")
                }else{
                    endTime = this.value2
                }
                dailyLsit(startTime,endTime).then((res) => {
                    if(res.code === 1){
                        this.users = res.data.comment
                        this.listLoading = false;
                    }
                })
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        mounted() {
            this.getUsers()
        }
    }

</script>

<style scoped>

</style>