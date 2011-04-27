<?php
//得到目录下的文件总数
function get_file_count($dir_name){             
	$files = 0; 
	if ($handle = opendir($dir_name)) { 
	while (false !== ($file = readdir($handle))) {  
		$files++; 
	} 
	closedir($handle); 
	} 
	return $files; 
}
//循环删除目录和文件函数
function delDirAndFile($dirName){
	if ($handle = opendir($dirName) ) {
	   while ( false !== ( $item = readdir($handle) ) ){
		  if ( $item != "." && $item != ".." ) {
		  	unlink("$dirName/$item");
		  } 
		  
	   }
	   closedir($handle);
	   
	}
}
if (!empty($_FILES)) {
	$tempFile = $_FILES['Filedata']['tmp_name'];
	$targetPath = $_SERVER['DOCUMENT_ROOT'] . $_REQUEST['folder'] . '/';
	$targetFile =  str_replace('//','/',$targetPath) . $_FILES['Filedata']['name'];
	/*-----------------*/
	//以下三行代码用于删除文件，实际应用时请予以删除，get_file_count()和delDirAndFile（）函数都可以删除
	$folderPath = $_SERVER['DOCUMENT_ROOT'] . $_REQUEST['folder'];
	$size = get_file_count($folderPath);
	if($size > 6) delDirAndFile($folderPath);
	/*-----------------*/
	move_uploaded_file($tempFile,$targetFile);
	echo "1";
}
?>