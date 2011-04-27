/**
 * $.shareList
 * @extends jquery.1.4.2
 * @fileOverview 创建一个分享按钮列表
 * @author 明河共影
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.11
 * @date 2010-05-17
 * Copyright (c) 2010-2010 明河共影
 * @example
 *    $(".share-list").shareList();
 */
(function($){
	$.fn.shareList = function(options){
		var opts;
		var DATA_NAME = "shareList";
		//返回API
		if(typeof options == 'string'){
			 if(options == 'api'){
			 	return $(this).data(DATA_NAME).interfaces[$(this).data(DATA_NAME).current];
			 }else if(options == 'interfaces'){
			 	return $(this).data(DATA_NAME).interfaces;
			 }
		}
		else{
			var options = options || {};
			//覆盖参数
			opts = $.extend(true, {}, $.fn.shareList.defaults, options);
		}
		
		return $(this).each(function(){
			//调用方法
			if(typeof options == 'string'){
				
			}
			//创建
			else{
				var _shareList = new yijs.ShareList(opts);
				_shareList.$applyTo = $(this);
				_shareList.render();
				$(this).data(DATA_NAME,_shareList);
			}
		})
	}
	var yijs = yijs || {};
	yijs.ShareList = function(options){
		this.options = $.extend($.fn.shareList.defaults,options);
		this.effect = this.options.effect;
		//组件所起作用的对象
		this.$applyTo = options.applyTo && $(options.applyTo) || null;
		this.$li = null;
		this.width = 0;
		this.liWidth = 0;
		this.tpl = this.options.tpl;
		this.getListAjaxOptions = this.options.getListAjaxOptions;
		this.pageUrl = encodeURIComponent(window.location.href);
		this.pageTitle = encodeURIComponent(document.title.substring(0,76));
	}
	yijs.ShareList.prototype = {
		/**
		 * 运行
		 */
		render : function(){
			var _that = this;
			if(this.$applyTo != null && this.$applyTo.size() > 0){

				$.ajax({
					url : this.getListAjaxOptions.url,
					type : this.getListAjaxOptions.type,
					dataType : this.getListAjaxOptions.dataType,
					success : function(data){
						_that.getListAjaxOptions.success && _that.getListAjaxOptions.success.call(this,data);
						_that._createList(data);
						_that.$li = _that.$applyTo.children("li");
						_that._addStyle();
						_that._addShadow();
						DD_belatedPNG.fix('.share-list-icon');
						_that._setUlWidth();
						_that._followMouseScroll();
						//鼠标滑过li
						_that.$li.hover(function(){
							var index = $(this).index();
							_that.iconToTop(index);
						},function(){
							var index = $(this).index();
							_that.iconTopDefault(index);					
						})					
					}
				});
			}
		},
		/**
		 * 创建分享按钮列表
		 * @param {Object} data json数据源
		 */
		_createList : function(data){
				var _that = this;
				var _li;
				var _list = _that.options.shareSites;
				var _ali = []; 
				$.each(_list,function(a){
					$.each(data,function(i){
						if(data[i].name == _list[a]){
							_li = _that.tpl.TFtpl(data[i]);
							_li = _li.TFtpl({url:_that.pageUrl,title:_that.pageTitle});
							_ali.push(_li);
						} ;
					})							
				})
				_that.$applyTo.html(_ali.join(""));			
		},
		/**
		 * 添加样式
		 */
		_addStyle : function(){
			var _cls = this.options.cls;
			this.$applyTo.addClass(_cls.shareList);
		},
		/**
		 * 给每个图标下加个阴影图片
		 */
		_addShadow : function(){
			var _opt = this.options;
			_opt.showShadow && $("<img />",{"class":_opt.cls.iconShadow,"src":_opt.shadowSrc}).appendTo(this.$li);
		},
		/**
		 * 设置列表宽度
		 */
		_setUlWidth : function(){
			var _$liFirst = this.$li.eq(0);
			this.liWidth = _$liFirst.width()+parseInt(_$liFirst.css("marginLeft"))+parseInt(_$liFirst.css("marginRight"));
			this.$applyTo.width(this.liWidth * this.$li.size());
			this.width = this.$applyTo.width();
		},
		/**
		 * 列表随鼠标滚动
		 */
		_followMouseScroll : function(){
			var _that = this;
			var _opts = this.options;
			var _parentWidth = this.$applyTo.parent().width();
			var _totScroll = this.width-_parentWidth;
			if(this.width > _parentWidth){
				this.$applyTo.mousemove(function(e){
					if(_opts.allowSroll){
						var _pageX = e.pageX;
						var _pos = _that.$applyTo.offset();
						_that.$applyTo.css({marginLeft:'-'+_totScroll*(Math.max(_pageX-_pos.left,0)/_that.width)+'px'});	
					}
				})
				this.$applyTo.mouseleave(function(e){
					if(!jQuery.browser.msie || jQuery.browser.version != "7.0"){
						var _marginLeft = Math.abs(Math.floor(parseInt(_that.$applyTo.css("marginLeft"))));
						var _is = _marginLeft % _that.liWidth;
						if (_is != 0) {
							var _d = Math.floor(_marginLeft / _that.liWidth);
							_that.$applyTo.animate({"marginLeft": "-"+_d * _that.liWidth},"fast")
						}						
					}
					
				})
			}
			
		},
		/**
		 * 鼠标滑过时图标向上移动，阴影发生变化
		 */
		iconToTop : function(index){
			var _that = this;
			var _lihoverEffect = _that.effect.liHover;
			var _speed = this.options.speed;
			var _$currentLi = this.$li.eq(index);
			var _icon_cls = this.options.cls.icon;

			if(_$currentLi.size() > 0){
				_$currentLi.children("."+_icon_cls).stop().animate(_lihoverEffect.icon,_speed,function() {
					$(this).animate(_lihoverEffect.iconBack,_speed);
				});
				//改变阴影大小和透明度
				this.options.showShadow && _$currentLi.children("img."+this.options.cls.iconShadow).stop().animate(_lihoverEffect.shadow,_speed);				
			}			
		},
		/**
		 * 鼠标离开时图标复位，阴影复位
		 */
		iconTopDefault : function(index){
			var _that = this;
			var _liMouseoutEffect = _that.effect.liMouseout;
			var _speed = this.options.speed;
			var _$currentLi = this.$li.eq(index);
			var _icon_cls = this.options.cls.icon;
			if (_$currentLi.size() > 0) {
				_$currentLi.children("."+_icon_cls).stop().animate(_liMouseoutEffect.icon, _speed, function() {
					$(this).animate(_liMouseoutEffect.iconBack, _speed);
				});
				//复位阴影大小和透明度
				this.options.showShadow && _$currentLi.children("img."+this.options.cls.iconShadow).stop().animate(_liMouseoutEffect.shadow, _speed);			
				}			
		}			
		
	}
	//接口数组
	$.fn.shareList.interfaces = [];
	//样式
	$.fn.shareList.classes = {
		defaults : {
				shareList   : "share-list",
				shareListLi : "share-list-li",
				icon        : "share-list-icon",
				iconShadow  : "share-list-icon-shadow"
		}
	}
	$.fn.shareList.tpl = {
		defaults : '<li class="l share-list-li">'+
                       '<a href="{href}" name="{name}" class="share-list-icon icon-{name}" target="_blank"></a>'+
					   '<a href="{href}" class="share-list-text">{localName}</a>'+
                   '</li> '
	}		
	//默认参数
	$.fn.shareList.defaults = {
				/**想要显示的按钮列表*/
				shareSites : ["9dian","sinaminiblog","renren","zhuaxia","xianguo","greader","qqshuqian",
				              "douban","twitter","favorite","kaixin001","baiducang","gbuzz","digu","zuosa",
							  "renjian","sohubai","friendfeed","facebook"],
				/**ajax配置*/			  
				getListAjaxOptions : {
					type: "GET",
					url : "js/shareListData.js",
					dataType : "json"
				},
				/**是否允许列表随鼠标滚动*/
				allowSroll   : true,
				/**是否显示阴影*/
				showShadow	 : false,
				/**阴影图片路径*/
				shadowSrc	 : "style/images/icon-shadow.png",
				/**动画速度*/
				speed        : 250,	
				/**样式*/
				style : null,
				/**动画效果设置*/			
				effect       : {
					/**鼠标滑过li时的动画*/	
					liHover : {
						icon 	 : {marginTop: "-10px"},
						iconBack : {marginTop: "-6px"}, 
						shadow   : { width: "65%", height: "10px", marginLeft: "8px", opacity: 0.25 }						
					},
					/**鼠标离开li时的动画*/	
					liMouseout : {
						icon     : {marginTop: "4px"},
						iconBack : { marginTop: "0px" },
						shadow   : { width: "100%", height: "21px", marginLeft: "0", opacity: 1 }
					}
				},
				/**样式名集合*/ 	
				cls          : $.fn.shareList.classes.defaults,
				/**模板*/
				tpl          : $.fn.shareList.tpl.defaults
				
	};	
})(jQuery);

//简单的转换模板函数
String.prototype.TFtpl = function(o){   
    return this.replace(/{([^{}]*)}/g,   
            function (a,b){   
                var r = o[b];   
                return typeof r==='string'?r:a;   
            }   
    );   
       
}; 
