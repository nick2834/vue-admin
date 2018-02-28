webpackJsonp([13],{

/***/ 1007:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1091)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1043),
  /* template */
  __webpack_require__(1125),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1043:
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


var params;
/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            filters: {
                title: '',
                author_name: '',
                author_id: '',
                phone: ''
            },
            topicList: [],
            listLoading: false,
            total: 0,
            page: 1,
            topicStatus: '',
            filename: '',
            downloadLoading: false,
            para: '',
            filterStr: '',
            filterArr: [],
            params: { page: 1 }
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
        dateStatus: function (row, column) {
            if (row.status == 'online') {
                return "线上";
            } else {
                return "下线";
            }
        },
        search() {
            let that = this;
            var map = new Map();
            for (var i in that.filters) {
                map.set(i, that.filters[i]);
                map.forEach((val, key, obj) => {
                    this.params[key] = val;
                });
            }
            this._getTopic(this.params);
        },
        handleCurrentChange(val) {
            this.params.page = val;
            this._getTopic(this.params);
        },
        _getTopic(params) {
            this.listLoading = true;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["K" /* topicList */])(params).then(res => {
                if (res.code === 1) {
                    this.topicList = res.data.topics;
                    this.listLoading = false;
                    this.total = res.data.paging.total_pages;
                } else {
                    this.$router.push({ path: '/login' });
                }
            });
        },
        handleEdit(index, row) {
            this.$router.push({ path: `/edittopic/${row.id}` });
        },
        handleDel(index, row) {},
        handleStatus(index, row) {
            if (row.status === 'online') {
                var mystatus = '下线';
                var status = 'offline';
            } else {
                var mystatus = '上线';
                var status = 'online';
            }
            this.$confirm('是否' + mystatus + '该话题?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                let id = row.id;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_api__["L" /* changeStatus */])(id, status).then(res => {
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
                    this._getTopic();
                });
            }).catch(() => {});
        },
        selsChange: function (sels) {
            this.sels = sels;
        },
        handleDownload() {
            this.downloadLoading = true;
            //                require.ensure([], () => {
            //                    const { export_json_to_excel } = require('vendor/Export2Excel')
            //                    const tHeader = ['序号', '昵称', '性别', '注册时间', '手机号','邀请码']
            //                    const filterVal = ['id', 'nickname', 'gender', 'created_at', 'phone','invite']
            //                    const list = this.topicList
            //                    const data = this.formatJson(filterVal, list)
            //                    export_json_to_excel(tHeader, data, this.filename)
            //                    this.downloadLoading = false
            //                })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                console.log(v[j]);
                if (j === 'created_at') {
                    return parseTime(v[j]);
                } else if (j === 'gender') {
                    return formatSex(v[j]);
                } else {
                    return v[j];
                }
            }));
        },
        setting() {
            this.setTable = true;
        }
    },
    activated() {
        this.search();
    }
});

/***/ }),

/***/ 1066:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, ".el-table .cell{word-break:normal!important;overflow:hidden!important;text-overflow:ellipsis!important;white-space:nowrap!important}", "", {"version":3,"sources":["/Users/subang/bulunu-admin/src/views/content/topic.vue"],"names":[],"mappings":"AACA,gBACI,4BAA8B,AAC9B,0BAA4B,AAC5B,iCAAmC,AACnC,4BAA+B,CAClC","file":"topic.vue","sourcesContent":["\n.el-table .cell {\n    word-break: normal !important;\n    overflow: hidden !important;\n    text-overflow: ellipsis !important;\n    white-space: nowrap !important;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1091:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1066);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("04fde7a8", content, true);

/***/ }),

/***/ 1125:
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
      "placeholder": "话题内容"
    },
    model: {
      value: (_vm.filters.title),
      callback: function($$v) {
        _vm.$set(_vm.filters, "title", $$v)
      },
      expression: "filters.title"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "作者"
    },
    model: {
      value: (_vm.filters.author_name),
      callback: function($$v) {
        _vm.$set(_vm.filters, "author_name", $$v)
      },
      expression: "filters.author_name"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "作者ID"
    },
    model: {
      value: (_vm.filters.author_id),
      callback: function($$v) {
        _vm.$set(_vm.filters, "author_id", $$v)
      },
      expression: "filters.author_id"
    }
  })], 1), _vm._v(" "), _c('el-form-item', [_c('el-input', {
    attrs: {
      "placeholder": "作者电话"
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
  }, [_vm._v("查询")])], 1), _vm._v(" "), _c('el-input', {
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
  }, [_vm._v("导出excel\n            ")]), _vm._v(" "), _c('router-link', {
    staticClass: "el-button el-button--primary",
    attrs: {
      "to": {
        path: '/createtopic'
      },
      "tag": "button"
    }
  }, [_vm._v("创建话题\n            ")])], 1)], 1), _vm._v(" "), _c('el-table', {
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
      "data": _vm.topicList,
      "highlight-current-row": "",
      "fit": "",
      "border": "",
      "empty-text": "",
      "height": "500"
    },
    on: {
      "selection-change": _vm.selsChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "35"
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
        }, [_vm._v("编辑")]), _vm._v(" "), (scope.row.status !== 'online') ? _c('el-button', {
          attrs: {
            "type": "danger",
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleStatus(scope.$index, scope.row)
            }
          }
        }, [_vm._v("上线\n                ")]) : _c('el-button', {
          attrs: {
            "size": "small"
          },
          on: {
            "click": function($event) {
              _vm.handleStatus(scope.$index, scope.row)
            }
          }
        }, [_vm._v("下线\n                ")]), _vm._v(" "), _c('el-button', {
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
      "width": "80",
      "label": "ID",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "title",
      "label": "标题",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "author.nickname",
      "label": "作者",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "created_at",
      "label": "创作时间",
      "width": "180",
      "formatter": _vm.dateFormat,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "last_comment_time",
      "label": "最新评论时间",
      "width": "180",
      "formatter": _vm.dateFormat,
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "address",
      "label": "所在位置",
      "width": "300",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "likes",
      "label": "点赞数",
      "width": "100",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "评论数",
      "width": "100",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "tags",
      "label": "标签",
      "sortable": ""
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return _vm._l((scope.row.tags), function(item, index) {
          return _c('el-tag', {
            key: item.id,
            attrs: {
              "close-transition": "",
              "type": "danger"
            }
          }, [_vm._v("\n                    " + _vm._s(item.name) + "\n                ")])
        })
      }
    }])
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
//# sourceMappingURL=13.ff7916a2bb48bb49b86c.js.map