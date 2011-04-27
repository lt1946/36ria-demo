/**
 * AJBridge test
 * asynchronous specs see: http://pivotal.github.com/jasmine/async.html
 * @author kingfo oicuicu@gmail.com
 */
describe("ajbridge",function(){
	
	if(location.protocol === 'file:') {
        return;
    }
	
	var S = KISSY,
        F = KISSY.Flash,
        A = AJBridge,
		EVENT_HANDLER = 'KISSY.AJBridge.eventHandler',
		defconfig={
			src : "../ajbridge.swf",
            attrs: {
                width: 400,
                height: 300
            },
            params:{
                bgcolor:"#C4C4C4"
            }	
		};
	
	describe("ajbrdge self test",function(){
		it("should be created",function(){
			expect(A.version).toBeDefined();
			expect(A.version).toMatch(/\d+.\d+.\d+/);
		});
	});
	
	describe("dynamic-publishing and auto init",function(){
		var container = "FC_AutoInit",
			swfId = "FP_AutoInit",
			config = S.merge(defconfig,{id:swfId}),
			bridge,
			failed={},error={},as3init={},addCallback={},swfReady={};
			
			
			it("should be create and init" , function(){
				bridge = new A(container,config);
				
				bridge.on("failed", function(ev) {
				 	failed.isSucc = true;
					failed.message = ev.message;
		        });
		
		        bridge.on("error", function(ev) {
		           error.isSucc = true;
				   error.ev = ev;
		        });
		
		        bridge.on("as3Init", function(ev) {
		           as3init.isSucc = true;
				   as3init.ev = ev;
		        });
		
		        bridge.on("addCallback", function(ev) {
		           addCallback.isSucc = true;
				   addCallback.ev=ev;
		        });
		
		        bridge.on("swfReady", function(ev) {
		            swfReady.isSucc = true;	   
		            swfReady.ev = ev;	
		        });
				
				
				waitsFor(function(){ return swfReady.isSucc; },"bridge never ready",5000);
				
				runs(function(){
					expect(failed.isSucc).toBe(undefined);
					
					expect(error.isSucc).toBe(undefined);
					
					expect(as3init.isSucc).toBeTruthy();
					
					expect(addCallback.isSucc).toBeTruthy();
					expect(addCallback.ev).toBeDefined();
					expect(addCallback.ev.funcList).toBeDefined();
					expect(addCallback.ev.funcList.length).toBeDefined();
					expect(addCallback.ev.funcList.length).toBeGreaterThan(1);
					expect(addCallback.ev.funcList).toContain('activate');
					expect(addCallback.ev.funcList).toContain('getReady');
					expect(addCallback.ev.funcList).toContain('getCoreVersion');
					
					expect(swfReady.isSucc).toBeTruthy();
					expect(swfReady.ev.id).toBe(swfId);
					expect(swfReady.ev.entry).toBe(EVENT_HANDLER);
					expect(swfReady.ev.id).not.toBe(container);
					
					expect(bridge.getReady()).toBe('ready');
					expect(bridge.getCoreVersion()).toMatch(/\d+.\d+.\d+/);
					
				});
			});
	});
	
	describe("dynamic-publishing and manual init",function(){
		var container = "FC_ManualInit",
			swfId = "FP_ManualInit",
			config = S.merge(defconfig,{id:swfId}),
			bridge,
			failed={},error={},as3init={},addCallback={},swfReady={};
			
			
			it("should create and init" , function(){
				bridge = new A(container,config,true);
				
				bridge.on("failed", function(ev) {
				 	failed.isSucc = true;
					failed.message = ev.message;
		        });
		
		        bridge.on("error", function(ev) {
		           error.isSucc = true;
				   error.ev = ev;
		        });
		
		        bridge.on("as3Init", function(ev) {
		           as3init.isSucc = true;
				   as3init.ev = ev;
		        });
		
		        bridge.on("addCallback", function(ev) {
		           addCallback.isSucc = true;
				   addCallback.ev=ev;
		        });
		
		        bridge.on("swfReady", function(ev) {
		            swfReady.isSucc = true;	   
		            swfReady.ev = ev;	   
		        });
				
				runs(function(){
					
					expect(failed.isSucc).toBe(undefined);
					expect(error.isSucc).toBe(undefined);
					
					expect(as3init.isSucc).toBe(undefined);
					
					expect(addCallback.isSucc).toBe(undefined);
					expect(addCallback.ev).toBe(undefined);
					
					expect(swfReady.isSucc).toBe(undefined);
					expect(swfReady.ev).toBe(undefined);
					
					expect(bridge.getReady()).not.toBe('ready'); // same as bridge.swf['getReady']
					expect(error.isSucc).toBeTruthy(); // beacuse bridge.swf undefined. 
					
					
				});
				
				// manual init
				runs(function(){
					
					error = {};
					
					bridge.init();
				});
				
				waitsFor(function(){ return swfReady.isSucc; },"bridge never ready",5000);
				
				runs(function(){
					expect(failed.isSucc).toBe(undefined);
					
					expect(error.isSucc).toBe(undefined);
					
					expect(as3init.isSucc).toBeTruthy();
					
					expect(addCallback.isSucc).toBeTruthy();
					expect(addCallback.ev).toBeDefined();
					expect(addCallback.ev.funcList).toBeDefined();
					expect(addCallback.ev.funcList.length).toBeDefined();
					expect(addCallback.ev.funcList.length).toBeGreaterThan(1);
					expect(addCallback.ev.funcList).toContain('activate');
					expect(addCallback.ev.funcList).toContain('getReady');
					expect(addCallback.ev.funcList).toContain('getCoreVersion');
					
					expect(swfReady.isSucc).toBeTruthy();
					expect(swfReady.ev.id).toBe(swfId);
					expect(swfReady.ev.entry).toBe(EVENT_HANDLER);
					expect(swfReady.ev.id).not.toBe(container);
					
					expect(bridge.getReady()).toBe('ready');
					expect(bridge.getCoreVersion()).toMatch(/\d+.\d+.\d+/);
					
				});
				
				
				
			});
	});
	
	describe("static-publishing and auto init",function(){
		var swfId = "FP-StaticPublish-AI",
			config = S.merge(defconfig,{id:swfId}),
			bridge,
			failed={},error={},as3init={},addCallback={},swfReady={};
			it("should be created" , function(){
				expect(S.DOM.get("#"+swfId)).toBeDefined();
			});
			it("should init" , function(){
				bridge = new A(swfId,config);
				
				bridge.on("failed", function(ev) {
				 	failed.isSucc = true;
					failed.message = ev.message;
		        });
		
		        bridge.on("error", function(ev) {
		           error.isSucc = true;
				   error.ev = ev;
		        });
		
		        bridge.on("as3Init", function(ev) {
		           as3init.isSucc = true;
				   as3init.ev = ev;
		        });
		
		        bridge.on("addCallback", function(ev) {
		           addCallback.isSucc = true;
				   addCallback.ev=ev;
		        });
		
		        bridge.on("swfReady", function(ev) {
		            swfReady.isSucc = true;	   
		            swfReady.ev = ev;
					S.log(ev.type);	  
		        });
				
				waitsFor(function(){ return swfReady.isSucc; },"bridge never ready",5000);
				
				runs(function(){
					
					expect(failed.isSucc).toBe(undefined);
					expect(error.isSucc).toBe(undefined);
					
					expect(swfReady.isSucc).toBeTruthy();
					expect(swfReady.ev.id).toBe(swfId);
					expect(swfReady.ev.entry).toBe(EVENT_HANDLER);
					
					expect(bridge.getReady()).toBe('ready');
					expect(bridge.getCoreVersion()).toMatch(/\d+.\d+.\d+/);
				});
			});
	});
	
	describe("static-publishing and manual init",function(){
		var swfId = "FP-StaticPublish-MI",
			config = S.merge(defconfig,{id:swfId}),
			bridge,
			failed={},error={},as3init={},addCallback={},swfReady={};
			it("should be created" , function(){
				expect(S.DOM.get("#"+swfId)).toBeDefined();
			});
			it("should init" , function(){
				bridge = new A(swfId,config,true);
				
				bridge.on("failed", function(ev) {
				 	failed.isSucc = true;
					failed.message = ev.message;
		        });
		
		        bridge.on("error", function(ev) {
		           error.isSucc = true;
				   error.ev = ev;
		        });
		
		        bridge.on("as3Init", function(ev) {
		           as3init.isSucc = true;
				   as3init.ev = ev;
		        });
		
		        bridge.on("addCallback", function(ev) {
		           addCallback.isSucc = true;
				   addCallback.ev=ev;
		        });
		
		        bridge.on("swfReady", function(ev) {
		            swfReady.isSucc = true;	   
		            swfReady.ev = ev;
					S.log(ev.type);	  
		        });
				
				
				
				runs(function(){
					expect(failed.isSucc).toBe(undefined);
					expect(error.isSucc).toBe(undefined);
					
					expect(as3init.isSucc).toBe(undefined);
					
					
					expect(swfReady.isSucc).toBe(undefined);
					expect(swfReady.ev).toBe(undefined);
					
					expect(bridge.getReady()).not.toBe('ready'); // same as bridge.swf['getReady']
					expect(error.isSucc).toBeTruthy(); // beacuse bridge.swf undefined. 
				});
				
				runs(function(){
					error = {};
					bridge.init();
				});
				
				waitsFor(function(){ return swfReady.isSucc; },"bridge never ready",5000);
				
				runs(function(){
					
					expect(failed.isSucc).toBe(undefined);
					expect(error.isSucc).toBe(undefined);
					
					
					expect(swfReady.isSucc).toBeTruthy();
					expect(swfReady.ev.id).toBe(swfId);
					expect(swfReady.ev.entry).toBe(EVENT_HANDLER);
					
					expect(bridge.getReady()).toBe('ready');
					expect(bridge.getCoreVersion()).toMatch(/\d+.\d+.\d+/);
				});
			});
	});
	
	
});
