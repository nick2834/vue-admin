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

export default [
    {
        path: '/',
        component: (resolve) => require([/* webpackChunkName:'Home'*/ 'views/Home.vue'], resolve),
        name: '注册管理',
        iconCls: 'el-icon-bulunu-user',
        children: [
            {
                path: '/user',
                component: user,
                name: '会员管理',
                meta:{
                    auth:false,
                    childNo:1001
                }
            },
            {
                path: '/userInfo/:id',
                component: userInfo,
                name: '用户详情页',
                hidden: true,
                meta:{
                    auth:false,
                    childNo:1001
                }
            }
        ]
    },
    {
        path: '/',
        component: (resolve) => require([/* webpackChunkName:'Home'*/ 'views/Home.vue'], resolve),
        name: '内容管理',
        iconCls: 'el-icon-bulunu-content',
        children: [
            {
                path: '/topic',
                component: topic,
                name: '话题管理',
                meta:{
                    auth:false,
                    childNo:1002
                }
            },
            {
                path: '/createtopic',
                component: createtopic,
                name: '创建话题',
                hidden:true,
                meta:{
                    auth:false,
                    childNo:1002
                }
            },
            {
                path: '/edittopic/:id',
                component: edittopic,
                name: '话题详情',
                hidden: true,
                meta:{
                    auth:false,
                    childNo:1002
                }
            },
            {
                path: '/comment',
                component: comment,
                name: '评论管理',
                meta:{
                    auth:false,
                    childNo:1002
                }
            },
            {
                path: '/activity',
                component: activity,
                name: '活动管理',
                meta:{
                    auth:false,
                    childNo:1002
                }
            },
            {
                path: '/integral',
                component: integral,
                name: '积分管理',
                meta:{
                    auth:false,
                    childNo:1002
                }
            },
            {
                path: '/tags',
                component: tags,
                name: '标签管理',
                meta:{
                    auth:false,
                    childNo:1002
                }
            },
            {
                path: '/push',
                component: push,
                name: '推送管理',
                meta:{
                    auth:false,
                    childNo:1002
                }
            }
        ]
    },
    {
        path: '/',
        component: (resolve) => require([/* webpackChunkName:'Home'*/ 'views/Home.vue'], resolve),
        name: '管理权限',
        iconCls: 'el-icon-bulunu-permission',
        children: [
            {
                path: '/role',
                component: Role,
                name: '权限组管理',
                meta:{
                    auth:false,
                    childNo:1003
                }
            },
            {
                path: '/permission',
                component: Permission,
                name: '权限管理',
                meta:{
                    auth:false,
                    childNo:1003
                }
            },
            {
                path: '/manager',
                component: Manager,
                name: '后台用户管理',
                meta:{
                    auth:false,
                    childNo:1003
                }
            },
        ]
    },
    {
        path: '/',
        component: (resolve) => require([/* webpackChunkName:'Home'*/ 'views/Home.vue'], resolve),
        name: '车辆管理',
        iconCls: 'el-icon-bulunu-cars',
        children: [
            {
                path: '/brand',
                component: brand,
                name: '品牌管理',
                meta:{
                    auth:false,
                    childNo:1004
                }
            },
            {
                path: '/info',
                component: info,
                name: '信息管理',
                meta:{
                    auth:false,
                    childNo:1004
                }
            },
            {
                path: '/data',
                component: data,
                name: '数据字典',
                meta:{
                    auth:false,
                    childNo:1004
                }
            }
        ]
    },
    {
        path: '/',
        component: (resolve) => require([/* webpackChunkName:'Home'*/ 'views/Home.vue'], resolve),
        name: '系统设定',
        iconCls: 'el-icon-bulunu-settings',
        children: [
            {
                path: '/setting',
                component: setting,
                name: '系统设置',
                meta:{
                    auth:false,
                    childNo:1005
                }
            },
            {
                path: '/maps',
                component: maps,
                name: '高德地图',
                meta:{
                    auth:false,
                    childNo:1005
                }
            },
            {
                path: '/editor',
                component: editor,
                name: '编辑器',
                meta:{
                    auth:false,
                    childNo:1005
                }
            },
            {
                path: '/daily',
                component: daily,
                name: '日报',
                meta:{
                    auth:false,
                    childNo:1005
                }
            }
        ]
    }
];