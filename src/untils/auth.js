import Cookies from 'js-cookie'
const TokenKey = 'Token-token'
export function getToken(name) {
  return Cookies.get(name)
}
export function gotToken() {
    return Cookies.get(TokenKey)
}
export function setToken(name,token) {
  return Cookies.set(name, token)
}
export function setAllCookies(params) {
    if(typeof params =="object"){
        for(let i in params){
            Cookies.set(i,params[i])
        }
    }
}
export function removeToken(name) {
  return Cookies.remove(name)
}

export function reload() {
    if(Cookies.get("refresh")!="no"){
        setTimeout(function(){
            location.reload();
            Cookies.set("refresh","no");
        },2500);
    }
}
(function(){
    var baseCookie = {
        setInfo : function(params){
            Cookies.remove();
            if(typeof params =="object"){
                for(let i in params){
                    Cookies.set(i,params[i],{ expires: 1 })
                    //设置一天有效期
                }
            }
        },
        clearInfo : function(){
            //删除所有cookie
            var cookies = document.cookie.split(";");
            if(cookies) {
                for(var i = cookies.length; i--;){
                    document.cookie = cookies[i] + '=0;expires=' + new Date(0).toUTCString()
                }
                Cookies.set("loginInfo",false)
            }
        }
    };
    window.baseCookie = baseCookie;
})();
//sessionStorage
export const session = function(key, value){
    if (value === void(0)) {
        var lsVal = sessionStorage.getItem(key);
        if(lsVal){
            return JSON.parse(lsVal);
        }else{
            return lsVal;
        }
    }else {
        if (typeof(value)==="object" || Array.isArray(value)) {
            value = JSON.stringify(value);
        };
        return sessionStorage.setItem(key, value);
    }
}

export const baseInfo = {
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