/**
 * @author kingfo  oicuicu@gmail.com
 */
describe("uploader",function(){
	if(location.protocol === 'file:') return;
	
	var S = KISSY,
	    F = KISSY.Flash,
	    A = AJBridge,
		doc = document,win = window,
		Uploader = A.Uploader,
		server = 'http://127.0.0.1:8080/upload.php',
		uploader, swfId = "uploader",container = "FC_SelectFilesBtn",
		fileList,
		defconfig={
			src : "../uploader.swf",
            params:{
                wmode:"transparent"
            }	
		};
		
	describe("uploader create",function(){
		var config = S.merge(defconfig,
	                         {
	                            id:swfId,
	                            attrs: {
	                                width: '400',
	                                height: '300'
	                            },
	                            flashvars:{
	                                zlib:true
	                            },
								hand:true,
                                btn:true
	                         }),
			uploader = new Uploader(container,config);
		
		
		
		uploader.on("failed",function(ev){
			// swf未安装 或版本过低
			S.log(ev);
		});
		
		uploader.on("error",function(ev){
			// 其他错误
			S.log(ev);
		});
		
		uploader.on("mouseOver",function(ev){
			S.log(ev.type);
		});
		
		uploader.on("mouseOut",function(ev){
			S.log(ev.type);
		});
			
		it("should ready",function(){
			var contentReady;
			uploader.on("contentReady", function(ev) {
                contentReady = true;    
            });
			
			waitsFor(function(){ return contentReady; },"uploader never ready",3000);
			
		});
	
        it("should browse-select file(s) and upload-remove frist file",function(){
            var fileSelect;
            expect(confirm("You have 30 seconds to click the flash and select any file(s).")).toBeTruthy();
            
			var onFileSelect = function(ev) {
                fileSelect = true;    
                
				fileList = ev.fileList;
				
                expect(fileList).toBeDefined();
                expect(fileList.length).toBeGreaterThan(0);
                expect(fileList[0]).toBeDefined();
                expect(fileList[0].cDate).toBeDefined();//creationDate
                expect(fileList[0].mDate).toBeDefined();//modificationDate
                expect(fileList[0].name).toBeDefined();
                expect(fileList[0].size).toBeDefined();
                expect(fileList[0].type).toBeDefined();
                expect(fileList[0].id).toBeDefined();
                
				expect(uploader.getFile(fileList[0].id).id).toEqual(fileList[0].id);
				expect(uploader.getFile(fileList[0].id)).not.toBe(fileList[0]);
				
				uploader.upload(fileList[0].id,server,"POST",{YourParams:"anyData"});
				
				uploader.removeFile(fileList[0].id); // cancel upload and remove from upload list
				//uploader.cancel(fileList[0].id);	// cancel upload only
				
				uploader.detach("fileSelect",onFileSelect);
            }
                        
            uploader.on("fileSelect",onFileSelect );
            
            uploader.on("browseCancel", function(ev) {
                S.log("no file selected!");
            });
            
            waitsFor(function(){ return fileSelect; },"no file be selected! ",30000);
            
        });
        
        
        it("should lock",function(){
            var isLock;
			uploader.on("uploadLock",function(ev){
				isLock = true;
			});
			uploader.lock();
			waitsFor(function(){ return isLock; },"never lock ",100);
        });
        
        it("should unlock",function(){
            var isUnLock;
            uploader.on("uploadUnlock",function(ev){
                isUnLock = true;
            });
            uploader.unlock();
            waitsFor(function(){ return isUnLock; },"never lock ",100);
        });
        
		it("should clear all files",function(){
			var hasClear;
		 	uploader.on("uploadClear",function(ev){
                S.log(ev);
				hasClear = true;
				expect(ev.target.length).toEqual(0);
				detach("uploadClear",arguments.callee);
            });
			uploader.clear();
			waitsFor(function(){ return hasClear; },"never mouseOver ",100);
		});
		
		
        it("should dispatch mouse down-up-click event before file(s) selected",function(){
             var fileSelect,mouseDown=false,mouseUp=false,hasClick=false;
			 
            expect(confirm("Right now,you have 20 seconds to click the flash and select any file(s)")).toBeTruthy();
			
			uploader.unlock();
			
			
			uploader.on("fileSelect", function(ev) {
                fileSelect = true;    
            });
			
            uploader.on("mouseDown",function(ev){
				S.log(ev.type);
				expect(hasMouse).toBeFalsy();
				expect(mouseDown).toBeFalsy();
				expect(hasClick).toBeFalsy();
                mouseDown = true;
            });
			
            uploader.on("mouseUp",function(ev){
				expect(hasMouse).toBeTruthy();
				expect(mouseDown).toBeFalsy();
				expect(hasClick).toBeFalsy();
                mouseUp = true;
            });
			
            uploader.on("click",function(ev){
				hasClick = true;
				expect(hasMouse).toBeTruthy();
				expect(mouseDown).toBeTruthy();
				expect(hasClick).toBeTruthy();
            });
			
			
			waitsFor(function(){ return fileSelect; },"file(s) never be selected ",20000);
			
			
        });
		
		it("should upload",function(){
            var	hasListComplete,
				errorTypesRegExp = /ioError|securityError|httpStatus/i;
            uploader.on("uploadError",function(ev){
				S.log(ev.type);
				expect(ev.originType).toBeDefined();
				expect(ev.originType).toMatch(errorTypesRegExp);
				switch(ev.originType){
					case "httpStatus":
					   expect(ev.status).toBeDefined();
					break;
					case "securityError":
                       expect(ev.message).toBeDefined();
                    break;
				}
				expect(ev.file).toBeDefined();
				expect(ev.file.cDate).toBeDefined();//creationDate
                expect(ev.file.mDate).toBeDefined();//modificationDate
                expect(ev.file.name).toBeDefined();
                expect(ev.file.size).toBeDefined();
                expect(ev.file.type).toBeDefined();
                expect(ev.file.id).toBeDefined();
				
            });
            
			
            uploader.on("uploadStart",function(ev){
				S.log(ev.type);
				expect(ev.file).toBeDefined();
                expect(ev.file.cDate).toBeDefined();//creationDate
                expect(ev.file.mDate).toBeDefined();//modificationDate
                expect(ev.file.name).toBeDefined();
                expect(ev.file.size).toBeDefined();
                expect(ev.file.type).toBeDefined();
                expect(ev.file.id).toBeDefined();
            });
            
            uploader.on("uploadProgress",function(ev){
				S.log(ev.type);
				expect(ev.bytesLoaded).not.toBeGreaterThan(ev.bytesTotal);
				
				expect(ev.file).toBeDefined();
                expect(ev.file.cDate).toBeDefined();//creationDate
                expect(ev.file.mDate).toBeDefined();//modificationDate
                expect(ev.file.name).toBeDefined();
                expect(ev.file.size).toBeDefined();
                expect(ev.file.type).toBeDefined();
                expect(ev.file.id).toBeDefined();
            });
            
            uploader.on("uploadComplete",function(ev){
				S.log(ev.type);
                expect(ev.file).toBeDefined();
                expect(ev.file.cDate).toBeDefined();//creationDate
                expect(ev.file.mDate).toBeDefined();//modificationDate
                expect(ev.file.name).toBeDefined();
                expect(ev.file.size).toBeDefined();
                expect(ev.file.type).toBeDefined();
                expect(ev.file.id).toBeDefined();
            });
			
			uploader.on("uploadCompleteData",function(ev){
				S.log(ev.type);
				expect(ev.data).toBeDefined(); // server response
                
                expect(ev.file).toBeDefined();
                expect(ev.file.cDate).toBeDefined();//creationDate
                expect(ev.file.mDate).toBeDefined();//modificationDate
                expect(ev.file.name).toBeDefined();
                expect(ev.file.size).toBeDefined();
                expect(ev.file.type).toBeDefined();
                expect(ev.file.id).toBeDefined();
            });
			
			uploader.on("uploadListComplete",function(ev){
				S.log(ev.type);
				hasListComplete = true;
            });
			
			runs(function(){
				uploader.uploadAll(server,'POST',{
					username:'kingfo',
					password:'f29939a25efabaef3b87e2cbfe641315',
					otherparams:'any'
				});
				
				uploader.lock();
			});
			
			
           waitsFor(function(){ return hasListComplete; },"never ListComplete, make sure that you keep your upload server is running !",10000);
		   
        });
		
	});
	
});