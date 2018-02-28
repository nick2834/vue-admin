webpackJsonp([4],{

/***/ 1013:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(1086)

var Component = __webpack_require__(105)(
  /* script */
  __webpack_require__(1049),
  /* template */
  __webpack_require__(1120),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 1026:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = remoteLoad;
/**
 * Created by subang on 2018/1/11.
 */
function remoteLoad(url, hasCallback) {
    return createScript(url);
    /**
     * 创建script
     * @param url
     * @returns {Promise}
     */
    function createScript(url) {
        var scriptElement = document.createElement('script');
        document.body.appendChild(scriptElement);
        var promise = new Promise((resolve, reject) => {
            scriptElement.addEventListener('load', e => {
                removeScript(scriptElement);
                if (!hasCallback) {
                    resolve(e);
                }
            }, false);

            scriptElement.addEventListener('error', e => {
                removeScript(scriptElement);
                reject(e);
            }, false);

            if (hasCallback) {
                window.____callback____ = function () {
                    resolve();
                    window.____callback____ = null;
                };
            }
        });

        if (hasCallback) {
            url += '&callback=____callback____';
        }

        scriptElement.src = url;

        return promise;
    }

    /**
     * 移除script标签
     * @param scriptElement script dom
     */
    function removeScript(scriptElement) {
        document.body.removeChild(scriptElement);
    }
}

/***/ }),

/***/ 1049:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_config_remoteLoad_js__ = __webpack_require__(1026);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    props: ['lat', 'lng'],
    data() {
        return {
            searchKey: '',
            placeSearch: null,
            dragStatus: false,
            AMapUI: null,
            AMap: null
        };
    },
    watch: {
        searchKey() {
            if (this.searchKey === '') {
                this.placeSearch.clear();
            }
        }
    },
    methods: {
        // 搜索
        handleSearch() {
            if (this.searchKey) {
                this.placeSearch.search(this.searchKey);
            }
        },
        // 实例化地图
        initMap() {
            // 加载PositionPicker，loadUI的路径参数为模块名中 'ui/' 之后的部分
            let AMapUI = this.AMapUI = window.AMapUI;
            let AMap = this.AMap = window.AMap;
            AMapUI.loadUI(['misc/PositionPicker'], PositionPicker => {
                let mapConfig = {
                    zoom: 16,
                    cityName: '上海'
                };
                if (this.lat && this.lng) {
                    mapConfig.center = [this.lng, this.lat];
                }
                let map = new AMap.Map('js-container', mapConfig);
                // 加载地图搜索插件
                AMap.service(['AMap.PlaceSearch', 'AMap.Geocoder'], () => {
                    this.placeSearch = new AMap.PlaceSearch({
                        pageSize: 5,
                        pageIndex: 1,
                        citylimit: true,
                        city: '上海',
                        map: map,
                        panel: 'js-result'
                    });
                    var geocoder = new AMap.Geocoder({
                        city: "上海" //城市，默认：“全国”
                    });
                    var marker = new AMap.Marker({
                        map: map,
                        bubble: true
                    });
                    map.on('click', function (e) {
                        marker.setPosition(e.lnglat);
                        geocoder.getAddress(e.lnglat, function (status, result) {
                            if (status == 'complete') {
                                var res = result.regeocode.addressComponent;
                                that.formData.lat = e.lnglat.lat;
                                that.formData.lng = e.lnglat.lng;
                                that.formData.address = result.regeocode.formattedAddress;
                            }
                        });
                    });
                });
                // 启用工具条
                AMap.plugin(['AMap.ToolBar'], function () {
                    map.addControl(new AMap.ToolBar({
                        position: 'RB'
                    }));
                });
                // 创建地图拖拽
                let positionPicker = new PositionPicker({
                    mode: 'dragMap', // 设定为拖拽地图模式，可选'dragMap'、'dragMarker'，默认为'dragMap'
                    map: map // 依赖地图对象
                });
                // 拖拽完成发送自定义 drag 事件
                positionPicker.on('success', positionResult => {
                    // 过滤掉初始化地图后的第一次默认拖放
                    if (!this.dragStatus) {
                        this.dragStatus = true;
                    } else {
                        this.$emit('drag', positionResult);
                    }
                });
                // 启动拖放
                positionPicker.start();
            });
        }
    },
    async created() {
        // 已载入高德地图API，则直接初始化地图
        if (window.AMap && window.AMapUI) {
            this.initMap();
            // 未载入高德地图API，则先载入API再初始化
        } else {
            await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_config_remoteLoad_js__["a" /* default */])(`http://webapi.amap.com/maps?v=1.3&key=b22b368d315806628961c641ad9e1815`);
            await __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_config_remoteLoad_js__["a" /* default */])('http://webapi.amap.com/ui/1.0/main.js');
            this.initMap();
        }
    }
});

