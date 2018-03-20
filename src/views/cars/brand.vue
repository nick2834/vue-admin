<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="品牌名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="search">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="brandsList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;" height="550" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="name" label="品牌名称" width="300" sortable>
            </el-table-column>
            <el-table-column prop="description" label="对应图标" sortable>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="编辑积分" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="品牌名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标地址">
                    <el-input type="text" v-model="editForm.icon_url"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增品牌" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="品牌名" prop="name">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="password">
                    <el-input v-model="addForm.icon_url" auto-complete="off"></el-input>
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
    import {brandsList,brandsDetail,creatBrands,updataBrands,deleteBrands} from 'api';
    export default {
        data() {
            return {
                filters: {
                    name: ''
                },
                total: 0,
                page: 1,
                brandsList: [],
                levels: [],
                listLoading: false,
                sels: [],//列表选中列

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '品牌名称', trigger: 'blur'}
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
                    icon_url: '',
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
                let name = ''
                brandsList(name).then(res => {
                    this.brandsList = res.data.brands
                    this.listLoading = false
                    this.total = res.data.paging.total_pages
                })
            },
            search () {
                if (this.filters.name == "") {
                    this.getPerList();
                } else {
                    this.listLoading = true;
                    brandsList(this.filters.name).then(res => {
                        this.brandsList = res.data.brands
                        this.listLoading = false
                        this.total = res.data.paging.total_pages
                    })
                }
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
                    updataBrands(id,this.editForm.name,this.editForm.icon_url).then(res => {
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
            //新增
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            creatBrands(this.addForm.name,this.addForm.icon_url).then((res) => {
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
        },
        mounted() {
            this.getPerList();
        }
    }

</script>

<style scoped>

</style>