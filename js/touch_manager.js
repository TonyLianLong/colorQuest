function TouchManager() {
  if (window.navigator.msPointerEnabled) {
    //Internet Explorer 10 style
    this.eventTouchstart    = "MSPointerDown";
    this.eventTouchmove     = "MSPointerMove";
    this.eventTouchend      = "MSPointerUp";
  } else {
    this.eventTouchstart    = "touchstart";
    this.eventTouchmove     = "touchmove";
    this.eventTouchend      = "touchend";
  }
  $(".game-container").bind("touchstart",function(e){e.preventDefault();});
}
TouchManager.prototype.isAbleToTouch = function(){ 
	var userAgentInfo = navigator.userAgent; 
	var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
	var flag = true; 
	for (var v = 0; v < Agents.length; v++) { 
	   if (userAgentInfo.indexOf(Agents[v]) > 0) { return true; } 
	} 
	return false;
};

TouchManager.prototype.unbind = function (board) {
  tile = $(".dragable-tile");
  if(this.isAbleToTouch()){
	  tile.unbind("touchstart");
	  tile.unbind("touchend");
  }
}
TouchManager.prototype.refreshBindings = function (board) {
  tile = $(".dragable-tile");
  if(this.isAbleToTouch()){
	  this.unbind(board);
	  tile.bind("touchstart",function(e){//FIXIT: make it not global
		  if(e.originalEvent.touches.length != 1) return;
		  origTouches = e.originalEvent.touches[0];
		  console.log("start",e.originalEvent.touches[0]);
	  });
	  tile.bind("touchend",function(e){
		  console.log("end",e.originalEvent.changedTouches[0]);
		  if(e.originalEvent.changedTouches.length != 1) return;
		  newTouches = e.originalEvent.changedTouches[0];
		  //console.log(e);
		  srcR = Number($(this).attr("row"));
		  srcC = Number($(this).attr("col"));
		  var dx = newTouches.pageX - origTouches.pageX;
		  var dy = newTouches.pageY - origTouches.pageY;
		  console.log(dx,dy);
		  if(dx > 10 && Math.abs(dy) < Math.abs(dx)/3 && (srcC+1)<=3) board.move(srcC,srcR,srcC+1,srcR);
		  if(dx < -10 && Math.abs(dy) < Math.abs(dx)/3 && (srcC-1)>=0) board.move(srcC,srcR,srcC-1,srcR);
		  if(dy > 10 && Math.abs(dx) < Math.abs(dy)/3 && (srcR+1)<=3) board.move(srcC,srcR,srcC,srcR+1);
		  if(dy < -10 && Math.abs(dx) < Math.abs(dy)/3 && (srcR-1)>=0) board.move(srcC,srcR,srcC,srcR-1);
	  });
  }else{
	  if(!this.showedMessage){
		  alert("PC is currently not supported. View it on mobile phone.");
		  $(".container").hide();
		  $(".ViewOnPhone").show();
		  this.showedMessage = true;
	  }
  }
};
