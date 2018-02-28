webpackJsonp([18],{

/***/ 1001:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1106)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1037),
  /* template */
  __webpack_require__(1139),
  /* scopeId */
  "data-v-a5db3fbe",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1037:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_api__ = __webpack_require__(159);
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

//import NProgress from 'nprogress'

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        const cityOptions = ['text', 'image'];
        return {
            downloadLoading: false,
            filters: {
                content: '',
                id: '',
                phone: '',
                name: ''
            },
            checkAll: false,
            checkedCities: ['text'],
            cities: cityOptions,
            isIndeterminate: true,
            commentsList: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [], //列表选中列

            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [{ required: true, message: '', trigger: 'blur' }]
            },
            //编辑界面数据
            editForm: {
                id: 0,
                content: '',
                link: '',
                comment_type: ''
            }
        };
    },
    methods: {
        dateFormat: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return new Date(date).format("Y-MM-dd hh:mm:ss");
        },
        handleCurrentChange(val) {
            this.page = val;
            this._getList();
        },
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        //获取用户列表
        _getList() {
            if (this.filters.id == "" && this.filters.name == "" && this.filters.phone == "" && this.filters.content == "") {
                var para = { page: this.page };
            } else if (this.filters.id == "" && this.filters.name == "" && this.filters.content == "") {
                var para = { page: this.page, phone: this.filters.phone };
            } else if (this.filters.id == "" && this.filters.phone == "" && this.filters.content == "") {
                var para = { page: this.page, name: this.filters.name };
            } else if (this.filters.name == "" && this.filters.phone == "" && this.filters.content == "") {
                var para = { page: this.page, user_id: this.filters.id };
            } else if (this.filters.id == "" && this.filters.name == "" && this.filters.phone == "") {
                var para = { page: this.page, content: this.filters.content };
            }
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["D" /* commentsList */])(para).then(res => {
                if (res.code === 1) {
                    this.total = res.data.paging.total_pages;
                    this.commentsList = res.data.comments;
                    this.listLoading = false;
                } else {
                    this.$router.push({ path: '/login' });
                }
            });
        },
        cancelSearch() {
            this.page = 1;
            this._getList();
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        let id = this.editForm.id;
                        var content = this.editForm.content;
                        var link = this.editForm.link;
                        var comment_type = this.editForm.comment_type;
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["E" /* updataComments */])(id, content, link, comment_type).then(res => {
                            this.editLoading = false;
                            //NProgress.done();
                            if (res.code == 1) {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.editFormVisible = false;
                                this._getList();
                            } else {
                                this.$message({
                                    message: '未知错误',
                                    type: 'error'
                                });
                            }
                        });
                    });
                }
            });
        },
        //修改
        handleEdit: function (index, row) {
            //this.$router.push({path: `/userInfo/${row.id}`});
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //评论上下线
        handleStatus(index, row) {
            if (row.status === 'online') {
                var mystatus = '下线';
                var status = 'offline';
            } else {
                var mystatus = '上线';
                var status = 'online';
            }
            this.$confirm('是否' + mystatus + '该评论?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                let id = row.id;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["F" /* commentStatus */])(id, status).then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        this.$message({
                            type: 'success',
                            message: res.msg
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                    this._getList();
                });
            }).catch(() => {});
        },
        selsChange: function (sels) {
            this.sels = sels;
        }

    },
    mounted() {
        this.$nextTick(() => {
            this._getList();
        });
    }
});

/***/ }),

/***/ 1081:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"comment.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1106:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1081);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("0d7fac70", content, true);

/***/ }),

/***/ 1139:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding-bottom": "0px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('el-form', {
    attrs: {
      "inline": true,
      "model": _vm.filters
    }
  }, [_c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "评论内容"
    },
    model: {
      value: (_vm.filters.content),
      callback: function($$v) {
        _vm.$set(_vm.filters, "content", $$v)
      },
      expression: "filters.content"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "作者名称"
    },
    model: {
      value: (_vm.filters.name),
      callback: function($$v) {
        _vm.$set(_vm.filters, "name", $$v)
      },
      expression: "filters.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "作者id"
    },
    model: {
      value: (_vm.filters.id),
      callback: function($$v) {
        _vm.$set(_vm.filters, "id", $$v)
      },
      expression: "filters.id"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "作者手机号"
    },
    model: {
      value: (_vm.filters.phone),
      callback: function($$v) {
        _vm.$set(_vm.filters, "phone", $$v)
      },
      expression: "filters.phone"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm._getList
    }
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: (_vm.listLoading),
      expression: "listLoading"
    }],
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.commentsList,
      "highlight-current-row": "",
      "border": "",
      "fit": "",
      "height": "450"
    },
    on: {
      "selection-change": _vm.selsChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "200",
      "fixed": "left",
      "prop": "status"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleEdit(scope.$index, scope.row)
            }
          }
        }, [_vm._v("修改")]), _vm._v(" "), (scope.row.status === 'offline') ? _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleStatus(scope.$index, scope.row)
            }
          }
        }, [_vm._v("上线\n                ")]) : _c('el-button', {
          attrs: {
            "type": "danger",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleStatus(scope.$index, scope.row)
            }
          }
        }, [_vm._v("下线\n                ")])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "id",
      "width": "100",
      "label": "ID",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "content",
      "label": "评论内容",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "topic_id",
      "label": "话题ID",
      "width": "150",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "author.nickname",
      "label": "作者",
      "width": "100",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "created_at",
      "label": "创建时间",
      "width": "300",
      "formatter": _vm.dateFormat,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "likes",
      "label": "点赞数",
      "sortable": ""
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "编辑",
      "close-on-click-modal": false
    },
    model: {
      value: (_vm.editFormVisible),
      callback: function($$v) {
        _vm.editFormVisible = $$v
      },
      expression: "editFormVisible"
    }
  }, [_c('el-form', {
    ref: "editForm",
    attrs: {
      "model": _vm.editForm,
      "rules": _vm.editFormRules,
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "评论内容",
      "prop": "content"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.editForm.content),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "content", $$v)
      },
      expression: "editForm.content"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "评论链接",
      "prop": "link"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea"
    },
    model: {
      value: (_vm.editForm.link),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "link", $$v)
      },
      expression: "editForm.link"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "评论类型",
      "prop": "checkedCities"
    }
  }, [_c('el-checkbox-group', {
    on: {
      "change": _vm.handleCheckedCitiesChange
    },
    model: {
      value: (_vm.checkedCities),
      callback: function($$v) {
        _vm.checkedCities = $$v
      },
      expression: "checkedCities"
    }
  }, _vm._l((_vm.cities), function(city) {
    return _c('el-checkbox', {
      key: city,
      attrs: {
        "label": city
      }
    }, [_vm._v(_vm._s(city))])
  }))], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.editLoading
    },
    on: {
      "click": _vm.editSubmit
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.editFormVisible = false
      }
    }
  }, [_vm._v("取消")])], 1)], 1), _vm._v(" "), _c('el-col', {
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
  })], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=18.d2a9add6921116aa0434.js.map