webpackJsonp([12],{

/***/ 1008:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1099)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1044),
  /* template */
  __webpack_require__(1133),
  /* scopeId */
  "data-v-5c43d2bc",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1044:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_api__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_AMap__ = __webpack_require__(1141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_AMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_AMap__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



var map;
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
    topic_type: ''
};
/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            postForm: Object.assign({}, defaultForm),
            ins: new frontQnUper(__WEBPACK_IMPORTED_MODULE_0_api__["G" /* options */]),
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
            videoUrl: '',
            showVideos: false
        };
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val;
            this._getDetails();
        },
        _getDetails() {
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["H" /* topicDetail */])(this.$route.params.id).then(res => {
                let formData = res.data.topics;
                this.imageArr = formData.image_urls;
                this.comments = res.data.comments;
                this.list = this.comments.map(v => {
                    this.$set(v, 'edit', false); // https://vuejs.org/v2/guide/reactivity.html
                    v.originalTitle = v.content; //  will be used when user click the cancel botton
                    return v;
                });
                this.total = res.data.paging.total_pages;
                this.listLoading = false;
                this.postForm.video_image = formData.video_info.video_image;
                this.postForm.video_length = formData.video_info.video_length;
                this.postForm.video_url = formData.video_info.video_url;
                this.postForm.address = formData.address;
                this.postForm.lng = formData.lng;
                this.postForm.lat = formData.lat;
                this.postForm.topic_type = formData.topic_type;
                this.postForm.author_id = formData.author.id;
                this.postForm.image_url = formData.image_urls.join(',');
                this.postForm.id = formData.id;
                this.postForm.title = formData.title;
                this.postForm.comment_count = formData.comment_count;
                this.postForm.likes = formData.likes;
                this.postForm.viewers = formData.viewers;
                if (formData.license.length > 0) {
                    formData.license.map((item, index) => {
                        this.licenseArr.push(item.license);
                        this.postForm.license = this.licenseArr.join(',');
                    });
                }
                if (formData.tags.length > 0) {
                    formData.tags.map((item, index) => {
                        this.tagsArr.push(item.name);
                        this.postForm.tags = this.tagsArr.join(',');
                    });
                }
            }).catch(err => {
                this.$router.push({ path: '/login' });
            });
        },
        dateFormat: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return new Date(date).format("Y-MM-dd hh:mm:ss");
        },
        mapInit() {
            let that = this;
            map = new __WEBPACK_IMPORTED_MODULE_1_AMap___default.a.Map('container', {
                resizeEnable: true,
                zoom: 12
            });
            __WEBPACK_IMPORTED_MODULE_1_AMap___default.a.plugin('AMap.Geocoder', function () {
                var geocoder = new __WEBPACK_IMPORTED_MODULE_1_AMap___default.a.Geocoder({
                    city: "上海" //城市，默认：“全国”
                });
                var marker = new __WEBPACK_IMPORTED_MODULE_1_AMap___default.a.Marker({
                    map: map,
                    bubble: true
                });
                map.on('click', function (e) {
                    marker.setPosition(e.lnglat);
                    geocoder.getAddress(e.lnglat, function (status, result) {
                        if (status == 'complete') {
                            var res = result.regeocode.addressComponent;
                            that.postForm.lat = e.lnglat.lat;
                            that.postForm.lng = e.lnglat.lng;
                            that.postForm.address = result.regeocode.formattedAddress;
                        }
                    });
                });
            });
        },
        getMaps() {
            this.showmaps = true;
            this.$nextTick(() => {
                this.mapInit();
            });
        },
        //视频上传
        uploadVideo(e) {
            let that = this;
            let file = e.target.files[0];
            let param = new FormData(); //创建form对象
            this.ins.prefix = 'res/ugc/';
            param.append('file', file, file.name); //通过append向form对象添加数据
            param.append('chunk', '0'); //添加form表单中其他数据
            let files = param.get('file');
            this.ins.post(files, function (res) {
                that.postForm.video_url = res.fileUrl;
                that.postForm.video_image = res.fileUrl + '?vframe/png/offset/0';
            });
        },
        //封面上传
        uploadPoster(e) {
            let that = this;
            let file = e.target.files[0];
            let param = new FormData(); //创建form对象
            this.ins.prefix = 'res/ugc/';
            param.append('file', file, file.name);
            param.append('chunk', '0');
            let files = param.get('file');
            this.ins.post(files, function (res) {
                that.postForm.video_image = res.fileUrl;
            });
        },
        uploadImages(e) {
            let that = this;
            let file = e.target.files[0];
            let param = new FormData(); //创建form对象
            this.ins.prefix = 'res/ugc/';
            param.append('file', file, file.name);
            param.append('chunk', '0');
            let files = param.get('file');
            this.ins.post(files, function (res) {
                that.postForm.image_url += ',' + res.fileUrl;
                if (that.postForm.image_url.substring(0, 1) === ',') {
                    that.postForm.image_url = that.postForm.image_url.substring(1, that.postForm.image_url.length);
                }
                that.imageArr.push(res.fileUrl);
                //                    that.postForm.image_urls.push(that.image_urls)
            });
        },
        submitForm() {
            this.loading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["I" /* updateTopic */])(this.$route.params.id, this.postForm).then(res => {
                if (res.code === 1) {
                    this.$notify({
                        title: '成功',
                        message: '话题修改成功',
                        type: 'success',
                        duration: 2000
                    });
                    this.loading = false;
                } else {
                    this.$notify({
                        title: '失败',
                        message: '话题修改失败',
                        type: 'danger',
                        duration: 2000
                    });
                }
            }).catch(err => {
                console.log(err);
            });
        },
        rmImage(item) {
            this.imageArr.splice(item, 1);
            this.postForm.image_url = this.imageArr;
        },
        handelChangeStatus(index, row, text) {
            let commentsId = row.id;
            this.$confirm('是否' + text + '该评论?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                let status = '';
                if (text === '上线') {
                    status = 'online';
                } else {
                    status = 'offline';
                }
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["F" /* commentStatus */])(commentsId, status).then(res => {
                    if (res.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.$nextTick(() => {
                            this.licenseArr = [];
                            this.tagsArr = [];
                            this._getDetails();
                        });
                    }
                });
            }).catch(() => {});
        },
        confirmEdit(row) {
            row.edit = false;
            row.originalTitle = row.content;
            console.log(row.content);
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["E" /* updataComments */])(row.id, row.content, 'text').then(res => {
                if (res.code === 1) {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    this.$nextTick(() => {
                        this.licenseArr = [];
                        this.tagsArr = [];
                        this._getDetails();
                    });
                }
            });
        },
        showVideo(e) {
            if (e.target.value === '') {
                return;
            } else {
                this.videoUrl = e.target.value;
                this.showVideos = true;
            }
        },
        closeDialog() {
            //关闭视频
            this.$refs.showVideo.pause();
        }
    },
    mounted() {},
    activated() {
        this.$nextTick(() => {
            this.licenseArr = [];
            this.tagsArr = [];
            this._getDetails();
        });
    }
});

