import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import './assets/theme/theme-darkblue/index.css'
import './assets/icon/iconfont.css'

import store from './store'
import router from './router/index'
import axios from 'axios'

Vue.use(ElementUI)
Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

