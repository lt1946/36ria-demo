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
	margin-left: 20px;
	text-shadow: -1px -1px 1px #cccccc;
	background: #ffffff; /* old browsers */
	background: -moz-linear-gradient(top, #ffffff 0%, #f1f1f1 50%, #e1e1e1 51%, #f6f6f6 100%); /* firefox */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #ffffff), color-stop(50%, #f1f1f1), color-stop(51%, #e1e1e1), color-stop(100%, #f6f6f6)); /* webkit */
 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f6f6f6', GradientType=0 ); /* ie */
}
.login_wrap {
	position: absolute;
	top: 0px;
	right: 40px;
	height: auto;
	font-family: Arial, Helvetica, sans-serif;
	z-index: 999;
	text-shadow: -1px -1px 1px #000000;
	filter: dropshadow(color=#000000, offx=-1, offy=-1);
}
.login_box {
	background-color: -webkit-gradient;
	padding: 10px;
	z-index: 888;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	border-right-color: #09F;
	border-bottom-color: #09F;
	border-left-color: #09F;
	-webkit-border-bottom-right-radius: 5px;
	-webkit-border-bottom-left-radius: 5px;
	-moz-border-radius-bottomright: 5px;
	-moz-border-radius-bottomleft: 5px;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
	-webkit-box-shadow: -2px 2px 3px #cccccc;
	-moz-box-shadow: -2px 2px 3px #cccccc;
	box-shadow: -2px 2px 3px #cccccc;
	width: 100%;
	background: #4c4c4c; /* old browsers */
	background: -moz-linear-gradient(top, #4c4c4c 0%, #595959 12%, #666666 25%, #474747 39%, #2c2c2c 50%, #000000 51%, #111111 60%, #2b2b2b 76%, #1c1c1c 91%, #131313 100%); /* webkit */
 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4c4c4c', endColorstr='#131313', GradientType=0 );
	background-position: left top;
	display: none;
}
.login_form {
	font-size: 18px;
	height: 40px;
	line-height: 40px;
	color: #CCC;
	text-align: right;
	text-transform: uppercase;
	z-index: 9999;
}
.login_button {
	background-color: #131313;
	height: 45px;
	clear: both;
	float: right;
	margin-top: -1px;
	line-height: 45px;
	text-align: center;
	font-size: 24px;
	border-right-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-style: solid;
	border-bottom-style: solid;
	border-left-style: solid;
	border-right-color: #09F;
	border-bottom-color: #09F;
	border-left-color: #09F;
	z-index: 777;
	-webkit-border-bottom-right-radius: 5px;
	-webkit-border-bottom-left-radius: 5px;
	-moz-border-radius-bottomright: 5px;
	-moz-border-radius-bottomleft: 5px;
	border-bottom-right-radius: 5px;
	border-bottom-left-radius: 5px;
	-webkit-box-shadow: -2px 2px 3px #cccccc;
	-moz-box-shadow: -2px 2px 3px #cccccc;
	box-shadow: -2px 2px 3px #cccccc;
	padding-right: 20px;
	padding-left: 20px;
	right: 0px;
	color: #CCC;
	background: #131313; /* old browsers */
	background: -moz-linear-gradient(top, #131313 0%, #333333 50%, #0a0e0a 51%, #0a0809 100%); /* firefox */
	background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, #131313), color-stop(50%, #333333), color-stop(51%, #0a0e0a), color-stop(100%, #0a0809)); /* webkit */
 filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#131313', endColorstr='#0a0809', GradientType=0 ); /* ie */
	cursor: select;
}
</style>
</head>
<body>
<div class="login_wrap">
  <div class="login_box">
    <div class="login_form">
      <form id="form1" name="form1" method="post" action="">
        ÓÃ»§Ãû
        :
        <input type="text" name="username" class="input"  />
        ÃÜÂë :
        <input type="text" name="password" class="input"  />
        <input type="submit" name="login" class="submit" value="µÇÂ¼" />
      </form>
    </div>
  </div>
  <div class="login_button"> µÇÂ¼ </div>
</div>
</body>
</html>
