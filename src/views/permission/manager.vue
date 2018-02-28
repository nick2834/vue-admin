<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.id" placeholder="用户ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getUsers">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="users" highlight-current-row v-loading="listLoading" border @selection-change="selsChange"
                  style="width: 100%;" height="550">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="250" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button type="default" size="small" @click="handleCancle(scope.$index, scope.row)">注销</el-button>
                    <el-button type="default" size="small" @click="setRoles(scope.$index, scope.row)">分配角色</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="nickname" label="用户名" width="300" sortable>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="300" sortable>
            </el-table-column>
            <el-table-column prop="gender" label="性别" width="220" :formatter="formatSex" sortable>
            </el-table-column>
            <el-table-column prop="created_at" label="注册时间" width="300" :formatter="dateFormat" sortable>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" ref="editForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="editForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增后台用户" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addForm.gender">
                        <el-radio label="male" :formatter="formatSex"></el-radio>
                        <el-radio label="female" :formatter="formatSex"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="权限集合">
                    <el-checkbox-group v-model="addForm.region">
                        <el-checkbox label="权限一" name="type"></el-checkbox>
                        <el-checkbox label="权限二" name="type"></el-checkbox>
                        <el-checkbox label="权限三" name="type"></el-checkbox>
                        <el-checkbox label="权限四" name="type"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    @current-change="handleCurrentChange"
                    :page-size="1"
                    layout="prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-col>

        <!--设置用户角色-->
        <el-dialog title="设置用户角色" v-model="setRolesBox" :close-on-click-modal="false">
            <el-form :model="setRolesForm" label-width="80px" ref="editForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="setRolesForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限集合">
                    <el-checkbox-group v-model="checkedCities1" @change="handleChecked">
                        <el-checkbox v-for="item in cities" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="setRolesBox = false">取消</el-button>
                <el-button type="primary" @click.native="editRoles" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import util from 'common/js/util'
    //import NProgress from 'nprogress'
    import {systemUsersRegister, userList, addAdmins, logOutUser, permissions, setRole,roleList,setPermission} from 'api'
    export default {
        data() {
            return {
                filters: {filter: 'internal', name: '', phone: '', user_id: ''},
                users: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {name: [{required: true, message: '请输入权限名', trigger: 'blur'}]},
                //编辑界面数据
                editForm: {id: 0, name: '', description: ''},
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {name: [{required: true, message: '请输入权限名', trigger: 'blur'}]},
                //新增界面数据
                addForm: {user: '', password: '', region: [], gender: ''},
                roles: [],
                permissionList: [],
                setRolesBox: false,
                setRolesForm: {id:'',name:'',rid:[]},
                setRolesPid: [],
                checkedCities1: [],
                cities: []

            }
        },
        methods: {
            getRoleList(){
                roleList().then(res => {
                    this.setRolesPid = res.data.roles
                    this.cities = this.setRolesPid
                })
            },
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
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            getPermission(){
                permissions().then(res => {

                })
            },
            //获取用户列表
            getUsers() {
                if (this.filters.id == "" && this.filters.name == "") {
                    var para = {page: this.page};
                } else if (this.filters.id == "") {
                    var para = {page: this.page, name: this.filters.name, filter: this.filters.filter};
                } else if (this.filters.name == "") {
                    var para = {page: this.page, user_id: this.filters.id, filter: this.filters.filter};
                }
                this.listLoading = true;
                userList(para).then(res => {
                    this.total = res.data.paging.total_pages;
                    this.users = res.data.users;
                    this.listLoading = false;
                })
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {id: row.id};
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
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
                this.addFormVisible = true;
            },
            //编辑
            editSubmit: function () {
                this.$refs.editForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.editLoading = true;
                            editUser(para).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                if (res.code == 1) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.editFormVisible = false;
                                    this.getUsers();
                                } else {
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
            //注销
            handleCancle(index, row) {
                this.$confirm('此操作将永久注销该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    logOutUser(row.id).then((res) => {
                        if (res.code == 1) {
                            this.$message({
                                type: 'success',
                                message: '注销成功!'
                            });
                        } else {
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
                        message: '已取消注销'
                    });
                });
            },
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            addAdmins(this.addForm.name, this.addForm.password, this.addForm.gender).then((res) => {
                                this.addLoading = false;
                                if (res.code == 1) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.getUsers();
                                } else {
                                    this.$message({
                                        message: '未知错误',
                                        type: 'error'
                                    });
                                }
                                //NProgress.done();
                            });
                        });
                    }
                });
            },
            setRoles(index, row){
                this.setRolesForm.id = row.id
                this.setRolesForm.name = row.name
                this.setRolesBox = true
            },
            handleChecked(val){
                this.setRolesForm.rid = val
            },
            editRoles(){
                setRole(this.setRolesForm.id,this.setRolesForm.rid.join(',')).then(res =>{
                    console.log(res)
                })
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        mounted() {
            this.getUsers()
            this.getPermission()
            this.getRoleList()
        }
    }

</script>

<style scoped>

</style>