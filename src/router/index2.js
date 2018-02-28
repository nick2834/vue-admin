import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const Home = resolve => require([/* webpackChunkName:'Home'*/ 'views/Home.vue'], resolve)
const Login = resolve => require([/* webpackChunkName:'Login'*/'views/Login.vue'], resolve)
const NotFound = resolve => require([/* webpackChunkName:'404'*/'views/404.vue'], resolve)
// const Main = resolve => require([/* webpackChunkName:'Main'*/'views/main/index'], resolve)
import Main from 'views/main/index'
const user = resolve => require([/* webpackChunkName:'user'*/'views/user/user.vue'], resolve)
const userInfo = resolve => require(['views/user/userInfo.vue'], resolve)
const topic = resolve => require(['views/content/topic.vue'], resolve)
// const createtopic = resolve => require(['views/content/form/create.vue'], resolve)
const createtopic = resolve => require(['views/content/createTopic.vue'], resolve)
const edittopic = resolve => require(['views/content/topicDetail.vue'], resolve)
const comment = resolve => require(['views/content/comment.vue'], resolve)
const commentDetail = resolve => require(['views/content/commentDetail.vue'], resolve)
const activity = resolve => require(['views/content/activity.vue'], resolve)
const integral = resolve => require(['views/content/integral.vue'], resolve)
const tags = resolve => require(['views/content/tags.vue'], resolve)
const push = resolve => require(['views/content/push.vue'], resolve)
const Role = resolve => require(['views/permission/role.vue'], resolve)
const Permission = resolve => require(['views/permission/permission.vue'], resolve)
const Manager = resolve => require(['views/permission/manager.vue'], resolve)
const brand = resolve => require(['views/cars/brand.vue'], resolve)
const info = resolve => require(['views/cars/info.vue'], resolve)
const data = resolve => require(['views/cars/data.vue'], resolve)
const setting = resolve => require(['views/setting/settings.vue'], resolve)
const maps = resolve => require(['views/setting/maps.vue'], resolve)
const editor = resolve => require(['components/editor/index.vue'], resolve)
const daily = resolve => require(['views/setting/daily.vue'], resolve)
const routes = [
    {
        path: '/login',
        component: Login,
        name: '登录',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '页面不存在',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '主页',
        iconCls: 'el-icon-bulunu-dashboard',
        leaf: true,//只有一个节点
        children: [
            {
                path: '/main',
                component: Main,
                name: '首页',
                meta: {keepAlive: true,auth:false}
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '注册管理',
        iconCls: 'el-icon-bulunu-user',
        children: [
            {
                path: '/user',
                component: user,
                name: '会员管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/userInfo/:id',
                component: userInfo,
                name: '用户详情页',
                hidden: true,
                meta:{
                    auth:false
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '内容管理',
        iconCls: 'el-icon-bulunu-content',
        children: [
            {
                path: '/topic',
                component: topic,
                name: '话题管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/createtopic',
                component: createtopic,
                name: '创建话题',
                hidden:true,
                meta:{
                    auth:false
                }
            },
            {
                path: '/edittopic/:id',
                component: edittopic,
                name: '话题详情',
                hidden: true,
                meta:{
                    auth:false
                }
            },
            {
                path: '/comment',
                component: comment,
                name: '评论管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/activity',
                component: activity,
                name: '活动管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/integral',
                component: integral,
                name: '积分管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/tags',
                component: tags,
                name: '标签管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/push',
                component: push,
                name: '推送管理',
                meta:{
                    auth:false
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理权限',
        iconCls: 'el-icon-bulunu-permission',
        children: [
            {
                path: '/role',
                component: Role,
                name: '权限组管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/permission',
                component: Permission,
                name: '权限管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/manager',
                component: Manager,
                name: '后台用户管理',
                meta:{
                    auth:false
                }
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '车辆管理',
        iconCls: 'el-icon-bulunu-cars',
        children: [
            {
                path: '/brand',
                component: brand,
                name: '品牌管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/info',
                component: info,
                name: '信息管理',
                meta:{
                    auth:false
                }
            },
            {
                path: '/data',
                component: data,
                name: '数据字典',
                meta:{
                    auth:false
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统设定',
        iconCls: 'el-icon-bulunu-settings',
        children: [
            {
                path: '/setting',
                component: setting,
                name: '系统设置',
                meta:{
                    auth:false
                }
            },
            {
                path: '/maps',
                component: maps,
                name: '高德地图',
                meta:{
                    auth:false
                }
            },
            {
                path: '/editor',
                component: editor,
                name: '编辑器',
                meta:{
                    auth:false
                }
            },
            {
                path: '/daily',
                component: daily,
                name: '日报',
                meta:{
                    auth:false
                }
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    },
    {
        path: '/',
        hidden: true,
        redirect: {path: '/main'}
    }
];
export default new Router({
    routes
})