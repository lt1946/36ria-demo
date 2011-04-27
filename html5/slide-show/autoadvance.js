$(window).load(function(){
	var timeOut = null;

	$('#slideshow .arrow').click(function(e,simulated){
        //点击箭头，清除定时器
		if(!simulated){
			clearTimeout(timeOut);
		}
	});

	(function autoAdvance(){
        //触发箭头点击事件，当第二个参数为false时，清理定时器
		$('#slideshow .next').trigger('click',[true]);
		//5秒定时轮放
		timeOut = setTimeout(autoAdvance,5000);
	})();

});