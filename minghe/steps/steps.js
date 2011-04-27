/**
 * @fileOverview 步骤条组件
 * @extends  KISSY.Base
 * @creator 剑平（明河共影）<riahome@126.com>
 * @depends  ks-core
 * @version 2.0
 * @update 2011-01-02
 * @example
 *     var steps = new S.Steps("#steps-1");
 */
KISSY.add('steps', function(S) {
    var DOM = S.DOM,EMPTY = '',LI = 'li';
    /**
    * 步骤条组件
    * @class xx
    * @constructor
    * @param {Object} container 表单容器
    * @param {Object} config 配置对象
    */
    function Steps(container ,config){
        var self = this;

        if (!(self instanceof Steps)) {
            return new Steps(config);
        }
        /**
         * 目标容器
         * @type HTMLElement
         */
        self.container = S.get(container);
        //支持的颜色
        self._allowColor = [];
        self.isRender = false;
        //超类初始化
        Steps.superclass.constructor.call(self, config);
        //初始化
        self._init();
    }
    //继承于KISSY.Base
    S.extend(Steps, S.Base);
    Steps.VERSION = 2.0;
    /**
     *支持的事件列表
     */
    Steps.event = {
        RENDER : 'render'
    };
    //步骤条的所有颜色
    Steps.color = {ORANGE:'orange',BLUE:'blue',GREEN:'green',RED:'red',PINK:'pink',GRAY:'gray'};
    //组件用到的内部样式名
    Steps.cls = {STEPS : "ks-steps",ITEM : "ks-steps-item",CURRENT : "current",DONE : "done",FIRST:'first',LAST:'last'};
    //步骤的起始索引
    Steps.ZINDEX = 500;
    //箭头模板
    Steps.ARROW_TPL = '<div class="trigon">'+
							'<span class="bor"></span><span class="blo"></span>'+
					   '</div>';
    /**
     * 设置参数
     */
    Steps.ATTRS = {
        //是否自动运行
        autoRender : {
            value : false,
            setter : function(v){
                this.render();
                return v;
            }
        },
        //步骤宽度
        width : {
            value : EMPTY,
            setter : function(v){
                var self = this;
                self.isRender && self._setWidth(v);
                return v;
            }
        },
        //步骤条颜色
        color : {
            value : Steps.color.ORANGE,
            setter : function(v) {
                var self = this;
                self.isRender && self._setColor(v);
                return v;
            }
        },
        //激活
        act : {
            value : 0,
            setter : function(v){
                var self = this;
                self.isRender && self._setAct(v);
                return v;
            }
        }
    };
    /**
     * 方法
     */
    S.augment(Steps, {
        /**
         * 初始化
         */
         _init : function(){

         },
        /**
         * 运行
         * @return {Object} 对象
         */
        render : function(){
            var self = this,event = Steps.event,container = self.container,steps,cls = Steps.cls;
            //不存在容器，直接退出
            if(container == null) return false;
            //步骤列表li元素
            steps = DOM.children(container,LI);
            //给容器添加“ks-steps”样式
            DOM.addClass(container,cls.STEPS);
            //设置steps属性（li元素集合）
            self.steps = steps;
            //如果不存在li直接退出
            if(steps.length == 0) return false;
            //isRender属性标示组件已经运行
            self.isRender = true;
            //设置每个步骤的样式
            self._setItemStyle();
            //设置宽度
            self._setWidth();
            //设置颜色
            self._setColor();
            //设置激活的当前步骤
            self._setAct();
            //向每个步骤添加三角
            self._addTrigon();
            self.fire(event.RENDER,{'steps':steps});
            return self;
        },
        /**
         * 获取步骤条组件允许设置的颜色值
         * @return {Array} 颜色数组
         */
        allowColor : function(){
            var self = this,colors = self._allowColor;
            if(colors.length == 0){
                S.each(Steps.color,function(v){
                    colors.push(v);
                });
            }
            return colors;
        },
        /**
         * 是否是允许设置的颜色
         * @param {String} color 颜色
         * @return {Boolean}
         */
        isAllowColor : function(color){
            var self = this,allowColor = self.allowColor(),Bool = false;
            S.each(allowColor,function(v){
                if(v == color){
                    Bool = true;
                    return true;
                }
            });
            return Bool;
        },
        /**
         * 设置每个步骤的样式
         */
        _setItemStyle : function(){
            var self = this,steps = self.steps,cls = Steps.cls,zIndex = Steps.ZINDEX;
            //遍历li
            S.each(steps,function(elem){
                //给li增加“ks-steps-item”样式
                DOM.addClass(elem,cls.ITEM);
                //设置li的z-index
                DOM.css(elem,'zIndex',zIndex);
                zIndex --;
            });
        },
        /**
         * 设置宽度
         * @param {Number} w 宽度
         * @return {Number}
         */
        _setWidth : function(w){
            var self = this,width = w || self.get('width'),container = self.container,steps = self.steps,itemLen = steps.length,containerWidth;
            //宽度为空时，自动设置每个步骤宽度（平分）
            if(width == EMPTY){
                if(itemLen == 0) return false;
                containerWidth = DOM.width(container);
                width = Number(containerWidth / itemLen);
            }
            DOM.width(steps,width);
            return width;
        },
        /**
         * 设置颜色
         * @param {String} c 颜色
         * @return {String}
         */
        _setColor : function(c){
            var self = this,color = c || self.get('color'),container = self.container,allowColors = self.allowColor(),isAllowColor = self.isAllowColor(color);
            //如果组件不支持该颜色直接退出
            if(color == EMPTY || !isAllowColor) return false;
            //移除步骤条容器的所有颜色样式名
            DOM.removeClass(container,allowColors.join(' '));
            //给步骤条容器添加指定颜色样式名
            DOM.addClass(container,color);
            return color;

        },
        /**
         * 设置激活的当前步骤
         * @param {Number} i 当前步骤
         * @return {Number}
         */
        _setAct : function(i){
            var self = this,act = i || self.get('act'),cls = Steps.cls,steps = self.steps,itemLen = steps.length;
            //当参数为空或值超过允许或小于1时移除全部样式
            if(act == EMPTY || act > itemLen || act < 1){
                DOM.removeClass(steps,cls.DONE + ' ' + cls.CURRENT);
                return 0;
            }
            //遍历li
            steps.each(function(elem,i){
                //给第一个步骤增加“first”样式名
                i == 0 && DOM.addClass(elem,cls.FIRST);
                //给最后一个步骤增加"last"样式名
                i == itemLen - 1 && DOM.addClass(elem,cls.LAST);
                //移除所有步骤的"done"和"current"样式名
                DOM.removeClass(elem,cls.DONE + ' ' + cls.CURRENT);
            });
            act --;
            //添加'current'当前样式
            DOM.addClass(steps[act],cls.CURRENT);
            steps.each(function(elem,i){
                if(i >= act) return false;
                //添加'done'已完成样式
                DOM.addClass(elem,cls.DONE);
            });
            return act;
        },
        /**
         * 向每个步骤添加三角
         * @return {Object} 对象
         */
		_addTrigon : function(){
			var self = this,steps = self.steps,stepLen = steps.length,
			    html = Steps.ARROW_TPL;
            S.each(steps,function(elem,i){
                //除了最后一个步骤之外全部添加三角样式
                i < stepLen - 1 && DOM.append(DOM.create(html),elem);
            });
            return self;

		}
    });
    S.Steps = Steps;
}, { requires: ['core'] });

