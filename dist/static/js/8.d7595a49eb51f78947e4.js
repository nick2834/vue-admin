webpackJsonp([8],{

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

/***/ 1035:
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


//import NProgress from 'nprogress'


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            filters: {
                brand: '',
                mod: '',
                owner: '',
                phone: '',
                license: '',
                id: ''
            },
            total: 0,
            page: 1,
            levels: [],
            listLoading: false,
            sels: [], //列表选中列
            params: {
                page: 1
            },
            map: new Map(),
            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: {},
            //编辑界面数据
            editForm: {
                id: 0,
                license: '',
                brand_id: '',
                colour: '',
                mileage: '',
                buy_time: '',
                inspection_time: '',
                phone: ''
            },
            addLoading: false,
            carsLists: []
        };
    },
    methods: {
        handleCurrentChange(val) {
            this.page = val;
            this.getPerList();
        },
        //获取用户列表
        getPerList() {
            let that = this;
            for (const i in that.filters) {
                that.map.set(i, that.filters[i]);
                that.map.forEach((val, key, obj) => {
                    that.params[key] = val;
                });
            }
            this.getList(this.params);
        },
        getList(params) {
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["h" /* carsList */])(params).then(res => {
                if (res.code === 1) {
                    this.total = res.data.paging.total_pages;
                    this.carsLists = res.data.cars;
                    this.listLoading = false;
                }
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
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["i" /* updatacars */])(this.filters.id, this.filters.license, this.filters.brand_id, this.filters.mod, this.filters.colour, this.filters.mileage, this.filters.buy_time, this.filters.inspection_time).then(res => {
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
                deletePermissions(para).then(res => {
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
        addSubmit() {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    this.addLoading = true;
                    let para = {
                        name: this.addForm.name,
                        description: this.addForm.description,
                        permission_type: this.addForm.permission_type
                    };
                    createPermission(para).then(res => {
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

/***/ 1075:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"info.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1100:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1075);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("274a5572", content, true);

/***/ }),

/***/ 1134:
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
      "placeholder": "车辆id"
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
      "placeholder": "车辆品牌"
    },
    model: {
      value: (_vm.filters.brand),
      callback: function($$v) {
        _vm.$set(_vm.filters, "brand", $$v)
      },
      expression: "filters.brand"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "型号"
    },
    model: {
      value: (_vm.filters.mod),
      callback: function($$v) {
        _vm.$set(_vm.filters, "mod", $$v)
      },
      expression: "filters.mod"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "车牌号"
    },
    model: {
      value: (_vm.filters.license),
      callback: function($$v) {
        _vm.$set(_vm.filters, "license", $$v)
      },
      expression: "filters.license"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "车主名称"
    },
    model: {
      value: (_vm.filters.owner),
      callback: function($$v) {
        _vm.$set(_vm.filters, "owner", $$v)
      },
      expression: "filters.owner"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "车主手机号"
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
      "click": _vm.getPerList
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
      "data": _vm.carsLists,
      "highlight-current-row": "",
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
      "prop": "name",
      "label": "车辆别名",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "license",
      "label": "车牌号",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "brand",
      "label": "品牌",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "mod",
      "label": "型号",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "owner",
      "label": "车主名称",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "phone",
      "label": "车主手机号",
      "width": "300",
      "sortable": ""
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "新增信息",
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
      "label": "车主手机号码",
      "prop": "name"
    }
  }, [_c('el-input', {
    attrs: {
      "auto-complete": "off"
    },
    model: {
      value: (_vm.editForm.phone),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "phone", $$v)
      },
      expression: "editForm.phone"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "车主姓名"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.editForm.owner),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "owner", $$v)
      },
      expression: "editForm.owner"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "车牌号"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.editForm.license),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "license", $$v)
      },
      expression: "editForm.license"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "车辆品牌"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.editForm.brand),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "brand", $$v)
      },
      expression: "editForm.brand"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "车辆型号"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text"
    },
    model: {
      value: (_vm.editForm.mod),
      callback: function($$v) {
        _vm.$set(_vm.editForm, "mod", $$v)
      },
      expression: "editForm.mod"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "label": "车辆别名"
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
  }, [_vm._v("保存")])], 1)], 1), _vm._v(" "), _c('el-col', {
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

/***/ }),

/***/ 999:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1100)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1035),
  /* template */
  __webpack_require__(1134),
  /* scopeId */
  "data-v-5d33dc76",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});
//# sourceMappingURL=8.d7595a49eb51f78947e4.js.map