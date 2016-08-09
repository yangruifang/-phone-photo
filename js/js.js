;(function($){

	init();
	//初始化
	function init(){
		renderImg();
		addEvent();
	}
	//渲染小图
	function renderImg(){
		//获取图片的个数并将它们渲染到页面
		var total=15,
			imgHTML="",
			mRight=5,
			winW=$(window).width(),//视口的宽度
			imgW=Math.floor((winW-mRight*3)/4);
			console.log(imgW);

			for(var i=1;i<=total;i++){
				var m=mRight;
				if(i%4==0) m=0;
				imgHTML+="<li style='width:"+imgW+"px;height:"+imgW+"px;margin-right:"+m+"px;margin-bottom:"+mRight+"px'>"+
							"<canvas id='cvs"+i+"' width='"+imgW+"' height='"+imgW+"'>!!!</canvas>"+
						"</li>";

				var img=new Image();
					img.index=i;
				img.onload=function(){
					var x=(this.width-imgW)/2,
						y=(this.height-imgW)/2;
					//当图片加载成功后执行的操作，在这个FN里可以使用this来引用这个图片对象
					//给canvas绘制图片
					var cvs=document.getElementById("cvs"+this.index),
						cxt=cvs.getContext("2d");
						cxt.drawImage(this,-x,-y,this.width,this.height);
				}

				img.src="images/"+i+".jpg";
			}
			$("#smallPic").html(imgHTML);

	}

	//绑定事件
	function addEvent(){
		var imgIndex=0,//图片的索引
			len=$("#smallPic>li").size();
		$("#smallPic").on("tap","li",function(){
			//显示大图
			imgIndex=$(this).index();
			loadBigImg($(this).index());//将索引传入
			
		})

		//给大盒子绑定事件
		$("#bigwrap").on("tap",function(){
			$(this).hide();
		}).on("swipeRight",function(){
			imgIndex--;
			if(imgIndex<0) imgIndex=0;
			loadBigImg(imgIndex);
		}).on("swipeLeft",function(){
			imgIndex++;
			if(imgIndex>=len) imgIndex=len-1;
			loadBigImg(imgIndex);
		})
	}

	//显示大图
	function loadBigImg(n){
		var imgNum=n+1;//索引+1所对应大图的名
			//bigImgW=$("#bigPic").width(),
			//bigImgH=$("#bigPic").height();
		$("#bigwrap").show();
		$("#bigPic").attr("src","images/"+imgNum+".large.jpg");//设置大图的路径
		//$("#small").hide();
		
		//console.log(bigImgH+";"+bigImgW);得到的都是0，获取不到值
		var bigImg=new Image();
		bigImg.onload=function(){
			//根据图片是横向还是纵向设置大图片的尺寸及位置
			console.log(this.width);
			if(this.width>this.height){
				var scaleH=$(window).width()/this.width,
					h=scaleH*this.height;
					console.log(h);
				$("#bigPic").css({
					'width':"100%",
					"height":"auto",
					"margin-top":($(window).height()-h)/2+"px",
					"margin-left":0
				})
			}else{
				var scaleW=$(window).height()/this.height,
					W=scaleW*this.width;
				$("#bigPic").css({
					'width':"auto",
					"height":"100%",
					"margin-left":($(window).width()-W)/2+"px",
					"margin-top":0
				})
			}
		}
		bigImg.src="images/"+imgNum+".large.jpg";
		
		
	}
})(Zepto)