<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.id" placeholder="车辆id"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.brand" placeholder="车辆品牌"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.mod" placeholder="型号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.license" placeholder="车牌号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.owner" placeholder="车主名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input v-model="filters.phone" placeholder="车主手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getPerList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="carsLists" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;" height="550" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="100" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="ID" sortable>
            </el-table-column>
            <el-table-column prop="name" label="车辆别名" width="300" sortable>
            </el-table-column>
            <el-table-column prop="license" label="车牌号" width="300" sortable>
            </el-table-column>
            <el-table-column prop="brand" label="品牌" width="300" sortable>
            </el-table-column>
            <el-table-column prop="mod" label="型号" width="300" sortable>
            </el-table-column>
            <el-table-column prop="owner" label="车主名称" width="300" sortable>
            </el-table-column>
            <el-table-column prop="phone" label="车主手机号" width="300" sortable>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="新增信息" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="车主手机号码" prop="name">
                    <el-input v-model="editForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="车主姓名">
                    <el-input type="text" v-model="editForm.owner"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input type="text" v-model="editForm.license"></el-input>
                </el-form-item>
                <el-form-item label="车辆品牌">
                    <el-input type="text" v-model="editForm.brand"></el-input>
                </el-form-item>
                <el-form-item label="车辆型号">
                    <el-input type="text" v-model="editForm.mod"></el-input>
                </el-form-item>
                <el-form-item label="车辆别名">
                    <el-input type="text" v-model="editForm.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="addLoading">保存</el-button>
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
    import {carsList,creatCars,updatacars,addCar,deleteCar,} from 'api';

    export default {
        data() {
            return {
                filters: {
                    brand: '',
                    mod: '',
                    owner: '',
                    phone: '',
                    license: '',
                    id: '',
                },
                total: 0,
                page: 1,
                levels: [],
                listLoading: false,
                sels: [],//列表选中列
                params:{
                    page:1
                },
                map:new Map(),
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                 editFormRules: {
                 },
                //编辑界面数据
                editForm: {
                    id: 0,
                    license: '',
                    brand_id: '',
                    colour: '',
                    mileage:'',
                    buy_time:'',
                    inspection_time:'',
                    phone:''
                },
                addLoading:false,
                carsLists:[]
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this.getPerList();
            },
            //获取用户列表
            getPerList() {
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
                carsList(params).then((res) => {
                    if(res.code === 1){
                        this.total = res.data.paging.total_pages
                        this.carsLists = res.data.cars
                        this.listLoading = false;
                    }
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
                    updatacars(this.filters.id,this.filters.license,this.filters.brand_id,this.filters.mod,this.filters.colour,this.filters.mileage,this.filters.buy_time,this.filters.inspection_time).then(res => {
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