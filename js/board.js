function Board(){
	/*this.gridArray = new Array();
	for(var i = 0;i < 4;i++){
		this.gridArray[i] = new Array();
		for(var j = 0;j < 4;j++){
			this.gridArray[i][j] = 0;
		}
	}*/
	this.moveCount = 0;
}
Board.prototype.checkTile = function(c,r){//It will return color of the tile if the tile exists.
	var intendedTile = $('.tile-position-'+(c+1)+'-'+(r+2)+'');
	if(intendedTile.length == 0){
		return 0;
	}else{
		return Number(intendedTile.text());
	}
}
Board.prototype.addFirstTwoTiles = function(){
	this.addRandomTile();//add two tiles
	this.addRandomTile();
}
Board.prototype.isBoardFull = function(){
	for(var c=0;c<4;c++){
		for(var r=0;r<4;r++){
			if(this.checkTile(c,r) == 0)return false;
		}
	}
	return true;
}
Board.prototype.isWin = function(){//It will also update matched tiles.
	var win = true;
	$(".dragable-tile").each(function(e){
			$(this).attr("matched","false");
		});
	for(var i = 0;i < 4;i++){
		var matched = false;
		$(".sc-tile").eq(i).attr("matched","false");
		$(".dragable-tile").each(function(e){
			if($(".sc-tile").eq(i).text() == $(this).text()){
				matched = true;
				$(this).attr("matched","true");
				$(".sc-tile").eq(i).attr("matched","true");
			}
		});
		if(matched == false) win = false;
	}
	return win;
}
Board.prototype.addTile = function(c,r,color){
	if(this.isWin()){
		youWin();
		return true;
	}else{
		tileContainer.append('<div class="tile tile-'+color+' tile-position-'+(c+1)+'-'+(r+2)+' dragable-tile tile-new" row="'+r+'" col="'+c+'"><div class="tile-inner">'+color+'</div></div>');
		if(this.isBoardFull()){
			gameOver();
			return false;
		}else{
			touchManager.refreshBindings(this);
			return tileContainer;
		}
	}
}
Board.prototype.changeTileColor = function(c,r,origColor,color){
	var intendedTile = $('.tile-position-'+(c+1)+'-'+(r+2));
	intendedTile.removeClass('tile-'+origColor);
	intendedTile.addClass('tile-'+color);
	intendedTile.children().text(color);
}
Board.prototype.doesColorExist = function(color){
	for(var i = 0;i < 4;i++){
		if($(".sc-tile").eq(i).text() == color){
			return true;
		}
	}
	return false;
}
Board.prototype.addRandomTile = function(){
	do{
		var c = rand(0,3);
		var r = rand(0,3);
	}while(this.checkTile(c,r));//0 then quit loop
	do{
		var color = rand(1,16);
	}while(this.doesColorExist(color));
	return this.addTile(c,r,color);
}
Board.prototype.combineColor = function(colorA,colorB){
	/*var rA = parseInt(colorArray[colorA].substr(1,2),16);
	var gA = parseInt(colorArray[colorA].substr(3,2),16);
	var bA = parseInt(colorArray[colorA].substr(5,2),16);
	var rB = parseInt(colorArray[colorB].substr(1,2),16);
	var gB = parseInt(colorArray[colorB].substr(3,2),16);
	var bB = parseInt(colorArray[colorB].substr(5,2),16);
	var avgr = (rA+rB)/2;
	var avgg = (gA+gB)/2;
	var avgb = (bA+bB)/2;
	var minIndex = 0;
	var minDist = -1;
	for(var i = 1; i<17; i++){
		var r = parseInt(colorArray[i].substr(1,2),16);
		var g = parseInt(colorArray[i].substr(3,2),16);
		var b = parseInt(colorArray[i].substr(5,2),16);
		var dist = Math.abs(r-avgr)+Math.abs(g-avgg)+Math.abs(b-avgb);
		console.log("index:"+i+" distance:"+dist);
		if(dist < minDist || minDist == -1){
			minDist = dist; //maybe we can use square
			minIndex = i;
		}
	}
	console.log("colorA: "+colorA+" colorB:"+colorB+"  combine index:"+minIndex);
	return minIndex;*/
	var i = (colorA+colorB)%16;
	if(i == 0) i = 16;
	return i;
}
Board.prototype.removeTile = function(c,r){
	/*$(".dragable-tile").each(function(e){
		if($(this).attr("col") == c && $(this).attr("row") == r){
			$(this).remove();
		}
		return false;
	});*/
	var intendedTile = $('.tile-position-'+(c+1)+'-'+(r+2));
	if(intendedTile.length == 0){
		return false;
	}else{
		touchManager.refreshBindings(this);
		intendedTile.remove();
		return true;
	}
}
Board.prototype.move = function(srcC,srcR,destC,destR){
	console.log("Move:",[srcC,srcR],[destC,destR]);
	var intendedTile = $('.tile-position-'+(srcC+1)+'-'+(srcR+2));
	if(intendedTile.length == 0){
		console.warn("invalid move intendedTile:",intendedTile);
		return 0;
	}else{
		//It's this tile that we will move
		this.moveCount++;
		if(this.checkTile(destC,destR) != 0){
			//combine
			intendedTile.attr("col",destC);
			intendedTile.attr("row",destR);
			colorA = this.checkTile(srcC,srcR);
			colorB = this.checkTile(destC,destR);
			this.removeTile(destC,destR);
			intendedTile.addClass('tile-position-'+(destC+1)+'-'+(destR+2));
			intendedTile.removeClass('tile-position-'+(srcC+1)+'-'+(srcR+2));
			intendedTile.removeClass('tile-'+intendedTile.text());
			var color = this.combineColor(colorA,colorB);
			this.changeTileColor(destC,destR,colorA,color);
		}else{
			//move
			intendedTile.attr("col",destC);
			intendedTile.attr("row",destR);
			intendedTile.addClass('tile-position-'+(destC+1)+'-'+(destR+2));
			intendedTile.removeClass('tile-position-'+(srcC+1)+'-'+(srcR+2));
		}
		scoreContainer.text(this.moveCount);
		this.addRandomTile();//FIXIT: change the position of the code
	}
};