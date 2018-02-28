webpackJsonp([14],{

/***/ 1006:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1094)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1042),
  /* template */
  __webpack_require__(1128),
  /* scopeId */
  "data-v-459cbbc7",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1042:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            tags: [],
            author: [],
            total: 0,
            page: 1,
            listLoading: false,
            sels: [], //列表选中列

            editFormVisible: false, //编辑界面是否显示
            editLoading: false,
            editFormRules: {
                name: [{ required: true, message: '', trigger: 'blur' }],
                author_id: [{ required: true, message: '', trigger: 'blur' }]
            },
            //编辑界面数据
            editForm: {
                id: 0,
                name: '',
                description: ''
            },
            addFormVisible: false, //新增界面是否显示
            addLoading: false,
            addFormRules: {
                name: [{ required: true, message: '请输入标签名', trigger: 'blur' }],
                author_id: [{ required: true, message: '请输入id', trigger: 'blur' }]
            },
            //新增界面数据
            addForm: { name: '', description: '', author_id: '' }
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
            this.getTgas();
        },
        //获取标签列表
        getTgas() {
            let para = '';
            if (this.filters.name == "") {
                para = { page: this.page };
            } else {
                para = { page: this.page, name: this.filters.name };
            }
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["x" /* tagsList */])(para).then(res => {
                if (res.code == 1) {
                    this.total = res.data.paging.total_pages;
                    this.tags = res.data.tags;
                    this.listLoading = false;
                }
            });
        },
        cancelSearch() {
            this.page = 1;
            this.getTgas();
        },
        //删除
        handleDel: function (index, row) {
            this.$confirm('确认删除该标签吗?', '提示', {
                type: 'warning'
            }).then(() => {
                this.listLoading = true;
                let id = row.id;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["y" /* deleteTags */])(id).then(res => {
                    this.listLoading = false;
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getTgas();
                });
            }).catch(() => {});
        },
        //显示新增界面
        handleAdd: function () {
            this.addFormVisible = true;
        },
        //新增
        addSubmit: function () {
            this.$refs.addForm.validate(valid => {
                if (valid) {
                    var idt = sessionStorage.getItem("id");
                    this.addLoading = true;
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["z" /* creatTags */])(this.addForm.name, this.addForm.description, idt).then(res => {
                        this.addLoading = false;
                        if (res.code == 1) {
                            this.$message({
                                message: '创建成功',
                                type: 'success'
                            });
                            this.$refs['addForm'].resetFields();
                            this.getTgas();
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
        //显示编辑界面
        handleEdit: function (index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        //编辑
        editSubmit: function () {
            this.$refs.editForm.validate(valid => {
                if (valid) {
                    this.$confirm('确认修改吗？', '提示', {}).then(() => {
                        this.editLoading = true;
                        let id = this.editForm.id;
                        var name = this.editForm.name;
                        var description = this.editForm.description;
                        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["A" /* updataTags */])(id, name, description).then(res => {
                            this.editLoading = false;
                            //NProgress.done();
                            if (res.code == 1) {
                                this.$message({
                                    message: '提交成功',
                                    type: 'success'
                                });
                                this.editFormVisible = false;
                                this.getTgas();
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
            this.getTgas();
        });
    }
});

/***/ }),

/***/ 1069:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"tags.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 1094:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1069);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("6066e796", content, true);

/***/ }),

/***/ 1128:
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
      "placeholder": "标签名"
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
      "click": _vm.getTgas
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
      "data": _vm.tags,
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
      "label": "标签名",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "author.id",
      "label": "用户id",
      "width": "100",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "author.nickname",
      "label": "用户名",
      "width": "120",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "editor.id",
      "label": "编辑人员id",
      "width": "150",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "editor.nickname",
      "label": "编辑人员用户名",
      "width": "150",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "edit_time",
      "label": "编辑时间",
      "width": "200",
      "formatter": _vm.dateFormat,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "created_at",
      "label": "创建时间",
      "formatter": _vm.dateFormat,
      "sortable": ""
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "修改标签",
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
      "label": "标签名",
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
            value: (_vm.editForm.description),
            callback: function($$v) {
              _vm.$set(_vm.editForm, "description", $$v)
            },
            expression: "editForm.description"
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
  }, [_vm._v("取消")])], 1)], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "创建标签",
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
      "label": "标签名",
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

/***/ })

});
//# sourceMappingURL=14.fa311481eafb44cbb1cb.js.map