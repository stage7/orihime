/**
* Make the canvas darker for the current frame.
* alpha=1: 33% darker
* alpha=2: 67% darker
* alpha=3: black canvas
**/
function darkenCanvas(alpha){
	var canvasData = ctx.getImageData(0, 0, 480, 432);
	if (alpha > 4)
		alpha = 3;

	for (var i=0;i<canvasData.data.length;i+=4){
		canvasData.data[i] = Math.max(75, canvasData.data[i] - alpha * 60);
		canvasData.data[i+1] = Math.max(75, canvasData.data[i+1] - alpha * 60);
	}
	
	ctx.putImageData(canvasData,0,0);
}

/**
* Make the canvas brigther for the current frame.
* alpha=1: 33% brigther
* alpha=2: 67% brighter
* alpha=3: white canvas
**/
function brightenCanvas(alpha){
	var canvasData = ctx.getImageData(0, 0, 480, 432);
	if (alpha > 4)
		alpha = 3;

	for (var i=0;i<canvasData.data.length;i+=4){
		canvasData.data[i] = Math.min(255, canvasData.data[i] + alpha * 60);
		canvasData.data[i+1] = Math.min(255, canvasData.data[i+1] + alpha * 60);
	}
	
	ctx.putImageData(canvasData,0,0);
}

/**
* Performs a linear fade to black on the canvas.
* startTime: [ms] Demo time to start triggering the fade
* time: [ms] Current demo time
* length: [ms] Fade length
**/
function progressiveDarkenCanvas(startTime, time, length){
	var lengthPeriod = length / 3;
	var currentFadeTime = time - startTime;
	if (currentFadeTime <= length){
		darkenCanvas(Math.ceil(currentFadeTime / lengthPeriod));
	}
}

/**
* Performs a linear reveal from black on the canvas.
* startTime: [ms] Demo time to start triggering the reveal
* time: [ms] Current demo time
* length: [ms] Fade length
**/
function progressiveRevealFromBlackCanvas(startTime, time, length){
	var lengthPeriod = length / 3;
	var currentFadeTime = time - startTime;
	if (currentFadeTime <= length){
		darkenCanvas(3 - Math.ceil(currentFadeTime / lengthPeriod));
	}
}

/**
* Performs a linear fade to white on the canvas.
* startTime: [ms] Demo time to start triggering the fade
* time: [ms] Current demo time
* length: [ms] Fade length
**/
function progressiveBrightenCanvas(startTime, time, length){
	var lengthPeriod = length / 3;
	var currentFadeTime = time - startTime;
	if (currentFadeTime <= length){
		brightenCanvas(Math.ceil(currentFadeTime / lengthPeriod));
	}
}

/**
* Performs a linear reveal from white on the canvas.
* startTime: [ms] Demo time to start triggering the reveal
* time: [ms] Current demo time
* length: [ms] Fade length
**/
function progressiveRevealFromWhiteCanvas(startTime, time, length){
	var lengthPeriod = length / 3;
	var currentFadeTime = time - startTime;
	if (currentFadeTime <= length){
		brightenCanvas(3 - Math.ceil(currentFadeTime / lengthPeriod));
	}
}