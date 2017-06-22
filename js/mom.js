var momObject = function(){
	
	//这里就相当于定义属性了
	this.x;
	this.y;
//	this.momEye = new Image();
//	this.momBody = new Image();
//	this.momTail = new Image();
	this.angle;
	
	this.momTailTimer = 0;
	this.momTailCount = 0;
	
	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 2000;
	
	this.momBodyCount = 0;
}

momObject.prototype.init = function(){
	this.x=canvWidth*0.5;
	this.y=canvHeight*0.5;
//加载图片的数据
//	this.momEye.src = "src/bigEye0.png";
//	this.momBody.src = "src/bigSwim0.png";
//	this.momTail.src = "src/bigTail0.png";
	
	this.angle = 0;
}

momObject.prototype.draw = function(){
	
	//数值越大越慢,鱼跟随运动的方法，x坐标和y坐标方向分别计算
	this.x = lerpDistance(mx,this.x,0.98);
	this.y = lerpDistance(my,this.y,0.985);
	
	//旋转功能
	var deltaX = mx - this.x;
	var deltaY = my - this.y;
	
	//获得鼠标与鱼的角度
	var distanceAngle = Math.atan2(deltaY,deltaX) + Math.PI;
	
	this.angle = lerpAngle(distanceAngle,this.angle,0.6);
	
	/*
	 大鱼尾巴摆动功能实现,计时器实现时间控制
	 */
	this.momTailTimer += deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount = (this.momTailCount+1) % 8;
		this.momTailTimer %= 50;
	}
	
	/*
	 * 大鱼眨眼睛时间控制
	 */
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		//取余是让图片能够循环播放
		this.momEyeCount = (this.momEyeCount+1)%2;
		this.momEyeTimer %= this.momEyeInterval;
		
		if(this.momEyeCount == 0){
			//这个值越大，累加时间比它大需要的时间就越久
			this.momEyeInterval = Math.random()*2500+2000;
		}else{
			this.momEyeInterval = 200;
		}
	}
	
	
	ctx1.save();
	//将传入的x,y坐标设置为画布的坐标系原点
	ctx1.translate(this.x,this.y);
	//实现大鱼的旋转功能
	ctx1.rotate(this.angle);
	//所有元素反方向移动一半，图像就处于中心位置了
	var momTailCount = this.momTailCount;
	ctx1.drawImage(momTail[momTailCount],-momTail[momTailCount].width*0.5+30,-momTail[momTailCount].height*0.5);
	
	var momBodyCount = this.momBodyCount;
	if(data.double == 1 ){
		//如果没看见图片，很有可能在屏幕外面去了
		ctx1.drawImage(momBodyOra[momBodyCount],-momBodyOra[momBodyCount].width*0.5,-momBodyOra[momBodyCount].height*0.5);
	}else{
		ctx1.drawImage(momBodyBlue[momBodyCount],-momBodyBlue[momBodyCount].width*0.5,-momBodyBlue[momBodyCount].height*0.5);
	}
	
	var momEyeCount = this.momEyeCount;
	ctx1.drawImage(momEye[momEyeCount],-momEye[momEyeCount].width*0.5,-momEye[momEyeCount].height*0.5);
	ctx1.restore();
}


