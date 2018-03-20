<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" placeholder="话题标题"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.author_name" placeholder="作者"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.author_id" placeholder="作者ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.phone" placeholder="作者电话"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
                <!--<el-input style='width:240px;' placeholder="请输入文件名(默认excel-list)" prefix-icon="el-icon-document"-->
                          <!--v-model="filename"></el-input>-->
                <!--<el-button style='margin-bottom:20px;' type="primary" icon="document" @click="handleDownload"-->
                           <!--:loading="downloadLoading">导出excel-->
                <!--</el-button>-->
                <router-link class="el-button el-button--primary" :to="{ path: '/createtopic' }" tag="button">创建话题
                </router-link>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="topicList" highlight-current-row fit border empty-text v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 100%;" height="500">
            <el-table-column type="selection" width="35">
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" v-if="scope.row.status !== 'online'" size="small"
                               @click="handleStatus(scope.$index, scope.row)">上线
                    </el-button>
                    <el-button v-else="scope.row.status === 'online'" size="small"
                               @click="handleStatus(scope.$index, scope.row)">下线
                    </el-button>
                    <!--<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>-->
                </template>
            </el-table-column>
            <el-table-column prop="id" width="80" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" width="300" sortable>
            </el-table-column>
            <el-table-column prop="author.nickname" label="作者" width="200" sortable>
            </el-table-column>
            <el-table-column prop="created_at" label="创作时间" width="180" :formatter="dateFormat" sortable>
            </el-table-column>
            <el-table-column prop="last_comment_time" label="最新评论时间" width="180" :formatter="dateFormat" sortable>
            </el-table-column>
            <el-table-column prop="address" label="所在位置" width="300" sortable>
            </el-table-column>
            <el-table-column prop="likes" label="点赞数" width="100" sortable>
            </el-table-column>
            <el-table-column prop="viewers" label="观看数" width="100" sortable>
            </el-table-column>
            <el-table-column prop="comment_count" label="评论数" width="100" sortable>
            </el-table-column>
            <el-table-column prop="tags" label="标签" sortable>
                <template slot-scope="scope">
                    <el-tag close-transition v-for="item,index in scope.row.tags" :key="item.id" type="danger">
                        {{item.name}}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>

        <!--分页-->
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
    import {topicList, changeStatus} from 'api'
    var params
    export default {
        data () {
            return {
                filters: {
                    title: '',
                    author_name: '',
                    author_id: '',
                    phone: ''
                },
                topicList: [],
                listLoading: false,
                total: 0,
                page: 1,
                topicStatus: '',
                filename: '',
                downloadLoading: false,
                para: '',
                filterStr: '',
                filterArr: [],
                params: {page: 1}
            }
        },
        methods: {
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return new Date(date).format("Y-MM-dd hh:mm:ss")
            },
            dateStatus: function (row, column) {
                if (row.status == 'online') {
                    return "线上";
                } else {
                    return "下线";
                }
            },
            search() {
                let that = this
                var map = new Map()
                for (var i in that.filters) {
                    map.set(i, that.filters[i])
                    map.forEach((val, key, obj) => {
                        this.params[key] = val
                    })
                }
                this._getTopic(this.params)
            },
            handleCurrentChange(val) {
                this.params.page = val
                this._getTopic(this.params)
            },
            _getTopic(params){
                this.listLoading = true
                topicList(params).then(res => {
                    if (res.code === 1) {
                        this.topicList = res.data.topics
                        this.listLoading = false
                        this.total = res.data.paging.total_pages
                    } else {
                        this.$router.push({path: '/login'});
                    }
                })
            },
            handleEdit (index, row){
                this.$router.push({path: `/edittopic/${row.id}`});
            },
            handleDel (index, row){

            },
            handleStatus(index, row){
                if (row.status === 'online') {
                    var mystatus = '下线'
                    var status = 'offline'
                } else {
                    var mystatus = '上线'
                    var status = 'online'
                }
                this.$confirm('是否' + mystatus + '该话题?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    let id = row.id
                    changeStatus(id, status).then((res) => {
                        console.log(res)
                        if (res.code == 1) {
                            this.$message({
                                type: 'success',
                                message: res.msg
                            });
                        } else {
                            this.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                        this._getTopic()
                    })
                }).catch(() => {
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            handleDownload () {
                this.downloadLoading = true
//                require.ensure([], () => {
//                    const { export_json_to_excel } = require('vendor/Export2Excel')
//                    const tHeader = ['序号', '昵称', '性别', '注册时间', '手机号','邀请码']
//                    const filterVal = ['id', 'nickname', 'gender', 'created_at', 'phone','invite']
//                    const list = this.topicList
//                    const data = this.formatJson(filterVal, list)
//                    export_json_to_excel(tHeader, data, this.filename)
//                    this.downloadLoading = false
//                })
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => {
                    console.log(v[j])
                    if (j === 'created_at') {
                        return parseTime(v[j])
                    } else if (j === 'gender') {
                        return formatSex(v[j])
                    } else {
                        return v[j]
                    }

                }))
            },
            setting(){
                this.setTable = true
            }
        },
        activated(){
            this.search()
        }
    }
</script>

<style>
    .el-table .cell {
        word-break: normal !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
        white-space: nowrap !important;
    }
</style>