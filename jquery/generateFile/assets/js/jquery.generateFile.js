(function($){
	
	// 创建一个jquery插件
	
	$.generateFile = function(options){
		
		options = options || {};
		
		if(!options.script || !options.filename || !options.content){
			throw new Error("参数配置不合法!");
		}
		
		// 创建一个1*1的iframe
		
		var iframe = $('<iframe>',{
			width:1,
			height:1,
			frameborder:0,
			css:{
				display:'none'
			}
		}).appendTo('body');

		var formHTML = '<form action="" method="post">'+
			'<input type="hidden" name="filename" />'+
			'<input type="hidden" name="content" />'+
			'</form>';
		
		// 加个延迟的原因是：给IE一些创建DOM的时间
		
		setTimeout(function(){
		
			// iframe的document中的body元素
		
			var body = (iframe.prop('contentDocument') !== undefined) ?
							iframe.prop('contentDocument').body :
							iframe.prop('document').body;	// IE
			
			body = $(body);
			
			// 向iframe添加内容
			body.html(formHTML);
			
			var form = body.find('form');
			
			form.attr('action',options.script);
			form.find('input[name=filename]').val(options.filename);
			form.find('input[name=content]').val(options.content);
			
			//提交表单
			
			form.submit();
		},50);
	};
	
})(jQuery);