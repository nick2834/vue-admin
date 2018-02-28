webpackJsonp([7],{

/***/ 1009:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1088)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1045),
  /* template */
  __webpack_require__(1122),
  /* scopeId */
  "data-v-1e664776",
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

/***/ 1045:
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
//


//import NProgress from 'nprogress'

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            filters: { filter: 'internal', name: '', phone: '', user_id: '' },
            users: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [], //列表选中列
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: { name: [{ required: true, message: '请输入权限名', trigger: 'blur' }] },
            //编辑界面数据
            editForm: { id: 0, name: '', description: '' },
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: { name: [{ required: true, message: '请输入权限名', trigger: 'blur' }] },
            //新增界面数据
            addForm: { user: '', password: '', region: [], gender: '' },
            roles: [],
            permissionList: [],
            setRolesBox: false,
            setRolesForm: { id: '', name: '', rid: [] },
            setRolesPid: [],
            checkedCities1: [],
            cities: []

        };
    },
    methods: {
        getRoleList() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["j" /* roleList */])().then(res => {
                this.setRolesPid = res.data.roles;
                this.cities = this.setRolesPid;
            });
        },
        //性别显示转换
        formatSex: function (row, column) {
            return row.gender == 'male' ? '男' : row.gender == 'female' ? '女' : '未知';
        },
        dateFormat: function (row, column) {
            var date = row[column.property];
            if (date == undefined) {
                return "";
            }
            return new Date(date).format("Y-MM-dd hh:mm:ss");
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getUsers();
        },
        getPermission() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["k" /* permissions */])().then(res => {});
        },
        //获取用户列表
        getUsers() {
            if (this.filters.id == "" && this.filters.name == "") {
                var para = { page: this.page };
            } else if (this.filters.id == "") {
                var para = { page: this.page, name: this.filters.name, filter: this.filters.filter };
            } else if (this.filters.name == "") {
                var para = { page: this.page, user_id: this.filters.id, filter: this.filters.filter };
            }
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["l" /* userList */])(para).then(res => {
                this.total = res.data.paging.total_pages;
                this.users = res.data.users;
                this.listLoading = false;
            });
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                //NProgress.start();
                let para = { id: row.id };
                removeUser(para).then(res => {
                    this.listLoading = false;
                    //NProgress.done();
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getUsers();
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
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        editUser(para).then(res => {
                            this.editLoading = false;
                            //NProgress.done();
                            if (res.code == 1) {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.editFormVisible = false;
                                this.getUsers();
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
        //注销
        handleCancle(index, row) {
            this.$confirm('此操作将永久注销该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["m" /* logOutUser */])(row.id).then(res => {
                    if (res.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '注销成功!'
                        });
                    } else {
                        this.$message({
                            message: '未知错误',
                            type: 'error'
                        });
                    }
                    this.getUsers();
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消注销'
                });
            });
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.$confirm('确认提交吗？', '提示', {}).then(() => {
                        this.addLoading = true;
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["n" /* addAdmins */])(this.addForm.name, this.addForm.password, this.addForm.gender).then(res => {
                            this.addLoading = false;
                            if (res.code == 1) {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.$refs['addForm'].resetFields();
                                this.addFormVisible = false;
                                this.getUsers();
                            } else {
                                this.$message({
                                    message: '未知错误',
                                    type: 'error'
                                });
                            }
                            //NProgress.done();
                        });
                    });
                }
            });
        },
        setRoles(index, row) {
            this.setRolesForm.id = row.id;
            this.setRolesForm.name = row.name;
            this.setRolesBox = true;
        },
        handleChecked(val) {
            this.setRolesForm.rid = val;
        },
        editRoles() {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["o" /* setRole */])(this.setRolesForm.id, this.setRolesForm.rid.join(',')).then(res => {
                console.log(res);
            });
        },
        selsChange: function (sels) {
            this.sels = sels;
        }
    },
    mounted() {
        this.getUsers();
        this.getPermission();
        this.getRoleList();
    }
});

