import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/theme/theme-darkblue/index.css'
import './assets/icon/iconfont.css'

import store from './store'
import router from './router'

import axios from 'axios'
import Cookies from 'js-cookie'

Vue.use(ElementUI)
Vue.prototype.$http = axios
//权限指令
Vue.directive('has', {
    bind: function (el, binding) {
        if (!Vue.prototype.$_has(binding.value)) {
            el.parentNode.removeChild(el);
        }
    }
});

router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        Cookies.set("loginInfo", false);
    }
    let loginInfo = Cookies.get('loginInfo');
    if (!loginInfo && to.path != '/login') {
        next({path: '/login'})
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

