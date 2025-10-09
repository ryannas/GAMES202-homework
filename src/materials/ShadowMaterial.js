import { Material } from './Material';

import vertexShader from "../shaders/shadowShader/vertex.glsl?raw";
import fragmentShader from "../shaders/shadowShader/fragment.glsl?raw";

export class ShadowMaterial extends Material {

    constructor(light, translate, scale) {
        let lightMVP = light.CalcLightMVP(translate, scale);

        super({
            'uLightMVP': { type: 'matrix4fv', value: lightMVP }
        }, [], vertexShader, fragmentShader, light.fbo);
    }
}