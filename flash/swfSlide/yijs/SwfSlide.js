
var yijs = {};

yijs.SwfSlide = function(options){
	//组件的默认参数
	var defaults = {
		/** 是否自动运行组件（如果为false，请在实例化组件类后，调用render（）方法）*/
		autoRender : false,
		/** flash路径*/
		swf : null,
		/** 组件所起作用的对象*/
		applyTo : null,
		/** 图片数组*/
		images : null,
		/** flash和容器宽度*/
		width : 325,
		/** flash和容器高度*/
		height : 250,
		/** /按扭位置 1左 2右 3上 4下*/
		buttonPos : 4,
		/**图片切换速度*/
		speed : 3000,
		/** 是否显示标题*/
		showText : 0,
		/** 标题颜色*/
		txtcolor : "000000",
		/**背景色*/
		bgcolor : "DDDDDD",
		wmode : 'transparent',
		scriptAccess : 'sameDomain',
		expressInstall : null
	}; 
	//覆盖默认参数
	this.options = $.extend(defaults, options);
	this.cls = {
			swfSlide : "yijs_swfSlide"
	}
	this.$applyTo = null;
	this.images = this.options.images;
	this.aImag = new Array();
	this.aLink = new Array();
	this.aText = new Array();	
	this.pics = "";
	this.links = "";
	this.texts = "";
	this.length = 0;
	if(this.options.autoRender) this.render();		
}
yijs.SwfSlide.id = 0;
yijs.SwfSlide.prototype = {
	render : function(){
		var _that = this;
		var _opts = this.options;
		this.$applyTo = $(_opts.applyTo);
		if(_opts.applyTo != null && this.$applyTo.size() > 0){
			this._setStyle();
			if(_opts.images == null) this.setImages();
			this._setArrs();
			this._createSwf();
			yijs.SwfSlide.id ++;
		}	
    },
    setImages : function(){
    	var _that  = this;
    	this.images = [];
    	var $li = this.$applyTo.children("li");
    	this.length = $li.size();
    	this.$applyTo.children("li").each(function(){
    		var href = $(this).children("a").attr("href") || "";
    		var img = $(this).find("img").attr("src") || "";
    		var text = $(this).find("img").attr("title") || "";
    		_that.images.push([href,img,text]);
    	})
    	
    },
    /**
     * 创建一个flash对象
     */    
    _createSwf : function(){
    	if(swfobject){
    		var _opts = this.options;
    		var data = {};
    		$.each(_opts,function(key,value){
    			if(value != null) data[key] = value;
    		})
    		data.pic_height = _opts.height;
    		data.pic_width = _opts.width;
    		data.stop_time = _opts.speed;
    		data.show_text = _opts.showText;
    		data.button_pos = _opts.buttonPos;
    		data.pics = this.pics;
    		data.links = this.links;
    		data.texts = this.texts;
    		swfobject.embedSWF(_opts.swf,this.$applyTo.attr("id"), _opts.width, _opts.height, '9.0.24', _opts.expressInstall, data, {'quality':'high','wmode':_opts.wmode,'allowScriptAccess':_opts.scriptAccess});
    	}     	
    },
    _setArrs : function(){
    	var _that = this;
    	if(this.images.length > 0){
    		$.each(this.images,function(a){
    			a++;
    			_that.aImag[a] = _that.images[a-1][1];
    			_that.aLink[a] = _that.images[a-1][0];
    			_that.aText[a] = _that.images[a-1][3];
    		})
    		
    		for(var i=1; i<this.aImag.length; i++){
    			this.pics=this.pics+("|"+this.aImag[i]);
    			this.links=this.links+("|"+this.aLink[i]);
    			this.texts=this.texts+("|"+this.aText[i]);
    		}
    		this.pics=this.pics.substring(1);
    		this.links=this.links.substring(1);
    		this.texts=this.texts.substring(1);    		
    	}
    },
    _setStyle : function(){
    	var _opts = this.options;
    	this.$applyTo.width(_opts.width).height(_opts.height);
    	this.$applyTo.addClass(this.cls.swfSlide);
    }
}