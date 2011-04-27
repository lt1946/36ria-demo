package lib {
	
	import flash.display.MovieClip;
	import flash.display.Loader;
	import flash.display.Bitmap;
	import flash.net.URLRequest;
	import flash.events.Event;
	import fl.transitions.easing.*;	
	import fl.motion.easing.*;	
	import gs.TweenLite;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFieldAutoSize;
	import flash.text.Font;
	
	/**
	*Img
	*@describe 生成一个图片
	*@autor Ben Merckx 
	*@note 明河共影注释
	*@site http://www.36ria.com/
	*@date 2010-05-30
	**/	
	public class Img extends MovieClip {
		//图片id
		public var id:Number;
		//图片路径
		private var src:String;
		//图片加载器
		private var imageLoader:Loader = new Loader();
		//图片尺寸
		public var imgWidth:Number;
		public var imgHeight:Number;		
		//图片名
		public var ImgName:String;
		//主文档画廊类
		private var main:Gallery;
		private var orgWidth:Number = 0;
		private var orgHeight:Number = 0;
		private var fontName:String;
		//图片剪辑是否处于激活状态
		private var deactivating:Boolean = false;
		public var active : Boolean = false;
		//构造函数
		/**
		*@param load {String} 图片路径
		*@param m {Object} 主文档画廊类实例
		*/
		public function Img(load:String,m:Gallery):void {
			orgWidth = width;
			orgHeight = height;
			//设置图片路径
			src = load;
			//主文档画廊类实例
			main = m;
			//透明度
			alpha = 0;
			//设置图片宽度
			imgWidth = main.imgWidth;
			imgHeight = main.imgHeight;
			//获取字体名
			fontName = Font.enumerateFonts()[0].fontName;
			
		}
		
		/**
		*读取图片
		*/
		public function loadImage():void{
			imageLoader.load(new URLRequest(src));
			imageLoader.contentLoaderInfo.addEventListener(Event.COMPLETE,displayImage);
		}
		/**
		*显示图片
		*/
		public function displayImage(_e : Event):void{
			//如果此id后还存在图片实例，加载下一个图片
			if(main.images[id + 1] != null && !main.images[id + 1].parent) main.images[id + 1].loadImage();
			//控制在缩放时对位图进行平滑处理
			Bitmap(imageLoader.content).smoothing = true;
			//设置图片位置
		    imageLoader.x = main.spaceBetween/2 - ( orgWidth /2 );  
            imageLoader.y = main.spaceBetween/2 - ( orgHeight /2 );
			imageLoader.width = imgWidth;
			imageLoader.height = imgHeight;
		    //添加到图片剪辑
		    addChild( imageLoader );
			
			//显示文件名
			var descr:TextField = new TextField();
			var extensionIndex:Number = src.lastIndexOf( '/' );
			ImgName = src.substr(extensionIndex+1,src.length);
			descr.text = ImgName;
			descr.y = imageLoader.y + imageLoader.height ;
			descr.x = 10 - ( orgWidth /2 );
			//指定将文本视为左对齐文本
			descr.autoSize = TextFieldAutoSize.LEFT;
			//嵌入字体
			descr.embedFonts = true;
			//格式化文字
			var format:TextFormat = new TextFormat(fontName, 12, 0);
			format.color = 0x5B4846; 
			descr.setTextFormat(format);   
			addChild( descr );
			
		}
		/**
		*将图片添加到舞台，同时移动图片
		*@param position {Number} 位置
		*@param direction {Number} 方向
		*/		
		public function makeActive(position : Number, direction : Number):void{
			//处于激活状态
			 deactivating = false;
			//检测图片剪辑是否有父容器，没有的话，将图片剪辑加到图片集剪辑
			if ( parent == null ) 
			{
				//设置该图片剪辑的初始x轴坐标
				x = ( direction == 1 ? main.stageWidth + main.defaultWidth * 1 : - main.defaultWidth * 2 );
				//隐藏该该图片剪辑的
				alpha = 0;				
				//将此图片剪辑添加到图片集剪辑
				main.imagesClip.addChild(this);
			}
			//显示该图片剪辑
			visible = true;
			//读取图片
			if ( numChildren < 3 ) loadImage();
			//设置图片剪辑的索引值
			parent.setChildIndex(this,(parent.numChildren - 1) - Math.abs(position));
			
			//设置图片剪辑距中间位置的偏移
			var extra:Number = Math.round(position * (main.defaultWidth + main.spaceBetween));
			//设置图片剪辑的新的x轴位置
			var newX:Number = Math.round(main.stageWidth/2) + extra;
			//将图片剪辑移动到指定位置
			flyTo(newX,false,(position == 0 ? 1.2 : 1 ) );
			
		}
		/**
		*将图片添加到舞台，同时移动图片
		*@param position {Number} 位置
		*@param direction {Number} 方向
		*/				
		public function deActive(direction : Number):void{
			//图片剪辑不处于移动状态
			if ( ! deactivating ){
				active = false; 
				var moveTo : Number = ( direction != 1 ? main.stageWidth + main.defaultWidth * 2 : parent.x - main.defaultWidth * 2 );
				flyTo( moveTo,true);
				deactivating = true;				
			}
		}
		/**
		*将图片剪辑移动到指定位置
		*@param newX {Number} 新的x轴位置
		*@param removeAfter {Boolean} 
		*@param scale {Number} 缩放
		*/				
		private function flyTo(newX:Number,removeAfter:Boolean,scale:Number = 1):void{
			//TweenLite缓动类参数
			var tweeningOptions : Object = new Object;
			tweeningOptions.x = newX;
			if(removeAfter){
				//移除动画
				tweeningOptions.ease = Linear.easeIn;
				tweeningOptions.alpha = 0;
				tweeningOptions.scaleX = tweeningOptions.scaleY = 0.3;
				tweeningOptions.visible = false;				
			}else{
				//比例缩放
				tweeningOptions.scaleX = tweeningOptions.scaleY = scale;
				//旋转
				tweeningOptions.rotation = (Math.random() * 20) - 10;
				//ease效果
				tweeningOptions.ease = Back.easeOut;
				//透明度
				tweeningOptions.alpha = 1;			
			}
			//图片剪辑移动动画开始
            TweenLite.to(this,0.4,tweeningOptions);
		}
		
		
	}
	
}
