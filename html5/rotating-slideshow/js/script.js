$(document).ready(function(){
	//幻灯片
	var slideShow = $('#slideShow'),
		ul = slideShow.find('ul'),
        //幻灯片的图片容器
		li = ul.find('li'),
        //图片个数
		cnt = li.length;

    //设置每个图片容器（li）的z-index，递减（采用绝对定位，保证越前面的z-index应该越高）
	updateZindex();
	if($.support.transform){
	
		//css3旋转
		li.find('img').css('rotate',function(i){
			// 逆时针旋转
			return (-90*i) + 'deg';
		});
	
        //绑定一个自定义事件（参数：方向、角度）
		slideShow.bind('rotateContainer',function(e,direction,degrees){
			
            //扩大幻灯片容器
			slideShow.animate({
				width		: 510,
				height		: 510,
				marginTop	: 0,
				marginLeft	: 0
			},'fast',function(){
				//下一张
				if(direction == 'next'){
				
                    //渐隐第一张图片，并将这张图片添加到最后，同时更新所有li的z-index
					$('li:first').fadeOut('slow',function(){
						$(this).remove().appendTo(ul).show();
						updateZindex();
					});
				}
                //上一张
				else {
					
                    //隐藏最后一张图片，移动这张图片到第一个位置，更新li的z-index，最后渐现该图片
					var liLast = $('li:last').hide().remove().prependTo(ul);
					updateZindex();
					liLast.fadeIn('slow');
				}
				
				//旋转动画（使用jquery.rotate.js来解决浏览器之间的差异）
				slideShow.animate({				
					rotate:Math.round($.rotate.radToDeg(slideShow.css('rotate'))+degrees) + 'deg'
				},'slow').animate({
					width		: 490,
					height		: 490,
					marginTop	: 10,
					marginLeft	: 10
				},'fast');
			});
		});
		
        //绑定二个自定义事件（下一张、上一张）
		slideShow.bind('showNext',function(){
            //二个参数：方向、角度
			slideShow.trigger('rotateContainer',['next',90]);
		});
		
		slideShow.bind('showPrevious',function(){
			slideShow.trigger('rotateContainer',['previous',-90]);
		});
	}
	
	else{
		
		// IE9以下浏览器，不支持旋转属性，去掉旋转效果
		
		slideShow.bind('showNext',function(){
			$('li:first').fadeOut('slow',function(){
				$(this).remove().appendTo(ul).show();
				updateZindex();
			});
		});
		
		slideShow.bind('showPrevious',function(){
			var liLast = $('li:last').hide().remove().prependTo(ul);
			updateZindex();
			liLast.fadeIn('slow');
		});
	}
	
	//点击上一个箭头
	$('#previousLink').click(function(){
		//运动未结束，直接返回
        if(slideShow.is(':animated')){
			return false;
		}
        //触发自定义事件showPrevious，切换到上一张图片
		slideShow.trigger('showPrevious');
		return false;
	});
	//点击下一个箭头
	$('#nextLink').click(function(){
		//运动未结束，直接返回
		if(slideShow.is(':animated')){
			return false;
		}
        //触发自定义事件showNext，切换到下一张图片
		slideShow.trigger('showNext');
		return false;
	});
	
    //更新li的z-index
	function updateZindex(){
		
        //遍历li，让z-index递减
		ul.find('li').css('z-index',function(i){
			return cnt-i;
		});
	}

});