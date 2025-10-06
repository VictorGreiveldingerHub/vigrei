import { PlaneGeometry, Mesh, RawShaderMaterial, Vector2 } from "three";

import vertexShader from "../shaders/background/vertex.glsl";
import fragmentShader from "../shaders/background/fragment.glsl";

let instance = null;

import colors from "../../utils/colors";

export default class Background {
  constructor(webGL) {
    if (instance) {
      return instance;
    }

    instance = this;

    this.webGL = webGL;
    this.scene = this.webGL.scene;

    this.init();

    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  init() {
    this.setGeometry();
    this.setMaterial();
    this.setMesh(this.geometry, this.material);

    this.scene.add(this.mesh);
  }

  setGeometry() {
    this.fov_y = this.setFovY();

    this.geometry = new PlaneGeometry(
      this.fov_y * this.webGL.camera.instance.aspect * 2,
      this.fov_y * 2,
      300,
      300
    );
  }

  setMaterial() {
    this.material = new RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: colors() },
        uResolution: {
          value: new Vector2(
            this.webGL.canvas.instance.width,
            this.webGL.canvas.instance.height
          ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
        },
      },
      wireframe: false,
    });
  }

  setMesh(geometry, material) {
    this.mesh = new Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI * 0.1;
  }

  setFovY() {
    let ang_rad = (this.webGL.camera.instance.fov * Math.PI) / 180;
    return this.webGL.camera.instance.position.z * Math.tan(ang_rad / 2) * 2;
  }

  resize() {
    this.fov_y = this.setFovY();
    this.mesh.geometry.dispose();

    this.mesh.geometry = new PlaneGeometry(
      this.fov_y * this.webGL.camera.instance.aspect * 2,
      this.fov_y * 2,
      300,
      300
    );
  }

  update() {
    this.mesh.material.uniforms.uTime.value = this.webGL.time.elapsed * 0.005;
  }
}
