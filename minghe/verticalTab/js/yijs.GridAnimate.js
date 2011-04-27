/**
 * yijs.GridAnimate
 * @fileOverview gird式动画效果集
 * @author 明河共影
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.1
 * @date 2010-06-21
 * Copyright (c) 2010-2010 明河共影
 */
 //命名空间
var yijs = yijs || {};
yijs.GridAnimate = function(options){
	var _default = {
		applyTo : null,
		matrix : [5,5],
		delay : 50,
		speed : "normal",
		type  : "random"
	}
	var _opts = options || {};
	this.options   = $.extend({},_default,_opts);
	//起作用的对象
	this.$applyTo  = this.options.applyTo && $(this.options.applyTo) || null;
	this.$units = null;
	this.applyToWidth  = 0;
	this.applyToHeight = 0;
	this.matrix = this.options.matrix;
	this.unitSize = [];
	//当前所使用的效果
	this.type = this.options.type;
	//全部效果
	this.TYPES = ["up2down","down2up","left2right","right2left","leftTop2rightBottom","randomUnit"];
	
}
yijs.GridAnimate.prototype = {
	/**
	 * 运行
	 */
	render : function(){
		if (this.$applyTo != null && this.$applyTo.size() > 0) {
			this.applyToWidth  = this.$applyTo.width();
			this.applyToHeight = this.$applyTo.height();
			this.unitSize = this.getUnitSize();
			this.createGrid();
			this.$applyTo.hide();
			this.animate(this.type);
		}
	},
	/**
	 * 创建矩阵层
	 */
	createGrid : function(){
		var _that = this;
		var _$applyTo = this.$applyTo;
		var _matrix = this.matrix;
		var _unitSize = this.unitSize;
		var _total = _matrix[0] * _matrix[1];
		var _$c;
		for(var i = 0;i<_matrix[0];i++){
			var _t = i * _unitSize[1];
			for(var j = 0;j<_matrix[1];j++){
				var _l = j * _unitSize[0];
				_$c = _that.$applyTo.clone();
				var _c_t = _t == 0 && 0 || Number("-"+_t);
				var _c_l = _l == 0 && 0 || Number("-"+_l);
				_$c.css({"position":"absolute","top":_c_t,"left":_c_l,"display":"block"});
				_$wrap = $("<div />",{"class":"gird-unit"}).append(_$c).css({"position":"absolute","top":_t,"left":_l,"overflow":"hidden","width":_unitSize[0],"height":_unitSize[1]});
				_$applyTo.parent().append(_$wrap);
			}
			
		}
		this.$units = _$applyTo.parent().children(".gird-unit");
	},
	/**
	 * 获取一个方格的尺寸
	 */
	getUnitSize : function(){
		return [Math.floor(this.applyToWidth/this.matrix[0]),Math.floor(this.applyToHeight/this.matrix[1])];
	},
	animate : function(type){
		var _that = this;
		var _d = 0;
		var _delay = this.options.delay;
		var _$uints = this.$units;
		//速度
		var _speed = this.options.speed;
		//行
		var _row	= this.matrix[0];
		//列
		var _column = this.matrix[1];
		var _count  = _row * _column;
		switch(type){
				case "up2down" :
					_$uints.each(function(){
						_fadeOutUnit($(this),_d,_speed);
						
					})

				break;
				case "down2up" :
					for(var i = _$uints.size()-1;i>=0;i--){
						_fadeOutUnit(_$uints.eq(i),_d,_speed);
						_d += _delay;
					}
				break;
				case "left2right" :
					for(var i = 0;i< _column ;i++){
						_horizontalAnimate();
					}
				break;
				case "right2left" :
					for(var i = _column-1;i>=0 ;i--){
						_horizontalAnimate();
					}									
				break;
				case "leftTop2rightBottom" :
					var _r = 0;								
					for(var i = 0;i < _column + _row -1;i++){
						var n = 0;
						if(i < _column){
							if(i < _row){n = i}else{n = _row-1};
							for (var j = 0; j <= n; j++) {
								_fadeOutUnit(_$uints.eq(i + j * (_column - 1)), _d, _speed);
								_d += _delay;											
							}
						}else{
							n = _row - 1- _r ;
							for (var j = _r; j < n + _r; j++) {
								_fadeOutUnit(_$uints.eq(i + (_column - 1) + (_column - 1) * j ), _d, _speed);
								_d += _delay;											
							}
							_r ++;
						}
					}
															
				break;
				case "rightBottom2leftTop" :
					var _r = 3;								
					for(var i = _column + _row -1;i >=0 ;i--){
						var n = 0;
						if(i < _column){
							if(i < _row){n = i}else{n = _row-1};
							for (var j = 0; j <= n; j++) {
								_fadeOutUnit(_$uints.eq(i + j * (_column - 1)), _d, _speed);
								_d += _delay;											
							}
						}else{
							n = _row - 1- _r;
							for (var j = _r; j < n + _r; j++) {
								_fadeOutUnit(_$uints.eq(i + (_column - 1) + (_column - 1) * j ), _d, _speed);
								_d += _delay;											
							}
							_r --;
						}	
					}								
				break;
				case "randomUnit" :
					
					var _arr = [];
					for(var i=0;i<_count;i++){
						_arr.push(i);
					}
					//随机方格渐隐
					function _randomUnitAnimate(){
						var _index = Math.floor(Math.random()*(_arr.length-1));
						_fadeOutUnit(_$uints.eq(_arr[_index]),_d,_speed);
						_arr.splice(_index,1);
						_d += _delay;
						if(_arr.length > 0) _randomUnitAnimate(); 
					}	
					_randomUnitAnimate();								
				break;
				case "random" :
					var _typeIndex = Math.floor(Math.random() * _that.TYPES.length); 
					_that.animate(_that.TYPES[_typeIndex]);
				break;
			}
		
		//渐隐指定索引值的方格
		function _fadeOutUnit($obj,delay,speed){
			$obj.delay(delay).fadeOut(speed,function(){$(this).remove()});
		}
		
		//水平方式动画效果
		function _horizontalAnimate(){
					if(i % 2 == 0){
						for(var j = 0;j<_row;j++){
							_fadeOutUnit(_$uints.eq(i+j*_column),_d,_speed);
							_d += _delay;	
						}
					}else{
						for(var j = _row-1;j>=0;j--){
							_fadeOutUnit(_$uints.eq(i+j*_column),_d,_speed);
							_d += _delay;	

						}											
					}						
		}
		
	}
}