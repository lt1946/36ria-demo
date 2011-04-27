<?php
function runSQL($rsql) {
	$hostname = 'localhost';			// 主机名
	$username = 'root';			// 用户名
	$password = '1';				// 密码
	$dbname = 'yijs';			//数据库名
	$connect = mysql_connect($hostname,$username,$password) or die ("Error: could not connect to database");
	$db = mysql_select_db($dbname);
	mysql_query('set names gbk');
	$result = mysql_query($rsql) or die ('test'); 
	return $result;
	mysql_close($connect);
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gbk" />
        <title></title>
		<script src="lib/jquery/jquery.js"></script>
<script>
	var aOneOptions = new Array();
	<?php
		$where = "WHERE f_up = 0 ";
		$sql = "SELECT * FROM city $where";
		$result = runSQL($sql);
		while ($row = mysql_fetch_array($result)) {
			echo "aOneOptions[".$row['id']."] = '".$row['name']."';";
		}		
			
	?>	
	var aTowOptions = new Array();
	<?php
		$where = "WHERE f_up = 0 ";
		$sql = "SELECT * FROM city $where";
		$result = runSQL($sql);	
		while ($row = mysql_fetch_array($result)) {
			echo "aTowOptions[".$row['id']."] = new Array();";
			$towWhere = "WHERE f_up = ".$row['id']." ";
			$towSql = "SELECT * FROM city $towWhere";
			$towResult = runSQL($towSql);
			while ($row2 = mysql_fetch_array($towResult)) {
				echo "aTowOptions[".$row['id']."][".$row2['id']."] = '".$row2['name']."';";
			}			
		}		
			
	?>		
	function appOneOptions(oName,aOne){
		var optionsHtml = "";
		for(var i = 0;i <aOne.length ; i++){
			if(aOne[i] != undefined){
				optionsHtml += "<option value='"+i+"'>"+aOne[i]+"</option>";
			}
		}
		$(oName).append(optionsHtml);
		return optionsHtml;
	}
	function appTowOptions(oName,aTow,oneId){
		var oneId = Number(oneId);
		var optionsHtml = "";
		for(var i = 0;i <aTow[oneId].length ; i++){
			if(aTow[oneId][i] != undefined){
				optionsHtml += "<option value='"+i+"'>"+aTow[oneId][i]+"</option>";
			}
		}
		$(oName).html(optionsHtml);
		return optionsHtml;		
	}

	$(function(){
		appOneOptions("#oneOptions",aOneOptions);
		$("#oneOptions").change(function(){
			var oneId = Number($(this).val());
			appTowOptions("#towOptions",aTowOptions,oneId);
		})
		appTowOptions("#towOptions",aTowOptions,1);
		$("#towOptions").change(function(){
			var id = $(this).val();

		})
	})
</script>
    </head>
    <body>
        <select name="oneOptions" id="oneOptions">

        </select>
         <select name="towOptions" id="towOptions">

        </select> 
<p>
	var aOneOptions = new Array();
	<?php
		$where = "WHERE f_up = 0 ";
		$sql = "SELECT * FROM city $where";
		$result = runSQL($sql);
		while ($row = mysql_fetch_array($result)) {
			echo "aOneOptions[".$row['id']."] = '".$row['name']."';";
		}		
			
	?>	
	var aTowOptions = new Array();
	<?php
		$where = "WHERE f_up = 0 ";
		$sql = "SELECT * FROM city $where";
		$result = runSQL($sql);	
		while ($row = mysql_fetch_array($result)) {
			echo "aTowOptions[".$row['id']."] = new Array();";
			$towWhere = "WHERE f_up = ".$row['id']." ";
			$towSql = "SELECT * FROM city $towWhere";
			$towResult = runSQL($towSql);
			while ($row2 = mysql_fetch_array($towResult)) {
				echo "aTowOptions[".$row['id']."][".$row2['id']."] = '".$row2['name']."';";
			}			
		}		
			
	?>		
</p> 		
    </body>
</html>
