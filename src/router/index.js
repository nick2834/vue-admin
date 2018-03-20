import Vue from 'vue'
import Router from 'vue-router'
import Cookies from 'js-cookie'
import Main from 'views/main/index'
Vue.use(Router)
import {allPath,register,content,permis,cars,settings} from './fullpath'
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

allPath.map(res =>{
    if(document.cookie.indexOf('permissions') !== -1){
        let permissions = JSON.parse(Cookies.get('permissions'))
        permissions.map(response =>{
            if(res.name === response.name){
                // res['has'] = true
                // console.log(res)
                switch (res.meta.childNo){
                    case 1001:
                        register.children.push(res)
                        break;
                    case 1002:
                        content.children.push(res)
                        break;
                    case 1003:
                        permis.children.push(res)
                        break;
                    case 1004:
                        cars.children.push(res)
                        break;
                    case 1005:
                        settings.children.push(res)
                        break;
                    default:
                        console.log('')
                }
            }else{

            }
        })
    }else{

    }
})
let newRouters = baseRoute.concat(register,content,permis,cars,settings)

let router = new Router({
    routes: newRouters
});

router.beforeEach((to, from, next) => {
    let routeName = to.meta.name || to.name;
    window.document.title = routeName;
    if (to.path == '/login') {
        Cookies.set("loginInfo",false);
    }
    // let loginInfo = Cookies.get('loginInfo');
    let token=document.cookie.indexOf("authentication_token");
    if (token === -1 && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
});

export default router;


