<template>
    <div style="overflow: hidden">
        <el-col :span="24" class="toolbar" style="padding:0;border-bottom: 1px solid #eee;margin-bottom: 10px">
            <el-breadcrumb separator=">" style="line-height: 50px;">
                <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/topic' }">话题管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑话题</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="24" :loading="listLoading">
            <el-form style="clear: both" class="form-container" v-model="postForm" :rules="editFormRules"
                     ref="postForm">
                <el-col :span="6">
                    <el-form-item style="padding-left: 20px" label-width="100px" label="话题类型:">
                        <el-select v-model="postForm.topic_type" prop="topic_type" placeholder="请选择话题类型" disabled>
                            <el-option label="文字类型" value="text"></el-option>
                            <el-option label="图文类型" value="image"></el-option>
                            <el-option label="视频类型" value="video"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item style="padding-left: 20px" label-width="100px" label="定位:" prop="address">
                        <el-tooltip placement="top">
                            <div slot="content">拖动点击地图修改定位</div>
                            <el-input placeholder="地址" style='min-width:150px;' @focus="getMaps"
                                      v-model="postForm.address">
                            </el-input>
                        </el-tooltip>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item style="padding-left: 20px" label-width="100px" label="坐标经度:" prop="lat">
                        <el-input placeholder="坐标经度" style='min-width:150px;'
                                  v-model="postForm.lat">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label-width="100px" label="坐标纬度:" prop="lng">
                        <el-input placeholder="坐标纬度" style='min-width:150px;'
                                  v-model="postForm.lng">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item style="padding-left: 20px" label-width="100px" label="标签:">
                        <el-tooltip placement="top">
                            <div slot="content">标签以逗号分隔</div>
                            <el-input placeholder="标签" style='min-width:150px;'
                                      v-model="postForm.tags">
                            </el-input>
                        </el-tooltip>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item style="padding-left: 20px" label-width="100px" label="车牌号">
                        <el-tooltip placement="top">
                            <div slot="content">车牌号以逗号分隔</div>
                            <el-input placeholder="车牌号" style='min-width:150px;'
                                      v-model="postForm.license"></el-input>
                        </el-tooltip>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item style="padding-left: 20px" label-width="100px" label="点赞数">
                        <el-input placeholder="点赞数" style='min-width:150px;'
                                  v-model="postForm.likes"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item style="padding-left: 20px" label-width="100px" label="观看数">
                        <el-input placeholder="观看数" style='min-width:150px;'
                                  v-model="postForm.viewers"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-if="postForm.topic_type === 'video'">
                    <el-form-item style="padding-left: 20px" class="edit_upload" label-width="100px" label="视频地址:">
                        <form method="post" enctype="multipart/form-data" ref="videoForm" class="postForm">
                            <input class="el-input__inner" style="width: 90%;display: block" type="text"
                                   ref="videoUrl" id="videoUrl" placeholder="视频内容" name="video"
                                   v-model="postForm.video_url" @focus="showVideo"/>
                            <el-button class="filebox" :loading="loading"><i class="el-icon-upload">选取视频</i>
                            </el-button>
                            <input style="width: 10%;opacity:0;cursor:pointer;float: left;height: 35px"
                                   type="file" name="imgfile" @change="uploadVideo">
                        </form>
                    </el-form-item>
                    <el-form-item style="padding-left: 20px" class="edit_upload" label-width="100px" label="视频封面:">
                        <form method="post" enctype="multipart/form-data" ref="files" class="postForm">
                            <input class="el-input__inner" style="width: 90%;display: block" type="text"
                                   ref="posterUrl" id="posterUrl" placeholder="视频封面图" name="poster"
                                   v-model="postForm.video_image"/>
                            <el-button class="filebox"><i class="el-icon-upload">选取图片</i></el-button>
                            <input style="width: 10%;opacity:0;cursor:pointer;float: left;height: 35px"
                                   type="file" name="imgfile" @change="uploadPoster">
                        </form>
                    </el-form-item>
                    <el-form-item style="padding-left: 20px" label-width="100px" label="内容" prop="title">
                        <el-input type="textarea" v-model="postForm.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-else-if="postForm.topic_type === 'image'">
                    <el-form-item style="padding-left: 20px" class="edit_upload" label-width="100px" label="增加图片">
                        <form method="post" enctype="multipart/form-data" ref="files" class="postForm">
                            <input class="el-input__inner" style="width: 90%;display: block" type="text"
                                   ref="imagesUrl" id="imagesUrl" placeholder="图片集" name="imagesUrl"
                                   v-model="postForm.image_url"/>
                            <el-button class="filebox"><i class="el-icon-upload">选取图片</i></el-button>
                            <input style="width: 10%;opacity:0;cursor:pointer;float: left;height: 35px"
                                   type="file" name="imgfile" @change="uploadImages">
                        </form>
                    </el-form-item>
                    <el-form-item style="padding-left: 20px" class="edit_upload" label-width="100px" label="增加图片"
                                  v-show="imageArr.length > 0">
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
                    <el-form-item style="padding-left: 20px" label-width="100px" label="内容" prop="title">
                        <el-input type="textarea" v-model="postForm.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col v-else>
                    <el-form-item style="padding-left: 20px" label-width="100px" label="内容" prop="title">
                        <el-input type="textarea" v-model="postForm.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col>
                    <el-form-item style="padding-left: 20px">
                        <el-button type="primary" :loading="loading" @click="submitForm">编辑</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-col>
        <el-col>
            <p>评论列表</p>
            <el-table :data="comments" style="width: 100%" border height="450">
                <el-table-column label="操作" width="200" fixed="left">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status === 'online'" size="small"
                                   @click="handelChangeStatus(scope.$index, scope.row,'下线')">下线
                        </el-button>
                        <el-button v-else size="small" type="danger"
                                   @click="handelChangeStatus(scope.$index, scope.row,'上线')">上线
                        </el-button>
                        <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">完成</el-button>
                        <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">编辑</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="author" label="评论人" width="180">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{ scope.row.author.nickname }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="created_at" label="评论日期" :formatter="dateFormat" width="180"></el-table-column>
                <el-table-column prop="content" label="内容" min-width="300px">
                    <template slot-scope="scope">
                        <template v-if="scope.row.edit">
                            <el-input class="edit-input" size="small" v-model="scope.row.content"></el-input>
                        </template>
                        <span v-else>{{ scope.row.content }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="likes" label="点赞数"></el-table-column>
            </el-table>
            <!--工具条-->
            <el-col :span="24" class="toolbar">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :page-size="1"
                        layout="prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </el-col>
        </el-col>

        <!--地图界面-->
        <el-dialog title="高德地图" :visible.sync="showmaps" :close-on-click-modal="false" width="60%">
            <div id="container" style="width:100%; height:400px"></div>
        </el-dialog>

        <!--视频预览-->
        <el-dialog title="视频预览" :visible.sync="showVideos" :close-on-click-modal="false" width="60%" @close='closeDialog'>
            <video :src="imageURL+videoUrl" controls="controls" autoplay ref="showVideo" width="100%" height="auto"></video>
        </el-dialog>
    </div>
</template>

<script>
    import {options, topicDetail, updateTopic, commentStatus, updataComments} from 'api';
    import AMap from 'AMap'
    var map
    const defaultForm = {
        id: '',
        title: '',
        author_id: '',
        likes: '',
        viewers: '',
        comment_count: '',
        image_url: '',
        video_image: null,
        video_length: null,
        video_url: null,
        address: '',
        lat: '',
        license: '',
        lng: '',
        tags: '',
        topic_type: '',
    }
    export default {
        data(){
            return {
                postForm: Object.assign({}, defaultForm),
                ins: new frontQnUper(options),
                loading: false,
                editFormRules: {},
                showmaps: false,
                imageURL: baseImgUrl,
                comments: [],
                total: 0,
                page: 1,
                listLoading: false,
                imageArr: [],
                tagsArr: [],
                licenseArr: [],
                list: null,
                videoUrl:'',
                showVideos:false
            }
        },
        methods: {
            handleCurrentChange(val) {
                this.page = val;
                this._getDetails();
            },
            _getDetails(){
                this.listLoading = true;
                topicDetail(this.$route.params.id).then(res => {
                    let formData = res.data.topics
                    this.imageArr = formData.image_urls
                    this.comments = res.data.comments
                    this.list = this.comments.map(v => {
                        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
                        v.originalTitle = v.content //  will be used when user click the cancel botton
                        return v
                    })
                    this.total = res.data.paging.total_pages
                    this.listLoading = false;
                    this.postForm.video_image = formData.video_info.video_image
                    this.postForm.video_length = formData.video_info.video_length
                    this.postForm.video_url = formData.video_info.video_url
                    this.postForm.address = formData.address
                    this.postForm.lng = formData.lng
                    this.postForm.lat = formData.lat
                    this.postForm.topic_type = formData.topic_type
                    this.postForm.author_id = formData.author.id
                    this.postForm.image_url = (formData.image_urls).join(',')
                    this.postForm.id = formData.id
                    this.postForm.title = formData.title
                    this.postForm.comment_count = formData.comment_count
                    this.postForm.likes = formData.likes
                    this.postForm.viewers = formData.viewers
                    if (formData.license.length > 0) {
                        formData.license.map((item, index) => {
                            this.licenseArr.push(item.license)
                            this.postForm.license = this.licenseArr.join(',')
                        })
                    }
                    if (formData.tags.length > 0) {
                        formData.tags.map((item, index) => {
                            this.tagsArr.push(item.name)
                            this.postForm.tags = this.tagsArr.join(',')
                        })
                    }
                }).catch(err => {
                    this.$router.push({path: '/login'});
                })
            },
            dateFormat: function (row, column) {
                var date = row[column.property];
                if (date == undefined) {
                    return "";
                }
                return new Date(date).format("Y-MM-dd hh:mm:ss")
            },
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
                                that.postForm.lat = e.lnglat.lat
                                that.postForm.lng = e.lnglat.lng
                                that.postForm.address = result.regeocode.formattedAddress
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
                param.append('file', file, file.name);//通过append向form对象添加数据
                param.append('chunk', '0');//添加form表单中其他数据
                let files = param.get('file')
                this.ins.post(files, function (res) {
                    that.postForm.video_url = res.fileUrl
                    that.postForm.video_image = res.fileUrl + '?vframe/png/offset/0'
                });
            },
            //封面上传
            uploadPoster(e){
                let that = this
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                this.ins.prefix = 'res/ugc/';
                param.append('file', file, file.name);
                param.append('chunk', '0');
                let files = param.get('file')
                this.ins.post(files, function (res) {
                    that.postForm.video_image = res.fileUrl
                });
            },
            uploadImages(e){
                let that = this
                let file = e.target.files[0];
                let param = new FormData(); //创建form对象
                this.ins.prefix = 'res/ugc/';
                param.append('file', file, file.name);
                param.append('chunk', '0');
                let files = param.get('file')
                this.ins.post(files, function (res) {
                    that.postForm.image_url += ',' + res.fileUrl
                    if(that.postForm.image_url.substring(0,1) === ','){
                        that.postForm.image_url = that.postForm.image_url.substring(1,that.postForm.image_url.length)
                    }
                    that.imageArr.push(res.fileUrl)
//                    that.postForm.image_urls.push(that.image_urls)
                });
            },
            submitForm(){
                this.loading = true
                updateTopic(this.$route.params.id, this.postForm).then(res => {
                    if (res.code === 1) {
                        this.$notify({
                            title: '成功',
                            message: '话题修改成功',
                            type: 'success',
                            duration: 2000
                        })
                        this.loading = false
                    } else {
                        this.$notify({
                            title: '失败',
                            message: '话题修改失败',
                            type: 'danger',
                            duration: 2000
                        })
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            rmImage(item){
                this.imageArr.splice(item, 1)
                this.postForm.image_url = this.imageArr
            },
            handelChangeStatus(index, row, text){
                let commentsId = row.id
                this.$confirm('是否' + text + '该评论?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    let status = ''
                    if(text === '上线'){
                        status = 'online'
                    }else{
                        status = 'offline'
                    }
                    commentStatus(commentsId,status).then(res =>{
                        if(res.code === 1){
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            })
                            this.$nextTick(() => {
                                this.licenseArr = []
                                this.tagsArr = []
                                this._getDetails()
                            })
                        }
                    })
                }).catch(() => {

                });
            },
            confirmEdit(row) {
                row.edit = false
                row.originalTitle = row.content
                console.log(row.content)
                updataComments(row.id,row.content,'text').then(res => {
                    if(res.code ===1){
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.$nextTick(() => {
                            this.licenseArr = []
                            this.tagsArr = []
                            this._getDetails()
                        })
                    }
                })
            },
            showVideo(e){
                if(e.target.value === ''){
                    return
                }else{
                    this.videoUrl = e.target.value
                    this.showVideos = true
                }
            },
            closeDialog(){
                //关闭视频
                this.$refs.showVideo.pause()
            }
        },
        mounted(){
        },
        activated(){
            this.$nextTick(() => {
                this.licenseArr = []
                this.tagsArr = []
                this._getDetails()
            })
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
        left: 90%;
        margin-left: 10px;
    }

    .upload-container {
        position: relative;
        overflow: hidden;
        padding: 0;
        .image-preview {
            width: 100px;
            height: 100px;
            position: relative;
            float: left;
            list-style: none;
            margin-left: 10px;
            margin-bottom: 10px;
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
                input {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
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
        .image-uploader {
            opacity: 1 !important;
        }
    }
</style>