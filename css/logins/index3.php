

<style type="text/css">

body {
	background-color: #333;
	font-family: Arial, Helvetica, sans-serif;
	color:#666;
}


input {
	outline: 0;
	width: 150px;
	color: #333;
	border-bottom-width: 1px;
	border-bottom-style: solid;
	border-bottom-color: #333;
	padding-bottom: 0px;
	font-family: "Lucida Console", Monaco, monospace;
	border-top-width: 1px;
	border-right-width: 1px;
	border-left-width: 1px;
	border-top-style: solid;
	border-right-style: solid;
	border-left-style: solid;
	border-top-color: #FFF;
	border-right-color: #FFF;
	border-left-color: #FFF;
	}
.submit {
	width: auto;
	padding: 9px;
	border: 0;
	font-size: 14px;
	color: #FFFFFF;
	-moz-border-radius: 5px;
	-webkit-border-radius: 5px;
	cursor: pointer;
	background-color: #333;
	font-family: Arial, Helvetica, sans-serif;
	float: right;
	}

#logintable {
	font-family: Arial, Helvetica, sans-serif;
	background-color: #FFF;
	border: 1px solid #333;
	color: #333;
	box-shadow:0px 0px 8px #cccccc;
	-moz-box-shadow:0px 0px 8px #cccccc;
	-webkit-box-shadow:0px 0px 8px #cccccc;
	-webkit-border-radius: 10px;
	-moz-border-radius: 10px;
	border-radius: 10px;
	padding:10px;
	margin-top: 50px;
}
</style>

<form action="index.php?login=1" method="post">
  <table width="507" border="0" align="center" cellpadding="05" cellspacing="0" id="logintable">
    <tr>
      <td width="495">
</td>
    </tr>
    <tr>
      <td>用户名
        <input name="u" type="text" id="username" value="Username">
        </td>
    </tr>
    <tr>
      <td>密码
        <input name="p" type="password" id="password" value="Password">
        </td>
    </tr>
    <tr>
      <td><input type="submit" name="button" class="submit" value="提交"></td>
    </tr>
  </table>
</form>
