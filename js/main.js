var bestContainer = $(".best-container");
var scoreContainer = $(".score-container");
var tileContainer = $(".tile-container");
var touchManager = new TouchManager();
var storage = new Storage();
//var colorArray = ["0","#ffffff","#ffff00","#ff00ff","#ff0000","#c0c0c0","#808080","#808000","#800080","#800000","#00ffff","#00ff00","#008080","#008000","#0000ff","#000080","#000000"];
var colorArray = ["0","#1abc9c","#2ecc71","#3498db","#9b59b6","#34495e","#27ae60","#2980b9","#8e44ad","#f1c40f","#e67e22","#e74c3c","#ecf0f1","#95a5a6","#f39c12","#d35400","#bdc3c7","#7f8c8d"];
var board = new Board();

function rand(from,to){
	return Math.floor(Math.random()*(to-from+1))+from;
}
function gameOver(){
	alert("Game Over  The board is full!");
	scoreContainer.addClass("gameover-score-text");
	touchManager.unbind(board);
}
function youWin(){
	if(board.moveCount>1) alert("You win the game in "+board.moveCount+" moves!");
	else if(board.moveCount == 1) alert("You win the game in a move!");
	storage.setBestMoveCount(board.moveCount);
	scoreContainer.addClass("youwin-score-text");
	touchManager.unbind(board);
}
var chooseArr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
for(var i = 1;i < 5;i++){
	var colorIndex = rand(0,chooseArr.length-1);
	var colorNo = chooseArr[colorIndex];
	//tileContainer.append('<div class="tile tile-position-'+i+'-1 sc-tile tile-new tile-'+colorNo+'"><div class="tile-inner"></div></div>');
	tileContainer.append('<div class="tile tile-position-'+i+'-1 sc-tile tile-new tile-'+colorNo+'"><div class="tile-inner">'+colorNo+'</div></div>');
	//$('.tile-position-'+i+'-1 .tile-inner').css("background-color",colorArray[colorNo]);
	//console.log(chooseArr,colorNo);
	chooseArr.splice(colorIndex,1);
	//console.log(chooseArr);
}
board.addFirstTwoTiles();
/*tileContainer.append('<div class="tile tile-2 tile-position-2-3 dragable-tile tile-new" row="1" col="1"><div class="tile-inner">'+2+'</div></div>');
tileContainer.append('<div class="tile tile-2 tile-position-3-3 dragable-tile tile-new" row="1" col="2"><div class="tile-inner">'+2+'</div></div>');*/

touchManager.refreshBindings(board);
$(".restart-button").click(function(e){
	location.reload();
});