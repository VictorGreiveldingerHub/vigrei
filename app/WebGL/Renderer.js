import { WebGLRenderer } from "three";

export default class Renderer {
  constructor(webGL) {
    this.webGL = webGL;

    this.canvas = this.webGL.canvas;
    this.sizes = this.webGL.sizes;
    this.scene = this.webGL.scene;
    this.camera = this.webGL.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new WebGLRenderer({
      canvas: this.canvas.instance,
      antialias: true,
      alpha: true,
    });

    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(this.sizes.pixelRatio);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
  }
}
