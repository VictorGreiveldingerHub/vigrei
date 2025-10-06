import { PerspectiveCamera } from "three";

export default class Camera {
  constructor(webGL) {
    this.webGL = webGL;

    this.sizes = this.webGL.sizes;
    this.scene = this.webGL.scene;
    this.canvas = this.webGL.canvas;

    this.setInstance();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.instance.position.set(0, 0, 10);
    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}
