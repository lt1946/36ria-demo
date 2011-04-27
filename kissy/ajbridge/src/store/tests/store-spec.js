/**
 * @author kingfo  oicuicu@gmail.com
 * 
 File locations

	The default storage location for LSO files is operating system-dependent. LSO files are typically stored with a ".SOL" extension, within each User's directory. Note that for self-executing flash applications run on the local machine will show up as being run on a website, in the folder localhost.

    * Windows XP:
          o  %APPDATA%\Macromedia\Flash Player\#SharedObjects\<random code>\<domain>\<path - maybe°>\<object name>.sol
          o  %APPDATA%\Macromedia\Flash Player\macromedia.com\support\flashplayer\sys
          o C:\WINDOWS\system32\Macromed\[subdirectories]\filename.sol
          o For AIR Applications: %APPDATA%\<AIR Application Reverse Domain Name>\Local Store\#SharedObjects\<flash filename>.swf\<object name>.sol
    * Windows Vista and later:
          o For Web sites: %APPDATA%\Macromedia\Flash Player\#SharedObjects\<random code>\<domain>\<path - maybe°>\<object name>.sol
          o And also: %APPDATA%\Macromedia\Flash Player\macromedia.com\support\flashplayer\sys
          o For AIR Applications: Users\%USER%\AppData\Roaming\
    * Mac OS X:
          o For Web sites: ~/Library/Preferences/Macromedia/Flash Player/#SharedObjects/<random code>/<domain>/<path - maybe°>/<object name>.sol and ~/Library/Preferences/Macromedia/Flash Player/macromedia.com/support/flashplayer/sys/<object name>.sol
          o For AIR Applications: ~/Library/Preferences/<AIR Application Name>/Local Store/#SharedObjects/<flash filename>.swf/<object name>.sol
    * Linux/Unix:
          o ~/.macromedia/Flash_Player/#SharedObjects/<random id>/<domain>/<path - maybe°>/<flash filename>.swf/<object name>.sol

	° - Flash player can save the file in any path specified by the SWF developer, relative to the current domain.
 */
