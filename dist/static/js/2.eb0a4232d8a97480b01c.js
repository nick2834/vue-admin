webpackJsonp([2],{

/***/ 1016:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1083)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1051),
  /* template */
  __webpack_require__(1117),
  /* scopeId */
  "data-v-067da035",
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

/***/ 1027:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export dateFormat */
/* unused harmony export timeAgo */
/* unused harmony export parseTime */
/* unused harmony export formatTime */
/* unused harmony export nFormatter */
/* unused harmony export html2Text */
/* unused harmony export toThousandslsFilter */
const state = {
    data: function (value) {
        if (!value) {
            return;
        }
        return new Date(value).format('MM-dd hh:mm');
    },
    internal: function (value) {
        return !value ? '否' : '是';
    },
    formatSex: function (value) {
        return value == 'male' ? '男' : value == 'female' ? '女' : '未知';
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = state;

function dateFormat(row, column) {
    var date = row[column.property];
    if (date == undefined) {
        return "";
    }
    return new Date(date).Format("Y-MM-dd hh:mm:ss");
}
function pluralize(time, label) {
    if (time === 1) {
        return time + label;
    }
    return time + label + 's';
}

function timeAgo(time) {
    const between = Date.now() / 1000 - Number(time);
    if (between < 3600) {
        return pluralize(~~(between / 60), ' minute');
    } else if (between < 86400) {
        return pluralize(~~(between / 3600), ' hour');
    } else {
        return pluralize(~~(between / 86400), ' day');
    }
}

function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }

    if ((time + '').length === 10) {
        time = +time * 1000;
    }

    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time === 'object') {
        date = time;
    } else {
        date = new Date(parseInt(time));
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}

function formatTime(time, option) {
    time = +time * 1000;
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚';
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前';
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前';
    } else if (diff < 3600 * 24 * 2) {
        return '1天前';
    }
    if (option) {
        return parseTime(time, option);
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分';
    }
}

/* 数字 格式化*/
function nFormatter(num, digits) {
    const si = [{ value: 1E18, symbol: 'E' }, { value: 1E15, symbol: 'P' }, { value: 1E12, symbol: 'T' }, { value: 1E9, symbol: 'G' }, { value: 1E6, symbol: 'M' }, { value: 1E3, symbol: 'k' }];
    for (let i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
            return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol;
        }
    }
    return num.toString();
}

function html2Text(val) {
    const div = document.createElement('div');
    div.innerHTML = val;
    return div.textContent || div.innerText;
}

function toThousandslsFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/***/ }),

/***/ 1051:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_common_js_util__ = __webpack_require__(1017);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_api__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_config_untils__ = __webpack_require__(1027);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            userDetail: [],
            balance: '',
            sels: [], //列表选中列
            listLoading: false,
            fun: __WEBPACK_IMPORTED_MODULE_2_config_untils__["a" /* state */],
            following_cars: [],
            owned_cars: [],
            tags: '',
            users: []
        };
    },
    methods: {
        _getDetail() {
            let userInfo = new Array();
            const userId = this.$route.params.id;
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["M" /* getUser */])(userId).then(res => {
                console.log(res);
                if (res.code === 1) {
                    userInfo.push(res.data.user);
                    this.userDetail = res.data.user;
                    this.tags = this.userDetail.tags;
                    this.following_cars = res.data.following_cars;
                    this.owned_cars = res.data.owned_cars;
                } else {
                    this.$router.push({ path: '/login' });
                }
            }).catch(err => {
                this.$router.push({ path: '/login' });
            });
            this.users = userInfo;
        },
        selsChange: function (sels) {
            this.sels = sels;
        },
        bindChange(e, item) {
            let id = this.userDetail.id;
            let itemNames;
            switch (item) {
                case 'qq':
                    itemNames = 'QQ';
                    break;
                case 'wechat':
                    itemNames = '微信';
                    break;
                case 'weibo':
                    itemNames = '微博';
                    break;
                default:
                    itemNames = '';
            }
            if (e.target.className.indexOf('el-icon-active') < 0) {
                return;
            }
            this.$confirm('确认取消' + itemNames + '绑定吗?', '提示', {
                type: 'warning'
            }).then(() => {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_api__["N" /* unbind */])(id, item).then(res => {
                    if (res.code === 1) {
                        this.users[0].bind_qq = res.data.user.bind_qq;
                        this.users[0].bind_wechat = res.data.user.bind_wechat;
                        this.users[0].bind_weibo = res.data.user.bind_weibo;
                    } else {
                        this.$router.push({ path: '/login' });
                    }
                });
            }).catch(() => {
                this.$router.push({ path: '/login' });
            });
        }
    },
    mounted() {
        this._getDetail();
    },
    activated() {
        this._getDetail();
    }
});

/***/ }),

