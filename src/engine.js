import * as THREE from 'THREE';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { loadOBJ } from './loads/loadOBJ'
import { WebGLRenderer } from './renderers/WebGLRenderer'

import { PointLight } from './lights/PointLight'
import { DirectionalLight } from './lights/DirectionalLight'

import { setTransform } from './utils/Tools';

var cameraPosition = [80, 80, 80];

GAMES202Main();

function GAMES202Main() {
	const canvas = document.querySelector('#glcanvas');
	canvas.width = window.screen.width;
	canvas.height = window.screen.height;
	const gl = canvas.getContext('webgl');
	if (!gl) {
		alert('Unable to initialize WebGL. Your browser or machine may not support it.');
		return;
	}

	const camera = new THREE.PerspectiveCamera(75, gl.canvas.clientWidth / gl.canvas.clientHeight, 0.1, 1000);
	const cameraControls = new OrbitControls(camera, canvas);
	cameraControls.enableZoom = true;
	cameraControls.enableRotate = true;
	cameraControls.enablePan = true;
	cameraControls.rotateSpeed = 0.3;
	cameraControls.zoomSpeed = 1.0;
	cameraControls.panSpeed = 2.0;

	function setSize(width, height) {
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}
	setSize(canvas.clientWidth, canvas.clientHeight);
	window.addEventListener('resize', () => setSize(canvas.clientWidth, canvas.clientHeight));

	camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
	cameraControls.target.set(0, 1, 0);

	const renderer = new WebGLRenderer(gl, camera);

	// add lights

	// const pointLight = new PointLight(250, [1, 1, 1], false, gl);
	// renderer.addLight(pointLight);
	
	let lightPos = [0, 80, 80];
	let focalPoint = [0, 0, 0];
	let lightUp = [0, 1, 0]
	const directionLight = new DirectionalLight(5000, [1, 1, 1], lightPos, focalPoint, lightUp, true, renderer.gl);
	renderer.addLight(directionLight);

	// add shapes
	let floorTransform = setTransform(0, 0, -20, 5, 5, 5);
	let obj1Transform = setTransform(0, 0, 0, 20, 20, 20);
	let obj2Transform = setTransform(40, 0, -40, 10, 10, 10);

	loadOBJ(renderer, 'assets/mary/', 'Marry', 'phong', obj1Transform);
	loadOBJ(renderer, 'assets/mary/', 'Marry', 'phong', obj2Transform);
	loadOBJ(renderer, 'assets/floor/', 'floor', 'phong', floorTransform);

	// var guiParams = {
	// 	modelTransX: 0,
	// 	modelTransY: 0,
	// 	modelTransZ: 0,
	// 	modelScaleX: 52,
	// 	modelScaleY: 52,
	// 	modelScaleZ: 52,
	// }
	function createGUI() {
		const gui = new dat.GUI();
		// const panelModel = gui.addFolder('Model properties');
		// const panelModelTrans = panelModel.addFolder('Translation');
		// const panelModelScale = panelModel.addFolder('Scale');
		// panelModelTrans.add(guiParams, 'modelTransX').name('X');
		// panelModelTrans.add(guiParams, 'modelTransY').name('Y');
		// panelModelTrans.add(guiParams, 'modelTransZ').name('Z');
		// panelModelScale.add(guiParams, 'modelScaleX').name('X');
		// panelModelScale.add(guiParams, 'modelScaleY').name('Y');
		// panelModelScale.add(guiParams, 'modelScaleZ').name('Z');
		// panelModel.open();
		// panelModelTrans.open();
		// panelModelScale.open();
	}

	createGUI();

	function mainLoop(now) {
		cameraControls.update();

		renderer.render();
		requestAnimationFrame(mainLoop);
	}
	requestAnimationFrame(mainLoop);
}
