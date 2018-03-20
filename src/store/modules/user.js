import {usersLogin} from 'api'
import {getToken, setToken, removeToken, setAllCookies} from 'untils/auth'
import {Message} from 'element-ui'

const user = {
    state: {
        user: '',
        status: '',
        code: '',
        token: 'Token token=' + getToken('authentication_token') + ',phone=' + getToken('phone'),
        name: getToken('nickname'),
        avatar: '',
        introduction: '',
        roles: [],
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_CODE: (state, code) => {
            state.code = code
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting
        },
        SET_STATUS: (state, status) => {
            state.status = status
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        // 用户名登录
        LoginByUsername({commit}, userInfo) {
            const username = userInfo.account
            const password = userInfo.checkPass
            return new Promise((resolve, reject) => {
                usersLogin(username, password).then(response => {
                    const users = response.data.user
                    if (response.code == 1) {
                        Message.success('登陆成功')
                        setToken("loginInfo", "true")
                        commit('SET_TOKEN', 'Token token=' + users.authentication_token + ',phone=' + users.phone)
                        commit('SET_NAME', users.nickname)
                        commit('SET_AVATAR', users.avatar)
                        setAllCookies(users)
                    } else {
                        Message.error('账号或密码错误')
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        LogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_NAME', '')
                commit('SET_AVATAR', '')
                removeToken('refresh')
                removeToken('userInfo')
                baseCookie.clearInfo()
                resolve()
            })
        },

        // 动态修改权限
        // ChangeRole({ commit }, role) {
        //     return new Promise(resolve => {
        //         commit('SET_TOKEN', role)
        //         setToken(role)
        //         getUserInfo(role).then(response => {
        //             const data = response.data
        //             commit('SET_ROLES', data.role)
        //             commit('SET_NAME', data.name)
        //             commit('SET_AVATAR', data.avatar)
        //             commit('SET_INTRODUCTION', data.introduction)
        //             resolve()
        //         })
        //     })
        // }
    }
}

export default user
