/**
 * @fileOverview 显示用户的浏览记录
 * @author 明河<minghe36@126.com>
 * @requires jquery1.5.2 ls
 */
/**
 * 显示用户的浏览记录
 * @class
 * @param {Object} config 配置
 */
function Histories(config){
    var self = this;
    self.data = [];
    //覆盖配置
    self.config = $.extend(Histories.DEFAULT_CONFIG,config);
    //初始化
    self._init();
}
//默认配置
Histories.DEFAULT_CONFIG = {
    //显示条数
    count : 10,
    //达到该数目时清理多余数据
    maxClearNumber : 100,
    //标题长度
    maxTitleLen : 24,
    //本地存储类
    ls : LS,
    //存储字段
    storeName : 'data-histories',
    //列表的li模板   
    tpl : '<li data-id="{id}"><a href="{url}" target="_blank">{title}</a></li>'
};
Histories.prototype = {
    /**
     * 初始化
     */
    _init : function(){
        var self = this,ls = self.config.ls;
        //不支持html5的离线存储，直接退出
        if(!ls.isSupportLocalStorage()) return false;
    },
    /**
     * 将数据加入dom
     * @param {String} container 容器
     */
    appendTo : function(container){
        var self = this,$container = $(container),html = '',data = self.getData(),config = self.config,maxTitleLen = config.maxTitleLen,tpl = config.tpl,count = config.count;
        if($container.length == 0 || data.length == 0) return false;
        //遍历数据（数组）
        $.each(data,function(i){
            //截取标题
            this.title = this.title.substr(0,maxTitleLen);
            //转换模板
            html += tpl.TFtpl(this);
            //超过最大渲染数，直接退出循环
            if(i >= count) return false;
        });
        return $(html).appendTo($container);
    },
    /**
     * 获取本地数据
     * @return {Array} 
     */
    getData : function(){
        var self = this,config = self.config,ls = config.ls,sData = ls.item(config.storeName);
        if(sData) self.data = JSON.parse(sData);
        return self.data;
    },
    /**
     * 将值保存到本地数据
     * @param {Object} singleData 文章数据
     * @return {Boolean}
     */
    save : function(singleData){
        var self = this,config = self.config,ls = config.ls,sData;
        //保存的数据类型必须为对象
        if(typeof singleData == 'object'){
            //如果已经存在该条数据，直接退出
            if(self.isExist(singleData.id)) return false;
            //删除多余数据
            self._removeExceedPost();
            //向数据缓存追加一条数据
            self.data.unshift(singleData);
            //转化成json字符串
            sData = JSON.stringify(self.data);
            //调用本地存储类，保存数据
            ls.item(config.storeName,sData);
        }
        return true;
    },
    /**
     * 已经存在指定id的文章
     * @param id
     * @return {Boolean}
     */
    isExist : function(id){
        var self = this,data = self.data,exist = false,postId;
        if(data.length > 0){
            $.each(data,function(){
                postId = this.id;
                if(id == postId) {
                    exist = true;
                    return false;
                }
            });
        }
        return exist;
    },
    /**
     * 清理本地数据
     */
    clear : function(){
        var self = this,config = self.config,ls = config.ls;
        ls.removeItem(config.storeName);
        self.data = [];
    },
    /**
     * 删除超过count的数据
     */
    _removeExceedPost : function(){
        var self = this,config = self.config,count = config.maxClearNumber,data = self.data;
        if(data.length < count) return false;
        self.data.splice(count-1,data.length - count + 1);
    }
};


//简单的转换模板函数
String.prototype.TFtpl = function(o){
    return this.replace(/{([^{}]*)}/g,
            function (a,b){
                var r = o[b];
                return typeof r==='string'?r:a;
            }
    );
};