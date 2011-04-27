/**
 * $.verticalTab
 * @extends jquery.1.4.2
 * @fileOverview 创建一个竖型选项卡
 * @author 明河共影
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.2
 * @date 2010-06-18
 * Copyright (c) 2010-2010 明河共影
 * @example
 *    $("#single-posts").verticalTab();
 */
(function($){
	$.fn.verticalTab = function(options){
		var opts;
		var DATA_NAME = "verticalTab";
		//返回API
		if(typeof options == 'string'){
			 if(options == 'api'){
			 	return $(this).data(DATA_NAME);
			 }
		}
		else{
			var options = options || {};
			//覆盖参数
			opts = $.extend({},$.fn.verticalTab.defaults,options);
		}
		
		return $(this).each(function(){
			//调用方法
			if(typeof options == 'string'){
				
			}
			//创建
			else{
				var _VerticalTab = new yijs.VerticalTab(opts);
				_VerticalTab.$applyTo = $(this);
				_VerticalTab.render();
				$(this).data(DATA_NAME,_VerticalTab);
			}
		})
	}
	var yijs = yijs || {};
	yijs.VerticalTab = function(options){
		//参数
		this.options   = $.extend($.fn.verticalTab.defaults,options);
		//起作用的对象
		this.$applyTo  = this.options.applyTo && $(this.options.applyTo) || null;
		this.$titles   = null;
		this.$contents = null;
		this.$contentsContainer = null;
		this.current   = null;
		this.animateType = this.options.animateType;
		//样式集合
		this.cls = this.options.cls;
		this.listeners = this.options.listeners;
		//是否自动切换
		this.auto = this.options.auto;
		//切换延迟
		this.delay = this.options.delay;
		//定时器
		this.timer = null;
		//切换事件名
		this.changeEvent = this.options.changeEvent;
		this.defaultShow = this.options.defaultShow;
		this.size = 0;
	}
	yijs.VerticalTab.prototype = {
		/**
		 * 运行
		 */
		render : function(){
			if (this.$applyTo != null && this.$applyTo.size() > 0) {
				var _that = this;
				var _cls  = this.cls;
				var _opts = this.options;
				this._addStyle();
				this._titleBind();
				this.size = this.$titles.size();
				this.setAnimateType(_opts.animateType);
				_opts.defaultShow != null && this.show(_opts.defaultShow);
				this.setAuto(this.auto);
				this.$applyTo.bind("afterChange",this.listeners.afterChange);				
			}
			
		},
		/**
		 * 添加样式
		 */
		_addStyle : function(){
			if(this.$applyTo != null && this.$applyTo.size() > 0){
				var _cls  = this.cls;
				var _opts = this.options;
				this.$applyTo.addClass(_cls.verticalTab).css(_opts.style);
				_opts.titlesApplyTo != null && $(_opts.titlesApplyTo).size() > 0 && $(_opts.titlesApplyTo).addClass(_cls.titlesApplyTo);
				_opts.contentsApplyTo != null && $(_opts.contentsApplyTo).size() > 0 && $(_opts.contentsApplyTo).addClass(_cls.contentsApplyTo);
				this.$titles = this.$applyTo.find('.'+_cls.titlesApplyTo).children("ul").children("li").addClass(_cls.title);
				this.$contentsContainer = this.$applyTo.find('.'+_cls.contentsApplyTo);
				this.$contents = this.$contentsContainer.children("ul").children("li").addClass(_cls.content);
				this._setContentSize();
			}
		},
		/**
		 * 设置内容层的宽高
		 */
		_setContentSize : function(){
			if(this.$contents.size() > 0){
				var _$contentsApplyTo = this.$contentsContainer;
				this.$contents.width(_$contentsApplyTo.width()).height(_$contentsApplyTo.height());
			}
		},
		/**
		 * 给title绑定事件
		 */
		_titleBind : function(){
			var _that = this;
			var _opts = this.options;
			if(this.$titles != null && this.$titles.size() > 0){
				//给选项卡标题绑定事件
				this.$titles.bind(this.changeEvent,function(){
					var _i = $(this).index();
					_that.show(_i);
				});
			}
		},
		/**
		 * 取消title上的事件
		 */
		_titleUnbind : function(){
			this.$titles.unbind(this.changeEvent);
		},
		/**
		 * 显示指定索引值的选项卡
		 * @param {Number} index 索引值
		 */
		show : function(index){
			var _that = this;
			if (index != this.current && index >= 0 && index < this.$titles.size()) {
				var _currentTitleCls = _that.options.currentTitleCls || _that.cls.titleHover;
				//给当前标题添加样式
				_that.$titles.removeClass(_currentTitleCls).eq(index).addClass(_currentTitleCls);
				_that._animateContent(index);
				_that.current = index;
				//触发事件
				_that.$applyTo.trigger({type:"afterChange",currentIndex : _that.current});
			}

		},
		/**
		 * 设置自动切换选项卡的内容
		 * @param {Boolean} auto 是否自动切换
		 */
		setAuto : function(auto){
			var _that = this;
			if(auto){
				this.timer = setTimeout(function(){
					var _i = _that.current < _that.$titles.size()-1 && _that.current + 1 || 0;
					_that.show(_i);
					_that.setAuto(auto);
				},this.delay);
			}else{
				clearTimeout(this.timer);
			}
			this.auto = auto;
			return auto;
		},
		/**
		 * 动画改变内容层
		 * @param {Number} index 索引值
		 */
		_animateContent : function(index){
			var _that = this;
			var _opts = this.options;
			var _effect = this.options.effect;									
			switch (this.animateType) {
				case "slide" :
					var _$contentParent =  this.$contentsContainer.children("ul");
					var _dis = index * _$contentParent.children().eq(0).height();
					var _d = _dis == 0 && 0 || "-"+_dis;
					_$contentParent.stop().animate({"marginTop":_d},_effect["slide"]);				
				break;
				case "fade" :
					if(this.current != null){
						var _$current = this.$contents.eq(this.current);
						var _zIndex = _$current.data("zIndex") - 1;
						this.$contents.eq(index).css("zIndex",_zIndex).data("zIndex",_zIndex).show();
						_$current.fadeOut(_effect["fade"]);
					}else{
						this.$contents.eq(index).fadeIn(_effect["fade"]);
					}				
				break;
				case "grid" : 
					if(this.current != null){
						var _$current = this.$contents.eq(this.current);
						_$current.children().css("display","block");
						var _zIndex = _$current.data("zIndex") - 1;
						this.$contents.eq(index).css("zIndex",_zIndex).data("zIndex",_zIndex).show().children().show();						
						var _Grid = this.options.animatePlugin["grid"];
						if(_Grid != null){
							_Grid.$applyTo = _$current.children();
							_Grid.render();
						}						
					}else{
						this.$contents.eq(index).fadeIn(_effect["fade"]);
					}					
				break;
			}
			 
			//复制内容层组成个gird
			function _createGrid(){
				if (_that.current != null) {
					var _$current = _that.$contents.eq(_that.current);
					this.$contents.eq(index).css("zIndex",_zIndex).data("zIndex",_zIndex).show();
				}
			}
		},
		/**
		 * 设置动画类型
		 * @param {String} animateType 动画类型
		 */
		setAnimateType : function(animateType){
			var _that = this;
			switch (animateType){
				//滑动式
				case "slide" : 
					this.$contents.css("position","static").show().children().show();
				break;
				//渐隐渐显式
				case "fade" :
					_setAbsolute();
				break;
				//表格式渐隐渐显式
				case "grid" :
					_setAbsolute();								 
				break;
			}
			this.animateType = animateType;
			//将内容层转成绝对定位
			function _setAbsolute(callback){
					_that.$contentsContainer.css("position","relative");
					_that.$contents.css("position","absolute");	
					var _zIndex = 1000;	
					_that.$contents.each(function(i){
						$(this).css({"position":"absolute","zIndex":_zIndex}).data("zIndex",_zIndex);
						i != _that.current && $(this).hide();
						callback && callback.call(this,i,$(this));
						_zIndex --;
					})								
			}
		},
		/**
		 * 设置选项卡切换事件
		 * @param {String} evnetName 事件名
		 */
		setChangeEvent : function(evnetName){
			if(this.changeEvent != evnetName){
				this._titleUnbind();
				this.changeEvent = evnetName;
				this._titleBind();
			}
			return this;
			
		},
		/**
		 * 侦听事件
		 * @param {Object} type
		 * @param {Object} fn
		 */
		addEventListener : function(type,fn){
			this.$applyTo.bind(type,fn);
			return this;
		},
		/**
		 * 移除事件侦听
		 */
		removeEventListener : function(type){
			this.$applyTo.unbind(type);
		},
		EVENT_NAME : {
			
		}			
		
	}
	//接口数组
	$.fn.verticalTab.interfaces = [];
	//样式
	$.fn.verticalTab.classes = {
		defaults : {
			verticalTab		: "verticalTab",
			titlesApplyTo 	: "verticalTab-titles",
			title			: "verticalTab-title",
			contentsApplyTo : "verticalTab-contents",
			content			: "verticalTab-content",
			currentTitle    : "verticalTab-current-title"
		}
	}	
	//默认参数
	$.fn.verticalTab.defaults = {
				/**选项卡的标题列表容器对象名*/
				titlesApplyTo   : null,
				/**选项卡的内容列表容器对象名*/
				contentsApplyTo : null,
				/**是否自动显示*/
				auto            : false,
				/**切换的时间延迟*/
				delay			: 3000,
				/**默认显示的选项卡的索引值*/
				defaultShow     : 0,
				/**切换选项卡所使用的事件*/
				changeEvent     : "mouseover",
				/**样式*/
				style           : null,	
				/**选项卡标题鼠标滑过样式*/
				currentTitleCls : null,	
				/**动画类型*/
				animateType		: "slide",
				animatePlugin   : {
					grid	: null        
				},
				/**动画效果配置 */
				effect			: {
					"slide" : {duration:"normal"},
					"fade"  : "slow"
				},				
				/**样式名集合*/ 	
				cls             : $.fn.verticalTab.classes.defaults,
				listeners : {
					render : function(e){},
					afterChange : function(e){}
				}
				
	};	
})(jQuery);