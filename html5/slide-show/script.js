//之所以使用$(window).load()而不使用更简洁的$()，是因为我们需要确保图片全部加载完成，而不是DOM加载完成
$(window).load(function(){
	//测试浏览器是否支持canvas
	var supportCanvas = 'getContext' in document.createElement('canvas');

    //幻灯片图片容器（li）
	var slides = $('#slideshow li'),
        //默认显示第一张图片
		current = 0,
        //幻灯片尺寸
		slideshow = {width:0,height:0};
    
    //之所以加个定时器，是因为canvas还是很占资源的，我们希望晚点使用canvas
	setTimeout(function(){
		//向控制台输出时间
		window.console && window.console.time && console.time('Generated In');
		
		if(supportCanvas){
            //遍历每张图片
			$('#slideshow img').each(function(){
                //第一张图片时先设置下幻灯片的宽高（将图片的宽高缓存起来，供其他代码调用）
				if(!slideshow.width){
					slideshow.width = this.width;
					slideshow.height = this.height;
				}
				//在图片之前产生canvas
				createCanvasOverlay(this);
			});
		}
		//向控制台输出时间，这样获取到canva初始化时间
		window.console && window.console.timeEnd && console.timeEnd('Generated In');
		//用户点击箭头
		$('#slideshow .arrow').click(function(){
			var li			= slides.eq(current),
				canvas		= li.find('canvas'),
				nextIndex	= 0;

			//下一张
			if($(this).hasClass('next')){
				nextIndex = current >= slides.length-1 ? 0 : current+1;
			}
            //上一张
			else {
				nextIndex = current <= 0 ? slides.length-1 : current-1;
			}

			var next = slides.eq(nextIndex);
			//支持canvas的情况
			if(supportCanvas){
                //渐现canvas
				canvas.fadeIn(function(){
					//显示下个容器
					next.show();
					current = nextIndex;
					//隐藏当前图片容器，并移除激活样式，给新出现的图片容器加上激活样式
					li.fadeOut(function(){
						li.removeClass('slideActive');
						canvas.hide();
						next.addClass('slideActive');
					});
				});
			}
			else {
				//如果浏览器不支持canvas只做简单的显隐处理
				current=nextIndex;
				next.addClass('slideActive').show();
				li.removeClass('slideActive').hide();
			}
		});
		
	},100);

    /**
     * 创造canvas对像
      * @param {Object} image 图片
     */
	function createCanvasOverlay(image){
        //创建canvas元素
		var canvas			= document.createElement('canvas'),
            //获取2d canvas上下文（如果不支持canvas，这个对象是不存在的）
			canvasContext	= canvas.getContext("2d");
		
		// 设置canvas的宽度和高度
		canvas.width = slideshow.width;
		canvas.height = slideshow.height;
		//在canvas内绘制一张图片
		canvasContext.drawImage(image,0,0);
        //获取canvas图片像素数据，这非常重要
		var imageData	= canvasContext.getImageData(0,0,canvas.width,canvas.height),
			data		= imageData.data;
		//遍历所有的像素并修改红色、绿色、蓝色通道的值，这是整个教程中最难的部分，如果没理解没关系，但希望通过这一个操作，让各位直观的感受canvas像素级操作的强大
		for(var i = 0,z=data.length;i<z;i++){
			data[i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
            //为了更好的说明，这里明河加入颜色反转效果，可以把上面的代码去掉，换成下面的试下
            /*data[i] = 255 - data[i];
            data[++i] = 255 - data[++i];
            data[++i] = 255 - data[++i];*/
			++i;
		}
		
        //重新应用下像素数据，后面二个参数是x\y坐标值
		canvasContext.putImageData(imageData,0,0);
		//将canvas插入到图片前面
		image.parentNode.insertBefore(canvas,image);
	}
	
});
