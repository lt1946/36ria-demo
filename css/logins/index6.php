<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login 1</title>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
<script type="text/javascript">

$(document).ready(function() {
				   
		$('.login_button').click( function () {
			
			$('.login_box').slideToggle(200);
			
		});
				   
});
</script>
<style type="text/css">
.input {
	padding: 9px;
	border: solid 1px #E5E5E5;
	outline: 0;
	width: 200px;
	background: #ffffff; /* old browsers */
	background: -moz-linear-gradient(top, #ffffff 0%, #f1f1f1 50%, #e1e1e1 51%, #f6f6f6 100%); /* firefox */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ffffff), color-stop(50%, #f1f1f1), color-stop(51%, #e1e1e1), color-stop(100%, #f6f6f6)); /* webkit */
 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f6f6f6', GradientType=0 ); /* ie */
	margin-left: 5px;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
}
.input:hover, .input:focus {
	border-color: #C9C9C9;
	-webkit-box-shadow: rgba(238, 238, 238, 0.4) 0px 0px 8px;
	-moz-box-shadow: rgba(238, 238, 238, 0.4) 0px 0px 8px;
	box-shadow: rgba(238, 238, 238, 0.4) 0px 0px 8px;
}
.submit {
	width: auto;
	border: 1px solid #eeeeee;
	font-size: 14px;
	color: #333;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	border-radius: 5px;
	padding-top: 9px;
	padding-right: 25px;
	padding-bottom: 9px;
	padding-left: 25px;
	margin-right: 20px;
	text-shadow: -1px -1px 1px #cccccc;
	margin-left: 5px;
}
.login_wrap {
	position: absolute;
	top: 0px;
	height: auto;
	font-family: Arial, Helvetica, sans-serif;
	z-index: 999;
	text-shadow: -1px -1px 1px #000000;
	filter: dropshadow(color=#000000, offx=-1, offy=-1);
	width: 280px;
	left: 40px;
}
.login_box {
	background-color: -webkit-gradient;
	padding: 10px;
	z-index: 888;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	-webkit-box-shadow: -2px 2px 3px #cccccc;
	-moz-box-shadow: -2px 2px 3px #cccccc;
	box-shadow: -2px 2px 3px #cccccc;
	width: 250px;
	background: #4c4c4c; /* old browsers */
	background-position: left top;
	margin-top: 10px;
	border: 5px solid #333;
	float: left;
	margin-bottom: 10px;
	display: none;
}
.login_form {
	font-size: 18px;
	color: #FFF;
	text-align: left;
	text-transform: uppercase;
	z-index: 9999;
}
.login_button {
	background-color: #4C4C4C;
	clear: both;
	line-height: 45px;
	text-align: center;
	font-size: 24px;
	z-index: 777;
	-webkit-border-radius: 5px;
	-moz-border-radius: 5px;
	border-radius: 5px;
	-webkit-box-shadow: -2px 2px 3px #cccccc;
	-moz-box-shadow: -2px 2px 3px #cccccc;
	box-shadow: -2px 2px 3px #cccccc;
	color: #CCC; /* old browsers */
	cursor: select;
	margin-top: 5px;
	width: 270px;
	border: 5px solid #333;
}
body {
	background-color: #eee;
}
.link {
	font-size: 10px;
	color: #EEE;
	float: left;
	display: block;
	clear: both;
	padding: 5px;
}

</style>
</head>
<body>
<div class="login_wrap">
  <div class="login_box">
    <div class="login_form">
      <form id="form1" name="form1" method="post" action="">
        <p>用户名 :</p>
      <p>  <input type="text" name="username" class="input"  /></p>
       <p> 密码 :</p>
      <p>  <input type="text" name="password" class="input"  /></p>
     <p>   <input type="submit" name="login" class="submit" value="Login" /></p>
      </form>
      <a class="link" href="index6.php#">忘记密码了 ? </a>
      <a class="link" href="index6.php#">注册 ? </a>
    </div>
  </div>
  <div class="login_button"> 登录 </div>
</div>
</body>
</html>
