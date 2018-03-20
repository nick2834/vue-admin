<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="数据名"></el-input>
                </el-form-item>
                <el-form-item>
                    <!--<el-input v-model="filters.type" placeholder="类型名" ></el-input>-->
                    <el-select v-model="filters.type" clearable  placeholder="请选择类型名">
                        <el-option
                                v-for="(item,key) in types"
                                :key="key"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="_getList">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="dictionaries" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
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
            <el-table-column prop="name" label="数据名" width="300" sortable>
            </el-table-column>
            <el-table-column prop="dic_type" label="类型名" sortable>
            </el-table-column>
        </el-table>

        <!--编辑界面-->
        <el-dialog title="编辑数据字典" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="数据" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="editForm.dic_type" clearable placeholder="请选择">
                        <el-option
                                v-for="(item,key) in types"
                                :key="key"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>

        <!--新增界面-->
        <el-dialog title="新增字典" v-model="addFormVisible" :close-on-click-modal="false">
            <el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
                <el-form-item label="数据" prop="description">
                    <el-input type="text" v-model="addForm.name"></el-input>
                </el-form-item>
                <el-form-item label="类型">
                    <el-select v-model="addForm.dic_type" clearable  filterable allow-create placeholder="请选择">
                        <el-option
                                v-for="item,index in types"
                                :key="index"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
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
    import {dictionariesList,dictionariesType,updateDictionaries,addDictionaries} from 'api';
    var map
    export default {
        data() {
            return {
                value: '',
                filters: {
                    name: '',
                    type:'report'
                },
                total: 0,
                page: 1,
                ite:'',
                types:[],
                dictionaries: [],
                lis:[],
                listLoading: false,
                sels: [],//列表选中列
                list:null,
                map:new Map(),
                params:{
                    page:1
                },

                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '数据类型', trigger: 'blur'}
                    ],
                    dic_type:[
                        {required: true, message: 'type类型', trigger: 'blur'}
                    ]
                },
                //编辑界面数据
                editForm: {
                    id: '',
                    name: '',
                    description: '',
                    dic_type: ''
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '数据类型', trigger: 'blur'}
                    ]
                },
                //新增界面数据
                addForm: {
                    id: '',
                    name: '',
                    description: '',
                    dic_type: ''
                }
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.params.page = val;
                this._getList(this.params.page);
            },
            //数据字典列表
            getPerList() {
                dictionariesType().then(res =>{
                    this.types= res.data.dictionary.type
                })
            },
            getdicList(params){
                this.listLoading = true;
                dictionariesList(params).then(res => {
                    this.dictionaries = res.data.dictionaries
                    // this.lis.splice(0,this.lis.length); //清空数组
                    this.listLoading = false
                    this.total = res.data.paging.total_pages
                })
            },

            //获取用户列表
            _getList() {
                let that = this
                for(const i in that.filters){
                    that.map.set(i, that.filters[i])
                    that.map.forEach((val, key, obj) => {
                        that.params[key] = val
                    })
                }
                this.getdicList(this.params),
                this.getPerList()
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
                    updateDictionaries(this.editForm.id,this.editForm.name,this.editForm.dic_type,this.editForm.description).then(res => {
                        this.editLoading = false;
                        if (res.code == 1) {
                            this.$message({
                                message: '更新成功',
                                type: 'success'
                            });
                            this._getList()
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
                        this._getList();
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
                        this._getList();
                    });
                }).catch(() => {

                });
            },
            handleAdd () {
                this.addFormVisible = true;
                this.addForm = Object.assign({}, row);
            },
            //增加数据字典
            addSubmit () {
                if(this.addForm.name == null || this.addForm.name == ''){
                    this.$message({
                        message: '请填写数据名称',
                        type: 'warning'
                    });
                }else {
                    this.$refs.addForm.validate((valid) => {
                        if (valid) {
                            this.addLoading = true
                            addDictionaries(this.addForm.name, this.addForm.description, this.addForm.dic_type).then(res => {
                                this.addLoading = false;
                                if (res.code == 1) {
                                    this.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    });
                                    this.$refs['addForm'].resetFields()
                                    this._getList()
                                    this.addFormVisible = false
                                } else {
                                    this.$message({
                                        message: '请填写全部信息',
                                        type: 'error'
                                    });
                                }
                            })
                        }
                    })
                }
            }
        },
        mounted() {
            this._getList();
        }
    }

</script>

<style scoped>

</style>