<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>yijs.File - 文件上传组件</title>
<script src="../yijs/jquery/jquery-1.3.1.min.js" type="text/javascript"></script>
<script src="../yijs/jquery/external/swfobject.js" type="text/javascript"></script>
<script src="../yijs/File.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function() {
	var File = new yijs.File({applyTo : "#upload",
							 queueApplyTo : "#fileQueue",
							 swf : '../yijs/File.swf',
							 btnBg : '../yijs/style/default/images/file_btn_browse_bg.png',
							 btnHoverBg : '../yijs/style/default/images/file_btn_browse_bg_hover.png',
							 allowedExt:     ";*.jpg; *.jpeg; *.gif; *.png",
							 allowedExtDesc: "Images(*.jpg; *.jpeg; *.gif; *.png)",
							 script         : 'scripts/upload.php',
							 sizeLimit:500,
							 multi : true,
							 auto:false,
							 listeners : {
								 //当选择完文件后触发
								 select : function(){
								 	//给按钮添加可用时的样式
									$(".file_btn").addClass("file_btn_enable");
									//给取消上传按钮绑定单击事件
									$(".file_cancel_upload").bind("click",function(){
										//取消文件上传
										File.cancel();	
									})
									//给开始上传按钮绑定单击事件
									$(".file_start_upload").click(function(){
										//开始上传文件
										File.startFileUpload();
									})	
									//给清理队列按钮绑定单击事件
									$(".file_clear_queue").click(function(){
										//清理队列
										File.clearQueue();
									})																		
									$(".file_btn").bind("mouseover",function(){
										$(this).addClass("file_btn_hover");
									}).bind("mouseout",function(){
										$(this).removeClass("file_btn_hover");
									})									
								 },
								//当开始上传一个文件后触发
								 open : function(){
									 removeBtnHover(".file_start_upload");
									 //取消开始上传按钮的事件
									 clearEvent(".file_start_upload");
								 },
								 //队列中的文件全部上传完成后触发
								 allComplete : function(){
									 $(".file_cancel_upload,.file_start_upload").removeClass("file_btn_enable");
									//取消取消上传按钮的事件
									 clearEvent(".file_cancel_upload");
									 removeBtnHover(".file_cancel_upload");
								 },
								 //当清理完队列后触发
								 clearQueue : function(){
									 $(".file_clear_queue").removeClass("file_btn_enable");
									 clearEvent(".file_clear_queue");
									 removeBtnHover(".file_clear_queue");
								 }
						     }
							 });
	//开始运行组件 
	File.render();

	//清除事件
	function clearEvent(applyTo){
		$(applyTo).unbind("click").unbind("mouseover").unbind("mouseout");
	}
	//删除file_btn_hover样式
	function removeBtnHover(applyTo){
		 $(applyTo).hasClass("file_btn_hover") && $(applyTo).removeClass("file_btn_hover");
	}
});
</script>
<link href="../yijs/style/default/file.css" rel="stylesheet" type="text/css" />
<link href="../yijs/style/default/basic.css" rel="stylesheet" type="text/css" />
<link href="demoStyle/demo.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.file_left_label{margin-top:16px;}

#fileQueue{margin:10px;}
</style>
</head>

<body>
<h2 class="demo_h2 bor-t-no">自定义上传、取消、清理队列的示例</h2>
<div style="padding:6px;">
    <label class="file_left_label l">图片上传：</label>
    <div class="l"  id="upload_vessel">
       <input type="file" name="upload" id="upload" />
    </div>
    <div class="file_btn file_cancel_upload l">取消上传</div>
    <div class="clear"></div>
</div>

<p class="file_upload_caption">只允许上传*.jpg; *.jpeg; *.gif; *.png格式的图片，图片大小小于500KB</p>
<div id="fileQueue"></div>
<div class="file_btn file_start_upload l">开始上传</div>
<div class="file_btn file_clear_queue l">清理队列</div>
<div class="clear"></div>
<h4 class="demo_h4">说明：</h4>
<div class="demo_attention">
  <p>auto:false，选择完文件不自动上传。  </p>
  <p>multi : true，开启多选。  </p>
  <p>cancel()，取消文件上传（参数为空，则为取消队列未上传文件的上传。此函数接受的参数既可以是id也可以是队列索引）。  </p>
  <p>监听select,open,allComplete,clearQueue事件</p>
  <p>startFileUpload()，开始上传文件（参数为空，上传队列中的所有文件。接受二个参数，第一个参数指定上传id，第二个参数为是否对文件存在性进行检查）。  </p>
  <p>详细的配置参数请查看说明文档</p>
</div>

</body>
</html>