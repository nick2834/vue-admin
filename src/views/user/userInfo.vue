<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding:0;border-bottom: 1px solid #eee;margin-bottom: 10px">
            <el-breadcrumb separator=">" style="line-height: 50px;">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/user' }">会员管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{userDetail.nickname}}</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <!--列表-->
        <el-col>
            <el-table :data="users" highlight-current-row v-loading="listLoading" border style="width: 100%;" size="medium">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="邀请码">
                                <span>{{ props.row.invitation_code}}</span>
                            </el-form-item>
                            <el-form-item label="内部用户">
                                <span>{{ fun.internal(props.row.internal_user)}}</span>
                            </el-form-item>
                            <el-form-item label="特殊身份">
                                <span>{{ props.row.tags }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="id" width="200" label="用户ID">
                </el-table-column>
                <el-table-column prop="nickname" label="用户名" width="250">
                </el-table-column>
                <el-table-column prop="phone" label="电话" width="250">
                </el-table-column>
                <el-table-column label="性别" width="200">
                    <template slot-scope="scope">
                        <span>{{fun.formatSex(scope.row.gender)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="注册时间" width="260">
                    <template slot-scope="scope">
                        <span>{{fun.data(scope.row.created_at)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="最后登录时间">
                    <template slot-scope="scope">
                        <span>{{fun.data(scope.row.created_at)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="第三方绑定">
                    <template slot-scope="scope">
                        <span @click="bindChange($event,'qq')" class="el-icon-bulunu-qq-copy"  :class="scope.row.bind_qq?'el-icon-active':'el-icon'"></span>
                        <span @click="bindChange($event,'wechat')" class="el-icon-bulunu-weixin-copy"  :class="scope.row.bind_wechat?'el-icon-active':'el-icon'"></span>
                        <span @click="bindChange($event,'weibo')" class="el-icon-bulunu-weibo"  :class="scope.row.bind_weibo?'el-icon-active':'el-icon'"></span>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <!--关注车辆-->
        <el-col>
            <el-col :span="24" class="toolbar" style="padding:0;border-bottom: 1px solid #eee;margin-bottom: 10px">
                <p>关注车辆</p>
            </el-col>
            <!--列表-->
            <el-table :data="following_cars" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" size="medium">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" width="200" label="车昵称" sortable>
                </el-table-column>
                <el-table-column prop="name" label="品牌" width="200" sortable>
                </el-table-column>
                <el-table-column prop="description" label="型号" width="200" sortable>
                </el-table-column>
                <el-table-column prop="description" label="颜色" width="200" sortable>
                </el-table-column>
                <el-table-column prop="description" label="购买时间" width="200" sortable>
                </el-table-column>
                <el-table-column prop="description" label="里程数" sortable>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col>
            <el-col :span="24" class="toolbar" style="padding:0;border-bottom: 1px solid #eee;margin-bottom: 10px">
                <p>拥有车辆</p>
            </el-col>
            <!--列表-->
            <el-table :data="owned_cars" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" width="200" label="车昵称" sortable>
                </el-table-column>
                <el-table-column prop="name" label="品牌" width="200" sortable>
                </el-table-column>
                <el-table-column prop="description" label="型号" width="200" sortable>
                </el-table-column>
                <el-table-column prop="description" label="颜色" width="200" sortable>
                </el-table-column>
                <el-table-column prop="description" label="购买时间" width="200" sortable>
                </el-table-column>
                <el-table-column prop="description" label="里程数"  sortable>
                </el-table-column>
            </el-table>
        </el-col>
    </section>
</template>

<script>
    import util from 'common/js/util'
    //import NProgress from 'nprogress'
    import {getUser,unbind} from 'api'
    import {state} from 'config/untils'
    export default {
        data () {
            return {
                userDetail: [],
                balance: '',
                sels: [],//列表选中列
                listLoading: false,
                fun: state,
                following_cars: [],
                owned_cars: [],
                tags: '',
                users:[]
            }
        },
        methods: {
            _getDetail() {
                let userInfo = new Array()
                const userId = this.$route.params.id
                getUser(userId).then(res => {
                    console.log(res)
                    if(res.code === 1){
                        userInfo.push(res.data.user)
                        this.userDetail = res.data.user
                        this.tags = this.userDetail.tags
                        this.following_cars = res.data.following_cars
                        this.owned_cars = res.data.owned_cars
                    }else{
                        this.$router.push({path: '/login'});
                    }
                }).catch(err =>{
                    this.$router.push({path: '/login'});
                })
                this.users = userInfo
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            bindChange(e,item){
                let id = this.userDetail.id
                let itemNames
                switch (item){
                    case 'qq':
                        itemNames = 'QQ'
                        break;
                    case 'wechat':
                        itemNames = '微信'
                        break;
                    case 'weibo':
                        itemNames = '微博'
                        break;
                    default:
                        itemNames = ''
                }
                if(e.target.className.indexOf('el-icon-active') < 0) {
                   return
                }
                this.$confirm('确认取消'+itemNames+'绑定吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    unbind(id,item).then(res =>{
                        if(res.code === 1){
                            this.users[0].bind_qq = res.data.user.bind_qq
                            this.users[0].bind_wechat = res.data.user.bind_wechat
                            this.users[0].bind_weibo = res.data.user.bind_weibo
                        }else{
                            this.$router.push({path: '/login'});
                        }
                    })
                }).catch(() => {
                    this.$router.push({path: '/login'});
                });
            }
        },
        mounted(){
            this._getDetail()
        },
        activated () {
            this._getDetail()
        }
    }

</script>

<style scoped>
    .el-table th {
        text-align: center;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 33.3333%;
        text-align: center;
    }
    .el-icon-active{
        font-size: 20px;
        color: red;
    }
    .el-icon{
        font-size: 20px;
        cursor: pointer;
    }
</style>