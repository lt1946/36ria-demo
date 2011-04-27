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
	background-color: #DDEEF6;
	-moz-border-radius: 10px;
	border-radius: 10px;
	-webkit-border-radius: 10px;
	padding: 10px;
	-webkit-box-shadow: 0px 0px 10px #cccccc;
	-moz-box-shadow: 0px 0px 10px #cccccc;
	box-shadow: 0px 0px 10px #cccccc; 
}
.input_label {
	float: left;
	width: 270px;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	clear: both;
	color: #999;
	padding-top: 5px;
	padding-bottom: 2px;
}
.input {
	float: left;
	clear: both;
	width: 250px;
	padding: 5px;
	border: 1px solid #ACE;
		-moz-border-radius: 5px;
	border-radius: 5px;
	-webkit-border-radius: 5px;
}
.button {
	float: left;
	clear: both;
	width: 75px;
	padding: 5px;
	border: 1px solid #ACE;
	background: #b3dced; /* old browsers */
	background: -moz-linear-gradient(top, #b3dced 0%, #29b8e5 50%, #bce0ee 100%); /* firefox */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#b3dced), color-stop(50%,#29b8e5), color-stop(100%,#bce0ee)); /* webkit */

filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#b3dced', endColorstr='#bce0ee',GradientType=0 ); /* ie */
	-moz-border-radius: 10px;
	border-radius: 10px;
	-webkit-border-radius: 10px;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 14px;
	color: #FFF;
	margin-top: 10px;
	text-shadow:0 -1px 0 #3399DD;
}
.links_wrap {
	clear: both;
	padding-top: 5px;
	padding-right: 5px;
	padding-bottom: 5px;
}
body {
	background-color: #AACCEE;
}

</style>
</head>
<body>
<div class="login_box">
<form id="form1" name="form1" method="post" action="">
  <table width="270" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td width="299">
    </td>
    </tr>
    <tr>
      <td><p><span class="input_label">用户名</span>
          <input class="input" type="text" name="textfield" id="textfield" />
        </p></td>
    </tr>
    <tr>
      <td><span class="input_label">密码</span>
        <input class="input" type="text" name="textfield2" id="textfield2" /></td>
    </tr>
    <tr>
      <td>
        <input type="submit" name="button" class="button" value="提交" />
        </td>
    </tr>
  </table>
  </form>
</div>
</body>
</html>
