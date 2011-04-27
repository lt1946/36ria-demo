/**
 * $.seriesComboBoxs
 * @extends jquery.1.4.2
 * @fileOverview 创建一组联动选择框
 * @author 明河共影
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.2
 * @date 2010-07-14
 * Copyright (c) 2010-2010 明河共影
 * @example
 *    $.seriesComboBox({selects : ["#p","#c","#t"]});
 */
(function($){
	$.seriesComboBoxs = function(options){
		var opts;
		var DATA_NAME = "Obj";
		//返回API
		if(typeof options == 'string'){
			 if(options == 'api'){
			 	return $(this).data("api");
			 }
		}
		else{
			var options = options || {};
			//覆盖参数
			opts = $.extend(true, {}, $.seriesComboBoxs.defaults, options);
		}
		if(opts.selects){
			var _SeriesComboBoxs = new yijs.SeriesComboBoxs(opts);
			_SeriesComboBoxs.render();
			return _SeriesComboBoxs;
		}
					
	}
	var yijs = yijs || {};
	yijs.SeriesComboBoxs = function(options){
		//组件的默认参数
		var defaults = {
			/**起作用的对象*/
	        applyTo : null,
			style  : null,
			ajaxOptions : null
		}; 	
		//覆盖默认参数
		this.options = $.extend(defaults, options);	
		this.selects = this.options.selects;
		this.size = this.selects.length;
		this.ajaxOptions = this.options.ajaxOptions;
		this.dataType = this.ajaxOptions.dataType.toLowerCase();
		this.url = this.ajaxOptions.url;
		
		this.listeners = this.options.listeners;
		//缓存前缀
		this.cachePrefix = "data_";	
		//缓存，为一个对象字面量。
		this.cache = {};
		this.aSelectText = [];				
	}
	yijs.SeriesComboBoxs.prototype = {
		/**
		 * 运行
		 */
		render: function(){
			var _that = this;
			var _opts = this.options;
			if (this.selects.length > 0) {
				//加载默认数据，向第一个选择框填充数据
				this.load(_opts.defaultLoadSelectIndex,_opts.defaultParentId);	
				_that.listeners.render && _that.listeners.render.call(this,this.selects);
			}
		},
		/**
		 * 读取数据，并写入到选择框
		 * @param {Number} selectIndex 选择框数组的索引值
		 * @param {String} parent_id  父级id
		 */
		load : function(selectIndex,parent_id){
			var _that = this;
			var _ajaxOptions = this.ajaxOptions;
			var _d = _ajaxOptions.data;
			var _parentIdField = this.dataType == "json" && this.options.jsonField.parent_id || this.options.xmlField.parent_id;
			_d[_parentIdField] = parent_id;
			//传递给后台的参数
			_ajaxOptions.data = _d;
			//ajax获取数据成功后的回调函数
			_ajaxOptions.success = function(data){
				//遍历数据，获取html字符串
				var _h = _that._getOptionsHtml(data);
				_that._create(_h,selectIndex);
				_that.cache[parent_id] =  _h;
				//执行事件
				_that.listeners.afterLoad && _that.listeners.afterLoad.call(this,data,_h);
			} 
			$.ajax(_ajaxOptions);
		},
		/**
		 * 将数据源（json或xml）转成html
		 * @param {Object} data
		 */
		_getOptionsHtml : function(data){
			var _that = this;
			var _field = null;
			var _h = "";
			if(this.dataType == "json"){
				_field = this.options.jsonField;
				var aStr = [];
				$.each(data,function(i){
					var _id = data[i][_field.region_id];
					var _name = data[i][_field.region_name];
					var _option = "<option value='"+_id+"' class='SeriesComboBox_option'>"+_name+"</option>";
					aStr.push(_option);
				})
				_h = aStr.join("");
			}else if(this.dataType == "xml"){
				_field = this.options.xmlField;
				var $record = $(data).find(_field.record);
				if ($record.size() > 0) {
					var aStr = [];
					//遍历xml
					$record.each(function(){
						var _id = $(this).find(_field.region_id).text();
						var _name = $(this).find(_field.region_name).text();							
						var _option = "<option value='"+_id+"' class='SeriesComboBox_option'>"+_name+"</option>";
						aStr.push(_option);
					})	
					_h = aStr.join("");					
				}
			}
			return _h;
		},
		/**
		 * 向选择框添加html
		 * @param {String} _h html代码
		 * @param {Number} index 选择框的索引值
		 */
		_create : function(_h,index){
			var _that = this;
			this._removeOptions(index);
			$(_that.selects[index]).append(_h);
			_that._afterCreate(index);			
		},
		/**
		 * 创建选择框的列表完毕后
		 * @param {Number} index 选择框的索引值
		 */
		_afterCreate : function(index){
			var _that = this;
			$(_that.selects[index]).unbind("change")
								   .change(function(){
						if(index < _that.size-1){
							var _parentId = $(this).val();
							var _i = index+1;
							if(_parentId != ""){
								//存在缓存数据
								if(_that.cache[_parentId]){
									_that._create(_that.cache[_parentId],_i);
									for(var i = _i+1 ; i< _that.selects.length;i++){
										_that._removeOptions(i);
									}
								}else{
									_that.load(_i,_parentId);									
								}								
							}							
						}			   
						_that.aSelectText[index] = $(this).children(":selected").text();		
						//执行事件
						_that.listeners.optionClick && _that.listeners.optionClick.call(this,index,$(this),_that.selects);															   		
			});						
		},
		/**
		 * 删除options
		 */
		_removeOptions : function(index){
			$(this.selects[index]).children(".SeriesComboBox_option").remove();
		}
		
		
	}
	$.seriesComboBoxs.defaults = {
		/**选择框对象数组*/
        selects : null,
		/**ajax配置*/
		ajaxOptions : {
			url : null,
			type : 'get',
			data : {},
			dataType : 'json',
			success : function(){},
			beforeSend : function(){}				
		},
		/**默认父级id*/
		defaultParentId : 0,
		/**默认读取数据的选择框*/
		defaultLoadSelectIndex : 0,
		/**选择框的样式*/
		comboBoxStyle : null,
		/**选择框值改变时的回调函数*/
		change : function(){},
		jsonField : {
			region_id : "region_id",
			region_name : "region_name",
			parent_id : "parent_id"
		},
		xmlField : {
			record   : "record",
			region_id : "region_id",
			region_name : "region_name",
			parent_id : "parent_id"
		},
		listeners : {
			render : function(){},
			afterLoad : function(){},
			optionClick      : function(){}
		}
	
	} 
})(jQuery);