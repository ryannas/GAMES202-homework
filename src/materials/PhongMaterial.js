import { Material } from './Material';

import vertexShader from "../shaders/phongShader/vertex.glsl?raw";
import fragmentShader from "../shaders/phongShader/fragment.glsl?raw";

export class PhongMaterial extends Material {

    constructor(color, specular, light, translate, scale) {
        let lightMVP = light.CalcLightMVP(translate, scale);
        let lightIntensity = light.mat.GetIntensity();

        super({
            // Phong
            'uSampler': { type: 'texture', value: color },
            'uKs': { type: '3fv', value: specular },
            'uLightIntensity': { type: '3fv', value: lightIntensity },
            // Shadow
            'uShadowMap': { type: 'texture', value: light.fbo },
            'uLightMVP': { type: 'matrix4fv', value: lightMVP },

        }, [], vertexShader, fragmentShader);
    }
};