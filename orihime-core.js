var c=document.getElementById("demo");
var ctx=c.getContext("2d");
ctx.fillStyle="#ffffff";
ctx.fillRect(0,0,165,143);
var nitori=new Image();
nitori.src='nitori.png';
//nitori.onload=function(){ctx.drawImage(nitori, newX, 2);}
var pixel3 = new Image();

pixel3.onload = function(){
var c2 = document.getElementById("demogb3x");
var ctx2 = c2.getContext("2d");
var pixelPattern = ctx2.createPattern(pixel3, 'repeat');
ctx2.fillStyle = pixelPattern;
ctx2.fillRect(0,0,480,432);
ctx2.fill();
}

pixel3.src = 'pixel3.png';

init = function() {
	nitori = new Image();
	nitori.addEventListener('load', launchFunction, false);
	nitori.src = 'nitori.png';
}

function animate(canvas, context, startTime) {
	// update
	var time = (new Date()).getTime() - startTime;

	var linearSpeed = 100;
	// pixels / second
	var newX = linearSpeed * time / 1000;

	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle="#ffffff";
	ctx.fillRect(0,0,165,143);
	//ctx.drawImage(nitori, newX, 2);

	for(var j = 0; j < nitoriArray[1]; j++){
		for(var i = 0; i < nitoriArray[0]; i++){
			var color = getColorFromArray(nitoriArray, j*nitoriArray[0] + i + 2);
			if (color) {
				ctx.fillStyle = String(getColorFromArray(nitoriArray, j*nitoriArray[0] + i + 2));
				ctx.fillRect(newX+i, 2+j, 1, 1);
			}
		}
	}
	//gameboyizeCanvas();

	// request new frame
	requestAnimFrame(function() {
		animate(c, ctx, startTime);
	});
}

function gameboyizeCanvas() {
	var canvasData = ctx.getImageData(0, 0, c.width, c.height);
	for (var i=0;i<canvasData.data.length;i+=4)
	  {
	  canvasData.data[i]=255-canvasData.data[i];
	  canvasData.data[i+1]=255-canvasData.data[i+1];
	  canvasData.data[i+2]=255-canvasData.data[i+2];
	  canvasData.data[i+3]=255;
	  }
	ctx.putImageData(canvasData,0,0);
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