describe("store",function(){
	if(location.protocol === 'file:') return;
	
	var S = KISSY,
	    F = KISSY.Flash,
	    A = AJBridge,
		Store = A.Store,
		defconfig={
			src : "../store.swf",
            params:{
                bgcolor:"#C4C4C4"
            }	
		};
	
	describe("configurable store",function(){
		var swfId = "ks-ajb-store",
			container = "FC_ConfigurableStore",
			store,failed={},error={},swfReady={},contentReady={},
			KEY = "sample", VALUE="sampleData",
			config = S.merge(defconfig,
						 {
						 	id:swfId,
							attrs: {
				                width: 215,
				                height: 138
				            },
						 	flashvars:{
						 		zlib:true
						 	}
						 });
						 
		it("should ready", function(){
			store = new Store(container,config);
			store.on("failed", function(ev) {
			 	failed.isSucc = true;
				failed.message = ev.message;
	        });
	
	        store.on("error", function(ev) {
	           error.isSucc = true;
			   error.ev = ev;
	        });
		
	        store.on("swfReady", function(ev) {
	            swfReady.isSucc = true;	   
	            swfReady.ev = ev;	   
	        });
			
			store.on("contentReady", function(ev) {
	            contentReady.isSucc = true;	   
	            contentReady.ev = ev;
	        });
			
			store.on("create",function(ev) {
	           S.log("store create");
	        });
			
			store.on("storage",function(ev) {
	           S.log("store ["+ ev.message + "], oldValue:[" + ev.oldValue + "], newValue:[" + ev.newValue + "]" );
	        });
			
			store.on("pending",function(ev) {
				 S.log("store pending ...");
	        });
			
			store.on("clear",function(ev) {
				 S.log("store cleared ...");
	        });
			
			store.on("error",function(ev) {
				 S.log("store error:"+ev.message);
	        });
			store.on("open",function(ev) {
				 S.log("store open status:" + ev.message );
	        });
			store.on("close",function(ev) {
				 S.log("store close status:" + ev.message );
	        });
			store.on("destroy",function(ev) {
				 S.log("store destroy");
	        });
			
			store.on("status",function(ev) {
				 S.log("store status:" + ev.message);
	        });
			
			
			waitsFor(function(){ return swfReady.isSucc; },"bridge never ready",3000);
			runs(function(){
				expect(failed.isSucc).toBe(undefined);
				
				expect(error.isSucc).toBe(undefined);
				
				expect(swfReady.isSucc).toBeTruthy();
				expect(swfReady.ev.id).toBe(swfId);
				expect(swfReady.ev.id).not.toBe(container);
				
			});
			
			waitsFor(function(){ return contentReady.isSucc; },"store never ready",3000);
			runs(function(){
				store.clear();
				expect(store.getLength()).toEqual(0);
			});
		});
		
		it("should set/get item by key",function(){
			store.setItem(KEY,VALUE);
			expect(store.getItem(KEY)).toEqual(VALUE);
		});
		
		it("should increase length for store",function(){
			expect(store.getLength()).toEqual(1);
		});
		
		it("should not increase length for store",function(){
			store.setItem(KEY,VALUE);
			expect(store.getLength()).not.toEqual(2);
		});
		
		it("should get key by index",function(){
			expect(store.key(KEY)).toBe(null);
			expect(store.key(VALUE)).toBe(null);
			expect(store.key(0)).toEqual(KEY);
		});
		
		it("should remove item by key",function(){
			store.removeItem(VALUE);
			expect(store.key(0)).toEqual(KEY);
			store.removeItem(KEY);
			expect(store.key(0)).toBe(null);
		});
		
		it("should get lastest modification date",function(){
			var date = new Date();
			expect(store.getModificationDate().getHours()).toEqual(date.getHours());		
		});
		
		it("should has adequate dimensions",function(){
			expect(store.hasAdequateDimensions()).toBe(true);		
		});
		
		it("should use compression",function(){
			expect(store.getUseCompression()).toBe(true);		
		});
		
		it("should get disk space",function(){
			expect(store.getSize()).toBeGreaterThan(1);		
		});
		
		it("should destroy store",function(){
			store.destroy();		
		});
		
		it("should checkout other",function(){
			var oldStorageName,tmpData=S.now();
			
			store.on("checkout", function(ev) {
	            oldStorageName = ev.oldValue;	   
	        });
			
			runs(function(){
				store.setItem(KEY,VALUE);
				expect(store.getItem(KEY)).toEqual(VALUE);
				store.checkout('rootdata',"/");
			});
			
			waits(100);
			runs(function (){
				expect(store.getItem(KEY)).not.toEqual(tmpData);
				store.setItem(KEY,tmpData);
				expect(store.getItem(KEY)).toEqual(tmpData);
				store.destroy();
				store.checkout(oldStorageName);
			});
			
			waits(100);
			runs(function(){
				expect(store.getItem(KEY)).toEqual(VALUE);
				store.destroy();
			});
			
		});
		
		
		it("should display settings",function(){
			var isAllowShowSettings;
			store.on("showSettings",function(ev) {
	           isAllowShowSettings = true;
			   
	        });
			store.on("error",function(ev) {
	           S.log(ev);
	        });
			
			store.displaySettings();
			
			waits(100);
			runs(function(){
				expect(isAllowShowSettings).toBeTruthy();
			});
		});
		
		
		it("should set min disk space",function(){
			var minDiskSpace_Bytes = 1024 * 1024 , // 1 MB
				status; 
			
			store.on("error",function(ev) {
	           S.log(ev);
	        });
			
			status = store.setMinDiskSpace(minDiskSpace_Bytes);
			
			waits(100);
			runs(function(){
				expect(status).toEqual('pending'); // beacuse  store.displaySettings() is executing
			});
		});
		
	});
	
	describe("unconfigurable store",function(){
		var swfId = "ks-ajb-unconf-store",
			container = "FC_UnconfigurableStore",
			store,failed={},error={},swfReady={},contentReady={},
			KEY = "sample", VALUE="sampleData",
			config = S.merge(defconfig,
						 {
						 	id:swfId,
							attrs: {
				                width: 100,
				                height: 50
				            },
						 	flashvars:{
						 		zlib:true
						 	}
						 });
						 
		it("should  ready", function(){
			store = new Store(container,config);
			store.on("failed", function(ev) {
			 	failed.isSucc = true;
				failed.message = ev.message;
				S.log(ev);
	        });
	
	        store.on("error", function(ev) {
	           error.isSucc = true;
			   error.ev = ev;
			   S.log(ev.message);
	        });
		
	        store.on("swfReady", function(ev) {
	            swfReady.isSucc = true;	   
	            swfReady.ev = ev;	   
	        });
			
			store.on("contentReady", function(ev) {
	            contentReady.isSucc = true;	   
	            contentReady.ev = ev;
	        });
			
			store.on("create",function(ev) {
	           S.log("store create");
	        });
			
			store.on("storage",function(ev) {
	           S.log("store ["+ ev.message + "], oldValue:[" + ev.oldValue + "], newValue:[" + ev.newValue + "]" );
	        });
			
			store.on("pending",function(ev) {
				 S.log("store pending ...");
	        });
			
			store.on("clear",function(ev) {
				 S.log("store cleared ...");
	        });
			
			store.on("open",function(ev) {
				 S.log("store open status:" + ev.message );
	        });
			store.on("close",function(ev) {
				 S.log("store close status:" + ev.message );
	        });
			store.on("destroy",function(ev) {
				 S.log("store destroy");
	        });
			
			store.on("status",function(ev) {
				 S.log("store status:" + ev.message);
	        });
			
			
			waitsFor(function(){ return swfReady.isSucc; },"bridge never ready",3000);
			runs(function(){
				expect(failed.isSucc).toBe(undefined);
				
				expect(error.isSucc).toBe(undefined);
				
				expect(swfReady.isSucc).toBeTruthy();
				expect(swfReady.ev.id).toBe(swfId);
				expect(swfReady.ev.id).not.toBe(container);
				
			});
			
			waitsFor(function(){ return contentReady.isSucc; },"store never ready",3000);
			runs(function(){
				store.clear();
				expect(store.getLength()).toEqual(0);
			});
		});
		
		it("should set/get item by key",function(){
			store.setItem(KEY,VALUE);
			expect(store.getItem(KEY)).toEqual(VALUE);
		});
		
		it("should increase length for store",function(){
			expect(store.getLength()).toEqual(1);
		});
		
		it("should not increase length for store",function(){
			store.setItem(KEY,VALUE);
			expect(store.getLength()).not.toEqual(2);
		});
		
		it("should get key by index",function(){
			expect(store.key(KEY)).toBe(null);
			expect(store.key(VALUE)).toBe(null);
			expect(store.key(0)).toEqual(KEY);
		});
		
		it("should remove item by key",function(){
			store.removeItem(VALUE);
			expect(store.key(0)).toEqual(KEY);
			store.removeItem(KEY);
			expect(store.key(0)).toBe(null);
		});
		
		it("should get lastest modification date",function(){
			var date = new Date();
			expect(store.getModificationDate().getHours()).toEqual(date.getHours());		
		});
		
		it("should has adequate dimensions",function(){
			expect(store.hasAdequateDimensions()).toBe(false);		
		});
		
		it("should use compression",function(){
			expect(store.getUseCompression()).toBe(true);		
		});
		
		it("should get disk space",function(){
			expect(store.getSize()).toBeGreaterThan(1);		
		});
		
		it("should destroy store",function(){
			store.destroy();		
		});
		
		it("should checkout other",function(){
			var oldStorageName,tmpData=S.now();
			
			store.on("checkout", function(ev) {
	            oldStorageName = ev.oldValue;	   
	        });
			
			runs(function(){
				store.setItem(KEY,VALUE);
				expect(store.getItem(KEY)).toEqual(VALUE);
				store.checkout('rootdata',"/");
			});
			
			waits(100);
			runs(function (){
				expect(store.getItem(KEY)).not.toEqual(tmpData);
				store.setItem(KEY,tmpData);
				expect(store.getItem(KEY)).toEqual(tmpData);
				store.destroy();
				store.checkout(oldStorageName);
			});
			
			
			waits(100);
			runs(function(){
				expect(store.getItem(KEY)).toEqual(VALUE);
				store.destroy();
			});
			
		});
		
		
		it("should display settings",function(){
			var isAllowShowSettings;
			store.on("showSettings",function(ev) {
	           isAllowShowSettings = true;
	        });
			store.on("error",function(ev) {
	           S.log(ev);
	        });
			
			store.displaySettings();
			
			waits(100);
			runs(function(){
				expect(isAllowShowSettings).not.toBeTruthy();
			});
		});
		
		
		it("should set min disk space",function(){
			var minDiskSpace_Bytes = 1024 * 1024 , // 1 MB
				status; 
						
			status = store.setMinDiskSpace(minDiskSpace_Bytes);
			
			waits(100);
			runs(function(){
				expect(status).toEqual('error'); // beacuse flash "SecurityPanel" disabled
			});
		});
		
	});
	
});
