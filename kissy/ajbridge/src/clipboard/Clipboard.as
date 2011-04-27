package {
	import com.xintend.ajbridge.core.AJBridge;
	import com.xintend.display.Spirit;
	import com.xintend.ajbridge.local.clipboard.Clipboard;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.system.Security;
	import flash.events.Event;
	import flash.system.Security;
	import flash.utils.getDefinitionByName;
	
	/**
	 * ...
	 * @author Kingfo[Telds longzang]
	 */
	public class Clipboard extends Spirit {
		
		public function Clipboard() {
			Security.allowDomain("*");
		}
		
		override public function init():void {
			super.init();
			// entry point
			trace(1);
			
			var params: Object = stage.loaderInfo.parameters;
			var callbacks: Object = { };
			
			stage.scaleMode = "noScale";
			stage.align = "TL";
			
			// 获取外部配置
			AJBridge.bridge.deploy(params);
			
			// 创建并配置实例
			clipboard = new com.xintend.ajbridge.local.clipboard.Clipboard();
						clipboard.addEventListener(com.xintend.ajbridge.local.clipboard.Clipboard.CLIPBOARD_CLEAR, clipboardEventHandler);
			clipboard.addEventListener(com.xintend.ajbridge.local.clipboard.Clipboard.CLIPBOARD_SET, clipboardEventHandler);
			
			callbacks.getData =  clipboard.getData;
			callbacks.clearData =  clipboard.clearData;
			callbacks.setData =  clipboard.setData;
			
			data = params["data"];
			format = params["format"];
			
			hand = params["hand"] || false;
			btn = params["btn"] ||  false;
			
			hotspot = new Sprite();
			hotspot.addEventListener(Event.RESIZE, hotspotResize);
			hotspot.buttonMode = btn;
			hotspotResize();
			hotspot.addEventListener(MouseEvent.CLICK, mouseHandler);
			
			addChild(hotspot);
			
			if (hand || btn) {
				useHand(hand);
				setBtnMode(btn);
			}
			
			AJBridge.bridge.addCallback(callbacks);
			AJBridge.bridge.activate();
			AJBridge.bridge.contentReady();
			
			clipboard.setData(data, format);
		}
		
		
		private function hotspotResize(e:Event=null):void {
			hotspot.graphics.clear();
			hotspot.graphics.beginFill(0,0);
			hotspot.graphics.drawRect(0, 0, stage.stageWidth,stage.stageHeight);
			hotspot.graphics.endFill();
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
		
		private function mouseHandler(e: MouseEvent): void {
			switch(e.type) {
				case MouseEvent.CLICK:
					clipboard.execute();
				break;
			}
			
			// 鼠标事件需要单独转换  
			// 否则会堆栈溢出
			// flash 自身 bug ?
			AJBridge.bridge.sendEvent({type:e.type});
		}
		
		private function clipboardEventHandler(e:Event):void {
			AJBridge.bridge.sendEvent(e);
		}
		
		
		private var clipboard: com.xintend.ajbridge.local.clipboard.Clipboard;
		private var data:*;
		private var format:*;
		private var hotspot: Sprite;
		private var hand: Boolean;
		private var btn: Boolean;
	}
	
}