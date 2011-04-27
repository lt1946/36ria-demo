<style type="text/css">
body {
	background-color: #F5F5F5;
	font-family: Arial, Helvetica, sans-serif;
	color:#666;
}
input {
	background-color: #EEE;
	padding: 5px;
	border: 1px solid #CCC;
}
#logintable {
	font-family: Arial, Helvetica, sans-serif;
	background-color: #fefefe;
	border: 1px solid #CCC;
	color: #333;
	box-shadow:0px 0px 8px #cccccc;
	-moz-box-shadow:0px 0px 8px #cccccc;
	-webkit-box-shadow:0px 0px 8px #cccccc;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	padding:10px;
}
.message {
	text-align: center;
	padding: 20px;
	font-size: 24px;
	text-shadow: -1px -1px 1px #cccccc;
	filter: dropshadow(color=#ffffff, offx=1, offy=1);
}

</style>
<form action="index.php?login=1" method="post">
  <div class="message">请登录</div>
  <table width="258" border="0" align="center" cellpadding="05" cellspacing="0" id="logintable">
    <tr>
      <td width="100">&nbsp;</td>
      <td width="172">&nbsp;</td>
    </tr>
    <tr>
      <td>用户名</td>
      <td><label for="username"></label>
        <input name="username" type="text" id="username"></td>
    </tr>
    <tr>
      <td>密码</td>
      <td><label for="password"></label>
        <input name="password" type="password" id="password"></td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
      <td><input type="submit" name="button" id="button" value="提交"></td>
    </tr>
  </table>
</form>
