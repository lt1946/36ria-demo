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
    self.config = $.extend(Histories.DEFAULT_CONFIG,config);
    self._init();
}
//默认配置
Histories.DEFAULT_CONFIG = {
    count : 10,
    maxClearNumber : 100,
    maxTitleLen : 24,
    ls : LS,
    storeName : 'data-histories',
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
        $.each(data,function(i){
            this.title = this.title.substr(0,maxTitleLen);
            html += tpl.TFtpl(this);
            if(i >= count) return false;
        });
        return $(html).appendTo($container);
    },
    /**
     * 获取本地数据
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
        if(typeof singleData == 'object'){
            if(self.isExist(singleData.id)) return false;
            self._removeExceedPost();
            self.data.unshift(singleData);
            sData = JSON.stringify(self.data);
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