<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="标签名"></el-input>
                </el-form-item>
                <!--<el-form-item>-->
                <!--<el-input v-model="filters.userId" placeholder="用户ID"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                <!--<el-input v-model="filters.phone" placeholder="手机号"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                <!--<el-input v-model="filters.userName" placeholder="用户名"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="getTgas">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="tags"
                  highlight-current-row
                  border
                  fit
                  v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 100%;"
                  height="450">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="name" label=标签名 width="200" sortable>
            </el-table-column>
            <el-table-column prop="author.id" label="用户id" width="100" sortable>
            </el-table-column>
            <el-table-column prop="author.nickname" label="用户名" width="120" sortable>
            </el-table-column>
            <el-table-column prop="editor.id" label="编辑人员id" width="150" sortable>
            </el-table-column>
            <el-table-column prop="editor.nickname" label="编辑人员用户名" width="150" sortable>
            </el-table-column>
            <el-table-column prop="edit_time" label="编辑时间" width="200" :formatter="dateFormat" sortable>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间" :formatter="dateFormat" sortable>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="修改标签" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
                <el-form-item label="标签名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="permissions">
                    <template slot-scope="scope">
                        <el-input type="textarea" v-model="editForm.description" ></el-input>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSubmit" :loading="editLoading">保存</el-button>
                <el-button @click.native="editFormVisible = false">取消</el-button>
            </div>
        </el-dialog>
        <!--新增界面-->
        <el-dialog title="创建标签" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                <el-form-item label="标签名" prop="name">
                    <el-input v-model="addForm.name" ></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">保存</el-button>
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
    import {tagsList,creatTags,updataTags,deleteTags} from 'api'
    import {parseTime,formatSex} from 'untils'
    export default {
        data() {
            return {
                filters: {
                    name:''
                },
                tags: [],
                author:[],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '', trigger: 'blur'}
                    ],
                    author_id: [
                        {required: true, message: '', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    description: ''
                },
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{required: true, message: '请输入标签名', trigger: 'blur'}],
                    author_id: [
                        {required: true, message: '请输入id', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {name: '', description: '', author_id: ''},
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
                this.getTgas();
            },
            //获取标签列表
            getTgas() {
                let para = ''
                if (this.filters.name == "") {
                    para = {page: this.page}
                }else{
                    para = {page:this.page,name:this.filters.name}
                }
                this.listLoading = true;
                tagsList(para).then((res) => {
                    if(res.code == 1){
                        this.total = res.data.paging.total_pages
                        this.tags = res.data.tags
                        this.listLoading = false;
                    }
                })
            },
            cancelSearch () {
                this.page = 1
                this.getTgas()
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该标签吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let id = row.id
                    deleteTags(id).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getTgas();
                    });
                }).catch(() => {

                });
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        var idt = sessionStorage.getItem("id");
                        this.addLoading = true
                        creatTags(this.addForm.name, this.addForm.description,idt).then(res => {
                            this.addLoading = false;
                            if (res.code == 1) {
                                this.$message({
                                    message: '创建成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields()
                                this.getTgas()
                                this.addFormVisible = false
                            } else {
                                this.$message({
                                    message: '未知错误',
                                    type: 'error'
                                });
                            }
                        })
                    }
                })
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
                        this.$confirm('确认修改吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            let id = this.editForm.id;
                            var name = this.editForm.name;
                            var description = this.editForm.description;
                            updataTags(id,name,description).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                if(res.code == 1){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.editFormVisible = false;
                                    this.getTgas();
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

            selsChange: function (sels) {
                this.sels = sels;
            },

        },
        mounted() {
            this.$nextTick(() => {
                this.getTgas()
            })
        }
    }

</script>

<style scoped>

</style>