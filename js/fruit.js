var fruitObj = function(){
	//因为果实的数量众多，所以需要对它设立一个一维数值存储数据
	this.alive=[];//bool
	this.x=[];
	this.y=[];
	this.fruitType=[];
	this.len = [];
	//果实的图片资源
	this.orange=new Image();
	this.blue=new Image();
	
	this.speed = [];
	
	this.aneNo = [];
}

fruitObj.prototype.num = 30;

//创建函数时function要加（）
fruitObj.prototype.init = function(){
	for(var i=0;i<this.num;i++){
		this.alive[i] = false;
		this.x[i]=0;
		this.y[i]=0;
		this.len[i]=0;
		//让不同的果实具有不同的移动状态
		this.speed[i] = Math.random()*0.005+0.01;//Math.random()是0--1的范围内
		
		this.aneNo[i] = 0;
		/*
			这个意思就是说：在初始化的时候，让所有的果实都出生，出生的过程呢，就是
			找到一个位置让它出生，
		*/
//		this.born(i);
	}
	this.orange.src = "src/fruit.png";
	this.blue.src = "src/blue.png";
}

fruitObj.prototype.draw = function(){
	
	
	/*
	 * 图片元素的移动是根据的变化，通过不断刷屏实现元素的移动
	 */
	for (var i=0;i<this.num;i++) {
		if(this.alive[i]){
			if(this.fruitType[i]=="blue"){
				var pic = this.blue;
			}else{
				var pic = this.orange;
			}
		
		if(this.len[i]<15){
			//海葵是有编号的，用数组存储
			var No = this.aneNo[i];
			this.x[i] = ane.headx[No];
			this.y[i] = ane.heady[No];
			//模拟果实从小到大的过程
			this.len[i] += 0.01*deltaTime;
			ctx2.drawImage(pic,this.x[i]-this.len[i]*0.5,this.y[i]-this.len[i]*0.5,this.len[i],this.len[i]);
		}else{
			//果实向上漂浮
			this.y[i] -= this.speed[i]*3*deltaTime;
			ctx2.drawImage(pic,this.x[i]-this.len[i]*0.5,this.y[i]-this.len[i]*0.5,this.len[i],this.len[i]);
		}
		
		
		//drawImage(image,x,y,width,height)：在canvas中(x,y)处绘制图片，并将其缩放到指定的宽度和高度。
		//如果想将图片绘制出来，还是需要画布绘制图片的函数来执行
//		ctx2.drawImage(pic,this.x[i]-this.len[i]*0.5,this.y[i]-this.len[i]*0.5,this.len[i],this.len[i]);


		//左上方为起始的[0,0]点
		if(this.y[i]<10){
			this.alive[i]=false;
		}
	}
	}
}


/*
	我们把所有的数据计算都放到里面来。我们需要检测当前屏幕上，有多少个果实，
	我们需要检测所有的果实状态。如果他的alive状态为真，那么num++ 好，在循环完了之后呢
	我们的整个逻辑在这里有点小小的复杂，首先我们要给它设计一个池，在这个池子里，又有
	不同的状态，即便是屏幕上的海葵呢，而又分为两种状态。这些东西混合到一起，没有办法
	说从头到尾地把这个功能完整的流畅的写出来。这比较困难，我们一定要学会拆捡，
	这样子我们就自然而然的，浑然不觉的就把一个复杂的东西做好了，好，首先我们
	来这样子规划，我们认为所有的果实，这个池子里面的，所有的都是在执行任务的，
	我们先把执行任务的这块写好，也就是从长大到成熟，飘出去，漂出屏幕外，ok，这样我们
	在初始化的时候，就把它初始化为真，this.alive[i]=true;每一个都是活着的，那么
	我们这边就要画每一个果实了。
*/
fruitObj.prototype.update = function(){
	var currentNum = 0;
	for (var i=0;i<this.num;i++) {
		if(this.alive[i]) currentNum++;
	}
}

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
}

fruitObj.prototype.born = function(i){

	
//	var aneId = Math.floor(Math.random()*ane.num);//对浮点数向下取整
	this.aneNo[i] = Math.floor(Math.random()*ane.num);//对浮点数向下取整
//	this.x[i] = ane.rootx[aneId];
//	this.y[i] = ane.heady[aneId];
	this.len[i]=0;
	this.alive[i]=true;
	var ran = Math.random();
	if(ran<0.2){
		this.fruitType[i] = "blue";
	}else{
		this.fruitType[i] = "orange";
	}
}

//命名最好不要用属性变量，例如number等
//监听果实数量,它不是在fruit对象中，所以不能用this.num
function fruitMonitor(){
	var fruitNumber=0;
	//统计存活果实个数，如果数量不够，就让果实出生
	for (var i=0;i<fruit.num;i++) {
		if(fruit.alive[i]){
			fruitNumber++;
		}
	}
	if(fruitNumber<15){
		sendFruit();
		return;
	}
}

function sendFruit(){
	for (var i=0;i<fruit.num;i++) {
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}



