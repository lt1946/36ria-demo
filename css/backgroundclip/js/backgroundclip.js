var S = KISSY,Event = S.Event,DOM = S.DOM;
Event.on('#demo-1','click',function(){
	//网页被卷去的高
	var scrollTop = DOM.scrollTop();
	//视窗高度
	var viewHeight = DOM.viewportHeight();
	var viewWidth = DOM.viewportWidth();
	var lightbox = S.one('#lightbox');
	lightbox.css('display','block').css('top',scrollTop+Math.floor(viewHeight/2)-Math.floor(lightbox.height()/2))
			.css('left',Math.floor(viewWidth/2)-Math.floor(lightbox.width()/2));
	//TODO:宽度和高度的计算没加上边框和内边距，由于主要是演示半透明边框，脚本部分尽量简化。		
}); 