/***/ }),

/***/ 1063:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"manager.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1088:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1063);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("dbb639e0", content, true);

/***/ }),

/***/ 1122:
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
      "placeholder": "用户ID"
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
      "placeholder": "用户名"
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
      "click": _vm.getUsers
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
      "data": _vm.users,
      "highlight-current-row": "",
      "border": "",
      "height": "550"
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
      "width": "250",
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
        }, [_vm._v("修改")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "default",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleCancle(scope.$index, scope.row)
            }
          }
        }, [_vm._v("注销")]), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "default",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.setRoles(scope.$index, scope.row)
            }
          }
        }, [_vm._v("分配角色")])]
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
      "prop": "nickname",
      "label": "用户名",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "name",
      "label": "姓名",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "gender",
      "label": "性别",
      "width": "220",
      "formatter": _vm.formatSex,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "created_at",
      "label": "注册时间",
      "width": "300",
      "formatter": _vm.dateFormat,
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
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "用户名",
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
      "label": "描述"
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
      "loading": _vm.editLoading
    },
    nativeOn: {
      "click": function($event) {
        _vm.editSubmit($event)
      }
    }
  }, [_vm._v("提交")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "新增后台用户",
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
      "label": "用户名",
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
      "label": "密码",
      "prop": "password"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.addForm.password),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "password", $$v)
      },
      expression: "addForm.password"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "性别"
    }
  }, [_c('el-radio-group', {
    model: {
      value: (_vm.addForm.gender),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "gender", $$v)
      },
      expression: "addForm.gender"
    }
  }, [_c('el-radio', {
    attrs: {
      "label": "male",
      "formatter": _vm.formatSex
    }
  }), _vm._v(" "), _c('el-radio', {
    attrs: {
      "label": "female",
      "formatter": _vm.formatSex
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "权限集合"
    }
  }, [_c('el-checkbox-group', {
    model: {
      value: (_vm.addForm.region),
      callback: function($$v) {
        _vm.$set(_vm.addForm, "region", $$v)
      },
      expression: "addForm.region"
    }
  }, [_c('el-checkbox', {
    attrs: {
      "label": "权限一",
      "name": "type"
    }
  }), _vm._v(" "), _c('el-checkbox', {
    attrs: {
      "label": "权限二",
      "name": "type"
    }
  }), _vm._v(" "), _c('el-checkbox', {
    attrs: {
      "label": "权限三",
      "name": "type"
    }
  }), _vm._v(" "), _c('el-checkbox', {
    attrs: {
      "label": "权限四",
      "name": "type"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('div', {
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
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "设置用户角色",
      "close-on-click-modal": false
    },
    model: {
      value: (_vm.setRolesBox),
      callback: function($$v) {
        _vm.setRolesBox = $$v
      },
      expression: "setRolesBox"
    }
  }, [_c('el-form', {
    ref: "editForm",
    attrs: {
      "model": _vm.setRolesForm,
      "label-width": "80px"
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "用户名",
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.setRolesForm.name),
      callback: function($$v) {
        _vm.$set(_vm.setRolesForm, "name", $$v)
      },
      expression: "setRolesForm.name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "权限集合"
    }
  }, [_c('el-checkbox-group', {
    on: {
      "change": _vm.handleChecked
    },
    model: {
      value: (_vm.checkedCities1),
      callback: function($$v) {
        _vm.checkedCities1 = $$v
      },
      expression: "checkedCities1"
    }
  }, _vm._l((_vm.cities), function(item) {
    return _c('el-checkbox', {
      key: item.id,
      attrs: {
        "label": item.id
      }
    }, [_vm._v(_vm._s(item.name))])
  }))], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    nativeOn: {
      "click": function($event) {
        _vm.setRolesBox = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary",
      "loading": _vm.editLoading
    },
    nativeOn: {
      "click": function($event) {
        _vm.editRoles($event)
      }
    }
  }, [_vm._v("提交")])], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=7.b0e3b20936cb9c0c6565.js.map