"use strict";
(self["webpackChunkboilerplate"] = self["webpackChunkboilerplate"] || []).push([["app_index_js"],{

/***/ "./app/WebGL/AsciiHero/index.js":
/*!**************************************!*\
  !*** ./app/WebGL/AsciiHero/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AsciiHero)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");
/* harmony import */ var _utils_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/colors */ "./app/utils/colors.js");
/* harmony import */ var _shaders_asciiHero_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/asciiHero/vertex.glsl */ "./app/WebGL/shaders/asciiHero/vertex.glsl");
/* harmony import */ var _shaders_asciiHero_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/asciiHero/fragment.glsl */ "./app/WebGL/shaders/asciiHero/fragment.glsl");
/* harmony import */ var _Background__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Background */ "./app/WebGL/Background/index.js");
/* harmony import */ var _AsciiImage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AsciiImage */ "./app/WebGL/AsciiImage/index.js");






class AsciiHero {
  constructor(webGL) {
    this.webGL = webGL;
    this.scene = this.webGL.scene;
    this.camera = this.webGL.camera;
    this.background = new _Background__WEBPACK_IMPORTED_MODULE_3__["default"](); // Ici, c'est l'instance créée dans WebGL, je veux juste récupérer la scene
    this.asciiEffect = new _AsciiImage__WEBPACK_IMPORTED_MODULE_4__["default"]();
    this.backgroundWidth = this.background.fov_y * this.background.webGL.camera.instance.aspect * 2;
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
    let dict = ".-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@";
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
    let asciiTexture = new three__WEBPACK_IMPORTED_MODULE_5__.CanvasTexture(canvas);
    asciiTexture.needsUpdate = true;
    return asciiTexture;
  }
  getRenderTarget() {
    this.backgroundRenderTarget = new three__WEBPACK_IMPORTED_MODULE_5__.WebGLRenderTarget(this.background.webGL.canvas.instance.width, this.background.webGL.canvas.instance.height);
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
    this.geometry = new three__WEBPACK_IMPORTED_MODULE_5__.PlaneGeometry(this.cellSize * 0.9, this.cellSize * 0.9);
  }
  setMaterial() {
    this.material = new three__WEBPACK_IMPORTED_MODULE_5__.RawShaderMaterial({
      vertexShader: _shaders_asciiHero_vertex_glsl__WEBPACK_IMPORTED_MODULE_1__,
      fragmentShader: _shaders_asciiHero_fragment_glsl__WEBPACK_IMPORTED_MODULE_2__,
      uniforms: {
        uResolution: {
          value: new three__WEBPACK_IMPORTED_MODULE_5__.Vector2(this.webGL.canvas.instance.width, this.webGL.canvas.instance.height).multiplyScalar(Math.min(window.devicePixelRatio, 2))
        },
        uBackgroundTexture: {
          value: null
        },
        uASCIILength: {
          value: this.length
        },
        uASCIITexture: {
          value: this.asciiTexture
        },
        uTotalWidth: {
          value: this.totalWidth
        },
        uTotalHeight: {
          value: this.totalHeight
        },
        uColor0: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[0]
        },
        uColor1: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[1]
        },
        uColor2: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[2]
        },
        uColor3: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[3]
        },
        uColor4: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[4]
        }
      }
    });
  }
  setMesh() {
    this.mesh = new three__WEBPACK_IMPORTED_MODULE_5__.InstancedMesh(this.geometry, this.material, this.instances);
  }
  createGeometryGrid() {
    const matrix = new three__WEBPACK_IMPORTED_MODULE_5__.Matrix4();
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
    this.backgroundRenderTarget.setSize(this.webGL.canvas.instance.width, this.webGL.canvas.instance.height);
  }
  update() {
    this.webGL.renderer.instance.setRenderTarget(this.backgroundRenderTarget);
    this.webGL.renderer.instance.render(this.background.scene, this.background.webGL.camera.instance);
    this.material.uniforms.uBackgroundTexture.value = this.backgroundRenderTarget.texture;
    this.webGL.renderer.instance.setRenderTarget(null);
  }
}

/***/ }),

/***/ "./app/WebGL/AsciiImage/index.js":
/*!***************************************!*\
  !*** ./app/WebGL/AsciiImage/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AsciiImage)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");
/* harmony import */ var _utils_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/colors */ "./app/utils/colors.js");
/* harmony import */ var _shaders_asciiImage_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/asciiImage/fragment.glsl */ "./app/WebGL/shaders/asciiImage/fragment.glsl");
/* harmony import */ var _shaders_asciiImage_vertex_glsl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shaders/asciiImage/vertex.glsl */ "./app/WebGL/shaders/asciiImage/vertex.glsl");




let instance = null;
class AsciiImage {
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
    this.scale = new three__WEBPACK_IMPORTED_MODULE_3__.Vector2(1, 1);
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
      this.imageAspect = this.webGL.resources.items.myPhoto.width / this.webGL.resources.items.myPhoto.height;
      this.resize();
    });
    if (this.webGL.resources.loaded === this.webGL.resources.toLoad) {
      this.updateTexture();
    }
  }
  createASCIIGrid() {
    const dict = ".-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@";
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
    const asciiTexture = new three__WEBPACK_IMPORTED_MODULE_3__.CanvasTexture(canvas);
    return asciiTexture;
  }
  updateTexture() {
    if (this.material && this.webGL.resources.items.myPhoto) {
      this.material.uniforms.uTexture.value = this.webGL.resources.items.myPhoto;
      this.material.needsUpdate = true;
    } else {
      console.warn("Texture introuvable : ", Object.keys(this.webGL.resources.items));
    }
  }
  calculateDimensions() {
    const visibleHeight = 2 * Math.tan(this.camera.instance.fov * Math.PI / 360) * this.camera.instance.position.z;
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
    this.geometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(this.cellSize * 0.95, this.cellSize * 0.95);
  }
  setMaterial() {
    this.material = new three__WEBPACK_IMPORTED_MODULE_3__.RawShaderMaterial({
      vertexShader: _shaders_asciiImage_vertex_glsl__WEBPACK_IMPORTED_MODULE_2__,
      fragmentShader: _shaders_asciiImage_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__,
      uniforms: {
        uTexture: {
          value: null
        },
        uASCIILength: {
          value: this.length
        },
        uASCIITexture: {
          value: this.asciiTexture
        },
        uScale: {
          value: new three__WEBPACK_IMPORTED_MODULE_3__.Vector2(1, 1)
        },
        uParallax: {
          value: 0
        },
        uImageOffset: {
          value: new three__WEBPACK_IMPORTED_MODULE_3__.Vector2(0, 0.1)
        },
        uColor0: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[0]
        },
        uColor1: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[1]
        },
        uColor2: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[2]
        },
        uColor3: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[3]
        },
        uColor4: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_0__["default"])()[4]
        }
      }
    });
  }
  setMesh() {
    this.mesh = new three__WEBPACK_IMPORTED_MODULE_3__.InstancedMesh(this.geometry, this.material, this.instances);
  }
  createGeometryGrid() {
    const matrix = new three__WEBPACK_IMPORTED_MODULE_3__.Matrix4();
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
      this.material.uniforms.uScale.value.set(Math.min(this.imageAspect / this.canvasAspect, 1), 1);
    } else {
      this.material.uniforms.uScale.value.set(1, Math.min(this.imageAspect / this.canvasAspect, 1));
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

/***/ }),

/***/ "./app/WebGL/Background/index.js":
/*!***************************************!*\
  !*** ./app/WebGL/Background/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Background)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");
/* harmony import */ var _shaders_background_vertex_glsl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shaders/background/vertex.glsl */ "./app/WebGL/shaders/background/vertex.glsl");
/* harmony import */ var _shaders_background_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shaders/background/fragment.glsl */ "./app/WebGL/shaders/background/fragment.glsl");
/* harmony import */ var _utils_colors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/colors */ "./app/utils/colors.js");



let instance = null;

class Background {
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
    this.geometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(this.fov_y * this.webGL.camera.instance.aspect * 2, this.fov_y * 2, 300, 300);
  }
  setMaterial() {
    this.material = new three__WEBPACK_IMPORTED_MODULE_3__.RawShaderMaterial({
      vertexShader: _shaders_background_vertex_glsl__WEBPACK_IMPORTED_MODULE_0__,
      fragmentShader: _shaders_background_fragment_glsl__WEBPACK_IMPORTED_MODULE_1__,
      uniforms: {
        uTime: {
          value: 0
        },
        uColor: {
          value: (0,_utils_colors__WEBPACK_IMPORTED_MODULE_2__["default"])()
        },
        uResolution: {
          value: new three__WEBPACK_IMPORTED_MODULE_3__.Vector2(this.webGL.canvas.instance.width, this.webGL.canvas.instance.height).multiplyScalar(Math.min(window.devicePixelRatio, 2))
        }
      },
      wireframe: false
    });
  }
  setMesh(geometry, material) {
    this.mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI * 0.1;
  }
  setFovY() {
    let ang_rad = this.webGL.camera.instance.fov * Math.PI / 180;
    return this.webGL.camera.instance.position.z * Math.tan(ang_rad / 2) * 2;
  }
  resize() {
    this.fov_y = this.setFovY();
    this.mesh.geometry.dispose();
    this.mesh.geometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(this.fov_y * this.webGL.camera.instance.aspect * 2, this.fov_y * 2, 300, 300);
  }
  update() {
    this.mesh.material.uniforms.uTime.value = this.webGL.time.elapsed * 0.005;
  }
}

/***/ }),

/***/ "./app/WebGL/Camera.js":
/*!*****************************!*\
  !*** ./app/WebGL/Camera.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Camera)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");

class Camera {
  constructor(webGL) {
    this.webGL = webGL;
    this.sizes = this.webGL.sizes;
    this.scene = this.webGL.scene;
    this.canvas = this.webGL.canvas;
    this.setInstance();
  }
  setInstance() {
    this.instance = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
    this.instance.position.set(0, 0, 10);
    this.scene.add(this.instance);
  }
  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }
}

/***/ }),

/***/ "./app/WebGL/Canvas.js":
/*!*****************************!*\
  !*** ./app/WebGL/Canvas.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Canvas)
/* harmony export */ });
/* harmony import */ var _Utils_EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils/EventEmitter */ "./app/WebGL/Utils/EventEmitter.js");

class Canvas extends _Utils_EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(id) {
    super();
    this.id = id;
    this.canvas = document.querySelector(this.id);
    this.instance = this.init();
    window.addEventListener("resize", () => {
      this.instance.width = this.canvas.clientWidth;
      this.instance.height = this.canvas.clientHeight;
    });
  }
  init() {
    const canvas = document.createElement("canvas");
    canvas.width = this.canvas.clientWidth;
    canvas.height = this.canvas.clientHeight;
    this.canvas.append(canvas);
    return canvas;
  }
}

/***/ }),

/***/ "./app/WebGL/Renderer.js":
/*!*******************************!*\
  !*** ./app/WebGL/Renderer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Renderer)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");

class Renderer {
  constructor(webGL) {
    this.webGL = webGL;
    this.canvas = this.webGL.canvas;
    this.sizes = this.webGL.sizes;
    this.scene = this.webGL.scene;
    this.camera = this.webGL.camera;
    this.setInstance();
  }
  setInstance() {
    this.instance = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({
      canvas: this.canvas.instance,
      antialias: true,
      alpha: true
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

/***/ }),

/***/ "./app/WebGL/Utils/EventEmitter.js":
/*!*****************************************!*\
  !*** ./app/WebGL/Utils/EventEmitter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EventEmitter)
/* harmony export */ });
class EventEmitter {
  constructor() {
    this.callbacks = {};
    this.callbacks.base = {};
  }
  on(_names, callback) {
    // Errors
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong names");
      return false;
    }
    if (typeof callback === "undefined") {
      console.warn("wrong callback");
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach(_name => {
      // Resolve name
      const name = this.resolveName(_name);

      // Create namespace if not exist
      if (!(this.callbacks[name.namespace] instanceof Object)) this.callbacks[name.namespace] = {};

      // Create callback if not exist
      if (!(this.callbacks[name.namespace][name.value] instanceof Array)) this.callbacks[name.namespace][name.value] = [];

      // Add callback
      this.callbacks[name.namespace][name.value].push(callback);
    });
    return this;
  }
  off(_names) {
    // Errors
    if (typeof _names === "undefined" || _names === "") {
      console.warn("wrong name");
      return false;
    }

    // Resolve names
    const names = this.resolveNames(_names);

    // Each name
    names.forEach(_name => {
      // Resolve name
      const name = this.resolveName(_name);

      // Remove namespace
      if (name.namespace !== "base" && name.value === "") {
        delete this.callbacks[name.namespace];
      }

      // Remove specific callback in namespace
      else {
        // Default
        if (name.namespace === "base") {
          // Try to remove from each namespace
          for (const namespace in this.callbacks) {
            if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
              delete this.callbacks[namespace][name.value];

              // Remove namespace if empty
              if (Object.keys(this.callbacks[namespace]).length === 0) delete this.callbacks[namespace];
            }
          }
        }

        // Specified namespace
        else if (this.callbacks[name.namespace] instanceof Object && this.callbacks[name.namespace][name.value] instanceof Array) {
          delete this.callbacks[name.namespace][name.value];

          // Remove namespace if empty
          if (Object.keys(this.callbacks[name.namespace]).length === 0) delete this.callbacks[name.namespace];
        }
      }
    });
    return this;
  }
  trigger(_name, _args) {
    // Errors
    if (typeof _name === "undefined" || _name === "") {
      console.warn("wrong name");
      return false;
    }
    let finalResult = null;
    let result = null;

    // Default args
    const args = !(_args instanceof Array) ? [] : _args;

    // Resolve names (should on have one event)
    let name = this.resolveNames(_name);

    // Resolve name
    name = this.resolveName(name[0]);

    // Default namespace
    if (name.namespace === "base") {
      // Try to find callback in each namespace
      for (const namespace in this.callbacks) {
        if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
          this.callbacks[namespace][name.value].forEach(function (callback) {
            result = callback.apply(this, args);
            if (typeof finalResult === "undefined") {
              finalResult = result;
            }
          });
        }
      }
    }

    // Specified namespace
    else if (this.callbacks[name.namespace] instanceof Object) {
      if (name.value === "") {
        console.warn("wrong name");
        return this;
      }
      this.callbacks[name.namespace][name.value].forEach(function (callback) {
        result = callback.apply(this, args);
        if (typeof finalResult === "undefined") finalResult = result;
      });
    }
    return finalResult;
  }
  resolveNames(_names) {
    let names = _names;
    names = names.replace(/[^a-zA-Z0-9 ,/.]/g, "");
    names = names.replace(/[,/]+/g, " ");
    names = names.split(" ");
    return names;
  }
  resolveName(name) {
    const newName = {};
    const parts = name.split(".");
    newName.original = name;
    newName.value = parts[0];
    newName.namespace = "base"; // Base namespace

    // Specified namespace
    if (parts.length > 1 && parts[1] !== "") {
      newName.namespace = parts[1];
    }
    return newName;
  }
}

/***/ }),

/***/ "./app/WebGL/Utils/Resources.js":
/*!**************************************!*\
  !*** ./app/WebGL/Utils/Resources.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Resources)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./app/WebGL/Utils/EventEmitter.js");
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");


class Resources extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(sources) {
    super();
    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;
    this.setLoaders();
    this.startLoading();
  }
  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader();
  }
  startLoading() {
    for (const source of this.sources) {
      if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, file => {
          this.sourceLoaded(source, file);
        }, progress => {
          console.log("Loading progress:", progress);
        }, error => {
          console.error("Error loading texture:", source.name, error);
        });
      }
    }
  }
  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}

/***/ }),

/***/ "./app/WebGL/Utils/Sizes.js":
/*!**********************************!*\
  !*** ./app/WebGL/Utils/Sizes.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sizes)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./app/WebGL/Utils/EventEmitter.js");

class Sizes extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(canvas) {
    super();
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.pixelRation = Math.min(window.devicePixelRatio, 2);
    window.addEventListener("resize", () => {
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.pixelRation = Math.min(window.devicePixelRatio, 2);
      this.trigger("resize");
    });
  }
}

/***/ }),

/***/ "./app/WebGL/Utils/Time.js":
/*!*********************************!*\
  !*** ./app/WebGL/Utils/Time.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Time)
/* harmony export */ });
/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ "./app/WebGL/Utils/EventEmitter.js");

class Time extends _EventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16;
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    this.trigger("tick");
    window.requestAnimationFrame(() => {
      this.tick();
    });
  }
}

/***/ }),

/***/ "./app/WebGL/index.js":
/*!****************************!*\
  !*** ./app/WebGL/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ WebGL)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");
/* harmony import */ var _Camera__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Camera */ "./app/WebGL/Camera.js");
/* harmony import */ var _Renderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Renderer */ "./app/WebGL/Renderer.js");
/* harmony import */ var _Utils_Sizes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/Sizes */ "./app/WebGL/Utils/Sizes.js");
/* harmony import */ var _Utils_Time__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/Time */ "./app/WebGL/Utils/Time.js");
/* harmony import */ var _Utils_Resources__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Utils/Resources */ "./app/WebGL/Utils/Resources.js");
/* harmony import */ var _Background__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Background */ "./app/WebGL/Background/index.js");
/* harmony import */ var _AsciiHero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AsciiHero */ "./app/WebGL/AsciiHero/index.js");
/* harmony import */ var _AsciiImage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AsciiImage */ "./app/WebGL/AsciiImage/index.js");
/* harmony import */ var _sources__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sources */ "./app/WebGL/sources.js");










class WebGL {
  constructor(canvas, type) {
    this.canvas = canvas;

    // Setup
    this.sizes = new _Utils_Sizes__WEBPACK_IMPORTED_MODULE_2__["default"](this.canvas.instance);
    this.time = new _Utils_Time__WEBPACK_IMPORTED_MODULE_3__["default"]();
    this.scene = new three__WEBPACK_IMPORTED_MODULE_9__.Scene();
    this.resources = new _Utils_Resources__WEBPACK_IMPORTED_MODULE_4__["default"](_sources__WEBPACK_IMPORTED_MODULE_8__["default"]);
    this.camera = new _Camera__WEBPACK_IMPORTED_MODULE_0__["default"](this);
    this.renderer = new _Renderer__WEBPACK_IMPORTED_MODULE_1__["default"](this);
    this.effect = this.initEffectByType(type);
    this.sizes.on("resize", () => {
      this.resize();
    });
    this.time.on("tick", () => {
      this.update();
    });
  }
  initEffectByType(type) {
    switch (type) {
      case "webglBackground":
        return new _Background__WEBPACK_IMPORTED_MODULE_5__["default"](this);
      case "webglAsciiHero":
        return new _AsciiHero__WEBPACK_IMPORTED_MODULE_6__["default"](this);
      case "webglAsciiImage":
        return new _AsciiImage__WEBPACK_IMPORTED_MODULE_7__["default"](this);
      default:
        console.warn(`[WebGL] Unknown type: ${type}`);
        return null;
    }
  }
  resize() {
    this.camera.resize();
    this.renderer.resize();
  }
  update() {
    if (this.effect && this.effect.update) {
      this.effect.update();
    }
    this.renderer.update();
  }
}

