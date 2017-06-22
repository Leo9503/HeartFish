var dataObject = function(){
	
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.alpha = 0;
}


dataObject.prototype.draw = function(){
	//this代表当前对象 super代表父类对象
//	ctx1.fillText("num" + this.fruitNum,canvWidth*0.5,canvHeight-50);
//	ctx1.fillText("double" + this.double,canvWidth*0.5,canvHeight-80);

	var w =canv1.width;
	var h =canv2.height;
	
	ctx1.save();
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "white"
	ctx1.fillStyle = "white";
	ctx1.fillText("Score：" + this.score,w*0.5,h-30);
	
	if(baby.gameover){
		this.alpha += deltaTime*0.0003;
		if(this.alpha>1)
			this.alpha = 1;
			
		ctx1.fillStyle = "rgba(255,255,255,"+this.alpha +")";
		ctx1.fillText("小鱼完蛋啦！",w*0.5,h*0.5);
	}
	
	ctx1.restore();
}

dataObject.prototype.addScore = function(){
	//加分报错，属性这里写错了
	this.score += this.fruitNum*10*this.double;
	this.fruitNum = 0;
	this.double = 1;
}
