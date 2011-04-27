/**
 * @author kingfo  oicuicu@gmail.com
 */
describe("clipboard",function(){
	if(location.protocol === 'file:') {
        return;
    }
	
	var S = KISSY,
        F = KISSY.Flash,
        A = AJBridge,
        Clipboard = A.Clipboard,
		DEFAULT_DATA = 'clipboard test data',
		defconfig={
			src : "../clipboard.swf",
            attrs: {
                width: 400,
                height: 300
            }	
		};
	
	describe("dynamic-method",function(){
		var container = 'FC_Dynamic',
			isReady,
			swfId='FP_Dynamic',
			config = S.merge(defconfig,{
				id:swfId,
				data:DEFAULT_DATA,
				params:{
					bgcolor:"#375BD0"
				},
				btn:true,
				hand:true
			}),
			clipboard;
		
		it("should be create",function(){
			clipboard = new Clipboard(container,config); 
			clipboard.on('contentReady',function(){
				isReady = true;
			});
			waitsFor(function(){ return isReady; },"swf content never ready",5000);
		});	
		
		it("should enabled",function(){
			var couldU = confirm("click the BLUE box ");
			waitsFor(function(){ return couldU; },"I need you help",5000);
			runs(function(){
				waits(1000);
				clipboard.on("mouseUp",function(){
					expect(clipboard.getData()).toEqual(DEFAULT_DATA);
					clipboard.clearData();
					expect(clipboard.getData()).not.toEqual(DEFAULT_DATA);
					clipboard.setData(DEFAULT_DATA);
					expect(clipboard.getData()).toEqual(DEFAULT_DATA);
					clipboard.clearData();
					expect(clipboard.getData()).not.toEqual(DEFAULT_DATA);
				});
			});
		});
		
	});
	
	describe("static-method",function(){
		var swfId='FP_Static',
			config = S.merge(defconfig,{id:swfId}),
			isReady,
			clipboard;
		
		it("should exist",function(){
			clipboard = new Clipboard(swfId,config); 
			clipboard.on('swfReady',function(){
				isReady = true;
			});
			waitsFor(function(){ return isReady; },"swf content never ready",5000);
		});
		
		it("should enabled",function(){
			var couldU = confirm("click the GRAY box ");
			waitsFor(function(){ return couldU; },"I need you help",5000);
			runs(function(){
				waits(1000);
				clipboard.on("mouseUp",function(){
					expect(clipboard.getData()).toEqual(DEFAULT_DATA);
					clipboard.clearData();
					expect(clipboard.getData()).not.toEqual(DEFAULT_DATA);
					alert(DEFAULT_DATA);
					clipboard.setData(DEFAULT_DATA);
					expect(clipboard.getData()).toEqual(DEFAULT_DATA);
					clipboard.clearData();
					expect(clipboard.getData()).not.toEqual(DEFAULT_DATA);
				});
			});
		});	
	});
	
});