/***/ }),

/***/ "./app/WebGL/sources.js":
/*!******************************!*\
  !*** ./app/WebGL/sources.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{
  name: "myPhoto",
  type: "texture",
  path: "image__1.jpg"
}]);

/***/ }),

/***/ "./app/components/Competence/index.js":
/*!********************************************!*\
  !*** ./app/components/Competence/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Competence)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");


class Competence extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      element: ".competence",
      elements: {
        items: ".competence__item",
        glitched: ".glitched"
      },
      id: "competence"
    });
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.glitched, element => {
      this.animation.animateGlitchText(element);
    });
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.items, item => {
      item.addEventListener("mouseenter", e => this.animation.handleHoverAnimation(e, item, "hover"));
      item.addEventListener("mouseleave", e => this.animation.handleHoverAnimation(e, item, "static"));
    });
  }
}

/***/ }),

/***/ "./app/components/Contact/index.js":
/*!*****************************************!*\
  !*** ./app/components/Contact/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Contact)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");



class Contact extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      element: ".contact",
      elements: {
        wrapper: ".contact__wrapper",
        items: ".coordinates__item",
        socials: ".social__link",
        glitched: ".glitched",
        downloadButton: ".download"
      },
      id: "contact"
    });
    this.downloadButton = this.elements.downloadButton[0];
    this.setupCVDownload();
    this.animation.animateArrowOnHover(this.elements.socials);
    this.setupDownloadButtonAnimations();
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.glitched, element => {
      this.animation.animateGlitchText(element);
    });
  }
  setupCVDownload() {
    if (!this.downloadButton) return;
    this.downloadButton.addEventListener("click", () => {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      const link = document.createElement("a");
      link.href = "CV_Victor_2025.pdf";
      link.download = `CV_Victor_${formattedDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  getAllSVG() {
    const elements = {};
    const allParts = ["arrow__bar", "arrow__head", "socle"];
    allParts.forEach(part => {
      const el = this.downloadButton.querySelector(`.${part}`);
      if (el) elements[`${part}`] = el;
      for (let i = 0; i <= 3; i++) {
        const preEl = this.downloadButton.querySelector(`.${part}__${i}`);
        if (preEl) elements[`${part}__${i}`] = preEl;
      }
    });
    return elements;
  }
  createItems() {
    const allSVG = this.getAllSVG();
    const items = [{
      bar: allSVG["arrow__bar__0"],
      head: allSVG["arrow__head__0"],
      socle: allSVG["socle__0"],
      barDelay: 0,
      headDelay: 0.2,
      socleDelay: 0.2
    }, {
      bar: allSVG["arrow__bar__1"],
      head: allSVG["arrow__head__1"],
      socle: allSVG["socle__1"],
      barDelay: 0.1,
      headDelay: 0.3,
      socleDelay: 0.3
    }, {
      bar: allSVG["arrow__bar__2"],
      head: allSVG["arrow__head__2"],
      socle: allSVG["socle__2"],
      barDelay: 0.2,
      headDelay: 0.4,
      socleDelay: 0.4
    }, {
      bar: allSVG["arrow__bar__3"],
      head: allSVG["arrow__head__3"],
      socle: allSVG["socle__3"],
      barDelay: 0.3,
      headDelay: 0.5,
      socleDelay: 0.5
    }];
    return items;
  }
  setupDownloadButtonAnimations() {
    const items = this.createItems();
    const tl = gsap__WEBPACK_IMPORTED_MODULE_2__["default"].timeline({
      paused: true
    });
    const ease = [0.77, 0, 0.175, 1];
    const isMobile = window.innerWidth <= 621; // Détection mobile (ajustez la valeur selon vos besoins)

    items.forEach((item, index) => {
      const label = `start${index}`;
      const groupOffset = index * 0.05; // ⬅️ Avance chaque groupe de 0.05s

      tl.add(label, groupOffset); // ⬅️ place le groupe légèrement après le précédent

      tl.fromTo(item.bar, {
        drawSVG: "0%"
      }, {
        drawSVG: "100%",
        duration: 0.3,
        ease
      }, `${label}+=${item.barDelay}`).fromTo(item.head, {
        drawSVG: "50% 50%"
      }, {
        drawSVG: "0% 100%",
        duration: 0.3,
        ease
      }, `${label}+=${item.headDelay}`).fromTo(item.socle, {
        drawSVG: "50% 50%"
      }, {
        drawSVG: "0% 100%",
        duration: 0.3,
        ease
      }, `${label}+=${item.socleDelay}`);
    });

    // Sur mobile : activer l'animation par défaut
    if (isMobile) {
      tl.play(); // Joue l'animation immédiatement sur mobile
    } else {
      // Sur desktop : appliquer l'animation au survol seulement
      this.downloadButton.addEventListener("mouseenter", () => {
        tl.play();
      });
      this.downloadButton.addEventListener("mouseleave", () => {
        tl.reverse();
      });
    }
  }
}

/***/ }),

/***/ "./app/components/Description/index.js":
/*!*********************************************!*\
  !*** ./app/components/Description/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Description)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");


class Description extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      element: ".description",
      elements: {
        glitched: ".glitched"
      },
      id: "description"
    });
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.glitched, (element, index) => {
      setTimeout(() => {
        this.animation.animateGlitchText(element);
      }, 500 * index);
    });
  }
}

/***/ }),

/***/ "./app/components/Experience/index.js":
/*!********************************************!*\
  !*** ./app/components/Experience/index.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Experience)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");
/* harmony import */ var _partials_Cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../partials/Cards */ "./app/partials/Cards/index.js");



class Experience extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      element: ".experience",
      elements: {
        title: ".experience__title",
        glitched: ".glitched",
        cards: document.querySelectorAll(".card"),
        card: ".card"
      },
      id: "experience"
    });
    this.cards = new _partials_Cards__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.cards.scaleCards(this.elements.card);
    this.cards.pinCards(this.elements.card);
    this.animation.setupCardAnimations(this.elements.cards);
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.glitched, element => {
      this.animation.animateGlitchText(element);
    });
  }
}

/***/ }),

/***/ "./app/components/Formation/index.js":
/*!*******************************************!*\
  !*** ./app/components/Formation/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Formation)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");
/* harmony import */ var _partials_Cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../partials/Cards */ "./app/partials/Cards/index.js");



class Formation extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      element: ".formation",
      elements: {
        title: ".formation__title",
        glitched: ".glitched",
        cards: document.querySelectorAll(".card"),
        card: ".card"
      },
      id: "formation"
    });
    this.cards = new _partials_Cards__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.cards.scaleCards(this.elements.card);
    this.cards.pinCards(this.elements.card);
    this.animation.setupCardAnimations(this.elements.cards);
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.glitched, element => {
      this.animation.animateGlitchText(element);
    });
  }
}

/***/ }),

/***/ "./app/components/Hero/index.js":
/*!**************************************!*\
  !*** ./app/components/Hero/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Hero)
/* harmony export */ });
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");

class Hero extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      element: ".hero",
      elements: {
        wrapper: ".hero__wrapper",
        mainSubtitle: ".subtitle__main",
        secondSubtitle: ".subtitle__second",
        glitched: ".glitched"
      },
      id: "hero"
    });
  }
  animateIn() {
    this.elements.glitched.forEach((e, index) => {
      setTimeout(() => {
        this.animation.animateGlitchText(e);
      }, index * 200);
    });
  }
}

/***/ }),

/***/ "./app/index.js":
/*!**********************!*\
  !*** ./app/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _components_Competence__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Competence */ "./app/components/Competence/index.js");
/* harmony import */ var _components_Contact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Contact */ "./app/components/Contact/index.js");
/* harmony import */ var _components_Description__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Description */ "./app/components/Description/index.js");
/* harmony import */ var _components_Experience__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Experience */ "./app/components/Experience/index.js");
/* harmony import */ var _components_Formation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Formation */ "./app/components/Formation/index.js");
/* harmony import */ var _components_Hero__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Hero */ "./app/components/Hero/index.js");
/* harmony import */ var _partials_Cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./partials/Cards */ "./app/partials/Cards/index.js");
/* harmony import */ var _partials_Cursor__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./partials/Cursor */ "./app/partials/Cursor/index.js");
/* harmony import */ var _partials_Navigation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./partials/Navigation */ "./app/partials/Navigation/index.js");
/* harmony import */ var _partials_Progress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./partials/Progress */ "./app/partials/Progress/index.js");
/* harmony import */ var _partials_Header__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./partials/Header */ "./app/partials/Header/index.js");
/* harmony import */ var _WebGL__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./WebGL */ "./app/WebGL/index.js");
/* harmony import */ var _WebGL_Canvas__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./WebGL/Canvas */ "./app/WebGL/Canvas.js");
// Import components







// Import partials






// Import WebGL


class App {
  constructor() {
    // Local
    this.sections = {};
    this.partials = {};
    this.canvas = {};
    this.webGL = {};

    // Méthodes
    this.initSections();
    this.initPartials();
    this.initCanvas();
    this.initWEGL();
  }
  initSections() {
    this.sections = {
      hero: new _components_Hero__WEBPACK_IMPORTED_MODULE_5__["default"](),
      description: new _components_Description__WEBPACK_IMPORTED_MODULE_2__["default"](),
      formation: new _components_Formation__WEBPACK_IMPORTED_MODULE_4__["default"](),
      competence: new _components_Competence__WEBPACK_IMPORTED_MODULE_0__["default"](),
      experience: new _components_Experience__WEBPACK_IMPORTED_MODULE_3__["default"](),
      contact: new _components_Contact__WEBPACK_IMPORTED_MODULE_1__["default"]()
    };
  }
  initPartials() {
    this.partials = {
      header: new _partials_Header__WEBPACK_IMPORTED_MODULE_10__["default"](),
      cursor: new _partials_Cursor__WEBPACK_IMPORTED_MODULE_7__["default"](),
      navigation: new _partials_Navigation__WEBPACK_IMPORTED_MODULE_8__["default"](),
      // progress: new Progress(),
      cards: new _partials_Cards__WEBPACK_IMPORTED_MODULE_6__["default"]()
    };
  }
  initCanvas() {
    this.canvas = {
      cBackground: new _WebGL_Canvas__WEBPACK_IMPORTED_MODULE_12__["default"]("#cBackground"),
      cAsciiHero: new _WebGL_Canvas__WEBPACK_IMPORTED_MODULE_12__["default"]("#cAsciiHero"),
      cAsciiImage: new _WebGL_Canvas__WEBPACK_IMPORTED_MODULE_12__["default"]("#cAsciiImage")
    };
  }
  initWEGL() {
    this.webGL = {
      noisy_background: new _WebGL__WEBPACK_IMPORTED_MODULE_11__["default"](this.canvas.cBackground, "webglBackground"),
      image_distorsion: new _WebGL__WEBPACK_IMPORTED_MODULE_11__["default"](this.canvas.cAsciiImage, "webglAsciiImage"),
      hero_rectangle: new _WebGL__WEBPACK_IMPORTED_MODULE_11__["default"](this.canvas.cAsciiHero, "webglAsciiHero")
    };
  }
  animateElements() {
    this.partials.header.animateIn();
    this.sections.hero.animateIn();
    this.partials.navigation.animateIn();
  }
}

/***/ }),

/***/ "./app/partials/Cards/index.js":
/*!*************************************!*\
  !*** ./app/partials/Cards/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cards)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");
/* harmony import */ var gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gsap/ScrollTrigger */ "./node_modules/gsap/ScrollTrigger.js");




gsap__WEBPACK_IMPORTED_MODULE_2__["default"].registerPlugin(gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_3__.ScrollTrigger);
class Cards extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      element: ".card",
      elements: {
        glitched: ".glitched"
      },
      id: "cards"
    });
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.glitched, element => {
      this.animation.animateGlitchText(element);
    });
  }
  scaleCards(cardsWrapper) {
    const cards = gsap__WEBPACK_IMPORTED_MODULE_2__["default"].utils.toArray(cardsWrapper);
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(cards, (card, key) => {
      const total = cards.length;
      const scaleCardTimeline = gsap__WEBPACK_IMPORTED_MODULE_2__["default"].timeline({
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top top+=100",
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      // 2. Ajouter l'animation dans la timeline
      scaleCardTimeline.to(card, {
        scale: 1 - (total - key) * 0.03,
        ease: "none"
      });
    });
  }
  pinCards(cardsWrapper) {
    // Voir ça pour gérer niveau BaseElement
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cards = gsap__WEBPACK_IMPORTED_MODULE_2__["default"].utils.toArray(cardsWrapper);
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(cards, (card, key) => {
      const total = cards.length;
      gsap_ScrollTrigger__WEBPACK_IMPORTED_MODULE_3__.ScrollTrigger.create({
        trigger: card,
        start: `top-=${20 + key * 20}% 10%`,
        endTrigger: cards[total - 1],
        end: isMobile ? "bottom 50%" : "bottom 70%",
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true
      });
    });
  }
}

/***/ }),

/***/ "./app/partials/Cursor/index.js":
/*!**************************************!*\
  !*** ./app/partials/Cursor/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Cursor)
/* harmony export */ });
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");


class Cursor extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      element: ".cursor",
      elements: {
        cursor: document.querySelector(".cursor")
      },
      id: "cursor"
    });
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;
    this.mouse = {
      x: 0,
      y: 0
    };
    this.pos = {
      x: 0,
      y: 0
    };
    this.speed = 0.1;
    this.animate = this.animate.bind(this);
    if (this.elements.cursor) {
      this.bind();
      requestAnimationFrame(this.animate);
    }
    this.initHoverEffects();
  }
  bind() {
    document.addEventListener("mousemove", e => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }

  // Logique de déplacement "smooth" du custom curseur
  animate() {
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
    this.elements.cursor.style.left = `${this.pos.x}px`;
    this.elements.cursor.style.top = `${this.pos.y}px`;
    requestAnimationFrame(this.animate);
  }

  // A retravailler
  // Change l'apparence du curseur au hover de certains éléments
  initHoverEffects(elements) {
    const targets = document.querySelectorAll(".navigation__item, .card__footer, .social__link, .coordinates__item, .download");
    targets.forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.cursor, {
          scale: 0.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      el.addEventListener("mouseleave", () => {
        gsap__WEBPACK_IMPORTED_MODULE_1__["default"].to(this.elements.cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }
}

/***/ }),

/***/ "./app/partials/Header/index.js":
/*!**************************************!*\
  !*** ./app/partials/Header/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");


class Header extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor() {
    super({
      element: ".header__wrapper",
      elements: {
        socials: ".social__link",
        glitched: ".glitched"
      },
      id: "header"
    });
    this.animation.animateArrowOnHover(this.elements.socials);
  }
  animateIn() {
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(this.elements.glitched, (e, index) => {
      setTimeout(() => {
        this.animation.animateGlitchText(e);
      }, index * 200);
    });
  }
}

/***/ }),

/***/ "./app/partials/Navigation/index.js":
/*!******************************************!*\
  !*** ./app/partials/Navigation/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Navigation)
/* harmony export */ });
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/each */ "./node_modules/lodash/each.js");
/* harmony import */ var lodash_each__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_each__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _classes_ScrollManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../classes/ScrollManager */ "./app/classes/ScrollManager.js");



class Navigation extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      element: ".navigation__wrapper",
      elements: {
        items: [...document.querySelectorAll(".navigation__item")],
        sections: [...document.querySelectorAll("section")],
        value: ".progress__value",
        glitched: ".glitched"
      },
      id: ".navigation"
    });
    console.log(this.elements);
    this.scrollManager = new _classes_ScrollManager__WEBPACK_IMPORTED_MODULE_2__["default"]();
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;
    this.currentID = 0;
    this.addClickListeners();
    window.addEventListener("scroll", () => {
      this.updateScrollPercent();
      this.updateActiveSection();
    });
  }
  addClickListeners() {
    lodash_each__WEBPACK_IMPORTED_MODULE_1___default()(this.elements.items, item => {
      const target = item.querySelector(".navigation__title");
      const targetId = target.getAttribute("data-target");
      const targetSection = document.querySelector(`${targetId}`);
      if (targetSection) {
        const handleClick = e => {
          e.preventDefault();
          this.scrollToSection(targetSection);
        };
        item.addEventListener("click", handleClick);
      }
    });
  }
  scrollToSection(targetSection) {
    this.scrollManager.enable();
    this.scrollManager.lenis.scrollTo(targetSection, {
      easing: t => 1 - Math.pow(1 - t, 4)
    });
  }
  updateActiveSection() {
    lodash_each__WEBPACK_IMPORTED_MODULE_1___default()(this.elements.sections, (section, i) => {
      const offsetTop = section.offsetTop;
      if (this.scrollManager.lenis.scroll >= offsetTop - window.innerHeight / 2) {
        this.currentID = i;
      }
      lodash_each__WEBPACK_IMPORTED_MODULE_1___default()(this.elements.items, (item, i) => {
        item.classList.toggle("active", i === this.currentID);
      });
    });
  }
  animateIn() {
    lodash_each__WEBPACK_IMPORTED_MODULE_1___default()(this.elements.glitched, e => {
      this.animation.animateGlitchText(e);
    });
  }
  updateScrollPercent() {
    console.log(this.elements.value);
    this.elements.value[0].textContent = `${Math.round(this.scrollManager.lenis.progress * 100)}%`;
  }
}

/***/ }),

/***/ "./app/partials/Progress/index.js":
/*!****************************************!*\
  !*** ./app/partials/Progress/index.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Progress)
/* harmony export */ });
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");

class Progress extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      element: ".progress__wrapper",
      elements: {
        value: ".progress__value"
      },
      id: ".progress"
    });
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;
    window.addEventListener("scroll", () => {
      this.updateScrollPercent();
    });
  }
  updateScrollPercent() {
    this.elements.value[0].textContent = `${Math.round(this.scrollManager.lenis.progress * 100)}%`;
  }
}

/***/ }),

/***/ "./app/utils/colors.js":
/*!*****************************!*\
  !*** ./app/utils/colors.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ generateColor)
/* harmony export */ });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "./node_modules/three/build/three.core.js");

function generateColor() {
  let colors = ["#8C1DFF", "#F223FF", "#FF2976", "#FF901F", "#FFD318"];
  let palette = colors;
  return palette = palette.map(color => new three__WEBPACK_IMPORTED_MODULE_0__.Color(color));
}

