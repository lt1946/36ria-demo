/**
 * @fileOverview html5本地存储(日后有可能会发布兼容IE8以下版本的IE的本地存储类)
 * @author 明河<minghe36@126.com>
 * @version 1.0
 * @example
 *          LS.item("key","value");//设置key字段为value
 *          LS.item("key");//设置key字段的值
 */
var LS = {
    /**
     * 获取/设置存储字段
     * @param {String} name 字段名称
     * @param {String} value 值
     * @return {String}
     */
    item : function(name,value){
        var val = null;
        if(LS.isSupportLocalStorage()){
            if(value){
                localStorage.setItem(name,value);
                val = value;
            }else{
                val = localStorage.getItem(name);
            }
        }else{
            console.log('浏览器不支持html5的本地存储！');
        }
        return val;
    },
    /**
     * 移除指定name的存储
     * @param {String} name 字段名称
     * @return {Boolean}
     */
    removeItem : function(name){
        if(LS.isSupportLocalStorage()){
            localStorage.removeItem(name);
        }else{
            console.log('浏览器不支持html5的本地存储！');
            return false;
        }
        return true;
    },
    /**
     * 判断浏览器是否直接html5本地存储
     */
    isSupportLocalStorage : function(){
        var ls = LS,is = ls.IS_HAS_LOCAL_STORAGE;
        if(is == null){
            if(window.localStorage){
                is = ls.IS_HAS_LOCAL_STORAGE = true;
            }
        }
        return is;
    },
    IS_HAS_LOCAL_STORAGE : null
};
