var canv1;
var canv2;

var ctx1;
var ctx2;
var lastTime;
var deltaTime;

var bgpic = new Image();

var canvWidth;
var canvHeight;

var ane;
var fruit;

var mom;
var baby;

var mx;//鼠标坐标
var my;

//定义数组，放置不同样式的属性
var babyTail = [];
var babyEye = [];
var babyBody = [];

//定义大鱼样式
var momTail = [];
var momEye = [];
var momBody = [];

//游戏分值  对象中已经定义了属性
var data;

var momBodyOra = [];
var momBodyBlue = [];

var wave;
var halo;

var dust;
var dustPic = [];

document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop();
}

function init(){
	//获得canvas context
	canv1 = document.getElementById("canvas1");//fish dust ui circle
	
	
	//element.addEventListener(event, function, useCapture) 
    // true - 事件句柄在捕获阶段执行 false- false- 默认。事件句柄在冒泡阶段执行
    
    //这个监听只执行一次
	canv1.addEventListener('mousemove',onMouseMove,false);
	ctx1 = canv1.getContext('2d');
	canv2 = document.getElementById("canvas2");//background ane fruits
	ctx2 = canv2.getContext('2d');
	
	canvWidth = canv1.width;
	canvHeight = canv2.height;
	
	mx = canvWidth*0.5;
	my = canvHeight*0.5;
	
	bgpic.src = "src/background.jpg"
	
	ane = new aneObject();
	ane.init();
	
	fruit = new fruitObj();
	fruit.init();
	
	mom = new momObject();
	mom.init();
	
	baby = new babyObject();
	baby.init();
	
	wave = new waveObject();
	wave.init();
	
	halo = new haloObject();
	halo.init();
	
	for(var i=0;i<7;i++){
		dustPic[i] = new Image();
		dustPic[i].src = "src/dust"+i+".png";
	}
	dust = new dustObject();
	dust.init();
	
	//这样写图片就是可变化的了（小鱼尾巴的序列帧放在babyTail这个数组里面了）
	for(var i=0;i<8;i++){
		babyTail[i] = new Image();
		//如果没有图片资源，画面会不断摆动，因为计时器和不断刷屏的关系
		babyTail[i].src = "src/babyTail"+i+".png";
	}
	
	for(var i=0;i<2;i++){
		babyEye[i] = new Image();
		babyEye[i].src = "src/babyEye"+i+".png";
	}
	
	for(var i=0;i<20;i++){
		babyBody[i] = new Image();
		babyBody[i].src = "src/babyFade"+i+".png";
	}
	
	/*
	 * 将大鱼图片帧存入数组之中
	 */
	for(var i=0;i<8;i++){
		momTail[i] = new Image();
		momTail[i].src = "src/bigTail"+i+".png";
	}
	
	for(var i=0;i<2;i++){
		momEye[i] = new Image();
		momEye[i].src = "src/bigEye"+i+".png";
	}
	
	/*
	 * 大鱼身体变化
	 */
	for(var i=0;i<8;i++){
		momBodyOra[i] = new Image();
		momBodyOra[i].src = "src/bigSwim"+i+".png";
	}
	for(var i=0;i<8;i++){
		momBodyBlue[i] = new Image();
		momBodyBlue[i].src = "src/bigSwimBlue"+i+".png";
	}
	
	
	//写在了初始化的外面去了，没有被执行
	//会报实例化中的属性没有被定义的错误
	data = new dataObject();
	
	//字体设置只需要定义一次，在初始化这里执行即可，放在data中会反复执行，占用资源
	ctx1.font = "25px Verdana";
	ctx1.textAlign = "center";
}


	

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	
	if(deltaTime>40) deltaTime=40;
	
//	console.log("deltaTime");
	drawbgground();
	ane.draw();
	fruitMonitor();
	fruit.draw();
	//x,y,w,h 不断清屏，防止图形多次绘制
	ctx1.clearRect(0,0,canvWidth,canvHeight);
	mom.draw();
	baby.draw();
	
	momFruitCollision();
	momBabyCollision();
	
	data.draw();
	wave.draw();
	halo.draw();
	
	dust.draw();
}

//获取到鼠标的位置
function onMouseMove(e){
	//不符合条件就失去鼠标监听功能
	if(!baby.gameover){
		if(e.offsetX || e.layerX){
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}
	
}
