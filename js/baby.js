var babyObject = function(){
	
//图片为动态的了，静态的测试数据就需要删掉了
//	this.babyEye = new Image();
//	this.babyBody = new Image();
//	this.babyTail = new Image();
	
	this.x;
	this.y;
	this.angle;
	
	this.babyTailTimer;
	this.babyTailCount;
	
	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	//这里如果设成0，小鱼眼睛会一直闭着，因为下面的判断是（时间间隔>deltatime）才会执行眼睛图片轮播的方法
	this.babyEyeInterval = 1000;
	
	this.babyBodyTimer=0;
	this.babyBodyCount=0;
	
	this.gameover = false;
}


babyObject.prototype.init = function(){
	this.x=canvWidth*0.5 - 70;
	this.y=canvHeight*0.5;
	//加载图片的数据
//	this.babyEye.src = "src/babyEye0.png"
//	this.babyBody.src = "src/babyFade0.png";
//	this.babyTail.src = "src/babyTail0.png";
	
	this.angle = 0;
	this.babyTailCount = 0;
	this.babyTailTimer = 0;
}

babyObject.prototype.draw = function(){
	//数值越大越慢 这两条语句控制鱼的运动，往目标方向控制坐标的大小
	this.x = lerpDistance(mom.x-10,this.x,0.98);
	this.y = lerpDistance(mom.y,this.y,0.985);
	//旋转功能,小鱼的旋转是根据mom的坐标进行旋转的，不要写成鼠标坐标
	var deltaX = mom.x - this.x;
	var deltaY = mom.y - this.y;
	//获得鼠标与小鱼的角度
	var distanceAngle = Math.atan2(deltaY,deltaX) + Math.PI;
	this.angle = lerpAngle(distanceAngle,this.angle,0.6);
	
	/*
	 小鱼尾巴摆动功能实现,计时器实现时间控制
	 */
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer>50){
		this.babyTailCount = (this.babyTailCount+1) % 8;
		this.babyTailTimer %= 50;
	}
	
	/*
	 * 小鱼眨眼睛时间控制
	 */
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		//取余是让图片能够循环播放
		this.babyEyeCount = (this.babyEyeCount+1)%2;
		this.babyEyeTimer %= this.babyEyeInterval;
		
		if(this.babyEyeCount == 0){
			//这个值越大，累加时间比它大需要的时间就越久
			this.babyEyeInterval = Math.random()*1500+2000;
		}else{
			this.babyEyeInterval = 200;
		}
	}
	
	/*
	 * 小鱼身体变白
	 * 括号没有一一对应，报了babyObject is not defined的错误
	 * 写代码一定要每个小功能实现后再往下做，否则很难知道问题出在哪里
	 */
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount = this.babyBodyCount+1;
		this.babyBodyTimer %= 300;
		
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			//game over
			this.gameover = true;
	}
}
	
	
	//把旋转画布封装到这个范围内
	ctx1.save();
	//将传入的x,y坐标设置为画布的坐标系原点
	ctx1.translate(this.x,this.y);
	//实现小鱼的旋转功能
	ctx1.rotate(this.angle);
	//所有元素反方向移动一半，图像就处于中心位置了
	
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount],-babyTail[babyTailCount].width*0.5+22,-babyTail[babyTailCount].height*0.5);
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount],-babyBody[babyBodyCount].width*0.5,-babyBody[babyBodyCount].height*0.5);
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount],-babyEye[babyEyeCount].width*0.5,-babyEye[babyEyeCount].height*0.5);
	
	ctx1.restore();
}


