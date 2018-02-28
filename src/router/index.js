import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Cookies from 'js-cookie'
import Main from 'views/main/index'
import fullpath from './fullpath'
const Home = resolve => require([/* webpackChunkName:'Home'*/ 'views/Home.vue'], resolve)
const Login = resolve => require([/* webpackChunkName:'Login'*/'views/Login.vue'], resolve)
const NotFound = resolve => require([/* webpackChunkName:'404'*/'views/404.vue'], resolve)
let baseRoute = [
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
const register = {path: '/', component: Home, name: '注册管理', iconCls: 'el-icon-bulunu-user', children: []}
const content = {
    path: '/',
    component: Home,
    name: '内容管理',
    iconCls: 'el-icon-bulunu-content',
    children: []
}
const permis = {
    path: '/',
    component: Home,
    name: '管理权限',
    iconCls: 'el-icon-bulunu-permission',
    children: []
}
const cars = {
    path: '/',
    component: Home,
    name: '车辆管理',
    iconCls: 'el-icon-bulunu-cars',
    children: []
}
const settings = {
    path: '/',
    component: Home,
    name: '系统设定',
    iconCls: 'el-icon-bulunu-settings',
    children: []
}
fullpath.map(res =>{
    for (let i in res.children){
        if(Cookies.get('permissions')){
            let permissions = JSON.parse(Cookies.get('permissions'))
            for( let j in permissions){
                if(res.children[i].name === permissions[j].name){
                    switch (res.children[i].meta.childNo){
                        case 1001:
                            register.children.push(res.children[i])
                            break;
                        case 1002:
                            content.children.push(res.children[i])
                            break;
                        case 1003:
                            permis.children.push(res.children[i])
                            break;
                        case 1004:
                            cars.children.push(res.children[i])
                            break;
                        case 1005:
                            settings.children.push(res.children[i])
                            break;
                        default:
                            console.log('')
                    }
                }else{

                }
            }
        }
    }
})

let newRouters = baseRoute.concat(register,content,permis,cars,settings)

let router = new Router({
    routes: newRouters
});

router.beforeEach((to, from, next) => {
    let routeName = to.meta.name || to.name;
    window.document.title = routeName;
    next();
});

export default router;