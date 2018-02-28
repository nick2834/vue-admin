webpackJsonp([6],{

/***/ 1010:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1092)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1046),
  /* template */
  __webpack_require__(1126),
  /* scopeId */
  "data-v-39cf7067",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1017:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) {
        s = '0' + s;
    }
    return s;
};

/* unused harmony default export */ var _unused_webpack_default_export = ({
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null) context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    formatDate: {
        format: function (date, pattern) {
            pattern = pattern || DEFAULT_PATTERN;
            return pattern.replace(SIGN_REGEXP, function ($0) {
                switch ($0.charAt(0)) {
                    case 'y':
                        return padding(date.getFullYear(), $0.length);
                    case 'M':
                        return padding(date.getMonth() + 1, $0.length);
                    case 'd':
                        return padding(date.getDate(), $0.length);
                    case 'w':
                        return date.getDay() + 1;
                    case 'h':
                        return padding(date.getHours(), $0.length);
                    case 'm':
                        return padding(date.getMinutes(), $0.length);
                    case 's':
                        return padding(date.getSeconds(), $0.length);
                }
            });
        },
        parse: function (dateString, pattern) {
            var matchs1 = pattern.match(SIGN_REGEXP);
            var matchs2 = dateString.match(/(\d)+/g);
            if (matchs1.length == matchs2.length) {
                var _date = new Date(1970, 0, 1);
                for (var i = 0; i < matchs1.length; i++) {
                    var _int = parseInt(matchs2[i]);
                    var sign = matchs1[i];
                    switch (sign.charAt(0)) {
                        case 'y':
                            _date.setFullYear(_int);break;
                        case 'M':
                            _date.setMonth(_int - 1);break;
                        case 'd':
                            _date.setDate(_int);break;
                        case 'h':
                            _date.setHours(_int);break;
                        case 'm':
                            _date.setMinutes(_int);break;
                        case 's':
                            _date.setSeconds(_int);break;
                    }
                }
                return _date;
            }
            return null;
        }

    }

});

/***/ }),

/***/ 1046:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_util__ = __webpack_require__(1017);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_api__ = __webpack_require__(159);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        return {
            filters: {
                name: ''
            },
            total: 0,
            page: 1,
            permissonList: [],
            levels: [],
            listLoading: false,
            sels: [], //列表选中列

            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
            },
            //编辑界面数据
            editForm: {
                id: 0,
                name: '',
                description: '',
                permission_type: ''
            },

            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
            },
            //新增界面数据
            addForm: {
                name: '',
                description: '',
                permission_type: ''
            }
        };
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val;
            this.getPerList();
        },
        //获取用户列表
        getPerList() {
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["k" /* permissions */])().then(res => {
                this.permissonList = res.data.permissions;
                this.listLoading = false;
                this.total = res.data.paging.total_pages;
            });
        },
        search() {
            if (this.filters.name == "") {
                var para = { page: this.page };
            } else {
                var para = { page: this.page, name: this.filters.name };
            }
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["k" /* permissions */])(para).then(res => {
                this.permissonList = res.data.permissions;
                this.listLoading = false;
                this.total = res.data.paging.total_pages;
            });
        },
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //编辑
        editSubmit: function (index, row) {
            this.$refs.editForm.validate(valid => {
                let id = this.editForm.id;
                this.editLoading = true;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["p" /* reloadPermissions */])(id, this.editForm.name, this.editForm.description, this.editForm.role_type).then(res => {
                    this.editLoading = false;
                    if (res.code == 1) {
                        this.$message({
                            message: '更新成功',
                            type: 'success'
                        });
                        this.getPerList();
                        this.editFormVisible = false;
                    } else {
                        this.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    }
                });
            });
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let para = row.id;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["q" /* deletePermissions */])(para).then(res => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.getPerList();
                });
            }).catch(() => {});
        },
        selsChange: function (sels) {
            this.sels = sels;
        },
        //批量删除
        batchRemove: function () {
            var ids = this.sels.map(item => item.id).toString();
            this.$confirm('确认删除选中记录吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = { ids: ids };
                batchRemoveUser(para).then(res => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getPerList();
                });
            }).catch(() => {});
        },
        handleAdd() {
            this.addFormVisible = true;
        },
        handleSysAdd() {
            var routeArr = [];
            var permissionArr = [];
            this.$router.options.routes.map(res => {
                if (res.hidden) {
                    return;
                } else {
                    routeArr.push(res);
                }
            });
            routeArr.map(res => {
                res.children.map(res => {
                    if (res.hidden) {
                        return;
                    } else {
                        permissionArr.push(res);
                    }
                });
            });
            permissionArr.map(res => {
                let para = {
                    name: res.name,
                    description: res.path,
                    permission_type: res.path
                };
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["r" /* createPermission */])(para).then(res => {
                    console.log(res);
                });
            });
        },
        addSubmit() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.addLoading = true;
                    let para = {
                        name: this.addForm.name,
                        description: this.addForm.description,
                        permission_type: this.addForm.permission_type
                    };
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["r" /* createPermission */])(para).then(res => {
                        this.addLoading = false;
                        if (res.code == 1) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.getPerList();
                            this.addFormVisible = false;
                        } else {
                            this.$message({
                                message: '未知错误',
                                type: 'error'
                            });
                        }
                    });
                }
            });
        }
    },
    mounted() {
        this.getPerList();
    }
});