/***/ }),

/***/ 1074:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, ".postForm[data-v-5c43d2bc]{position:relative;display:flex}.postForm #posterUrl[data-v-5c43d2bc]{float:left}.editor-container[data-v-5c43d2bc]{margin:0 0 30px}.editor-container .editor-upload-btn-container[data-v-5c43d2bc]{text-align:right;margin-right:10px}.editor-container .editor-upload-btn-container .editor-upload-btn[data-v-5c43d2bc]{display:inline-block}.edit_upload[data-v-5c43d2bc]{position:relative}.filebox[data-v-5c43d2bc]{position:absolute;left:90%;margin-left:10px}.upload-container[data-v-5c43d2bc]{position:relative;overflow:hidden;padding:0}.upload-container .image-preview[data-v-5c43d2bc]{width:100px;height:100px;position:relative;float:left;list-style:none;margin-left:10px;margin-bottom:10px}.upload-container .image-preview .image-preview-wrapper[data-v-5c43d2bc]{position:relative;width:100%;height:100%}.upload-container .image-preview .image-preview-wrapper img[data-v-5c43d2bc]{width:100%;height:100%}.upload-container .image-preview .image-preview-action[data-v-5c43d2bc]{position:absolute;width:100%;height:100%;left:0;top:0;color:#fff;opacity:0;font-size:20px;background-color:rgba(0,0,0,.5);transition:opacity .3s;cursor:pointer;text-align:center;line-height:100px}.upload-container .image-preview .image-preview-action .el-icon-delete[data-v-5c43d2bc],.upload-container .image-preview .image-preview-action .el-icon-plus[data-v-5c43d2bc]{font-size:18px}.upload-container .image-preview .image-preview-action input[data-v-5c43d2bc]{width:100%;height:100%;position:absolute;top:0;left:0;opacity:0;cursor:pointer}.upload-container .image-preview:hover .image-preview-action[data-v-5c43d2bc]{opacity:1}.upload-container .image-uploader[data-v-5c43d2bc]{opacity:1!important}", "", {"version":3,"sources":["/Users/subang/bulunu-admin/src/views/content/topicDetail.vue"],"names":[],"mappings":"AACA,2BACE,kBAAmB,AACnB,YAAc,CACf,AACD,sCACI,UAAY,CACf,AACD,mCACE,eAAiB,CAClB,AACD,gEACI,iBAAkB,AAClB,iBAAmB,CACtB,AACD,mFACM,oBAAsB,CAC3B,AACD,8BACE,iBAAmB,CACpB,AACD,0BACE,kBAAmB,AACnB,SAAU,AACV,gBAAkB,CACnB,AACD,mCACE,kBAAmB,AACnB,gBAAiB,AACjB,SAAW,CACZ,AACD,kDACI,YAAa,AACb,aAAc,AACd,kBAAmB,AACnB,WAAY,AACZ,gBAAiB,AACjB,iBAAkB,AAClB,kBAAoB,CACvB,AACD,yEACM,kBAAmB,AACnB,WAAY,AACZ,WAAa,CAClB,AACD,6EACQ,WAAY,AACZ,WAAa,CACpB,AACD,wEACM,kBAAmB,AACnB,WAAY,AACZ,YAAa,AACb,OAAQ,AACR,MAAO,AACP,WAAY,AACZ,UAAW,AACX,eAAgB,AAChB,gCAAqC,AACrC,uBAAwB,AACxB,eAAgB,AAChB,kBAAmB,AACnB,iBAAmB,CACxB,AAID,8KACQ,cAAgB,CACvB,AACD,8EACQ,WAAY,AACZ,YAAa,AACb,kBAAmB,AACnB,MAAO,AACP,OAAQ,AACR,UAAW,AACX,cAAgB,CACvB,AACD,8EACM,SAAW,CAChB,AACD,mDACI,mBAAsB,CACzB","file":"topicDetail.vue","sourcesContent":["\n.postForm[data-v-5c43d2bc] {\n  position: relative;\n  display: flex;\n}\n.postForm #posterUrl[data-v-5c43d2bc] {\n    float: left;\n}\n.editor-container[data-v-5c43d2bc] {\n  margin: 0 0 30px;\n}\n.editor-container .editor-upload-btn-container[data-v-5c43d2bc] {\n    text-align: right;\n    margin-right: 10px;\n}\n.editor-container .editor-upload-btn-container .editor-upload-btn[data-v-5c43d2bc] {\n      display: inline-block;\n}\n.edit_upload[data-v-5c43d2bc] {\n  position: relative;\n}\n.filebox[data-v-5c43d2bc] {\n  position: absolute;\n  left: 90%;\n  margin-left: 10px;\n}\n.upload-container[data-v-5c43d2bc] {\n  position: relative;\n  overflow: hidden;\n  padding: 0;\n}\n.upload-container .image-preview[data-v-5c43d2bc] {\n    width: 100px;\n    height: 100px;\n    position: relative;\n    float: left;\n    list-style: none;\n    margin-left: 10px;\n    margin-bottom: 10px;\n}\n.upload-container .image-preview .image-preview-wrapper[data-v-5c43d2bc] {\n      position: relative;\n      width: 100%;\n      height: 100%;\n}\n.upload-container .image-preview .image-preview-wrapper img[data-v-5c43d2bc] {\n        width: 100%;\n        height: 100%;\n}\n.upload-container .image-preview .image-preview-action[data-v-5c43d2bc] {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      left: 0;\n      top: 0;\n      color: #fff;\n      opacity: 0;\n      font-size: 20px;\n      background-color: rgba(0, 0, 0, 0.5);\n      transition: opacity .3s;\n      cursor: pointer;\n      text-align: center;\n      line-height: 100px;\n}\n.upload-container .image-preview .image-preview-action .el-icon-delete[data-v-5c43d2bc] {\n        font-size: 18px;\n}\n.upload-container .image-preview .image-preview-action .el-icon-plus[data-v-5c43d2bc] {\n        font-size: 18px;\n}\n.upload-container .image-preview .image-preview-action input[data-v-5c43d2bc] {\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        top: 0;\n        left: 0;\n        opacity: 0;\n        cursor: pointer;\n}\n.upload-container .image-preview:hover .image-preview-action[data-v-5c43d2bc] {\n      opacity: 1;\n}\n.upload-container .image-uploader[data-v-5c43d2bc] {\n    opacity: 1 !important;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1099:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1074);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("570485f0", content, true);

/***/ }),

