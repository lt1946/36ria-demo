<?php

// by longzang oicuicu@gmail.com
header("content-type:text/html; charset=UTF-8");
define('REST_FORMAT', 'xml');	
$uploaddir = './uploadfiles/'; // 上传路径
$filename = $_FILES['Filedata']['name']; // Filedata 可通过  uploader 组件自定义为其他名称，如 file

$uploadfile = $uploaddir . $filename;
$uploadfile = iconv('utf-8', 'gb2312', $uploadfile);
move_uploaded_file($_FILES['Filedata']['tmp_name'], $uploadfile);

echo "<data>hello world!</data>";


?>