export class FBO {
    constructor(gl, resolution = 2048) {
        var framebuffer, texture, depthBuffer;

        // error function
        function error() {
            if (framebuffer) gl.deleteFramebuffer(framebuffer);
            if (texture) gl.deleteFramebuffer(texture);
            if (depthBuffer) gl.deleteFramebuffer(depthBuffer);
            return null;
        }

        // construct frame buffer
        framebuffer = gl.createFramebuffer();
        if (!framebuffer) {
            console.log("FBO: can not create frame buffer");
            return error();
        }

        // construct texture
        texture = gl.createTexture();
        if (!texture) {
            console.log("FBO: can not create texture");
            return error();
        }

        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, resolution, resolution, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        //gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        framebuffer.texture = texture;//将纹理对象存入framebuffer

        // create render buffer
        depthBuffer = gl.createRenderbuffer();
        if (!depthBuffer) {
            console.log("FBO: can not create render buffer");
            return error();
        }

        gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, resolution, resolution);

        // bind frame buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);

        // check frame buffer
        var e = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (gl.FRAMEBUFFER_COMPLETE !== e) {
            console.log("渲染缓冲区设置错误" + e.toString());
            return error();
        }

        // unbind
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindTexture(gl.TEXTURE_2D, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);

        return framebuffer;
    }
}