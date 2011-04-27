/**

 * @class yijs.ImagesSlider

 * @fileOverview 创建一个效果效果的幻灯片

 * @author 谢文浩

 * @email mohaiguyan12@126.com

 * @version 0.1

 * @date 2009-12-08

 * Copyright (c) 2009-2009 谢文浩

 */





/**命名空间*/

var yijs = {};



/**

 * @constructor

 * @param {Object} options 参数

 */

yijs.ImagesSlider = function(options){

	//组件的默认参数

	var defaults = {

		/** 是否自动运行组件（如果为false，请在实例化组件类后，调用render（）方法）*/

		autoRender : false,

		/** 组件所起作用的对象*/

		applyTo : null,

		/** 宽度*/

		width:null,

		/** 高度*/

		height:null,

		/** 透明度*/

		opacity : 0.7,

		/** 图片文字描述高度*/

		detailHeight : 100,

		/** 组件样式*/

		style : null

	}; 

	//覆盖默认参数

	this.options = $.extend(defaults, options);	

	//组件所起作用的对象

	this.$applyTo = null;

	//组件内部的包含图片的容器层

	this.$imageDiv = null;

	//组件内部的图片描述容器层

	this.$detail = null;

	//图片数目

	this.length = 0;

    

	this.showWidth = 0;

	//鼠标是否划过组件

	this.over = false;

	//鼠标所在图片层的索引值

	this.currentIndex = -1;

	if(this.options.autoRender) this.render();		

}