/***/ }),

/***/ 1067:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"permission.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1092:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1067);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("1b99151b", content, true);

/***/ }),

/***/ 1126:
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
      "placeholder": "权限名"
    },
    model: {
      value: (_vm.filters.name),
      callback: function($$v) {
        _vm.$set(_vm.filters, "name", $$v)
      },
      expression: "filters.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.search
    }
  }, [_vm._v("查询")])], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.handleAdd
    }
  }, [_vm._v("新增")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "disabled": ""
    },
    on: {
      "click": _vm.handleSysAdd
    }
  }, [_vm._v("增加系统列表")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
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
      "data": _vm.permissonList,
      "highlight-current-row": ""
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
      "fixed": "left"
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
        }, [_vm._v("编辑")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "danger",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleDel(scope.$index, scope.row)
            }
          }
        }, [_vm._v("删除")])]
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
      "prop": "name",
      "label": "角色名",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "name",
      "label": "说明",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "路由",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "permission_type",
      "label": "类型",
      "sortable": ""
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "新增权限",
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
      "label-width": "80px",
      "rules": _vm.editFormRules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "角色名",
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.editForm.name),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "name", $$v)
      },
      expression: "editForm.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "说明"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.editForm.description),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "description", $$v)
      },
      expression: "editForm.description"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "类型"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.editForm.permission_type),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "permission_type", $$v)
      },
      expression: "editForm.permission_type"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.editFormVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.addLoading
    },
    nativeOn: {
      "click": function($event) {
        _vm.editSubmit($event)
      }
    }
  }, [_vm._v("提交")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "新增权限",
      "close-on-click-modal": false
    },
    model: {
      value: (_vm.addFormVisible),
      callback: function($$v) {
        _vm.addFormVisible = $$v
      },
      expression: "addFormVisible"
    }
  }, [_c('el-form', {
    ref: "addForm",
    attrs: {
      "model": _vm.addForm,
      "label-width": "80px",
      "rules": _vm.addFormRules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "角色名",
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.addForm.name),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "name", $$v)
      },
      expression: "addForm.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "说明",
      "prop": "description"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.addForm.description),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "description", $$v)
      },
      expression: "addForm.description"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "类型",
      "prop": "permission_type"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.addForm.permission_type),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "permission_type", $$v)
      },
      expression: "addForm.permission_type"
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.addFormVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.addLoading
    },
    nativeOn: {
      "click": function($event) {
        _vm.addSubmit($event)
      }
    }
  }, [_vm._v("提交")])], 1)], 1), _vm._v(" "), _c('el-col', {
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
//# sourceMappingURL=6.b58b68bf2cad75b6c781.js.map