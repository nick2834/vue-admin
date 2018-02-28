<template>
    <el-form ref="form" :model="form" label-width="100px" style="padding-top: 20px" :rules="pushRules">
        <el-form-item label="推送类型">
            <el-select v-model="selecLabel" placeholder="请选择推送类型" @change="selectChange">
                <el-option label="所有人" value="all"></el-option>
                <el-option label="单点推送" value="one"></el-option>
            </el-select>
        </el-form-item>
        <template v-if="selecLabel === 'one'">
            <el-form-item label="选择推送人">
                <el-form :inline="true" :model="filters" ref="filters">
                    <el-form-item>
                        <el-input v-model="filters.user_id" placeholder="用户ID" @focus="getFilters"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="filters.phone" placeholder="手机号" @focus="getFilters"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="filters.name"  placeholder="用户名" @focus="getFilters"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getUsers">查询</el-button>
                        <!--<el-button type="danger" @click="handelCancle">重置</el-button>-->
                    </el-form-item>
                </el-form>
            </el-form-item>
            <el-form-item label="推送人列表" v-show="detailist">
                <el-table ref="multipleTable" :data="userDetail" tooltip-effect="dark" style="width: 100%"
                          @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="id" label="用户ID" width="180"></el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="180"></el-table-column>
                    <el-table-column prop="phone" label="手机号"></el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item label="推送人" prop="uid">
                <el-input type="text" v-model="form.uid"></el-input>
            </el-form-item>
            <el-form-item label="推送内容" prop="content">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
        </template>
        <template v-else>
            <el-form-item label="推送内容" prop="content">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
        </template>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发送</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {movement, userList} from 'api'
    export default {
        data() {
            return {
                form: {
                    uid: '',
                    content: ''
                },
                selecLabel:'one',
                filters: {
                    user_id: '',
                    phone: '',
                    name: ''
                },
                map: new Map(),
                params: {},
                userDetail: [],
                detailist: false,
                userIdArr:[],
                pushRules:{
                    uid: [
                        { required: true, message: '用户ID必填', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '推送内容为必填项', trigger: 'change' }
                    ],
                }
            }
        },
        methods: {
            getUsers(){
                let that = this
                for (let i in that.filters) {
                    that.map.set(i, that.filters[i])
                }
                that.map.forEach((val, key, obj) => {
                    if (val === '') {
                        return
                    } else {
                        that.params[key] = val
                        that._initUser(that.params)
                    }
                })
            },
            _initUser(params){
                this.detailist = true
                userList(params).then(res => {
                    if (res.code === 1) {
                        this.userDetail = res.data.users
                    }
                })
            },
            handleSelectionChange(val) {
                val.map(res => {
                    this.userIdArr.push(res.id)
                    this.form.uid = this.userIdArr.join(',')
                })
            },
            handelCancle(){
                this.filters.user_id = ''
                this.filters.phone = ''
                this.filters.name = ''
                this.map.forEach((val, key, obj) => {
                    this.params[key] = ''
                })
                this.detailist = false
            },
            selectChange(){
                if(this.selecLabel === 'all'){
                    this.form.uid = 'all'
                }else{
                    this.form.uid = this.userIdArr.join(',')
                }
            },
            getFilters(){
                this.$nextTick( () => {
                    for (let i in this.filters) {
                        this.filters[i] = ''
                    }
                    this.handelCancle()
                })

            },
            onSubmit() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        movement(this.form).then(res =>{
                            if(res.code === 1){
                                this.$notify({
                                    title: '成功',
                                    message: res.msg,
                                    type: 'success',
                                    duration: 2000
                                })
                                this.loading = false
                            }else{
                                this.$notify({
                                    title: '失败',
                                    message: res.msg,
                                    type: 'danger',
                                    duration: 2000
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>

</style>