/***/ 1058:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, ".el-table th[data-v-067da035]{text-align:center}.demo-table-expand[data-v-067da035]{font-size:0}.demo-table-expand label[data-v-067da035]{width:90px;color:#99a9bf}.demo-table-expand .el-form-item[data-v-067da035]{margin-right:0;margin-bottom:0;width:33.3333%;text-align:center}.el-icon-active[data-v-067da035]{font-size:20px;color:red}.el-icon[data-v-067da035]{font-size:20px;cursor:pointer}", "", {"version":3,"sources":["/Users/subang/bulunu-admin/src/views/user/userInfo.vue"],"names":[],"mappings":"AACA,8BACI,iBAAmB,CACtB,AACD,oCACI,WAAa,CAChB,AACD,0CACI,WAAY,AACZ,aAAe,CAClB,AACD,kDACI,eAAgB,AAChB,gBAAiB,AACjB,eAAgB,AAChB,iBAAmB,CACtB,AACD,iCACI,eAAgB,AAChB,SAAW,CACd,AACD,0BACI,eAAgB,AAChB,cAAgB,CACnB","file":"userInfo.vue","sourcesContent":["\n.el-table th[data-v-067da035] {\n    text-align: center;\n}\n.demo-table-expand[data-v-067da035] {\n    font-size: 0;\n}\n.demo-table-expand label[data-v-067da035] {\n    width: 90px;\n    color: #99a9bf;\n}\n.demo-table-expand .el-form-item[data-v-067da035] {\n    margin-right: 0;\n    margin-bottom: 0;\n    width: 33.3333%;\n    text-align: center;\n}\n.el-icon-active[data-v-067da035]{\n    font-size: 20px;\n    color: red;\n}\n.el-icon[data-v-067da035]{\n    font-size: 20px;\n    cursor: pointer;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1083:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1058);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("ed6ecfa0", content, true);

/***/ }),

/***/ 1117:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('section', [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding": "0",
      "border-bottom": "1px solid #eee",
      "margin-bottom": "10px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('el-breadcrumb', {
    staticStyle: {
      "line-height": "50px"
    },
    attrs: {
      "separator": ">"
    }
  }, [_c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/'
      }
    }
  }, [_vm._v("首页")]), _vm._v(" "), _c('el-breadcrumb-item', {
    attrs: {
      "to": {
        path: '/user'
      }
    }
  }, [_vm._v("会员管理")]), _vm._v(" "), _c('el-breadcrumb-item', [_vm._v(_vm._s(_vm.userDetail.nickname))])], 1)], 1), _vm._v(" "), _c('el-col', [_c('el-table', {
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
      "size": "medium"
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "expand"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(props) {
        return [_c('el-form', {
          staticClass: "demo-table-expand",
          attrs: {
            "label-position": "left",
            "inline": ""
          }
        }, [_c('el-form-item', {
          attrs: {
            "label": "邀请码"
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.invitation_code))])]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "内部用户"
          }
        }, [_c('span', [_vm._v(_vm._s(_vm.fun.internal(props.row.internal_user)))])]), _vm._v(" "), _c('el-form-item', {
          attrs: {
            "label": "特殊身份"
          }
        }, [_c('span', [_vm._v(_vm._s(props.row.tags))])])], 1)]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "id",
      "width": "200",
      "label": "用户ID"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "nickname",
      "label": "用户名",
      "width": "250"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "phone",
      "label": "电话",
      "width": "250"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "性别",
      "width": "200"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(_vm.fun.formatSex(scope.row.gender)))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "注册时间",
      "width": "260"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(_vm.fun.data(scope.row.created_at)))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "最后登录时间"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', [_vm._v(_vm._s(_vm.fun.data(scope.row.created_at)))])]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "第三方绑定"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('span', {
          staticClass: "el-icon-bulunu-qq-copy",
          class: scope.row.bind_qq ? 'el-icon-active' : 'el-icon',
          on: {
            "click": function($event) {
              _vm.bindChange($event, 'qq')
            }
          }
        }), _vm._v(" "), _c('span', {
          staticClass: "el-icon-bulunu-weixin-copy",
          class: scope.row.bind_wechat ? 'el-icon-active' : 'el-icon',
          on: {
            "click": function($event) {
              _vm.bindChange($event, 'wechat')
            }
          }
        }), _vm._v(" "), _c('span', {
          staticClass: "el-icon-bulunu-weibo",
          class: scope.row.bind_weibo ? 'el-icon-active' : 'el-icon',
          on: {
            "click": function($event) {
              _vm.bindChange($event, 'weibo')
            }
          }
        })]
      }
    }])
  })], 1)], 1), _vm._v(" "), _c('el-col', [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding": "0",
      "border-bottom": "1px solid #eee",
      "margin-bottom": "10px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('p', [_vm._v("关注车辆")])]), _vm._v(" "), _c('el-table', {
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
      "data": _vm.following_cars,
      "highlight-current-row": "",
      "size": "medium"
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
      "prop": "id",
      "width": "200",
      "label": "车昵称",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "name",
      "label": "品牌",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "型号",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "颜色",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "购买时间",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "里程数",
      "sortable": ""
    }
  })], 1)], 1), _vm._v(" "), _c('el-col', [_c('el-col', {
    staticClass: "toolbar",
    staticStyle: {
      "padding": "0",
      "border-bottom": "1px solid #eee",
      "margin-bottom": "10px"
    },
    attrs: {
      "span": 24
    }
  }, [_c('p', [_vm._v("拥有车辆")])]), _vm._v(" "), _c('el-table', {
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
      "data": _vm.owned_cars,
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
      "prop": "id",
      "width": "200",
      "label": "车昵称",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "name",
      "label": "品牌",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "型号",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "颜色",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "购买时间",
      "width": "200",
      "sortable": ""
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "prop": "description",
      "label": "里程数",
      "sortable": ""
    }
  })], 1)], 1)], 1)
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=2.eb0a4232d8a97480b01c.js.map