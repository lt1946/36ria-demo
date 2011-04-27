/**

 * @class yijs.ImagesSlider

 * @fileOverview 创建一个层滑动组件

 * @author 谢文浩

 * @email mohaiguyan12@126.com

 * @version 0.1

 * @date 2009-12-23

 * Copyright (c) 2009-2009 谢文浩

 */





/**命名空间*/

var yijs = {};



/**

 * @constructor

 * @param {Object} options 参数

 */

yijs.Carousel = function(options){

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

		style : null,

		liHeight : 150,

		liWidth : 200,

		speed : 'slow'

	}; 

	this.cls = {

		btnHover : 'yijs_carousel_btnHover',

		btnEnabled : 'yijs_carousel_btnEnabled'

	}

	//覆盖默认参数

	this.options = $.extend(defaults, options);	

	//组件所起作用的对象

	this.$applyTo = null;

	this.$container = null;

	this.$ulVessel = null;

	this.$li = null;

	//层数量

	this.length = 0;

	this.postion = 0;

	this.distance = 0;

	this.ulWidth = 0;

	this.total = 0;

	this.page = 1;

	this.leftBtnEnabled = true;

	this.rightBtnEnabled = false;

	if(this.options.autoRender) this.render();		

}



yijs.Carousel.prototype = {

	/**

	 * 运行

	 */	

	render : function(){

		var _that = this;

		var _opts = this.options;

		this.$applyTo = $(_opts.applyTo);

		if(_opts.applyTo != null && this.$applyTo.size()>0){

			this._create();

			this._addStyle();

			this._setUlVesselSize();

			this._setpage();

			this.$container.find(".yijs_carousel_btn").hover(function(){

				$(this).hasClass("yijs_carousel_btnEnabled") && $(this).addClass("yijs_carousel_btnHover");



			},function(){

				$(this).removeClass("yijs_carousel_btnHover");

			})

			this.$container.find(".yijs_carousel_left").click(function(){

				_that.prev();

			})

			this.$container.find(".yijs_carousel_right").click(function(){

				_that.next();

			})		

		}	

    },

    prev : function(){

    	if(this.page<this.total){

    		this.$applyTo.animate({"marginLeft" : "-="+this.distance},this.options.speed);

    		this.page ++;

    		this._setBtnStyle();

    		

    	}

    },

    next : function(){

    	if(this.page != 1){

    		this.$applyTo.animate({"marginLeft" : "+="+this.distance},this.options.speed);

    		this.page --;

    		this._setBtnStyle();

    	}   	

    },

    _setBtnStyle : function(){

    	var $left = this.$container.find(".yijs_carousel_left");

    	var $right = this.$container.find(".yijs_carousel_right");

        if(this.page == 1){

        	$right.hasClass(this.cls.btnEnabled) && $right.removeClass(this.cls.btnEnabled);

        	!$left.hasClass(this.cls.btnEnabled) && $left.addClass(this.cls.btnEnabled);

        	

        }else if(this.page == this.total){

        	$left.hasClass(this.cls.btnEnabled) && $left.removeClass(this.cls.btnEnabled);

        	!$right.hasClass(this.cls.btnEnabled) && $right.addClass(this.cls.btnEnabled);

        }else{

        	!$left.hasClass(this.cls.btnEnabled) && $left.addClass(this.cls.btnEnabled);

        	!$right.hasClass(this.cls.btnEnabled) && $right.addClass(this.cls.btnEnabled);

        }

    },

    /**

     * 创建

     */

    _create : function(){

    	var _opts = this.options;

		this.$applyTo.wrap("<div class='yijs_carousel'><div class='yijs_carousel_ul_vessel'></div>");

		this.$container = this.$applyTo.parents('.yijs_carousel');

		this.$ulVessel = this.$applyTo.parent();

		this.$li = this.$applyTo.children("li");

		this.length = this.$li.size();

    	this._createBtn();

    	



    },

    _createBtn : function(){

    	if(this.$container.size() > 0){

        	var left = "<div class='yijs_carousel_btn_vessel'><div class='yijs_carousel_btn yijs_carousel_left yijs_carousel_btnEnabled' /></div>";

        	var right = "<div class='yijs_carousel_btn_vessel'><div class='yijs_carousel_btn yijs_carousel_right' /></div>"; 

        	var clear = "<div class='clear'></div>";

        	this.$container.prepend(left);

        	this.$container.append(right);

        	this.$container.append(clear);

    	}

    },

    /**

     * 添加样式

     */    

    _addStyle : function(){

		this.$container.width(this.options.width).height(this.options.height);

		this.options.style != null && this.$container.css(this.options.style); 

		this.$li.width(this.options.liWidth).height(this.options.liHeight);

    },

    _setUlVesselSize : function(){

    	var btnWidth = this.$container.children(".yijs_carousel_btn_vessel").width()*2;

    	var w =  parseInt(this.options.width) - btnWidth;

    	this.$ulVessel.width(w);

    	this.distance = w;

    	this.$ulVessel.height(this.options.liHeight);

    	var h2 = (this.$container.height() - this.options.liHeight)/2;

    	this.$ulVessel.css("margin-top",h2+"px");

    	this.$li.css("margin-right",this.options.liMarginRight+"px");

    	var w2 = (this.options.liWidth+this.options.liMarginRight) * this.length;

    	this.$ulVessel.children("ul").width(w2);

    	this.ulWidth = w2;

    },

    _setpage : function(){

    	this.total = Math.ceil(this.ulWidth/this.distance);

    	

    }

}



$.fn.Carousel = function(options){

	if(!options) options = {};

	options.autoRender = true;

	options.applyTo = $(this).selector;

	return new yijs.Carousel(options);

}	

n.Carousel = function(options){
	if(!options) options = {};
	options.autoRender = true;
	options.applyTo = $(this).selector;
	return new yijs.Carousel(options);
}	
