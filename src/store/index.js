import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import tagsView from './modules/tagsView'
import app from './modules/app'
import user from './modules/user'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        tagsView,
        user
    },
    getters
})

export default store

