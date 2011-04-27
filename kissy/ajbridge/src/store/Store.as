package {
	import com.xintend.ajbridge.core.AJBridge;
	import com.xintend.ajbridge.core.IAJBridgeContent;
	import com.xintend.ajbridge.local.store.LocalStorage;
	import com.xintend.ajbridge.local.store.StorageEvent;
	import com.xintend.display.Spirit;
	import com.xintend.javascript.utils.getLocation;
	import com.xintend.security.Whitelist;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.SecurityErrorEvent;
	import flash.system.Security;
	import flash.system.SecurityPanel;
	
	/**
	 * ...
	 * @author Kingfo[Telds longzang]
	 */
	public class Store extends Spirit implements IAJBridgeContent {
		
		public static const WHITELIST_FILE: String = "storage-whitelist.xml";
		
		
		public function Store():void {
			
		}
		
		override public function init():void {
			super.init();
			// entry point 
			
			var flashvars: Object = stage.loaderInfo.parameters;
			
			// 1. deploy ajbridge
			AJBridge.bridge.deploy(flashvars);
			
			
			
			// 2. get store config
			useCompression = flashvars['useCompression'] || flashvars['zlib'];
			secure = flashvars['secure'];
			browser = flashvars['browser'];
			
			
			// 3. load whitelist and create store
			loadWhitelist();
			
			AJBridge.bridge.activate();
		}
		
		
		
		public function dispatchContentReady(): void {
			AJBridge.bridge.sendEvent({type:AJBridge.CONTENT_READY});
		}
		
		
		private function loadWhitelist(): void {
			var fullPath: String;
			var parentPath: String;
			var hasTrailingSlash: Boolean;
			var whitelistPath: String 
			
			// 1. create and add event listener
			whitelist = new Whitelist();
			whitelist.addEventListener(Whitelist.TRUSTED_DOMAIN, onWhitelistEvent);
			whitelist.addEventListener(Whitelist.UNTRUSTED_DOMAIN, onWhitelistEvent);
			whitelist.addEventListener(IOErrorEvent.IO_ERROR, onWhitelistEvent);
			whitelist.addEventListener(SecurityErrorEvent.SECURITY_ERROR, onWhitelistEvent);
			
			// 2. set current page url , wait for whilte loaded 
			whitelist.urlMatches(getLocation().host || "example.yourdomain.net");
			
			// 3. get the swf path and remove trailing slashes
			fullPath = stage.loaderInfo.url;
			hasTrailingSlash = fullPath.charAt(fullPath.length - 1) == "/";
			if(hasTrailingSlash) fullPath = fullPath.slice(0, -1);
			
			// 4. get the path before the final slash (something like "/swffile.swf")
     		parentPath = fullPath.slice(0,fullPath.lastIndexOf("/"));
    		
			// 5. load it now
			whitelistPath = parentPath + "/" + WHITELIST_FILE;
			whitelist.loadPolicyFile(whitelistPath);
			
			trace("whitelist-path:" + whitelistPath);
		}
		
		private function onWhitelistEvent(e: Event): void {
			trace(e.type);
			switch(e.type) {
				case Whitelist.TRUSTED_DOMAIN:
					createLocalStorage();
				break;
				case Whitelist.UNTRUSTED_DOMAIN:
					AJBridge.bridge.sendEvent({type:StorageEvent.ERROR,message:e.type});
				break;
				default:
					AJBridge.bridge.sendEvent(e);
			}
		}
		
		private function createLocalStorage(): void {
			var callbacks: Object = { };
			
			localStorage = new LocalStorage(useCompression,browser,secure);
			
			localStorage.addEventListener(StorageEvent.CREATE, onStoreEvent);
			localStorage.addEventListener(StorageEvent.STORAGE, onStoreEvent);
			localStorage.addEventListener(StorageEvent.CLEAR, onStoreEvent);
			localStorage.addEventListener(StorageEvent.PENDING, onStoreEvent);
			localStorage.addEventListener(StorageEvent.SHOW_SETTINGS, onStoreEvent);
			localStorage.addEventListener(StorageEvent.ERROR, onStoreEvent);
			localStorage.addEventListener(StorageEvent.OPEN, onStoreEvent);
			localStorage.addEventListener(StorageEvent.STATUS, onStoreEvent);
			localStorage.addEventListener(StorageEvent.CHECKOUT, onStoreEvent);
			localStorage.addEventListener(StorageEvent.DESTROY, onStoreEvent);
			localStorage.addEventListener(StorageEvent.CLOSE, onStoreEvent);
			
			
			// same as html5 web storage interfaces
			// see: http://dev.w3.org/html5/webstorage/#the-storage-interface
			callbacks.getItem = localStorage.getItem;
			callbacks.setItem = localStorage.setItem;
			callbacks.removeItem = localStorage.removeItem;
			callbacks.getLength = localStorage.getLength;
			callbacks.key = localStorage.key;
			callbacks.clear = localStorage.clear;
			// other method:
			callbacks.checkout = localStorage.checkout;
			callbacks.destroy = localStorage.destroy;
			callbacks.getModificationDate = localStorage.getModificationDate;
			callbacks.getSize = localStorage.getSize;
			callbacks.getUseCompression = localStorage.getUseCompression;
			// extension method:						
			callbacks.hasAdequateDimensions = hasAdequateDimensions;
			callbacks.displaySettings = displaySettings;
			callbacks.setMinDiskSpace = setMinDiskSpace;
			
			
			AJBridge.bridge.addCallback(callbacks);

			dispatchContentReady();
		}
		
		private function setMinDiskSpace(value: int):String{
			if (!hasAdequateDimensions()) {
				AJBridge.bridge.sendEvent(new StorageEvent(StorageEvent.ERROR, "Make sure that your application window size is at least 215 x 138 pixels"));
				return "error";
			}
			return localStorage.setSize(value);
		}
		
		private function displaySettings():void{
			if (hasAdequateDimensions()) {
				Security.showSettings(SecurityPanel.LOCAL_STORAGE);
				AJBridge.bridge.sendEvent(new StorageEvent(StorageEvent.SHOW_SETTINGS));
			}else {
				AJBridge.bridge.sendEvent(new StorageEvent(StorageEvent.ERROR, "Make sure that your application window size is at least 215 x 138 pixels"));
			}
		}
		
		private function hasAdequateDimensions():Boolean{
			return (stage.stageHeight >= 138) && (stage.stageWidth >= 215);
		}
		
		
		private function onStoreEvent(e:Event):void {
			AJBridge.bridge.sendEvent(e);
		}
		
		
		private var useCompression: Boolean;
		private var secure: Boolean;
		private var browser: String;
		
		
		private var whitelist: Whitelist;
		private var localStorage: LocalStorage;
	}
	
}