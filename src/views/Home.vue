<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" @click="goHome()">
                <!--{{collapsed?'':sysName}}-->
                <img v-if="collapsed" src="../assets/app.png">
                <p style="margin: 0" v-else>{{sysName}}</p>
            </el-col>
            <el-col :span="10">
                <div class="tools" @click.prevent="collapse">
                    <i class="bars el-icon-bulunu-menu"></i>
                </div>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <!--<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>-->
                    <span class="el-dropdown-link userinfo-inner"><img src="../assets/user.png"/> {{name}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="main" tag="span">主页</router-link>
                        </el-dropdown-item>
                        <!--<el-dropdown-item v-show="adminNums == '946572274219'" @click.native="addAdmin">添加管理员</el-dropdown-item>-->
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
                <!--导航菜单-->
                <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleOpen"
                         @close="handleClose" @select="handleselect"
                         unique-opened router v-show="!collapsed">
                    <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
                        <el-submenu :index="index+''" v-if="!item.leaf && item.children.length >= 1">
                            <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
                            <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path"
                                          v-if="!child.hidden">{{child.name}}
                            </el-menu-item>
                        </el-submenu>
                        <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i
                                :class="item.iconCls"></i>{{item.children[0].name}}
                        </el-menu-item>
                    </template>
                </el-menu>
                <!--导航菜单-折叠后-->
                <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
                    <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
                        <template v-if="!item.leaf">
                            <div class="el-submenu__title" v-if="item.children.length >= 1" style="padding-left: 20px;" @mouseover="showMenu(index,true)"
                                 @mouseout="showMenu(index,false)">
                                <i :class="item.iconCls"></i>
                            </div>
                            <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"
                                @mouseout="showMenu(index,false)">
                                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path"
                                    class="el-menu-item" style="padding-left: 40px;"
                                    :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">
                                    {{child.name}}
                                </li>
                            </ul>
                        </template>
                        <template v-else>
                    <li class="el-submenu">
                        <el-tooltip placement="right">
                            <span slot="content">{{item.name}}</span>
                            <div class="el-submenu__title el-menu-item"
                                 style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                                 :class="$route.path==item.children[0].path?'is-active':''"
                                 @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i>
                            </div>
                        </el-tooltip>
                    </li>
                    </template>
                </li>
            </ul>
        </aside>

        <section class="content-container">
            <tag-view></tag-view>
            <div class="grid-content bg-purple-light main_content_wrapper">
                <!--<el-col :span="24" class="breadcrumb-container">-->
                <!--<strong class="title">{{$route.name}}</strong>-->
                <!--<el-breadcrumb separator="/" class="breadcrumb-inner">-->
                <!--<el-breadcrumb-item v-for="item in $route.matched" :key="item.path">-->
                <!--{{ item.name }}-->
                <!--</el-breadcrumb-item>-->
                <!--</el-breadcrumb>-->
                <!--</el-col>-->
                <el-col :span="24" class="content-wrapper">
                    <transition name="fade" mode="out-in">
                        <keep-alive>
                            <router-view/>
                        </keep-alive>
                    </transition>
                </el-col>
            </div>
        </section>
        </el-col>

        <!--新增界面-->
        <el-dialog title="添加管理员" v-model="addAdmins" :close-on-click-modal="false">
            <el-form :model="addAdministrator" label-width="80px" ref="addForm" :rules="addAdmForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="addAdministrator.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addAdministrator.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="addAdministrator.sex">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addAdmins = false">取消</el-button>
                <el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    import { mapGetters } from 'vuex'
    import global from "components/tools/Global"
    import TagView from "components/TagView"
    import {addAdmins} from 'api'
    import Cookies from 'js-cookie'
    import {getToken, setToken, removeToken} from 'untils/auth'
    export default {
        computed: mapGetters([
            'name',
            'avatar'
        ]),
        data() {
            return {
                sysName: 'Bulunu 管理后台',
                collapsed: true,
                sysUserName: '',
                sysUserAvatar: '',
                addAdmins: false,
                addLoading: false,
                //新增界面数据
                addAdministrator: {
                    name: '',
                    password: '',
                    sex: '男'
                },
                addAdmForm: {
                    name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                },
                menuList: [],
                menuHasList: [],
                menuHiddenList: [],
                permissions: []
            }
        },
        components: {TagView},
        methods: {
            handleOpen() {
                console.log('handleopen');
            },
            handleClose() {
                console.log('handleclose');
            },
            handleselect: function (a, b) {
            },
            //退出登录
            logout: function () {
                var _this = this;
                this.$confirm('确认退出吗?', '提示', {
                    type: 'warning'
                }).then(() => {
//                    this.$store.dispatch('LogOut').then(() => {
//                        _this.$router.push('/login');
//                    })
                    baseCookie.clearInfo()
                    removeToken('refresh')
                    removeToken('userInfo')
                    _this.$router.push('/login');
                }).catch(() => {

                });
            },
            //折叠导航栏
            collapse: function () {

                this.collapsed = !this.collapsed;
            },
            showMenu(i, status){
                this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none';
            },
            goHome: function () {
                this.$router.push({path: '/main'});
            },
            addAdmin () {
                this.addAdmins = true
            },
            addSubmit () {
                this.$refs.addForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            this.addLoading = true;
                            let para = Object.assign({}, this.addAdministrator)
                            let sex = '', params = ''
                            if (para.sex === '男') {
                                sex = 'male'
                            } else {
                                sex = 'female'
                            }
                            addAdmins(para.name, para.password, sex).then(res => {
                                this.addLoading = false;
                                //NProgress.done();
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addAdmins = false;
                            })
                        });
                    }
                });
            },
            homeInit(){
                if (getToken('authentication_token')) { //为真
                    this.sysUserName = this.$store.getters.name
                    this.sysUserAvatar = baseImgUrl + getToken('avatar')
                } else { //为假
                    this.$router.push({path: '/login'});
                }
                if (this.$route.path === '/') {
                    this.$router.push({path: '/main'});
                }
            }
        },
        mounted() {
            this.homeInit()
        }
    }

