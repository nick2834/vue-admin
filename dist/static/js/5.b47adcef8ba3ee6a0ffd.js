webpackJsonp([5],{

/***/ 1011:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1098)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1047),
  /* template */
  __webpack_require__(1132),
  /* scopeId */
  "data-v-5b331f8e",
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

/***/ 1047:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            filters: { name: '' },
            total: 0,
            totalCount: 0,
            page: 1,
            listLoading: false,
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: { name: [{ required: true, message: '请输入权限名', trigger: 'blur' }] },
            //编辑界面数据
            editForm: { id: null, name: null, description: null, role_type: null, permissions: [] },
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: { name: [{ required: true, message: '请输入权限名', trigger: 'blur' }] },
            //新增界面数据
            addForm: { name: '', role_type: [], description: '' },
            roles: [],
            permissionList: [],
            //设置权限界面
            setFormVisible: false,
            setLoading: false,
            setFormRules: { name: [{ required: true, message: '请输入权限名', trigger: 'blur' }] },
            setForm: { id: null, pid: [] }
        };
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val;
            this.getList();
        },
        //搜索
        getRoles() {
            if (this.filters.name == "") {
                var para = { page: this.page };
            } else {
                var para = { page: this.page, name: this.filters.name };
            }
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["j" /* roleList */])(para).then(res => {
                this.total = res.data.paging.total_pages;
                this.totalCount = res.data.paging.total_count;
                this.roles = res.data.roles;
                this.listLoading = false;
            });
        },
        //获取权限列表
        getList() {
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["j" /* roleList */])().then(res => {
                this.total = res.data.paging.total_pages;
                this.roles = res.data.roles;
                this.listLoading = false;
            });
        },
        getPermission() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["k" /* permissions */])().then(res => {
                this.permissionList = res.data.permissions;
            });
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let id = row.id;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["s" /* deleteRole */])(id).then(res => {
                    this.listLoading = false;
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getList();
                });
            }).catch(() => {});
        },
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate(valid => {
                let id = this.editForm.id;
                this.editLoading = true;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["t" /* reloadRole */])(id, this.editForm.name, this.editForm.description, this.editForm.role_type).then(res => {
                    this.editLoading = false;
                    if (res.code == 1) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getList();
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
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.addLoading = true;
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["u" /* createRole */])(this.addForm.name, this.addForm.description, this.addForm.role_type.join(",")).then(res => {
                        this.addLoading = false;
                        if (res.code == 1) {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.getList();
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
        },
        handleSet: function (index, row) {
            this.setFormVisible = true;
            this.setForm.id = row.id;
            this.setForm.name = row.name;
        },
        setSubmit: function () {
            this.$refs.setForm.validate(valid => {
                let id = this.setForm.id;
                this.setLoading = true;
                //                    setRolePermissions(id,this.setForm.pid.join(",")).then(res => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["v" /* setPermission */])(id, this.setForm.pid.join(",")).then(res => {
                    this.setLoading = false;
                    if (res.code == 1) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.getList();
                        this.setFormVisible = false;
                    } else {
                        this.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    }
                });
            });
        },
        //全选
        handleClose(tag) {
            console.log(this.dynamicTags);
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        }
    },
    mounted() {
        this.getList();
        this.getPermission();
    }
});

/***/ }),

/***/ 1073:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, ".el-tag+.el-tag[data-v-5b331f8e]{margin-left:10px}", "", {"version":3,"sources":["/Users/subang/bulunu-admin/src/views/permission/role.vue"],"names":[],"mappings":"AACA,iCACI,gBAAkB,CACrB","file":"role.vue","sourcesContent":["\n.el-tag + .el-tag[data-v-5b331f8e] {\n    margin-left: 10px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1098:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1073);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("1b04d8c8", content, true);

/***/ }),

/***/ 1132:
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
      "placeholder": "组名称"
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
      "click": _vm.getRoles
    }
  }, [_vm._v("查询")])], 1), _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.handleAdd
    }
  }, [_vm._v("新增")])], 1)], 1)], 1), _vm._v(" "), _c('el-table', {
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
      "data": _vm.roles,
      "highlight-current-row": ""
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "操作",
      "width": "300",
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
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleSet(scope.$index, scope.row)
            }
          }
        }, [_vm._v("设置权限")]), _vm._v(" "), _c('el-button', {
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
      "label": "权限组名",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "描述",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "permissions",
      "label": "权限组",
      "sortable": ""
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return _vm._l((scope.row.permissions), function(item, index) {
          return _c('el-tag', {
            key: item.id,
            attrs: {
              "closable": "",
              "type": "info"
            },
            on: {
              "close": function($event) {
                _vm.handleClose(item)
              }
            }
          }, [_vm._v(_vm._s(item.name) + "\n                ")])
        })
      }
    }])
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
      "label": "权限组名",
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
      "label": "描述",
      "prop": "description"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea"
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
      "label": "权限集合",
      "prop": "permissions"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return _vm._l((_vm.editForm.permissions), function(item) {
          return _c('el-checkbox', {
            key: item.id,
            attrs: {
              "label": item.name,
              "name": "role_type"
            }
          })
        })
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
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
  }, [_vm._v("提交")]), _vm._v(" "), _c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.editFormVisible = false
      }
    }
  }, [_vm._v("取消")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
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
      "label": "权限组名",
      "prop": "name"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.addForm.name),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "name", $$v)
      },
      expression: "addForm.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "权限集合"
    }
  }, [_c('el-checkbox-group', {
    model: {
      value: (_vm.addForm.role_type),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "role_type", $$v)
      },
      expression: "addForm.role_type"
    }
  }, _vm._l((_vm.permissionList), function(item) {
    return _c('el-checkbox', {
      key: item.id,
      attrs: {
        "label": item.id,
        "name": "role_type"
      }
    }, [_vm._v("\n                        " + _vm._s(item.name) + "\n                    ")])
  }))], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "描述",
      "prop": "description"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.addForm.description),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "description", $$v)
      },
      expression: "addForm.description"
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
  }, [_vm._v("提交")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "新增权限",
      "close-on-click-modal": false
    },
    model: {
      value: (_vm.setFormVisible),
      callback: function($$v) {
        _vm.setFormVisible = $$v
      },
      expression: "setFormVisible"
    }
  }, [_c('el-form', {
    ref: "setForm",
    attrs: {
      "model": _vm.setForm,
      "label-width": "80px",
      "rules": _vm.setFormRules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "权限组名",
      "prop": "name"
    }
  }, [_c('el-input', {
    model: {
      value: (_vm.setForm.name),
      callback: function($$v) {
        _vm.$set(_vm.setForm, "name", $$v)
      },
      expression: "setForm.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "权限集合"
    }
  }, [_c('el-checkbox-group', {
    model: {
      value: (_vm.setForm.pid),
      callback: function($$v) {
        _vm.$set(_vm.setForm, "pid", $$v)
      },
      expression: "setForm.pid"
    }
  }, _vm._l((_vm.permissionList), function(item) {
    return _c('el-checkbox', {
      key: item.id,
      attrs: {
        "label": item.id,
        "name": "pid"
      }
    }, [_vm._v("\n                        " + _vm._s(item.name) + "\n                    ")])
  }))], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.setFormVisible = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.addLoading
    },
    nativeOn: {
      "click": function($event) {
        _vm.setSubmit($event)
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
//# sourceMappingURL=5.b47adcef8ba3ee6a0ffd.js.map