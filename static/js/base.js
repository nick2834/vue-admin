const baseUrl = '域名地址';
const baseImgUrl = '七牛云地址';
(function() {
    var Storage = {
        AUTH: 'FLV-AUTH',
        ACCOUNT: 'FLV-ACCOUNT',
        REMEMBER: 'FLV-REMEMBER',
        LOGIN_HISTORY: 'LH',
        AREA: 'FLV-AREA',
        get: function(key, isSession) {
            if (!this.isLocalStorage()) {
                return;
            }
            var value = this.getStorage(isSession).getItem(key);
            if (value && value != 'undefined') {
                return JSON.parse(value);
            } else {
                return undefined;
            }
        },
        set: function(key, value, isSession) {
            if (!this.isLocalStorage()) {
                return;
            }
            value = JSON.stringify(value);
            this.getStorage(isSession).setItem(key, value);
        },
        remove: function(key, isSession) {
            if (!this.isLocalStorage()) {
                return;
            }
            this.getStorage(isSession).removeItem(key);
        },
        getStorage: function(isSession) {
            return isSession ? sessionStorage : localStorage;
        },
        isLocalStorage: function() {
            try {
                if (!window.localStorage) {
                    alert('不支持本地存储');
                    return false;
                }
                localStorage.setItem('FORTEST', 1); //试探可否成功写入
                return true;
            } catch (e) {
                alert('本地存储已关闭');
                return false;
            }
        }
    };
    window.Storage = Storage;
})();
(function(){
    var baseInfo = {
        setInfo : function(params){
            localStorage.clear();
            if(typeof params =="object"){
                for(var i in params){
                    if(Storage.get(i)){
                        Storage.remove(i,true);
                    }
                    Storage.set(i,params[i],true);
                }
            }
        },
        clearInfo : function(){
            localStorage.clear();
        }
    };
    window.baseInfo = baseInfo;
})();
//时间格式化
Date.prototype.format = function (format) {
    var o = {
        'Y+': this.getFullYear(), //month
        'M+': this.getMonth() + 1, //month
        'd+': this.getDate(), //day
        'h+': this.getHours(), //hour
        'm+': this.getMinutes(), //minute
        's+': this.getSeconds(), //second
        'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
        'S': this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
};

function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
