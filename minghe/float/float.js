/**
*创建一个悬浮层
*/
jQuery.fn.float=function(settings){
	if(typeof settings == "object"){
		settings = jQuery.extend({
			//位置偏移
			offsetTop : 0,
			offsetLeft : 0,
			offsetRight : 0,
			delay : 1000,
			offset : {
				left : 0,
				right : 0,
				top : 0,
				bottom : 0
			},
			style : null, //样式
			width:100,  //宽度
			height:200, //高度
			position:"rm" //位置
		}, settings || {});	
		var winW = $(window).width();
		var winH = $(window).height();
		
		 //根据参数获取位置数值
		function getPosition($applyTo,position){
			var _pos = null;
			switch(position){
				case "rm" : 
					$applyTo.data("offset","right");
					$applyTo.data("offsetPostion",settings.offsetRight);
					_pos = {right:settings.offsetRight,top:winH/2-$applyTo.height()/2};
				break;
				case "lm" :
					$applyTo.data("offset","left");
					$applyTo.data("offsetPostion",settings.offsetLeft);
					_pos = {left:settings.offsetLeft,top:winH/2-$applyTo.height()/2};
				break;
			}
			return _pos;
		}
		//设置容器位置
		function setPosition($applyTo,position,isUseAnimate){
			var scrollTop = $(window).scrollTop();
			var scrollLeft = $(window).scrollLeft();
			var _pos = getPosition($applyTo,position);
			_pos.top += scrollTop;
			isUseAnimate && $applyTo.stop().animate(_pos,settings.delay) || $applyTo.css(_pos);
		} 
		return this.each(function(){
			var $this =  $(this);
			$this.css("position","absolute");
			settings.style && $this.css(settings.style);
			setPosition($this,settings.position);
			$(window).scroll(function(){
				setPosition($this,settings.position,true);
			});
		})	
	}else{
		var speed = arguments.length > 1 && arguments[1] || "fast"; 
		this.each(function(){		   
			if(settings == "clearOffset"){
					var _c = {};
					if($(this).data("offset")){
						 _c[$(this).data("offset")] = 0;  
						 $(this).animate(_c,speed);
					}
			}else if(settings == "addOffset"){
					var _c = {};
					if($(this).data("offset") && $(this).data("offsetPostion")){
						 _c[$(this).data("offset")] = $(this).data("offsetPostion"); 
						 $(this).animate(_c,speed);
					}
									   
			}
		})
	}
}		  