</script>

<style scoped lang="scss" type="text/scss">
    @import '~scss_vars';

    .container {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
        .header {
            height: 60px;
            line-height: 60px;
            background: #fff;
            color: #333;
            .userinfo {
                text-align: right;
                padding-right: 35px;
                float: right;
                .userinfo-inner {
                    cursor: pointer;
                    color: #333;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 20px;
                        margin: 10px 0px 10px 10px;
                        float: right;
                    }
                }
            }
            .logo {
                width: 230px;
                height: 60px;
                font-size: 22px;
                padding-left: 20px;
                padding-right: 20px;
                border-color: rgba(238, 241, 146, 0.3);
                border-right-width: 1px;
                border-right-style: solid;
                text-align: center;
                color: #333;
                img {
                    width: 40px;
                    float: left;
                    margin: 10px 10px 10px 18px;
                }
                .txt {
                    color: #fff;
                }
            }
            .logo-width {
                width: 230px;
            }
            .logo-collapse-width {
                width: 60px;
                padding: 0;
            }
            .tools {
                padding: 0px 23px;
                width: 14px;
                height: 60px;
                line-height: 60px;
                cursor: pointer;
                color: white;
                text-align: center;
                .bars {
                    width: 30px;
                    height: 30px;
                    background-color: #1AA094;
                    line-height: 30px;
                }
            }
        }
        .main {
            display: flex;
            // background: #324057;
            position: absolute;
            top: 60px;
            bottom: 0px;
            overflow: hidden;
            aside {
                flex: 0 0 230px;
                width: 230px;
                background-color: #393D49;
                // position: absolute;
                // top: 0px;
                // bottom: 0px;
                .el-menu {
                    height: 100%;
                    background-color: #393D49;
                    color: #c2c2c2;
                    .el-submenu {
                        color: #c2c2c2;
                    }
                }
                .collapsed {
                    width: 60px;
                    .item {
                        position: relative;
                    }
                    .submenu {
                        position: absolute;
                        top: 0px;
                        left: 60px;
                        z-index: 99999;
                        height: auto;
                        display: none;
                    }

                }
            }
            .menu-collapsed {
                flex: 0 0 60px;
                width: 60px;
            }
            .menu-expanded {
                flex: 0 0 230px;
                width: 230px;
                .el-menu-vertical-demo {
                    width: 230px !important;
                }
            }
            .content-container {
                // background: #f1f2f7;
                flex: 1;
                border-left: 2px solid #1AA094;
                border-top: 5px solid #1AA094;
                // position: absolute;
                // right: 0px;
                // top: 0px;
                // bottom: 0px;
                // left: 230px;
                overflow-y: scroll;
                .breadcrumb-container {
                    //margin-bottom: 15px;
                    .title {
                        width: 200px;
                        float: left;
                        color: #475669;
                    }
                    .breadcrumb-inner {
                        float: right;
                    }
                }
                .main_content_wrapper {
                    padding: 0 20px;
                    overflow: hidden;
                }
                .content-wrapper {
                    /*padding: 20px;*/
                    background-color: #fff;
                    box-sizing: border-box;
                }
            }
        }
    }
</style>