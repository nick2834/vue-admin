webpackJsonp([16],{

/***/ 1004:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1089)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1040),
  /* template */
  __webpack_require__(1123),
  /* scopeId */
  "data-v-2095a0da",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1040:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_api__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_untils__ = __webpack_require__(374);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            filename: '',
            downloadLoading: false,
            filters: {
                id: '',
                phone: '',
                nickname: ''
            },
            creditsList: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [], //列表选中列

            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: {
                credit: [{ required: true, message: 'type类型', trigger: 'blur' }]
            },
            //编辑界面数据
            editForm: {
                id: 0,
                nickname: '',
                credit: ''
            }
        };
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val;
            this.getUsers();
        },
        //获取用户列表
        getUsers() {
            this.listLoading = true;
            let nickname = '';
            let user_id = '';
            let phone = '';
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["B" /* creditsList */])(nickname, user_id, phone).then(res => {
                this.total = res.data.paging.total_pages;
                this.creditsList = res.data.users;
                this.listLoading = false;
            });
        },
        search() {
            if (this.filters.id == '' && this.filters.nickname == '' && this.filters.phone == '') {
                this.getUsers();
            } else if (this.filters.id == '' && this.filters.nickname == '') {
                this.listLoading = true;
                let nickname = '';
                let user_id = '';
                let phone = this.filters.phone;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["B" /* creditsList */])(nickname, user_id, phone).then(res => {
                    this.total = res.data.paging.total_pages;
                    this.creditsList = res.data.users;
                    this.listLoading = false;
                });
            } else if (this.filters.id == '' && this.filters.phone == '') {
                this.listLoading = true;
                let nickname = this.filters.nickname;
                let user_id = '';
                let phone = '';
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["B" /* creditsList */])(nickname, user_id, phone).then(res => {
                    this.total = res.data.paging.total_pages;
                    this.creditsList = res.data.users;
                    this.listLoading = false;
                });
            } else if (this.filters.nickname == '' && this.filters.phone == '') {
                this.listLoading = true;
                let nickname = '';
                let user_id = this.filters.id;
                let phone = '';
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["B" /* creditsList */])(nickname, user_id, phone).then(res => {
                    this.total = res.data.paging.total_pages;
                    this.creditsList = res.data.users;
                    this.listLoading = false;
                });
            }
        },
        cancelSearch() {
            this.page = 1;
            this.getUsers();
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
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["C" /* updateCredits */])(this.editForm.credit.id, this.editForm.credit.credit, this.editForm.credit.experience).then(res => {
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
        //修改
        handleEdit: function (index, row) {
            //this.$router.push({path: `/userInfo/${row.id}`});
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },

        selsChange: function (sels) {
            this.sels = sels;
        }

    },
    mounted() {
        this.$nextTick(() => {
            this.getUsers();
        });
    }
});

/***/ }),

/***/ 1064:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"integral.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1089:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1064);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("520fd1db", content, true);

/***/ }),

/***/ 1123:
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
      value: (_vm.filters.nickname),
      callback: function($$v) {
        _vm.$set(_vm.filters, "nickname", $$v)
      },
      expression: "filters.nickname"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "手机号"
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
      "click": _vm.search
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
      "data": _vm.creditsList,
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
      "width": "100",
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
        }, [_vm._v("修改")])]
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
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "credit.experience",
      "label": "经验值",
      "width": "100",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "credit.credit",
      "label": "当前积分",
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
      "label": "用户名",
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off",
      "disabled": ""
    },
    model: {
      value: (_vm.editForm.nickname),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "nickname", $$v)
      },
      expression: "editForm.nickname"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "当前积分",
      "prop": "description"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea",
      "disabled": ""
    },
    model: {
      value: (_vm.editForm.credit.credit),
      callback: function($$v) {
        _vm.$set(_vm.editForm.credit, "credit", $$v)
      },
      expression: "editForm.credit.credit"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "修改后积分",
      "prop": "permissions"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "type": "textarea"
          },
          model: {
            value: (_vm.editForm.credit.credit),
            callback: function($$v) {
              _vm.$set(_vm.editForm.credit, "credit", $$v)
            },
            expression: "editForm.credit.credit"
          }
        })]
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
//# sourceMappingURL=16.ce71beac2b9464a9ba85.js.map