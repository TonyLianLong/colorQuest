function Storage(){
	var bestMoveCountItem = localStorage.getItem("bestMoveCount");
	this.bestMoveCount = Number(bestMoveCountItem);
	if(!bestMoveCountItem || isNaN(this.bestMoveCount) || this.bestMoveCount == 0){//It is not quite possible that anyone would complete it in 0 moves.
		bestContainer.text("--");
	}else{
		bestContainer.text(this.bestMoveCount);
	}
};
Storage.prototype.setBestMoveCount = function(newBestMoveCount){
	if(isNaN(this.bestMoveCount) || this.bestMoveCount == 0 || newBestMoveCount < this.bestMoveCount){
		this.bestMoveCount = newBestMoveCount;
		bestContainer.text(newBestMoveCount);
		bestContainer.addClass("over-bestscore-text");
		localStorage.setItem("bestMoveCount", newBestMoveCount);
	}
}
/*Storage.prototype.getMove = function(){
	this.bestMove = Number(localStorage.getItem("bestMove"));
	if(isNaN(this.bestMove)){
		bestContainer.text("-");
		this.setScore(this.bestMove);
	}
	return this.bestMove;
}
*/