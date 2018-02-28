<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.content" placeholder="评论内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="作者名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.id" placeholder="作者id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.phone" placeholder="作者手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="_getList">查询</el-button>
                </el-form-item>
                <!--<el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>-->
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="commentsList"
                  highlight-current-row
                  border
                  fit
                  v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 100%;"
                  height="450">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="left" prop="status">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button v-if="scope.row.status === 'offline'" size="small"
                               @click="handleStatus(scope.$index, scope.row)">上线
                    </el-button>
                    <el-button v-else type="danger" size="small"
                               @click="handleStatus(scope.$index, scope.row)">下线
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="content" label="评论内容" width="200" sortable>
            </el-table-column>
            <el-table-column prop="topic_id" label="话题ID" width="150" sortable>
            </el-table-column>
            <el-table-column prop="author.nickname" label="作者" width="100" sortable>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间" width="300" :formatter="dateFormat" sortable>
            </el-table-column>
            <el-table-column prop="likes" label="点赞数"  sortable>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
                <el-form-item label="评论内容" prop="content">
                    <el-input v-model="editForm.content" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="评论链接" prop="link">
                    <el-input type="textarea" v-model="editForm.link" ></el-input>
                </el-form-item>
                <el-form-item label="评论类型" prop="checkedCities">
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <!--<el-checkbox label="文字评论" name="text"></el-checkbox>
                        <el-checkbox label="图片评论" name="image"></el-checkbox>-->
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSubmit" :loading="editLoading">保存</el-button>
                <el-button @click.native="editFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
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
    //import NProgress from 'nprogress'
    import {commentsList,commentStatus,updataComments} from 'api'
    export default {
        data() {
            const cityOptions = ['text', 'image'];
            return {
                downloadLoading: false,
                filters: {
                    content:'',
                    id: '',
                    phone: '',
                    name: ''
                },
                checkAll: false,
                checkedCities :['text'],
                cities: cityOptions,
                isIndeterminate: true,
                commentsList: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    content: '',
                    link: '',
                    comment_type: ''
                },
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
            handleCurrentChange(val) {
                this.page = val;
                this._getList ();
            },
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            //获取用户列表
            _getList () {
                if (this.filters.id == "" && this.filters.name == "" && this.filters.phone == "" && this.filters.content == "") {
                    var para = {page: this.page}
                } else if(this.filters.id == "" && this.filters.name == "" && this.filters.content == ""){
                    var para = {page: this.page, phone: this.filters.phone}
                } else if(this.filters.id == "" && this.filters.phone == "" && this.filters.content == ""){
                    var para = {page: this.page, name: this.filters.name}
                } else if(this.filters.name == "" && this.filters.phone == "" && this.filters.content == ""){
                    var para = {page: this.page, user_id: this.filters.id}
                } else if(this.filters.id == "" && this.filters.name == "" && this.filters.phone == ""){
                    var para = {page: this.page, content: this.filters.content}
                }
                this.listLoading = true;
                commentsList(para).then(res =>{
                    if(res.code === 1){
                        this.total = res.data.paging.total_pages
                        this.commentsList = res.data.comments
                        this.listLoading = false;
                    }else{
                        this.$router.push({path: '/login'})
                    }
                })
            },
            cancelSearch () {
                this.page = 1
                this._getList()
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let  id = this.editForm.id;
                            var content = this.editForm.content;
                            var link = this.editForm.link;
                            var comment_type = this.editForm.comment_type;
                            updataComments(id,content,link,comment_type).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                if(res.code == 1){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.editFormVisible = false;
                                    this._getList();
                                }else{
                                    this.$message({
                                        message: '未知错误',
                                        type: 'error'
                                    });
                                }
                            });
                        });
                    }
                });
            },
            //修改
            handleEdit: function (index, row) {
                //this.$router.push({path: `/userInfo/${row.id}`});
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //评论上下线
            handleStatus(index, row){
                if(row.status === 'online'){
                    var mystatus = '下线'
                    var status = 'offline'
                }else{
                    var mystatus = '上线'
                    var status = 'online'
                }
                this.$confirm('是否' + mystatus + '该评论?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    let id = row.id
                    commentStatus(id,status).then((res) => {
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
                        this._getList()
                    })
                }).catch(() => {
                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },

        },
        mounted() {
            this.$nextTick(() => {
                this._getList ()
            })
        }
    }

</script>

<style scoped>

</style>