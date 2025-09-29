import { Material } from '../materials/Material';
import { LightCubeVertexShader, LightLightCubeFragmentShader } from '../shaders/InternalShader';

export class EmissiveMaterial extends Material {

    constructor(lightIntensity, lightColor) {    
        super({
            'uLigIntensity': { type: '1f', value: lightIntensity },
            'uLightColor': { type: '3fv', value: lightColor }
        }, [], LightCubeVertexShader, LightLightCubeFragmentShader);
        
        this.intensity = lightIntensity;
        this.color = lightColor;
    }

    GetIntensity() {
        return [this.intensity * this.color[0], this.intensity * this.color[1], this.intensity * this.color[2]]
    }
}
