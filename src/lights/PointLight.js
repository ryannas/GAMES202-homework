import { EmissiveMaterial } from './Light';
import { Mesh } from '../objects/Mesh';
import { FBO } from '../textures/FBO';

export class PointLight {
    /**
     * Creates an instance of PointLight.
     * @param {float} lightIntensity  The intensity of the PointLight.
     * @param {vec3f} lightColor The color of the PointLight.
     * @memberof PointLight
     */
    constructor(lightIntensity, lightColor, hasShadowMap, gl) {
        this.mesh = Mesh.cube();
        this.mat = new EmissiveMaterial(lightIntensity, lightColor);

        this.hasShadowMap = hasShadowMap;
        this.fbo = new FBO(gl);
        if (!this.fbo) {
            console.error('Can not create FBO for PointLight');
        }
    }
}