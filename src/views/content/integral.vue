<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.id" placeholder="用户ID"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.nickname" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="search">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="creditsList"
                  highlight-current-row
                  border
                  fit
                  v-loading="listLoading"
                  @selection-change="selsChange"
                  style="width: 100%;"
                  height="450">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="nickname" label="用户名" width="200" sortable>
            </el-table-column>
            <el-table-column prop="credit.experience" label=经验值 width="100" sortable>
            </el-table-column>
            <el-table-column prop="credit.credit" label="当前积分" sortable>
            </el-table-column>
        </el-table>
        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form ref="editForm" :model="editForm" :rules="editFormRules" label-width="80px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="editForm.nickname" auto-complete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="当前积分" prop="description">
                    <el-input type="textarea" v-model="editForm.credit.credit" disabled></el-input>
                </el-form-item>
                <el-form-item label="修改后积分" prop="permissions">
                    <template slot-scope="scope">
                        <el-input type="textarea" v-model="editForm.credit.credit" ></el-input>
                    </template>
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
    import {creditsList,updateCredits} from 'api'
    import {parseTime,formatSex} from 'untils'
    export default {
        data() {
            return {
                filename: '',
                downloadLoading: false,
                filters: {
                    id: '',
                    phone: '',
                    nickname: ''
                },
                creditsList: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    credit:[
                        {required: true, message: 'type类型', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    nickname: '',
                    credit: '',
                },
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
            //获取用户列表
            getUsers() {
                this.listLoading = true;
                let nickname = ''
                let user_id = ''
                let phone = ''
                creditsList(nickname,user_id,phone).then((res) => {
                    this.total = res.data.paging.total_pages
                    this.creditsList = res.data.users
                    this.listLoading = false;
                })
            },
            search() {
                if(this.filters.id == '' && this.filters.nickname == '' && this.filters.phone ==''){
                    this.getUsers();
                }else if(this.filters.id == '' && this.filters.nickname == ''){
                    this.listLoading = true;
                    let nickname = ''
                    let user_id = ''
                    let phone = this.filters.phone
                    creditsList(nickname,user_id,phone).then((res) => {
                        this.total = res.data.paging.total_pages
                        this.creditsList = res.data.users
                        this.listLoading = false;
                    })
                }else if(this.filters.id == '' && this.filters.phone == ''){
                    this.listLoading = true;
                    let nickname = this.filters.nickname
                    let user_id = ''
                    let phone = ''
                    creditsList(nickname,user_id,phone).then((res) => {
                        this.total = res.data.paging.total_pages
                        this.creditsList = res.data.users
                        this.listLoading = false;
                    })
                }else if(this.filters.nickname == '' && this.filters.phone ==''){
                    this.listLoading = true;
                    let nickname = ''
                    let user_id = this.filters.id
                    let phone = ''
                    creditsList(nickname,user_id,phone).then((res) => {
                        this.total = res.data.paging.total_pages
                        this.creditsList = res.data.users
                        this.listLoading = false;
                    })
                }
            },
            cancelSearch () {
                this.page = 1
                this.getUsers()
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
                            updateCredits(this.editForm.credit.id,this.editForm.credit.credit,this.editForm.credit.experience).then((res) => {
                                this.editLoading = false;
                                //NProgress.done();
                                if(res.code == 1){
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });
                                    this.editFormVisible = false;
                                    this.getUsers();
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
                this.getUsers()
            })
        }
    }

</script>

<style scoped>

</style>