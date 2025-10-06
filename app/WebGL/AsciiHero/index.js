import {
  PlaneGeometry,
  InstancedMesh,
  RawShaderMaterial,
  Vector2,
  WebGLRenderTarget,
  CanvasTexture,
  Matrix4,
} from "three";

import colors from "../../utils/colors";

import vertexShader from "../shaders/asciiHero/vertex.glsl";
import fragmentShader from "../shaders/asciiHero/fragment.glsl";

import Background from "../Background";
import AsciiEffect from "../AsciiImage";

export default class AsciiHero {
  constructor(webGL) {
    this.webGL = webGL;
    this.scene = this.webGL.scene;
    this.camera = this.webGL.camera;

    this.background = new Background(); // Ici, c'est l'instance créée dans WebGL, je veux juste récupérer la scene
    this.asciiEffect = new AsciiEffect();

    this.backgroundWidth =
      this.background.fov_y * this.background.webGL.camera.instance.aspect * 2;
    this.backgroundHeight = this.background.fov_y * 2;

    this.rows = 70;
    this.columns = 70;
    this.instances = this.rows * this.columns;
    this.asciiTexture = this.createASCIIGrid();

    this.init();

    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  init() {
    this.getRenderTarget();

    this.calculateDimensions();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.createGeometryGrid();

    this.scene.add(this.mesh);
  }

  createASCIIGrid() {
    let dict =
      ".-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@";
    this.length = dict.length;

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = this.length * 64;
    canvas.height = 64;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 40px Safiro";
    ctx.textAlign = "center";

    for (let i = 0; i < this.length; i++) {
      ctx.fillText(dict[i], 32 + i * 64, 46);
    }

    let asciiTexture = new CanvasTexture(canvas);
    asciiTexture.needsUpdate = true;

    return asciiTexture;
  }

  getRenderTarget() {
    this.backgroundRenderTarget = new WebGLRenderTarget(
      this.background.webGL.canvas.instance.width,
      this.background.webGL.canvas.instance.height
    );
  }

  calculateDimensions() {
    this.totalWidth = this.backgroundWidth;
    this.totalHeight = this.backgroundHeight;

    this.cellSize = this.totalHeight / this.rows;
    this.actualColumns = Math.floor(this.totalWidth / this.cellSize);

    const newInstances = this.rows * this.actualColumns;
    if (newInstances !== this.instances) {
      this.instances = newInstances;
      this.needsNewMesh = true;
    }
  }

  setGeometry() {
    this.geometry = new PlaneGeometry(this.cellSize * 0.9, this.cellSize * 0.9);
  }

  setMaterial() {
    this.material = new RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uResolution: {
          value: new Vector2(
            this.webGL.canvas.instance.width,
            this.webGL.canvas.instance.height
          ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
        },
        uBackgroundTexture: { value: null },
        uASCIILength: { value: this.length },
        uASCIITexture: { value: this.asciiTexture },
        uTotalWidth: { value: this.totalWidth },
        uTotalHeight: { value: this.totalHeight },
        uColor0: { value: colors()[0] },
        uColor1: { value: colors()[1] },
        uColor2: { value: colors()[2] },
        uColor3: { value: colors()[3] },
        uColor4: { value: colors()[4] },
      },
    });
  }

  setMesh() {
    this.mesh = new InstancedMesh(this.geometry, this.material, this.instances);
  }

  createGeometryGrid() {
    const matrix = new Matrix4();

    const startX = -this.totalWidth / 2 + this.cellSize / 2;
    const startY = -this.totalHeight / 2 + this.cellSize / 2;

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.actualColumns; j++) {
        const index = i * this.actualColumns + j;

        if (index >= this.instances) break;

        const x = startX + j * this.cellSize;
        const y = startY + i * this.cellSize;
        const z = 0;

        matrix.setPosition(x, y, z);
        this.mesh.setMatrixAt(index, matrix);
      }
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  resize() {
    this.geometry.dispose();
    this.setGeometry();
    this.mesh.geometry = this.geometry;

    this.backgroundRenderTarget.setSize(
      this.webGL.canvas.instance.width,
      this.webGL.canvas.instance.height
    );
  }

  update() {
    this.webGL.renderer.instance.setRenderTarget(this.backgroundRenderTarget);
    this.webGL.renderer.instance.render(
      this.background.scene,
      this.background.webGL.camera.instance
    );

    this.material.uniforms.uBackgroundTexture.value =
      this.backgroundRenderTarget.texture;

    this.webGL.renderer.instance.setRenderTarget(null);
  }
}
