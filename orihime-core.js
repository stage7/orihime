var c=document.getElementById("demo");
var ctx=c.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.fillStyle="#ffff00";
ctx.fillRect(0,0,480,432);
//ctx.transform(3,0,0,3,0,0);
ctx.scale(3,3);
//var c2 = document.getElementById("demogb3x");
//	var ctx2 = c2.getContext("2d");

var pixel3 = new Image();

pixel3.onload = function(){
/*var pixelPattern = ctx2.createPattern(pixel3, 'repeat');
ctx2.fillStyle = pixelPattern;
ctx2.fillRect(0,0,480,432);
ctx2.fill();*/
}

pixel3.src = 'pixel3.png';

function animate(canvas, context, startTime) {
	// update
	var time = (new Date()).getTime() - startTime;

	var linearSpeed = 25;
	// pixels / second
	if(time<3000)
		var newX = Math.round(linearSpeed * time / 1000);
	else
		var newX = Math.round(linearSpeed * 3);

	// clear
	context.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle="#ffff00";
	ctx.fillRect(0,0,480,432);
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
	/*var canvasData = ctx.getImageData(0, 0, c.width, c.height);
		//console.log(ctx.getImageData(0, 0, 160, 144));
		for (var i=0;i<canvasData.data.length;i+=4){
			canvasData[i] = 72;
			canvasData[i+1] = 255 - canvasData[i+1];
			canvasData[i+2] = 255 - canvasData[i+2];
		}
		/*for(var j = 0; j < 144; j++){
			for(var i = 0; i < 160; i++){

				canvasData[(i+j*144)*4]     = 255 - canvasData[(i+j*144)*4];
				canvasData[(i+j*144)*4+1]   = 255 - canvasData[(i+j*144)*4+1];
				canvasData[(i+j*144)*4+2]   = 255 - canvasData[(i+j*144)*4+2];
				canvasData[(i+j*144)*4+3]   = 255 - canvasData[(i+j*144)*4+3];
				// 4
				// 5
				// 6
				// 7
				// 8
				// 9
			}
		}*/
	//ctx.putImageData(canvasData,0,0);

	//canvas.width = 480;
	//canvas.height = 432;
	//ctx.scale(3,3);

	// request new frame
	requestAnimFrame(function() {
		animate(c, ctx, startTime);
	});
}

function gameboyizeCanvas(c, ctx) {
	var canvasData = ctx.getImageData(0, 0, c.width, c.height);
	alert(canvasData[0]);
	for(var j = 0; j < 144; j++){
		for(var i = 0; i < 160; i++){
			canvasData[(i*3+j*3)*4]     = canvasData[(i*3+j*3)] - 95; // 1
			canvasData[(i*3+j*3)*4+1]   = canvasData[(i*3+j*3)*4+1] - 95;
			canvasData[(i*3+j*3+1)*4]   = canvasData[(i*3+j*3+1)*4] - 95; // 2
			canvasData[(i*3+j*3+1)*4+1] = canvasData[(i*3+j*3+1)*4+1] - 95;
			canvasData[(i*3+j*3+2)*4]   = canvasData[(i*3+j*3+2)*4] - 79; // 3
			canvasData[(i*3+j*3+2)*4+1] = canvasData[(i*3+j*3+2)*4+1] - 79;
			// 4
			// 5
			// 6
			// 7
			// 8
			// 9
		}
	}
	ctx.putImageData(canvasData,0,0);

	/*for (var i=0;i<canvasData.data.length;i+=4)
	{
		var color = canvasData.data[i];
		switch(color){
			case(0):
				var pixelPattern = ctx2.createPattern(pixel3, 'repeat');
				ctx2.fillStyle = pixelPattern;
				ctx2.fillRect((i/4)%160,Math.floor(i/144),(i/4)%160 + 2,Math.floor(i/144) + 2);
				ctx2.fill();
			break;
			case(85):
			break;
			case(170):
			break;
			case(255):
			break;
		}
	}
	ctx.putImageData(canvasData,0,0);*/
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