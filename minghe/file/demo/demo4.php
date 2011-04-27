<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>事件示例 - yijs.File</title>
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
							 script         : 'scripts/upload.php',
							 checkScript : "scripts/check.php",
							 listeners : {
								render : function(evt){
									var _msg = "组件运行完成！";
									addMsg(evt,_msg);
								}, 
							 	select : function(evt,id,oFile){
									var _msg = "你选择的文件是：" +oFile.name+"，"+"大小为："+File.setByteSize(oFile.size);
									addMsg(evt,_msg);
								},
								open : function(evt,id,oFile){
									var _msg = "即将上传的文件是：" +oFile.name+"，"+"大小为："+File.setByteSize(oFile.size);
									addMsg(evt,_msg);									
								},
								progress : function(evt,id,oFile,data){
									var _msg = "正在上传的文件是：" +oFile.name+"，"+"完成度为："+data.percentage+"%";
									addMsg(evt,_msg);										
								},
								complete : function(evt,id,oFile,data){
									var _msg = data.name+"上传完成，"+"文件路径："+data.filePath+"。";
									addMsg(evt,_msg);									
								},
								allComplete : function(evt,data){
									var _msg = "文件全部上传完成！上传了"+data.uploadSize+"个文件，总共大小为"+File.setByteSize(data.allBytesLoaded)+"。";
									addMsg(evt,_msg);	
								},
								fileExist : function(evt,name){
									var _msg = name+"已经存在！";
									addMsg(evt,_msg);									
								},
								cancel : function(evt,id,oFile,data){
									var _msg = oFile.name+"取消上传。";
									addMsg(evt,_msg);									
								}
							 },
							 sizeLimit:500 //单位为KB
							 });
	File.render();
	
	$("#clearDeugPanel").click(function(){
		$("#deugPanel").html("");
	})
	
});
function addMsg(evt,msg){
	$("#deugPanel").append("<p>事件名称："+evt.type+"，"+msg+"</p>");
	$("#deugPanel > p:odd").addClass("odd");
	$("#deugPanel > p:last").fadeIn("fast");	
	
}
</script>
<link href="../yijs/style/default/file.css" rel="stylesheet" type="text/css" />
<link href="../yijs/style/default/basic.css" rel="stylesheet" type="text/css" />
<link href="demoStyle/demo.css" rel="stylesheet" type="text/css" />
<style type="text/css">
#deugPanel{border:1px solid #999;margin-top:20px;width:600px;height:300px;overflow:scroll;font-size:12px;}
#deugPanel p{display:none;line-height:24px;padding:0px 10px;}
.odd{background-color:#EAF7FD;}
#clearDeugPanel{margin-top:10px;}
</style>
</head>

<body>
<h2 class="demo_h2 bor-t-no">自定义事件生成个调试面板的示例</h2>
<div style="padding:6px;" id="upload_vessel">
   <input type="file" name="upload" id="upload" />
</div>
<p class="file_upload_caption">只允许上传*.jpg; *.jpeg; *.gif; *.png格式的图片，图片大小小于500KB</p>
<div id="fileQueue">
</div>

<div id="deugPanel">
</div>
<input name="" type="button" id="clearDeugPanel" value="清除调试面板信息" />

<h4 class="demo_h4">说明：</h4>
<div class="demo_attention">	
  <p>progress事件在上传完成时还会触发一次</p>	
  <p>详细的配置参数请查看说明文档</p>
  <p>演示中为了防止文件太多，造成服务器负担，upload.php中当文件大于6个时会自动删除文件。实际应用中请把删除文件的代码去掉。</p>
</div>
</body>
</html>