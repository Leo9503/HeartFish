//判断母鱼和果实的距离
function momFruitCollision(){
	if(!baby.gameover){
		for (var i=0;i<fruit.num;i++) {
			if(fruit.alive[i]){
				var l = calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900){
					fruit.dead(i);
					data.fruitNum++;
					mom.momBodyCount++;
					if(mom.momBodyCount >= 7){
						mom.momBodyCount = 7;
					}
					if(fruit.fruitType[i] == "blue"){
						data.double = 2;
					}
					wave.born(fruit.x[i],fruit.y[i]);
				}
			}
		}
	}	
}

//母鱼和小鱼的碰撞
function momBabyCollision(){
	if(!baby.gameover){
		var l = calLength2(mom.x,mom.y,baby.x,baby.y);
		if(l<900){
			if(data.fruitNum>0){
				baby.babyBodyCount = 0;
				//碰到后母鱼果实归零
		//		data.reset(); 果实清零，在分数添加那里已经实现了此功能
				mom.momBodyCount=0;
				data.addScore();
				halo.born(baby.x,baby.y);
			}
		}
	}
}

