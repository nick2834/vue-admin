<template>
    <div>
        <el-col :span="24" class="toolbar" style="padding:0;border-bottom: 1px solid #eee;margin-bottom: 10px">
            <el-breadcrumb separator=">" style="line-height: 50px;">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/topic' }">话题管理</el-breadcrumb-item>
                <el-breadcrumb-item>创建话题</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-form class="form-container" :model="formData" :rules="editFormRules" ref="postForm">
            <el-col :span="6">
                <el-form-item label-width="100px" label="作者ID:" prop="id">
                    <el-input placeholder="作者ID" style='min-width:150px;'
                              v-model="formData.author_id" disabled>
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item style="padding-left: 20px" label-width="100px" label="话题类型:">
                    <el-select v-model="formData.topic_type" prop="topic_type" placeholder="请选择话题类型">
                        <el-option label="图文类型" value="image"></el-option>
                        <el-option label="视频类型" value="video"></el-option>
                        <el-option label="文字类型(不支持)" value="text"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item style="padding-left: 20px" label-width="100px" label="定位:" prop="address">
                    <el-input placeholder="地址" style='min-width:150px;' @focus="getMaps"
                              v-model="formData.address">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item style="padding-left: 20px" label-width="100px" label="坐标经度:" prop="lat">
                    <el-input placeholder="坐标经度" style='min-width:150px;'
                              v-model="formData.lat">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label-width="100px" label="坐标纬度:" prop="lng">
                    <el-input placeholder="坐标纬度" style='min-width:150px;'
                              v-model="formData.lng">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item style="padding-left: 20px" label-width="100px" label="标签:" prop="tags">
                    <el-input placeholder="标签" style='min-width:150px;'
                              v-model="formData.tags">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item style="padding-left: 20px" label-width="100px" label="车牌号" prop="license">
                    <el-input placeholder="车牌号" style='min-width:150px;'
                              v-model="formData.license">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col>
                <div v-if="formData.topic_type === 'video'">
                    <el-form-item class="edit_upload" label-width="100px" label="视频地址:" prop="video_url">
                        <form method="post" enctype="multipart/form-data" ref="videoForm" class="postForm">
                            <input class="el-input__inner" style="width: 80%;display: block" type="text"
                                   ref="videoUrl" id="videoUrl" placeholder="视频内容" name="video"
                                   v-model="formData.video_url"/>
                            <el-button class="filebox" :loading="loading"><i class="el-icon-upload">选取视频</i>
                            </el-button>
                            <input style="width: 10%;opacity:0;cursor:pointer;float: left;height: 35px"
                                   type="file" name="imgfile" @change="uploadVideo">
                        </form>
                    </el-form-item>
                    <el-form-item class="edit_upload" label-width="100px" label="视频封面:" prop="video_image">
                        <form method="post" enctype="multipart/form-data" ref="files" class="postForm">
                            <input class="el-input__inner" style="width: 80%;display: block" type="text"
                                   ref="posterUrl" id="posterUrl" placeholder="视频封面图" name="poster"
                                   v-model="formData.video_image"/>
                            <el-button class="filebox"><i class="el-icon-upload">选取图片</i></el-button>
                            <input style="width: 10%;opacity:0;cursor:pointer;float: left;height: 35px"
                                   type="file" name="imgfile" @change="uploadPoster">
                        </form>
                    </el-form-item>
                    <el-form-item label-width="100px" label="内容" prop="title" required>
                        <el-input placeholder="内容" style='min-width:150px;'
                                  v-model="formData.title">
                        </el-input>
                    </el-form-item>
                </div>
                <div v-else-if="formData.topic_type=== 'image'">
                    <el-form-item class="edit_upload" label-width="100px" label="图片画廊" prop="image_urls">
                        <div class="upload-container">
                            <div class="image-preview" v-for="item,key in imageArr" @click="rmImage(key)">
                                <div class="image-preview-wrapper">
                                    <img :src="imageURL + item +'-center100'">
                                    <div class="image-preview-action">
                                        <i class="el-icon-delete"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="image-preview" v-show="imageArr.length < 9">
                                <div class="image-preview-wrapper">
                                    <div class="image-preview-action image-uploader">
                                        <input type="file" name="imgfile" @change="uploadImages">
                                        <i class="el-icon-plus"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label-width="100px" label="内容" prop="title" required>
                        <el-input placeholder="内容" style='min-width:150px;'
                                  v-model="formData.title">
                        </el-input>
                    </el-form-item>
                </div>
                <div v-else>
                    <el-form-item label-width="100px" label="内容" prop="title">
                        <!--<editor ref="editor" @editorHtml="getHtml" v-model="formData.title"></editor>-->
                        <el-input type="textarea" v-model="formData.title"></el-input>
                    </el-form-item>
                </div>
            </el-col>
            <el-col>
                <el-form-item>
                    <el-button type="primary" :loading="loading" @click="submitForm">确认提交</el-button>
                    <el-button type="danger" :loading="loading" @click="setDraft">存为草稿</el-button>
                </el-form-item>
            </el-col>
        </el-form>
        <!--地图界面-->
        <el-dialog title="高德地图" :visible.sync="showmaps" :close-on-click-modal="false" width="60%">
            <div id="container" style="width:100%; height:400px"></div>
        </el-dialog>
    </div>
</template>

