var dustObject = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.No = [];
	
	this.alpha = [];
}

dustObject.prototype.num = 30;

dustObject.prototype.init = function(){
	for(i=0;i<this.num;i++){
		this.x[i] = Math.random()*canvWidth;
		this.y[i] = Math.random()*canvHeight;
		this.amp[i] = 20 + Math.random()*25;
		this.No[i] = Math.floor(Math.random()*7); //编号随机，但只在0--7的范围内
		
		
	}
	this.alpha = 0;
}

dustObject.prototype.draw = function(){
	this.alpha += deltaTime*0.0008;
	var sin = Math.sin(this.alpha);
	for(var i=0;i<this.num;i++){
		var no = this.No[i]
		ctx1.drawImage(dustPic[no],this.x[i]+this.amp[i]*sin,this.y[i]);
	}
}
