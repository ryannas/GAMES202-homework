import { MeshRender } from './MeshRender';

// Remain rotatation
export class TRSTransform {
    constructor(translate = [0, 0, 0], scale = [1, 1, 1]) {
        this.translate = translate;
        this.scale = scale;
    }
}

export class WebGLRenderer {
    meshes = [];
    shadowMeshes = [];
    lights = [];

    constructor(gl, camera) {
        this.gl = gl;
        this.camera = camera;
    }

    addLight(light) { this.lights.push({ entity: light, meshRender: new MeshRender(this.gl, light.mesh, light.mat) }); }

    addMesh(mesh) { this.meshes.push(mesh); }

    addShadowMesh(mesh) { this.shadowMeshes.push(mesh); }

    render() {
        const gl = this.gl;

        gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
        gl.clearDepth(1.0); // Clear everything
        gl.enable(gl.DEPTH_TEST); // Enable depth testing
        gl.depthFunc(gl.LEQUAL); // Near things obscure far things

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Handle light
        // const timer = Date.now() * 0.00025;
        // let lightPos = [ Math.sin(timer * 6) * 100, 
        //                  Math.cos(timer * 4) * 150, 
        //                  Math.cos(timer * 2) * 100 ];

        if (this.lights.length != 0) {
            for (let l = 0; l < this.lights.length; l++) {
                // draw light
                this.lights[l].meshRender.mesh.transform.translate = this.lights[l].entity.lightPos;
                this.lights[l].meshRender.draw(this.camera);

                // shadow pass
                if (this.lights[l].entity.hasShadowMap) {
                    for (let i = 0; i < this.shadowMeshes.length; i++) {
                        this.shadowMeshes[i].draw(this.camera);
                    }
                }

                // camera pass
                for (let i = 0; i < this.meshes.length; i++) {
                    this.gl.useProgram(this.meshes[i].shader.program.glShaderProgram);
                    this.gl.uniform3fv(this.meshes[i].shader.program.uniforms.uLightPos, this.lights[l].entity.lightPos);
                    this.meshes[i].draw(this.camera);
                }
            }
        } else {
            // Handle mesh(no light)
            for (let i = 0; i < this.meshes.length; i++) {
                const mesh = this.meshes[i];
                let trans = new TRSTransform();
                mesh.draw(this.camera, trans);
            }
        }
    }
}