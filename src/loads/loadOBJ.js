import * as THREE from 'THREE';
import MTLLoader from 'three-mtl-loader';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Mesh } from '../objects/Mesh';
import { PhongMaterial } from '../materials/PhongMaterial';
import { LightVertexShader as VertexShader, FragmentShader } from '../shaders/InternalShader';
import { MeshRender } from '../renderers/MeshRender';
import { Texture } from '../textures/Texture';

export function loadOBJ(renderer, path, name) {

	const manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {
		console.log(item, loaded, total);
	};

	function onProgress(xhr) {
		if (xhr.lengthComputable) {
			const percentComplete = xhr.loaded / xhr.total * 100;
			console.log('model ' + Math.round(percentComplete, 2) + '% downloaded');
		}
	}

	function onError(err) { 
		console.error(err.message);
	}

	const loader = new MTLLoader(manager);
	loader.setPath(path);
	loader.load(name + '.mtl', function (materials) {
			materials.preload();
			new OBJLoader(manager)
				.setMaterials(materials)
				.setPath(path)
				.load(name + '.obj', function (object) {
					object.traverse(function (child) {
						if (child.isMesh) {
							let geo = child.geometry;
							let mat;
							if (Array.isArray(child.material)) mat = child.material[0];
							else mat = child.material;

							var indices = Array.from({ length: geo.attributes.position.count }, (v, k) => k);
							let mesh = new Mesh({ name: 'aVertexPosition', array: geo.attributes.position.array },
								{ name: 'aNormalPosition', array: geo.attributes.normal.array },
								{ name: 'aTextureCoord', array: geo.attributes.uv.array },
								indices);

							let colorMap = null;
							if (mat.map != null) colorMap = new Texture(renderer.gl, mat.map.image);
							// MARK: You can change the myMaterial object to your own Material instance

							let myMaterial = new PhongMaterial(mat.color.toArray(), colorMap, mat.specular.toArray(), renderer.lights[0].entity.mat.intensity);
							
							let meshRender = new MeshRender(renderer.gl, mesh, myMaterial);
							renderer.addMesh(meshRender);
						}
					});
				}, onProgress, onError);
		});
}
