/**
 * $.seriesComboBoxs
 * @extends jquery.1.4.2
 * @fileOverview 创建一组联动选择框
 * @author 明河共影
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.11
 * @date 2010-05-27
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
			var ComboBoxs = [];
			$.each(opts.selects,function(i){
				var _seriesComboBox = new yijs.SeriesComboBox(opts);
				_seriesComboBox.$applyTo = $(opts.selects[i]);
				_seriesComboBox.render();
				ComboBoxs.push(_seriesComboBox);
			})
		}
					
	}
	var yijs = yijs || {};
	yijs.SeriesComboBox = function(options){
		//组件的默认参数
		var defaults = {
			/**起作用的对象*/
	        applyTo : null,
			style  : null,
			ajaxOptions : null
		}; 	
		//覆盖默认参数
		this.options = $.extend(defaults, options);	
		this.$applyTo = this.options.applyTo && $(this.options.applyTo) || null;
		this.dataType = this.options.ajaxOptions.dataType;			
	}
	yijs.SeriesComboBox.prototype = {
		/**
		 * 运行
		 */
		render: function(){
			var _that = this;
			if (this.$applyTo != null && this.$applyTo.size() > 0) {
				if(this.$applyTo.children().size() == 0){
					this.$applyTo.change(function(){
						_that.load();
					})
				}
			}
		},
		load : function(){
			var _that = this;
			var _ajaxOptions = this.options.ajaxOptions;
			_ajaxOptions.success = function(data){
				_that._create(data);
				//_that.options.ajaxOptions.success.call(this,data);
			} 
			$.ajax(_ajaxOptions);
		},
		_create : function(data){
			var _that = this;
			var _field = null;
			if(this.dataType == "json"){
				_field = this.options.jsonField;
				var aStr = [];
				$.each(data,function(i){
					var _id = data[i][_field.region_id];
					var _name = data[i][_field.region_name];
					var _option = "<option value='"+_id+"'>"+_name+"</option>";
					aStr.push(_option);
				})
				var _h = aStr.join("");
				_that.$applyTo.html(_h).data(parent_id,_h);
			}
		},
		_change : function(){
			
		}
		
	}
	$.seriesComboBoxs.defaults = {
		/**选择框对象数组*/
        selects : null,
		/**ajax配置*/
		ajaxOptions : {
			url : null,
			type : 'get',
			data : null,
			dataType : 'json',
			success : function(){},
			beforeSend : function(){}				
		},
		/**选择框的样式*/
		comboBoxStyle : null,
		/**选择框值改变时的回调函数*/
		change : function(){},
		jsonField : {
			region_id : "region_id",
			region_name : "region_name",
			parent_id : "parent_id"
		}
	
	} 
})(jQuery);