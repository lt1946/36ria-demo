/**
 * $.print_r
 * @extends jquery.1.4.2
 * @fileOverview 打印出json数据
 * @author jimpalmer (明河共影改)
 * @email mohaiguyan12@126.com
 * @site wwww.36ria.com
 * @version 0.1
 * @date 2010-05-21
 * Copyright (c) 2010-2010 明河共影
 * @example
 *    $("#debug").print_r(json);
 */
(function($){
	$.fn.print_r = function(json){
		return $(this).each(function(e){
			$(this).html(_print_r(json));
		})
	}
	function _print_r(theObj) {
		var retStr = '';
		if (typeof theObj == 'object') {
			retStr += '<div style="font-size:12px;">';
			for (var p in theObj) {
				if (typeof theObj[p] == 'object') {
					retStr += '<div><b>['+p+'] => ' + typeof(theObj) + '</b></div>';
					retStr += '<div style="padding-left:25px;">' + _print_r(theObj[p]) + '</div>';
				} else {
					retStr += '<div>['+p+'] => <b>' + theObj[p] + '</b></div>';
				}
			}
			retStr += '</div>';
		}
		return retStr;
	}	
	$.print_r = function(json){
		return _print_r(json);
	}
})(jQuery);
