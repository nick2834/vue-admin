import axios from 'axios'
import global from 'components/tools/Global'
const token = global.getTokentoken()
axios.interceptors.request.use(config => {
        if (token) {
            config.headers.Authorization = token
        } else {
            router.replace({
                path: 'login',
                query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
            })
        }
        return config
    },
    err => {
        return Promise.reject(err)
    })
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data)
    })
export const options = {
    domain: baseUrl,
    tokenUrl: process.env.API_HOST + 'v1/utilities/uploadtoken.json',
    prefix: '/res/ugc/'
}
//通用设定
const instance = axios.create({
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

//需要登录才可访问的请求设定
const uploadInstance = axios.create({
    timeout: 20000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
//登录
export const usersLogin = (phone, pwd) => {
    return instance.post(process.env.API_HOST + 'system/sessions.json?user[name]=' + phone + '&user[password]=' + pwd).then(res => res.data)
}
//统计接口
export const statistic = (para) => {
    para = para || '';
    return axios.get(process.env.API_HOST + `system/statistics/topic.json` + para).then(res => res.data)
}
//用户
export const userList = (params) => {
    return axios.get(process.env.API_HOST + `system/users.json`, {params: params}).then(res => res.data)
}
//设置内部用户
export const InternalUsers = (id) => {
    const data = {
        user_id: id
    }
    return axios.post(process.env.API_HOST + 'system/users/internal.json', data).then(res => res.data)
}
//设置特殊身份
export const Identity = (id, iden) => {
    const data = {
        identity: iden
    }
    return axios.put(process.env.API_HOST + '/system/users/' + id + '/identity.json', data).then(res => res.data)
}
//注销用户
export const logOutUser = (id) => {
    return axios.delete(process.env.API_HOST + 'system/users/' + id + '.json').then(res => res.data)
}
//添加后台管理员
export const addAdmins = (name, pwd, gender) => {
    return axios.post(process.env.API_HOST + 'system/users.json?user[name]=' + name + '&user[password]=' + pwd + '&user[gender]=' + gender).then(res => res.data)
}
//用户详情
export const getUser = (userId) => {
    return axios.get(process.env.API_HOST + `system/users/` + userId + `.json`).then(res => res.data)
}
//第三方绑定
export const unbind = (userId, item) => {
    const data = {
        source: item
    }
    return axios.post(process.env.API_HOST + `system/users/` + userId + `/unbind.json`, data).then(res => res.data)
}
//角色列表
export const roleList = (params) => {
    return axios.get(process.env.API_HOST + `system/roles.json`, {params: params}).then(res => res.data)
}
//角色详情
export const roleDetail = (id) => {
    return axios.get(process.env.API_HOST + `system/roles/` + id + `.json`).then(res => res.data)
}
//创建角色
export const createRole = (name, des, roleType) => {
    const data = {
        name: name,
        description: des,
        role_type: roleType
    }
    return axios.post(process.env.API_HOST + 'system/roles.json?', data).then(res => res.data)
}
//编辑角色
export const reloadRole = (id, name, des, roleType) => {
    const data = {
        name: name,
        description: des,
        role_type: roleType
    }
    return axios.patch(process.env.API_HOST + `system/roles/` + id + `.json?`, data).then(res => res.data)
}
//设置角色权限
export const setRolePermissions = (id, pid) => {
    const data = {
        pid: pid
    }
    return axios.post(process.env.API_HOST + `system/roles/` + id + `/permissions/add.json`, data).then(res => res.data)
}
//删除角色
export const deleteRole = (id) => {
    return axios.delete(process.env.API_HOST + `system/roles/` + id + `.json`).then(res => res.data)
}
//设置用户角色
export const setRole = (id, rid) => {
    const data = {
        rid: rid
    }
    return axios.post(process.env.API_HOST + `system/users/` + id + `/roles/add.json`, data).then(res => res.data)
}
//删除用户角色
export const removeRole = (id) => {
    return axios.post(process.env.API_HOST + `system/users/` + id + `/roles/remove.json`).then(res => res.data)
}
//设置角色权限
export const setPermission = (id, pid) => {
    const data = {
        pid: pid
    }
    return axios.post(process.env.API_HOST + `system/roles/` + id + `/permissions/add.json`, data).then(res => res.data)
}
//删除角色权限
export const removePermission = (id) => {
    return axios.post(process.env.API_HOST + `system/roles/` + id + `/permissions/remove.json`).then(res => res.data)
}
//权限列表
export const permissions = (params) => {
    return axios.get(process.env.API_HOST + `system/permissions.json`, {params: params}).then(res => res.data)
}
//权限详情
export const permissionsDetail = (id) => {
    return axios.get(process.env.API_HOST + `system/permissions/` + id + `.json`).then(res => res.data)
}
//创建权限
export const createPermission = (data) => {
    return axios.post(process.env.API_HOST + `system/permissions.json`, data).then(res => res.data)
}
//编辑权限
export const reloadPermissions = (id, name, des, perType) => {
    const data = {
        name: name,
        description: des,
        permission_type: perType
    }
    return axios.patch(process.env.API_HOST + `system/permissions/` + id + `.json`, data).then(res => res.data)
}
//删除权限
export const deletePermissions = (id) => {
    return axios.delete(process.env.API_HOST + `system/permissions/` + id + `.json`).then(res => res.data)
}
//话题列表
export const topicList = (params) => {
    return axios.get(process.env.API_HOST + `system/topics.json`, {params: params}).then(res => res.data)
}
//话题详情
export const topicDetail = (id) => {
    return axios.get(process.env.API_HOST + `system/topics/` + id + `.json`).then(res => res.data)
}
//更新话题PATCH http://<hostname>/system/topics/<id>.json
export const updateTopic = (id, data) => {
    return axios.patch(process.env.API_HOST + `system/topics/` + id + `.json`, data).then(res => res.data)
}
//创建话题
export const createTopic = (data) => {
    return axios.post(process.env.API_HOST + `/v1/topics.json`, data).then(res => res.data)
}
//修改话题状态
export const changeStatus = (id, status) => {
    const data = {
        status: status
    }
    return axios.put(process.env.API_HOST + `system/topics/` + id + `/status.json`, data).then(res => res.data)
}
//评论管理
export const commentsList = (params) => {
    return axios.get(process.env.API_HOST + `system/comments.json`, {params: params}).then(res => res.data)
}
//修改评论的状态
export const commentStatus = (id, status) => {
    const data = {
        status: status
    }
    return axios.put(process.env.API_HOST + `system/comments/` + id + `/status.json`, data).then(res => res.data)
}
//修改评论
export const updataComments = (id, content, comment_type) => {
    const data = {
        content: content,
        comment_type: comment_type
    }
    return axios.patch(process.env.API_HOST + `system/comments/` + id + `.json`, data).then(res => res.data)
}
//视频上传
export const uploadVideo = (imgfile) => {
    const data = {imgfile: imgfile}
    return uploadInstance.post(process.env.API_HOST + `v1/utilities/uploadvideo.json`, data).then(res => res.data)
}
//图片上传
export const uploadImages = (videofile) => {
    const data = {videofile: videofile}
    return uploadInstance.post(process.env.API_HOST + `v1/utilities/uploadimage.json`, data).then(res => res.data)
}
//七牛地址
export const getQiniuToken = params => {
    return instance.get(process.env.API_HOST + `v1/utilities/uploadtoken.json`, {params: params}).then(res => res.data)
}
//标签列表
export const tagsList = (params) => {
    return axios.get(process.env.API_HOST + `system/tags.json`, {params: params}).then(res => res.data)
}
//创建标签
export const creatTags = (name, description, author_id) => {
    return axios.post(process.env.API_HOST + `system/tags.json?name=` + name + '&description=' + description + '&author_id=' + author_id).then(res => res.data)
}
//更新标签信息
export const updataTags = (id, name, description) => {
    const data = {
        name: name,
        description: description
    }
    return axios.patch(process.env.API_HOST + 'system/tags/' + id + '.json', data).then(res => res.data)
}
//删除标签
export const deleteTags = (id) => {
    return axios.delete(process.env.API_HOST + 'system/tags/' + id + '.json').then(res => res.data)
}
//消息推送
export const movement = (params) => {
    return axios.post(process.env.API_HOST + 'system/notifications/push.json', params).then(res => res.data)
}
//数据字典列表
export const dictionariesList = (type, name) => {
    return axios.get(process.env.API_HOST + 'system/dictionaries.json?type=' + type + '&name=' + name).then(res => res.data)
}
//获取字典类型
export const dictionariesType = () => {
    return axios.get(process.env.API_HOST + 'system/dictionaries/type.json').then(res => res.data)
}
//跟新字典
export const updateDictionaries = (id, name, dic_type, description) => {
    return axios.patch(process.env.API_HOST + 'system/dictionaries/' + id + '.json?name=' + name + '&dic_type=' + dic_type + '&description=' + description).then(res => res.data)
}
//新增字典
export const addDictionaries = (name, description, type) => {
    return axios.post(process.env.API_HOST + 'system/dictionaries.json?name=' + name + '&description=' + description + '&type=' + type).then(res => res.data)
}
//活动列表
export const activitiesList = (title, id) => {
    return axios.get(process.env.API_HOST + 'system/activities.json?title = ' + title + '&id = ' + id).then(res => res.data)
}
//活动详情页面
export const activitiesDetail = (id) => {
    return axios.get(process.env.API_HOST + `system/activities/` + id + `.json`).then(res => res.data)
}
//创建活动
export const createActivities = (title, description, name, poster_url, icon_url, website_url, online_at, offline_at) => {

    const data = {
        title: title,
        description: description,
        name: name,
        poster_url: poster_url,
        icon_url: icon_url,
        website_url: website_url,
        online_at: online_at,
        offline_at: offline_at

    }
    return axios.post(process.env.API_HOST + `system/activities.json`, data).then(res => res.data)
}
//修改活动
export const updateActivities = (id, title, description, name, poster_url, icon_url, website_url, online_at, offline_at) => {
    const data = {
        id: id,
        title: title,
        description: description,
        name: name,
        poster_url: poster_url,
        icon_url: icon_url,
        website_url: website_url,
        online_at: online_at,
        offline_at: offline_at

    }
    return axios.patch(process.env.API_HOST + 'system/activities/' + id + '.json', data).then(res => res.data)
}
//积分列表
export const creditsList = (nickname, user_id, phone) => {
    return axios.get(process.env.API_HOST + 'system/credits.json?nickname=' + nickname + '&user_id=' + user_id + '&phone=' + phone).then(res => res.data)
}
//修改积分
export const updateCredits = (id, credit, experience) => {
    return axios.patch(process.env.API_HOST + 'system/credits/' + id + '.json?credit=' + credit + '&experience=' + experience).then(res => res.data)
}
//品牌列表
export const brandsList = (name) => {
    return axios.get(process.env.API_HOST + 'system/brands.json?name=' + name).then(res => res.data)
}
//品牌详情
export const brandsDetail = (id) => {
    return axios.get(process.env.API_HOST + 'system/brands/' + id + '.json').then(res => res.data)
}
//创建品牌
export const creatBrands = (name, icon_url) => {
    return axios.post(process.env.API_HOST + 'system/brands.json?name=' + name + '&icon_url=' + icon_url).then(res => res.data)
}
//修改品牌
export const updataBrands = (id, name, icon_url) => {
    return axios.patch(process.env.API_HOST + 'system/brands/' + id + '.json?name=' + name + '&icon_url=' + icon_url).then(res => res.data)
}
//删除品牌
export const deleteBrands = (id) => {
    return axios.delete(process.env.API_HOST + 'system/brands/' + id + '.json').then(res => res.data)
}
//车辆信息列表
export const carsList = (params) => {
    return axios.get(process.env.API_HOST + 'system/cars.json', {params: params}).then(res => res.data)
}
//创建车辆信息
export const creatCars = (license, brand_id, mod, colour, mileage, buy_time, inspection_time, owner_id, car_alias, desc) => {
    const data = {
        license: license,
        brand_id: brand_id,
        mod: mod,
        colour: colour,
        mileage: mileage,
        buy_time: buy_time,
        inspection_time: inspection_time,
        owner_id: owner_id,
        car_alias: car_alias,
        desc: desc
    }
    return axios.post(process.env.API_HOST + 'system/cars.json', data).then(res => res.data)
}
//修改车辆信息
export const updatacars = (id, license, brand_id, mod, colour, mileage, buy_time, inspection_time) => {
    const data = {
        id: id,
        license: license,
        brand_id: brand_id,
        mod: mod,
        colour: colour,
        mileage: mileage,
        buy_time: buy_time,
        inspection_time: inspection_time
    }
    return axios.patch(process.env.API_HOST + 'system/cars/' + id + '.json', data).then(res => res.data)
}
//增加车主
export const addCar = (id, user_id, car_alias, desc) => {
    const data = {
        user_id: user_id,
        car_alias: car_alias,
        desc: desc
    }
    return axios.put(process.env.API_HOST + 'system/cars/' + id + '/add.json', data).then(res => res.data)
}
//删除车辆车主
export const deleteCar = (id) => {
    return axios.delete(process.env.API_HOST + 'system/cars/' + id + '/remove.json').then(res => res.data)
}
//日报
export const dailyLsit = (startingTime, endTime) => {
    const data = {
        st: startingTime,
        et: endTime,
    }
    return axios.get(process.env.API_HOST + 'system/statistics/comment.json', data).then(res => res.data)
}

export default instance

