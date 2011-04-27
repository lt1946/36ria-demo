/**
 * $.yitip
 * @extends jquery.1.4.2
 * @fileOverview 创建文字提示框
 * @author 明河共影
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.1
 * @date 2010-07-17
 * Copyright (c) 2010-2010 明河共影
 * @example
 *    $("a").yitip();
 */
(function($){
	
	$.fn.yitip = function(options){
		var opts;
		var DATA_NAME = "yitip";
		//对象缓存
		var oData = $(this).data(DATA_NAME);
		var PLUGIN = $.fn.yitip;
		//返回API
		if(typeof options == 'string'){
			 if(options == 'api'){
			 	//返回实例化的对象
			 	return oData;
			 }
			 else if(options == 'interfaces'){
			 	return oData.interfaces;
			 }
		}
		else{
			var options = options || {};
			//覆盖参数
			opts = $.extend(true,{},PLUGIN.defaults,options);
		}
		
		return $(this).each(function(){
			//调用方法
			if(typeof options == 'string'){
				
			}
			//创建
			else{
				//获取接口id
				var id = PLUGIN.interfaces.length;
	            for(i = 0; i < id; i++)
	            {
	               if(typeof PLUGIN.interfaces[i] == 'undefined'){ id = i; break; };
	            };	
				//实例化类			
				var  yitip = new yijs.Yitip(opts);
				yitip.$applyTo = $(this);
				yitip.render();
				//将对象存入interfaces数组内
				PLUGIN.interfaces[id] = yitip;
				//将实例化后对象写入缓存
				$(this).data(DATA_NAME,yitip);
			}
		})		
	}
	
	//命名空间
	var yijs = yijs || {};
	/**
	 * 文字提示框类
	 */
	yijs.Yitip = function(options){
		//参数
		this.options   = options;
		//起作用的对象
		this.$applyTo  = this.options.applyTo && $(this.options.applyTo) || null;
		//提示框容器
		this.$yitip = null;
		//提示框 内容层容器
		this.$content = null;
		//切换延迟
		this.delay = this.options.delay;
		//模板
		this.tpl = this.options.tpl;
		//样式
		this.classes = this.options.classes;
		//内容
		this.content = this.options.content; 
		//位置
		this.position = this.options.position;
		//位置坐标
		this.pos    = {left:0,top:0};
		this.id	    = 0;
		this.color  = this.options.color; 
		this.TRIGON_HEIGHT = 7;
		this.DATA_COLOR = "color";
		this.COLORS = ['red','green','blue','white','yellow','black'];
		this.location = {TOP_MIDDLE : 'topMiddle',BOTTOM_MIDDLE : 'bottomMiddle',
		                 LEFT_MIDDLE : 'leftMiddle',RIGHT_MIDDLE : 'rightMiddle'};
							
	}
	yijs.Yitip.prototype = {
		/**
		 * 运行
		 */
		render : function(){
			if (this.$applyTo != null && this.$applyTo.size() > 0) {
				this._setId();
				this._create();
				this._bindShowHideEvent();
			}
		},
		/**
		 * 设置yitip的ID
		 */
		_setId : function(){
			var _$yitip = $(".yitip");
			this.id = _$yitip.size() > 0 && _$yitip.size() || 0;
		},
		/**
		 * 创建
		 */
		_create : function(){
			$("body").append(this.tpl);
			this.$yitip = $("body").children('.'+this.classes.yitip).eq(this.id).attr("id","yitip-"+this.id);
			this.$content = this.$yitip.children('.'+this.classes.content);
			if(this.content == "" && this.$applyTo.attr("title")){
				this.content = this.$applyTo.attr("title");
			}
			//向提示框添加内容
			this.setContent(this.content);	
			if(this.$applyTo.attr("color")) this.color = this.$applyTo.attr("color"); 
			//设置提示框颜色
			this.setColor(this.color);					
		},
		/**
		 * 给目标容器绑定显示/隐藏提示框的事件
		 */
		_bindShowHideEvent : function(){
	        var _that = this;
			var _se = this.options.showEvent;
			var _he = this.options.hideEvent;
			if(_se != null){
				this.$applyTo.bind(_se,function(){
					_that.show();
					return false;
				});
			}
			if(_he != null){
				this.$applyTo.bind(_he,function(){
					_that.hide();
					return false;
				})				
			}			
		},
		/**
		 *向提示框添加内容 
		 * @param {Object | String} content 内容
		 */
		setContent : function(content){
			var _that = this;
			if(typeof content == "string"){
				this.$content.html(content);
			}else if(typeof content == "object"){
				var _su = content.success && content.success || null;
				content.success = function(data){
					_that.$content.html(data);
					_that.setPosition(_that.position);
					_su != null && _su.call(this,data);
				}
				$.ajax(content);
			}
			//设置提示框位置
			this.setPosition(this.position);						
		},
		/**
		 * 设置提示框位置
		 * @param {String} position 位置
		 */
		setPosition : function(position){
			var _$applyTo = this.$applyTo;
			var _$tip = this.$yitip;
			var _pos = this.pos;
			//偏移
			var _offest = this.options.offest;
			//目标容器的坐标
			var _l = _$applyTo.offset().left;
			var _t = _$applyTo.offset().top;
			//目标容器的尺寸
			var _aw = _$applyTo.outerWidth(true);
			var _ah = _$applyTo.outerHeight(true);			
			//提示框的尺寸
			var _tw = _$tip.outerWidth(true);
			var _th = _$tip.outerHeight(true);
			//倒三角的高度
			var _trigonHeight = this.TRIGON_HEIGHT;
			var _location = this.location;			 			
			switch (position){
				case _location.TOP_MIDDLE :
					_pos = {"left":_l+Math.floor(_aw/2)-Math.floor(_tw/2),"top":_t - _th - _trigonHeight};
				break;
				case _location.BOTTOM_MIDDLE :
					_pos = {"left":_l+Math.floor(_aw/2)-Math.floor(_tw/2),"top":_t+_ah+_trigonHeight};
				break;
				case _location.LEFT_MIDDLE:
					_pos = {"left":_l-_tw-_trigonHeight,"top":_t+Math.floor(_ah/2)-Math.floor(_th/2)};
				break;
				case _location.RIGHT_MIDDLE :
					_pos = {"left":_l+_aw+_trigonHeight,"top":_t+Math.floor(_ah/2)-Math.floor(_th/2)};
				break;
			}
			//将所得位置加上自定义偏移距离
			_pos.left = _pos.left + parseInt(_offest.left);
			_pos.top = _pos.top + parseInt(_offest.top);
			this._removePositionCls();
			//设置提示框位置			
			_$tip.addClass(position).css(_pos);
			this.pos = _pos;
			this.position = position;
		},
		/**
		 * 删除存在的位置样式
		 */
		_removePositionCls : function(){
			var _location = this.location;
			var _$t = this.$yitip;
			$.each(_location,function(key,value){
				if (_$t.hasClass(value)) _$t.removeClass(value);
			})
		},
		/**
		 * 设置颜色模板
		 * @param {String} color 颜色类名
		 */
		setColor : function(color){
			var _$a = this.$applyTo;
			var _$t = this.$yitip;
			//删除旧的颜色模板
			if(_$t.data(this.DATA_COLOR) != null){
				_$a.removeAttr("color") && _$t.removeClass(color);
			}
			//设置新的颜色模板
			_$a.attr("color",color) && _$t.addClass(color) && _$t.data(this.DATA_COLOR,color);
			this.color = color;
		},
		/**
		 * 显示提示框
		 */
		show : function(delay){
			var _effect = this.options.effect.show;
			var _$t = this.$yitip;
			var _targetTop = this.pos.top;
			var _targetLeft = this.pos.left;
			//提示框动画起始css（透明度和位置）
			var _startCss = {"opacity":_effect.startOpacity};
			//提示框动画结束css（透明度和位置）
			var _endCss = {"opacity":_effect.endOpacity};
			//偏移值
			var _offest = _effect.offest;
			//设置动画偏移参数
			var _location = this.location;
			//延迟
			var _delay = delay || this.options.showDelay;			 			
			switch (this.position){
				case _location.TOP_MIDDLE :
					_startCss.top = _targetTop - _offest;
					_endCss.top   =  _targetTop;
				break;
				case _location.BOTTOM_MIDDLE :
					_startCss.top = _targetTop + _offest;
					_endCss.top   =  _targetTop;
				break;
				case _location.LEFT_MIDDLE:
					_startCss.left = _targetLeft - _offest;
					_endCss.left   =  _targetLeft;					
				break;
				case _location.RIGHT_MIDDLE :
					_startCss.left = _targetLeft + _offest;
					_endCss.left   =  _targetLeft;						
				break;
			}
			if($.browser.msie && $.browser.version < 8){
				//IE8以下不带偏移效果
				_$t.stop().delay(_delay).fadeIn(_effect.speed);
			}else{
				_$t.stop().delay(_delay).css(_startCss).show().animate(_endCss,_effect.speed);
			}			
			
		},
		/**
		 * 隐藏提示框
		 */
		hide : function(delay){
			var _effect = this.options.effect.hide;
			var _$t = this.$yitip;
			var _targetTop = this.pos.top;
			var _targetLeft = this.pos.left;
			var _startCss = {"opacity":_effect.startOpacity};
			var _endCss = {"opacity":_effect.endOpacity};
			var _offest = _effect.offest;
			var _location = this.location;
			var _delay = delay || this.options.hideDelay;			 			
			switch (this.position){
				case _location.TOP_MIDDLE :
					_endCss.top   =  _targetTop - _offest;
				break;
				case _location.BOTTOM_MIDDLE :
					_endCss.top   =  _targetTop + _offest;
				break;
				case _location.LEFT_MIDDLE:
					_endCss.left   =  _targetLeft - _offest;
				break;
				case _location.RIGHT_MIDDLE :
					_endCss.left   =  _targetLeft + _offest;
				break;
			}
			if ($.browser.msie && $.browser.version < 8) {
				//IE8以下不带偏移效果
				_$t.stop().delay(_delay).fadeOut(_effect.speed);
			}else{
				_$t.stop().delay(_delay).css(_startCss).animate(_endCss,_effect.speed,function(){
					_$t.hide();
				});					
			}					
		}
	}	
	//接口数组
	$.fn.yitip.interfaces = [];
	//模板
	$.fn.yitip.tpls = {
		"default" : '<div class="yitip">'+
						'<div class="yitip-content"></div>'+
						'<div class="yitip-trigon-border"></div>'+
						'<div class="yitip-trigon"></div>'+
		            '</div>' 
	}
	//样式
	$.fn.yitip.classes = {
		yitip : "yitip",
		content : "yitip-content"
	}		
    //默认参数
	$.fn.yitip.defaults = {
		/**目标容器*/
		applyTo : null,
		/**内容*/
		content : "",
		/**提示框位置*/
		position : "topMiddle",
		/**提示框位置偏移*/
		offest : {"left":0,"top":0},
		/**提示框颜色*/
		color : "yellow",
		/**隐藏延迟*/
		hideDelay : 500,
		/**显示延迟*/
		showDelay : 0,
		/**显示事件*/
		showEvent : "mouseover",
		/**隐藏事件*/
		hideEvent : "mouseout",
		/**显示/隐藏效果*/
		effect : {
			show : {"speed":"slow","offest":10,"startOpacity":0,"endOpacity":1},
			hide : {"speed":"slow","offest":10,"startOpacity":1,"endOpacity":0}
		},
		/**提示框模板*/
		tpl : $.fn.yitip.tpls["default"],
		/**提示框样式集合*/
		classes : $.fn.yitip.classes 	
	}
})(jQuery);