/***/ }),

/***/ "./app/WebGL/shaders/asciiHero/fragment.glsl":
/*!***************************************************!*\
  !*** ./app/WebGL/shaders/asciiHero/fragment.glsl ***!
  \***************************************************/
/***/ ((module) => {

module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D uBackgroundTexture;\nuniform sampler2D uASCIITexture;\nuniform float uASCIILength;\n\nuniform vec3 uColor0;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform vec3 uColor3;\nuniform vec3 uColor4;\n\nvarying vec2 vUv;\nvarying vec2 vGlobalUv; // Au lieu de vUv\n\nvoid main() {\n    vec3 backgroundPixel = texture2D(uBackgroundTexture, vGlobalUv).rgb;\n    \n    // Calculer la luminosité\n    float brightness = dot(backgroundPixel.rgb, vec3(0.299, 0.587, 0.114));\n    \n    // brightness = floor(brightness * 7.5) / 5.0;\n    vec2 asciiUV = vec2((vUv.x / uASCIILength) + floor((brightness * 0.99) * uASCIILength ) / uASCIILength , vUv.y);\n    \n    // Récupérer le caractère\n    vec3 asciiCode = texture2D(uASCIITexture, asciiUV).rgb;\n    \n    // Choisir la couleur selon la luminosité\n    vec3 finalColor;\n   if (brightness < 0.25) finalColor = uColor0;\n    else if (brightness < 0.45) finalColor = uColor1;\n    else if (brightness < 0.65) finalColor = uColor2;\n    else if (brightness < 0.85) finalColor = uColor3;\n    else finalColor = uColor4;\n    \n    // Appliquer la couleur au caractère\n    gl_FragColor = vec4(asciiCode * finalColor , 1.0);\n}";

/***/ }),

/***/ "./app/WebGL/shaders/asciiHero/vertex.glsl":
/*!*************************************************!*\
  !*** ./app/WebGL/shaders/asciiHero/vertex.glsl ***!
  \*************************************************/
/***/ ((module) => {

module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\n\nuniform float uTotalWidth;\nuniform float uTotalHeight;\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute mat4 instanceMatrix;\n\nvarying vec2 vUv;\nvarying vec2 vCenterPosition;\nvarying vec2 vGlobalUv;\n\nvoid main(){\n  vec4 modelPosition = modelMatrix * vec4(position, 1.0);\n  vec4 instancePosition = instanceMatrix * vec4(position, 1.0);\n  \n  vec4 modelViewPosition = viewMatrix * modelMatrix * instancePosition;\n\n  \n  gl_Position = projectionMatrix * modelViewPosition;\n  \n  vec4 worldPosition = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);\n  vGlobalUv = (worldPosition.xy + vec2(uTotalWidth/2.0, uTotalHeight/2.0)) / vec2(uTotalWidth, uTotalHeight);\n  vUv = uv;\n}";

/***/ }),

/***/ "./app/WebGL/shaders/asciiImage/fragment.glsl":
/*!****************************************************!*\
  !*** ./app/WebGL/shaders/asciiImage/fragment.glsl ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D uTexture;\nuniform sampler2D uASCIITexture;\nuniform float uASCIILength;\nuniform vec2 uScale;\n\nuniform vec3 uColor0;\nuniform vec3 uColor1;\nuniform vec3 uColor2;\nuniform vec3 uColor3;\nuniform vec3 uColor4;\n\nuniform vec2 uImageOffset;\nvarying vec2 vUv;\nvarying vec2 vCenterPosition;\n\nvoid main() {\n  vec2 scaledUV = (vCenterPosition - 0.5) * uScale + 0.5;\n\n  // Appliquer le décalage à l'image uniquement\n  scaledUV += uImageOffset * 0.1;\n\n  // Couleur de l'image originale\n  vec3 originalColor = texture2D(uTexture, scaledUV).rgb;\n  \n  // Calcul de la luminosité\n  float brightness = dot(originalColor, vec3(0.299, 0.587, 0.114));\n  brightness = pow(brightness, 1.1);\n\n  // Obtenir la couleur selon la luminosité\n  vec3 finalColor;\n  if (brightness < 0.15) finalColor = uColor0;\n  else if (brightness < 0.35) finalColor = uColor1;\n  else if (brightness < 0.55) finalColor = uColor2;\n  else if (brightness < 0.75) finalColor = uColor3;\n  else finalColor = uColor4;\n\n  // Effet ASCII\n  vec2 asciiUV = vec2((vUv.x / uASCIILength) + floor(brightness * uASCIILength) / uASCIILength, vUv.y);\n  vec3 asciiCode = texture2D(uASCIITexture, asciiUV).rgb;\n  vec3 asciiResult = asciiCode * finalColor;\n\n  \n  gl_FragColor = vec4(asciiResult, 1.0);\n}";

/***/ }),

/***/ "./app/WebGL/shaders/asciiImage/vertex.glsl":
/*!**************************************************!*\
  !*** ./app/WebGL/shaders/asciiImage/vertex.glsl ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 position;\nattribute vec2 uv;\nattribute mat4 instanceMatrix;\n\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\nuniform float uParallax;\n\nvarying vec2 vUv;\nvarying vec2 vCenterPosition;\n\nvoid main() {\n    \n  vec4 instancePosition = instanceMatrix * vec4(position, 1.0);\n  vec4 modelViewPosition = viewMatrix * modelMatrix * instancePosition;\n  \n  vec4 centerWorldPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);\n  vec4 centerScreenPos = projectionMatrix * viewMatrix * modelMatrix * centerWorldPos;\n  \n  gl_Position = projectionMatrix * modelViewPosition;\n  \n  vCenterPosition = (centerScreenPos.xy / centerScreenPos.w) * 0.5 + 0.5;\n\n  vUv = uv;\n}";

/***/ }),

/***/ "./app/WebGL/shaders/background/fragment.glsl":
/*!****************************************************!*\
  !*** ./app/WebGL/shaders/background/fragment.glsl ***!
  \****************************************************/
