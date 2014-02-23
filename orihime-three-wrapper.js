// Most of the following code by Pedro Gutiérrez (https://twitter.com/PedroXitrus)
// From Genbetadev (http://www.genbetadev.com/javascript/introduccion-a-three-js-la-libreria-3d-numero-uno-para-html5)
// MIT license

var orihimeCube = {};
var base64CubeImg = new Image();

orihimeCube.draw = function() {
	var threeCanvas = document.getElementById("threeCanvas");
	var canvas = new THREE.WebGLRenderer({antialias: false, alpha: true, preserveDrawingBuffer: true, canvas: threeCanvas});
	canvas.setSize(160,144);
	document.body.appendChild(canvas.domElement);

	// Generate scene and cube
	var scene = new THREE.Scene;
	var cubeGeometry = new THREE.CubeGeometry(100,100,100);
	var cubeColor = new THREE.MeshLambertMaterial({
		color: 0x808080
	});
	var cube = new THREE.Mesh(cubeGeometry, cubeColor);
	scene.add(cube);

	// Camera
	var camera = new THREE.PerspectiveCamera(45,16/9,0.1,10000);
	camera.position.y = 160;
	camera.position.z = 400;
	camera.lookAt(cube.position);
	scene.add(camera);

	// Two lights for the cube
	var light1 = new THREE.PointLight(0xffffff);
	light1.position.set(120,260,100);
	var light2 = new THREE.PointLight(0xffffff);
	light2.position.set(-100,100,200);

	scene.add(light1);
	scene.add(light2);

	orihimeCube.x=0;
	orihimeCube.render = function(){
		cube.rotation.y += Math.PI * 0.5 / 180;
		cube.rotation.z += Math.PI * Math.cos(orihimeCube.x++ / 50) / 180;
		canvas.render(scene, camera);
		var ctxThree = canvas.getContext("2d");
		//var canvasData = ctxThree.getImageData(0, 0, 160, 144);
		//console.log(ctxThree);
		//console.log(canvas.domElement.toDataURL("image/png"));
		var base64Cube = canvas.domElement.toDataURL("image/png");
		base64CubeImg.src = base64Cube;
		//ctx.drawImage(base64CubeImg, 0, 0);
		requestAnimationFrame(orihimeCube.render); // Render again
	}

	orihimeCube.render();
}