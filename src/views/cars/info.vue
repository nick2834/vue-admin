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
                <!--<el-form-item>-->
                <!--<el-input v-model="filters.owner" placeholder="车主名称"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item>-->
                <!--<el-input v-model="filters.phone" placeholder="车主手机号"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button type="primary" @click="getPerList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="carsList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                  style="width: 100%;" height="550" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="操作" width="200" fixed="left">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button size="small" @click="handleAdd(scope.$index, scope.row)">编辑车主</el-button>
                    <!--<i class="el-icon-circle-close"></i>-->
                </template>
            </el-table-column>
            <el-table-column prop="id" width="100" label="车辆ID" sortable>
            </el-table-column>
            <el-table-column prop="owners" label="车主信息" width="300" sortable>
                <template slot-scope="scope">
                    <el-tag :key="item.id" v-for="item,index in scope.row.owners"  type="info"
                            @close="handleClose(item)">{{item.nickname}}:{{item.phone}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="license" label="车牌号" width="300" sortable>
            </el-table-column>
            <el-table-column prop="brand" label="品牌名" width="150" sortable>
            </el-table-column>
            <el-table-column prop="mod" label="型号" sortable>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="编辑信息" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="车辆型号" prop="name">
                    <el-input v-model="editForm.mod" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="车辆颜色">
                    <el-input type="text" v-model="editForm.colour"></el-input>
                </el-form-item>
                <el-form-item label="车牌号">
                    <el-input type="text" v-model="editForm.license"></el-input>
                </el-form-item>
                <el-form-item label="车辆里程数">
                    <el-input type="text" v-model="editForm.mileage"></el-input>
                </el-form-item>
                <el-form-item label="车辆型号">
                    <el-input type="text" v-model="editForm.mod"></el-input>
                </el-form-item>
                <el-form-item label="车辆购买时间">
                    <!--<el-input type="text" v-model="editForm.buy_time"></el-input>-->
                    <div class="block">
                        <el-date-picker
                                v-model="editForm.buy_time"
                                type="date"
                                placeholder="选择日期"
                                @change="getSTimes"
                                format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
                <el-form-item label="车辆年检时间">
                    <!--<el-input type="text" v-model="editForm.inspection_time"></el-input>-->
                    <div class="block">
                        <el-date-picker
                                v-model="editForm.inspection_time"
                                type="date"
                                placeholder="选择日期"
                                @change="getSTimee"
                                format="yyyy-MM-dd">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">保存</el-button>
            </div>
        </el-dialog>

        <!--//编辑车主-->
        <el-dialog title="编辑车主" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="用户id" prop="name">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-input placeholder="请输入id" v-model="addForm.user_id" style="width:150px" @focus="getFilters" clearable>
                            </el-input>
                        </el-col>
                        <el-col :span="8">
                            <el-button type="primary" @click="getUsers">查询</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <el-table :data="userSs" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                      style="width: 100%;" height="200" >
                <el-table-column label="操作" width="70" fixed="left">
                    <template slot-scope="scope">
                        <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)" icon="el-icon-error">删除</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="id" width="100" label="ID" sortable>
                </el-table-column>
                <el-table-column prop="nickname" label="用户名" width="200" sortable>
                </el-table-column>
                <el-table-column prop="phone" label="手机号"  sortable>
                </el-table-column>
            </el-table>
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
    import {carsList,creatCars,updatacars,addCar,deleteCar,userList,updataOwner} from 'api';
    export default {
        data() {
            return {
                filters: {
                    id:'',
                    mod: '',
                    brand_id:'',
                    brand:'',
                    license: '',
                    colour: '',
                    mileage:'',
                    buy_time:'',
                    owner:'',
                    inspection_time:'',
                },
                total: 0,
                page: 1,
                levels: [],
                carsList:[],
                userYc:[],
                userSs:[],
                userIds:[],
                userIdst:[],
                userIdL:'',
                userLists:[],
                listLoading: false,
                sels: [],//列表选中列
                params:{
                    page:1
                },
                paramsd:{
                    page:1
                },
                para:{

                },
                map:new Map(),
                maps:new Map(),
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    //     name: [
                    //         {required: true, message: '品牌名称', trigger: 'blur'}
                    //     ]
                },
                //编辑界面数据
                editForm: {
                    id: 0,
                    license: '',
                    brand_id: '',
                    mod:'',
                    colour: '',
                    mileage:'',
                    buy_time:'',
                    inspection_time:'',
                },
                //增加
                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {user_id: [{required: true, message: '', trigger: 'blur'}]},
                //新增界面数据
                addForm: {
                    id:0,
                    nickname:'',
                    phone:'',
                    user_id: ''
                },
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.params.page = val;
                this.getPerList();
            },
            getSTimes(val) {
                this.editForm.buy_time = val;
            },
            getSTimee(val) {
                this.editForm.inspection_time = val;
            },
            getFilters(){
                // this.$nextTick(() =>{
                //     for(const i in this.addForm){
                //         this.addForm[i] = ''
                //     }
                // })
            },
            //获取用户列表
            getUsers() {
                if(typeof(this.addForm.user_id) == 'undefined'|| this.addForm.user_id ==""){
                    this.$message({
                        message: '请输入用户id',
                        type: 'warning'
                    });
                }else{
                    var params = [];
                    let result = 0 ;
                    params={user_id:this.addForm.user_id};
                    console.log(this.userSs);
                    if(this.userSs.length!=0 ){
                        for(var i=0;i<this.userSs.length;i++){
                            if( this.userSs[i].id ==this.addForm.user_id ){
                                result = 1;
                            }
                        }
                    };
                    if(result== 1){
                        this.$message({
                            message: '该用户已存在',
                            type: 'warning'
                        });
                    }else{
                        this.getListUser(params)
                    }
                }
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
                        this.carsList = res.data.cars
                        this.listLoading = false;
                    }
                })
            },
            handleAdd:function (index, row) {
                this.userIdst.splice(0,this.userIdst.length)
                this.userSs.splice(0,this.userSs.length); //清空数组
                this.addFormVisible = true
                this.addForm.id= row.id;
                this.userYc = row.owners
                if(this.userYc.length != 0){
                    this.userYc.forEach(it =>{
                        this.userSs.push(it)
                    })
                }
            },
            handleEdit:function (index, row) {
                this.editFormVisible = true
                this.editForm = Object.assign({}, row);
            },
            getListUser(params){
                this.listLoading = true;
                userList(params).then((res) => {
                    if(res.code === 1){
                        this.total = res.data.paging.total_pages
                        this.userIds = res.data.users
                        this.userIds.forEach(it =>{
                            this.userSs.push(it)
                        })
                        this.listLoading = false;
                    }
                })
            },
            //添加车主
            addSubmit: function () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            this.userSs.forEach(it => {   //循坏遍历数组
                                this.userIdst.push(it.id)
                            })
                            this.userIdL = this.userIdst.join(',')
                            updataOwner(this.addForm.id,this.userIdL).then((res) => {
                                this.addLoading = false;
                                if (res.code == 1) {
                                    this.$message({
                                        message: '提交成功',
                                        type: 'success'
                                    });

                                    this.$refs['addForm'].resetFields();
                                    this.addFormVisible = false;
                                    this.getPerList();
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
            //编辑
            editSubmit :function (index, row) {
                this.$refs.editForm.validate((valid) => {
                    let id = this.editForm.id
                    this.editLoading = true
                    updatacars(id,this.editForm.license,this.editForm.brand_id,this.editForm.mod,this.editForm.colour,this.editForm.mileage,this.editForm.buy_time,this.editForm.inspection_time).then(res => {
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
            // //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = row.id;
                    for (var i = 0; i < this.userSs.length; i++) {
                        if (this.userSs[i].id == para){
                            this.userSs.splice(i,1);
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                    }
                    this.listLoading = false;
                })
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
        },
        mounted() {
            this.getPerList();
        }
    }

</script>

<style scoped>

</style>