/***/ 1133:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "overflow": "hidden"
    }
  }, [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding": "0",
      "border-bottom": "1px solid #eee",
      "margin-bottom": "10px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    staticStyle: {
      "line-height": "50px"
    },
    attrs: {
      "separator": ">"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/main'
      }
    }
  }, [_vm._v("首页")]), _vm._v(" "), _c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/topic'
      }
    }
  }, [_vm._v("话题管理")]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v("编辑话题")])], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 24,
      "loading": _vm.listLoading
    }
  }, [_c('el-form', {
    ref: "postForm",
    staticClass: "form-container",
    staticStyle: {
      "clear": "both"
    },
    attrs: {
      "rules": _vm.editFormRules
    },
    model: {
      value: (_vm.postForm),
      callback: function($$v) {
        _vm.postForm = $$v
      },
      expression: "postForm"
    }
  }, [_c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "话题类型:"
    }
  }, [_c('el-select', {
    attrs: {
      "prop": "topic_type",
      "placeholder": "请选择话题类型",
      "disabled": ""
    },
    model: {
      value: (_vm.postForm.topic_type),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "topic_type", $$v)
      },
      expression: "postForm.topic_type"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "文字类型",
      "value": "text"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "图文类型",
      "value": "image"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "视频类型",
      "value": "video"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "定位:",
      "prop": "address"
    }
  }, [_c('el-tooltip', {
    attrs: {
      "placement": "top"
    }
  }, [_c('div', {
    attrs: {
      "slot": "content"
    },
    slot: "content"
  }, [_vm._v("拖动点击地图修改定位")]), _vm._v(" "), _c('el-input', {
    staticStyle: {
      "min-width": "150px"
    },
    attrs: {
      "placeholder": "地址"
    },
    on: {
      "focus": _vm.getMaps
    },
    model: {
      value: (_vm.postForm.address),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "address", $$v)
      },
      expression: "postForm.address"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "坐标经度:",
      "prop": "lat"
    }
  }, [_c('el-input', {
    staticStyle: {
      "min-width": "150px"
    },
    attrs: {
      "placeholder": "坐标经度"
    },
    model: {
      value: (_vm.postForm.lat),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "lat", $$v)
      },
      expression: "postForm.lat"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-form-item', {
    attrs: {
      "label-width": "100px",
      "label": "坐标纬度:",
      "prop": "lng"
    }
  }, [_c('el-input', {
    staticStyle: {
      "min-width": "150px"
    },
    attrs: {
      "placeholder": "坐标纬度"
    },
    model: {
      value: (_vm.postForm.lng),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "lng", $$v)
      },
      expression: "postForm.lng"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "标签:"
    }
  }, [_c('el-tooltip', {
    attrs: {
      "placement": "top"
    }
  }, [_c('div', {
    attrs: {
      "slot": "content"
    },
    slot: "content"
  }, [_vm._v("标签以逗号分隔")]), _vm._v(" "), _c('el-input', {
    staticStyle: {
      "min-width": "150px"
    },
    attrs: {
      "placeholder": "标签"
    },
    model: {
      value: (_vm.postForm.tags),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "tags", $$v)
      },
      expression: "postForm.tags"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "车牌号"
    }
  }, [_c('el-tooltip', {
    attrs: {
      "placement": "top"
    }
  }, [_c('div', {
    attrs: {
      "slot": "content"
    },
    slot: "content"
  }, [_vm._v("车牌号以逗号分隔")]), _vm._v(" "), _c('el-input', {
    staticStyle: {
      "min-width": "150px"
    },
    attrs: {
      "placeholder": "车牌号"
    },
    model: {
      value: (_vm.postForm.license),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "license", $$v)
      },
      expression: "postForm.license"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "点赞数"
    }
  }, [_c('el-input', {
    staticStyle: {
      "min-width": "150px"
    },
    attrs: {
      "placeholder": "点赞数"
    },
    model: {
      value: (_vm.postForm.likes),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "likes", $$v)
      },
      expression: "postForm.likes"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', {
    attrs: {
      "span": 6
    }
  }, [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "观看数"
    }
  }, [_c('el-input', {
    staticStyle: {
      "min-width": "150px"
    },
    attrs: {
      "placeholder": "观看数"
    },
    model: {
      value: (_vm.postForm.viewers),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "viewers", $$v)
      },
      expression: "postForm.viewers"
    }
  })], 1)], 1), _vm._v(" "), (_vm.postForm.topic_type === 'video') ? _c('el-col', [_c('el-form-item', {
    staticClass: "edit_upload",
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "视频地址:"
    }
  }, [_c('form', {
    ref: "videoForm",
    staticClass: "postForm",
    attrs: {
      "method": "post",
      "enctype": "multipart/form-data"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.postForm.video_url),
      expression: "postForm.video_url"
    }],
    ref: "videoUrl",
    staticClass: "el-input__inner",
    staticStyle: {
      "width": "90%",
      "display": "block"
    },
    attrs: {
      "type": "text",
      "id": "videoUrl",
      "placeholder": "视频内容",
      "name": "video"
    },
    domProps: {
      "value": (_vm.postForm.video_url)
    },
    on: {
      "focus": _vm.showVideo,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.postForm, "video_url", $event.target.value)
      }
    }
  }), _vm._v(" "), _c('el-button', {
    staticClass: "filebox",
    attrs: {
      "loading": _vm.loading
    }
  }, [_c('i', {
    staticClass: "el-icon-upload"
  }, [_vm._v("选取视频")])]), _vm._v(" "), _c('input', {
    staticStyle: {
      "width": "10%",
      "opacity": "0",
      "cursor": "pointer",
      "float": "left",
      "height": "35px"
    },
    attrs: {
      "type": "file",
      "name": "imgfile"
    },
    on: {
      "change": _vm.uploadVideo
    }
  })], 1)]), _vm._v(" "), _c('el-form-item', {
    staticClass: "edit_upload",
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "视频封面:"
    }
  }, [_c('form', {
    ref: "files",
    staticClass: "postForm",
    attrs: {
      "method": "post",
      "enctype": "multipart/form-data"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.postForm.video_image),
      expression: "postForm.video_image"
    }],
    ref: "posterUrl",
    staticClass: "el-input__inner",
    staticStyle: {
      "width": "90%",
      "display": "block"
    },
    attrs: {
      "type": "text",
      "id": "posterUrl",
      "placeholder": "视频封面图",
      "name": "poster"
    },
    domProps: {
      "value": (_vm.postForm.video_image)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.postForm, "video_image", $event.target.value)
      }
    }
  }), _vm._v(" "), _c('el-button', {
    staticClass: "filebox"
  }, [_c('i', {
    staticClass: "el-icon-upload"
  }, [_vm._v("选取图片")])]), _vm._v(" "), _c('input', {
    staticStyle: {
      "width": "10%",
      "opacity": "0",
      "cursor": "pointer",
      "float": "left",
      "height": "35px"
    },
    attrs: {
      "type": "file",
      "name": "imgfile"
    },
    on: {
      "change": _vm.uploadPoster
    }
  })], 1)]), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "内容",
      "prop": "title"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea"
    },
    model: {
      value: (_vm.postForm.title),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "title", $$v)
      },
      expression: "postForm.title"
    }
  })], 1)], 1) : (_vm.postForm.topic_type === 'image') ? _c('el-col', [_c('el-form-item', {
    staticClass: "edit_upload",
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "增加图片"
    }
  }, [_c('form', {
    ref: "files",
    staticClass: "postForm",
    attrs: {
      "method": "post",
      "enctype": "multipart/form-data"
    }
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.postForm.image_url),
      expression: "postForm.image_url"
    }],
    ref: "imagesUrl",
    staticClass: "el-input__inner",
    staticStyle: {
      "width": "90%",
      "display": "block"
    },
    attrs: {
      "type": "text",
      "id": "imagesUrl",
      "placeholder": "图片集",
      "name": "imagesUrl"
    },
    domProps: {
      "value": (_vm.postForm.image_url)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.postForm, "image_url", $event.target.value)
      }
    }
  }), _vm._v(" "), _c('el-button', {
    staticClass: "filebox"
  }, [_c('i', {
    staticClass: "el-icon-upload"
  }, [_vm._v("选取图片")])]), _vm._v(" "), _c('input', {
    staticStyle: {
      "width": "10%",
      "opacity": "0",
      "cursor": "pointer",
      "float": "left",
      "height": "35px"
    },
    attrs: {
      "type": "file",
      "name": "imgfile"
    },
    on: {
      "change": _vm.uploadImages
    }
  })], 1)]), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.imageArr.length > 0),
      expression: "imageArr.length > 0"
    }],
    staticClass: "edit_upload",
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "增加图片"
    }
  }, [_c('div', {
    staticClass: "upload-container"
  }, [_vm._l((_vm.imageArr), function(item, key) {
    return _c('div', {
      staticClass: "image-preview",
      on: {
        "click": function($event) {
          _vm.rmImage(key)
        }
      }
    }, [_c('div', {
      staticClass: "image-preview-wrapper"
    }, [_c('img', {
      attrs: {
        "src": _vm.imageURL + item + '-center100'
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "image-preview-action"
    }, [_c('i', {
      staticClass: "el-icon-delete"
    })])])])
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.imageArr.length < 9),
      expression: "imageArr.length < 9"
    }],
    staticClass: "image-preview"
  }, [_c('div', {
    staticClass: "image-preview-wrapper"
  }, [_c('div', {
    staticClass: "image-preview-action image-uploader"
  }, [_c('input', {
    attrs: {
      "type": "file",
      "name": "imgfile"
    },
    on: {
      "change": _vm.uploadImages
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "el-icon-plus"
  })])])])], 2)]), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "内容",
      "prop": "title"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea"
    },
    model: {
      value: (_vm.postForm.title),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "title", $$v)
      },
      expression: "postForm.title"
    }
  })], 1)], 1) : _c('el-col', [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    },
    attrs: {
      "label-width": "100px",
      "label": "内容",
      "prop": "title"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea"
    },
    model: {
      value: (_vm.postForm.title),
      callback: function($$v) {
        _vm.$set(_vm.postForm, "title", $$v)
      },
      expression: "postForm.title"
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', [_c('el-form-item', {
    staticStyle: {
      "padding-left": "20px"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.loading
    },
    on: {
      "click": _vm.submitForm
    }
  }, [_vm._v("编辑")])], 1)], 1)], 1)], 1), _vm._v(" "), _c('el-col', [_c('p', [_vm._v("评论列表")]), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.comments,
      "border": "",
      "height": "450"
    }
  }, [_c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "200",
      "fixed": "left"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.status === 'online') ? _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handelChangeStatus(scope.$index, scope.row, '下线')
            }
          }
        }, [_vm._v("下线\n                    ")]) : _c('el-button', {
          attrs: {
            "size": "small",
            "type": "danger"
          },
          on: {
            "click": function($event) {
              _vm.handelChangeStatus(scope.$index, scope.row, '上线')
            }
          }
        }, [_vm._v("上线\n                    ")]), _vm._v(" "), (scope.row.edit) ? _c('el-button', {
          attrs: {
            "type": "success",
            "size": "small",
            "icon": "el-icon-circle-check-outline"
          },
          on: {
            "click": function($event) {
              _vm.confirmEdit(scope.row)
            }
          }
        }, [_vm._v("完成")]) : _c('el-button', {
          attrs: {
            "type": "primary",
            "size": "small",
            "icon": "el-icon-edit"
          },
          on: {
            "click": function($event) {
              scope.row.edit = !scope.row.edit
            }
          }
        }, [_vm._v("编辑")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "author",
      "label": "评论人",
      "width": "180"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', {
          staticStyle: {
            "margin-left": "10px"
          }
        }, [_vm._v(_vm._s(scope.row.author.nickname))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "created_at",
      "label": "评论日期",
      "formatter": _vm.dateFormat,
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "content",
      "label": "内容",
      "min-width": "300px"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [(scope.row.edit) ? [_c('el-input', {
          staticClass: "edit-input",
          attrs: {
            "size": "small"
          },
          model: {
            value: (scope.row.content),
            callback: function($$v) {
              _vm.$set(scope.row, "content", $$v)
            },
            expression: "scope.row.content"
          }
        })] : _c('span', [_vm._v(_vm._s(scope.row.content))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "likes",
      "label": "点赞数"
    }
  })], 1), _vm._v(" "), _c('el-col', {
    staticClass: "toolbar",
    attrs: {
      "span": 24
    }
  }, [_c('el-pagination', {
    attrs: {
      "page-size": 1,
      "layout": "prev, pager, next, jumper",
      "total": _vm.total
    },
    on: {
      "current-change": _vm.handleCurrentChange
    }
  })], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "高德地图",
      "visible": _vm.showmaps,
      "close-on-click-modal": false,
      "width": "60%"
    },
    on: {
      "update:visible": function($event) {
        _vm.showmaps = $event
      }
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "height": "400px"
    },
    attrs: {
      "id": "container"
    }
  })]), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "视频预览",
      "visible": _vm.showVideos,
      "close-on-click-modal": false,
      "width": "60%"
    },
    on: {
      "update:visible": function($event) {
        _vm.showVideos = $event
      },
      "close": _vm.closeDialog
    }
  }, [_c('video', {
    ref: "showVideo",
    attrs: {
      "src": _vm.imageURL + _vm.videoUrl,
      "controls": "controls",
      "autoplay": "",
      "width": "100%",
      "height": "auto"
    }
  })])], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=12.5442d1dcb1ea39db164c.js.map