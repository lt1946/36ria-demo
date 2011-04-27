(function($){
	$.fn.colorTip = function(settings){

		var defaultSettings = {
			//颜色
			color		: 'yellow',
			//延迟
			timeout		: 500
		}
		//提示框的颜色
		var supportedColors = ['red','green','blue','white','yellow','black'];
		
		/* 合并默认参数和用户自定义参数 */
		settings = $.extend(defaultSettings,settings);
		
		return this.each(function(){

			var elem = $(this);
			
			// 如果该对象不包含title属性，直接予以返回
			if(!elem.attr('title')) return true;
			
			// 实例化eventScheduler（定时器）			
			var scheduleEvent = new eventScheduler();
			//实例化Tip(提示类，产生、显示、隐藏)
			var tip = new Tip(elem.attr('title'));

			// 产生提示框，并给提示框父容器添加样式
			
			elem.append(tip.generate()).addClass('colorTipContainer');

			// 检查提示框父容器是否有颜色样式
			
			var hasClass = false;
			for(var i=0;i<supportedColors.length;i++)
			{
				if(elem.hasClass(supportedColors[i])){
					hasClass = true;
					break;
				}
			}
			
			// 如果没有，使用默认的颜色
			
			if(!hasClass){
				elem.addClass(settings.color);
			}
			
			// 鼠标滑过提示框父容器时，显示提示框
			// 鼠标移出，则隐藏
			
			elem.hover(function(){

				tip.show();
				
				//清理定时器
				
				scheduleEvent.clear();

			},function(){

				//启动定时器
				
				scheduleEvent.set(function(){
					tip.hide();
				},settings.timeout);

			});
			
			//删除title属性
			elem.removeAttr('title');
		});
		
	}


	/*
	/	定时器类
	*/

	function eventScheduler(){}
	
	eventScheduler.prototype = {
		set	: function (func,timeout){
			//添加定时器
			this.timer = setTimeout(func,timeout);
		},
		clear: function(){
			//清理定时器
			clearTimeout(this.timer);
		}
	}


	/*
	/	提示类
	*/

	function Tip(txt){
		this.content = txt;
		this.shown = false;
	}
	
	Tip.prototype = {
		generate: function(){
			//产生提示框
			
			return this.tip || (this.tip = $('<span class="colorTip">'+this.content+
											 '<span class="pointyTipShadow"></span><span class="pointyTip"></span></span>'));
		},
		show: function(){
			//显示提示框
			if(this.shown) return;
			this.tip.css('margin-left',-this.tip.outerWidth()/2).fadeIn('fast');
			this.shown = true;
		},
		hide: function(){
			//隐藏提示框
			this.tip.fadeOut();
			this.shown = false;
		}
	}
	
})(jQuery);
