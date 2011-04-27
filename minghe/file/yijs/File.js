/**
 * @class yijs.File
 * @fileOverview 文件上传组件
 * @author 谢文浩
 * @email mohaiguyan12@126.com
 * @version 0.1
 * @date 2009-12-20
 * Copyright (c) 2009-2010 谢文浩
 */

/**命名空间*/
var yijs = yijs || {};

/**
 * @constructor
 * @param {Object} options 参数
 */
yijs.File = function(options){
	//组件的默认参数
	var defaults = {
		/** 是否自动运行组件（如果为false，请在实例化组件类后，调用render（）方法）*/
		autoRender : false,
		/** 组件所应用的flash路径*/
		swf : null,
		wmode : 'transparent',
		scriptAccess : 'sameDomain',
		fileDataName : 'Filedata',
		expressInstall : null,
		/** 按钮背景图片路径*/
		btnBg : null,	
		/** 当鼠标经过时,按钮背景图片路径*/
		btnHoverBg : null,
		/** 是否隐藏按钮文字*/
		isHideBtnText : false,
		/** 组件所起作用的对象*/
		applyTo : null,
		/** 上传队列所起作用的对象*/
		queueApplyTo : null,
		/** 文件上传目录*/
		folder : 'uploads/',
		/** flash按钮宽度*/
		width : 91,
		/** flash按钮高度*/
		height : 38,
		/**是否选择完文件即自动上传*/
		auto : true,
		/** 是否允许多选上传*/
		multi : false,
		/** 文件大小限制*/
		sizeLimit : null,
		/** 一次性文件上传数目限制*/
		uploadLimit : 10,
		/** 文件上传队列数目限制*/
		queueSizeLimit : 100,
		/** 文件类型限制*/
		allowedExt : null,
		/** 文件描述*/
		allowedExtDesc : null,
		/** 上传完后ajax调用后台脚本路径*/
		script : null,
		/** 检测目录下是否已有该文件的脚本路径*/
		checkScript : null,
		/** ajax的传输类型*/
		method : 'post',
		/** 传输给后台的参数*/
		scriptData : null,
		/** 文件名长度限制（在队列容器中显示的文件名）*/
		fileNameMaxLen : 30,
		/** 选择文件按钮显示的文字*/
		btnBrowseText : yijs.File.lang.btnBrowse,
		/** 动画速度*/
		speed:"fast",
		/** 当文件上传完成时是否自动从队列容器中删除此文件信息*/
		isAutoClear:false,
		fnSetProgress : null,
		fnSetComplete : null,
		hoverAnimateSpeed : 50,
		/**事件监听*/
		listeners : {
			render : null,
			select : null,
			open : null,
			complete : null,
			allComplete : null,
			fileExist : null,
			cancel : null,
			error : null,
			progress : null,
			clearQueue : null
		}
	}; 
	//覆盖默认参数
	this.options = $.extend(defaults, options);	
	this.cls = {
			queue : "yijs_file_queue",
			queueItem : "yijs_file_queue_item",
			queueItemCancel : "yijs_file_queue_item_cancel",
			queueItemCancelHover : "yijs_file_queue_item_cancel_hover", 
			queueItemName : "yijs_file_queue_item_name",
			queueItemPercentage : "yijs_file_queue_item_percentage",
			queueItemProgress : "yijs_file_queue_item_progress",
			queueItemProgressBar : "yijs_file_queue_item_progressBar",
			queueItemError : "yijs_file_queue_item_error",
			queueItemStatus : "yijs_file_queue_item_status"
	}
	this.tpl = {
			queueItem : "<div class='"+this.cls.queueItem+"' id='(0)'>" +
							"<div class='"+this.cls.queueItemCancel+"'></div>" +
							"<div class='"+this.cls.queueItemName+"'>文件名：<span>(1)</span>&nbsp;&nbsp;&nbsp;大小：<span>(2)</span>" +
							"&nbsp;&nbsp;&nbsp;状态：<span class='"+this.cls.queueItemStatus+"'>(3)</span></div>" +
							"<div class='"+this.cls.queueItemProgress+"'>" +
								"<div class='"+this.cls.queueItemProgressBar+"'><span class='"+this.cls.queueItemPercentage+"'></span></div>" +
							"</div>" +
							"<div class='"+this.cls.queueItemError+"'></div>" +
						"</div>"
	}
	//事件监听
	this.listeners = this.options.listeners;
	//组件所起作用的对象
	this.$applyTo = null;
	this.$queue = null;
	this.$FileBtn = null;
	this.pagePath = null;
	this.errors = [];
	this.queue = [];
	this.queueSize = 0;
	this.swfId = null;
	if(this.options.autoRender) this.render();			
}

