<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>yijs.File - 文件上传组件</title>
<script src="../yijs/jquery/jquery-1.3.1.min.js" type="text/javascript"></script>
<link href="demoStyle/demo.css" rel="stylesheet" type="text/css" />
<link href="../yijs/style/default/basic.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
$(function(){
	var documentHeihgt = $(document).height();
	var documentWidth = $(document).width();
	var h = documentHeihgt - 100;
	var w = documentWidth - 240;
	$("#demo_left").height(h);
	$("#demo_iframe").height(h);
	$("#demo_right").width(w-20);
	$("#demo_iframe").width(w);
})
</script>
</head>

<body scroll="no" style="overflow:hidden;">
<div id="demo_header">
	<div id="demo_logo"><img src="demoStyle/images/logo.jpg"/></div>
</div>
<div id="demo_left" class="l">
	<h1 id="demo_component"><a href="index.php">yijs.File - 文件上传组件示例</a></h1>
    <ul id="demo_menu">
    	<li><a href="demo1.php" target="demo_iframe">基础配置下的示例</a></li>
        <li><a href="demo2.php" target="demo_iframe">带检查文件是否存在的示例</a></li>
        <li><a href="demo3.php" target="demo_iframe">多选文件批量上传的示例</a></li>
        <li><a href="demo4.php" target="demo_iframe">自定义事件生成个调试面板的示例</a></li>
        <li><a href="demo5.php" target="demo_iframe">自定义上传和取消的示例</a></li>
    </ul>
<h1 class="left_h1"><a href="../yijs.File0.1说明文档.docx">yijs.File0.1说明文档</a></h1>
<h1 class="left_h1"><a href="http://www.36ria.cn/demo/file.rar">yijs.File0.1下载</a></h1>       
</div>
<div id="demo_right" class="l" style="overflow:hidden;">
<iframe src="index_content.html" name="demo_iframe" id="demo_iframe" width="100%" height="500" frameborder="0" scrolling="yes" ></iframe>
</div>
<div class="clear"></div>
</body>
</html>