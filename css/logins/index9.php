
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"></script>
<script type="text/javascript">
$(document).ready(function () {
	$("#username, #password").focus(function () {
		
		if ($(this).val() === $(this).attr("value")) 
		{
		$(this).val("");
		}
	}).blur(function () {
					if ($(this).val() === "") {
					$(this).val($(this).attr("value"));
															}
										});
						});
</script>

<style type="text/css">
/*
Form Input Styling Taken From :
http://net.tutsplus.com/tutorials/html-css-techniques/design-a-prettier-web-form-with-css-3/
*/
body {
	background-color: #333;
	font-family: Arial, Helvetica, sans-serif;
	color:#666;
}


input {
	border: 2px solid #E5E5E5;
	color: #617798;
	width: 100%;
	background-color: #eee;
	height: auto;
	padding: 9px;
	}
.submit {
	width: 100%;
	background: #617798;
	border: 0;
	font-size: 14px;
	color: #FFFFFF;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	cursor: pointer;
	padding: 5px;
	}

input:hover,
input:focus {
	border-color: #C9C9C9;
	}
#logintable a {
	color: #617798;
}


#logintable {
	font-family: Arial, Helvetica, sans-serif;
	background-color: #fefefe;
	border: 1px solid #CCC;
	color: #333;
	box-shadow:0px 0px 8px #000;
	-moz-box-shadow:0px 0px 8px #000;
	-webkit-box-shadow:0px 0px 8px #000;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	margin-top: 50px;
}
.message {
	text-align: center;
	padding: 20px;
	font-size: 24px;
	color: #617798;
	border-bottom-width: 2px;
	border-bottom-style: solid;
	border-bottom-color: #617798;
}

</style>
<form action="" method="post">
  <table width="520" height="277" border="0" align="center" cellpadding="05" cellspacing="0" id="logintable">
    <tr>
      <td width="192" height="79"><div class="message">欢迎登录</div>
</td>
    </tr>
    <tr>
      <td><input name="u" type="text" id="username" value="用户名">
        </td>
    </tr>
    <tr>
      <td><input name="p" type="password" id="password" value="密码">
        </td>
    </tr>
    <tr>
      <td><input type="submit" name="button" class="submit" value="提交"></td>
    </tr>
  </table>
</form>
