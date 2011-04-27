/**
 * GgSearch
 * @depends kissy.core
 * @extends KISSY.EventTarget
 * @fileOverview google ajax search
 * @author 明河共影
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.1
 * @date 2010-09-16
 * Copyright (c) 2010-2010 明河共影
 */
KISSY.add('ggSearch',function(S){
	var DOM = S.DOM, Event = S.Event;
	
	/**
	 * GgSearch
	 * @constructor
	 * @param {String} container 目标容器
	 * @param {Object} config    配置参数 
	 */
	function GgSearch(container,config){
		var self = this;
	    /**
	     * 配置参数
	     * @type Object
	     */
		self.config = S.merge(GgSearch.Config,config || {});
	    /**
	     * 组件的目标容器
	     * @type HTMLElement
	     */
	    self.container = S.one(container);
		/**
		 * 当前页数
		 */
		self._page = self.config.page; 
		self.PREVFIX_CALLBACK = 'jsonp';
		self._$resultsContainer = null;
		//搜索站点
		self._site = self.config.site;
		//关键字
		self._keyword = '';
		//是否到了最后一页
		self._last = false;
		self._width = 0;
		//初始化			
		self._init();	
	}
	/**
	 * google ajax search的api
	 */
	GgSearch.API = 'http://ajax.googleapis.com/ajax/services/search/';
	GgSearch.API_V = '1.0';
	GgSearch.CALLBACKS = {};
	GgSearch.hooks = {RESULTS:'ks-gg-search-results',PRELOAD:'ks-gg-search-preload'};
	GgSearch.tpl = {
		DEFAULT : {
			li      : '<li class="g"><h3><a href="{url}" target="_blank">{title}</a></h3>'+
								 '<div class="s"><p>{content}</p>'+
								                 '<span class="f"><a href="{url}" target="_blank">{shortUrl}</a></span> - '+
												 '<span class="gl"><a href="{cacheUrl}">网页快照</a></span>'+
								 '</div>'	+
				      '</li>',	
			preload : '<div class="ks-gg-search-preload"><img src="{preloadImgUrl}" /><p>正在加载数据中...</p></div>'	   
		}
	}
	GgSearch.Config = {
		/**结果集显示容器，重要参数*/
		resultsContainer : null,
		/**搜索站点*/
		site 	: '',
		/**搜索类型，可以是网页、图片、视屏、博客等，目前KISSY.GgSearchV1.0版就支持网页*/
		type 	: 'web',
		/**每页显示数*/
		perPage : 4,
		/**起始页，默认为0，即从第一页开始*/
		page    : 0,
		/**搜索框显示/隐藏动画时间*/
		duration : 0.5,
		/**预加载动画图片路径*/
		preloadImgUrl : 'http://www.36ria.com/demo/search/style/images/preload.gif',
		/**预加载动画显示动画时间*/
		preloadShowDuration : 1,
		/**预加载动画隐藏动画时间*/
		preloadHideDuration : 1,
		/**最长url长度*/
		urlMaxLen : 60,
		/**搜索结果显示模板*/
		tpl     : GgSearch.tpl.DEFAULT	 			  
	}
	//版本
	GgSearch.VERSION = 1.0;
	GgSearch.prototype = {
		/**
		 * 初始化
		 */
		_init : function(){
			var self = this, cfg = self.config;
			if(cfg.resultsContainer != null) self._$resultsContainer = S.one(cfg.resultsContainer);
			S.one('body').on('click',function(){
				self.hide();
			})
			self._$resultsContainer.on('click',function(e){
				e.stopPropagation();
			})
		},
		/**
		 * 显示预加载动画
		 */
		_showPreload : function(){
			var self = this, cfg = self.config,hooks = GgSearch.hooks,
			    preloadTpl = cfg.tpl.preload,html,preloadImgUrl = cfg.preloadImgUrl,
				duration = cfg.preloadShowDuration;
			var $rc = self._$resultsContainer,
			    $preload = $rc.children('.'+hooks.PRELOAD);
			if($rc){
				if($preload.length == 0){
					html = self.tpl({'preloadImgUrl':preloadImgUrl},preloadTpl);
					$rc.append(html);
					$preload = $rc.children('.'+hooks.PRELOAD);
					var marginLeft = -Math.floor($preload.width()/2+parseInt($preload.css('paddingLeft')));
					var marginTop = -Math.floor($preload.height()/2+parseInt($preload.css('paddingTop')));
					$preload.css({'marginLeft':marginLeft,'marginTop':marginTop});					
				}
				_show();
			}
			function _show(){
				$preload = $rc.children('.'+hooks.PRELOAD);
				var anim = new S.Anim('.'+hooks.PRELOAD,{opacity:'0.5'},duration);
				anim.run();
			}
		},
		/**
		 * 隐藏预加载动画
		 */
		_hidePreload : function(callback){
			var self = this, cfg = self.config,hooks = GgSearch.hooks,$rc = self._$resultsContainer,
			    $preload = $rc.children('.'+hooks.PRELOAD),duration = cfg.preloadHideDuration;		
			var timer = setTimeout(function(){
				var anim = new S.Anim('.'+hooks.PRELOAD,{opacity:'0'},duration);
				anim.run();
				if(callback) callback.call(self);
			},500);	
		},
		/**
		 * 显示搜索结果框
		 */
		show : function(){
			var self = this,duration = self.config.duration;
			S.one(self.config.resultsContainer).css({'visibility': 'visible','opacity': '0','width':'550'})
			S.one(self.config.resultsContainer).animate({opacity:'1'},duration);	
			return this;
		},
		/**
		 * 隐藏搜索结果框
		 */
		hide : function(){
			var self = this,duration = self.config.duration,$r = S.one(self.config.resultsContainer);
			if($r.css('visibility') == 'visible'){	
				$r.animate({opacity:'0'},duration,'easingNone',function(){
					$r.css({'visibility': 'hidden'});
				});			
			}
			return this;
		},
		/**
		 * 获取/设置搜索站点
		 * @param {String} s 站点域名，比如taobao.com
		 */
		site : function(s){
			var self = this;
			if(s && typeof s == 'string'){
				self._site = s;
			}
			return self._site;
		},
		/**
		 * 获取/设置关键字
		 * @param {String} k 关键字 
		 */
		keyword : function(k){
			var self = this;
			if(k && typeof k == 'string'){
				self._keyword = self.site() != '' && 'site:'+self.site() + '+'+ k || k;
			}
			return self._keyword;			
		},
		/**
		 * 获取/设置当前页
		 * @param {String} p 当前页 
		 */
		page : function(p){
			var self = this;
			if(p && typeof p == 'number'){
				self._page = p;
			}
			return self._page;
		},
		/**
		 * 搜索
		 * @param {Number} page 当前页
		 * @param {Number} perPage 每页显示数
		 */
		search : function(page,perPage){
			var self = this, cfg = self.config,s = self.container.val(),
			    rsz = perPage || cfg.perPage,p = page || 0,
				callbackName = self.callbackName(),
				start = rsz * p,q = self.keyword(s);	
			if(s != ''){
				var url = GgSearch.API+cfg.type+'?v='+GgSearch.API_V+'&callback=KISSY.GgSearch.CALLBACKS.'+callbackName;
				self._showPreload();
				KISSY.getScript(url+'&q='+q+'&rsz='+rsz+'&start='+start);
				self.page(p);
				
				if(self._$resultsContainer.css('visibility') == 'hidden'){
					self.show();
				}				
			}				
			return this;			
		},
		/**
		 * 下一页
		 */
		next : function(){
			var self = this,page = self.page();
			page ++;
			!self._last && self.search(page);
			
			return this;
		},
		/**
		 * 上一页
		 */
		prev : function(){
			var self = this,page = self.page();
			page --;
			page >= 0 && self.search(page);			
		},
		/**
		 * 获取回调函数名
		 */
		callbackName : function(){
			var self = this,prevfix = self.PREVFIX_CALLBACK,date = new Date(),timeStamp,fullCallbackName;
			timeStamp = Date.parse(date);
			fullCallbackName = prevfix + timeStamp;
			GgSearch.CALLBACKS[fullCallbackName] = function(data){
				self.callback.call(self,data);
			};
			return fullCallbackName;
		},
		/**
		 * 回调函数
		 * @param {Object} data json数据源
		 */
		callback : function(data){
			var self = this,cfg = self.config,resultData,results,cursor,title,url,content,cacheUrl,
			    hooks = GgSearch.hooks,
			    tpl='<ul class="'+hooks.RESULTS+'">',liTpl = cfg.tpl.li,
				shortUrl,urlMaxLen = cfg.urlMaxLen, 
					//接纳返回数据的容器
				$resultsContainer = S.one(cfg.resultsContainer),
				$results = $resultsContainer.children('.'+hooks.RESULTS);				
			if(data.responseStatus == 200 && cfg.resultsContainer != null){
				self._hidePreload(function(){
					$results.length == 0 && appendUl() || $results.fadeOut(0.5,function(){$results.remove() && appendUl()});				
				});
				
				function appendUl(){
						//数据				
						resultData = data.responseData;
						cursor = resultData.cursor;
						results = resultData.results;
						if(results.length > 0){
							for(var i = 0;i < results.length;i++){
								title      = results[i].title;
								url        = results[i].url;
								content    = results[i].content;
								cacheUrl   = results[i].cacheUrl;
								shortUrl = url.length > urlMaxLen && url.substring(0,urlMaxLen)+'...' || url;
								tpl += self.tpl({'title':title,'url':url,'content':content,'cacheUrl':cacheUrl,'shortUrl':shortUrl},liTpl);
							}
						}
						tpl += "</ul>";	
						$resultsContainer.append(tpl);
						$resultsContainer.children('.'+hooks.RESULTS).fadeIn(0.5);	
						
						if(results.length < cfg.perPage) self._last = true;							
				}
			}
		},
		/**
		 * 处理模板
		 * @param {Object} data 待处理的数据（无第二个参数时为模板字符串）
		 * @param {String} t 模板
		 */		
		tpl : function(data,t){
			var tpl = t;
			if(t && typeof t == "string" && typeof data == "object"){
					KISSY.each(data,function(v,k){
						var reg = new RegExp("{"+k+"}",'g');
						tpl = tpl.replace(reg,v);
					})			
			}
			return 	tpl;
		}
	}
	S.GgSearch = GgSearch;
})