yijs.ImagesSlider.prototype = {

	/**

	 * 运行

	 */	

	render : function(){

		var _that = this;

		var _opts = this.options;

		this.$applyTo = $(_opts.applyTo);

		if(_opts.applyTo != null && this.$applyTo.size()>0){

			this._addStyle();

			this._create();

			this.toDefaultPosition();

			this.$imageDiv.mouseenter(function(){

				_that._setOpacity(_that.$applyTo,_opts.opacity);

				_that._setOpacity($(this),1);

				_that.move($(this));		

			})

			this.$applyTo.mouseleave(function(){

				_that.toDefaultPosition();	

				return false;

			})

		

		}	

    },

    /**

     * 创建

     */

    _create : function(){

    	var _opts = this.options;

    	//给图片包裹个容器层

    	this.$applyTo.children("img").wrap("<div class='yijs_imagesSlider_div' />");

    	this.$imageDiv = this.$applyTo.children('.yijs_imagesSlider_div');

    	//图片描述层的半透明黑色遮罩层

    	var detailMask = "<div class='yijs_imagesSlider_mask' style='height:"+_opts.detailHeight+"px;'></div>";

    	//给每个图片描述层添加描述层

    	this.$imageDiv.each(function(){

    		$img = $(this).children('img');

    		var title = $img.attr('title');

    		var text = $img.attr('text');

    		var url = $img.attr('url');

    		var detailDiv = "<div class='yijs_imagesSlider_detail' style='height:"+_opts.detailHeight+"px;'><p class='yijs_imagesSlider_detail_title'><a href='"+url+"'>"+title+"</a></p><p class='yijs_imagesSlider_detail_text'>"+text+"</p></div>";

    		$(this).append(detailMask);

    		$(this).append(detailDiv);

    	})

    	

    	this.$detail = this.$imageDiv.children('.yijs_imagesSlider_detail');

    	this.$mask = this.$imageDiv.children('.yijs_imagesSlider_mask');

    	//赋予length属性

    	this.length = this.$imageDiv.size();

    },

    /**

     * 将图片层滑动到起始位置

     */

    toDefaultPosition : function(){

    	var _that = this;

    	var _opts = this.options;

    	//默认显示的图片宽度

    	var left = Math.floor(this.$applyTo.width()/this.length);

    	this.showWidth = left;

    	var _l = 0;

    	//将图片容器层移动到指定位置

    	this.$imageDiv.each(function(a){

    		$(this).stop().animate({"left":_l},"slow",function(){

    			_that._hideDetail($(this));

    		});

    	    //将left值和索引值写入该图片容器层得缓存

    		$(this).data("left",_l);

    		$(this).data("index",a);

    		_l += left;

    	})

    	//设置透明度
    	this._setOpacity(this.$applyTo,_opts.opacity);
    	this.over = false;
    },	

    /**

     * 鼠标经过，开始滑动当前图片层

     * @param {Object} $that 鼠标所在的当前图片层

     */

    move : function($that){

    	var _that = this;

    	//获取该图片容器层left值和索引值

    	var defaultLeft = Number($that.data('left'));
    	var index = $that.data('index');
    	var w = $that.width(); 

    	var showWidth = this.showWidth;

    	//该图片层的隐藏部分的宽度

    	var hideWidth = w - showWidth;

    	//当显示该图片层的全图时候，其他图片的显示部分的宽度

    	var afterLeft = Math.floor(showWidth/2);

		var l = afterLeft;

		var afterHideWidth = w-afterLeft;

		//判断是否是第一次经过

		if(!this.over){

			if(defaultLeft != 0){

				//滑动当前图片层之前的图片层

				for(var i = 1;i<index;i++){

					this.$imageDiv.eq(i).animate({"left":"-="+l},"slow");

					l += afterLeft;

				}

				

				$that.animate({"left":"-="+l},"slow",function(){

					//显示图片描述层

					_that._showDetail($(this));

				});			

			}

			var n = hideWidth - l;

			var j = this.length - index -1;

			var a = Math.floor(n/j);

			var b = n;

			//滑动当前图片层之后的图片层

			for(var i = index+1;i<this.length;i++){

				this.$imageDiv.eq(i).animate({"left":"+="+b},"slow");

				b -= a;

			}

			this.over = true;

			this.currentIndex = index;

		}else{

			//当当前索引值比 this.currentIndex来的大，移动当前图片层

			if(index > this.currentIndex){

				$that.animate({"left":"-="+afterHideWidth},"slow",function(){

					_that._hideDetail($(this).prev());

					_that._showDetail($(this));

				});	

			}else{

				//当当前索引值比 this.currentIndex来的小，移动当前图片层的下一个图片层

				$that.next().animate({"left":"+="+afterHideWidth},"slow",function(){

					_that._hideDetail($(this));

					_that._showDetail($(this).prev());

				});	

			}

			this.currentIndex = index;

		} 
    },

    /**

     * 显示图片描述层

     * @param {Object} $that 鼠标所在的当前图片层

     */

    _showDetail : function($that){

    	var _opts = this.options;

    	$that.children('.yijs_imagesSlider_detail').animate({bottom : 0},'fast');

    	$that.children('.yijs_imagesSlider_mask').animate({bottom : 0},'fast');

    },

    /**

     * 隐藏图片描述层

     * @param {Object} $that 鼠标所在的当前图片层

     */

    _hideDetail : function($that){

    	var _opts = this.options;

    	$that.children('.yijs_imagesSlider_detail').animate({bottom : "-"+_opts.detailHeight},'fast');

    	$that.children('.yijs_imagesSlider_mask').animate({bottom :"-"+ _opts.detailHeight},'fast');    	

    },

    /**

     * 给组件添加样式

     */

    _addStyle : function(){

		var cls = this.options.cls;

		this.$applyTo.addClass('yijs_imagesSlider');

		this.$applyTo.width(this.options.width).height(this.options.height);

		this.options.style != null && this.$applyTo.css(this.options.style);   

    },

    /**

     * 设置图片的透明名度

     */

    _setOpacity : function($that,opacity){

    	$that.find('img').fadeTo('fast',opacity);

    }

}



$.fn.ImagesSlider = function(options){

	if(!options) options = {};

	options.autoRender = true;

	options.applyTo = $(this).selector;

	return new yijs.ImagesSlider(options);

}	
