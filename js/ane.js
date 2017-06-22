var aneObject = function(){
	
	this.rootx = []; 
	this.headx = [];
	this.heady = []
//	this.length = [];

	this.alpha = 0;
	this.amp = [];
}

aneObject.prototype.num = 50;

aneObject.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.rootx[i] = i*16+Math.random()*20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canvHeight - 250 + Math.random()*50; 
//		this.length[i] = 150+Math.random()*50;
		//摆动幅度
		this.amp[i] = Math.random()*50+50;
	}
}

aneObject.prototype.draw = function(){
	
	//摆动的快慢
	this.alpha += deltaTime * 0.0008;
	var sin = Math.sin(this.alpha);
	
	ctx2.save();//在这个范围内执行操作
	ctx2.globalAlpha = "0.6";
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b154e";
	for(var i=0;i<this.num;i++){
		ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canvHeight);
		this.headx[i] = this.rootx[i]+sin*this.amp[i];
		
		//四个元素：根部x坐标、长度、头部x坐标、头部y坐标
		ctx2.quadraticCurveTo(this.rootx[i],canvHeight-100,this.headx[i],this.heady[i]);
		
		ctx2.stroke();
		
	}
	ctx2.restore();
}
