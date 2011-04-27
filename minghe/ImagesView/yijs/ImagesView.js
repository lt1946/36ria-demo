var yijs = {};

yijs.ImagesView = function(options){

	//组件的默认参数

	var defaults = {

		/** 是否自动运行组件（如果为false，请在实例化组件类后，调用render（）方法）*/

		autoRender : false,

		applyTo : null,

		width:null,

		height:null,

		cls : {

			

		},

		style : null

	}; 	

	this.options = $.extend(defaults, options);	

	this.$applyTo = null;

	this.$list = null;

	this.$largeImageVessel = null;

	this.$liBg = null;

	this.length = 0;

	this.images = [];

	this.listWidth = 0;

	this.listHeight = 0;

	if(this.options.autoRender) this.render();		

}

yijs.ImagesView.prototype = {

	render : function(){

		var _opts = this.options;

		this.$applyTo = $(_opts.applyTo);

		if(_opts.applyTo != null && this.$applyTo.size()>0){

			this._addStyle();

			this._setData();

			this.$applyTo.html('');

			this._create();

		}

	},

	_create : function(){

		var _that = this;

		this._createLoading();

		this._createList();

		this._createListMask();

		this._setliSize();

		this._createLargeImageVessel();

		this._createLiBg();

		var $largeImageVessel = this.$largeImageVessel;

        this.show(0);

		this.$list.children("li").hover(function(){

			var index = _that.$list.children("li").index($(this));

			_that.moveTo(index);	

		},function(){

			_that.$liBg.stop();

		})



			

	},

	_createLoading : function(){

		var loading = "<div class='yijs_imagesView_loading'></div>";

		this.$applyTo.append(loading);

	},

	_createList : function(){

		var list = "<div class='yijs_imagesView_list'></div>";

		this.$applyTo.append(list);

		this.$list = this.$applyTo.children('.yijs_imagesView_list');

		for(var i=0;i<this.images.length;i++){

			var li = "<li largeImageSrc='"+this.images[i].largeImageSrc+"' num='"+i+"'><div><img src='"+this.images[i].src+"' /></div><div><p>"+this.images[i].title+"</p><span>"+this.images[i].text+"</span></div></li>";

			this.$list.append(li);

		}

		this.length = this.images.length;

		this.listWidth = this.$list.width();

		this.listHeight = this.$list.height();

	},

	_createListMask : function(){

		var mask = "<div class='yijs_imagesView_mask' />";

		this.$applyTo.append(mask);

		this.$applyTo.children(".yijs_imagesView_mask").width(this.listWidth).height(this.listHeight+10);		

	},

	_createLargeImageVessel : function(){

		var largeImageVessel = "<div class='yijs_imagesView_largeImageVessel' />";

		this.$applyTo.append(largeImageVessel);

		this.$largeImageVessel = this.$applyTo.children('.yijs_imagesView_largeImageVessel');

		this.$largeImageVessel.width(this.$applyTo.width()).height(this.$applyTo.height());	

	},

	_createLiBg : function(){

		this.$applyTo.append("<div class='yijs_imagesView_li_bg'></div>");

		this.$liBg = this.$applyTo.children('.yijs_imagesView_li_bg');

		this.$liBg.width(this.$list.children("li").eq(0).width()).height(this.$applyTo.children(".yijs_imagesView_mask").height());		

	},

	show : function(index){

		this.$largeImageVessel.html("<div num='"+index+"' ><img src='"+this.images[index].largeImageSrc+"' /></div>");

		this._setLargeImageSize();		

	},	

	_setliSize : function(){

		this.$list.children("li").width(this.listWidth/this.length);

	},

	_setLargeImageSize : function(){

		this.$largeImageVessel.find("img").width(this.$largeImageVessel.width());

	},

	/**

	 * 滑动到指定索引位置

	 */

	moveTo : function(index){

		var _that = this;

		var $img = this.$list.children("li").eq(index);

		var _img = "<div num='"+$img.attr("num")+"'><img src='"+$img.attr("largeImageSrc")+"' /></div>";

		if(Number($img.attr('num')) != Number(this.$largeImageVessel.children("div").attr('num'))){

			left = $img.width() * index;

			_that.$liBg.stop().animate({"left":left},'slow','easeOutBounce',function(){

				var $div = _that.$largeImageVessel.children("div");

				$div.stop().fadeTo('fast',0.1,function(){

					_that.$largeImageVessel.html(_img);

					var $div = _that.$largeImageVessel.children("div");

					_that._setLargeImageSize();

					$div.fadeTo("slow", 1);

					

				});				

			});					



		}			

	},

	_addStyle : function(){

		var cls = this.options.cls;

		this.$applyTo.addClass('yijs_imagesView');

		this.$applyTo.width(this.options.width).height(this.options.height);

		this.options.style != null && this.$applyTo.css(this.options.style);

	},

	_setData : function(){

		var _that = this;

		this.$applyTo.find("img").each(function(){

			var _o = {};

			 _o.src = $(this).attr('src');

			 _o.largeImageSrc = $(this).attr('largeImageSrc');

			 _o.title = $(this).attr('title');

			 _o.text = $(this).attr('text');

			 _that.images.push(_o);

		})

	}

}

ImageSrc');
			 _o.title = $(this).attr('title');
			 _o.text = $(this).attr('text');
			 _that.images.push(_o);
		})
	}
}
