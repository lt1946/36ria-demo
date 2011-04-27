package {
	import com.xintend.display.Spirit;
	import com.xintend.ajbridge.core.AJBridge;
	
	/**
	 * ...
	 * @author Kingfo[Telds longzang]
	 */
	public class AJBridge extends Spirit {
		
		public function AJBridge() {
			
		}
		
		override public function init():void {
			super.init();
			// entry point
			var params: Object = stage.loaderInfo.parameters;
			trace("AJBridge");
			com.xintend.ajbridge.core.AJBridge.bridge.deploy(params);
			
			com.xintend.ajbridge.core.AJBridge.bridge.activate();
		}
		
	}
	
}