<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>多选文件上传 - yijs.File</title>
<script src="../yijs/jquery/jquery-1.3.1.min.js" type="text/javascript"></script>
<script src="../yijs/jquery/external/swfobject.js" type="text/javascript"></script>
<script src="../yijs/File.js" type="text/javascript"></script>
<script type="text/javascript">
$(document).ready(function() {
	var File = new yijs.File({applyTo : "#upload",
							 queueApplyTo : "#fileQueue",
							 multi : true,//开启多选
							 swf : '../yijs/File.swf',
							 btnBg : '../yijs/style/default/images/file_btn_browse_bg.png',
							 btnHoverBg : '../yijs/style/default/images/file_btn_browse_bg_hover.png',
							 allowedExt:     ";*.jpg; *.jpeg; *.gif; *.png",
							 allowedExtDesc: "Images(*.jpg; *.jpeg; *.gif; *.png)",
							 script         : 'scripts/upload.php',
							 checkScript : "scripts/check.php",
							 sizeLimit:500 //单位为KB
							 });
	File.render();
});
</script>
<link href="../yijs/style/default/file.css" rel="stylesheet" type="text/css" />
<link href="../yijs/style/default/basic.css" rel="stylesheet" type="text/css" />
<link href="demoStyle/demo.css" rel="stylesheet" type="text/css" />
</head>

<body>
<h2 class="demo_h2 bor-t-no">多选文件批量上传的示例</h2>
<div style="padding:6px;" id="upload_vessel">
   <input type="file" name="upload" id="upload" />
</div>
<p class="file_upload_caption">只允许上传*.jpg; *.jpeg; *.gif; *.png格式的图片，图片大小小于500KB</p>
<div id="fileQueue">
</div>
<h4 class="demo_h4">说明：</h4>
<div class="demo_attention">
  <p>multi : true，开启多选</p>	
  <p>render()：运行组件，必须调用的方法</p>	
  <p>详细的配置参数请查看说明文档</p>
  <p>演示中为了防止文件太多，造成服务器负担，upload.php中当文件大于6个时会自动删除文件。实际应用中请把删除文件的代码去掉。</p>
</div>
</body>
</html>