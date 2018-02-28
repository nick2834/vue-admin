<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="组名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getRoles">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="roles" highlight-current-row v-loading="listLoading"
                  style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="300" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" @click="handleSet(scope.$index, scope.row)">设置权限</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="name" label="权限组名" width="200" sortable>
            </el-table-column>
            <el-table-column prop="description" label="描述" width="200" sortable>
            </el-table-column>
            <el-table-column prop="permissions" label="权限组" sortable>
                <template slot-scope="scope">
                    <el-tag :key="item.id" v-for="item,index in scope.row.permissions" closable type="info"
                            @close="handleClose(item)">{{item.name}}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
                <el-form-item label="权限组名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
                <el-form-item label="权限集合" prop="permissions">
                    <template slot-scope="scope">
                        <el-checkbox v-for="item in editForm.permissions" :key="item.id" :label="item.name" name="role_type"></el-checkbox>
                    </template>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="editSubmit" :loading="editLoading">提交</el-button>
                <el-button @click.native="editFormVisible = false">取消</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增权限" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form ref="addForm" :model="addForm" label-width="80px" :rules="addFormRules">
                <el-form-item label="权限组名" prop="name">
                    <el-input v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限集合">
                    <el-checkbox-group v-model="addForm.role_type">
                        <el-checkbox v-for="item in permissionList" :key="item.id" :label="item.id" name="role_type">
                            {{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="描述" prop="description">
                    <el-input v-model="addForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
        <!--设置界面-->
        <el-dialog title="新增权限" v-model="setFormVisible" :close-on-click-modal="false">
            <el-form ref="setForm" :model="setForm" label-width="80px" :rules="setFormRules">
                <el-form-item label="权限组名" prop="name">
                    <el-input v-model="setForm.name"></el-input>
                </el-form-item>
                <el-form-item label="权限集合">
                    <el-checkbox-group v-model="setForm.pid">
                        <el-checkbox v-for="item in permissionList" :key="item.id" :label="item.id" name="pid">
                            {{item.name}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="setFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="setSubmit" :loading="addLoading">提交</el-button>
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
    import {roleList, createRole, deleteRole, reloadRole, permissions, setRolePermissions, setPermission} from 'api';

    export default {
        data() {
            return {
                filters: {name: ''},
                total: 0,
                totalCount: 0,
                page: 1,
                listLoading: false,
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {name: [{required: true, message: '请输入权限名', trigger: 'blur'}]},
                //编辑界面数据
                editForm: {id: null, name: null, description: null, role_type: null, permissions:[]},
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {name: [{required: true, message: '请输入权限名', trigger: 'blur'}]},
                //新增界面数据
                addForm: {name: '', role_type: [], description: ''},
                roles: [],
                permissionList: [],
                //设置权限界面
                setFormVisible:false,
                setLoading:false,
                setFormRules:{name: [{required: true, message: '请输入权限名', trigger: 'blur'}]},
                setForm:{id:null,pid:[]}
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getList();
            },
            //搜索
            getRoles() {
                if (this.filters.name == "") {
                    var para = {page: this.page};
                } else {
                    var para = {page: this.page, name: this.filters.name};
                }
                this.listLoading = true;
                roleList(para).then(res => {
                    this.total = res.data.paging.total_pages
                    this.totalCount = res.data.paging.total_count
                    this.roles = res.data.roles
                    this.listLoading = false
                })
            },
            //获取权限列表
            getList () {
                this.listLoading = true;
                roleList().then(res => {
                    this.total = res.data.paging.total_pages
                    this.roles = res.data.roles
                    this.listLoading = false
                })
            },
            getPermission(){
                permissions().then(res => {
                    this.permissionList = res.data.permissions
                })
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let id = row.id
                    deleteRole(id).then((res) => {
                        this.listLoading = false;
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getList();
                    });
                }).catch(() => {

                });
            },
            //显示编辑界面
            handleEdit: function (index, row) {
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            //显示新增界面
            handleAdd: function () {
                this.addFormVisible = true
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    let id = this.editForm.id
                    this.editLoading = true
                    reloadRole(id, this.editForm.name, this.editForm.description, this.editForm.role_type).then(res => {
                        this.editLoading = false;
                        if (res.code == 1) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.getList()
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
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.addLoading = true
                        createRole(this.addForm.name, this.addForm.description, this.addForm.role_type.join(",")).then(res => {
                            this.addLoading = false;
                            if (res.code == 1) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields()
                                this.getList()
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
            handleSet:function (index, row) {
                this.setFormVisible = true
                this.setForm.id = row.id
                this.setForm.name = row.name
            },
            setSubmit:function () {
                this.$refs.setForm.validate((valid) => {
                    let id = this.setForm.id
                    this.setLoading = true
//                    setRolePermissions(id,this.setForm.pid.join(",")).then(res => {
                    setPermission(id,this.setForm.pid.join(",")).then(res => {
                        this.setLoading = false;
                        if (res.code == 1) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.getList()
                            this.setFormVisible = false
                        } else {
                            this.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    })
                })
            },
            //全选
            handleClose(tag) {
                console.log(this.dynamicTags)
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            }
        },
        mounted() {
            this.getList()
            this.getPermission()
        }
    }

</script>

<style scoped>
    .el-tag + .el-tag {
        margin-left: 10px;
    }
</style>