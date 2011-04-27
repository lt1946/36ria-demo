/**
*@class  Upload
*@extend Sprite
*@fileOverview 文件上传组件，感谢uploadify的作者Ronnie Garcia、Travis Nickels，这里的代码很多参考uploadify的写法，
*这是我写的第二个actionscript类，琢磨他们的代码让我受益匪浅，向他们致敬。
*@author 谢文浩
*@email mohaiguyan12@126.com
*@version 0.1
*@date 2009-12-20
*/
package yi{
	    import flash.external.ExternalInterface;
        import flash.display.Sprite;
		import flash.events.*;
        import flash.text.TextField;
		import flash.text.TextFormat;
		import flash.display.Loader;
		import flash.net.URLRequest;
		import flash.net.FileReference;
		import flash.net.FileReferenceList;
		import flash.net.FileFilter;
		import flash.net.URLVariables;
		import flash.net.URLRequestMethod;
		import flash.utils.Timer;
		import com.adobe.serialization.json.JSON;

        public class Upload extends Sprite
        {
			    public var param:Object;
				public var allowedTypes:Array;
				public var fileQueue:Array = new Array();
				public var totalBytes:Number  = 0;
				public var folderPath:String;
				public var filesUploaded:uint; 
				public var errors:Array        = new Array();
				public var allBytesLoaded:uint;
				public var allBytesTotal:uint;
				public var allKbsAvg:uint;
				public var filesChecked:uint;
				public var queueReversed:Boolean  = false;
				
				private var btnBrowseText:TextField;
				private var textFormat:TextFormat;
				private var singleFile:FileReference;
				private var multiFiles:FileReferenceList;
				private var scriptURL:URLRequest;
				private var scriptURLVariables:URLVariables;
				private var activeUploads:Object = new Object();
				
                public function Upload(param):void
                {
					   this.param = param;
					   singleFile = new FileReference();
					   multiFiles = new FileReferenceList();
                       setHandCursor();
                       setBtnBg();
					   setTextFormat();
					   setBtnText();						
					   setAllowedTypes(param.allowedExt,param.allowedExtDesc,'|');
					   folderPath = getFolderPath(param.folder,param.pagePath);
					   this.addEventListener(MouseEvent.CLICK,function():void{clickHandler();});
					   singleFile.addEventListener(Event.SELECT,function(event:Event):void{singleFileSelectHandler(event);});
					   multiFiles.addEventListener(Event.SELECT,function(event:Event):void{multiFilesSelectHandler(event);});
					   ExternalInterface.addCallback("cancelFileUpload",function(id:String,single:Boolean):void{cancel(id,single);});
					   ExternalInterface.addCallback('startFileUpload',function(id:String,checkComplete:Boolean):void{uploadStart(id,checkComplete);});
					   ExternalInterface.addCallback('setOption',function(option:String,val:*):void{setOption(option,val)});
					   ExternalInterface.addCallback('clearQueue',function():void{clearQueue();});
					   
                }
				/**
				*调试
				*@param {*} val 对话框弹出的值
				*/
				public function debug(val:*):void{
			           ExternalInterface.call('alert("' + val + '")');
		        }
				/**
				*设置允许上传的文件类型
				*@param {String} fileExt 文件后缀字符串
				*@param {String} fileDesc 文件描述
				*@param {String} split 分隔符
				*@return{Array}  allowedTypes 保存文件过滤对象的数组
				*/
				public function setAllowedTypes(fileExt:String,fileDesc:String,split:String):Array{
				       allowedTypes = [];
					   if(fileExt && fileDesc){
							var fileExts:Array = fileExt.split(split);
							var fileDescs:Array = fileDesc.split(split);
							for(var i:uint = 0;i<fileDescs.length;i++){
								var fileFilter:FileFilter = new FileFilter(fileDescs[i],fileExts[i]);
								allowedTypes.push(fileFilter);
							}
					    }
						return allowedTypes;
				}
				/**
				*获取上传目录路径
				*@param {String} folder 待处理的目录路径字符串
				*@param {String} pagePath 当前页面的路径
				*@return{String}  folder 处理完毕的目录路径
				*/
				public function getFolderPath(folder:String,pagePath:String):String{
				      var folder:String = folder;
					  if(folder.substr(0,1) != "/" && folder.substr(0,4) != "http"){
					  	    folder = pagePath + folder;
							var uris:Array = folder.split("/");
							//将路径中".."过滤掉
							for(var i:uint = 0;i<uris.length;i++){
								if(uris[i] == ".."){
								    uris.splice(i-1,2);
								}
							}
							folder = uris.join("/");
					  }
					  return folder;
				}
				public function setOption(option:String,val:*):*{
					if(val == null){
						return param[option];
					}else{
						param[option] = val;
						if(option == 'btnBg') setBtnBg();
						if(option == 'btnBrowseText') setBtnText();
						return true;
					}
				}
				/**
				*清理文件队列，取消所有文件的上传
				*/												
				public function clearQueue():void{
					for(var i:Number = fileQueue.length -1 ;i>= 0 ;i--){
						cancel(fileQueue[i].id,false);
					}
					bind('clear');
					filesUploaded  = 0;
					errors         = [];
					allBytesLoaded = 0;
					allBytesTotal  = 0;
					allKbsAvg      = 0;
					filesChecked   = 0;			
				}
				/**
				*开始上传文件
				*@param {String} id FileReference对象id
				*@param {Boolean} checkComplete 是否文件检查完成
				*/								
				public function uploadStart(id:String, checkComplete:Boolean):void{
					setScript();
					//对文件存在进行检测
					if(param.checkScript && !checkComplete){
							var oFileQueue:Object = new Object();
							//存在id
							if(id){
								var index:uint = getIndex(id);
								if(fileQueue[index]){
									oFileQueue[fileQueue[index].id] = fileQueue[index].file.name;
								}
								bind("check",oFileQueue,true);
							}else{
								for (var n:Number = fileQueue.length - 1; n > -1; n--) {
									if (fileQueue[n]) {
											oFileQueue[fileQueue[n].id] = fileQueue[n].file.name;
									}
								}
								bind("check",oFileQueue,false);
								
							}
					}else{
						if(id && fileQueue[getIndex(id)].file){
							uploadFile(fileQueue[getIndex(id)].file,getIndex(id),id,true);
						}else{
							for(var i:Number = fileQueue.length-1;i > -1;i--){
								if(objSize(activeUploads) < parseInt(param.uploadLimit)){
									if(fileQueue[i].file && !activeUploads[fileQueue[i].id]){
										uploadFile(fileQueue[i].file,i,fileQueue[i].id,false);
									}
								}else{
									break;
								}
							}
						}
					}
					
				}
				/**
				*上传文件
				*@param {Object} file FileReference对象
				*@param {int} index 文件对象索引
				*@param {String} ID 文件对象ID
				*@param {Boolean} single 是否单传一个文件，还是上传多个文件
				*/				
				public function uploadFile(file:FileReference, index:int, id:String, single:Boolean):void{
						//文件开始上传时的起始时间
						var startTimer:Number = 0;
						//最后文件加载字节数
						var lastBytesLoaded:Number = 0;
						//平均加载字节数
						var kbsAvg:Number = 0;
						var kbs:Number = 0;
					    //给文件对象监听三个事件
						file.addEventListener(Event.OPEN, openHandler);
						file.addEventListener(ProgressEvent.PROGRESS, progressHandler);
						file.addEventListener(DataEvent.UPLOAD_COMPLETE_DATA, completeHandler);
						//HTTP通讯错误监听
						file.addEventListener(HTTPStatusEvent.HTTP_STATUS, function(event:HTTPStatusEvent):void {
							if (errors.indexOf(id) == -1) {  
								bind('addError',id,event.currentTarget,{'type' : 'HTTP','info' : event.status});
								addError(id,single);
							}
						});
						//无法加载类或接口,所监听的事件
						file.addEventListener(IOErrorEvent.IO_ERROR, function(event:IOErrorEvent):void {
							if (errors.indexOf(id) == -1) {  
								bind('addError',id,event.currentTarget,{'type' : 'IO','info' : event.text});
								addError(id,single);
							}
						});						
						//出现安全错误，所监听的事件
						file.addEventListener(SecurityErrorEvent.SECURITY_ERROR, function(event:SecurityErrorEvent):void {
							if (errors.indexOf(id) == -1) {  
								bind('addError',id,event.currentTarget,{'type' : 'Security','info' : event.text});
								addError(id,single);
							}
						});												
						//文件大小超过规定的最大大小
						if(param.sizeLimit && file.size > (parseInt(param.sizeLimit) * 1000)){
							//在错误数组中，不存在该文件对象id
							if(errors.indexOf(id) == -1){
								bind("addError",id,file,{"type":"sizeLimit","info":param.sizeLimit});
								addError(id,single);
							}
						}else{
							//上传文件
							file.upload(scriptURL,param.fileDataName);
							activeUploads[id] = true;	
						}
						
						function openHandler(event:Event){
							var _date:Date = new Date();
							startTimer = _date.time;
							bind("open",id,event.currentTarget);
							//移除监听
							event.currentTarget.removeEventListener(Event.OPEN,openHandler);
							
						}
						
						function progressHandler(event:ProgressEvent):void{
							var nowTimer:Number;
							var _date:Date = new Date();
							nowTimer = _date.time;							
							var percentage:Number = Math.round((event.bytesLoaded / event.bytesTotal) * 100);
							if ((nowTimer-startTimer) >= 150) {
									kbs = ((event.bytesLoaded - lastBytesLoaded)/1024)/((nowTimer-startTimer)/1000);
									kbs = int(kbs*10)/10; 
									startTimer = nowTimer;
									if (kbsAvg > 0) {
										kbsAvg = (kbsAvg + kbs)/2;
									} else {
										kbsAvg = kbs;
									}
									allKbsAvg = (allKbsAvg + kbsAvg)/2;
							}
							allBytesLoaded += (event.bytesLoaded - lastBytesLoaded);
							lastBytesLoaded = event.bytesLoaded;
							bind("progress",id,event.currentTarget,{
								 "percentage" : percentage,
								 "bytesLoaded" : event.bytesLoaded,
								 "allBytesLoaded" : allBytesLoaded,
								 "speed" : kbs
								 })
						}
						
						function completeHandler(event:DataEvent):void{
							var nowTimer:Number;
							var _date:Date = new Date();
							nowTimer = _date.time;							
							if (kbsAvg == 0) {
								kbs = (file.size/1024)/((nowTimer-startTimer)/1000);
								kbsAvg = kbs;
								allKbsAvg = (allKbsAvg + kbsAvg)/2;
							}
							allBytesLoaded -= lastBytesLoaded;
							allBytesLoaded += event.currentTarget.size;
							bind("progress",id,event.currentTarget,{
								 "percentage" : 100,
								 "bytesLoaded" : event.currentTarget.size,
								 "allBytesLoaded" : allBytesLoaded,
								 "speed" : kbs
								 })							
							bind("complete",id,event.currentTarget,{
								 "name" : event.currentTarget.name,
								 "filePath" : folderPath + "/" + event.currentTarget.name,
								 "size" : event.currentTarget.size,
								 "creationDate"     : event.currentTarget.creationDate,
								 "modificationDate" : event.currentTarget.modificationDate,
								 "type"             : event.currentTarget.type
								 })														
							//计数成功上传文件数
							filesUploaded++;
							//将已经成功上传的文件对象从队列中删除
							fileQueue.splice(getIndex(id),1);
							delete activeUploads[id];
							//再次调用上传文件方法，上传下一个文件
							if(!single) uploadStart(null,true);
							event.currentTarget.removeEventListener(ProgressEvent.PROGRESS,progressHandler);
							//必须移除完成事件监听，不然会出现多次触发的问题
							event.currentTarget.removeEventListener(DataEvent.UPLOAD_COMPLETE_DATA,completeHandler);
							//队列中的文件全部上传完毕，重置所有数值变量
							if(!fileQueue.some(isQueueEmpty) && objSize(activeUploads) == 0){
								bind("allComplete",{"uploadSize" : filesUploaded,"allBytesLoaded" : allBytesLoaded,errorSize:errors.length});
								reset();
							}
						}
				}
				/**
				*取消文件上传
				*@param {String} id 文件对象id
				*@param {Boolean} single 是否单传(用于判断是否再上传队列中的其他文件)
				*/				
				public function cancel(id:String,single:Boolean):void{
					var index = getIndex(id);					
					var _file:Object = new Object();
					if(fileQueue[index]){
						_file = fileQueue[index].file;
						//取消上传
						fileQueue[index].file.cancel();
						//所有文件字节数
						allBytesTotal -= fileQueue[index].file.size;
						//清除文件对象队列中的该对象
						fileQueue.splice(index,1);						
					}
					//删除处于上传中的该文件对象
					if(activeUploads[id]){
						delete activeUploads[id];
						if(!single){uploadStart(null,true)}
					}
					
					bind("cancel",id,_file,{"allBytesTotal" : allBytesTotal});
					
				}
				/**
				*重置所有数值变量
				*/				
				public function reset():void{
							filesUploaded  = 0;
							errors         = [];
							allBytesLoaded = 0;
							allBytesTotal  = 0;
							allKbsAvg      = 0;
							filesChecked   = 0;
							queueReversed  = false;
							fileQueue = [];
				}
				/**
				*设置按钮背景
				*/
				private function setBtnBg():void{
						if(param.btnBg){
							var btnBg:Object = addBtnBg(param.btnBg);
	                   } 
					   if(param.btnHoverBg){
					   		var btnHoverBg:Object = addBtnBg(param.btnHoverBg);
							btnHoverBg.alpha = 0;
							this.addEventListener(MouseEvent.MOUSE_OVER,overHandler);
							this.addEventListener(MouseEvent.MOUSE_OUT,outHandler);
					   }
					   var hoverAnimateSpeed:Number = param.hoverAnimateSpeed || 50;
					   var timer:Timer = new Timer(hoverAnimateSpeed,10);
					   timer.addEventListener(TimerEvent.TIMER,changeHandler);
					   timer.addEventListener(TimerEvent.TIMER_COMPLETE,completeHandler);
					   var timer2:Timer = new Timer(hoverAnimateSpeed,10);
					   timer2.addEventListener(TimerEvent.TIMER,changeHandler2);					
					   timer2.addEventListener(TimerEvent.TIMER_COMPLETE,completeHandler2);
					   function addBtnBg(path):Object{
							 var btnLoader:Loader = new Loader();
		                     var btnBg:URLRequest = new URLRequest(path);
		                     addChild(btnLoader);
		                     btnLoader.load(btnBg);
							 return btnLoader;
					   }
					   
					   function overHandler(event:MouseEvent):void{
						   // textFormat.color = 0x00AA7030;
							//btnBrowseText.setTextFormat(textFormat);
							timer.start();
					   }
					   
					   function outHandler():void{
						    //textFormat.color = 0x00384B54;
							//btnBrowseText.setTextFormat(textFormat);
					   		timer2.start();
					   }
					   
					   function changeHandler(event:TimerEvent):void{
							var alpha:Number = btnHoverBg.alpha;
							alpha += 0.1;
							btnHoverBg.alpha = alpha;
							if(btnHoverBg.alpha == 1){
								timer.stop();
							}
							event.updateAfterEvent();
					   }
					   function completeHandler(event:TimerEvent):void{
							timer.reset();
					   }
					   function changeHandler2(event:TimerEvent):void{
							var alpha:Number = btnHoverBg.alpha;
							alpha -= 0.1;
							btnHoverBg.alpha = alpha;
							if(btnHoverBg.alpha == 0){
								timer2.stop();
							}
							event.updateAfterEvent();
					   }					
					   function completeHandler2(event:TimerEvent):void{
							timer2.reset();
					   }					   
				}
				/**
				*设置按钮文字
				*/
				private function setBtnText():void{
					   btnBrowseText = new TextField();
					   if(param.isHideBtnText == "false"){
					      if(param.btnBrowseText){
                              btnBrowseText.defaultTextFormat = textFormat;
							  btnBrowseText.text =  param.btnBrowseText;
							  btnBrowseText.y = 9;
							  btnBrowseText.x = 16;
							  addChild(btnBrowseText);
						  }
					   }
				}
				/**
				*设置按钮文字格式
				*/
				private function setTextFormat():void{
					   textFormat = new TextFormat();
                       textFormat.size = 14;
					  // textFormat.color = 0x00384B54;
					  // textFormat.font = "黑体";
				}
				/**
				*设置鼠标手型
				*/
				private function setHandCursor():void{
					   buttonMode = true;
					   useHandCursor = true;
					   mouseChildren = false;
				}
				/**
				*单击时候触发的监听函数
				*/
				private function clickHandler():void{
					//没有正在上传的文件
					if(objSize(activeUploads) == 0){
					   if (!allowedTypes) {
							 param.multi == "true" ? multiFiles.browse() : singleFile.browse();
		               } else { 
							 param.multi == "true" ? multiFiles.browse(allowedTypes) : singleFile.browse(allowedTypes);
		               }  
					}
				}
				/**
				*单选模式下选择完文件后触发的监听事件
				*/
				private function singleFileSelectHandler(event:Event):void{
					//将文件对象写入文件队列数组，并为文件设置随机ID
					var fileItem:Object = new Object();
					fileItem.file = FileReference(event.target);
					clearQueue();
					fileItem.id = getRandomId();
					fileQueue.push(fileItem);
					//设置文件总字节数
					totalBytes = fileItem.file.size;
					bind("select",fileItem.id,fileItem.file);
                    runUploadStart();
				}
				/**
				*多选模式下选择完文件后触发的监听事件
				*/
				private function multiFilesSelectHandler(event:Event):void{
					for(var i:Number = 0;i<multiFiles.fileList.length;i++){
						var _file:Object = new Object();
						_file.file = multiFiles.fileList[i];
						var qFile:Object = isInQueue(_file.file.name);
					    //文件上传队列中没有存在此文件
						if(!qFile.isIn){
							if(fileQueue.length < param.queueSizeLimit){
								_file.id = getRandomId();
								fileQueue.push(_file);
								allBytesTotal += _file.file.size;
								bind("select",_file.id,_file.file);
							}else{
								bind("queueFull",param.queueSizeLimit);
							}
						}
					}
					runUploadStart();
				}
				/**
				*开始运行文件上传方法
				*/				
				private function runUploadStart():void{
					if(param.auto == "true"){
					     if(param.checkScript){
						      uploadStart(null,false);
					     }else{
						      uploadStart(null,true);
					     }
					}
				}
				/**
				*触发js事件
				*@param {String} eventType 事件名
				*/				
				private function bind(eventType:String, ... args):void{
	                    function p(s:String):String {
							return ('('+s+')');
						}
						function q(s:String):String {
							return ('"'+s+'"');
						}
						var list:Array = [q(eventType)];
						if (args.length > 0) list.push(JSON.encode(args)); 
						ExternalInterface.call(['jQuery'+p(q('#'+param.id)), p(list.join(','))].join('.trigger'));
				}
				/**
				*获取随机ID（默认为六位）
				*@param {Number} len ID长度
				*/								
				private function getRandomId(len:Number = 6){
					var chars:Array = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
					var ID:String = '';
					var index:Number;
					for (var n:int = 0; n < len; n++) {
								ID += chars[Math.floor(Math.random() * 25)];
					}
					return ID;
				}
				/**
				*根据文件对象id来获取文件对象在文件队列数组中的索引值
				*@param {String} id ID
				*@return {uint} index 索引值
				*/								
				private function getIndex(id:String):uint{
				   var index:uint;
				   for(var i:uint = 0;i<fileQueue.length;i++){
				   		if(fileQueue[i].id == id) index = i; 
				   }
				   return index;
				}
				/**
				*设置加载服务器脚本
				*/								
				private function setScript():void{
					var script:String = getRealPath(param.script);
					scriptURL = new URLRequest(script);
					scriptURLVariables = new URLVariables();
					param.method.toUpperCase() == "GET" ? scriptURL.method = URLRequestMethod.GET : scriptURL.method = URLRequestMethod.POST;
					
					if(param.scriptData)  scriptURLVariables.decode(param.scriptData);
					if(param.allowedExt) scriptURLVariables.allowedExt = param.allowedExt;
					scriptURLVariables.folder = folderPath;
					scriptURL.data = scriptURLVariables;
					
				}
				/**
				*获取真实的文件路径
				*@param {String} path 文件相对路径
				*@return {String} realPath 文件真实路径
				*/
				private function getRealPath(path:String):String{
					var realPath:String = path;
					if(path.substr(0,1) != "/" && path.substr(0,4) != "http") realPath = param.pagePath + path;
					return realPath;
					
				}
				/**
				*获取对象元素的个数
				*@param {Object} obj 对象
				*@return {int} i 个数
				*/
				private function objSize(obj:Object):int{
					var i:int = 0;
					for (var item in obj) {
							i++;
					}
					return i;
				}
				/**
				*数组some方法判断的回调函数，判断文件队列是否为空
				*@return {Boolean}
				*/
				private function isQueueEmpty(item:*, index:int, array:Array):Boolean{
					return (item.file != '');
				}
			    /**
				*判断队列中是否已存在此文件
				*@param {String} 文件名
				*@return {Object} 文件对象（包含用于判断的字段isIn）
				*/
				private function isInQueue(fileName:String):Object{
					var _o:Object = new Object();
					_o.isIn = false;
					if(fileQueue.length > 0){
						for(var i:Number = 0;i < fileQueue.length;i++){
							//文件队列中存在该文件名的对象
							if(fileQueue[i].file.name == fileName){
								_o.id = fileQueue[i].id;
								_o.size = fileQueue[i].file.size;
								_o.arrIndex = i;
								_o.isIn = true;
								
							}
						}
					}
					return _o;
				}
				/**
				*将上传错误的文件ID写入错误数组
				*@param {String} id 文件对象id
				*@param {Boolean} single 是否单传
				*/
				private function addError(id:String,single:Boolean){
					//将id写入错误数组
					errors.push(id);
					//清除队列中该id的文件对象
					fileQueue[getIndex(id)].file = '';
					delete activeUploads[id];
					if(!fileQueue.some(isQueueEmpty)){
						bind("allComplete",{"uploadSize" : filesUploaded,"allBytesLoaded" : allBytesLoaded,"errorSize":errors.length});
						reset();
					}					
					//如果不是单传模式，继续上传队列中的文件
					if(!single){
						uploadStart(null,true);
					} 
				}

        } 

}