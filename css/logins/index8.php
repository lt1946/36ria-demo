<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Login 1</title>
<style type="text/css">
.login_box {
	height: 170px;
	width: 275px;
	margin-right: auto;
	margin-left: auto;
	margin-top: 60px;
	background-color: #9CF;
	-moz-border-radius: 150px;
	border-radius: 150px;
	-webkit-border-radius: 150px;
	padding: 50px;
	-webkit-box-shadow: 0px 0px 10px #000000;
	-moz-box-shadow: 0px 0px 10px #000000;
	box-shadow: 0px 0px 10px #000000;
	text-align: center;
	color: #FFF;
	border: 1px solid #FFF;
}
.center {
	text-align: center;
	display: block;
	width: 70px;
	margin-right: auto;
	margin-left: auto;
}
.input_label {
	float: left;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 16px;
	clear: both;
	color: #333;
	padding-top: 5px;
	padding-bottom: 2px;
	text-align: center;
	display: block;
	width: 100%;
}
.input {
	float: left;
	clear: both;
	width: 98%;
	padding: 5px;
	border: 1px solid #333;
	-moz-border-radius: 5px;
	border-radius: 5px;
	-webkit-border-radius: 5px;
	background-color: #eeeeee;
	color: #333;
}
.button {
	float: left;
	clear: both;
	width: 75px;
	padding: 5px;
	border: 1px solid #333;
	-moz-border-radius: 10px;
	border-radius: 10px;
	-webkit-border-radius: 10px;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 14px;
	color: #333;
	margin-top: 10px;
}
body {
	background-color: #333;
}
.links_wrap {
	clear: both;
	padding-top: 5px;
	padding-right: 5px;
	padding-bottom: 5px;
}
</style>
</head>
<body>
<div class="login_box">
  <form id="form1" name="form1" method="post" action="">
    <p>
    <span class="input_label">用户名</span>
      <input class="input" type="text" name="textfield" id="textfield" />
    </p>
    <p>
    <span class="input_label">密码</span>
    <input class="input" type="text" name="textfield2" id="textfield2" />
    </p>
    <p class="center">
    <input type="submit" name="button" class="button" value="提交" />
    </p>
  </form>
</div>
</body>
</html>
