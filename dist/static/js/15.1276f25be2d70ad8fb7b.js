webpackJsonp([15],{

/***/ 1005:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1095)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1041),
  /* template */
  __webpack_require__(1129),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1041:
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


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            form: {
                uid: '',
                content: ''
            },
            selecLabel: 'one',
            filters: {
                user_id: '',
                phone: '',
                name: ''
            },
            map: new Map(),
            params: {},
            userDetail: [],
            detailist: false,
            userIdArr: [],
            pushRules: {
                uid: [{ required: true, message: '用户ID必填', trigger: 'change' }],
                content: [{ required: true, message: '推送内容为必填项', trigger: 'change' }]
            }
        };
    },
    methods: {
        getUsers() {
            let that = this;
            for (let i in that.filters) {
                that.map.set(i, that.filters[i]);
            }
            that.map.forEach((val, key, obj) => {
                if (val === '') {
                    return;
                } else {
                    that.params[key] = val;
                    that._initUser(that.params);
                }
            });
        },
        _initUser(params) {
            this.detailist = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["l" /* userList */])(params).then(res => {
                if (res.code === 1) {
                    this.userDetail = res.data.users;
                }
            });
        },
        handleSelectionChange(val) {
            val.map(res => {
                this.userIdArr.push(res.id);
                this.form.uid = this.userIdArr.join(',');
            });
        },
        handelCancle() {
            this.filters.user_id = '';
            this.filters.phone = '';
            this.filters.name = '';
            this.map.forEach((val, key, obj) => {
                this.params[key] = '';
            });
            this.detailist = false;
        },
        selectChange() {
            if (this.selecLabel === 'all') {
                this.form.uid = 'all';
            } else {
                this.form.uid = this.userIdArr.join(',');
            }
        },
        getFilters() {
            this.$nextTick(() => {
                for (let i in this.filters) {
                    this.filters[i] = '';
                }
                this.handelCancle();
            });
        },
        onSubmit() {
            this.$refs['form'].validate(valid => {
                if (valid) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["w" /* movement */])(this.form).then(res => {
                        if (res.code === 1) {
                            this.$notify({
                                title: '成功',
                                message: res.msg,
                                type: 'success',
                                duration: 2000
                            });
                            this.loading = false;
                        } else {
                            this.$notify({
                                title: '失败',
                                message: res.msg,
                                type: 'danger',
                                duration: 2000
                            });
                        }
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
});

/***/ }),

/***/ 1070:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"push.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1095:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1070);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("3bad2b79", content, true);

/***/ }),

/***/ 1129:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-form', {
    ref: "form",
    staticStyle: {
      "padding-top": "20px"
    },
    attrs: {
      "model": _vm.form,
      "label-width": "100px",
      "rules": _vm.pushRules
    }
  }, [_c('el-form-item', {
    attrs: {
      "label": "推送类型"
    }
  }, [_c('el-select', {
    attrs: {
      "placeholder": "请选择推送类型"
    },
    on: {
      "change": _vm.selectChange
    },
    model: {
      value: (_vm.selecLabel),
      callback: function($$v) {
        _vm.selecLabel = $$v
      },
      expression: "selecLabel"
    }
  }, [_c('el-option', {
    attrs: {
      "label": "所有人",
      "value": "all"
    }
  }), _vm._v(" "), _c('el-option', {
    attrs: {
      "label": "单点推送",
      "value": "one"
    }
  })], 1)], 1), _vm._v(" "), (_vm.selecLabel === 'one') ? [_c('el-form-item', {
    attrs: {
      "label": "选择推送人"
    }
  }, [_c('el-form', {
    ref: "filters",
    attrs: {
      "inline": true,
      "model": _vm.filters
    }
  }, [_c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "用户ID"
    },
    on: {
      "focus": _vm.getFilters
    },
    model: {
      value: (_vm.filters.user_id),
      callback: function($$v) {
        _vm.$set(_vm.filters, "user_id", $$v)
      },
      expression: "filters.user_id"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "手机号"
    },
    on: {
      "focus": _vm.getFilters
    },
    model: {
      value: (_vm.filters.phone),
      callback: function($$v) {
        _vm.$set(_vm.filters, "phone", $$v)
      },
      expression: "filters.phone"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "用户名"
    },
    on: {
      "focus": _vm.getFilters
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
  }, [_vm._v("查询")])], 1)], 1)], 1), _vm._v(" "), _c('el-form-item', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.detailist),
      expression: "detailist"
    }],
    attrs: {
      "label": "推送人列表"
    }
  }, [_c('el-table', {
    ref: "multipleTable",
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.userDetail,
      "tooltip-effect": "dark"
    },
    on: {
      "selection-change": _vm.handleSelectionChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "id",
      "label": "用户ID",
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "nickname",
      "label": "昵称",
      "width": "180"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "phone",
      "label": "手机号"
    }
  })], 1)], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "推送人",
      "prop": "uid"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.form.uid),
      callback: function($$v) {
        _vm.$set(_vm.form, "uid", $$v)
      },
      expression: "form.uid"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "推送内容",
      "prop": "content"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea"
    },
    model: {
      value: (_vm.form.content),
      callback: function($$v) {
        _vm.$set(_vm.form, "content", $$v)
      },
      expression: "form.content"
    }
  })], 1)] : [_c('el-form-item', {
    attrs: {
      "label": "推送内容",
      "prop": "content"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "textarea"
    },
    model: {
      value: (_vm.form.content),
      callback: function($$v) {
        _vm.$set(_vm.form, "content", $$v)
      },
      expression: "form.content"
    }
  })], 1)], _vm._v(" "), _c('el-form-item', [_c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.onSubmit
    }
  }, [_vm._v("立即发送")]), _vm._v(" "), _c('el-button', [_vm._v("取消")])], 1)], 2)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=15.1276f25be2d70ad8fb7b.js.map