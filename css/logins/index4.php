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
.login_box {
	height: 260px;
	width: 275px;
	margin-right: auto;
	margin-left: auto;
	margin-top: 60px;
	background-color: #333;
	-moz-border-radius: 10px;
	border-radius: 10px;
	-webkit-border-radius: 10px;
	padding: 10px;
	border: 15px solid #CCC;
	
}
.input_label {
	float: left;
	width: 270px;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	clear: both;
	color: #CCC;
	padding-top: 5px;
	padding-bottom: 2px;
}
.header {
	line-height: 35px;
	font-size: 36px;
	color: #FFF;
	border-bottom-width: 3px;
	border-bottom-style: solid;
	border-bottom-color: #CCC;
	height: 40px;
	margin-bottom: 15px;
	margin-top: 0px;
}
.input {
	float: left;
	clear: both;
	width: 250px;
	padding: 5px;
	border: 1px solid #CCC;
	-moz-border-radius: 5px;
	border-radius: 5px;
	-webkit-border-radius: 5px;
}
.button {
	float: right;
	clear: both;
	width: 75px;
	padding: 5px;
	border: 1px solid #666;
	background: #f2f6f8; /* old browsers */
	background: -moz-linear-gradient(top, #f2f6f8 0%, #d8e1e7 50%, #b5c6d0 51%, #e0eff9 100%); /* firefox */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#f2f6f8), color-stop(50%,#d8e1e7), color-stop(51%,#b5c6d0), color-stop(100%,#e0eff9)); /* webkit */

filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f2f6f8', endColorstr='#e0eff9',GradientType=0 ); /* ie */
	-moz-border-radius: 10px;
	border-radius: 10px;
	-webkit-border-radius: 10px;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 14px;
	color: #333;
	margin-top: 10px;
	text-shadow:0 -1px 0 #ffffff;
	margin-right: 15px;
}
.links_wrap {
	clear: both;
	padding-top: 5px;
	padding-right: 5px;
	padding-bottom: 5px;
}
body {
	background-color: #666;
}
.login_box a {
	display: block;
	clear: both;
	float: left;
	color: #CCC;
	text-decoration: none;
	padding-bottom: 4px;
}
</style>
</head>
<body>
<div class="login_box">
<form id="form1" name="form1" method="post" action="">
  <table width="270" border="0" cellspacing="0" cellpadding="0">

    <tr>
      <td width="299">
        <p class="header">登录</p>
      </td>
    </tr>
    <tr>
      <td>
      <span class="input_label">用户名</span>

          <input class="input" type="text" name="textfield" id="textfield" />
        </td>
    </tr>
    <tr>
      <td><span class="input_label">密码</span>
        <input class="input" type="text" name="textfield2" id="textfield2" /></td>
    </tr>
    <tr>

      <td>
        <input type="submit" name="button" class="button" value="提交" />
      
        <p class="links_wrap"><a href="index4.php#">忘记密码了 ?</a><br />
        </p>
        </td>
    </tr>
  </table>

  </form>
</div>
</body>
</html>
