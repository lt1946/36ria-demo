(function () {
	var input = document.getElementById("images"), 
		formdata = false;
    //显示上传图片
	function showUploadedItem (source) {
  		var list = document.getElementById("image-list"),
	  		li   = document.createElement("li"),
	  		img  = document.createElement("img");
  		img.src = source;
  		li.appendChild(img);
		list.appendChild(li);
	}   
    //如果浏览器不支持FormData，隐藏按钮
	if (window.FormData) {
  		formdata = new FormData();
  		document.getElementById("btn").style.display = "none";
	}
	//监听上传框的change事件
 	input.addEventListener("change", function (evt) {
        //改变消息层的文案
 		document.getElementById("response").innerHTML = "Uploading . . ."
 		var i = 0, len = this.files.length, img, reader, file;
	    //遍历文件
		for ( ; i < len; i++ ) {
			file = this.files[i];
	        //文件类型为图片
			if (!!file.type.match(/image.*/)) {
                //浏览器支持FileReader对象
				if ( window.FileReader ) {
					reader = new FileReader();
                    //监听文件读取结束后事件
					reader.onloadend = function (e) {
                        //将图片添加到显示列表
						showUploadedItem(e.target.result, file.fileName);
					};
                    //读取文件
					reader.readAsDataURL(file);
				}
                //将文件数据添加到FormData对象内
				if (formdata) {
					formdata.append("images[]", file);
				}
			}
		}
//发送ajax请求，存储文件（传递FormData对象过去）
if (formdata) {
    $.ajax({
        url: "upload.php",
        type: "POST",
        data: formdata,
        processData: false,
        contentType: false,
        success: function (res) {
            //将上传成功后的提示打印到页面
            document.getElementById("response").innerHTML = res;
        }
    });
}
	}, false);
}());