/***/ }),

/***/ 1061:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(991)();
// imports


// module
exports.push([module.i, ".m-map{min-width:500px;min-height:300px;position:relative}.m-map .map{width:100%;height:500px}.m-map .search{position:absolute;top:10px;left:10px;width:285px;z-index:1}.m-map .search input{width:180px;border:1px solid #ccc;line-height:20px;padding:5px;outline:none}.m-map .search button{line-height:26px;background:#fff;border:1px solid #ccc;width:50px;text-align:center}.m-map .result{max-height:300px;overflow:auto;margin-top:10px}", "", {"version":3,"sources":["/Users/subang/bulunu-admin/src/views/setting/maps.vue"],"names":[],"mappings":"AACA,OAAQ,gBAAiB,AAAC,iBAAkB,AAAC,iBAAmB,CAC/D,AACD,YAAa,WAAY,AAAC,YAAc,CACvC,AACD,eAAgB,kBAAmB,AAAC,SAAU,AAAC,UAAW,AAAC,YAAa,AAAC,SAAW,CACnF,AACD,qBAAsB,YAAa,AAAC,sBAAuB,AAAC,iBAAkB,AAAC,YAAa,AAAC,YAAc,CAC1G,AACD,sBAAuB,iBAAkB,AAAC,gBAAiB,AAAC,sBAAuB,AAAC,WAAY,AAAC,iBAAmB,CACnH,AACD,eAAgB,iBAAkB,AAAC,cAAe,AAAC,eAAiB,CACnE","file":"maps.vue","sourcesContent":["\n.m-map{ min-width: 500px; min-height: 300px; position: relative;\n}\n.m-map .map{ width: 100%; height: 500px;\n}\n.m-map .search{ position: absolute; top: 10px; left: 10px; width: 285px; z-index: 1;\n}\n.m-map .search input{ width: 180px; border: 1px solid #ccc; line-height: 20px; padding: 5px; outline: none;\n}\n.m-map .search button{ line-height: 26px; background: #fff; border: 1px solid #ccc; width: 50px; text-align: center;\n}\n.m-map .result{ max-height: 300px; overflow: auto; margin-top: 10px;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 1086:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(1061);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(992)("3ae518fa", content, true);

/***/ }),

/***/ 1120:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "m-map"
  }, [(_vm.placeSearch) ? _c('div', {
    staticClass: "search"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.searchKey),
      expression: "searchKey"
    }],
    attrs: {
      "type": "text",
      "placeholder": "请输入关键字"
    },
    domProps: {
      "value": (_vm.searchKey)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.searchKey = $event.target.value
      }
    }
  }), _vm._v(" "), _c('button', {
    attrs: {
      "type": "button"
    },
    on: {
      "click": _vm.handleSearch
    }
  }, [_vm._v("搜索")]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.searchKey),
      expression: "searchKey"
    }],
    staticClass: "result",
    attrs: {
      "id": "js-result"
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "map",
    attrs: {
      "id": "js-container"
    }
  })])])
},staticRenderFns: []}

/***/ })

});
//# sourceMappingURL=4.6863932780acf70c06c5.js.map