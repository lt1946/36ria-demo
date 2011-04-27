
	jQuery.fn.float=function(settings){
		 //根据参数获取位置数值
		function getPosition(position){
			var _pos = null;
			switch(position){
				case "lm" : 
				_pos = {};
				break;
			}
			return _pos;
		}
		//设置容器位置
		function setPosition($applyTo,position){
			var scrollTop = $(window).scrollTop();
			var scrollLeft = $(window).scrollLeft();
			var _pos = getPosition(position);
		} 
		return this.each(function(){
		    settings = jQuery.extend({
				//位置偏移
				offsetTop : 0,
				offsetLeft : 0,
				offsetRight : 0,
				width:100,  //宽度
				height:200, //高度
				position:"lm" //位置
			}, settings || {});								  
			$(this).css("position","absolute").width(settings.width).height(setting.height);				  
			setPosition($(this),settings.position);					  
			$(window).scroll(moveDiv);
		})
	}		  
