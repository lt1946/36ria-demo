package lib  {
	
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	import flash.events.Event;
	
	/**
	*Handle
	*@describe 滑动块滑动
	*@autor Ben Merckx 
	*@note 明河共影注释
	*@site http://www.36ria.com/
	*@date 2010-06-02
	**/		
	public class Handle extends MovieClip {
		//滑动条
		private var slider : MovieClip = MovieClip(parent).slider;
		//鼠标的位置（X轴）
		private var mousePos : Number = 0;
		//滑动块要移动到的x轴位置
		public var goToX : Number = x;
		//构造函数
		public function Handle() : void{
			//鼠标手型
			buttonMode = true;
			//监听鼠标按下
			addEventListener(MouseEvent.MOUSE_DOWN,moveHandle);
			//监听鼠标放起（留意这里是监听舞台的事件）
			stage.addEventListener(MouseEvent.MOUSE_UP,stopHandle);
		}
		/*
		*鼠标按下
		*/
		private function moveHandle(_e:MouseEvent):void{
			//给鼠标位置赋值
			mousePos = mouseX;
		    stage.addEventListener(MouseEvent.MOUSE_MOVE,followHandle);
		}
		/*
		*鼠标放起
		*/		
		private function stopHandle(_e:MouseEvent):void{
			//删除鼠标移动移动事件
			stage.removeEventListener(MouseEvent.MOUSE_MOVE,followHandle);
		}
		/*
		*鼠标移动
		*/		
		private function followHandle(_e:MouseEvent):void{
			//新的位置
			var newPos:Number = stage.mouseX - mousePos;
			//滑动块影片剪辑旧的的x轴位置
			var orgX:Number = x;
			//确定滑动块的移动的位置，这里需要做二个判断，滑动块不能小于滑动条的x轴位置，也不能超过滑动条的宽度
			if(newPos < slider.x){
				goToX = slider.x;
			}
			else if(newPos > (slider.x + slider.width) - width){
				goToX = (slider.x + slider.width) - width;
			}else{
				goToX = newPos;
			}
			//改变滑动块位置
			x = goToX;
			//只有在滑动块有位移的时候才派发事件
			if( goToX != orgX ) dispatchEvent( new Event( "sliding", true ) );
		}		
	}
	
}
