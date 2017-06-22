var waveObject = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}

waveObject.prototype.num = 10;

waveObject.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.r[i] = 0;
	}
}

//绘制函数要加入主程序中才行，不然不会调用绘制函数中的方法（执行不到）
waveObject.prototype.draw = function(){
	
	ctx1.save();
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="white";
	for (var i=0;i<this.num;i++) {
		if(this.alive[i]){
			this.r[i] += deltaTime*0.05;
			if(this.r[i]>50){
				this.alive[i] =false;
				break;
			}
			//让透明度和圆圈大小成反比
			var alpha = 1-this.r[i]/50;
			//api
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255,255,255,"+alpha+")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}

waveObject.prototype.born = function(x,y){
	for (var i=0;i<this.num;i++) {
		if(!this.alive[i]){
			//born
			this.alive[i]=true;
			this.r[i]=10;
			this.x[i] = x;
			this.y[i] = y;
			return;
		}
	}
}