<script>
    import Editor from 'components/editor'
    import {setToken,getToken} from 'untils/auth'
    import {options, getQiniuToken, createTopic} from 'api';
    import AMap from 'AMap'
    var map
    const defaultForm = {
        title: '',
        image_urls: '',
        video_url: '',
        video_image: '',
        video_length: '',
        author_id: JSON.parse(getToken('id')),
        topic_type: 'video',
        address: '',
        lat: null,
        lng: null,
        tags: '',
        license: '',
    }
    export default {
        data(){
            return {
                ins:new frontQnUper(options),
                formData: Object.assign({}, defaultForm),
                loading: false,
                editFormRules: {},
                showmaps: false,
                editorMsg:'',
                imageURL: baseImgUrl,
                imageArr: [],
                imageStr:''
            }
        },
        mounted(){
            this.getDraft()
        },
        components:{Editor},
        methods: {
            mapInit() {
                let that = this
                map = new AMap.Map('container', {
                    resizeEnable: true,
                    zoom: 12
                })
                AMap.plugin('AMap.Geocoder', function () {
                    var geocoder = new AMap.Geocoder({
                        city: "上海"//城市，默认：“全国”
                    });
                    var marker = new AMap.Marker({
                        map: map,
                        bubble: true
                    })
                    map.on('click', function (e) {
                        marker.setPosition(e.lnglat);
                        geocoder.getAddress(e.lnglat, function (status, result) {
                            if (status == 'complete') {
                                var res = result.regeocode.addressComponent
                                that.formData.lat = e.lnglat.lat
                                that.formData.lng = e.lnglat.lng
                                that.formData.address = result.regeocode.formattedAddress
                            }
                        })
                    })
                })
            },
            getMaps(){
                this.showmaps = true
                this.$nextTick(() => {
                    this.mapInit()
                })
            },
            //视频上传
            uploadVideo(e){
                let that = this
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                this.ins.prefix = 'res/ugc/';
                param.append('file',file,file.name);//通过append向form对象添加数据
                param.append('chunk','0');//添加form表单中其他数据
                let files = param.get('file')
                this.ins.post(files, function(res) {
                    that.formData.video_url = res.fileUrl
                    that.formData.video_image = res.fileUrl + '?vframe/png/offset/0'
                });
            },
            //封面上传
            uploadPoster(e){
                let that = this
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                this.ins.prefix = 'res/ugc/';
                param.append('file',file,file.name);
                param.append('chunk','0');
                let files = param.get('file')
                this.ins.post(files, function(res) {
                    that.formData.video_image = res.fileUrl
                });
            },
            uploadImages(e){
                let that = this
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                this.ins.prefix = 'res/ugc/';
                if(file.type.indexOf('image') === -1){
                    this.$notify({
                        title: '失败',
                        message: '上传文件必须为图片格式',
                        type: 'error',
                        duration: 2000
                    })
                    return
                }else {
                    param.append('file',file,file.name);
                    param.append('chunk','0');
                    let files = param.get('file')
                    this.ins.post(files, function(res) {
                        that.imageArr.push(res.fileUrl)
                        that.formData.image_urls = that.imageArr
                    });
                }
            },
            rmImage(item){
                //删除上传图片
                this.imageArr.splice(item,1)
            },
            submitForm(){
                this.$refs.postForm.validate(valid => {
                    if(valid){
                        this.loading = true
                        if(this.formData.topic_type !== 'video'){
                            this.formData.image_urls = this.formData.image_urls.join(',')
                        }
                        //转换图片数组为字符串赋值
                        createTopic(this.formData).then(res =>{
                            if(res.code === 1){
                                this.$notify({
                                    title: '成功',
                                    message: '发布文章成功',
                                    type: 'success',
                                    duration: 2000
                                })
                                this.loading = false
                            }else{
                                this.$notify({
                                    title: '失败',
                                    message: '发布文章失败',
                                    type: 'danger',
                                    duration: 2000
                                })
                            }
                        })
                    }else{
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            getHtml(msg){
                //文本编辑器内容获取，暂时不用
                this.formData.title = msg
            },
            //存草稿
            setDraft(){
                this.loading = true
                setToken('draft',this.formData)
                this.$notify({
                    title: '成功',
                    message: '存草稿成功',
                    type: 'success',
                    duration: 2000
                })
                this.loading = false
            },
            getDraft(){
                if(getToken('draft')){
                    this.formData = JSON.parse(getToken('draft'))
                    console.log(this.formData)
                }else{
                    this.formData = Object.assign({}, defaultForm)
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .postForm {
        position: relative;
        display: flex;
        #posterUrl {
            float: left;
        }
    }
    .upload-container {
        width: 100%;
        position: relative;
        overflow: hidden;
        .image-preview {
            width: 100px;
            height: 100px;
            position: relative;
            float: left;
            margin-right: 10px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 100px;
                .el-icon-delete {
                    font-size: 18px;
                }
                .el-icon-plus {
                    font-size: 18px;
                }
                input{
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top:0;
                    left: 0;
                    opacity: 0;
                    cursor: pointer;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
        .image-uploader{
            opacity: 1 !important;
        }
    }
    .editor-container {
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
    }
    .edit_upload {
        position: relative;
    }

    .filebox {
        position: absolute;
        left: 80%;
        margin-left: 10px;
    }
</style>