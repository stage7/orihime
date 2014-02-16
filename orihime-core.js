var c=document.getElementById("demo");
var ctx=c.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.fillStyle="#ffff00";
ctx.fillRect(0,0,480,432);
ctx.scale(3,3);

function animate(canvas, context, startTime) {
	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);
	
	// update
	var time = (new Date()).getTime() - startTime;

	// pixels / second
	var linearSpeed = 25;
	if(time<3000)
		var newX = Math.round(linearSpeed * time / 1000);
	else
		var newX = Math.round(linearSpeed * 3);

	ctx.fillStyle="#ffff00";
	ctx.fillRect(0,0,480,432);

	for(var j = 0; j < nitoriArray[1]; j++){
		for(var i = 0; i < nitoriArray[0]; i++){
			var color = getColorFromArray(nitoriArray, j*nitoriArray[0] + i + 2);
			if (color) {
				ctx.fillStyle = String(getColorFromArray(nitoriArray, j*nitoriArray[0] + i + 2));
				ctx.fillRect(newX+i, 2+j, 1, 1);
			}
		}
	}

	progressiveRevealFromWhiteCanvas(0, time, 3000);
	
	// request new frame
	requestAnimFrame(function() {
		animate(c, ctx, startTime);
	});
}

// wait one second before starting animation
setTimeout(function() {
	var startTime = (new Date()).getTime();
	animate(c, ctx, startTime);
}, 1000);

window.requestAnimFrame = (function(callback) {
    	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    	function(callback) {
    		window.setTimeout(callback, 1000 / 60);
    	};
    })();