/***/ ((module) => {

module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nvarying vec3 vColor;\nvarying vec2 vUv;\n\nfloat random(vec2 co){\n  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main() {\n  vec3 color = vColor;\n\n  float grain = random(vUv) * 0.05;\n  color += grain;\n\n  gl_FragColor = vec4(color, 1.0);\n}";

/***/ }),

/***/ "./app/WebGL/shaders/background/vertex.glsl":
/*!**************************************************!*\
  !*** ./app/WebGL/shaders/background/vertex.glsl ***!
  \**************************************************/
/***/ ((module) => {

module.exports = "#define GLSLIFY 1\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 modelMatrix;\n\nuniform float uTime;\nuniform vec3 uColor[5];\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\nvarying vec3 vColor;\n\n//\tSimplex 3D Noise \n//\tby Ian McEwan, Stefan Gustavson (https://github.com/stegu/webgl-noise)\n//\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){ \n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n  // First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n  // Other corners\n  vec3 g = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g;\n  vec3 i1 = min( g.xyz, l.zxy );\n  vec3 i2 = max( g.xyz, l.zxy );\n\n  //  x0 = x0 - 0. + 0.0 * C \n  vec3 x1 = x0 - i1 + 1.0 * C.xxx;\n  vec3 x2 = x0 - i2 + 2.0 * C.xxx;\n  vec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n  // Permutations\n  i = mod(i, 289.0 ); \n  vec4 p = permute( permute( permute( \n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n  // Gradients\n  // ( N*N points uniformly over a square, mapped onto an octahedron.)\n  float n_ = 1.0/7.0; // N=7\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);  //  mod(p,N*N)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n  //Normalise gradients\n  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n  // Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \n                                dot(p2,x2), dot(p3,x3) ) );\n}\n\nvoid main(){\n\n  vec2 noiseCoord = uv * vec2(3.2360679775, 4.85410196625);\n\n  float noise = snoise(vec3(noiseCoord.x + uTime * 0.01 , noiseCoord.y + uTime * 0.01, uTime * 0.01));\n\n  vec3 newPosition = vec3(position.x, position.y, position.z + (noise * 3.0) + sin(uv.x * 10.0) * sin(uv.y * 10.0));\n\n  vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);\n  vec4 mvPosition = viewMatrix  * modelPosition;\n  vec4 projectedPosition = projectionMatrix * mvPosition;\n\n  vColor = uColor[0];\n\n  for(int i = 0; i < 5; i++){\n    float noiseFlow = -uv.x + float(i) * 10.0;\n    float noise = snoise(vec3(noiseCoord.x + (uTime * 0.05) + noiseFlow, noiseCoord.y + (uTime * 0.05) + noiseFlow, uTime * 0.0001));\n    \n    // Normaliser le noise de [-1,1] vers [0,1]\n    noise = (noise + 0.5) * 0.5;\n    \n    vColor = mix(vColor, uColor[i], noise);\n  }\n\n  // Position finale\n  gl_Position = projectedPosition;\n\n  vUv = uv;\n}";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUJBLENBQUEsRUFBRztJQUNwQixJQUFJLENBQUNsSSxRQUFRLENBQUN0SixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM2UyxXQUFXLEdBQUcsR0FBR3JULElBQUksQ0FBQ3NULEtBQUssQ0FDaEQsSUFBSSxDQUFDekIsYUFBYSxDQUFDYSxLQUFLLENBQUNsSyxRQUFRLEdBQUcsR0FDdEMsQ0FBQyxHQUFHO0VBQ047QUFDRjs7Ozs7Ozs7Ozs7Ozs7O0FDeEI4QjtBQUVmLFNBQVNnTCxhQUFhQSxDQUFBLEVBQUc7RUFDdEMsSUFBSS9XLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7RUFDcEUsSUFBSWdYLE9BQU8sR0FBR2hYLE1BQU07RUFFcEIsT0FBUWdYLE9BQU8sR0FBR0EsT0FBTyxDQUFDQyxHQUFHLENBQUVDLEtBQUssSUFBSyxJQUFJSix3Q0FBSyxDQUFDSSxLQUFLLENBQUMsQ0FBQztBQUM1RCIsInNvdXJjZXMiOlsid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL1dlYkdML0FzY2lpSGVyby9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9XZWJHTC9Bc2NpaUltYWdlL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL1dlYkdML0JhY2tncm91bmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvQ2FtZXJhLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL1dlYkdML0NhbnZhcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9XZWJHTC9SZW5kZXJlci5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9XZWJHTC9VdGlscy9FdmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvVXRpbHMvUmVzb3VyY2VzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL1dlYkdML1V0aWxzL1NpemVzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL1dlYkdML1V0aWxzL1RpbWUuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvc291cmNlcy5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9jb21wb25lbnRzL0NvbXBldGVuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvY29tcG9uZW50cy9Db250YWN0L2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL2NvbXBvbmVudHMvRGVzY3JpcHRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvY29tcG9uZW50cy9FeHBlcmllbmNlL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL2NvbXBvbmVudHMvRm9ybWF0aW9uL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL2NvbXBvbmVudHMvSGVyby9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9wYXJ0aWFscy9DYXJkcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9wYXJ0aWFscy9DdXJzb3IvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvcGFydGlhbHMvSGVhZGVyL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL3BhcnRpYWxzL05hdmlnYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvcGFydGlhbHMvUHJvZ3Jlc3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvdXRpbHMvY29sb3JzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIFBsYW5lR2VvbWV0cnksXG4gIEluc3RhbmNlZE1lc2gsXG4gIFJhd1NoYWRlck1hdGVyaWFsLFxuICBWZWN0b3IyLFxuICBXZWJHTFJlbmRlclRhcmdldCxcbiAgQ2FudmFzVGV4dHVyZSxcbiAgTWF0cml4NCxcbn0gZnJvbSBcInRocmVlXCI7XG5cbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4uLy4uL3V0aWxzL2NvbG9yc1wiO1xuXG5pbXBvcnQgdmVydGV4U2hhZGVyIGZyb20gXCIuLi9zaGFkZXJzL2FzY2lpSGVyby92ZXJ0ZXguZ2xzbFwiO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gXCIuLi9zaGFkZXJzL2FzY2lpSGVyby9mcmFnbWVudC5nbHNsXCI7XG5cbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gXCIuLi9CYWNrZ3JvdW5kXCI7XG5pbXBvcnQgQXNjaWlFZmZlY3QgZnJvbSBcIi4uL0FzY2lpSW1hZ2VcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXNjaWlIZXJvIHtcbiAgY29uc3RydWN0b3Iod2ViR0wpIHtcbiAgICB0aGlzLndlYkdMID0gd2ViR0w7XG4gICAgdGhpcy5zY2VuZSA9IHRoaXMud2ViR0wuc2NlbmU7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLndlYkdMLmNhbWVyYTtcblxuICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCk7IC8vIEljaSwgYydlc3QgbCdpbnN0YW5jZSBjcsOpw6llIGRhbnMgV2ViR0wsIGplIHZldXgganVzdGUgcsOpY3Vww6lyZXIgbGEgc2NlbmVcbiAgICB0aGlzLmFzY2lpRWZmZWN0ID0gbmV3IEFzY2lpRWZmZWN0KCk7XG5cbiAgICB0aGlzLmJhY2tncm91bmRXaWR0aCA9XG4gICAgICB0aGlzLmJhY2tncm91bmQuZm92X3kgKiB0aGlzLmJhY2tncm91bmQud2ViR0wuY2FtZXJhLmluc3RhbmNlLmFzcGVjdCAqIDI7XG4gICAgdGhpcy5iYWNrZ3JvdW5kSGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmZvdl95ICogMjtcblxuICAgIHRoaXMucm93cyA9IDcwO1xuICAgIHRoaXMuY29sdW1ucyA9IDcwO1xuICAgIHRoaXMuaW5zdGFuY2VzID0gdGhpcy5yb3dzICogdGhpcy5jb2x1bW5zO1xuICAgIHRoaXMuYXNjaWlUZXh0dXJlID0gdGhpcy5jcmVhdGVBU0NJSUdyaWQoKTtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5nZXRSZW5kZXJUYXJnZXQoKTtcblxuICAgIHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIHRoaXMuc2V0R2VvbWV0cnkoKTtcbiAgICB0aGlzLnNldE1hdGVyaWFsKCk7XG4gICAgdGhpcy5zZXRNZXNoKCk7XG4gICAgdGhpcy5jcmVhdGVHZW9tZXRyeUdyaWQoKTtcblxuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWVzaCk7XG4gIH1cblxuICBjcmVhdGVBU0NJSUdyaWQoKSB7XG4gICAgbGV0IGRpY3QgPVxuICAgICAgXCIuLSc6XyxePTs+PCshcmMqL3o/c0xUdilKNyh8Rml7Q31mSTMxdGx1W25lb1o1WXhqeWFdMkVTd3FrUDZoOWQ0VnBPR2JVQUtYSG04UkQjJEJnME1OV1ElJkBcIjtcbiAgICB0aGlzLmxlbmd0aCA9IGRpY3QubGVuZ3RoO1xuXG4gICAgbGV0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgbGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjYW52YXMud2lkdGggPSB0aGlzLmxlbmd0aCAqIDY0O1xuICAgIGNhbnZhcy5oZWlnaHQgPSA2NDtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZGRkZcIjtcbiAgICBjdHguZm9udCA9IFwiYm9sZCA0MHB4IFNhZmlyb1wiO1xuICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjdHguZmlsbFRleHQoZGljdFtpXSwgMzIgKyBpICogNjQsIDQ2KTtcbiAgICB9XG5cbiAgICBsZXQgYXNjaWlUZXh0dXJlID0gbmV3IENhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgICBhc2NpaVRleHR1cmUubmVlZHNVcGRhdGUgPSB0cnVlO1xuXG4gICAgcmV0dXJuIGFzY2lpVGV4dHVyZTtcbiAgfVxuXG4gIGdldFJlbmRlclRhcmdldCgpIHtcbiAgICB0aGlzLmJhY2tncm91bmRSZW5kZXJUYXJnZXQgPSBuZXcgV2ViR0xSZW5kZXJUYXJnZXQoXG4gICAgICB0aGlzLmJhY2tncm91bmQud2ViR0wuY2FudmFzLmluc3RhbmNlLndpZHRoLFxuICAgICAgdGhpcy5iYWNrZ3JvdW5kLndlYkdMLmNhbnZhcy5pbnN0YW5jZS5oZWlnaHRcbiAgICApO1xuICB9XG5cbiAgY2FsY3VsYXRlRGltZW5zaW9ucygpIHtcbiAgICB0aGlzLnRvdGFsV2lkdGggPSB0aGlzLmJhY2tncm91bmRXaWR0aDtcbiAgICB0aGlzLnRvdGFsSGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kSGVpZ2h0O1xuXG4gICAgdGhpcy5jZWxsU2l6ZSA9IHRoaXMudG90YWxIZWlnaHQgLyB0aGlzLnJvd3M7XG4gICAgdGhpcy5hY3R1YWxDb2x1bW5zID0gTWF0aC5mbG9vcih0aGlzLnRvdGFsV2lkdGggLyB0aGlzLmNlbGxTaXplKTtcblxuICAgIGNvbnN0IG5ld0luc3RhbmNlcyA9IHRoaXMucm93cyAqIHRoaXMuYWN0dWFsQ29sdW1ucztcbiAgICBpZiAobmV3SW5zdGFuY2VzICE9PSB0aGlzLmluc3RhbmNlcykge1xuICAgICAgdGhpcy5pbnN0YW5jZXMgPSBuZXdJbnN0YW5jZXM7XG4gICAgICB0aGlzLm5lZWRzTmV3TWVzaCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2V0R2VvbWV0cnkoKSB7XG4gICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBQbGFuZUdlb21ldHJ5KHRoaXMuY2VsbFNpemUgKiAwLjksIHRoaXMuY2VsbFNpemUgKiAwLjkpO1xuICB9XG5cbiAgc2V0TWF0ZXJpYWwoKSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBSYXdTaGFkZXJNYXRlcmlhbCh7XG4gICAgICB2ZXJ0ZXhTaGFkZXIsXG4gICAgICBmcmFnbWVudFNoYWRlcixcbiAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgIHVSZXNvbHV0aW9uOiB7XG4gICAgICAgICAgdmFsdWU6IG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgdGhpcy53ZWJHTC5jYW52YXMuaW5zdGFuY2Uud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndlYkdMLmNhbnZhcy5pbnN0YW5jZS5oZWlnaHRcbiAgICAgICAgICApLm11bHRpcGx5U2NhbGFyKE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAyKSksXG4gICAgICAgIH0sXG4gICAgICAgIHVCYWNrZ3JvdW5kVGV4dHVyZTogeyB2YWx1ZTogbnVsbCB9LFxuICAgICAgICB1QVNDSUlMZW5ndGg6IHsgdmFsdWU6IHRoaXMubGVuZ3RoIH0sXG4gICAgICAgIHVBU0NJSVRleHR1cmU6IHsgdmFsdWU6IHRoaXMuYXNjaWlUZXh0dXJlIH0sXG4gICAgICAgIHVUb3RhbFdpZHRoOiB7IHZhbHVlOiB0aGlzLnRvdGFsV2lkdGggfSxcbiAgICAgICAgdVRvdGFsSGVpZ2h0OiB7IHZhbHVlOiB0aGlzLnRvdGFsSGVpZ2h0IH0sXG4gICAgICAgIHVDb2xvcjA6IHsgdmFsdWU6IGNvbG9ycygpWzBdIH0sXG4gICAgICAgIHVDb2xvcjE6IHsgdmFsdWU6IGNvbG9ycygpWzFdIH0sXG4gICAgICAgIHVDb2xvcjI6IHsgdmFsdWU6IGNvbG9ycygpWzJdIH0sXG4gICAgICAgIHVDb2xvcjM6IHsgdmFsdWU6IGNvbG9ycygpWzNdIH0sXG4gICAgICAgIHVDb2xvcjQ6IHsgdmFsdWU6IGNvbG9ycygpWzRdIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TWVzaCgpIHtcbiAgICB0aGlzLm1lc2ggPSBuZXcgSW5zdGFuY2VkTWVzaCh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsLCB0aGlzLmluc3RhbmNlcyk7XG4gIH1cblxuICBjcmVhdGVHZW9tZXRyeUdyaWQoKSB7XG4gICAgY29uc3QgbWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcblxuICAgIGNvbnN0IHN0YXJ0WCA9IC10aGlzLnRvdGFsV2lkdGggLyAyICsgdGhpcy5jZWxsU2l6ZSAvIDI7XG4gICAgY29uc3Qgc3RhcnRZID0gLXRoaXMudG90YWxIZWlnaHQgLyAyICsgdGhpcy5jZWxsU2l6ZSAvIDI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuYWN0dWFsQ29sdW1uczsgaisrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaSAqIHRoaXMuYWN0dWFsQ29sdW1ucyArIGo7XG5cbiAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuaW5zdGFuY2VzKSBicmVhaztcblxuICAgICAgICBjb25zdCB4ID0gc3RhcnRYICsgaiAqIHRoaXMuY2VsbFNpemU7XG4gICAgICAgIGNvbnN0IHkgPSBzdGFydFkgKyBpICogdGhpcy5jZWxsU2l6ZTtcbiAgICAgICAgY29uc3QgeiA9IDA7XG5cbiAgICAgICAgbWF0cml4LnNldFBvc2l0aW9uKHgsIHksIHopO1xuICAgICAgICB0aGlzLm1lc2guc2V0TWF0cml4QXQoaW5kZXgsIG1hdHJpeCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tZXNoLmluc3RhbmNlTWF0cml4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICB0aGlzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLnNldEdlb21ldHJ5KCk7XG4gICAgdGhpcy5tZXNoLmdlb21ldHJ5ID0gdGhpcy5nZW9tZXRyeTtcblxuICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlclRhcmdldC5zZXRTaXplKFxuICAgICAgdGhpcy53ZWJHTC5jYW52YXMuaW5zdGFuY2Uud2lkdGgsXG4gICAgICB0aGlzLndlYkdMLmNhbnZhcy5pbnN0YW5jZS5oZWlnaHRcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMud2ViR0wucmVuZGVyZXIuaW5zdGFuY2Uuc2V0UmVuZGVyVGFyZ2V0KHRoaXMuYmFja2dyb3VuZFJlbmRlclRhcmdldCk7XG4gICAgdGhpcy53ZWJHTC5yZW5kZXJlci5pbnN0YW5jZS5yZW5kZXIoXG4gICAgICB0aGlzLmJhY2tncm91bmQuc2NlbmUsXG4gICAgICB0aGlzLmJhY2tncm91bmQud2ViR0wuY2FtZXJhLmluc3RhbmNlXG4gICAgKTtcblxuICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudUJhY2tncm91bmRUZXh0dXJlLnZhbHVlID1cbiAgICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlclRhcmdldC50ZXh0dXJlO1xuXG4gICAgdGhpcy53ZWJHTC5yZW5kZXJlci5pbnN0YW5jZS5zZXRSZW5kZXJUYXJnZXQobnVsbCk7XG4gIH1cbn1cbiIsImltcG9ydCB7XG4gIFBsYW5lR2VvbWV0cnksXG4gIEluc3RhbmNlZE1lc2gsXG4gIFJhd1NoYWRlck1hdGVyaWFsLFxuICBNYXRyaXg0LFxuICBDYW52YXNUZXh0dXJlLFxuICBWZWN0b3IyLFxufSBmcm9tIFwidGhyZWVcIjtcblxuaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vLi4vdXRpbHMvY29sb3JzXCI7XG5cbmltcG9ydCBmcmFnbWVudFNoYWRlciBmcm9tIFwiLi4vc2hhZGVycy9hc2NpaUltYWdlL2ZyYWdtZW50Lmdsc2xcIjtcbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSBcIi4uL3NoYWRlcnMvYXNjaWlJbWFnZS92ZXJ0ZXguZ2xzbFwiO1xuXG5sZXQgaW5zdGFuY2UgPSBudWxsO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc2NpaUltYWdlIHtcbiAgY29uc3RydWN0b3Iod2ViR0wpIHtcbiAgICBpZiAoaW5zdGFuY2UpIHJldHVybiBpbnN0YW5jZTtcbiAgICBpbnN0YW5jZSA9IHRoaXM7XG5cbiAgICB0aGlzLndlYkdMID0gd2ViR0w7XG4gICAgdGhpcy5zY2VuZSA9IHRoaXMud2ViR0wuc2NlbmU7XG4gICAgdGhpcy5jYW1lcmEgPSB0aGlzLndlYkdMLmNhbWVyYTtcblxuICAgIC8vIENvbmZpZ3VyYXRpb24gZGUgbGEgZ3JpbGxlXG4gICAgdGhpcy5yb3dzID0gNTA7XG4gICAgdGhpcy5jb2x1bW5zID0gNTA7XG4gICAgdGhpcy5hY3R1YWxDb2x1bW5zID0gdGhpcy5jb2x1bW5zO1xuICAgIHRoaXMuaW5zdGFuY2VzID0gdGhpcy5yb3dzICogdGhpcy5jb2x1bW5zO1xuICAgIHRoaXMuYXNjaWlUZXh0dXJlID0gdGhpcy5jcmVhdGVBU0NJSUdyaWQoKTtcblxuICAgIHRoaXMuc2NhbGUgPSBuZXcgVmVjdG9yMigxLCAxKTtcbiAgICB0aGlzLmltYWdlQXNwZWN0ID0gMS4wO1xuICAgIHRoaXMuY2FudmFzQXNwZWN0ID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdCgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4gdGhpcy5yZXNpemUoKSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIHRoaXMuc2V0R2VvbWV0cnkoKTtcbiAgICB0aGlzLnNldE1hdGVyaWFsKCk7XG4gICAgdGhpcy5zZXRNZXNoKCk7XG4gICAgdGhpcy5jcmVhdGVHZW9tZXRyeUdyaWQoKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLm1lc2gpO1xuXG4gICAgLy8gQXR0ZW50ZSBkZSBsYSByZXNzb3VyY2VcbiAgICB0aGlzLndlYkdMLnJlc291cmNlcy5vbihcInJlYWR5XCIsICgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlVGV4dHVyZSgpO1xuICAgICAgdGhpcy5pbWFnZUFzcGVjdCA9XG4gICAgICAgIHRoaXMud2ViR0wucmVzb3VyY2VzLml0ZW1zLm15UGhvdG8ud2lkdGggL1xuICAgICAgICB0aGlzLndlYkdMLnJlc291cmNlcy5pdGVtcy5teVBob3RvLmhlaWdodDtcblxuICAgICAgdGhpcy5yZXNpemUoKTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLndlYkdMLnJlc291cmNlcy5sb2FkZWQgPT09IHRoaXMud2ViR0wucmVzb3VyY2VzLnRvTG9hZCkge1xuICAgICAgdGhpcy51cGRhdGVUZXh0dXJlKCk7XG4gICAgfVxuICB9XG5cbiAgY3JlYXRlQVNDSUlHcmlkKCkge1xuICAgIGNvbnN0IGRpY3QgPVxuICAgICAgXCIuLSc6XyxePTs+PCshcmMqL3o/c0xUdilKNyh8Rml7Q31mSTMxdGx1W25lb1o1WXhqeWFdMkVTd3FrUDZoOWQ0VnBPR2JVQUtYSG04UkQjJEJnME1OV1ElJkBcIjtcbiAgICB0aGlzLmxlbmd0aCA9IGRpY3QubGVuZ3RoO1xuXG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5sZW5ndGggKiA2NDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gNjQ7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMDAwXCI7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XG4gICAgY3R4LmZvbnQgPSBcImJvbGQgNDBweCBTYWZpcm9cIjsgLy8gcG9saWNlIHBsdXMgc8O7cmVcbiAgICBjdHgudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcblxuICAgIC8vIEFqb3V0IGRlcyBjYXJhY3TDqHJlc1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgY3R4LmZpbGxUZXh0KGRpY3RbaV0sIDMyICsgaSAqIDY0LCA0Nik7XG4gICAgfVxuXG4gICAgY29uc3QgYXNjaWlUZXh0dXJlID0gbmV3IENhbnZhc1RleHR1cmUoY2FudmFzKTtcbiAgICByZXR1cm4gYXNjaWlUZXh0dXJlO1xuICB9XG5cbiAgdXBkYXRlVGV4dHVyZSgpIHtcbiAgICBpZiAodGhpcy5tYXRlcmlhbCAmJiB0aGlzLndlYkdMLnJlc291cmNlcy5pdGVtcy5teVBob3RvKSB7XG4gICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnVUZXh0dXJlLnZhbHVlID1cbiAgICAgICAgdGhpcy53ZWJHTC5yZXNvdXJjZXMuaXRlbXMubXlQaG90bztcbiAgICAgIHRoaXMubWF0ZXJpYWwubmVlZHNVcGRhdGUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIFwiVGV4dHVyZSBpbnRyb3V2YWJsZSA6IFwiLFxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLndlYkdMLnJlc291cmNlcy5pdGVtcylcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY2FsY3VsYXRlRGltZW5zaW9ucygpIHtcbiAgICBjb25zdCB2aXNpYmxlSGVpZ2h0ID1cbiAgICAgIDIgKlxuICAgICAgTWF0aC50YW4oKHRoaXMuY2FtZXJhLmluc3RhbmNlLmZvdiAqIE1hdGguUEkpIC8gMzYwKSAqXG4gICAgICB0aGlzLmNhbWVyYS5pbnN0YW5jZS5wb3NpdGlvbi56O1xuXG4gICAgY29uc3QgdmlzaWJsZVdpZHRoID0gdmlzaWJsZUhlaWdodCAqIHRoaXMuY2FtZXJhLmluc3RhbmNlLmFzcGVjdDtcbiAgICB0aGlzLmNhbnZhc0FzcGVjdCA9IHZpc2libGVXaWR0aCAvIHZpc2libGVIZWlnaHQ7XG5cbiAgICAvLyBDYWxjdWwgZGUgbGEgZ3JpbGxlXG4gICAgdGhpcy5jZWxsU2l6ZSA9IHZpc2libGVIZWlnaHQgLyB0aGlzLnJvd3M7XG4gICAgdGhpcy5hY3R1YWxDb2x1bW5zID0gTWF0aC5mbG9vcih2aXNpYmxlV2lkdGggLyB0aGlzLmNlbGxTaXplKTtcblxuICAgIHRoaXMudG90YWxXaWR0aCA9IHRoaXMuYWN0dWFsQ29sdW1ucyAqIHRoaXMuY2VsbFNpemU7XG4gICAgdGhpcy50b3RhbEhlaWdodCA9IHRoaXMucm93cyAqIHRoaXMuY2VsbFNpemU7XG5cbiAgICBjb25zdCBuZXdJbnN0YW5jZXMgPSB0aGlzLnJvd3MgKiB0aGlzLmFjdHVhbENvbHVtbnM7XG4gICAgaWYgKG5ld0luc3RhbmNlcyAhPT0gdGhpcy5pbnN0YW5jZXMpIHtcbiAgICAgIHRoaXMuaW5zdGFuY2VzID0gbmV3SW5zdGFuY2VzO1xuICAgICAgdGhpcy5uZWVkc05ld01lc2ggPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHNldEdlb21ldHJ5KCkge1xuICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUGxhbmVHZW9tZXRyeShcbiAgICAgIHRoaXMuY2VsbFNpemUgKiAwLjk1LFxuICAgICAgdGhpcy5jZWxsU2l6ZSAqIDAuOTVcbiAgICApO1xuICB9XG5cbiAgc2V0TWF0ZXJpYWwoKSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBSYXdTaGFkZXJNYXRlcmlhbCh7XG4gICAgICB2ZXJ0ZXhTaGFkZXIsXG4gICAgICBmcmFnbWVudFNoYWRlcixcbiAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgIHVUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHVBU0NJSUxlbmd0aDogeyB2YWx1ZTogdGhpcy5sZW5ndGggfSxcbiAgICAgICAgdUFTQ0lJVGV4dHVyZTogeyB2YWx1ZTogdGhpcy5hc2NpaVRleHR1cmUgfSxcbiAgICAgICAgdVNjYWxlOiB7IHZhbHVlOiBuZXcgVmVjdG9yMigxLCAxKSB9LFxuICAgICAgICB1UGFyYWxsYXg6IHsgdmFsdWU6IDAgfSxcbiAgICAgICAgdUltYWdlT2Zmc2V0OiB7IHZhbHVlOiBuZXcgVmVjdG9yMigwLCAwLjEpIH0sXG4gICAgICAgIHVDb2xvcjA6IHsgdmFsdWU6IGNvbG9ycygpWzBdIH0sXG4gICAgICAgIHVDb2xvcjE6IHsgdmFsdWU6IGNvbG9ycygpWzFdIH0sXG4gICAgICAgIHVDb2xvcjI6IHsgdmFsdWU6IGNvbG9ycygpWzJdIH0sXG4gICAgICAgIHVDb2xvcjM6IHsgdmFsdWU6IGNvbG9ycygpWzNdIH0sXG4gICAgICAgIHVDb2xvcjQ6IHsgdmFsdWU6IGNvbG9ycygpWzRdIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TWVzaCgpIHtcbiAgICB0aGlzLm1lc2ggPSBuZXcgSW5zdGFuY2VkTWVzaCh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsLCB0aGlzLmluc3RhbmNlcyk7XG4gIH1cblxuICBjcmVhdGVHZW9tZXRyeUdyaWQoKSB7XG4gICAgY29uc3QgbWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcblxuICAgIGNvbnN0IHN0YXJ0WCA9IC10aGlzLnRvdGFsV2lkdGggLyAyICsgdGhpcy5jZWxsU2l6ZSAvIDI7XG4gICAgY29uc3Qgc3RhcnRZID0gLXRoaXMudG90YWxIZWlnaHQgLyAyICsgdGhpcy5jZWxsU2l6ZSAvIDI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuYWN0dWFsQ29sdW1uczsgaisrKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gaSAqIHRoaXMuYWN0dWFsQ29sdW1ucyArIGo7XG4gICAgICAgIGlmIChpbmRleCA+PSB0aGlzLmluc3RhbmNlcykgYnJlYWs7XG5cbiAgICAgICAgY29uc3QgeCA9IHN0YXJ0WCArIGogKiB0aGlzLmNlbGxTaXplO1xuICAgICAgICBjb25zdCB5ID0gc3RhcnRZICsgaSAqIHRoaXMuY2VsbFNpemU7XG5cbiAgICAgICAgbWF0cml4LnNldFBvc2l0aW9uKHgsIHksIDApO1xuICAgICAgICB0aGlzLm1lc2guc2V0TWF0cml4QXQoaW5kZXgsIG1hdHJpeCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5tZXNoLmluc3RhbmNlTWF0cml4Lm5lZWRzVXBkYXRlID0gdHJ1ZTtcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZURpbWVuc2lvbnMoKTtcbiAgICB0aGlzLmdlb21ldHJ5LmRpc3Bvc2UoKTtcbiAgICB0aGlzLnNldEdlb21ldHJ5KCk7XG5cbiAgICBpZiAodGhpcy5uZWVkc05ld01lc2gpIHtcbiAgICAgIHRoaXMuc2NlbmUucmVtb3ZlKHRoaXMubWVzaCk7XG4gICAgICB0aGlzLm1lc2guZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5tZXNoLm1hdGVyaWFsLmRpc3Bvc2UoKTtcblxuICAgICAgdGhpcy5zZXRNZXNoKCk7XG4gICAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLm1lc2gpO1xuICAgICAgdGhpcy5uZWVkc05ld01lc2ggPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmNyZWF0ZUdlb21ldHJ5R3JpZCgpO1xuXG4gICAgaWYgKHRoaXMuaW1hZ2VBc3BlY3QgPiB0aGlzLmNhbnZhc0FzcGVjdCkge1xuICAgICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy51U2NhbGUudmFsdWUuc2V0KFxuICAgICAgICBNYXRoLm1pbih0aGlzLmltYWdlQXNwZWN0IC8gdGhpcy5jYW52YXNBc3BlY3QsIDEpLFxuICAgICAgICAxXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnVTY2FsZS52YWx1ZS5zZXQoXG4gICAgICAgIDEsXG4gICAgICAgIE1hdGgubWluKHRoaXMuaW1hZ2VBc3BlY3QgLyB0aGlzLmNhbnZhc0FzcGVjdCwgMSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IHNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gICAgY29uc3QgZmFjdG9yID0gMC4wMDAxO1xuXG4gICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy51UGFyYWxsYXgudmFsdWUgPSBzY3JvbGxZICogZmFjdG9yO1xuXG4gICAgY29uc3QgaW1hZ2VPZmZzZXQgPSBzY3JvbGxZICogMC4wMDA5O1xuICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudUltYWdlT2Zmc2V0LnZhbHVlLnNldCgwLCBpbWFnZU9mZnNldCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBsYW5lR2VvbWV0cnksIE1lc2gsIFJhd1NoYWRlck1hdGVyaWFsLCBWZWN0b3IyIH0gZnJvbSBcInRocmVlXCI7XG5cbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSBcIi4uL3NoYWRlcnMvYmFja2dyb3VuZC92ZXJ0ZXguZ2xzbFwiO1xuaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gXCIuLi9zaGFkZXJzL2JhY2tncm91bmQvZnJhZ21lbnQuZ2xzbFwiO1xuXG5sZXQgaW5zdGFuY2UgPSBudWxsO1xuXG5pbXBvcnQgY29sb3JzIGZyb20gXCIuLi8uLi91dGlscy9jb2xvcnNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2dyb3VuZCB7XG4gIGNvbnN0cnVjdG9yKHdlYkdMKSB7XG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgfVxuXG4gICAgaW5zdGFuY2UgPSB0aGlzO1xuXG4gICAgdGhpcy53ZWJHTCA9IHdlYkdMO1xuICAgIHRoaXMuc2NlbmUgPSB0aGlzLndlYkdMLnNjZW5lO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNldEdlb21ldHJ5KCk7XG4gICAgdGhpcy5zZXRNYXRlcmlhbCgpO1xuICAgIHRoaXMuc2V0TWVzaCh0aGlzLmdlb21ldHJ5LCB0aGlzLm1hdGVyaWFsKTtcblxuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWVzaCk7XG4gIH1cblxuICBzZXRHZW9tZXRyeSgpIHtcbiAgICB0aGlzLmZvdl95ID0gdGhpcy5zZXRGb3ZZKCk7XG5cbiAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFBsYW5lR2VvbWV0cnkoXG4gICAgICB0aGlzLmZvdl95ICogdGhpcy53ZWJHTC5jYW1lcmEuaW5zdGFuY2UuYXNwZWN0ICogMixcbiAgICAgIHRoaXMuZm92X3kgKiAyLFxuICAgICAgMzAwLFxuICAgICAgMzAwXG4gICAgKTtcbiAgfVxuXG4gIHNldE1hdGVyaWFsKCkge1xuICAgIHRoaXMubWF0ZXJpYWwgPSBuZXcgUmF3U2hhZGVyTWF0ZXJpYWwoe1xuICAgICAgdmVydGV4U2hhZGVyLFxuICAgICAgZnJhZ21lbnRTaGFkZXIsXG4gICAgICB1bmlmb3Jtczoge1xuICAgICAgICB1VGltZTogeyB2YWx1ZTogMCB9LFxuICAgICAgICB1Q29sb3I6IHsgdmFsdWU6IGNvbG9ycygpIH0sXG4gICAgICAgIHVSZXNvbHV0aW9uOiB7XG4gICAgICAgICAgdmFsdWU6IG5ldyBWZWN0b3IyKFxuICAgICAgICAgICAgdGhpcy53ZWJHTC5jYW52YXMuaW5zdGFuY2Uud2lkdGgsXG4gICAgICAgICAgICB0aGlzLndlYkdMLmNhbnZhcy5pbnN0YW5jZS5oZWlnaHRcbiAgICAgICAgICApLm11bHRpcGx5U2NhbGFyKE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAyKSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgd2lyZWZyYW1lOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIHNldE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKSB7XG4gICAgdGhpcy5tZXNoID0gbmV3IE1lc2goZ2VvbWV0cnksIG1hdGVyaWFsKTtcbiAgICB0aGlzLm1lc2gucm90YXRpb24ueCA9IC1NYXRoLlBJICogMC4xO1xuICB9XG5cbiAgc2V0Rm92WSgpIHtcbiAgICBsZXQgYW5nX3JhZCA9ICh0aGlzLndlYkdMLmNhbWVyYS5pbnN0YW5jZS5mb3YgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICByZXR1cm4gdGhpcy53ZWJHTC5jYW1lcmEuaW5zdGFuY2UucG9zaXRpb24ueiAqIE1hdGgudGFuKGFuZ19yYWQgLyAyKSAqIDI7XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgdGhpcy5mb3ZfeSA9IHRoaXMuc2V0Rm92WSgpO1xuICAgIHRoaXMubWVzaC5nZW9tZXRyeS5kaXNwb3NlKCk7XG5cbiAgICB0aGlzLm1lc2guZ2VvbWV0cnkgPSBuZXcgUGxhbmVHZW9tZXRyeShcbiAgICAgIHRoaXMuZm92X3kgKiB0aGlzLndlYkdMLmNhbWVyYS5pbnN0YW5jZS5hc3BlY3QgKiAyLFxuICAgICAgdGhpcy5mb3ZfeSAqIDIsXG4gICAgICAzMDAsXG4gICAgICAzMDBcbiAgICApO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMubWVzaC5tYXRlcmlhbC51bmlmb3Jtcy51VGltZS52YWx1ZSA9IHRoaXMud2ViR0wudGltZS5lbGFwc2VkICogMC4wMDU7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBlcnNwZWN0aXZlQ2FtZXJhIH0gZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYSB7XG4gIGNvbnN0cnVjdG9yKHdlYkdMKSB7XG4gICAgdGhpcy53ZWJHTCA9IHdlYkdMO1xuXG4gICAgdGhpcy5zaXplcyA9IHRoaXMud2ViR0wuc2l6ZXM7XG4gICAgdGhpcy5zY2VuZSA9IHRoaXMud2ViR0wuc2NlbmU7XG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLndlYkdMLmNhbnZhcztcblxuICAgIHRoaXMuc2V0SW5zdGFuY2UoKTtcbiAgfVxuXG4gIHNldEluc3RhbmNlKCkge1xuICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgUGVyc3BlY3RpdmVDYW1lcmEoXG4gICAgICA3NSxcbiAgICAgIHRoaXMuc2l6ZXMud2lkdGggLyB0aGlzLnNpemVzLmhlaWdodCxcbiAgICAgIDAuMSxcbiAgICAgIDEwMFxuICAgICk7XG5cbiAgICB0aGlzLmluc3RhbmNlLnBvc2l0aW9uLnNldCgwLCAwLCAxMCk7XG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5pbnN0YW5jZSk7XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgdGhpcy5pbnN0YW5jZS5hc3BlY3QgPSB0aGlzLnNpemVzLndpZHRoIC8gdGhpcy5zaXplcy5oZWlnaHQ7XG4gICAgdGhpcy5pbnN0YW5jZS51cGRhdGVQcm9qZWN0aW9uTWF0cml4KCk7XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIi4vVXRpbHMvRXZlbnRFbWl0dGVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbnZhcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGlkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaWQgPSBpZDtcblxuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmlkKTtcblxuICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLmluaXQoKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgIHRoaXMuaW5zdGFuY2Uud2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICAgIHRoaXMuaW5zdGFuY2UuaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXG4gICAgY2FudmFzLndpZHRoID0gdGhpcy5jYW52YXMuY2xpZW50V2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IHRoaXMuY2FudmFzLmNsaWVudEhlaWdodDtcblxuICAgIHRoaXMuY2FudmFzLmFwcGVuZChjYW52YXMpO1xuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxufVxuIiwiaW1wb3J0IHsgV2ViR0xSZW5kZXJlciB9IGZyb20gXCJ0aHJlZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHdlYkdMKSB7XG4gICAgdGhpcy53ZWJHTCA9IHdlYkdMO1xuXG4gICAgdGhpcy5jYW52YXMgPSB0aGlzLndlYkdMLmNhbnZhcztcbiAgICB0aGlzLnNpemVzID0gdGhpcy53ZWJHTC5zaXplcztcbiAgICB0aGlzLnNjZW5lID0gdGhpcy53ZWJHTC5zY2VuZTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMud2ViR0wuY2FtZXJhO1xuXG4gICAgdGhpcy5zZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgc2V0SW5zdGFuY2UoKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBXZWJHTFJlbmRlcmVyKHtcbiAgICAgIGNhbnZhczogdGhpcy5jYW52YXMuaW5zdGFuY2UsXG4gICAgICBhbnRpYWxpYXM6IHRydWUsXG4gICAgICBhbHBoYTogdHJ1ZSxcbiAgICB9KTtcblxuICAgIHRoaXMuaW5zdGFuY2Uuc2V0U2l6ZSh0aGlzLnNpemVzLndpZHRoLCB0aGlzLnNpemVzLmhlaWdodCk7XG4gICAgdGhpcy5pbnN0YW5jZS5zZXRQaXhlbFJhdGlvKHRoaXMuc2l6ZXMucGl4ZWxSYXRpbyk7XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgdGhpcy5pbnN0YW5jZS5zZXRTaXplKHRoaXMuc2l6ZXMud2lkdGgsIHRoaXMuc2l6ZXMuaGVpZ2h0KTtcbiAgICB0aGlzLmluc3RhbmNlLnNldFBpeGVsUmF0aW8odGhpcy5zaXplcy5waXhlbFJhdGlvKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICB0aGlzLmluc3RhbmNlLnJlbmRlcih0aGlzLnNjZW5lLCB0aGlzLmNhbWVyYS5pbnN0YW5jZSk7XG4gIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FsbGJhY2tzID0ge307XG4gICAgdGhpcy5jYWxsYmFja3MuYmFzZSA9IHt9O1xuICB9XG5cbiAgb24oX25hbWVzLCBjYWxsYmFjaykge1xuICAgIC8vIEVycm9yc1xuICAgIGlmICh0eXBlb2YgX25hbWVzID09PSBcInVuZGVmaW5lZFwiIHx8IF9uYW1lcyA9PT0gXCJcIikge1xuICAgICAgY29uc29sZS53YXJuKFwid3JvbmcgbmFtZXNcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgY29uc29sZS53YXJuKFwid3JvbmcgY2FsbGJhY2tcIik7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gUmVzb2x2ZSBuYW1lc1xuICAgIGNvbnN0IG5hbWVzID0gdGhpcy5yZXNvbHZlTmFtZXMoX25hbWVzKTtcblxuICAgIC8vIEVhY2ggbmFtZVxuICAgIG5hbWVzLmZvckVhY2goKF9uYW1lKSA9PiB7XG4gICAgICAvLyBSZXNvbHZlIG5hbWVcbiAgICAgIGNvbnN0IG5hbWUgPSB0aGlzLnJlc29sdmVOYW1lKF9uYW1lKTtcblxuICAgICAgLy8gQ3JlYXRlIG5hbWVzcGFjZSBpZiBub3QgZXhpc3RcbiAgICAgIGlmICghKHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXSBpbnN0YW5jZW9mIE9iamVjdCkpXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXSA9IHt9O1xuXG4gICAgICAvLyBDcmVhdGUgY2FsbGJhY2sgaWYgbm90IGV4aXN0XG4gICAgICBpZiAoISh0aGlzLmNhbGxiYWNrc1tuYW1lLm5hbWVzcGFjZV1bbmFtZS52YWx1ZV0gaW5zdGFuY2VvZiBBcnJheSkpXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXVtuYW1lLnZhbHVlXSA9IFtdO1xuXG4gICAgICAvLyBBZGQgY2FsbGJhY2tcbiAgICAgIHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXVtuYW1lLnZhbHVlXS5wdXNoKGNhbGxiYWNrKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgb2ZmKF9uYW1lcykge1xuICAgIC8vIEVycm9yc1xuICAgIGlmICh0eXBlb2YgX25hbWVzID09PSBcInVuZGVmaW5lZFwiIHx8IF9uYW1lcyA9PT0gXCJcIikge1xuICAgICAgY29uc29sZS53YXJuKFwid3JvbmcgbmFtZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBSZXNvbHZlIG5hbWVzXG4gICAgY29uc3QgbmFtZXMgPSB0aGlzLnJlc29sdmVOYW1lcyhfbmFtZXMpO1xuXG4gICAgLy8gRWFjaCBuYW1lXG4gICAgbmFtZXMuZm9yRWFjaCgoX25hbWUpID0+IHtcbiAgICAgIC8vIFJlc29sdmUgbmFtZVxuICAgICAgY29uc3QgbmFtZSA9IHRoaXMucmVzb2x2ZU5hbWUoX25hbWUpO1xuXG4gICAgICAvLyBSZW1vdmUgbmFtZXNwYWNlXG4gICAgICBpZiAobmFtZS5uYW1lc3BhY2UgIT09IFwiYmFzZVwiICYmIG5hbWUudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXTtcbiAgICAgIH1cblxuICAgICAgLy8gUmVtb3ZlIHNwZWNpZmljIGNhbGxiYWNrIGluIG5hbWVzcGFjZVxuICAgICAgZWxzZSB7XG4gICAgICAgIC8vIERlZmF1bHRcbiAgICAgICAgaWYgKG5hbWUubmFtZXNwYWNlID09PSBcImJhc2VcIikge1xuICAgICAgICAgIC8vIFRyeSB0byByZW1vdmUgZnJvbSBlYWNoIG5hbWVzcGFjZVxuICAgICAgICAgIGZvciAoY29uc3QgbmFtZXNwYWNlIGluIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW25hbWVzcGFjZV0gaW5zdGFuY2VvZiBPYmplY3QgJiZcbiAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZXNwYWNlXVtuYW1lLnZhbHVlXSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FsbGJhY2tzW25hbWVzcGFjZV1bbmFtZS52YWx1ZV07XG5cbiAgICAgICAgICAgICAgLy8gUmVtb3ZlIG5hbWVzcGFjZSBpZiBlbXB0eVxuICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYWxsYmFja3NbbmFtZXNwYWNlXSkubGVuZ3RoID09PSAwKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1tuYW1lc3BhY2VdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNwZWNpZmllZCBuYW1lc3BhY2VcbiAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdIGluc3RhbmNlb2YgT2JqZWN0ICYmXG4gICAgICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdW25hbWUudmFsdWVdIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgKSB7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXVtuYW1lLnZhbHVlXTtcblxuICAgICAgICAgIC8vIFJlbW92ZSBuYW1lc3BhY2UgaWYgZW1wdHlcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXModGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdKS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHRyaWdnZXIoX25hbWUsIF9hcmdzKSB7XG4gICAgLy8gRXJyb3JzXG4gICAgaWYgKHR5cGVvZiBfbmFtZSA9PT0gXCJ1bmRlZmluZWRcIiB8fCBfbmFtZSA9PT0gXCJcIikge1xuICAgICAgY29uc29sZS53YXJuKFwid3JvbmcgbmFtZVwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBsZXQgZmluYWxSZXN1bHQgPSBudWxsO1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgLy8gRGVmYXVsdCBhcmdzXG4gICAgY29uc3QgYXJncyA9ICEoX2FyZ3MgaW5zdGFuY2VvZiBBcnJheSkgPyBbXSA6IF9hcmdzO1xuXG4gICAgLy8gUmVzb2x2ZSBuYW1lcyAoc2hvdWxkIG9uIGhhdmUgb25lIGV2ZW50KVxuICAgIGxldCBuYW1lID0gdGhpcy5yZXNvbHZlTmFtZXMoX25hbWUpO1xuXG4gICAgLy8gUmVzb2x2ZSBuYW1lXG4gICAgbmFtZSA9IHRoaXMucmVzb2x2ZU5hbWUobmFtZVswXSk7XG5cbiAgICAvLyBEZWZhdWx0IG5hbWVzcGFjZVxuICAgIGlmIChuYW1lLm5hbWVzcGFjZSA9PT0gXCJiYXNlXCIpIHtcbiAgICAgIC8vIFRyeSB0byBmaW5kIGNhbGxiYWNrIGluIGVhY2ggbmFtZXNwYWNlXG4gICAgICBmb3IgKGNvbnN0IG5hbWVzcGFjZSBpbiB0aGlzLmNhbGxiYWNrcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZXNwYWNlXSBpbnN0YW5jZW9mIE9iamVjdCAmJlxuICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW25hbWVzcGFjZV1bbmFtZS52YWx1ZV0gaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICApIHtcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tuYW1lc3BhY2VdW25hbWUudmFsdWVdLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBmaW5hbFJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICBmaW5hbFJlc3VsdCA9IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNwZWNpZmllZCBuYW1lc3BhY2VcbiAgICBlbHNlIGlmICh0aGlzLmNhbGxiYWNrc1tuYW1lLm5hbWVzcGFjZV0gaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgIGlmIChuYW1lLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIndyb25nIG5hbWVcIik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNhbGxiYWNrc1tuYW1lLm5hbWVzcGFjZV1bbmFtZS52YWx1ZV0uZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2suYXBwbHkodGhpcywgYXJncyk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBmaW5hbFJlc3VsdCA9PT0gXCJ1bmRlZmluZWRcIikgZmluYWxSZXN1bHQgPSByZXN1bHQ7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmluYWxSZXN1bHQ7XG4gIH1cblxuICByZXNvbHZlTmFtZXMoX25hbWVzKSB7XG4gICAgbGV0IG5hbWVzID0gX25hbWVzO1xuICAgIG5hbWVzID0gbmFtZXMucmVwbGFjZSgvW15hLXpBLVowLTkgLC8uXS9nLCBcIlwiKTtcbiAgICBuYW1lcyA9IG5hbWVzLnJlcGxhY2UoL1ssL10rL2csIFwiIFwiKTtcbiAgICBuYW1lcyA9IG5hbWVzLnNwbGl0KFwiIFwiKTtcblxuICAgIHJldHVybiBuYW1lcztcbiAgfVxuXG4gIHJlc29sdmVOYW1lKG5hbWUpIHtcbiAgICBjb25zdCBuZXdOYW1lID0ge307XG4gICAgY29uc3QgcGFydHMgPSBuYW1lLnNwbGl0KFwiLlwiKTtcblxuICAgIG5ld05hbWUub3JpZ2luYWwgPSBuYW1lO1xuICAgIG5ld05hbWUudmFsdWUgPSBwYXJ0c1swXTtcbiAgICBuZXdOYW1lLm5hbWVzcGFjZSA9IFwiYmFzZVwiOyAvLyBCYXNlIG5hbWVzcGFjZVxuXG4gICAgLy8gU3BlY2lmaWVkIG5hbWVzcGFjZVxuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAxICYmIHBhcnRzWzFdICE9PSBcIlwiKSB7XG4gICAgICBuZXdOYW1lLm5hbWVzcGFjZSA9IHBhcnRzWzFdO1xuICAgIH1cblxuICAgIHJldHVybiBuZXdOYW1lO1xuICB9XG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xuaW1wb3J0IHsgVGV4dHVyZUxvYWRlciB9IGZyb20gXCJ0aHJlZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXNvdXJjZXMgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3Rvcihzb3VyY2VzKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc291cmNlcyA9IHNvdXJjZXM7XG4gICAgdGhpcy5pdGVtcyA9IHt9O1xuICAgIHRoaXMudG9Mb2FkID0gdGhpcy5zb3VyY2VzLmxlbmd0aDtcbiAgICB0aGlzLmxvYWRlZCA9IDA7XG5cbiAgICB0aGlzLnNldExvYWRlcnMoKTtcbiAgICB0aGlzLnN0YXJ0TG9hZGluZygpO1xuICB9XG5cbiAgc2V0TG9hZGVycygpIHtcbiAgICB0aGlzLmxvYWRlcnMgPSB7fTtcbiAgICB0aGlzLmxvYWRlcnMudGV4dHVyZUxvYWRlciA9IG5ldyBUZXh0dXJlTG9hZGVyKCk7XG4gIH1cblxuICBzdGFydExvYWRpbmcoKSB7XG4gICAgZm9yIChjb25zdCBzb3VyY2Ugb2YgdGhpcy5zb3VyY2VzKSB7XG4gICAgICBpZiAoc291cmNlLnR5cGUgPT09IFwidGV4dHVyZVwiKSB7XG4gICAgICAgIHRoaXMubG9hZGVycy50ZXh0dXJlTG9hZGVyLmxvYWQoXG4gICAgICAgICAgc291cmNlLnBhdGgsXG4gICAgICAgICAgKGZpbGUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc291cmNlTG9hZGVkKHNvdXJjZSwgZmlsZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAocHJvZ3Jlc3MpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBwcm9ncmVzczpcIiwgcHJvZ3Jlc3MpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgbG9hZGluZyB0ZXh0dXJlOlwiLCBzb3VyY2UubmFtZSwgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzb3VyY2VMb2FkZWQoc291cmNlLCBmaWxlKSB7XG4gICAgdGhpcy5pdGVtc1tzb3VyY2UubmFtZV0gPSBmaWxlO1xuXG4gICAgdGhpcy5sb2FkZWQrKztcblxuICAgIGlmICh0aGlzLmxvYWRlZCA9PT0gdGhpcy50b0xvYWQpIHtcbiAgICAgIHRoaXMudHJpZ2dlcihcInJlYWR5XCIpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2l6ZXMgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICBjb25zdHJ1Y3RvcihjYW52YXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gICAgdGhpcy53aWR0aCA9IHRoaXMuY2FudmFzLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgIHRoaXMucGl4ZWxSYXRpb24gPSBNYXRoLm1pbih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgMik7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgIHRoaXMucGl4ZWxSYXRpb24gPSBNYXRoLm1pbih3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbywgMik7XG5cbiAgICAgIHRoaXMudHJpZ2dlcihcInJlc2l6ZVwiKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi9FdmVudEVtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZSBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnN0YXJ0O1xuICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgdGhpcy5kZWx0YSA9IDE2O1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnRpY2soKTtcbiAgICB9KTtcbiAgfVxuXG4gIHRpY2soKSB7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuZGVsdGEgPSBjdXJyZW50VGltZSAtIHRoaXMuY3VycmVudDtcbiAgICB0aGlzLmN1cnJlbnQgPSBjdXJyZW50VGltZTtcbiAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLmN1cnJlbnQgLSB0aGlzLnN0YXJ0O1xuXG4gICAgdGhpcy50cmlnZ2VyKFwidGlja1wiKTtcblxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy50aWNrKCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFNjZW5lIH0gZnJvbSBcInRocmVlXCI7XG5cbmltcG9ydCBDYW1lcmEgZnJvbSBcIi4vQ2FtZXJhXCI7XG5pbXBvcnQgUmVuZGVyZXIgZnJvbSBcIi4vUmVuZGVyZXJcIjtcblxuaW1wb3J0IFNpemVzIGZyb20gXCIuL1V0aWxzL1NpemVzXCI7XG5pbXBvcnQgVGltZSBmcm9tIFwiLi9VdGlscy9UaW1lXCI7XG5pbXBvcnQgUmVzb3VyY2VzIGZyb20gXCIuL1V0aWxzL1Jlc291cmNlc1wiO1xuXG5pbXBvcnQgQmFja2dyb3VuZCBmcm9tIFwiLi9CYWNrZ3JvdW5kXCI7XG5pbXBvcnQgQXNjaWlIZXJvIGZyb20gXCIuL0FzY2lpSGVyb1wiO1xuaW1wb3J0IEFzY2lpSW1hZ2UgZnJvbSBcIi4vQXNjaWlJbWFnZVwiO1xuXG5pbXBvcnQgc291cmNlcyBmcm9tIFwiLi9zb3VyY2VzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYkdMIHtcbiAgY29uc3RydWN0b3IoY2FudmFzLCB0eXBlKSB7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG5cbiAgICAvLyBTZXR1cFxuICAgIHRoaXMuc2l6ZXMgPSBuZXcgU2l6ZXModGhpcy5jYW52YXMuaW5zdGFuY2UpO1xuICAgIHRoaXMudGltZSA9IG5ldyBUaW1lKCk7XG4gICAgdGhpcy5zY2VuZSA9IG5ldyBTY2VuZSgpO1xuICAgIHRoaXMucmVzb3VyY2VzID0gbmV3IFJlc291cmNlcyhzb3VyY2VzKTtcbiAgICB0aGlzLmNhbWVyYSA9IG5ldyBDYW1lcmEodGhpcyk7XG4gICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSZW5kZXJlcih0aGlzKTtcblxuICAgIHRoaXMuZWZmZWN0ID0gdGhpcy5pbml0RWZmZWN0QnlUeXBlKHR5cGUpO1xuXG4gICAgdGhpcy5zaXplcy5vbihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgdGhpcy50aW1lLm9uKFwidGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdEVmZmVjdEJ5VHlwZSh0eXBlKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlIFwid2ViZ2xCYWNrZ3JvdW5kXCI6XG4gICAgICAgIHJldHVybiBuZXcgQmFja2dyb3VuZCh0aGlzKTtcbiAgICAgIGNhc2UgXCJ3ZWJnbEFzY2lpSGVyb1wiOlxuICAgICAgICByZXR1cm4gbmV3IEFzY2lpSGVybyh0aGlzKTtcbiAgICAgIGNhc2UgXCJ3ZWJnbEFzY2lpSW1hZ2VcIjpcbiAgICAgICAgcmV0dXJuIG5ldyBBc2NpaUltYWdlKHRoaXMpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKGBbV2ViR0xdIFVua25vd24gdHlwZTogJHt0eXBlfWApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICByZXNpemUoKSB7XG4gICAgdGhpcy5jYW1lcmEucmVzaXplKCk7XG4gICAgdGhpcy5yZW5kZXJlci5yZXNpemUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpIHtcbiAgICBpZiAodGhpcy5lZmZlY3QgJiYgdGhpcy5lZmZlY3QudXBkYXRlKSB7XG4gICAgICB0aGlzLmVmZmVjdC51cGRhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5yZW5kZXJlci51cGRhdGUoKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgW1xuICB7XG4gICAgbmFtZTogXCJteVBob3RvXCIsXG4gICAgdHlwZTogXCJ0ZXh0dXJlXCIsXG4gICAgcGF0aDogXCJpbWFnZV9fMS5qcGdcIixcbiAgfSxcbl07XG4iLCJpbXBvcnQgZWFjaCBmcm9tIFwibG9kYXNoL2VhY2hcIjtcblxuaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXBldGVuY2UgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmNvbXBldGVuY2VcIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGl0ZW1zOiBcIi5jb21wZXRlbmNlX19pdGVtXCIsXG4gICAgICAgIGdsaXRjaGVkOiBcIi5nbGl0Y2hlZFwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImNvbXBldGVuY2VcIixcbiAgICB9KTtcblxuICAgIGVhY2godGhpcy5lbGVtZW50cy5nbGl0Y2hlZCwgKGVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGVHbGl0Y2hUZXh0KGVsZW1lbnQpO1xuICAgIH0pO1xuXG4gICAgZWFjaCh0aGlzLmVsZW1lbnRzLml0ZW1zLCAoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoZSkgPT5cbiAgICAgICAgdGhpcy5hbmltYXRpb24uaGFuZGxlSG92ZXJBbmltYXRpb24oZSwgaXRlbSwgXCJob3ZlclwiKVxuICAgICAgKTtcbiAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgKGUpID0+XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmhhbmRsZUhvdmVyQW5pbWF0aW9uKGUsIGl0ZW0sIFwic3RhdGljXCIpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgZWFjaCBmcm9tIFwibG9kYXNoL2VhY2hcIjtcbmltcG9ydCBCYXNlRWxlbWVudCBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9CYXNlRWxlbWVudFwiO1xuaW1wb3J0IGdzYXAgZnJvbSBcImdzYXBcIjtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3QgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmNvbnRhY3RcIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHdyYXBwZXI6IFwiLmNvbnRhY3RfX3dyYXBwZXJcIixcbiAgICAgICAgaXRlbXM6IFwiLmNvb3JkaW5hdGVzX19pdGVtXCIsXG4gICAgICAgIHNvY2lhbHM6IFwiLnNvY2lhbF9fbGlua1wiLFxuICAgICAgICBnbGl0Y2hlZDogXCIuZ2xpdGNoZWRcIixcbiAgICAgICAgZG93bmxvYWRCdXR0b246IFwiLmRvd25sb2FkXCIsXG4gICAgICB9LFxuICAgICAgaWQ6IFwiY29udGFjdFwiLFxuICAgIH0pO1xuXG4gICAgdGhpcy5kb3dubG9hZEJ1dHRvbiA9IHRoaXMuZWxlbWVudHMuZG93bmxvYWRCdXR0b25bMF07XG5cbiAgICB0aGlzLnNldHVwQ1ZEb3dubG9hZCgpO1xuXG4gICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUFycm93T25Ib3Zlcih0aGlzLmVsZW1lbnRzLnNvY2lhbHMpO1xuXG4gICAgdGhpcy5zZXR1cERvd25sb2FkQnV0dG9uQW5pbWF0aW9ucygpO1xuXG4gICAgZWFjaCh0aGlzLmVsZW1lbnRzLmdsaXRjaGVkLCAoZWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUdsaXRjaFRleHQoZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXR1cENWRG93bmxvYWQoKSB7XG4gICAgaWYgKCF0aGlzLmRvd25sb2FkQnV0dG9uKSByZXR1cm47XG5cbiAgICB0aGlzLmRvd25sb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gdG9kYXkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBsaW5rLmhyZWYgPSBcIkNWX1ZpY3Rvcl8yMDI1LnBkZlwiO1xuICAgICAgbGluay5kb3dubG9hZCA9IGBDVl9WaWN0b3JfJHtmb3JtYXR0ZWREYXRlfS5wZGZgO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRBbGxTVkcoKSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSB7fTtcbiAgICBjb25zdCBhbGxQYXJ0cyA9IFtcImFycm93X19iYXJcIiwgXCJhcnJvd19faGVhZFwiLCBcInNvY2xlXCJdO1xuXG4gICAgYWxsUGFydHMuZm9yRWFjaCgocGFydCkgPT4ge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmRvd25sb2FkQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoYC4ke3BhcnR9YCk7XG4gICAgICBpZiAoZWwpIGVsZW1lbnRzW2Ake3BhcnR9YF0gPSBlbDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZUVsID0gdGhpcy5kb3dubG9hZEJ1dHRvbi5xdWVyeVNlbGVjdG9yKGAuJHtwYXJ0fV9fJHtpfWApO1xuICAgICAgICBpZiAocHJlRWwpIGVsZW1lbnRzW2Ake3BhcnR9X18ke2l9YF0gPSBwcmVFbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIGNyZWF0ZUl0ZW1zKCkge1xuICAgIGNvbnN0IGFsbFNWRyA9IHRoaXMuZ2V0QWxsU1ZHKCk7XG5cbiAgICBjb25zdCBpdGVtcyA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFyOiBhbGxTVkdbXCJhcnJvd19fYmFyX18wXCJdLFxuICAgICAgICBoZWFkOiBhbGxTVkdbXCJhcnJvd19faGVhZF9fMFwiXSxcbiAgICAgICAgc29jbGU6IGFsbFNWR1tcInNvY2xlX18wXCJdLFxuICAgICAgICBiYXJEZWxheTogMCxcbiAgICAgICAgaGVhZERlbGF5OiAwLjIsXG4gICAgICAgIHNvY2xlRGVsYXk6IDAuMixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJhcjogYWxsU1ZHW1wiYXJyb3dfX2Jhcl9fMVwiXSxcbiAgICAgICAgaGVhZDogYWxsU1ZHW1wiYXJyb3dfX2hlYWRfXzFcIl0sXG4gICAgICAgIHNvY2xlOiBhbGxTVkdbXCJzb2NsZV9fMVwiXSxcbiAgICAgICAgYmFyRGVsYXk6IDAuMSxcbiAgICAgICAgaGVhZERlbGF5OiAwLjMsXG4gICAgICAgIHNvY2xlRGVsYXk6IDAuMyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJhcjogYWxsU1ZHW1wiYXJyb3dfX2Jhcl9fMlwiXSxcbiAgICAgICAgaGVhZDogYWxsU1ZHW1wiYXJyb3dfX2hlYWRfXzJcIl0sXG4gICAgICAgIHNvY2xlOiBhbGxTVkdbXCJzb2NsZV9fMlwiXSxcbiAgICAgICAgYmFyRGVsYXk6IDAuMixcbiAgICAgICAgaGVhZERlbGF5OiAwLjQsXG4gICAgICAgIHNvY2xlRGVsYXk6IDAuNCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJhcjogYWxsU1ZHW1wiYXJyb3dfX2Jhcl9fM1wiXSxcbiAgICAgICAgaGVhZDogYWxsU1ZHW1wiYXJyb3dfX2hlYWRfXzNcIl0sXG4gICAgICAgIHNvY2xlOiBhbGxTVkdbXCJzb2NsZV9fM1wiXSxcbiAgICAgICAgYmFyRGVsYXk6IDAuMyxcbiAgICAgICAgaGVhZERlbGF5OiAwLjUsXG4gICAgICAgIHNvY2xlRGVsYXk6IDAuNSxcbiAgICAgIH0sXG4gICAgXTtcblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIHNldHVwRG93bmxvYWRCdXR0b25BbmltYXRpb25zKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5jcmVhdGVJdGVtcygpO1xuICAgIGNvbnN0IHRsID0gZ3NhcC50aW1lbGluZSh7IHBhdXNlZDogdHJ1ZSB9KTtcbiAgICBjb25zdCBlYXNlID0gWzAuNzcsIDAsIDAuMTc1LCAxXTtcbiAgICBjb25zdCBpc01vYmlsZSA9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDYyMTsgLy8gRMOpdGVjdGlvbiBtb2JpbGUgKGFqdXN0ZXogbGEgdmFsZXVyIHNlbG9uIHZvcyBiZXNvaW5zKVxuXG4gICAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGxhYmVsID0gYHN0YXJ0JHtpbmRleH1gO1xuICAgICAgY29uc3QgZ3JvdXBPZmZzZXQgPSBpbmRleCAqIDAuMDU7IC8vIOKshe+4jyBBdmFuY2UgY2hhcXVlIGdyb3VwZSBkZSAwLjA1c1xuXG4gICAgICB0bC5hZGQobGFiZWwsIGdyb3VwT2Zmc2V0KTsgLy8g4qyF77iPIHBsYWNlIGxlIGdyb3VwZSBsw6lnw6hyZW1lbnQgYXByw6hzIGxlIHByw6ljw6lkZW50XG5cbiAgICAgIHRsLmZyb21UbyhcbiAgICAgICAgaXRlbS5iYXIsXG4gICAgICAgIHsgZHJhd1NWRzogXCIwJVwiIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBkcmF3U1ZHOiBcIjEwMCVcIixcbiAgICAgICAgICBkdXJhdGlvbjogMC4zLFxuICAgICAgICAgIGVhc2UsXG4gICAgICAgIH0sXG4gICAgICAgIGAke2xhYmVsfSs9JHtpdGVtLmJhckRlbGF5fWBcbiAgICAgIClcbiAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICBpdGVtLmhlYWQsXG4gICAgICAgICAgeyBkcmF3U1ZHOiBcIjUwJSA1MCVcIiB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGRyYXdTVkc6IFwiMCUgMTAwJVwiLFxuICAgICAgICAgICAgZHVyYXRpb246IDAuMyxcbiAgICAgICAgICAgIGVhc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBgJHtsYWJlbH0rPSR7aXRlbS5oZWFkRGVsYXl9YFxuICAgICAgICApXG4gICAgICAgIC5mcm9tVG8oXG4gICAgICAgICAgaXRlbS5zb2NsZSxcbiAgICAgICAgICB7IGRyYXdTVkc6IFwiNTAlIDUwJVwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZHJhd1NWRzogXCIwJSAxMDAlXCIsXG4gICAgICAgICAgICBkdXJhdGlvbjogMC4zLFxuICAgICAgICAgICAgZWFzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGAke2xhYmVsfSs9JHtpdGVtLnNvY2xlRGVsYXl9YFxuICAgICAgICApO1xuICAgIH0pO1xuXG4gICAgLy8gU3VyIG1vYmlsZSA6IGFjdGl2ZXIgbCdhbmltYXRpb24gcGFyIGTDqWZhdXRcbiAgICBpZiAoaXNNb2JpbGUpIHtcbiAgICAgIHRsLnBsYXkoKTsgLy8gSm91ZSBsJ2FuaW1hdGlvbiBpbW3DqWRpYXRlbWVudCBzdXIgbW9iaWxlXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFN1ciBkZXNrdG9wIDogYXBwbGlxdWVyIGwnYW5pbWF0aW9uIGF1IHN1cnZvbCBzZXVsZW1lbnRcbiAgICAgIHRoaXMuZG93bmxvYWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgICAgICB0bC5wbGF5KCk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5kb3dubG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICAgIHRsLnJldmVyc2UoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGVhY2ggZnJvbSBcImxvZGFzaC9lYWNoXCI7XG5pbXBvcnQgQmFzZUVsZW1lbnQgZnJvbSBcIi4uLy4uL2NsYXNzZXMvQmFzZUVsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVzY3JpcHRpb24gZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmRlc2NyaXB0aW9uXCIsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBnbGl0Y2hlZDogXCIuZ2xpdGNoZWRcIixcbiAgICAgIH0sXG4gICAgICBpZDogXCJkZXNjcmlwdGlvblwiLFxuICAgIH0pO1xuXG4gICAgZWFjaCh0aGlzLmVsZW1lbnRzLmdsaXRjaGVkLCAoZWxlbWVudCwgaW5kZXgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlR2xpdGNoVGV4dChlbGVtZW50KTtcbiAgICAgIH0sIDUwMCAqIGluZGV4KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IGVhY2ggZnJvbSBcImxvZGFzaC9lYWNoXCI7XG5pbXBvcnQgQmFzZUVsZW1lbnQgZnJvbSBcIi4uLy4uL2NsYXNzZXMvQmFzZUVsZW1lbnRcIjtcbmltcG9ydCBDYXJkcyBmcm9tIFwiLi4vLi4vcGFydGlhbHMvQ2FyZHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXhwZXJpZW5jZSBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIuZXhwZXJpZW5jZVwiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgdGl0bGU6IFwiLmV4cGVyaWVuY2VfX3RpdGxlXCIsXG4gICAgICAgIGdsaXRjaGVkOiBcIi5nbGl0Y2hlZFwiLFxuICAgICAgICBjYXJkczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5jYXJkXCIpLFxuICAgICAgICBjYXJkOiBcIi5jYXJkXCIsXG4gICAgICB9LFxuICAgICAgaWQ6IFwiZXhwZXJpZW5jZVwiLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYXJkcyA9IG5ldyBDYXJkcygpO1xuXG4gICAgdGhpcy5jYXJkcy5zY2FsZUNhcmRzKHRoaXMuZWxlbWVudHMuY2FyZCk7XG4gICAgdGhpcy5jYXJkcy5waW5DYXJkcyh0aGlzLmVsZW1lbnRzLmNhcmQpO1xuXG4gICAgdGhpcy5hbmltYXRpb24uc2V0dXBDYXJkQW5pbWF0aW9ucyh0aGlzLmVsZW1lbnRzLmNhcmRzKTtcblxuICAgIGVhY2godGhpcy5lbGVtZW50cy5nbGl0Y2hlZCwgKGVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGVHbGl0Y2hUZXh0KGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgZWFjaCBmcm9tIFwibG9kYXNoL2VhY2hcIjtcbmltcG9ydCBCYXNlRWxlbWVudCBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9CYXNlRWxlbWVudFwiO1xuaW1wb3J0IENhcmRzIGZyb20gXCIuLi8uLi9wYXJ0aWFscy9DYXJkc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXRpb24gZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmZvcm1hdGlvblwiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgdGl0bGU6IFwiLmZvcm1hdGlvbl9fdGl0bGVcIixcbiAgICAgICAgZ2xpdGNoZWQ6IFwiLmdsaXRjaGVkXCIsXG4gICAgICAgIGNhcmRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmRcIiksXG4gICAgICAgIGNhcmQ6IFwiLmNhcmRcIixcbiAgICAgIH0sXG4gICAgICBpZDogXCJmb3JtYXRpb25cIixcbiAgICB9KTtcblxuICAgIHRoaXMuY2FyZHMgPSBuZXcgQ2FyZHMoKTtcblxuICAgIHRoaXMuY2FyZHMuc2NhbGVDYXJkcyh0aGlzLmVsZW1lbnRzLmNhcmQpO1xuICAgIHRoaXMuY2FyZHMucGluQ2FyZHModGhpcy5lbGVtZW50cy5jYXJkKTtcblxuICAgIHRoaXMuYW5pbWF0aW9uLnNldHVwQ2FyZEFuaW1hdGlvbnModGhpcy5lbGVtZW50cy5jYXJkcyk7XG5cbiAgICBlYWNoKHRoaXMuZWxlbWVudHMuZ2xpdGNoZWQsIChlbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlR2xpdGNoVGV4dChlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlcm8gZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmhlcm9cIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHdyYXBwZXI6IFwiLmhlcm9fX3dyYXBwZXJcIixcbiAgICAgICAgbWFpblN1YnRpdGxlOiBcIi5zdWJ0aXRsZV9fbWFpblwiLFxuICAgICAgICBzZWNvbmRTdWJ0aXRsZTogXCIuc3VidGl0bGVfX3NlY29uZFwiLFxuICAgICAgICBnbGl0Y2hlZDogXCIuZ2xpdGNoZWRcIixcbiAgICAgIH0sXG4gICAgICBpZDogXCJoZXJvXCIsXG4gICAgfSk7XG4gIH1cblxuICBhbmltYXRlSW4oKSB7XG4gICAgdGhpcy5lbGVtZW50cy5nbGl0Y2hlZC5mb3JFYWNoKChlLCBpbmRleCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGVHbGl0Y2hUZXh0KGUpO1xuICAgICAgfSwgaW5kZXggKiAyMDApO1xuICAgIH0pO1xuICB9XG59XG4iLCIvLyBJbXBvcnQgY29tcG9uZW50c1xuaW1wb3J0IENvbXBldGVuY2UgZnJvbSBcIi4vY29tcG9uZW50cy9Db21wZXRlbmNlXCI7XG5pbXBvcnQgQ29udGFjdCBmcm9tIFwiLi9jb21wb25lbnRzL0NvbnRhY3RcIjtcbmltcG9ydCBEZXNjcmlwdGlvbiBmcm9tIFwiLi9jb21wb25lbnRzL0Rlc2NyaXB0aW9uXCI7XG5pbXBvcnQgRXhwZXJpZW5jZSBmcm9tIFwiLi9jb21wb25lbnRzL0V4cGVyaWVuY2VcIjtcbmltcG9ydCBGb3JtYXRpb24gZnJvbSBcIi4vY29tcG9uZW50cy9Gb3JtYXRpb25cIjtcbmltcG9ydCBIZXJvIGZyb20gXCIuL2NvbXBvbmVudHMvSGVyb1wiO1xuXG4vLyBJbXBvcnQgcGFydGlhbHNcbmltcG9ydCBDYXJkcyBmcm9tIFwiLi9wYXJ0aWFscy9DYXJkc1wiO1xuaW1wb3J0IEN1cnNvciBmcm9tIFwiLi9wYXJ0aWFscy9DdXJzb3JcIjtcbmltcG9ydCBOYXZpZ2F0aW9uIGZyb20gXCIuL3BhcnRpYWxzL05hdmlnYXRpb25cIjtcbmltcG9ydCBQcm9ncmVzcyBmcm9tIFwiLi9wYXJ0aWFscy9Qcm9ncmVzc1wiO1xuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9wYXJ0aWFscy9IZWFkZXJcIjtcblxuLy8gSW1wb3J0IFdlYkdMXG5pbXBvcnQgV2ViR0wgZnJvbSBcIi4vV2ViR0xcIjtcbmltcG9ydCBDYW52YXMgZnJvbSBcIi4vV2ViR0wvQ2FudmFzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFwcCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIExvY2FsXG4gICAgdGhpcy5zZWN0aW9ucyA9IHt9O1xuICAgIHRoaXMucGFydGlhbHMgPSB7fTtcbiAgICB0aGlzLmNhbnZhcyA9IHt9O1xuICAgIHRoaXMud2ViR0wgPSB7fTtcblxuICAgIC8vIE3DqXRob2Rlc1xuICAgIHRoaXMuaW5pdFNlY3Rpb25zKCk7XG4gICAgdGhpcy5pbml0UGFydGlhbHMoKTtcbiAgICB0aGlzLmluaXRDYW52YXMoKTtcbiAgICB0aGlzLmluaXRXRUdMKCk7XG4gIH1cblxuICBpbml0U2VjdGlvbnMoKSB7XG4gICAgdGhpcy5zZWN0aW9ucyA9IHtcbiAgICAgIGhlcm86IG5ldyBIZXJvKCksXG4gICAgICBkZXNjcmlwdGlvbjogbmV3IERlc2NyaXB0aW9uKCksXG4gICAgICBmb3JtYXRpb246IG5ldyBGb3JtYXRpb24oKSxcbiAgICAgIGNvbXBldGVuY2U6IG5ldyBDb21wZXRlbmNlKCksXG4gICAgICBleHBlcmllbmNlOiBuZXcgRXhwZXJpZW5jZSgpLFxuICAgICAgY29udGFjdDogbmV3IENvbnRhY3QoKSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdFBhcnRpYWxzKCkge1xuICAgIHRoaXMucGFydGlhbHMgPSB7XG4gICAgICBoZWFkZXI6IG5ldyBIZWFkZXIoKSxcbiAgICAgIGN1cnNvcjogbmV3IEN1cnNvcigpLFxuICAgICAgbmF2aWdhdGlvbjogbmV3IE5hdmlnYXRpb24oKSxcbiAgICAgIC8vIHByb2dyZXNzOiBuZXcgUHJvZ3Jlc3MoKSxcbiAgICAgIGNhcmRzOiBuZXcgQ2FyZHMoKSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdENhbnZhcygpIHtcbiAgICB0aGlzLmNhbnZhcyA9IHtcbiAgICAgIGNCYWNrZ3JvdW5kOiBuZXcgQ2FudmFzKFwiI2NCYWNrZ3JvdW5kXCIpLFxuICAgICAgY0FzY2lpSGVybzogbmV3IENhbnZhcyhcIiNjQXNjaWlIZXJvXCIpLFxuICAgICAgY0FzY2lpSW1hZ2U6IG5ldyBDYW52YXMoXCIjY0FzY2lpSW1hZ2VcIiksXG4gICAgfTtcbiAgfVxuXG4gIGluaXRXRUdMKCkge1xuICAgIHRoaXMud2ViR0wgPSB7XG4gICAgICBub2lzeV9iYWNrZ3JvdW5kOiBuZXcgV2ViR0wodGhpcy5jYW52YXMuY0JhY2tncm91bmQsIFwid2ViZ2xCYWNrZ3JvdW5kXCIpLFxuICAgICAgaW1hZ2VfZGlzdG9yc2lvbjogbmV3IFdlYkdMKHRoaXMuY2FudmFzLmNBc2NpaUltYWdlLCBcIndlYmdsQXNjaWlJbWFnZVwiKSxcbiAgICAgIGhlcm9fcmVjdGFuZ2xlOiBuZXcgV2ViR0wodGhpcy5jYW52YXMuY0FzY2lpSGVybywgXCJ3ZWJnbEFzY2lpSGVyb1wiKSxcbiAgICB9O1xuICB9XG5cbiAgYW5pbWF0ZUVsZW1lbnRzKCkge1xuICAgIHRoaXMucGFydGlhbHMuaGVhZGVyLmFuaW1hdGVJbigpO1xuICAgIHRoaXMuc2VjdGlvbnMuaGVyby5hbmltYXRlSW4oKTtcbiAgICB0aGlzLnBhcnRpYWxzLm5hdmlnYXRpb24uYW5pbWF0ZUluKCk7XG4gIH1cbn1cbiIsImltcG9ydCBlYWNoIGZyb20gXCJsb2Rhc2gvZWFjaFwiO1xuaW1wb3J0IGdzYXAgZnJvbSBcImdzYXBcIjtcblxuaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5pbXBvcnQgeyBTY3JvbGxUcmlnZ2VyIH0gZnJvbSBcImdzYXAvU2Nyb2xsVHJpZ2dlclwiO1xuXG5nc2FwLnJlZ2lzdGVyUGx1Z2luKFNjcm9sbFRyaWdnZXIpO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZHMgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmNhcmRcIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGdsaXRjaGVkOiBcIi5nbGl0Y2hlZFwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImNhcmRzXCIsXG4gICAgfSk7XG5cbiAgICBlYWNoKHRoaXMuZWxlbWVudHMuZ2xpdGNoZWQsIChlbGVtZW50KSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlR2xpdGNoVGV4dChlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNjYWxlQ2FyZHMoY2FyZHNXcmFwcGVyKSB7XG4gICAgY29uc3QgY2FyZHMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoY2FyZHNXcmFwcGVyKTtcblxuICAgIGVhY2goY2FyZHMsIChjYXJkLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHRvdGFsID0gY2FyZHMubGVuZ3RoO1xuXG4gICAgICBjb25zdCBzY2FsZUNhcmRUaW1lbGluZSA9IGdzYXAudGltZWxpbmUoe1xuICAgICAgICBzY3JvbGxUcmlnZ2VyOiB7XG4gICAgICAgICAgdHJpZ2dlcjogY2FyZCxcbiAgICAgICAgICBzdGFydDogXCJ0b3AgYm90dG9tLT0xMDBcIixcbiAgICAgICAgICBlbmQ6IFwidG9wIHRvcCs9MTAwXCIsXG4gICAgICAgICAgc2NydWI6IHRydWUsXG4gICAgICAgICAgaW52YWxpZGF0ZU9uUmVmcmVzaDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyAyLiBBam91dGVyIGwnYW5pbWF0aW9uIGRhbnMgbGEgdGltZWxpbmVcbiAgICAgIHNjYWxlQ2FyZFRpbWVsaW5lLnRvKGNhcmQsIHtcbiAgICAgICAgc2NhbGU6IDEgLSAodG90YWwgLSBrZXkpICogMC4wMyxcbiAgICAgICAgZWFzZTogXCJub25lXCIsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHBpbkNhcmRzKGNhcmRzV3JhcHBlcikge1xuICAgIC8vIFZvaXIgw6dhIHBvdXIgZ8OpcmVyIG5pdmVhdSBCYXNlRWxlbWVudFxuICAgIGNvbnN0IGlzTW9iaWxlID0gL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgY29uc3QgY2FyZHMgPSBnc2FwLnV0aWxzLnRvQXJyYXkoY2FyZHNXcmFwcGVyKTtcblxuICAgIGVhY2goY2FyZHMsIChjYXJkLCBrZXkpID0+IHtcbiAgICAgIGNvbnN0IHRvdGFsID0gY2FyZHMubGVuZ3RoO1xuXG4gICAgICBTY3JvbGxUcmlnZ2VyLmNyZWF0ZSh7XG4gICAgICAgIHRyaWdnZXI6IGNhcmQsXG4gICAgICAgIHN0YXJ0OiBgdG9wLT0kezIwICsga2V5ICogMjB9JSAxMCVgLFxuXG4gICAgICAgIGVuZFRyaWdnZXI6IGNhcmRzW3RvdGFsIC0gMV0sXG4gICAgICAgIGVuZDogaXNNb2JpbGUgPyBcImJvdHRvbSA1MCVcIiA6IFwiYm90dG9tIDcwJVwiLFxuICAgICAgICBwaW46IHRydWUsXG4gICAgICAgIHBpblNwYWNpbmc6IGZhbHNlLFxuICAgICAgICBpbnZhbGlkYXRlT25SZWZyZXNoOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlRWxlbWVudCBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9CYXNlRWxlbWVudFwiO1xuaW1wb3J0IGdzYXAgZnJvbSBcImdzYXBcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Vyc29yIGV4dGVuZHMgQmFzZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBlbGVtZW50OiBcIi5jdXJzb3JcIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGN1cnNvcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJzb3JcIiksXG4gICAgICB9LFxuICAgICAgaWQ6IFwiY3Vyc29yXCIsXG4gICAgfSk7XG5cbiAgICBpZiAoL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHJldHVybjtcblxuICAgIHRoaXMubW91c2UgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLnBvcyA9IHsgeDogMCwgeTogMCB9O1xuICAgIHRoaXMuc3BlZWQgPSAwLjE7XG5cbiAgICB0aGlzLmFuaW1hdGUgPSB0aGlzLmFuaW1hdGUuYmluZCh0aGlzKTtcblxuICAgIGlmICh0aGlzLmVsZW1lbnRzLmN1cnNvcikge1xuICAgICAgdGhpcy5iaW5kKCk7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlKTtcbiAgICB9XG5cbiAgICB0aGlzLmluaXRIb3ZlckVmZmVjdHMoKTtcbiAgfVxuXG4gIGJpbmQoKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCAoZSkgPT4ge1xuICAgICAgdGhpcy5tb3VzZS54ID0gZS5jbGllbnRYO1xuICAgICAgdGhpcy5tb3VzZS55ID0gZS5jbGllbnRZO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gTG9naXF1ZSBkZSBkw6lwbGFjZW1lbnQgXCJzbW9vdGhcIiBkdSBjdXN0b20gY3Vyc2V1clxuICBhbmltYXRlKCkge1xuICAgIHRoaXMucG9zLnggKz0gKHRoaXMubW91c2UueCAtIHRoaXMucG9zLngpICogdGhpcy5zcGVlZDtcbiAgICB0aGlzLnBvcy55ICs9ICh0aGlzLm1vdXNlLnkgLSB0aGlzLnBvcy55KSAqIHRoaXMuc3BlZWQ7XG5cbiAgICB0aGlzLmVsZW1lbnRzLmN1cnNvci5zdHlsZS5sZWZ0ID0gYCR7dGhpcy5wb3MueH1weGA7XG4gICAgdGhpcy5lbGVtZW50cy5jdXJzb3Iuc3R5bGUudG9wID0gYCR7dGhpcy5wb3MueX1weGA7XG5cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5hbmltYXRlKTtcbiAgfVxuXG4gIC8vIEEgcmV0cmF2YWlsbGVyXG4gIC8vIENoYW5nZSBsJ2FwcGFyZW5jZSBkdSBjdXJzZXVyIGF1IGhvdmVyIGRlIGNlcnRhaW5zIMOpbMOpbWVudHNcbiAgaW5pdEhvdmVyRWZmZWN0cyhlbGVtZW50cykge1xuICAgIGNvbnN0IHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgXCIubmF2aWdhdGlvbl9faXRlbSwgLmNhcmRfX2Zvb3RlciwgLnNvY2lhbF9fbGluaywgLmNvb3JkaW5hdGVzX19pdGVtLCAuZG93bmxvYWRcIlxuICAgICk7XG5cbiAgICB0YXJnZXRzLmZvckVhY2goKGVsKSA9PiB7XG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy5jdXJzb3IsIHtcbiAgICAgICAgICBzY2FsZTogMC4wNSxcbiAgICAgICAgICBkdXJhdGlvbjogMC4zLFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICAgIGdzYXAudG8odGhpcy5lbGVtZW50cy5jdXJzb3IsIHtcbiAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICBkdXJhdGlvbjogMC4zLFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgZWFjaCBmcm9tIFwibG9kYXNoL2VhY2hcIjtcbmltcG9ydCBCYXNlRWxlbWVudCBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9CYXNlRWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFkZXIgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmhlYWRlcl9fd3JhcHBlclwiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgc29jaWFsczogXCIuc29jaWFsX19saW5rXCIsXG4gICAgICAgIGdsaXRjaGVkOiBcIi5nbGl0Y2hlZFwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImhlYWRlclwiLFxuICAgIH0pO1xuXG4gICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUFycm93T25Ib3Zlcih0aGlzLmVsZW1lbnRzLnNvY2lhbHMpO1xuICB9XG5cbiAgYW5pbWF0ZUluKCkge1xuICAgIGVhY2godGhpcy5lbGVtZW50cy5nbGl0Y2hlZCwgKGUsIGluZGV4KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUdsaXRjaFRleHQoZSk7XG4gICAgICB9LCBpbmRleCAqIDIwMCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBCYXNlRWxlbWVudCBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9CYXNlRWxlbWVudFwiO1xuaW1wb3J0IGVhY2ggZnJvbSBcImxvZGFzaC9lYWNoXCI7XG5cbmltcG9ydCBTY3JvbGxNYW5hZ2VyIGZyb20gXCIuLi8uLi9jbGFzc2VzL1Njcm9sbE1hbmFnZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdGlvbiBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIubmF2aWdhdGlvbl9fd3JhcHBlclwiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgaXRlbXM6IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdmlnYXRpb25fX2l0ZW1cIildLFxuICAgICAgICBzZWN0aW9uczogWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWN0aW9uXCIpXSxcbiAgICAgICAgdmFsdWU6IFwiLnByb2dyZXNzX192YWx1ZVwiLFxuICAgICAgICBnbGl0Y2hlZDogXCIuZ2xpdGNoZWRcIixcbiAgICAgIH0sXG4gICAgICBpZDogXCIubmF2aWdhdGlvblwiLFxuICAgIH0pO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuZWxlbWVudHMpO1xuXG4gICAgdGhpcy5zY3JvbGxNYW5hZ2VyID0gbmV3IFNjcm9sbE1hbmFnZXIoKTtcblxuICAgIGlmICgvaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgcmV0dXJuO1xuXG4gICAgdGhpcy5jdXJyZW50SUQgPSAwO1xuXG4gICAgdGhpcy5hZGRDbGlja0xpc3RlbmVycygpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVTY3JvbGxQZXJjZW50KCk7XG4gICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVNlY3Rpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFkZENsaWNrTGlzdGVuZXJzKCkge1xuICAgIGVhY2godGhpcy5lbGVtZW50cy5pdGVtcywgKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGl0ZW0ucXVlcnlTZWxlY3RvcihcIi5uYXZpZ2F0aW9uX190aXRsZVwiKTtcbiAgICAgIGNvbnN0IHRhcmdldElkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtdGFyZ2V0XCIpO1xuICAgICAgY29uc3QgdGFyZ2V0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7dGFyZ2V0SWR9YCk7XG5cbiAgICAgIGlmICh0YXJnZXRTZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZUNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICB0aGlzLnNjcm9sbFRvU2VjdGlvbih0YXJnZXRTZWN0aW9uKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBoYW5kbGVDbGljayk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzY3JvbGxUb1NlY3Rpb24odGFyZ2V0U2VjdGlvbikge1xuICAgIHRoaXMuc2Nyb2xsTWFuYWdlci5lbmFibGUoKTtcbiAgICB0aGlzLnNjcm9sbE1hbmFnZXIubGVuaXMuc2Nyb2xsVG8odGFyZ2V0U2VjdGlvbiwge1xuICAgICAgZWFzaW5nOiAodCkgPT4gMSAtIE1hdGgucG93KDEgLSB0LCA0KSxcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZUFjdGl2ZVNlY3Rpb24oKSB7XG4gICAgZWFjaCh0aGlzLmVsZW1lbnRzLnNlY3Rpb25zLCAoc2VjdGlvbiwgaSkgPT4ge1xuICAgICAgY29uc3Qgb2Zmc2V0VG9wID0gc2VjdGlvbi5vZmZzZXRUb3A7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuc2Nyb2xsTWFuYWdlci5sZW5pcy5zY3JvbGwgPj1cbiAgICAgICAgb2Zmc2V0VG9wIC0gd2luZG93LmlubmVySGVpZ2h0IC8gMlxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuY3VycmVudElEID0gaTtcbiAgICAgIH1cbiAgICAgIGVhY2godGhpcy5lbGVtZW50cy5pdGVtcywgKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIsIGkgPT09IHRoaXMuY3VycmVudElEKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYW5pbWF0ZUluKCkge1xuICAgIGVhY2godGhpcy5lbGVtZW50cy5nbGl0Y2hlZCwgKGUpID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGVHbGl0Y2hUZXh0KGUpO1xuICAgIH0pO1xuICB9XG4gIHVwZGF0ZVNjcm9sbFBlcmNlbnQoKSB7XG4gICAgY29uc29sZS5sb2codGhpcy5lbGVtZW50cy52YWx1ZSk7XG4gICAgdGhpcy5lbGVtZW50cy52YWx1ZVswXS50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoXG4gICAgICB0aGlzLnNjcm9sbE1hbmFnZXIubGVuaXMucHJvZ3Jlc3MgKiAxMDBcbiAgICApfSVgO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZUVsZW1lbnQgZnJvbSBcIi4uLy4uL2NsYXNzZXMvQmFzZUVsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvZ3Jlc3MgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLnByb2dyZXNzX193cmFwcGVyXCIsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICB2YWx1ZTogXCIucHJvZ3Jlc3NfX3ZhbHVlXCIsXG4gICAgICB9LFxuICAgICAgaWQ6IFwiLnByb2dyZXNzXCIsXG4gICAgfSk7XG5cbiAgICBpZiAoL2lQaG9uZXxpUGFkfGlQb2R8QW5kcm9pZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHJldHVybjtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlU2Nyb2xsUGVyY2VudCgpO1xuICAgIH0pO1xuICB9XG5cbiAgdXBkYXRlU2Nyb2xsUGVyY2VudCgpIHtcbiAgICB0aGlzLmVsZW1lbnRzLnZhbHVlWzBdLnRleHRDb250ZW50ID0gYCR7TWF0aC5yb3VuZChcbiAgICAgIHRoaXMuc2Nyb2xsTWFuYWdlci5sZW5pcy5wcm9ncmVzcyAqIDEwMFxuICAgICl9JWA7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbG9yIH0gZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdlbmVyYXRlQ29sb3IoKSB7XG4gIGxldCBjb2xvcnMgPSBbXCIjOEMxREZGXCIsIFwiI0YyMjNGRlwiLCBcIiNGRjI5NzZcIiwgXCIjRkY5MDFGXCIsIFwiI0ZGRDMxOFwiXTtcbiAgbGV0IHBhbGV0dGUgPSBjb2xvcnM7XG5cbiAgcmV0dXJuIChwYWxldHRlID0gcGFsZXR0ZS5tYXAoKGNvbG9yKSA9PiBuZXcgQ29sb3IoY29sb3IpKSk7XG59XG4iXSwibmFtZXMiOlsiUGxhbmVHZW9tZXRyeSIsIkluc3RhbmNlZE1lc2giLCJSYXdTaGFkZXJNYXRlcmlhbCIsIlZlY3RvcjIiLCJXZWJHTFJlbmRlclRhcmdldCIsIkNhbnZhc1RleHR1cmUiLCJNYXRyaXg0IiwiY29sb3JzIiwidmVydGV4U2hhZGVyIiwiZnJhZ21lbnRTaGFkZXIiLCJCYWNrZ3JvdW5kIiwiQXNjaWlFZmZlY3QiLCJBc2NpaUhlcm8iLCJjb25zdHJ1Y3RvciIsIndlYkdMIiwic2NlbmUiLCJjYW1lcmEiLCJiYWNrZ3JvdW5kIiwiYXNjaWlFZmZlY3QiLCJiYWNrZ3JvdW5kV2lkdGgiLCJmb3ZfeSIsImluc3RhbmNlIiwiYXNwZWN0IiwiYmFja2dyb3VuZEhlaWdodCIsInJvd3MiLCJjb2x1bW5zIiwiaW5zdGFuY2VzIiwiYXNjaWlUZXh0dXJlIiwiY3JlYXRlQVNDSUlHcmlkIiwiaW5pdCIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemUiLCJnZXRSZW5kZXJUYXJnZXQiLCJjYWxjdWxhdGVEaW1lbnNpb25zIiwic2V0R2VvbWV0cnkiLCJzZXRNYXRlcmlhbCIsInNldE1lc2giLCJjcmVhdGVHZW9tZXRyeUdyaWQiLCJhZGQiLCJtZXNoIiwiZGljdCIsImxlbmd0aCIsImNhbnZhcyIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImN0eCIsImdldENvbnRleHQiLCJ3aWR0aCIsImhlaWdodCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiZm9udCIsInRleHRBbGlnbiIsImkiLCJmaWxsVGV4dCIsIm5lZWRzVXBkYXRlIiwiYmFja2dyb3VuZFJlbmRlclRhcmdldCIsInRvdGFsV2lkdGgiLCJ0b3RhbEhlaWdodCIsImNlbGxTaXplIiwiYWN0dWFsQ29sdW1ucyIsIk1hdGgiLCJmbG9vciIsIm5ld0luc3RhbmNlcyIsIm5lZWRzTmV3TWVzaCIsImdlb21ldHJ5IiwibWF0ZXJpYWwiLCJ1bmlmb3JtcyIsInVSZXNvbHV0aW9uIiwidmFsdWUiLCJtdWx0aXBseVNjYWxhciIsIm1pbiIsImRldmljZVBpeGVsUmF0aW8iLCJ1QmFja2dyb3VuZFRleHR1cmUiLCJ1QVNDSUlMZW5ndGgiLCJ1QVNDSUlUZXh0dXJlIiwidVRvdGFsV2lkdGgiLCJ1VG90YWxIZWlnaHQiLCJ1Q29sb3IwIiwidUNvbG9yMSIsInVDb2xvcjIiLCJ1Q29sb3IzIiwidUNvbG9yNCIsIm1hdHJpeCIsInN0YXJ0WCIsInN0YXJ0WSIsImoiLCJpbmRleCIsIngiLCJ5IiwieiIsInNldFBvc2l0aW9uIiwic2V0TWF0cml4QXQiLCJpbnN0YW5jZU1hdHJpeCIsImRpc3Bvc2UiLCJzZXRTaXplIiwidXBkYXRlIiwicmVuZGVyZXIiLCJzZXRSZW5kZXJUYXJnZXQiLCJyZW5kZXIiLCJ0ZXh0dXJlIiwiQXNjaWlJbWFnZSIsInNjYWxlIiwiaW1hZ2VBc3BlY3QiLCJjYW52YXNBc3BlY3QiLCJyZXNvdXJjZXMiLCJvbiIsInVwZGF0ZVRleHR1cmUiLCJpdGVtcyIsIm15UGhvdG8iLCJsb2FkZWQiLCJ0b0xvYWQiLCJ1VGV4dHVyZSIsImNvbnNvbGUiLCJ3YXJuIiwiT2JqZWN0Iiwia2V5cyIsInZpc2libGVIZWlnaHQiLCJ0YW4iLCJmb3YiLCJQSSIsInBvc2l0aW9uIiwidmlzaWJsZVdpZHRoIiwidVNjYWxlIiwidVBhcmFsbGF4IiwidUltYWdlT2Zmc2V0IiwicmVtb3ZlIiwic2V0Iiwic2Nyb2xsWSIsInBhZ2VZT2Zmc2V0IiwiZmFjdG9yIiwiaW1hZ2VPZmZzZXQiLCJNZXNoIiwic2V0Rm92WSIsInVUaW1lIiwidUNvbG9yIiwid2lyZWZyYW1lIiwicm90YXRpb24iLCJhbmdfcmFkIiwidGltZSIsImVsYXBzZWQiLCJQZXJzcGVjdGl2ZUNhbWVyYSIsIkNhbWVyYSIsInNpemVzIiwic2V0SW5zdGFuY2UiLCJ1cGRhdGVQcm9qZWN0aW9uTWF0cml4IiwiRXZlbnRFbWl0dGVyIiwiQ2FudmFzIiwiaWQiLCJxdWVyeVNlbGVjdG9yIiwiY2xpZW50V2lkdGgiLCJjbGllbnRIZWlnaHQiLCJhcHBlbmQiLCJXZWJHTFJlbmRlcmVyIiwiUmVuZGVyZXIiLCJhbnRpYWxpYXMiLCJhbHBoYSIsInNldFBpeGVsUmF0aW8iLCJwaXhlbFJhdGlvIiwiY2FsbGJhY2tzIiwiYmFzZSIsIl9uYW1lcyIsImNhbGxiYWNrIiwibmFtZXMiLCJyZXNvbHZlTmFtZXMiLCJmb3JFYWNoIiwiX25hbWUiLCJuYW1lIiwicmVzb2x2ZU5hbWUiLCJuYW1lc3BhY2UiLCJBcnJheSIsInB1c2giLCJvZmYiLCJ0cmlnZ2VyIiwiX2FyZ3MiLCJmaW5hbFJlc3VsdCIsInJlc3VsdCIsImFyZ3MiLCJhcHBseSIsInJlcGxhY2UiLCJzcGxpdCIsIm5ld05hbWUiLCJwYXJ0cyIsIm9yaWdpbmFsIiwiVGV4dHVyZUxvYWRlciIsIlJlc291cmNlcyIsInNvdXJjZXMiLCJzZXRMb2FkZXJzIiwic3RhcnRMb2FkaW5nIiwibG9hZGVycyIsInRleHR1cmVMb2FkZXIiLCJzb3VyY2UiLCJ0eXBlIiwibG9hZCIsInBhdGgiLCJmaWxlIiwic291cmNlTG9hZGVkIiwicHJvZ3Jlc3MiLCJsb2ciLCJlcnJvciIsIlNpemVzIiwicGl4ZWxSYXRpb24iLCJUaW1lIiwic3RhcnQiLCJEYXRlIiwibm93IiwiY3VycmVudCIsImRlbHRhIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwidGljayIsImN1cnJlbnRUaW1lIiwiU2NlbmUiLCJXZWJHTCIsImVmZmVjdCIsImluaXRFZmZlY3RCeVR5cGUiLCJlYWNoIiwiQmFzZUVsZW1lbnQiLCJDb21wZXRlbmNlIiwiZWxlbWVudCIsImVsZW1lbnRzIiwiZ2xpdGNoZWQiLCJhbmltYXRpb24iLCJhbmltYXRlR2xpdGNoVGV4dCIsIml0ZW0iLCJlIiwiaGFuZGxlSG92ZXJBbmltYXRpb24iLCJnc2FwIiwiQ29udGFjdCIsIndyYXBwZXIiLCJzb2NpYWxzIiwiZG93bmxvYWRCdXR0b24iLCJzZXR1cENWRG93bmxvYWQiLCJhbmltYXRlQXJyb3dPbkhvdmVyIiwic2V0dXBEb3dubG9hZEJ1dHRvbkFuaW1hdGlvbnMiLCJ0b2RheSIsImZvcm1hdHRlZERhdGUiLCJ0b0lTT1N0cmluZyIsImxpbmsiLCJocmVmIiwiZG93bmxvYWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjbGljayIsInJlbW92ZUNoaWxkIiwiZ2V0QWxsU1ZHIiwiYWxsUGFydHMiLCJwYXJ0IiwiZWwiLCJwcmVFbCIsImNyZWF0ZUl0ZW1zIiwiYWxsU1ZHIiwiYmFyIiwiaGVhZCIsInNvY2xlIiwiYmFyRGVsYXkiLCJoZWFkRGVsYXkiLCJzb2NsZURlbGF5IiwidGwiLCJ0aW1lbGluZSIsInBhdXNlZCIsImVhc2UiLCJpc01vYmlsZSIsImlubmVyV2lkdGgiLCJsYWJlbCIsImdyb3VwT2Zmc2V0IiwiZnJvbVRvIiwiZHJhd1NWRyIsImR1cmF0aW9uIiwicGxheSIsInJldmVyc2UiLCJEZXNjcmlwdGlvbiIsInNldFRpbWVvdXQiLCJDYXJkcyIsIkV4cGVyaWVuY2UiLCJ0aXRsZSIsImNhcmRzIiwicXVlcnlTZWxlY3RvckFsbCIsImNhcmQiLCJzY2FsZUNhcmRzIiwicGluQ2FyZHMiLCJzZXR1cENhcmRBbmltYXRpb25zIiwiRm9ybWF0aW9uIiwiSGVybyIsIm1haW5TdWJ0aXRsZSIsInNlY29uZFN1YnRpdGxlIiwiYW5pbWF0ZUluIiwiQ3Vyc29yIiwiTmF2aWdhdGlvbiIsIlByb2dyZXNzIiwiSGVhZGVyIiwiQXBwIiwic2VjdGlvbnMiLCJwYXJ0aWFscyIsImluaXRTZWN0aW9ucyIsImluaXRQYXJ0aWFscyIsImluaXRDYW52YXMiLCJpbml0V0VHTCIsImhlcm8iLCJkZXNjcmlwdGlvbiIsImZvcm1hdGlvbiIsImNvbXBldGVuY2UiLCJleHBlcmllbmNlIiwiY29udGFjdCIsImhlYWRlciIsImN1cnNvciIsIm5hdmlnYXRpb24iLCJjQmFja2dyb3VuZCIsImNBc2NpaUhlcm8iLCJjQXNjaWlJbWFnZSIsIm5vaXN5X2JhY2tncm91bmQiLCJpbWFnZV9kaXN0b3JzaW9uIiwiaGVyb19yZWN0YW5nbGUiLCJhbmltYXRlRWxlbWVudHMiLCJTY3JvbGxUcmlnZ2VyIiwicmVnaXN0ZXJQbHVnaW4iLCJjYXJkc1dyYXBwZXIiLCJ1dGlscyIsInRvQXJyYXkiLCJrZXkiLCJ0b3RhbCIsInNjYWxlQ2FyZFRpbWVsaW5lIiwic2Nyb2xsVHJpZ2dlciIsImVuZCIsInNjcnViIiwiaW52YWxpZGF0ZU9uUmVmcmVzaCIsInRvIiwidGVzdCIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsImNyZWF0ZSIsImVuZFRyaWdnZXIiLCJwaW4iLCJwaW5TcGFjaW5nIiwibW91c2UiLCJwb3MiLCJzcGVlZCIsImFuaW1hdGUiLCJiaW5kIiwiaW5pdEhvdmVyRWZmZWN0cyIsImNsaWVudFgiLCJjbGllbnRZIiwic3R5bGUiLCJsZWZ0IiwidG9wIiwidGFyZ2V0cyIsIlNjcm9sbE1hbmFnZXIiLCJzY3JvbGxNYW5hZ2VyIiwiY3VycmVudElEIiwiYWRkQ2xpY2tMaXN0ZW5lcnMiLCJ1cGRhdGVTY3JvbGxQZXJjZW50IiwidXBkYXRlQWN0aXZlU2VjdGlvbiIsInRhcmdldCIsInRhcmdldElkIiwiZ2V0QXR0cmlidXRlIiwidGFyZ2V0U2VjdGlvbiIsImhhbmRsZUNsaWNrIiwicHJldmVudERlZmF1bHQiLCJzY3JvbGxUb1NlY3Rpb24iLCJlbmFibGUiLCJsZW5pcyIsInNjcm9sbFRvIiwiZWFzaW5nIiwidCIsInBvdyIsInNlY3Rpb24iLCJvZmZzZXRUb3AiLCJzY3JvbGwiLCJpbm5lckhlaWdodCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsInRleHRDb250ZW50Iiwicm91bmQiLCJDb2xvciIsImdlbmVyYXRlQ29sb3IiLCJwYWxldHRlIiwibWFwIiwiY29sb3IiXSwic291cmNlUm9vdCI6IiJ9