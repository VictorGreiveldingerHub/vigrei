import {
  PlaneGeometry,
  InstancedMesh,
  RawShaderMaterial,
  Matrix4,
  CanvasTexture,
  Vector2,
} from "three";

import colors from "../../utils/colors";

import fragmentShader from "../shaders/asciiImage/fragment.glsl";
import vertexShader from "../shaders/asciiImage/vertex.glsl";

let instance = null;

export default class AsciiImage {
  constructor(webGL) {
    if (instance) return instance;
    instance = this;

    this.webGL = webGL;
    this.scene = this.webGL.scene;
    this.camera = this.webGL.camera;

    // Configuration de la grille
    this.rows = 50;
    this.columns = 50;
    this.actualColumns = this.columns;
    this.instances = this.rows * this.columns;
    this.asciiTexture = this.createASCIIGrid();

    this.scale = new Vector2(1, 1);
    this.imageAspect = 1.0;
    this.canvasAspect = null;

    this.init();

    window.addEventListener("resize", () => this.resize());
  }

  init() {
    this.calculateDimensions();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
    this.createGeometryGrid();
    this.scene.add(this.mesh);

    // Attente de la ressource
    this.webGL.resources.on("ready", () => {
      this.updateTexture();
      this.imageAspect =
        this.webGL.resources.items.myPhoto.width /
        this.webGL.resources.items.myPhoto.height;

      this.resize();
    });

    if (this.webGL.resources.loaded === this.webGL.resources.toLoad) {
      this.updateTexture();
    }
  }

  createASCIIGrid() {
    const dict =
      ".-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@";
    this.length = dict.length;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = this.length * 64;
    canvas.height = 64;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 40px Safiro"; // police plus sûre
    ctx.textAlign = "center";

    // Ajout des caractères
    for (let i = 0; i < this.length; i++) {
      ctx.fillText(dict[i], 32 + i * 64, 46);
    }

    const asciiTexture = new CanvasTexture(canvas);
    return asciiTexture;
  }

  updateTexture() {
    if (this.material && this.webGL.resources.items.myPhoto) {
      this.material.uniforms.uTexture.value =
        this.webGL.resources.items.myPhoto;
      this.material.needsUpdate = true;
    } else {
      console.warn(
        "Texture introuvable : ",
        Object.keys(this.webGL.resources.items)
      );
    }
  }

  calculateDimensions() {
    const visibleHeight =
      2 *
      Math.tan((this.camera.instance.fov * Math.PI) / 360) *
      this.camera.instance.position.z;

    const visibleWidth = visibleHeight * this.camera.instance.aspect;
    this.canvasAspect = visibleWidth / visibleHeight;

    // Calcul de la grille
    this.cellSize = visibleHeight / this.rows;
    this.actualColumns = Math.floor(visibleWidth / this.cellSize);

    this.totalWidth = this.actualColumns * this.cellSize;
    this.totalHeight = this.rows * this.cellSize;

    const newInstances = this.rows * this.actualColumns;
    if (newInstances !== this.instances) {
      this.instances = newInstances;
      this.needsNewMesh = true;
    }
  }

  setGeometry() {
    this.geometry = new PlaneGeometry(
      this.cellSize * 0.95,
      this.cellSize * 0.95
    );
  }

  setMaterial() {
    this.material = new RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: null },
        uASCIILength: { value: this.length },
        uASCIITexture: { value: this.asciiTexture },
        uScale: { value: new Vector2(1, 1) },
        uParallax: { value: 0 },
        uImageOffset: { value: new Vector2(0, 0.1) },
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

        matrix.setPosition(x, y, 0);
        this.mesh.setMatrixAt(index, matrix);
      }
    }

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  resize() {
    this.calculateDimensions();
    this.geometry.dispose();
    this.setGeometry();

    if (this.needsNewMesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      this.mesh.material.dispose();

      this.setMesh();
      this.scene.add(this.mesh);
      this.needsNewMesh = false;
    }

    this.createGeometryGrid();

    if (this.imageAspect > this.canvasAspect) {
      this.material.uniforms.uScale.value.set(
        Math.min(this.imageAspect / this.canvasAspect, 1),
        1
      );
    } else {
      this.material.uniforms.uScale.value.set(
        1,
        Math.min(this.imageAspect / this.canvasAspect, 1)
      );
    }
  }

  update() {
    const scrollY = window.pageYOffset;
    const factor = 0.0001;

    this.material.uniforms.uParallax.value = scrollY * factor;

    const imageOffset = scrollY * 0.0009;
    this.material.uniforms.uImageOffset.value.set(0, imageOffset);
  }
}
