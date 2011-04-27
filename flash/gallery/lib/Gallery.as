package lib
{
	import flash.display.MovieClip;
	import flash.net.URLLoader;
	import flash.events.Event;
	import flash.system.IME;
	import flash.net.URLRequest;
	import gs.TweenLite;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFieldAutoSize;
	import flash.text.Font;
	/**
	*Gallery
	*@describe 创建一个带有横向滚动条的图片画廊
	*@autor Ben Merckx 
	*@note 明河共影注释
	*@site http://www.36ria.com/
	*@date 2010-05-30
	**/
	public class Gallery extends MovieClip{
		//图片在图片剪辑容器的x、y偏移
		public var spaceBetween : Number = 15;
		public var defaultWidth : Number = 195;
		//图片尺寸
		public var imgWidth:Number = 180;
		public var imgHeight:Number = 110;
		//舞台宽度
		public var stageWidth : Number;
		//显示图片的个数 
		private var imagesToShow : Number = 4;
		//图片集数据路径
		private var backend:String = "test.xml";
		//xml数据读取器
		private var xmlLoader:URLLoader = new URLLoader;
		//XML数据
		private var xdata:XML;
		//图片上一个id
		private var orgImgId : Number;
		//图片数组
		public var images:Array = new Array();
		//图集的影片剪辑
		public var imagesClip:MovieClip = new MovieClip;
		
		//构造函数
		public function Gallery():void{
			//舞台宽度
			stageWidth = stage.width;
			imagesClip.y = 180;
			//将图集的影片剪辑添加到舞台
			addChild(imagesClip);
			//加载xml
			xmlLoader.load(new URLRequest(backend));
			//监听完成事件
			xmlLoader.addEventListener(Event.COMPLETE,loadImages);
			
			//监听滑动块滑动事件(sliding为自定义事件)
			theHandle.addEventListener("sliding",slide);
			
		}
		/**
		*读取图片
		*/		
		private function loadImages(_e:Event):void{
		     xdata = new XML(_e.target.data);
			 var i:Number = 0;
			 //遍历xml
			 for each(var img:XML in xdata.img){
				 //创建图片剪辑实例
				images[i] = new Img(img,this);
				//设置图片剪辑位置
				images[i].x = 200 * i;
				images[i].id = i;
				i++;
			 }
			 //移动第一张图片
			 goTo(0);
		}
		/**
		*当滑动块滑动后触发的事件
		*/		
		private function slide(_e:Event):void{
			//确定滑动块滑动后，位置所在滑动条的百分比
			var percent:Number = (theHandle.goToX - slider.x)/(slider.width - theHandle.width);
			//确定要滑动哪张图片
			var imgId:Number = Math.round(percent * ( images.length - 1 ));
			goTo( imgId );
		}
		/**
		*移动到指定图片
		*@param imgId {Number} 图片id（这里的id指的是图片数组的索引值）
		*/
		private function goTo(imgId : Number):void{
			//方向，正为读取下一个图片，即滚动条滑块向右，图片向左；负与之相反
			var direction:Number;
			if(orgImgId != imgId){
				//判断方向
				if ( imgId > orgImgId  ) direction = 1;
				else direction = -1;
				//激活id为imgId及其其后图片剪辑（所要激活数，取决于imagesToShow）
				for ( var i : Number = - Math.floor(imagesToShow/2); i <= Math.floor(imagesToShow/2); i++ ){
					var _id = imgId + i;
					if(_id < images.length && _id >=0) images[_id].makeActive(i,direction);
				}
			    //删除二端多余图片
				for(var j:Number = 0;j < imagesClip.numChildren ; j++){
					var tile:Img = imagesClip.getChildAt(j) as Img;
					if(tile.id < imgId - Math.floor(imagesToShow/2) || tile.id >  imgId + Math.floor(imagesToShow/2)){
						tile.deActive( direction );
					}
				}
				
				//图片计数
				tt.text = imgId + 1 + "/" + images.length;
				
			}
			orgImgId = imgId;
			
		}
	}	
}