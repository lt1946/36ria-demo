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
	height: 160px;
	width: 400px;
	margin-right: auto;
	margin-left: auto;
	margin-top: 60px;
	background-color: #DDEEF6;
-webkit-border-top-left-radius: 10px;
-webkit-border-bottom-right-radius: 10px;
-moz-border-radius-topleft: 10px;
-moz-border-radius-bottomright: 10px;
border-top-left-radius: 10px;
border-bottom-right-radius: 10px;
	padding: 10px;
}
.input_label {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 24px;
	color: #ACE;
}
.input {
	float: left;
	clear: both;
	width: 250px;
	padding: 5px;
	border: 1px solid #ACE;
-webkit-border-top-left-radius: 10px;
-webkit-border-bottom-right-radius: 10px;
-moz-border-radius-topleft: 10px;
-moz-border-radius-bottomright: 10px;
border-top-left-radius: 10px;
border-bottom-right-radius: 10px;
}
.button {
	float: left;
	clear: both;
	width: 75px;
	padding: 5px;
	border: 1px solid #FFF;
	-webkit-border-top-left-radius: 10px;
	-webkit-border-bottom-right-radius: 10px;
	-moz-border-radius-topleft: 10px;
	-moz-border-radius-bottomright: 10px;
	border-top-left-radius: 10px;
	border-bottom-right-radius: 10px;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 14px;
	color: #FFF;
	margin-top: 10px;
	text-shadow:1px -1px 1px #AACCEE;
	background-color: #ACE;
}
body {
	background-color: #AACCEE;
}
</style>
</head>
<body>
<div class="login_box">
<form id="form1" name="form1" method="post" action="">
  <table width="400" height="158" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td width="301">
    </td>
      <td width="230"></td>
    </tr>
    <tr>
      <td>
        <input class="input" type="text" name="textfield" id="textfield" /></td>
      <td><span class="input_label">用户名</span></td>
    </tr>
    <tr>
      <td>
        <input class="input" type="text" name="textfield2" id="textfield2" /></td>
      <td><span class="input_label">密码</span></td>
    </tr>
    <tr>
      <td><input type="submit" name="button" class="button" value="提交" /></td>
      <td>&nbsp;</td>
    </tr>
  </table>
  </form>
</div>
</body>
</html>
