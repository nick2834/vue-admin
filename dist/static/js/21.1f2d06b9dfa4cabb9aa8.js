webpackJsonp([21],{

/***/ 1032:
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


/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            logining: false,
            ruleForm2: {
                account: '',
                checkPass: ''
            },
            rules2: {
                account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                checkPass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
            },
            checked: true
        };
    },
    created() {
        baseCookie.clearInfo();
    },
    methods: {
        handleSubmit2(ev) {
            var _this = this;
            this.$refs.ruleForm2.validate(valid => {
                if (valid) {
                    this.logining = true;
                    this.$store.dispatch('LoginByUsername', this.ruleForm2).then(() => {
                        this.loading = false;
                        this.$router.push({ path: '/main' });
                        console.log(_this.$store.getters);
                    }).catch(() => {
                        this.loading = false;
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

/***/ 1071:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, ".login-container[data-v-49c94ebe]{box-shadow:0 0 8px 0 rgba(0,0,0,.06),0 1px 0 0 rgba(0,0,0,.02);-webkit-border-radius:5px;border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin:180px auto;width:350px;padding:35px 35px 15px;background:#fff;border:1px solid #eaeaea;box-shadow:0 0 25px #cac6c6}.login-container .title[data-v-49c94ebe]{margin:0 auto 40px;text-align:center;color:#505458}.login-container .remember[data-v-49c94ebe]{margin:0 0 35px}", "", {"version":3,"sources":["/Users/subang/bulunu-admin/src/views/Login.vue"],"names":[],"mappings":"AACA,kCACE,+DAA6E,AAC7E,0BAA2B,AAC3B,kBAAmB,AACnB,uBAAwB,AACxB,4BAA6B,AAC7B,kBAAmB,AACnB,YAAa,AACb,uBAA6B,AAC7B,gBAAiB,AACjB,yBAA0B,AAC1B,2BAA6B,CAC9B,AACD,yCACI,mBAA2B,AAC3B,kBAAmB,AACnB,aAAe,CAClB,AACD,4CACI,eAAyB,CAC5B","file":"Login.vue","sourcesContent":["\n.login-container[data-v-49c94ebe] {\n  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  -moz-border-radius: 5px;\n  background-clip: padding-box;\n  margin: 180px auto;\n  width: 350px;\n  padding: 35px 35px 15px 35px;\n  background: #fff;\n  border: 1px solid #eaeaea;\n  box-shadow: 0 0 25px #cac6c6;\n}\n.login-container .title[data-v-49c94ebe] {\n    margin: 0px auto 40px auto;\n    text-align: center;\n    color: #505458;\n}\n.login-container .remember[data-v-49c94ebe] {\n    margin: 0px 0px 35px 0px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1096:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1071);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("398ab95c", content, true);

/***/ }),

/***/ 1130:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('el-form', {
    ref: "ruleForm2",
    staticClass: "demo-ruleForm login-container",
    attrs: {
      "model": _vm.ruleForm2,
      "rules": _vm.rules2,
      "label-position": "left",
      "label-width": "0px"
    }
  }, [_c('h3', {
    staticClass: "title"
  }, [_vm._v("系统登录")]), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "account"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "text",
      "auto-complete": "off",
      "placeholder": "账号"
    },
    model: {
      value: (_vm.ruleForm2.account),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm2, "account", $$v)
      },
      expression: "ruleForm2.account"
    }
  })], 1), _vm._v(" "), _c('el-form-item', {
    attrs: {
      "prop": "checkPass"
    }
  }, [_c('el-input', {
    attrs: {
      "type": "password",
      "auto-complete": "off",
      "placeholder": "密码"
    },
    model: {
      value: (_vm.ruleForm2.checkPass),
      callback: function($$v) {
        _vm.$set(_vm.ruleForm2, "checkPass", $$v)
      },
      expression: "ruleForm2.checkPass"
    }
  })], 1), _vm._v(" "), _c('el-checkbox', {
    staticClass: "remember",
    attrs: {
      "checked": ""
    },
    model: {
      value: (_vm.checked),
      callback: function($$v) {
        _vm.checked = $$v
      },
      expression: "checked"
    }
  }, [_vm._v("记住密码")]), _vm._v(" "), _c('el-form-item', {
    staticStyle: {
      "width": "100%"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "type": "primary",
      "loading": _vm.logining
    },
    nativeOn: {
      "click": function($event) {
        $event.preventDefault();
        _vm.handleSubmit2($event)
      }
    }
  }, [_vm._v("登录\n        ")])], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 996:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1096)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1032),
  /* template */
  __webpack_require__(1130),
  /* scopeId */
  "data-v-49c94ebe",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ })

});
//# sourceMappingURL=21.1f2d06b9dfa4cabb9aa8.js.map