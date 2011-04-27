/**
 * $.divSlider
 * @extends jquery.1.4.2
 * @fileOverview 创建一组可以滑动的容器层
 * @author 明河共影
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.11
 * @date 2010-05-17
 * Copyright (c) 2010-2010 明河共影
 * @example
 *    $("#nav").divSlider();
 */
(function($){
	$.fn.divSlider = function(options){
		var opts;
		var DATA_NAME = "divSlider";
		//返回API
		if(typeof options == 'string'){
			 if(options == 'api'){
			 	return $(this).data(DATA_NAME).interfaces[$(this).data(DATA_NAME).current];
			 }else if(options == 'interfaces'){
			 	return $(this).data(DATA_NAME).interfaces;
			 }
		}
		else{
			var options = options || {};
			//覆盖参数
			opts = $.extend(true, {}, $.fn.divSlider.defaults, options);
		}
		
		return $(this).each(function(){
			//调用方法
			if(typeof options == 'string'){
				
			}
			//创建
			else{
				var _divSlider = new yijs.DivSlider(opts);
				_divSlider.$applyTo = $(this);
				_divSlider.render();
			}
		})
	}
	var yijs = yijs || {};
	yijs.DivSlider = function(options){
		this.options = $.extend($.fn.divSlider.defaults,options);	
		//组件所起作用的对象
		this.$applyTo = options.applyTo && $(options.applyTo) || null;
		this.$items = null;
		this.width = 0;
		this.liAverageWidth = 0;
		this.size  = 0;
		this.ZINDEX = 3000;	
		this.defaultShowFull = this.options.defaultShowFull;
		this.current = null;
		this.currentHideWidth = null;
	}
	yijs.DivSlider.prototype = {
		/**
		 * 运行
		 */
		render : function(){
			var _that = this;
			if(this.$applyTo != null && this.$applyTo.size() > 0){
				this.width = this.$applyTo.width();
				this.$items = this.$applyTo.children();
				this.size = this.$items.size();
				this.setStyle();
				this.toDefaultPosition();
				this.$items.mouseenter(function(){
					var _i = _that.$items.index($(this));
					_that.showFull(_i);
				})
				this.$applyTo.mouseleave(function(){
					_that.toDefaultPosition();	
				})
			}
		},
		/**
		 * 添加样式
		 */
		setStyle : function(){
			var _that = this;
			this.$applyTo.css("position","relative");
			this.$applyTo.children().each(function(){
				$(this).css({"position": "absolute","top":0,"left":0,"zIndex":_that.ZINDEX});
				_that.ZINDEX ++;
				//用来修正overflow:hidden无效的问题
				$(this).width(_that.options.itemWidth || $(this).width());
			})			 
						 
			return this;
		},
		addCurrentCls : function(){
			if(this.current >= 0){
				var $current = this.$items.eq(this.current);
				$current.addClass(this.options.currentCls).siblings().removeClass(this.options.currentCls);				
			}
		},
		removeCurrentCls : function(){
			this.$items.removeClass(this.options.currentCls);			
		},
		/**
		 * 设置每个容器层的起始位置
		 */
		toDefaultPosition : function(){
			var _that = this;
			var _opts = this.options;
			var _$li = this.$applyTo.children();
			var delay = 0;
		   this.liAverageWidth = Math.max(Math.floor(this.width/this.size),_opts.minWidth);
		   this.current = null;
		   this.currentHideWidth = null;
		   for (var i = this.size -1;i>=0;i--){
		   	    var _left = _that.liAverageWidth * i;
		   	    _that.animateTo(_$li.eq(i),delay,_left,function($obj){
				    var index = _that.$items.index($obj);
					if(index == 0 && _that.defaultShowFull != null){
						_that.current = _that.defaultShowFull;
						_that.showFull(_that.defaultShowFull);
					}
				});
		   }
		   _that.defaultShowFull == null && this.removeCurrentCls();
			   
		},
		/**
		 * 运动到指定位置
		 * @param {Object} $obj     动画对象
		 * @param {Number} delay    延迟时间
		 * @param {Number} distance 移动距离
		 */
		animateTo : function($obj,delay,distance,callback){
			var _d = {"left" : distance};
			if(this.options.direction == "vertical"){
				_d = {"top" : distance};
			}
			$obj.stop().delay(delay).animate(_d,this.options.speed,function(){
				callback && callback.call(this,$(this));
			});
		},
		showFull : function(index){
			var _that = this;
			var $current = this.$items.eq(index);
			if(this.current == null){
				var _w = $current.width();
				var _size = this.$items.size();
				var _showWidth = parseInt($current.next().css("left")) - parseInt($current.css("left"));
				if(index == _size -1) _showWidth = $current.parent().width() - parseInt($current.css("left"));
				var _hideWidth = _w - _showWidth > 0 && _w - _showWidth || 0;
				this.currentHideWidth = _hideWidth;
				var _aveMoveWidth = Math.floor(_hideWidth / (_size - 1));
				var _prevMoveWidth = _aveMoveWidth * index;
				var _nextMoveWidth = _hideWidth - _prevMoveWidth;
				for(var i = index ;i >= 1 ;i--){
					var _$i = this.$items.eq(i);
					var _l = parseInt(_$i.css("left"));
					_that.animateTo(_$i,0,_l - _prevMoveWidth);
					_prevMoveWidth -= _aveMoveWidth;
				}
				for(var i = index+1 ;i < _size ;i++){
					var _$i = this.$items.eq(i);
					var _l = parseInt(_$i.css("left"));
					_that.animateTo(_$i,0,_l + _nextMoveWidth);
					_nextMoveWidth -= _aveMoveWidth;
				}			
			}else{
				var _l;
				if(index < this.current){
					_l = parseInt(this.$items.eq(this.current).css("left")) + this.currentHideWidth;
					_that.animateTo(this.$items.eq(this.current),0,_l);	
				}else if(index > this.current){
					_l = parseInt($current.css("left")) - this.currentHideWidth;
					_that.animateTo($current,0,_l);						
				}
			}
			this.current = index;
			this.addCurrentCls();
		}
	}
	//接口数组
	$.fn.divSlider.interfaces = [];
	//默认参数
	$.fn.divSlider.defaults = {
				/**速度*/
				speed        : "slow",
				delay        : 300,
				minWidth     : 100,
				itemWidth    : null,
				direction    : "horizontal",
				defaultShowFull : null,
				currentCls  : "divSlider-item-current"	
	};	
})(jQuery);
