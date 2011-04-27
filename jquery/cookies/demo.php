<?php

// 浏览页面次数

$visited = (int)$_COOKIE['pageVisits'] + 1;

setcookie(	'pageVisits',				// cookie名
		  	$visited,					// cookie值
			time()+7*24*60*60			// 过期时间
          );	

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>使用jquery+php获取和设置Cookies</title>

<link rel="stylesheet" type="text/css" href="styles.css" />

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
<script type="text/javascript" src="jquery.cookie.js"></script>
<script type="text/javascript">

$(document).ready(function(){
	
	var cookie = $.cookie('demoCookie');
	
	if(cookie) $('.jq-text').text(cookie).show();
	
						   
	$('.fields a').click(function(e){
		var text = $('#inputBox').val();
		
		// 设置cookie的值
		$.cookie('demoCookie',text,{expires: 7});
		
		$('.jq-text').text(text).slideDown('slow');
		
		e.preventDefault();
	});
	
	$('#form1').submit(function(e){ e.preventDefault(); })
})

</script>

</head>

<body>
<h1>使用jquery+php获取和设置Cookies</h1>
<h2>返回<a href=" http://www.36ria.com/1813">文章</a></h2>

<div class="section">
	<div class="counter"><?php echo $visited?></div>
    <p>你访问此页面的次数</p>
</div>


<div class="section">
	
    <div class="jq-text"></div>

	<form action="" method="get" id="form1">
    	<div class="fields">
	        <input type="text" id="inputBox" />
            <a href="">保存</a>
        </div>
    </form>
    <p>你可以在输入框输入任意值，当你重新打开页面时，值依旧存在。</p>
</div>

</body>
</html>