yijs.File.lang = {
	btnBrowse : '选择文件',
	btnUpload : '上传',
	complete : '完成',
	statusSelect : '待上传',
	statusComplete : '上传完成',
	statusUploading : '正在上传中',
	statusError : '上传出错',
	error : '发生错误',
	errorSizeLimit : "文件大小超过限制，上传失败！",
	check : '(0)已经存在，你想要上传重复的文件吗？',
	queueSizeLimit : '队列已满,上传文件数不可以超过(0)个'
}

yijs.File.prototype = {
	/**
	 * 运行
	 */			
	render : function(){
		var _that = this;
		var _opts = this.options;
		this.$applyTo = $(_opts.applyTo);
		if(_opts.applyTo != null && this.$applyTo.size() > 0){
			this.options.id = this.$applyTo.attr("id");
			this.$applyTo.hide() && this.$applyTo.after('<div id="' + this.options.id + '_file"></div>');
			this.$FileBtn = this.$applyTo.next("#"+ this.options.id + '_file');
			this.pagePath = this.getPagePath();
			this.folderPath = this.getFolderPath();
			this._create();
			this.$applyTo.bind("select",function(event,id,oFile){
				_that._select(event,id,oFile);
			}).bind("open",function(event,id,oFile){
				if(_that.listeners.open) _that.listeners.open.call(this,event,id,oFile);
			}).bind("progress",function(event,id,oFile,data){
				_that._progress(event,id,oFile,data);
			}).bind("complete",function(event,id,oFile,data){
				_that._complete(event,id,oFile,data);
			}).bind("addError",function(event,id,oFile,data){
				_that._addError(event,id,oFile,data);
			}).bind("allComplete",function(event,data){
				_that._allComplete(data);
			}).bind("cancel",function(event,id,oFile,data){
				_that._cancel(event,id,oFile,data);
			}).bind("check",function(event,oFileName,single){
				_that._check(event,oFileName,single);
			}).bind("queueFull",function(event,limit){
				_that._queueFull(event,limit);
			}).bind("clear",function(){
				if(_that.listeners.clearQueue) _that.listeners.clearQueue.call(this);
			})				
		}
		var _renderEvent = {type:"render"};
		if(this.listeners.render) this.listeners.render.call(this,_renderEvent);
    },
    /**
     * 获取该页面的路径
     */
    getPagePath : function(){
		var pagePath = location.pathname;
		pagePath = pagePath.split('/');
		pagePath.pop();
		pagePath = pagePath.join('/') + '/';
		return pagePath;
    },
    /**
     * 获取目录实际路径
     */
    getFolderPath : function(){
    	return this.pagePath + this.options.folder;
    },
    /**
     * 获取索引值
     * @param {String}  id  文件id
     */
    getIndex : function(id){
	   var index;
	   for(var i = 0;i<this.queue.length;i++){
	   		if(this.queue[i] == id) index = i; 
	   }
	   return index;    	
    },
    /**
     * 删除指定ID的队列文件元素
     * @param {String}  id  文件id
     */    
    removeQueueItem : function(id){
    	var _that = this;
    	var $queueItem = this.$queue.children("#"+id);
    	$queueItem.fadeOut(this.options.speed,function(){
    		$(this).remove();
    		_that.queueSize --;
    		if(_that.queueSize == 0) _that.$queue.hide();
    		
    	})
    },
    /**
     * 取消文件上传(触发flash对象的回调函数)
     * @param {String}  id  文件id
     */     
    cancel : function(idOrIndex){
    	var id = "";
    	if(idOrIndex){
    		if(typeof idOrIndex == "string"){
    			id = idOrIndex;
    		}else if(typeof idOrIndex == "number"){
    			id = this.queue[idOrIndex];
    		}
    		document.getElementById(this.options.id + '_file').cancelFileUpload(id,true);
    	}else{
    		if(this.queue.length > 0){
    			document.getElementById(this.options.id + '_file').clearQueue();
    			/*
    			for(var i = this.queue.length - 1 ; i >= 0 ;i--){
    				this.removeQueueItem(this.queue[i]);
    			}
    			*/
    		}
    	}
    	
    },
    /**
     * 开始上传文件(触发flash对象的回调函数)
     */
    startFileUpload : function(id,checkComplete){
    	var id = id || null;
    	var checkComplete = checkComplete || true;
    	document.getElementById(this.options.id + '_file').startFileUpload(id,checkComplete);
    	return true;
    },
    /**
     * 清理队列，并将未上传完成的文件取消上传
     */
    clearQueue : function(){
    	var _that = this;
    	var $queueItem = this.$queue.children("."+this.cls.queueItem);
    	if($queueItem.size() > 0){
    		$queueItem.each(function(){
    			var id = $(this).attr("id");
    			_that.removeQueueItem(id);
    		})
    		document.getElementById(this.options.id + '_file').clearQueue();
    	}
    	return true;
    },
    setOption : function(option,value){
    	
    },
    /**
     * 创建组件
     */
    _create : function(){
    	var _opts = this.options;
    	this._createSwf();
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
    		data.pagePath = this.pagePath;
    		swfobject.embedSWF(_opts.swf,_opts.id + '_file', _opts.width, _opts.height, '9.0.24', _opts.expressInstall, data, {'quality':'high','wmode':_opts.wmode,'allowScriptAccess':_opts.scriptAccess});      		
    		this.swfId = document.getElementById(this.options.id + '_file');
    	} 	
    },
    /**
     * 当选择文件时触发的方法
     * @param {Object} event
     * @param {String}  id  文件id
     * @param {Object} oFile 文件对象
     */
    _select : function(event,id,oFile){
    	var _that = this;
    	var _opts = this.options;
    	//给队列容器添加样式
    	if(_opts.queueApplyTo != null) $(_opts.queueApplyTo).addClass(this.cls.queue);
    	var byteSize = this.setByteSize(oFile.size);
    	var fileName = this._setFileName(oFile.name);
    	var html = yijs.setTpl(this.tpl.queueItem,[id,fileName,byteSize,yijs.File.lang.statusSelect]);
    	this.$queue = $(_opts.queueApplyTo);
    	this.$queue.show().append(html);
    	this.queue.push(id);
    	this.$queue.children("."+this.cls.queueItem+":last").fadeIn(this.options.speed,function(){
    		var $cancel = $(this).find("."+_that.cls.queueItemCancel);
    		$cancel.hover(function(){$(this).addClass(_that.cls.queueItemCancelHover)},function(){$(this).removeClass(_that.cls.queueItemCancelHover)})
    		$cancel.click(function(){
    			var $parent = $(this).parent("."+_that.cls.queueItem);
    			_that.cancel($parent.attr("id"));
                
    			var event = {type:"cancel"};
    			var oFile = {"name":$parent.data("name"),"size":$parent.data("size")};
    			if(_that.listeners.cancel) _that.listeners.cancel.call(this,event,$parent.attr("id"),oFile);
    		})
    	}).data("name",oFile.name).data("size",oFile.size);	
    	this.queueSize = this.$queue.children("."+this.cls.queueItem).size();
    	if(this.listeners.select) this.listeners.select.call(this,event,id,oFile);
    },
    /**
     * 文件正在上传中触发的方法
     * @param {Object} event
     * @param {String}  id  文件id
     * @param {Object} oFile 文件对象
     * @param {Object} data 可供处理的数据
     */    
    _progress : function(event,id,oFile,data){
    	var $queueItem = $("#"+id);
    	$queueItem.find("."+this.cls.queueItemProgressBar).animate({'width':data.percentage + '%'},this.options.speed);
    	$queueItem.find("."+this.cls.queueItemPercentage).text(data.percentage+ '%');
    	$queueItem.find("."+this.cls.queueItemStatus).text(yijs.File.lang.statusUploading);
    	if(this.listeners.progress) this.listeners.progress.call(this,event,id,oFile,data);
    },
    /**
     * 文件上传完成时触发的方法
     * @param {Object} event
     * @param {String}  id  文件id
     * @param {Object} oFile 文件对象
     * @param {Object} data 可供处理的数据
     */    
    _complete : function(event,id,oFile,data){
        var $queueItem = this.$queue.children("#"+id);
        var index = this.getIndex(id);
        this.queue.splice(index,1);
        if(this.options.isAutoClear == true){	
        	this.removeQueueItem(id);    		
    	}
        $queueItem.find("."+this.cls.queueItemStatus).text(yijs.File.lang.statusComplete);
    	if(this.listeners.complete) this.listeners.complete.call(this,event,id,oFile,data);
    },
    /**
     * 处于队列中的文件全部上传完毕，触发的事件
     */
    _allComplete : function(data){
    	this.errors = [];
    	var evt = {type:"allComplete"};
    	if(this.listeners.allComplete) this.listeners.allComplete.call(this,evt,data);
    },
    /**
     * 文件取消上传时触发的方法
     * @param {Object} event
     * @param {String}  id  文件id
     * @param {Object} oFile 文件对象
     * @param {Object} data 可供处理的数据
     */     
    _cancel : function(event,id,oFile,data){
    	this.removeQueueItem(id);
    },
    /**
     * 检查文件是否存在时触发的方法
     * @param {Object} event
     * @param {Object} oFileName 文件名对象
     * @param {Boolean} single 是否只有一个文件
     */      
    _check : function(event,oFileName,single){
    	var _that = this;
    	var data = oFileName;
    	var singleId;
    	data.folder = this.pagePath + this.options.folder;
		if (single) {
			for (var id in oFileName) {
				singleId = Id;
			}
		}
    	//ajax验证文件是否存在
    	$.post(this.options.checkScript,data,function(jsonData){
    		for(var k in jsonData){
    			var msg = yijs.setTpl(yijs.File.lang.check,[jsonData[k]]);
        		var cf = confirm(msg);
        		if(!cf){
        			//取消文件上传
        			_that.cancel(k);
        		} 
        		var event = {"type":"fileExist"};
        		if(_that.listeners.fileExist) _that.listeners.fileExist.call(this,event,jsonData[k]);
    		}
    		single == true && _that.startFileUpload(singleId, true) || _that.startFileUpload(null, true);
    	},"json")
    },
    /**
     * 有错误发生时触发的方法
     * @param {Object} event
     * @param {String}  id  文件id
     * @param {Object} oFile 文件对象
     * @param {Object} oError 可供处理的数据
     */      
    _addError : function(event,id,oFile,oError){
    	var _arr = [id,oFile,oError];
    	this.errors.push(_arr);
    	var $queueItem = this.$queue.children("#"+id);
    	var $error = $queueItem.find("."+this.cls.queueItemError);
    	switch(oError.type){
    		case "sizeLimit" : $error.text(yijs.File.lang.errorSizeLimit);break;
    		default : $error.text(oError.type+yijs.File.lang.error);
    	}
    },
    /**
     * 当上传的文件超过队列允许的大小时触发的方法
     * @param {Object} event
     * @param {Number}  limit  文件id
     */     
    _queueFull : function(event,limit){
    	var msg = yijs.setTpl(yijs.File.lang.queueSizeLimit,[limit]);
    	alert(msg);
    },
    /**
     * 设置文件大小字节数
     * @param {Number} size 文件大小字节数
     * @return {String} 文件大小
     */
    setByteSize : function(size){
		var byteSize = Math.round(size / 1024 * 100) * .01;
		var suffix = 'KB';
		if (byteSize > 1000) {
			byteSize = Math.round(byteSize *.001 * 100) * .01;
			suffix = 'MB';
		}
		var sizeParts = byteSize.toString().split('.');
		if (sizeParts.length > 1) {
			byteSize = sizeParts[0] + '.' + sizeParts[1].substr(0,2);
		} else {
			byteSize = sizeParts[0];
		} 
		return byteSize+ suffix;
    },
    /**
     * 设置文件名
     * @param {String} name 文件名
     * @return {String} 处理后的文件名
     */
    _setFileName : function(name){
    	return name.length > this.options.fileNameMaxLen && name.substr(0,20) + '...' || name;
    }
    
}

yijs.setTpl = function(tpl,arr){
	if(tpl && arr){
		$.each(arr,function(i){
			var n = "("+i+")";
			tpl = tpl.replace(n,arr[i]);
		})
		
	}
	return tpl;
}