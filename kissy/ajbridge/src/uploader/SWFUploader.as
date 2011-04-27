package {
	import com.adobe.serialization.json.JSON;
	import com.xintend.ajbridge.core.AJBridge;
	import com.xintend.ajbridge.net.uploader.Uploader;
	import com.xintend.display.Spirit;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.events.DataEvent;
	import flash.events.ErrorEvent;
	import flash.events.Event;
	import flash.events.HTTPStatusEvent;
	import flash.events.IOErrorEvent;
	import flash.events.MouseEvent;
	import flash.events.ProgressEvent;
	import flash.events.SecurityErrorEvent;
	import flash.system.Security;
	
	/**
	 * ...
	 * @author Kingfo[Telds longzang]
	 */
	public class SWFUploader extends Spirit {
		
		public function SWFUploader():void {
			Security.allowDomain("*");
		}
		
		override public function init():void {
			super.init();
			// entry point
			
			var params: Object = stage.loaderInfo.parameters;
			
			stage.scaleMode = "noScale";
			stage.align = "TL";
			
			AJBridge.bridge.deploy(params);
			
			defaultServerURL = params["ds"];
			defaultServerParameters = params["dsp"];
			
			
			
			hand = params["hand"] || false;
			btn = params["btn"] ||  false;
			
			if (defaultServerParameters) {
				defaultServerParameters = defaultServerParameters.replace(/\'/g,'"');
				defaultServerParameters = JSON.decode(defaultServerParameters);
			}
			// 2.创建并配置上传实例
			uploader = new Uploader();
			// 3.创建监听程序
			uploader.addEventListener(Uploader.UPLOAD_LOCK, eventHandler);
			uploader.addEventListener(Uploader.UPLOAD_UNLOCK, eventHandler);
			uploader.addEventListener(Uploader.FILE_SELECT, eventHandler);
			uploader.addEventListener(Uploader.BROWSE_CANCEL, eventHandler);
			uploader.addEventListener(Uploader.UPLOAD_CLEAR, eventHandler);
			uploader.addEventListener(Uploader.UPLOAD_START, eventHandler);
			uploader.addEventListener(Uploader.UPLOAD_PROGRESS, eventHandler);
			uploader.addEventListener(Uploader.UPLOAD_COMPLETE, eventHandler);
			uploader.addEventListener(Uploader.UPLOAD_COMPLETE_DATA, eventHandler);
			uploader.addEventListener(Uploader.UPLOAD_LIST_COMPLETE, eventHandler);
			uploader.addEventListener(Uploader.UPLOAD_ERROR, eventHandler);
			
			// 4.注册 AJBridge
			var callbacks: Object = { 
					upload: uploader.upload,
					uploadAll: uploader.uploadAll,
					cancel: uploader.cancel,
					getFile: uploader.getFile,
					removeFile: uploader.removeFile,
					lock: uploader.lock,
					unlock: uploader.unlock,
					clear: uploader.clear,
					/*简单的多接口*/
					multifile: uploader.setAllowMultipleFiles,
					setAllowMultipleFiles: uploader.setAllowMultipleFiles,
					filter: uploader.setFileFilters,
					setFileFilters: uploader.setFileFilters,
					/* 增加的接口 */
					browse: browse,
					setBtnMode: setBtnMode,
					useHand: useHand
				};
			
			
			
			AJBridge.bridge.addCallback(callbacks);
			
			
			
			hotspot = new Sprite();
			hotspot.addEventListener(Event.RESIZE, hotspotResize);
			hotspot.buttonMode = btn;
			hotspotResize();
			addChild(hotspot);
			
			
			if (hand || btn) {
				useHand(hand);
				setBtnMode(btn);
			}
			
			hotspot.addEventListener(MouseEvent.CLICK, mouseHandler);
			
			
			AJBridge.bridge.activate();
			
			uploader.init(defaultServerURL, defaultServerParameters);			
			
			AJBridge.bridge.contentReady();
		}
		
		private function useHand(value:Boolean):void{
			hotspot.useHandCursor = value;
		}
		
		private function setBtnMode(value:Boolean):void{
			if (value) {
				hotspot.addEventListener(MouseEvent.MOUSE_OVER, mouseHandler);
				hotspot.addEventListener(MouseEvent.MOUSE_DOWN, mouseHandler);
				hotspot.addEventListener(MouseEvent.MOUSE_UP, mouseHandler);
				hotspot.addEventListener(MouseEvent.MOUSE_OUT, mouseHandler);
			}else {
				hotspot.removeEventListener(MouseEvent.MOUSE_OVER, mouseHandler);
				hotspot.removeEventListener(MouseEvent.MOUSE_DOWN, mouseHandler);
				hotspot.removeEventListener(MouseEvent.MOUSE_UP, mouseHandler);
				hotspot.removeEventListener(MouseEvent.MOUSE_OUT, mouseHandler);
			}
		}
		
		
		
		/**
		 * 定义浏览模式
		 * @param	mulit
		 * @param	fileFilters
		 */
		private function browse(mulit: Boolean = true, fileFilters: Array = null):Boolean{
			if (uploader.isLocked) return false;
			uploader.setFileFilters(fileFilters);
			uploader.setAllowMultipleFiles(mulit);
			return true;
 		}
		
		
		
		private function eventHandler(e: Event): void {
			switch(e.type) {
				case Uploader.FILE_SELECT:
				case Uploader.BROWSE_CANCEL:
					hotspot.addEventListener(MouseEvent.CLICK, mouseHandler);
				break;
			}
			AJBridge.bridge.sendEvent(e);
		}
		
		private function mouseHandler(e: MouseEvent): void {
			switch(e.type) {
				case MouseEvent.CLICK:
					uploader.browse();
					hotspot.removeEventListener(MouseEvent.CLICK, mouseHandler);
				break;
			}
			
			// 鼠标事件需要单独转换  
			// 否则会堆栈溢出
			// flash 自身 bug ?
			AJBridge.bridge.sendEvent({type:e.type});
		}
		
		
		private function hotspotResize(e: Event = null): void {
			hotspot.graphics.clear();
			hotspot.graphics.beginFill(0,0);
			hotspot.graphics.drawRect(0, 0, stage.stageWidth,stage.stageHeight);
			hotspot.graphics.endFill();
		}
		
		private var uploader: Uploader;
		private var defaultServerURL: String;
		private var defaultServerParameters: * ;
		private var hotspot: Sprite;
		private var hand: Boolean;
		private var btn: Boolean;
	}
	
}