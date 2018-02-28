<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="权限名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                    <el-button type="primary" @click="handleSysAdd" disabled>增加系统列表</el-button>
                    <!--<el-button type="primary" @click="handleSysAdd">增加系统列表</el-button>-->
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="permissonList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="name" label="角色名" width="300" sortable>
            </el-table-column>
            <el-table-column prop="name" label="说明" width="300" sortable>
            </el-table-column>
            <el-table-column prop="description" label="路由" width="200" sortable>
            </el-table-column>
            <el-table-column prop="permission_type" label="类型" sortable>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="新增权限" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="说明">
                    <el-input type="text" v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-input type="text" v-model="editForm.permission_type"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增权限" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="角色名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="说明" prop="description">
                    <el-input type="text" v-model="addForm.description"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="permission_type">
                    <el-input type="text" v-model="addForm.permission_type"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
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
    import util from 'common/js/util'
    //import NProgress from 'nprogress'
    import {permissions, createPermission, deletePermissions,reloadPermissions} from 'api';

    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                total: 0,
                page: 1,
                permissonList: [],
                levels: [],
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: '',
                    description: '',
                    permission_type: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}]
                },
                //新增界面数据
                addForm: {
                    name: '',
                    description: '',
                    permission_type: ''
                }
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getPerList();
            },
            //获取用户列表
            getPerList() {
                this.listLoading = true;
                permissions().then(res => {
                    this.permissonList = res.data.permissions
                    this.listLoading = false
                    this.total = res.data.paging.total_pages
                })
            },
            search () {
                if (this.filters.name == "") {
                    var para = {page: this.page};
                } else {
                    var para = {page: this.page, name: this.filters.name};
                }
                this.listLoading = true;
                permissions(para).then(res => {
                    this.permissonList = res.data.permissions
                    this.listLoading = false
                    this.total = res.data.paging.total_pages
                })
            },
            handleEdit:function (index, row) {
                this.editFormVisible = true
                this.editForm = Object.assign({}, row);
            },
            //编辑
            editSubmit :function (index, row) {
                this.$refs.editForm.validate((valid) => {
                    let id = this.editForm.id
                    this.editLoading = true
                    reloadPermissions(id,this.editForm.name,this.editForm.description,this.editForm.role_type).then(res => {
                        this.editLoading = false;
                        if (res.code == 1) {
                            this.$message({
                                message: '更新成功',
                                type: 'success'
                            });
                            this.getPerList()
                            this.editFormVisible = false
                        } else {
                            this.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    })
                })
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = row.id;
                    deletePermissions(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        this.getPerList();
                    });
                }).catch(() => {

                });
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getPerList();
                    });
                }).catch(() => {

                });
            },
            handleAdd () {
                this.addFormVisible = true
            },
            handleSysAdd(){
                var routeArr = []
                var permissionArr = []
                this.$router.options.routes.map(res => {
                    if(res.hidden){
                        return
                    }else{
                        routeArr.push(res)
                    }
                })
                routeArr.map(res =>{
                    res.children.map(res =>{
                        if(res.hidden){
                            return
                        }else{
                            permissionArr.push(res)
                        }
                    })
                })
                permissionArr.map(res =>{
                    let para = {
                        name: res.name,
                        description: res.path,
                        permission_type: res.path
                    }
                    createPermission(para).then(res =>{
                        console.log(res)
                    })
                })
            },
            addSubmit () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.addLoading = true
                        let para = {
                            name: this.addForm.name,
                            description: this.addForm.description,
                            permission_type: this.addForm.permission_type
                        }
                        createPermission(para).then(res => {
                            this.addLoading = false;
                            if (res.code == 1) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields()
                                this.getPerList()
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
            }
        },
        mounted() {
            this.getPerList();
        }
    }

</script>

<style scoped>

</style>