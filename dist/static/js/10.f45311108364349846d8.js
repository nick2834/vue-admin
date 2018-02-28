webpackJsonp([10],{

/***/ 1015:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1085)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1050),
  /* template */
  __webpack_require__(1119),
  /* scopeId */
  "data-v-0e841de7",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1050:
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



/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            filename: '',
            downloadLoading: false,
            filters: {
                id: '',
                phone: '',
                name: ''
            },
            users: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [],
            params: {
                page: 1
            },
            map: new Map()
        };
    },
    methods: {
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
        internal: function (row, column) {
            return !row.internal_user ? '否' : '是';
        },
        handleCurrentChange(val) {
            this.filters.id = '';
            this.filters.phone = '';
            this.filters.name = '';
            this.params.page = val;
            this.getUsers();
        },
        //获取用户列表
        getUsers() {
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
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["l" /* userList */])(params).then(res => {
                if (res.code === 1) {
                    this.total = res.data.paging.total_pages;
                    this.users = res.data.users;
                    this.listLoading = false;
                } else {
                    this.$router.push({ path: '/login' });
                }
            }).catch(err => {
                this.$router.push({ path: '/login' });
            });
        },
        cancelSearch() {
            this.map.forEach((val, key, obj) => {
                this.params[key] = '';
            });
            this.getList(this.params);
        },
        getFilters() {
            this.$nextTick(() => {
                for (const i in this.filters) {
                    this.filters[i] = '';
                }
                this.map.forEach((val, key, obj) => {
                    this.params[key] = '';
                });
            });
        },
        //查看
        handleEdit: function (index, row) {
            this.$router.push({ path: `/userInfo/${row.id}` });
        },
        //内部用户设置
        handleInternal(index, row) {
            this.$confirm('是否将该用户设为内部用户?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                let para = row.id;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["O" /* InternalUsers */])(para).then(res => {
                    if (res.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '设置成功!'
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
                    message: '已取消设置'
                });
            });
        },
        selsChange: function (sels) {
            this.sels = sels;
        },
        handleCancle(index, row) {
            this.$confirm('此操作将永久注销该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["m" /* logOutUser */])(row.id).then(res => {
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
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消注销'
                });
            });
        },
        handleDownload() {
            this.downloadLoading = true;
            __webpack_require__.e/* require.ensure */(26).then((() => {
                const { export_json_to_excel } = __webpack_require__(1028);
                const tHeader = ['序号', '昵称', '性别', '注册时间', '手机号', '邀请码'];
                const filterVal = ['id', 'nickname', 'gender', 'created_at', 'phone', 'invite'];
                const list = this.users;
                const data = this.formatJson(filterVal, list);
                export_json_to_excel(tHeader, data, this.filename);
                this.downloadLoading = false;
            }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                console.log(v[j]);
                if (j === 'created_at') {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_untils__["a" /* parseTime */])(v[j]);
                } else if (j === 'gender') {
                    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_untils__["b" /* formatSex */])(v[j]);
                } else {
                    return v[j];
                }
            }));
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.getUsers();
        });
    }
});

/***/ }),

/***/ 1060:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"user.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1085:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1060);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("15996fac", content, true);

/***/ }),

/***/ 1119:
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
    on: {
      "focus": _vm.getFilters
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
  }, [_vm._v("查询")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "danger"
    },
    on: {
      "click": _vm.cancelSearch
    }
  }, [_vm._v("取消")])], 1), _vm._v(" "), _c('el-input', {
    staticStyle: {
      "width": "240px"
    },
    attrs: {
      "placeholder": "请输入文件名(默认excel-list)",
      "prefix-icon": "el-icon-document"
    },
    model: {
      value: (_vm.filename),
      callback: function($$v) {
        _vm.filename = $$v
      },
      expression: "filename"
    }
  }), _vm._v(" "), _c('el-button', {
    staticStyle: {
      "margin-bottom": "20px"
    },
    attrs: {
      "type": "primary",
      "icon": "document",
      "loading": _vm.downloadLoading
    },
    on: {
      "click": _vm.handleDownload
    }
  }, [_vm._v("导出excel")])], 1)], 1), _vm._v(" "), _c('el-table', {
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
      "width": "260",
      "fixed": "right"
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
        }, [_vm._v("查看")]), _vm._v(" "), (!scope.row.internal_user) ? _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleInternal(scope.$index, scope.row)
            }
          }
        }, [_vm._v("设置内部用户\n                ")]) : _vm._e(), _vm._v(" "), (scope.row.internal_user) ? _c('el-button', {
          attrs: {
            "type": "danger",
            "size": "small",
            "plane": true
          },
          on: {
            "click": function($event) {
              _vm.handleInternal(scope.$index, scope.row)
            }
          }
        }, [_vm._v("取消内部用户\n                ")]) : _vm._e(), _vm._v(" "), _c('el-button', {
          attrs: {
            "type": "danger",
            "size": "small",
            "plane": true
          },
          on: {
            "click": function($event) {
              _vm.handleCancle(scope.$index, scope.row)
            }
          }
        }, [_vm._v("注销")])]
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
      "prop": "gender",
      "label": "性别",
      "width": "90",
      "formatter": _vm.formatSex,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "created_at",
      "label": "注册时间",
      "width": "180",
      "formatter": _vm.dateFormat,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "last_login_time",
      "label": "最后登录时间",
      "width": "200",
      "formatter": _vm.dateFormat,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "phone",
      "label": "手机号",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "invite",
      "label": "邀请码",
      "width": "100",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "internal_user",
      "label": "内部用户",
      "width": "120",
      "formatter": _vm.internal,
      "sortable": ""
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
  })], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=10.f45311108364349846d8.js.map