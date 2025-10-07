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
    this.animation.animateLinkArrowSVG(this.elements.socials);
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
    const tl = this.animation.gsapTimeline({
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
      progress: new _partials_Progress__WEBPACK_IMPORTED_MODULE_9__["default"](),
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
/* harmony import */ var _classes_BaseElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../classes/BaseElement */ "./app/classes/BaseElement.js");


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
    const cards = this.animation.gsapArray(cardsWrapper);
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(cards, (card, key) => {
      const total = cards.length;
      const scaleCardTimeline = this.animation.gsapTimeline({
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
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cards = this.animation.gsapArray(cardsWrapper);
    lodash_each__WEBPACK_IMPORTED_MODULE_0___default()(cards, (card, key) => {
      const total = cards.length;
      this.scrollManager.createTriggerOnEnter({
        config: {
          trigger: card,
          start: `top-=${20 + key * 20}% 20%`,
          endTrigger: cards[total - 1],
          end: isMobile ? "bottom 50%" : "bottom 70%",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true
        }
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
        this.animation.gsapTo(this.elements.cursor, {
          scale: 0.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      el.addEventListener("mouseleave", () => {
        this.animation.gsapTo(this.elements.cursor, {
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
    this.animation.animateLinkArrowSVG(this.elements.socials);
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


class Navigation extends _classes_BaseElement__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super({
      element: ".navigation__wrapper",
      elements: {
        items: [...document.querySelectorAll(".navigation__item")],
        sections: [...document.querySelectorAll("section")],
        glitched: ".glitched"
      },
      id: ".navigation"
    });
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;
    this.currentID = 0;
    this.addClickListeners();
    window.addEventListener("scroll", () => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SyxJQUFLLElBQUlKLHdDQUFLLENBQUNJLEtBQUssQ0FBQyxDQUFDO0FBQzVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvQXNjaWlIZXJvL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL1dlYkdML0FzY2lpSW1hZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvQmFja2dyb3VuZC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9XZWJHTC9DYW1lcmEuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvQ2FudmFzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL1dlYkdML1JlbmRlcmVyLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL1dlYkdML1V0aWxzL0V2ZW50RW1pdHRlci5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9XZWJHTC9VdGlscy9SZXNvdXJjZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvVXRpbHMvU2l6ZXMuanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvV2ViR0wvVXRpbHMvVGltZS5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9XZWJHTC9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9XZWJHTC9zb3VyY2VzLmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL2NvbXBvbmVudHMvQ29tcGV0ZW5jZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9jb21wb25lbnRzL0NvbnRhY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvY29tcG9uZW50cy9EZXNjcmlwdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9jb21wb25lbnRzL0V4cGVyaWVuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvY29tcG9uZW50cy9Gb3JtYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvY29tcG9uZW50cy9IZXJvL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL3BhcnRpYWxzL0NhcmRzL2luZGV4LmpzIiwid2VicGFjazovL2JvaWxlcnBsYXRlLy4vYXBwL3BhcnRpYWxzL0N1cnNvci9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9wYXJ0aWFscy9IZWFkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYm9pbGVycGxhdGUvLi9hcHAvcGFydGlhbHMvTmF2aWdhdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC9wYXJ0aWFscy9Qcm9ncmVzcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9ib2lsZXJwbGF0ZS8uL2FwcC91dGlscy9jb2xvcnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgUGxhbmVHZW9tZXRyeSxcbiAgSW5zdGFuY2VkTWVzaCxcbiAgUmF3U2hhZGVyTWF0ZXJpYWwsXG4gIFZlY3RvcjIsXG4gIFdlYkdMUmVuZGVyVGFyZ2V0LFxuICBDYW52YXNUZXh0dXJlLFxuICBNYXRyaXg0LFxufSBmcm9tIFwidGhyZWVcIjtcblxuaW1wb3J0IGNvbG9ycyBmcm9tIFwiLi4vLi4vdXRpbHMvY29sb3JzXCI7XG5cbmltcG9ydCB2ZXJ0ZXhTaGFkZXIgZnJvbSBcIi4uL3NoYWRlcnMvYXNjaWlIZXJvL3ZlcnRleC5nbHNsXCI7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSBcIi4uL3NoYWRlcnMvYXNjaWlIZXJvL2ZyYWdtZW50Lmdsc2xcIjtcblxuaW1wb3J0IEJhY2tncm91bmQgZnJvbSBcIi4uL0JhY2tncm91bmRcIjtcbmltcG9ydCBBc2NpaUVmZmVjdCBmcm9tIFwiLi4vQXNjaWlJbWFnZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBc2NpaUhlcm8ge1xuICBjb25zdHJ1Y3Rvcih3ZWJHTCkge1xuICAgIHRoaXMud2ViR0wgPSB3ZWJHTDtcbiAgICB0aGlzLnNjZW5lID0gdGhpcy53ZWJHTC5zY2VuZTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMud2ViR0wuY2FtZXJhO1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoKTsgLy8gSWNpLCBjJ2VzdCBsJ2luc3RhbmNlIGNyw6nDqWUgZGFucyBXZWJHTCwgamUgdmV1eCBqdXN0ZSByw6ljdXDDqXJlciBsYSBzY2VuZVxuICAgIHRoaXMuYXNjaWlFZmZlY3QgPSBuZXcgQXNjaWlFZmZlY3QoKTtcblxuICAgIHRoaXMuYmFja2dyb3VuZFdpZHRoID1cbiAgICAgIHRoaXMuYmFja2dyb3VuZC5mb3ZfeSAqIHRoaXMuYmFja2dyb3VuZC53ZWJHTC5jYW1lcmEuaW5zdGFuY2UuYXNwZWN0ICogMjtcbiAgICB0aGlzLmJhY2tncm91bmRIZWlnaHQgPSB0aGlzLmJhY2tncm91bmQuZm92X3kgKiAyO1xuXG4gICAgdGhpcy5yb3dzID0gNzA7XG4gICAgdGhpcy5jb2x1bW5zID0gNzA7XG4gICAgdGhpcy5pbnN0YW5jZXMgPSB0aGlzLnJvd3MgKiB0aGlzLmNvbHVtbnM7XG4gICAgdGhpcy5hc2NpaVRleHR1cmUgPSB0aGlzLmNyZWF0ZUFTQ0lJR3JpZCgpO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmdldFJlbmRlclRhcmdldCgpO1xuXG4gICAgdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKCk7XG4gICAgdGhpcy5zZXRHZW9tZXRyeSgpO1xuICAgIHRoaXMuc2V0TWF0ZXJpYWwoKTtcbiAgICB0aGlzLnNldE1lc2goKTtcbiAgICB0aGlzLmNyZWF0ZUdlb21ldHJ5R3JpZCgpO1xuXG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5tZXNoKTtcbiAgfVxuXG4gIGNyZWF0ZUFTQ0lJR3JpZCgpIHtcbiAgICBsZXQgZGljdCA9XG4gICAgICBcIi4tJzpfLF49Oz48KyFyYyovej9zTFR2KUo3KHxGaXtDfWZJMzF0bHVbbmVvWjVZeGp5YV0yRVN3cWtQNmg5ZDRWcE9HYlVBS1hIbThSRCMkQmcwTU5XUSUmQFwiO1xuICAgIHRoaXMubGVuZ3RoID0gZGljdC5sZW5ndGg7XG5cbiAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICBsZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGNhbnZhcy53aWR0aCA9IHRoaXMubGVuZ3RoICogNjQ7XG4gICAgY2FudmFzLmhlaWdodCA9IDY0O1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDAwMFwiO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuICAgIGN0eC5mb250ID0gXCJib2xkIDQwcHggU2FmaXJvXCI7XG4gICAgY3R4LnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGN0eC5maWxsVGV4dChkaWN0W2ldLCAzMiArIGkgKiA2NCwgNDYpO1xuICAgIH1cblxuICAgIGxldCBhc2NpaVRleHR1cmUgPSBuZXcgQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICAgIGFzY2lpVGV4dHVyZS5uZWVkc1VwZGF0ZSA9IHRydWU7XG5cbiAgICByZXR1cm4gYXNjaWlUZXh0dXJlO1xuICB9XG5cbiAgZ2V0UmVuZGVyVGFyZ2V0KCkge1xuICAgIHRoaXMuYmFja2dyb3VuZFJlbmRlclRhcmdldCA9IG5ldyBXZWJHTFJlbmRlclRhcmdldChcbiAgICAgIHRoaXMuYmFja2dyb3VuZC53ZWJHTC5jYW52YXMuaW5zdGFuY2Uud2lkdGgsXG4gICAgICB0aGlzLmJhY2tncm91bmQud2ViR0wuY2FudmFzLmluc3RhbmNlLmhlaWdodFxuICAgICk7XG4gIH1cblxuICBjYWxjdWxhdGVEaW1lbnNpb25zKCkge1xuICAgIHRoaXMudG90YWxXaWR0aCA9IHRoaXMuYmFja2dyb3VuZFdpZHRoO1xuICAgIHRoaXMudG90YWxIZWlnaHQgPSB0aGlzLmJhY2tncm91bmRIZWlnaHQ7XG5cbiAgICB0aGlzLmNlbGxTaXplID0gdGhpcy50b3RhbEhlaWdodCAvIHRoaXMucm93cztcbiAgICB0aGlzLmFjdHVhbENvbHVtbnMgPSBNYXRoLmZsb29yKHRoaXMudG90YWxXaWR0aCAvIHRoaXMuY2VsbFNpemUpO1xuXG4gICAgY29uc3QgbmV3SW5zdGFuY2VzID0gdGhpcy5yb3dzICogdGhpcy5hY3R1YWxDb2x1bW5zO1xuICAgIGlmIChuZXdJbnN0YW5jZXMgIT09IHRoaXMuaW5zdGFuY2VzKSB7XG4gICAgICB0aGlzLmluc3RhbmNlcyA9IG5ld0luc3RhbmNlcztcbiAgICAgIHRoaXMubmVlZHNOZXdNZXNoID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBzZXRHZW9tZXRyeSgpIHtcbiAgICB0aGlzLmdlb21ldHJ5ID0gbmV3IFBsYW5lR2VvbWV0cnkodGhpcy5jZWxsU2l6ZSAqIDAuOSwgdGhpcy5jZWxsU2l6ZSAqIDAuOSk7XG4gIH1cblxuICBzZXRNYXRlcmlhbCgpIHtcbiAgICB0aGlzLm1hdGVyaWFsID0gbmV3IFJhd1NoYWRlck1hdGVyaWFsKHtcbiAgICAgIHZlcnRleFNoYWRlcixcbiAgICAgIGZyYWdtZW50U2hhZGVyLFxuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgdVJlc29sdXRpb246IHtcbiAgICAgICAgICB2YWx1ZTogbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICB0aGlzLndlYkdMLmNhbnZhcy5pbnN0YW5jZS53aWR0aCxcbiAgICAgICAgICAgIHRoaXMud2ViR0wuY2FudmFzLmluc3RhbmNlLmhlaWdodFxuICAgICAgICAgICkubXVsdGlwbHlTY2FsYXIoTWF0aC5taW4od2luZG93LmRldmljZVBpeGVsUmF0aW8sIDIpKSxcbiAgICAgICAgfSxcbiAgICAgICAgdUJhY2tncm91bmRUZXh0dXJlOiB7IHZhbHVlOiBudWxsIH0sXG4gICAgICAgIHVBU0NJSUxlbmd0aDogeyB2YWx1ZTogdGhpcy5sZW5ndGggfSxcbiAgICAgICAgdUFTQ0lJVGV4dHVyZTogeyB2YWx1ZTogdGhpcy5hc2NpaVRleHR1cmUgfSxcbiAgICAgICAgdVRvdGFsV2lkdGg6IHsgdmFsdWU6IHRoaXMudG90YWxXaWR0aCB9LFxuICAgICAgICB1VG90YWxIZWlnaHQ6IHsgdmFsdWU6IHRoaXMudG90YWxIZWlnaHQgfSxcbiAgICAgICAgdUNvbG9yMDogeyB2YWx1ZTogY29sb3JzKClbMF0gfSxcbiAgICAgICAgdUNvbG9yMTogeyB2YWx1ZTogY29sb3JzKClbMV0gfSxcbiAgICAgICAgdUNvbG9yMjogeyB2YWx1ZTogY29sb3JzKClbMl0gfSxcbiAgICAgICAgdUNvbG9yMzogeyB2YWx1ZTogY29sb3JzKClbM10gfSxcbiAgICAgICAgdUNvbG9yNDogeyB2YWx1ZTogY29sb3JzKClbNF0gfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBzZXRNZXNoKCkge1xuICAgIHRoaXMubWVzaCA9IG5ldyBJbnN0YW5jZWRNZXNoKHRoaXMuZ2VvbWV0cnksIHRoaXMubWF0ZXJpYWwsIHRoaXMuaW5zdGFuY2VzKTtcbiAgfVxuXG4gIGNyZWF0ZUdlb21ldHJ5R3JpZCgpIHtcbiAgICBjb25zdCBtYXRyaXggPSBuZXcgTWF0cml4NCgpO1xuXG4gICAgY29uc3Qgc3RhcnRYID0gLXRoaXMudG90YWxXaWR0aCAvIDIgKyB0aGlzLmNlbGxTaXplIC8gMjtcbiAgICBjb25zdCBzdGFydFkgPSAtdGhpcy50b3RhbEhlaWdodCAvIDIgKyB0aGlzLmNlbGxTaXplIC8gMjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5hY3R1YWxDb2x1bW5zOyBqKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBpICogdGhpcy5hY3R1YWxDb2x1bW5zICsgajtcblxuICAgICAgICBpZiAoaW5kZXggPj0gdGhpcy5pbnN0YW5jZXMpIGJyZWFrO1xuXG4gICAgICAgIGNvbnN0IHggPSBzdGFydFggKyBqICogdGhpcy5jZWxsU2l6ZTtcbiAgICAgICAgY29uc3QgeSA9IHN0YXJ0WSArIGkgKiB0aGlzLmNlbGxTaXplO1xuICAgICAgICBjb25zdCB6ID0gMDtcblxuICAgICAgICBtYXRyaXguc2V0UG9zaXRpb24oeCwgeSwgeik7XG4gICAgICAgIHRoaXMubWVzaC5zZXRNYXRyaXhBdChpbmRleCwgbWF0cml4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1lc2guaW5zdGFuY2VNYXRyaXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcmVzaXplKCkge1xuICAgIHRoaXMuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuc2V0R2VvbWV0cnkoKTtcbiAgICB0aGlzLm1lc2guZ2VvbWV0cnkgPSB0aGlzLmdlb21ldHJ5O1xuXG4gICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyVGFyZ2V0LnNldFNpemUoXG4gICAgICB0aGlzLndlYkdMLmNhbnZhcy5pbnN0YW5jZS53aWR0aCxcbiAgICAgIHRoaXMud2ViR0wuY2FudmFzLmluc3RhbmNlLmhlaWdodFxuICAgICk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy53ZWJHTC5yZW5kZXJlci5pbnN0YW5jZS5zZXRSZW5kZXJUYXJnZXQodGhpcy5iYWNrZ3JvdW5kUmVuZGVyVGFyZ2V0KTtcbiAgICB0aGlzLndlYkdMLnJlbmRlcmVyLmluc3RhbmNlLnJlbmRlcihcbiAgICAgIHRoaXMuYmFja2dyb3VuZC5zY2VuZSxcbiAgICAgIHRoaXMuYmFja2dyb3VuZC53ZWJHTC5jYW1lcmEuaW5zdGFuY2VcbiAgICApO1xuXG4gICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy51QmFja2dyb3VuZFRleHR1cmUudmFsdWUgPVxuICAgICAgdGhpcy5iYWNrZ3JvdW5kUmVuZGVyVGFyZ2V0LnRleHR1cmU7XG5cbiAgICB0aGlzLndlYkdMLnJlbmRlcmVyLmluc3RhbmNlLnNldFJlbmRlclRhcmdldChudWxsKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgUGxhbmVHZW9tZXRyeSxcbiAgSW5zdGFuY2VkTWVzaCxcbiAgUmF3U2hhZGVyTWF0ZXJpYWwsXG4gIE1hdHJpeDQsXG4gIENhbnZhc1RleHR1cmUsXG4gIFZlY3RvcjIsXG59IGZyb20gXCJ0aHJlZVwiO1xuXG5pbXBvcnQgY29sb3JzIGZyb20gXCIuLi8uLi91dGlscy9jb2xvcnNcIjtcblxuaW1wb3J0IGZyYWdtZW50U2hhZGVyIGZyb20gXCIuLi9zaGFkZXJzL2FzY2lpSW1hZ2UvZnJhZ21lbnQuZ2xzbFwiO1xuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tIFwiLi4vc2hhZGVycy9hc2NpaUltYWdlL3ZlcnRleC5nbHNsXCI7XG5cbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFzY2lpSW1hZ2Uge1xuICBjb25zdHJ1Y3Rvcih3ZWJHTCkge1xuICAgIGlmIChpbnN0YW5jZSkgcmV0dXJuIGluc3RhbmNlO1xuICAgIGluc3RhbmNlID0gdGhpcztcblxuICAgIHRoaXMud2ViR0wgPSB3ZWJHTDtcbiAgICB0aGlzLnNjZW5lID0gdGhpcy53ZWJHTC5zY2VuZTtcbiAgICB0aGlzLmNhbWVyYSA9IHRoaXMud2ViR0wuY2FtZXJhO1xuXG4gICAgLy8gQ29uZmlndXJhdGlvbiBkZSBsYSBncmlsbGVcbiAgICB0aGlzLnJvd3MgPSA1MDtcbiAgICB0aGlzLmNvbHVtbnMgPSA1MDtcbiAgICB0aGlzLmFjdHVhbENvbHVtbnMgPSB0aGlzLmNvbHVtbnM7XG4gICAgdGhpcy5pbnN0YW5jZXMgPSB0aGlzLnJvd3MgKiB0aGlzLmNvbHVtbnM7XG4gICAgdGhpcy5hc2NpaVRleHR1cmUgPSB0aGlzLmNyZWF0ZUFTQ0lJR3JpZCgpO1xuXG4gICAgdGhpcy5zY2FsZSA9IG5ldyBWZWN0b3IyKDEsIDEpO1xuICAgIHRoaXMuaW1hZ2VBc3BlY3QgPSAxLjA7XG4gICAgdGhpcy5jYW52YXNBc3BlY3QgPSBudWxsO1xuXG4gICAgdGhpcy5pbml0KCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCAoKSA9PiB0aGlzLnJlc2l6ZSgpKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVEaW1lbnNpb25zKCk7XG4gICAgdGhpcy5zZXRHZW9tZXRyeSgpO1xuICAgIHRoaXMuc2V0TWF0ZXJpYWwoKTtcbiAgICB0aGlzLnNldE1lc2goKTtcbiAgICB0aGlzLmNyZWF0ZUdlb21ldHJ5R3JpZCgpO1xuICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWVzaCk7XG5cbiAgICAvLyBBdHRlbnRlIGRlIGxhIHJlc3NvdXJjZVxuICAgIHRoaXMud2ViR0wucmVzb3VyY2VzLm9uKFwicmVhZHlcIiwgKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVUZXh0dXJlKCk7XG4gICAgICB0aGlzLmltYWdlQXNwZWN0ID1cbiAgICAgICAgdGhpcy53ZWJHTC5yZXNvdXJjZXMuaXRlbXMubXlQaG90by53aWR0aCAvXG4gICAgICAgIHRoaXMud2ViR0wucmVzb3VyY2VzLml0ZW1zLm15UGhvdG8uaGVpZ2h0O1xuXG4gICAgICB0aGlzLnJlc2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMud2ViR0wucmVzb3VyY2VzLmxvYWRlZCA9PT0gdGhpcy53ZWJHTC5yZXNvdXJjZXMudG9Mb2FkKSB7XG4gICAgICB0aGlzLnVwZGF0ZVRleHR1cmUoKTtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVBU0NJSUdyaWQoKSB7XG4gICAgY29uc3QgZGljdCA9XG4gICAgICBcIi4tJzpfLF49Oz48KyFyYyovej9zTFR2KUo3KHxGaXtDfWZJMzF0bHVbbmVvWjVZeGp5YV0yRVN3cWtQNmg5ZDRWcE9HYlVBS1hIbThSRCMkQmcwTU5XUSUmQFwiO1xuICAgIHRoaXMubGVuZ3RoID0gZGljdC5sZW5ndGg7XG5cbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICBjYW52YXMud2lkdGggPSB0aGlzLmxlbmd0aCAqIDY0O1xuICAgIGNhbnZhcy5oZWlnaHQgPSA2NDtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwMDBcIjtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblxuICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZGRkZcIjtcbiAgICBjdHguZm9udCA9IFwiYm9sZCA0MHB4IFNhZmlyb1wiOyAvLyBwb2xpY2UgcGx1cyBzw7tyZVxuICAgIGN0eC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xuXG4gICAgLy8gQWpvdXQgZGVzIGNhcmFjdMOocmVzXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjdHguZmlsbFRleHQoZGljdFtpXSwgMzIgKyBpICogNjQsIDQ2KTtcbiAgICB9XG5cbiAgICBjb25zdCBhc2NpaVRleHR1cmUgPSBuZXcgQ2FudmFzVGV4dHVyZShjYW52YXMpO1xuICAgIHJldHVybiBhc2NpaVRleHR1cmU7XG4gIH1cblxuICB1cGRhdGVUZXh0dXJlKCkge1xuICAgIGlmICh0aGlzLm1hdGVyaWFsICYmIHRoaXMud2ViR0wucmVzb3VyY2VzLml0ZW1zLm15UGhvdG8pIHtcbiAgICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudVRleHR1cmUudmFsdWUgPVxuICAgICAgICB0aGlzLndlYkdMLnJlc291cmNlcy5pdGVtcy5teVBob3RvO1xuICAgICAgdGhpcy5tYXRlcmlhbC5uZWVkc1VwZGF0ZSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgXCJUZXh0dXJlIGludHJvdXZhYmxlIDogXCIsXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMud2ViR0wucmVzb3VyY2VzLml0ZW1zKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjYWxjdWxhdGVEaW1lbnNpb25zKCkge1xuICAgIGNvbnN0IHZpc2libGVIZWlnaHQgPVxuICAgICAgMiAqXG4gICAgICBNYXRoLnRhbigodGhpcy5jYW1lcmEuaW5zdGFuY2UuZm92ICogTWF0aC5QSSkgLyAzNjApICpcbiAgICAgIHRoaXMuY2FtZXJhLmluc3RhbmNlLnBvc2l0aW9uLno7XG5cbiAgICBjb25zdCB2aXNpYmxlV2lkdGggPSB2aXNpYmxlSGVpZ2h0ICogdGhpcy5jYW1lcmEuaW5zdGFuY2UuYXNwZWN0O1xuICAgIHRoaXMuY2FudmFzQXNwZWN0ID0gdmlzaWJsZVdpZHRoIC8gdmlzaWJsZUhlaWdodDtcblxuICAgIC8vIENhbGN1bCBkZSBsYSBncmlsbGVcbiAgICB0aGlzLmNlbGxTaXplID0gdmlzaWJsZUhlaWdodCAvIHRoaXMucm93cztcbiAgICB0aGlzLmFjdHVhbENvbHVtbnMgPSBNYXRoLmZsb29yKHZpc2libGVXaWR0aCAvIHRoaXMuY2VsbFNpemUpO1xuXG4gICAgdGhpcy50b3RhbFdpZHRoID0gdGhpcy5hY3R1YWxDb2x1bW5zICogdGhpcy5jZWxsU2l6ZTtcbiAgICB0aGlzLnRvdGFsSGVpZ2h0ID0gdGhpcy5yb3dzICogdGhpcy5jZWxsU2l6ZTtcblxuICAgIGNvbnN0IG5ld0luc3RhbmNlcyA9IHRoaXMucm93cyAqIHRoaXMuYWN0dWFsQ29sdW1ucztcbiAgICBpZiAobmV3SW5zdGFuY2VzICE9PSB0aGlzLmluc3RhbmNlcykge1xuICAgICAgdGhpcy5pbnN0YW5jZXMgPSBuZXdJbnN0YW5jZXM7XG4gICAgICB0aGlzLm5lZWRzTmV3TWVzaCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgc2V0R2VvbWV0cnkoKSB7XG4gICAgdGhpcy5nZW9tZXRyeSA9IG5ldyBQbGFuZUdlb21ldHJ5KFxuICAgICAgdGhpcy5jZWxsU2l6ZSAqIDAuOTUsXG4gICAgICB0aGlzLmNlbGxTaXplICogMC45NVxuICAgICk7XG4gIH1cblxuICBzZXRNYXRlcmlhbCgpIHtcbiAgICB0aGlzLm1hdGVyaWFsID0gbmV3IFJhd1NoYWRlck1hdGVyaWFsKHtcbiAgICAgIHZlcnRleFNoYWRlcixcbiAgICAgIGZyYWdtZW50U2hhZGVyLFxuICAgICAgdW5pZm9ybXM6IHtcbiAgICAgICAgdVRleHR1cmU6IHsgdmFsdWU6IG51bGwgfSxcbiAgICAgICAgdUFTQ0lJTGVuZ3RoOiB7IHZhbHVlOiB0aGlzLmxlbmd0aCB9LFxuICAgICAgICB1QVNDSUlUZXh0dXJlOiB7IHZhbHVlOiB0aGlzLmFzY2lpVGV4dHVyZSB9LFxuICAgICAgICB1U2NhbGU6IHsgdmFsdWU6IG5ldyBWZWN0b3IyKDEsIDEpIH0sXG4gICAgICAgIHVQYXJhbGxheDogeyB2YWx1ZTogMCB9LFxuICAgICAgICB1SW1hZ2VPZmZzZXQ6IHsgdmFsdWU6IG5ldyBWZWN0b3IyKDAsIDAuMSkgfSxcbiAgICAgICAgdUNvbG9yMDogeyB2YWx1ZTogY29sb3JzKClbMF0gfSxcbiAgICAgICAgdUNvbG9yMTogeyB2YWx1ZTogY29sb3JzKClbMV0gfSxcbiAgICAgICAgdUNvbG9yMjogeyB2YWx1ZTogY29sb3JzKClbMl0gfSxcbiAgICAgICAgdUNvbG9yMzogeyB2YWx1ZTogY29sb3JzKClbM10gfSxcbiAgICAgICAgdUNvbG9yNDogeyB2YWx1ZTogY29sb3JzKClbNF0gfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBzZXRNZXNoKCkge1xuICAgIHRoaXMubWVzaCA9IG5ldyBJbnN0YW5jZWRNZXNoKHRoaXMuZ2VvbWV0cnksIHRoaXMubWF0ZXJpYWwsIHRoaXMuaW5zdGFuY2VzKTtcbiAgfVxuXG4gIGNyZWF0ZUdlb21ldHJ5R3JpZCgpIHtcbiAgICBjb25zdCBtYXRyaXggPSBuZXcgTWF0cml4NCgpO1xuXG4gICAgY29uc3Qgc3RhcnRYID0gLXRoaXMudG90YWxXaWR0aCAvIDIgKyB0aGlzLmNlbGxTaXplIC8gMjtcbiAgICBjb25zdCBzdGFydFkgPSAtdGhpcy50b3RhbEhlaWdodCAvIDIgKyB0aGlzLmNlbGxTaXplIC8gMjtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5hY3R1YWxDb2x1bW5zOyBqKyspIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBpICogdGhpcy5hY3R1YWxDb2x1bW5zICsgajtcbiAgICAgICAgaWYgKGluZGV4ID49IHRoaXMuaW5zdGFuY2VzKSBicmVhaztcblxuICAgICAgICBjb25zdCB4ID0gc3RhcnRYICsgaiAqIHRoaXMuY2VsbFNpemU7XG4gICAgICAgIGNvbnN0IHkgPSBzdGFydFkgKyBpICogdGhpcy5jZWxsU2l6ZTtcblxuICAgICAgICBtYXRyaXguc2V0UG9zaXRpb24oeCwgeSwgMCk7XG4gICAgICAgIHRoaXMubWVzaC5zZXRNYXRyaXhBdChpbmRleCwgbWF0cml4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm1lc2guaW5zdGFuY2VNYXRyaXgubmVlZHNVcGRhdGUgPSB0cnVlO1xuICB9XG5cbiAgcmVzaXplKCkge1xuICAgIHRoaXMuY2FsY3VsYXRlRGltZW5zaW9ucygpO1xuICAgIHRoaXMuZ2VvbWV0cnkuZGlzcG9zZSgpO1xuICAgIHRoaXMuc2V0R2VvbWV0cnkoKTtcblxuICAgIGlmICh0aGlzLm5lZWRzTmV3TWVzaCkge1xuICAgICAgdGhpcy5zY2VuZS5yZW1vdmUodGhpcy5tZXNoKTtcbiAgICAgIHRoaXMubWVzaC5nZW9tZXRyeS5kaXNwb3NlKCk7XG4gICAgICB0aGlzLm1lc2gubWF0ZXJpYWwuZGlzcG9zZSgpO1xuXG4gICAgICB0aGlzLnNldE1lc2goKTtcbiAgICAgIHRoaXMuc2NlbmUuYWRkKHRoaXMubWVzaCk7XG4gICAgICB0aGlzLm5lZWRzTmV3TWVzaCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuY3JlYXRlR2VvbWV0cnlHcmlkKCk7XG5cbiAgICBpZiAodGhpcy5pbWFnZUFzcGVjdCA+IHRoaXMuY2FudmFzQXNwZWN0KSB7XG4gICAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnVTY2FsZS52YWx1ZS5zZXQoXG4gICAgICAgIE1hdGgubWluKHRoaXMuaW1hZ2VBc3BlY3QgLyB0aGlzLmNhbnZhc0FzcGVjdCwgMSksXG4gICAgICAgIDFcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF0ZXJpYWwudW5pZm9ybXMudVNjYWxlLnZhbHVlLnNldChcbiAgICAgICAgMSxcbiAgICAgICAgTWF0aC5taW4odGhpcy5pbWFnZUFzcGVjdCAvIHRoaXMuY2FudmFzQXNwZWN0LCAxKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgY29uc3Qgc2Nyb2xsWSA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBjb25zdCBmYWN0b3IgPSAwLjAwMDE7XG5cbiAgICB0aGlzLm1hdGVyaWFsLnVuaWZvcm1zLnVQYXJhbGxheC52YWx1ZSA9IHNjcm9sbFkgKiBmYWN0b3I7XG5cbiAgICBjb25zdCBpbWFnZU9mZnNldCA9IHNjcm9sbFkgKiAwLjAwMDk7XG4gICAgdGhpcy5tYXRlcmlhbC51bmlmb3Jtcy51SW1hZ2VPZmZzZXQudmFsdWUuc2V0KDAsIGltYWdlT2Zmc2V0KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGxhbmVHZW9tZXRyeSwgTWVzaCwgUmF3U2hhZGVyTWF0ZXJpYWwsIFZlY3RvcjIgfSBmcm9tIFwidGhyZWVcIjtcblxuaW1wb3J0IHZlcnRleFNoYWRlciBmcm9tIFwiLi4vc2hhZGVycy9iYWNrZ3JvdW5kL3ZlcnRleC5nbHNsXCI7XG5pbXBvcnQgZnJhZ21lbnRTaGFkZXIgZnJvbSBcIi4uL3NoYWRlcnMvYmFja2dyb3VuZC9mcmFnbWVudC5nbHNsXCI7XG5cbmxldCBpbnN0YW5jZSA9IG51bGw7XG5cbmltcG9ydCBjb2xvcnMgZnJvbSBcIi4uLy4uL3V0aWxzL2NvbG9yc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZ3JvdW5kIHtcbiAgY29uc3RydWN0b3Iod2ViR0wpIHtcbiAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG5cbiAgICBpbnN0YW5jZSA9IHRoaXM7XG5cbiAgICB0aGlzLndlYkdMID0gd2ViR0w7XG4gICAgdGhpcy5zY2VuZSA9IHRoaXMud2ViR0wuc2NlbmU7XG5cbiAgICB0aGlzLmluaXQoKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0R2VvbWV0cnkoKTtcbiAgICB0aGlzLnNldE1hdGVyaWFsKCk7XG4gICAgdGhpcy5zZXRNZXNoKHRoaXMuZ2VvbWV0cnksIHRoaXMubWF0ZXJpYWwpO1xuXG4gICAgdGhpcy5zY2VuZS5hZGQodGhpcy5tZXNoKTtcbiAgfVxuXG4gIHNldEdlb21ldHJ5KCkge1xuICAgIHRoaXMuZm92X3kgPSB0aGlzLnNldEZvdlkoKTtcblxuICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgUGxhbmVHZW9tZXRyeShcbiAgICAgIHRoaXMuZm92X3kgKiB0aGlzLndlYkdMLmNhbWVyYS5pbnN0YW5jZS5hc3BlY3QgKiAyLFxuICAgICAgdGhpcy5mb3ZfeSAqIDIsXG4gICAgICAzMDAsXG4gICAgICAzMDBcbiAgICApO1xuICB9XG5cbiAgc2V0TWF0ZXJpYWwoKSB7XG4gICAgdGhpcy5tYXRlcmlhbCA9IG5ldyBSYXdTaGFkZXJNYXRlcmlhbCh7XG4gICAgICB2ZXJ0ZXhTaGFkZXIsXG4gICAgICBmcmFnbWVudFNoYWRlcixcbiAgICAgIHVuaWZvcm1zOiB7XG4gICAgICAgIHVUaW1lOiB7IHZhbHVlOiAwIH0sXG4gICAgICAgIHVDb2xvcjogeyB2YWx1ZTogY29sb3JzKCkgfSxcbiAgICAgICAgdVJlc29sdXRpb246IHtcbiAgICAgICAgICB2YWx1ZTogbmV3IFZlY3RvcjIoXG4gICAgICAgICAgICB0aGlzLndlYkdMLmNhbnZhcy5pbnN0YW5jZS53aWR0aCxcbiAgICAgICAgICAgIHRoaXMud2ViR0wuY2FudmFzLmluc3RhbmNlLmhlaWdodFxuICAgICAgICAgICkubXVsdGlwbHlTY2FsYXIoTWF0aC5taW4od2luZG93LmRldmljZVBpeGVsUmF0aW8sIDIpKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB3aXJlZnJhbWU6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgc2V0TWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpIHtcbiAgICB0aGlzLm1lc2ggPSBuZXcgTWVzaChnZW9tZXRyeSwgbWF0ZXJpYWwpO1xuICAgIHRoaXMubWVzaC5yb3RhdGlvbi54ID0gLU1hdGguUEkgKiAwLjE7XG4gIH1cblxuICBzZXRGb3ZZKCkge1xuICAgIGxldCBhbmdfcmFkID0gKHRoaXMud2ViR0wuY2FtZXJhLmluc3RhbmNlLmZvdiAqIE1hdGguUEkpIC8gMTgwO1xuICAgIHJldHVybiB0aGlzLndlYkdMLmNhbWVyYS5pbnN0YW5jZS5wb3NpdGlvbi56ICogTWF0aC50YW4oYW5nX3JhZCAvIDIpICogMjtcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICB0aGlzLmZvdl95ID0gdGhpcy5zZXRGb3ZZKCk7XG4gICAgdGhpcy5tZXNoLmdlb21ldHJ5LmRpc3Bvc2UoKTtcblxuICAgIHRoaXMubWVzaC5nZW9tZXRyeSA9IG5ldyBQbGFuZUdlb21ldHJ5KFxuICAgICAgdGhpcy5mb3ZfeSAqIHRoaXMud2ViR0wuY2FtZXJhLmluc3RhbmNlLmFzcGVjdCAqIDIsXG4gICAgICB0aGlzLmZvdl95ICogMixcbiAgICAgIDMwMCxcbiAgICAgIDMwMFxuICAgICk7XG4gIH1cblxuICB1cGRhdGUoKSB7XG4gICAgdGhpcy5tZXNoLm1hdGVyaWFsLnVuaWZvcm1zLnVUaW1lLnZhbHVlID0gdGhpcy53ZWJHTC50aW1lLmVsYXBzZWQgKiAwLjAwNTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGVyc3BlY3RpdmVDYW1lcmEgfSBmcm9tIFwidGhyZWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FtZXJhIHtcbiAgY29uc3RydWN0b3Iod2ViR0wpIHtcbiAgICB0aGlzLndlYkdMID0gd2ViR0w7XG5cbiAgICB0aGlzLnNpemVzID0gdGhpcy53ZWJHTC5zaXplcztcbiAgICB0aGlzLnNjZW5lID0gdGhpcy53ZWJHTC5zY2VuZTtcbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMud2ViR0wuY2FudmFzO1xuXG4gICAgdGhpcy5zZXRJbnN0YW5jZSgpO1xuICB9XG5cbiAgc2V0SW5zdGFuY2UoKSB7XG4gICAgdGhpcy5pbnN0YW5jZSA9IG5ldyBQZXJzcGVjdGl2ZUNhbWVyYShcbiAgICAgIDc1LFxuICAgICAgdGhpcy5zaXplcy53aWR0aCAvIHRoaXMuc2l6ZXMuaGVpZ2h0LFxuICAgICAgMC4xLFxuICAgICAgMTAwXG4gICAgKTtcblxuICAgIHRoaXMuaW5zdGFuY2UucG9zaXRpb24uc2V0KDAsIDAsIDEwKTtcbiAgICB0aGlzLnNjZW5lLmFkZCh0aGlzLmluc3RhbmNlKTtcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICB0aGlzLmluc3RhbmNlLmFzcGVjdCA9IHRoaXMuc2l6ZXMud2lkdGggLyB0aGlzLnNpemVzLmhlaWdodDtcbiAgICB0aGlzLmluc3RhbmNlLnVwZGF0ZVByb2plY3Rpb25NYXRyaXgoKTtcbiAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiLi9VdGlscy9FdmVudEVtaXR0ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FudmFzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoaWQpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pZCA9IGlkO1xuXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuaWQpO1xuXG4gICAgdGhpcy5pbnN0YW5jZSA9IHRoaXMuaW5pdCgpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5pbnN0YW5jZS53aWR0aCA9IHRoaXMuY2FudmFzLmNsaWVudFdpZHRoO1xuICAgICAgdGhpcy5pbnN0YW5jZS5oZWlnaHQgPSB0aGlzLmNhbnZhcy5jbGllbnRIZWlnaHQ7XG4gICAgfSk7XG4gIH1cblxuICBpbml0KCkge1xuICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cbiAgICBjYW52YXMud2lkdGggPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuY2xpZW50SGVpZ2h0O1xuXG4gICAgdGhpcy5jYW52YXMuYXBwZW5kKGNhbnZhcyk7XG5cbiAgICByZXR1cm4gY2FudmFzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBXZWJHTFJlbmRlcmVyIH0gZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbmRlcmVyIHtcbiAgY29uc3RydWN0b3Iod2ViR0wpIHtcbiAgICB0aGlzLndlYkdMID0gd2ViR0w7XG5cbiAgICB0aGlzLmNhbnZhcyA9IHRoaXMud2ViR0wuY2FudmFzO1xuICAgIHRoaXMuc2l6ZXMgPSB0aGlzLndlYkdMLnNpemVzO1xuICAgIHRoaXMuc2NlbmUgPSB0aGlzLndlYkdMLnNjZW5lO1xuICAgIHRoaXMuY2FtZXJhID0gdGhpcy53ZWJHTC5jYW1lcmE7XG5cbiAgICB0aGlzLnNldEluc3RhbmNlKCk7XG4gIH1cblxuICBzZXRJbnN0YW5jZSgpIHtcbiAgICB0aGlzLmluc3RhbmNlID0gbmV3IFdlYkdMUmVuZGVyZXIoe1xuICAgICAgY2FudmFzOiB0aGlzLmNhbnZhcy5pbnN0YW5jZSxcbiAgICAgIGFudGlhbGlhczogdHJ1ZSxcbiAgICAgIGFscGhhOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5pbnN0YW5jZS5zZXRTaXplKHRoaXMuc2l6ZXMud2lkdGgsIHRoaXMuc2l6ZXMuaGVpZ2h0KTtcbiAgICB0aGlzLmluc3RhbmNlLnNldFBpeGVsUmF0aW8odGhpcy5zaXplcy5waXhlbFJhdGlvKTtcbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICB0aGlzLmluc3RhbmNlLnNldFNpemUodGhpcy5zaXplcy53aWR0aCwgdGhpcy5zaXplcy5oZWlnaHQpO1xuICAgIHRoaXMuaW5zdGFuY2Uuc2V0UGl4ZWxSYXRpbyh0aGlzLnNpemVzLnBpeGVsUmF0aW8pO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuaW5zdGFuY2UucmVuZGVyKHRoaXMuc2NlbmUsIHRoaXMuY2FtZXJhLmluc3RhbmNlKTtcbiAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jYWxsYmFja3MgPSB7fTtcbiAgICB0aGlzLmNhbGxiYWNrcy5iYXNlID0ge307XG4gIH1cblxuICBvbihfbmFtZXMsIGNhbGxiYWNrKSB7XG4gICAgLy8gRXJyb3JzXG4gICAgaWYgKHR5cGVvZiBfbmFtZXMgPT09IFwidW5kZWZpbmVkXCIgfHwgX25hbWVzID09PSBcIlwiKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJ3cm9uZyBuYW1lc1wiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJ3cm9uZyBjYWxsYmFja1wiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBSZXNvbHZlIG5hbWVzXG4gICAgY29uc3QgbmFtZXMgPSB0aGlzLnJlc29sdmVOYW1lcyhfbmFtZXMpO1xuXG4gICAgLy8gRWFjaCBuYW1lXG4gICAgbmFtZXMuZm9yRWFjaCgoX25hbWUpID0+IHtcbiAgICAgIC8vIFJlc29sdmUgbmFtZVxuICAgICAgY29uc3QgbmFtZSA9IHRoaXMucmVzb2x2ZU5hbWUoX25hbWUpO1xuXG4gICAgICAvLyBDcmVhdGUgbmFtZXNwYWNlIGlmIG5vdCBleGlzdFxuICAgICAgaWYgKCEodGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdIGluc3RhbmNlb2YgT2JqZWN0KSlcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdID0ge307XG5cbiAgICAgIC8vIENyZWF0ZSBjYWxsYmFjayBpZiBub3QgZXhpc3RcbiAgICAgIGlmICghKHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXVtuYW1lLnZhbHVlXSBpbnN0YW5jZW9mIEFycmF5KSlcbiAgICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdW25hbWUudmFsdWVdID0gW107XG5cbiAgICAgIC8vIEFkZCBjYWxsYmFja1xuICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdW25hbWUudmFsdWVdLnB1c2goY2FsbGJhY2spO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBvZmYoX25hbWVzKSB7XG4gICAgLy8gRXJyb3JzXG4gICAgaWYgKHR5cGVvZiBfbmFtZXMgPT09IFwidW5kZWZpbmVkXCIgfHwgX25hbWVzID09PSBcIlwiKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJ3cm9uZyBuYW1lXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFJlc29sdmUgbmFtZXNcbiAgICBjb25zdCBuYW1lcyA9IHRoaXMucmVzb2x2ZU5hbWVzKF9uYW1lcyk7XG5cbiAgICAvLyBFYWNoIG5hbWVcbiAgICBuYW1lcy5mb3JFYWNoKChfbmFtZSkgPT4ge1xuICAgICAgLy8gUmVzb2x2ZSBuYW1lXG4gICAgICBjb25zdCBuYW1lID0gdGhpcy5yZXNvbHZlTmFtZShfbmFtZSk7XG5cbiAgICAgIC8vIFJlbW92ZSBuYW1lc3BhY2VcbiAgICAgIGlmIChuYW1lLm5hbWVzcGFjZSAhPT0gXCJiYXNlXCIgJiYgbmFtZS52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICBkZWxldGUgdGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdO1xuICAgICAgfVxuXG4gICAgICAvLyBSZW1vdmUgc3BlY2lmaWMgY2FsbGJhY2sgaW4gbmFtZXNwYWNlXG4gICAgICBlbHNlIHtcbiAgICAgICAgLy8gRGVmYXVsdFxuICAgICAgICBpZiAobmFtZS5uYW1lc3BhY2UgPT09IFwiYmFzZVwiKSB7XG4gICAgICAgICAgLy8gVHJ5IHRvIHJlbW92ZSBmcm9tIGVhY2ggbmFtZXNwYWNlXG4gICAgICAgICAgZm9yIChjb25zdCBuYW1lc3BhY2UgaW4gdGhpcy5jYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZXNwYWNlXSBpbnN0YW5jZW9mIE9iamVjdCAmJlxuICAgICAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tuYW1lc3BhY2VdW25hbWUudmFsdWVdIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBkZWxldGUgdGhpcy5jYWxsYmFja3NbbmFtZXNwYWNlXVtuYW1lLnZhbHVlXTtcblxuICAgICAgICAgICAgICAvLyBSZW1vdmUgbmFtZXNwYWNlIGlmIGVtcHR5XG4gICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhbGxiYWNrc1tuYW1lc3BhY2VdKS5sZW5ndGggPT09IDApXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FsbGJhY2tzW25hbWVzcGFjZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3BlY2lmaWVkIG5hbWVzcGFjZVxuICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tuYW1lLm5hbWVzcGFjZV0gaW5zdGFuY2VvZiBPYmplY3QgJiZcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tuYW1lLm5hbWVzcGFjZV1bbmFtZS52YWx1ZV0gaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICApIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy5jYWxsYmFja3NbbmFtZS5uYW1lc3BhY2VdW25hbWUudmFsdWVdO1xuXG4gICAgICAgICAgLy8gUmVtb3ZlIG5hbWVzcGFjZSBpZiBlbXB0eVxuICAgICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLmNhbGxiYWNrc1tuYW1lLm5hbWVzcGFjZV0pLmxlbmd0aCA9PT0gMClcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNhbGxiYWNrc1tuYW1lLm5hbWVzcGFjZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgdHJpZ2dlcihfbmFtZSwgX2FyZ3MpIHtcbiAgICAvLyBFcnJvcnNcbiAgICBpZiAodHlwZW9mIF9uYW1lID09PSBcInVuZGVmaW5lZFwiIHx8IF9uYW1lID09PSBcIlwiKSB7XG4gICAgICBjb25zb2xlLndhcm4oXCJ3cm9uZyBuYW1lXCIpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxldCBmaW5hbFJlc3VsdCA9IG51bGw7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICAvLyBEZWZhdWx0IGFyZ3NcbiAgICBjb25zdCBhcmdzID0gIShfYXJncyBpbnN0YW5jZW9mIEFycmF5KSA/IFtdIDogX2FyZ3M7XG5cbiAgICAvLyBSZXNvbHZlIG5hbWVzIChzaG91bGQgb24gaGF2ZSBvbmUgZXZlbnQpXG4gICAgbGV0IG5hbWUgPSB0aGlzLnJlc29sdmVOYW1lcyhfbmFtZSk7XG5cbiAgICAvLyBSZXNvbHZlIG5hbWVcbiAgICBuYW1lID0gdGhpcy5yZXNvbHZlTmFtZShuYW1lWzBdKTtcblxuICAgIC8vIERlZmF1bHQgbmFtZXNwYWNlXG4gICAgaWYgKG5hbWUubmFtZXNwYWNlID09PSBcImJhc2VcIikge1xuICAgICAgLy8gVHJ5IHRvIGZpbmQgY2FsbGJhY2sgaW4gZWFjaCBuYW1lc3BhY2VcbiAgICAgIGZvciAoY29uc3QgbmFtZXNwYWNlIGluIHRoaXMuY2FsbGJhY2tzKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICB0aGlzLmNhbGxiYWNrc1tuYW1lc3BhY2VdIGluc3RhbmNlb2YgT2JqZWN0ICYmXG4gICAgICAgICAgdGhpcy5jYWxsYmFja3NbbmFtZXNwYWNlXVtuYW1lLnZhbHVlXSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICkge1xuICAgICAgICAgIHRoaXMuY2FsbGJhY2tzW25hbWVzcGFjZV1bbmFtZS52YWx1ZV0uZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGNhbGxiYWNrLmFwcGx5KHRoaXMsIGFyZ3MpO1xuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGZpbmFsUmVzdWx0ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICAgIGZpbmFsUmVzdWx0ID0gcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3BlY2lmaWVkIG5hbWVzcGFjZVxuICAgIGVsc2UgaWYgKHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXSBpbnN0YW5jZW9mIE9iamVjdCkge1xuICAgICAgaWYgKG5hbWUudmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwid3JvbmcgbmFtZVwiKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY2FsbGJhY2tzW25hbWUubmFtZXNwYWNlXVtuYW1lLnZhbHVlXS5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICByZXN1bHQgPSBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcblxuICAgICAgICBpZiAodHlwZW9mIGZpbmFsUmVzdWx0ID09PSBcInVuZGVmaW5lZFwiKSBmaW5hbFJlc3VsdCA9IHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBmaW5hbFJlc3VsdDtcbiAgfVxuXG4gIHJlc29sdmVOYW1lcyhfbmFtZXMpIHtcbiAgICBsZXQgbmFtZXMgPSBfbmFtZXM7XG4gICAgbmFtZXMgPSBuYW1lcy5yZXBsYWNlKC9bXmEtekEtWjAtOSAsLy5dL2csIFwiXCIpO1xuICAgIG5hbWVzID0gbmFtZXMucmVwbGFjZSgvWywvXSsvZywgXCIgXCIpO1xuICAgIG5hbWVzID0gbmFtZXMuc3BsaXQoXCIgXCIpO1xuXG4gICAgcmV0dXJuIG5hbWVzO1xuICB9XG5cbiAgcmVzb2x2ZU5hbWUobmFtZSkge1xuICAgIGNvbnN0IG5ld05hbWUgPSB7fTtcbiAgICBjb25zdCBwYXJ0cyA9IG5hbWUuc3BsaXQoXCIuXCIpO1xuXG4gICAgbmV3TmFtZS5vcmlnaW5hbCA9IG5hbWU7XG4gICAgbmV3TmFtZS52YWx1ZSA9IHBhcnRzWzBdO1xuICAgIG5ld05hbWUubmFtZXNwYWNlID0gXCJiYXNlXCI7IC8vIEJhc2UgbmFtZXNwYWNlXG5cbiAgICAvLyBTcGVjaWZpZWQgbmFtZXNwYWNlXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDEgJiYgcGFydHNbMV0gIT09IFwiXCIpIHtcbiAgICAgIG5ld05hbWUubmFtZXNwYWNlID0gcGFydHNbMV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ld05hbWU7XG4gIH1cbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSBcIi4vRXZlbnRFbWl0dGVyXCI7XG5pbXBvcnQgeyBUZXh0dXJlTG9hZGVyIH0gZnJvbSBcInRocmVlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlc291cmNlcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKHNvdXJjZXMpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5zb3VyY2VzID0gc291cmNlcztcbiAgICB0aGlzLml0ZW1zID0ge307XG4gICAgdGhpcy50b0xvYWQgPSB0aGlzLnNvdXJjZXMubGVuZ3RoO1xuICAgIHRoaXMubG9hZGVkID0gMDtcblxuICAgIHRoaXMuc2V0TG9hZGVycygpO1xuICAgIHRoaXMuc3RhcnRMb2FkaW5nKCk7XG4gIH1cblxuICBzZXRMb2FkZXJzKCkge1xuICAgIHRoaXMubG9hZGVycyA9IHt9O1xuICAgIHRoaXMubG9hZGVycy50ZXh0dXJlTG9hZGVyID0gbmV3IFRleHR1cmVMb2FkZXIoKTtcbiAgfVxuXG4gIHN0YXJ0TG9hZGluZygpIHtcbiAgICBmb3IgKGNvbnN0IHNvdXJjZSBvZiB0aGlzLnNvdXJjZXMpIHtcbiAgICAgIGlmIChzb3VyY2UudHlwZSA9PT0gXCJ0ZXh0dXJlXCIpIHtcbiAgICAgICAgdGhpcy5sb2FkZXJzLnRleHR1cmVMb2FkZXIubG9hZChcbiAgICAgICAgICBzb3VyY2UucGF0aCxcbiAgICAgICAgICAoZmlsZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zb3VyY2VMb2FkZWQoc291cmNlLCBmaWxlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIChwcm9ncmVzcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2FkaW5nIHByb2dyZXNzOlwiLCBwcm9ncmVzcyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBsb2FkaW5nIHRleHR1cmU6XCIsIHNvdXJjZS5uYW1lLCBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNvdXJjZUxvYWRlZChzb3VyY2UsIGZpbGUpIHtcbiAgICB0aGlzLml0ZW1zW3NvdXJjZS5uYW1lXSA9IGZpbGU7XG5cbiAgICB0aGlzLmxvYWRlZCsrO1xuXG4gICAgaWYgKHRoaXMubG9hZGVkID09PSB0aGlzLnRvTG9hZCkge1xuICAgICAgdGhpcy50cmlnZ2VyKFwicmVhZHlcIik7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaXplcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNvbnN0cnVjdG9yKGNhbnZhcykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcbiAgICB0aGlzLndpZHRoID0gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgdGhpcy5waXhlbFJhdGlvbiA9IE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAyKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgICAgdGhpcy5waXhlbFJhdGlvbiA9IE1hdGgubWluKHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAyKTtcblxuICAgICAgdGhpcy50cmlnZ2VyKFwicmVzaXplXCIpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCIuL0V2ZW50RW1pdHRlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuY3VycmVudCA9IHRoaXMuc3RhcnQ7XG4gICAgdGhpcy5lbGFwc2VkID0gMDtcbiAgICB0aGlzLmRlbHRhID0gMTY7XG5cbiAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHRoaXMudGljaygpO1xuICAgIH0pO1xuICB9XG5cbiAgdGljaygpIHtcbiAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgdGhpcy5kZWx0YSA9IGN1cnJlbnRUaW1lIC0gdGhpcy5jdXJyZW50O1xuICAgIHRoaXMuY3VycmVudCA9IGN1cnJlbnRUaW1lO1xuICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuY3VycmVudCAtIHRoaXMuc3RhcnQ7XG5cbiAgICB0aGlzLnRyaWdnZXIoXCJ0aWNrXCIpO1xuXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLnRpY2soKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU2NlbmUgfSBmcm9tIFwidGhyZWVcIjtcblxuaW1wb3J0IENhbWVyYSBmcm9tIFwiLi9DYW1lcmFcIjtcbmltcG9ydCBSZW5kZXJlciBmcm9tIFwiLi9SZW5kZXJlclwiO1xuXG5pbXBvcnQgU2l6ZXMgZnJvbSBcIi4vVXRpbHMvU2l6ZXNcIjtcbmltcG9ydCBUaW1lIGZyb20gXCIuL1V0aWxzL1RpbWVcIjtcbmltcG9ydCBSZXNvdXJjZXMgZnJvbSBcIi4vVXRpbHMvUmVzb3VyY2VzXCI7XG5cbmltcG9ydCBCYWNrZ3JvdW5kIGZyb20gXCIuL0JhY2tncm91bmRcIjtcbmltcG9ydCBBc2NpaUhlcm8gZnJvbSBcIi4vQXNjaWlIZXJvXCI7XG5pbXBvcnQgQXNjaWlJbWFnZSBmcm9tIFwiLi9Bc2NpaUltYWdlXCI7XG5cbmltcG9ydCBzb3VyY2VzIGZyb20gXCIuL3NvdXJjZXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2ViR0wge1xuICBjb25zdHJ1Y3RvcihjYW52YXMsIHR5cGUpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhcztcblxuICAgIC8vIFNldHVwXG4gICAgdGhpcy5zaXplcyA9IG5ldyBTaXplcyh0aGlzLmNhbnZhcy5pbnN0YW5jZSk7XG4gICAgdGhpcy50aW1lID0gbmV3IFRpbWUoKTtcbiAgICB0aGlzLnNjZW5lID0gbmV3IFNjZW5lKCk7XG4gICAgdGhpcy5yZXNvdXJjZXMgPSBuZXcgUmVzb3VyY2VzKHNvdXJjZXMpO1xuICAgIHRoaXMuY2FtZXJhID0gbmV3IENhbWVyYSh0aGlzKTtcbiAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJlbmRlcmVyKHRoaXMpO1xuXG4gICAgdGhpcy5lZmZlY3QgPSB0aGlzLmluaXRFZmZlY3RCeVR5cGUodHlwZSk7XG5cbiAgICB0aGlzLnNpemVzLm9uKFwicmVzaXplXCIsICgpID0+IHtcbiAgICAgIHRoaXMucmVzaXplKCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnRpbWUub24oXCJ0aWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBpbml0RWZmZWN0QnlUeXBlKHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJ3ZWJnbEJhY2tncm91bmRcIjpcbiAgICAgICAgcmV0dXJuIG5ldyBCYWNrZ3JvdW5kKHRoaXMpO1xuICAgICAgY2FzZSBcIndlYmdsQXNjaWlIZXJvXCI6XG4gICAgICAgIHJldHVybiBuZXcgQXNjaWlIZXJvKHRoaXMpO1xuICAgICAgY2FzZSBcIndlYmdsQXNjaWlJbWFnZVwiOlxuICAgICAgICByZXR1cm4gbmV3IEFzY2lpSW1hZ2UodGhpcyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oYFtXZWJHTF0gVW5rbm93biB0eXBlOiAke3R5cGV9YCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHJlc2l6ZSgpIHtcbiAgICB0aGlzLmNhbWVyYS5yZXNpemUoKTtcbiAgICB0aGlzLnJlbmRlcmVyLnJlc2l6ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLmVmZmVjdCAmJiB0aGlzLmVmZmVjdC51cGRhdGUpIHtcbiAgICAgIHRoaXMuZWZmZWN0LnVwZGF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLnJlbmRlcmVyLnVwZGF0ZSgpO1xuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBbXG4gIHtcbiAgICBuYW1lOiBcIm15UGhvdG9cIixcbiAgICB0eXBlOiBcInRleHR1cmVcIixcbiAgICBwYXRoOiBcImltYWdlX18xLmpwZ1wiLFxuICB9LFxuXTtcbiIsImltcG9ydCBlYWNoIGZyb20gXCJsb2Rhc2gvZWFjaFwiO1xuXG5pbXBvcnQgQmFzZUVsZW1lbnQgZnJvbSBcIi4uLy4uL2NsYXNzZXMvQmFzZUVsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcGV0ZW5jZSBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIuY29tcGV0ZW5jZVwiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgaXRlbXM6IFwiLmNvbXBldGVuY2VfX2l0ZW1cIixcbiAgICAgICAgZ2xpdGNoZWQ6IFwiLmdsaXRjaGVkXCIsXG4gICAgICB9LFxuICAgICAgaWQ6IFwiY29tcGV0ZW5jZVwiLFxuICAgIH0pO1xuXG4gICAgZWFjaCh0aGlzLmVsZW1lbnRzLmdsaXRjaGVkLCAoZWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUdsaXRjaFRleHQoZWxlbWVudCk7XG4gICAgfSk7XG5cbiAgICBlYWNoKHRoaXMuZWxlbWVudHMuaXRlbXMsIChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIChlKSA9PlxuICAgICAgICB0aGlzLmFuaW1hdGlvbi5oYW5kbGVIb3ZlckFuaW1hdGlvbihlLCBpdGVtLCBcImhvdmVyXCIpXG4gICAgICApO1xuICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoZSkgPT5cbiAgICAgICAgdGhpcy5hbmltYXRpb24uaGFuZGxlSG92ZXJBbmltYXRpb24oZSwgaXRlbSwgXCJzdGF0aWNcIilcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBlYWNoIGZyb20gXCJsb2Rhc2gvZWFjaFwiO1xuaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbnRhY3QgZXh0ZW5kcyBCYXNlRWxlbWVudCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHtcbiAgICAgIGVsZW1lbnQ6IFwiLmNvbnRhY3RcIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIHdyYXBwZXI6IFwiLmNvbnRhY3RfX3dyYXBwZXJcIixcbiAgICAgICAgaXRlbXM6IFwiLmNvb3JkaW5hdGVzX19pdGVtXCIsXG4gICAgICAgIHNvY2lhbHM6IFwiLnNvY2lhbF9fbGlua1wiLFxuICAgICAgICBnbGl0Y2hlZDogXCIuZ2xpdGNoZWRcIixcbiAgICAgICAgZG93bmxvYWRCdXR0b246IFwiLmRvd25sb2FkXCIsXG4gICAgICB9LFxuICAgICAgaWQ6IFwiY29udGFjdFwiLFxuICAgIH0pO1xuXG4gICAgdGhpcy5kb3dubG9hZEJ1dHRvbiA9IHRoaXMuZWxlbWVudHMuZG93bmxvYWRCdXR0b25bMF07XG5cbiAgICB0aGlzLnNldHVwQ1ZEb3dubG9hZCgpO1xuXG4gICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUxpbmtBcnJvd1NWRyh0aGlzLmVsZW1lbnRzLnNvY2lhbHMpO1xuXG4gICAgdGhpcy5zZXR1cERvd25sb2FkQnV0dG9uQW5pbWF0aW9ucygpO1xuXG4gICAgZWFjaCh0aGlzLmVsZW1lbnRzLmdsaXRjaGVkLCAoZWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUdsaXRjaFRleHQoZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cblxuICBzZXR1cENWRG93bmxvYWQoKSB7XG4gICAgaWYgKCF0aGlzLmRvd25sb2FkQnV0dG9uKSByZXR1cm47XG5cbiAgICB0aGlzLmRvd25sb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gICAgICBjb25zdCBmb3JtYXR0ZWREYXRlID0gdG9kYXkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF07XG4gICAgICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBsaW5rLmhyZWYgPSBcIkNWX1ZpY3Rvcl8yMDI1LnBkZlwiO1xuICAgICAgbGluay5kb3dubG9hZCA9IGBDVl9WaWN0b3JfJHtmb3JtYXR0ZWREYXRlfS5wZGZgO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRBbGxTVkcoKSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSB7fTtcbiAgICBjb25zdCBhbGxQYXJ0cyA9IFtcImFycm93X19iYXJcIiwgXCJhcnJvd19faGVhZFwiLCBcInNvY2xlXCJdO1xuXG4gICAgYWxsUGFydHMuZm9yRWFjaCgocGFydCkgPT4ge1xuICAgICAgY29uc3QgZWwgPSB0aGlzLmRvd25sb2FkQnV0dG9uLnF1ZXJ5U2VsZWN0b3IoYC4ke3BhcnR9YCk7XG4gICAgICBpZiAoZWwpIGVsZW1lbnRzW2Ake3BhcnR9YF0gPSBlbDtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMzsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZUVsID0gdGhpcy5kb3dubG9hZEJ1dHRvbi5xdWVyeVNlbGVjdG9yKGAuJHtwYXJ0fV9fJHtpfWApO1xuICAgICAgICBpZiAocHJlRWwpIGVsZW1lbnRzW2Ake3BhcnR9X18ke2l9YF0gPSBwcmVFbDtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfVxuXG4gIGNyZWF0ZUl0ZW1zKCkge1xuICAgIGNvbnN0IGFsbFNWRyA9IHRoaXMuZ2V0QWxsU1ZHKCk7XG5cbiAgICBjb25zdCBpdGVtcyA9IFtcbiAgICAgIHtcbiAgICAgICAgYmFyOiBhbGxTVkdbXCJhcnJvd19fYmFyX18wXCJdLFxuICAgICAgICBoZWFkOiBhbGxTVkdbXCJhcnJvd19faGVhZF9fMFwiXSxcbiAgICAgICAgc29jbGU6IGFsbFNWR1tcInNvY2xlX18wXCJdLFxuICAgICAgICBiYXJEZWxheTogMCxcbiAgICAgICAgaGVhZERlbGF5OiAwLjIsXG4gICAgICAgIHNvY2xlRGVsYXk6IDAuMixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJhcjogYWxsU1ZHW1wiYXJyb3dfX2Jhcl9fMVwiXSxcbiAgICAgICAgaGVhZDogYWxsU1ZHW1wiYXJyb3dfX2hlYWRfXzFcIl0sXG4gICAgICAgIHNvY2xlOiBhbGxTVkdbXCJzb2NsZV9fMVwiXSxcbiAgICAgICAgYmFyRGVsYXk6IDAuMSxcbiAgICAgICAgaGVhZERlbGF5OiAwLjMsXG4gICAgICAgIHNvY2xlRGVsYXk6IDAuMyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJhcjogYWxsU1ZHW1wiYXJyb3dfX2Jhcl9fMlwiXSxcbiAgICAgICAgaGVhZDogYWxsU1ZHW1wiYXJyb3dfX2hlYWRfXzJcIl0sXG4gICAgICAgIHNvY2xlOiBhbGxTVkdbXCJzb2NsZV9fMlwiXSxcbiAgICAgICAgYmFyRGVsYXk6IDAuMixcbiAgICAgICAgaGVhZERlbGF5OiAwLjQsXG4gICAgICAgIHNvY2xlRGVsYXk6IDAuNCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGJhcjogYWxsU1ZHW1wiYXJyb3dfX2Jhcl9fM1wiXSxcbiAgICAgICAgaGVhZDogYWxsU1ZHW1wiYXJyb3dfX2hlYWRfXzNcIl0sXG4gICAgICAgIHNvY2xlOiBhbGxTVkdbXCJzb2NsZV9fM1wiXSxcbiAgICAgICAgYmFyRGVsYXk6IDAuMyxcbiAgICAgICAgaGVhZERlbGF5OiAwLjUsXG4gICAgICAgIHNvY2xlRGVsYXk6IDAuNSxcbiAgICAgIH0sXG4gICAgXTtcblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIHNldHVwRG93bmxvYWRCdXR0b25BbmltYXRpb25zKCkge1xuICAgIGNvbnN0IGl0ZW1zID0gdGhpcy5jcmVhdGVJdGVtcygpO1xuICAgIGNvbnN0IHRsID0gdGhpcy5hbmltYXRpb24uZ3NhcFRpbWVsaW5lKHsgcGF1c2VkOiB0cnVlIH0pO1xuICAgIGNvbnN0IGVhc2UgPSBbMC43NywgMCwgMC4xNzUsIDFdO1xuICAgIGNvbnN0IGlzTW9iaWxlID0gd2luZG93LmlubmVyV2lkdGggPD0gNjIxOyAvLyBEw6l0ZWN0aW9uIG1vYmlsZSAoYWp1c3RleiBsYSB2YWxldXIgc2Vsb24gdm9zIGJlc29pbnMpXG5cbiAgICBpdGVtcy5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgbGFiZWwgPSBgc3RhcnQke2luZGV4fWA7XG4gICAgICBjb25zdCBncm91cE9mZnNldCA9IGluZGV4ICogMC4wNTsgLy8g4qyF77iPIEF2YW5jZSBjaGFxdWUgZ3JvdXBlIGRlIDAuMDVzXG5cbiAgICAgIHRsLmFkZChsYWJlbCwgZ3JvdXBPZmZzZXQpOyAvLyDirIXvuI8gcGxhY2UgbGUgZ3JvdXBlIGzDqWfDqHJlbWVudCBhcHLDqHMgbGUgcHLDqWPDqWRlbnRcblxuICAgICAgdGwuZnJvbVRvKFxuICAgICAgICBpdGVtLmJhcixcbiAgICAgICAgeyBkcmF3U1ZHOiBcIjAlXCIgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRyYXdTVkc6IFwiMTAwJVwiLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjMsXG4gICAgICAgICAgZWFzZSxcbiAgICAgICAgfSxcbiAgICAgICAgYCR7bGFiZWx9Kz0ke2l0ZW0uYmFyRGVsYXl9YFxuICAgICAgKVxuICAgICAgICAuZnJvbVRvKFxuICAgICAgICAgIGl0ZW0uaGVhZCxcbiAgICAgICAgICB7IGRyYXdTVkc6IFwiNTAlIDUwJVwiIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgZHJhd1NWRzogXCIwJSAxMDAlXCIsXG4gICAgICAgICAgICBkdXJhdGlvbjogMC4zLFxuICAgICAgICAgICAgZWFzZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGAke2xhYmVsfSs9JHtpdGVtLmhlYWREZWxheX1gXG4gICAgICAgIClcbiAgICAgICAgLmZyb21UbyhcbiAgICAgICAgICBpdGVtLnNvY2xlLFxuICAgICAgICAgIHsgZHJhd1NWRzogXCI1MCUgNTAlXCIgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBkcmF3U1ZHOiBcIjAlIDEwMCVcIixcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLjMsXG4gICAgICAgICAgICBlYXNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYCR7bGFiZWx9Kz0ke2l0ZW0uc29jbGVEZWxheX1gXG4gICAgICAgICk7XG4gICAgfSk7XG5cbiAgICAvLyBTdXIgbW9iaWxlIDogYWN0aXZlciBsJ2FuaW1hdGlvbiBwYXIgZMOpZmF1dFxuICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgdGwucGxheSgpOyAvLyBKb3VlIGwnYW5pbWF0aW9uIGltbcOpZGlhdGVtZW50IHN1ciBtb2JpbGVcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3VyIGRlc2t0b3AgOiBhcHBsaXF1ZXIgbCdhbmltYXRpb24gYXUgc3Vydm9sIHNldWxlbWVudFxuICAgICAgdGhpcy5kb3dubG9hZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCAoKSA9PiB7XG4gICAgICAgIHRsLnBsYXkoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmRvd25sb2FkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsICgpID0+IHtcbiAgICAgICAgdGwucmV2ZXJzZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgZWFjaCBmcm9tIFwibG9kYXNoL2VhY2hcIjtcbmltcG9ydCBCYXNlRWxlbWVudCBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9CYXNlRWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZXNjcmlwdGlvbiBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIuZGVzY3JpcHRpb25cIixcbiAgICAgIGVsZW1lbnRzOiB7XG4gICAgICAgIGdsaXRjaGVkOiBcIi5nbGl0Y2hlZFwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImRlc2NyaXB0aW9uXCIsXG4gICAgfSk7XG5cbiAgICBlYWNoKHRoaXMuZWxlbWVudHMuZ2xpdGNoZWQsIChlbGVtZW50LCBpbmRleCkgPT4ge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGVHbGl0Y2hUZXh0KGVsZW1lbnQpO1xuICAgICAgfSwgNTAwICogaW5kZXgpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgZWFjaCBmcm9tIFwibG9kYXNoL2VhY2hcIjtcbmltcG9ydCBCYXNlRWxlbWVudCBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9CYXNlRWxlbWVudFwiO1xuaW1wb3J0IENhcmRzIGZyb20gXCIuLi8uLi9wYXJ0aWFscy9DYXJkc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFeHBlcmllbmNlIGV4dGVuZHMgQmFzZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBlbGVtZW50OiBcIi5leHBlcmllbmNlXCIsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICB0aXRsZTogXCIuZXhwZXJpZW5jZV9fdGl0bGVcIixcbiAgICAgICAgZ2xpdGNoZWQ6IFwiLmdsaXRjaGVkXCIsXG4gICAgICAgIGNhcmRzOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNhcmRcIiksXG4gICAgICAgIGNhcmQ6IFwiLmNhcmRcIixcbiAgICAgIH0sXG4gICAgICBpZDogXCJleHBlcmllbmNlXCIsXG4gICAgfSk7XG5cbiAgICB0aGlzLmNhcmRzID0gbmV3IENhcmRzKCk7XG5cbiAgICB0aGlzLmNhcmRzLnNjYWxlQ2FyZHModGhpcy5lbGVtZW50cy5jYXJkKTtcbiAgICB0aGlzLmNhcmRzLnBpbkNhcmRzKHRoaXMuZWxlbWVudHMuY2FyZCk7XG5cbiAgICB0aGlzLmFuaW1hdGlvbi5zZXR1cENhcmRBbmltYXRpb25zKHRoaXMuZWxlbWVudHMuY2FyZHMpO1xuXG4gICAgZWFjaCh0aGlzLmVsZW1lbnRzLmdsaXRjaGVkLCAoZWxlbWVudCkgPT4ge1xuICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUdsaXRjaFRleHQoZWxlbWVudCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBlYWNoIGZyb20gXCJsb2Rhc2gvZWFjaFwiO1xuaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5pbXBvcnQgQ2FyZHMgZnJvbSBcIi4uLy4uL3BhcnRpYWxzL0NhcmRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1hdGlvbiBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIuZm9ybWF0aW9uXCIsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICB0aXRsZTogXCIuZm9ybWF0aW9uX190aXRsZVwiLFxuICAgICAgICBnbGl0Y2hlZDogXCIuZ2xpdGNoZWRcIixcbiAgICAgICAgY2FyZHM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY2FyZFwiKSxcbiAgICAgICAgY2FyZDogXCIuY2FyZFwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImZvcm1hdGlvblwiLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jYXJkcyA9IG5ldyBDYXJkcygpO1xuXG4gICAgdGhpcy5jYXJkcy5zY2FsZUNhcmRzKHRoaXMuZWxlbWVudHMuY2FyZCk7XG4gICAgdGhpcy5jYXJkcy5waW5DYXJkcyh0aGlzLmVsZW1lbnRzLmNhcmQpO1xuXG4gICAgdGhpcy5hbmltYXRpb24uc2V0dXBDYXJkQW5pbWF0aW9ucyh0aGlzLmVsZW1lbnRzLmNhcmRzKTtcblxuICAgIGVhY2godGhpcy5lbGVtZW50cy5nbGl0Y2hlZCwgKGVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGVHbGl0Y2hUZXh0KGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgQmFzZUVsZW1lbnQgZnJvbSBcIi4uLy4uL2NsYXNzZXMvQmFzZUVsZW1lbnRcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGVybyBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIuaGVyb1wiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgd3JhcHBlcjogXCIuaGVyb19fd3JhcHBlclwiLFxuICAgICAgICBtYWluU3VidGl0bGU6IFwiLnN1YnRpdGxlX19tYWluXCIsXG4gICAgICAgIHNlY29uZFN1YnRpdGxlOiBcIi5zdWJ0aXRsZV9fc2Vjb25kXCIsXG4gICAgICAgIGdsaXRjaGVkOiBcIi5nbGl0Y2hlZFwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImhlcm9cIixcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVJbigpIHtcbiAgICB0aGlzLmVsZW1lbnRzLmdsaXRjaGVkLmZvckVhY2goKGUsIGluZGV4KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5hbmltYXRpb24uYW5pbWF0ZUdsaXRjaFRleHQoZSk7XG4gICAgICB9LCBpbmRleCAqIDIwMCk7XG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIEltcG9ydCBjb21wb25lbnRzXG5pbXBvcnQgQ29tcGV0ZW5jZSBmcm9tIFwiLi9jb21wb25lbnRzL0NvbXBldGVuY2VcIjtcbmltcG9ydCBDb250YWN0IGZyb20gXCIuL2NvbXBvbmVudHMvQ29udGFjdFwiO1xuaW1wb3J0IERlc2NyaXB0aW9uIGZyb20gXCIuL2NvbXBvbmVudHMvRGVzY3JpcHRpb25cIjtcbmltcG9ydCBFeHBlcmllbmNlIGZyb20gXCIuL2NvbXBvbmVudHMvRXhwZXJpZW5jZVwiO1xuaW1wb3J0IEZvcm1hdGlvbiBmcm9tIFwiLi9jb21wb25lbnRzL0Zvcm1hdGlvblwiO1xuaW1wb3J0IEhlcm8gZnJvbSBcIi4vY29tcG9uZW50cy9IZXJvXCI7XG5cbi8vIEltcG9ydCBwYXJ0aWFsc1xuaW1wb3J0IENhcmRzIGZyb20gXCIuL3BhcnRpYWxzL0NhcmRzXCI7XG5pbXBvcnQgQ3Vyc29yIGZyb20gXCIuL3BhcnRpYWxzL0N1cnNvclwiO1xuaW1wb3J0IE5hdmlnYXRpb24gZnJvbSBcIi4vcGFydGlhbHMvTmF2aWdhdGlvblwiO1xuaW1wb3J0IFByb2dyZXNzIGZyb20gXCIuL3BhcnRpYWxzL1Byb2dyZXNzXCI7XG5pbXBvcnQgSGVhZGVyIGZyb20gXCIuL3BhcnRpYWxzL0hlYWRlclwiO1xuXG4vLyBJbXBvcnQgV2ViR0xcbmltcG9ydCBXZWJHTCBmcm9tIFwiLi9XZWJHTFwiO1xuaW1wb3J0IENhbnZhcyBmcm9tIFwiLi9XZWJHTC9DYW52YXNcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gTG9jYWxcbiAgICB0aGlzLnNlY3Rpb25zID0ge307XG4gICAgdGhpcy5wYXJ0aWFscyA9IHt9O1xuICAgIHRoaXMuY2FudmFzID0ge307XG4gICAgdGhpcy53ZWJHTCA9IHt9O1xuXG4gICAgLy8gTcOpdGhvZGVzXG4gICAgdGhpcy5pbml0U2VjdGlvbnMoKTtcbiAgICB0aGlzLmluaXRQYXJ0aWFscygpO1xuICAgIHRoaXMuaW5pdENhbnZhcygpO1xuICAgIHRoaXMuaW5pdFdFR0woKTtcbiAgfVxuXG4gIGluaXRTZWN0aW9ucygpIHtcbiAgICB0aGlzLnNlY3Rpb25zID0ge1xuICAgICAgaGVybzogbmV3IEhlcm8oKSxcbiAgICAgIGRlc2NyaXB0aW9uOiBuZXcgRGVzY3JpcHRpb24oKSxcbiAgICAgIGZvcm1hdGlvbjogbmV3IEZvcm1hdGlvbigpLFxuICAgICAgY29tcGV0ZW5jZTogbmV3IENvbXBldGVuY2UoKSxcbiAgICAgIGV4cGVyaWVuY2U6IG5ldyBFeHBlcmllbmNlKCksXG4gICAgICBjb250YWN0OiBuZXcgQ29udGFjdCgpLFxuICAgIH07XG4gIH1cblxuICBpbml0UGFydGlhbHMoKSB7XG4gICAgdGhpcy5wYXJ0aWFscyA9IHtcbiAgICAgIGhlYWRlcjogbmV3IEhlYWRlcigpLFxuICAgICAgY3Vyc29yOiBuZXcgQ3Vyc29yKCksXG4gICAgICBuYXZpZ2F0aW9uOiBuZXcgTmF2aWdhdGlvbigpLFxuICAgICAgcHJvZ3Jlc3M6IG5ldyBQcm9ncmVzcygpLFxuICAgICAgY2FyZHM6IG5ldyBDYXJkcygpLFxuICAgIH07XG4gIH1cblxuICBpbml0Q2FudmFzKCkge1xuICAgIHRoaXMuY2FudmFzID0ge1xuICAgICAgY0JhY2tncm91bmQ6IG5ldyBDYW52YXMoXCIjY0JhY2tncm91bmRcIiksXG4gICAgICBjQXNjaWlIZXJvOiBuZXcgQ2FudmFzKFwiI2NBc2NpaUhlcm9cIiksXG4gICAgICBjQXNjaWlJbWFnZTogbmV3IENhbnZhcyhcIiNjQXNjaWlJbWFnZVwiKSxcbiAgICB9O1xuICB9XG5cbiAgaW5pdFdFR0woKSB7XG4gICAgdGhpcy53ZWJHTCA9IHtcbiAgICAgIG5vaXN5X2JhY2tncm91bmQ6IG5ldyBXZWJHTCh0aGlzLmNhbnZhcy5jQmFja2dyb3VuZCwgXCJ3ZWJnbEJhY2tncm91bmRcIiksXG4gICAgICBpbWFnZV9kaXN0b3JzaW9uOiBuZXcgV2ViR0wodGhpcy5jYW52YXMuY0FzY2lpSW1hZ2UsIFwid2ViZ2xBc2NpaUltYWdlXCIpLFxuICAgICAgaGVyb19yZWN0YW5nbGU6IG5ldyBXZWJHTCh0aGlzLmNhbnZhcy5jQXNjaWlIZXJvLCBcIndlYmdsQXNjaWlIZXJvXCIpLFxuICAgIH07XG4gIH1cblxuICBhbmltYXRlRWxlbWVudHMoKSB7XG4gICAgdGhpcy5wYXJ0aWFscy5oZWFkZXIuYW5pbWF0ZUluKCk7XG4gICAgdGhpcy5zZWN0aW9ucy5oZXJvLmFuaW1hdGVJbigpO1xuICAgIHRoaXMucGFydGlhbHMubmF2aWdhdGlvbi5hbmltYXRlSW4oKTtcbiAgfVxufVxuIiwiaW1wb3J0IGVhY2ggZnJvbSBcImxvZGFzaC9lYWNoXCI7XG5cbmltcG9ydCBCYXNlRWxlbWVudCBmcm9tIFwiLi4vLi4vY2xhc3Nlcy9CYXNlRWxlbWVudFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJkcyBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIuY2FyZFwiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgZ2xpdGNoZWQ6IFwiLmdsaXRjaGVkXCIsXG4gICAgICB9LFxuICAgICAgaWQ6IFwiY2FyZHNcIixcbiAgICB9KTtcblxuICAgIGVhY2godGhpcy5lbGVtZW50cy5nbGl0Y2hlZCwgKGVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuYW5pbWF0aW9uLmFuaW1hdGVHbGl0Y2hUZXh0KGVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG5cbiAgc2NhbGVDYXJkcyhjYXJkc1dyYXBwZXIpIHtcbiAgICBjb25zdCBjYXJkcyA9IHRoaXMuYW5pbWF0aW9uLmdzYXBBcnJheShjYXJkc1dyYXBwZXIpO1xuXG4gICAgZWFjaChjYXJkcywgKGNhcmQsIGtleSkgPT4ge1xuICAgICAgY29uc3QgdG90YWwgPSBjYXJkcy5sZW5ndGg7XG5cbiAgICAgIGNvbnN0IHNjYWxlQ2FyZFRpbWVsaW5lID0gdGhpcy5hbmltYXRpb24uZ3NhcFRpbWVsaW5lKHtcbiAgICAgICAgc2Nyb2xsVHJpZ2dlcjoge1xuICAgICAgICAgIHRyaWdnZXI6IGNhcmQsXG4gICAgICAgICAgc3RhcnQ6IFwidG9wIGJvdHRvbS09MTAwXCIsXG4gICAgICAgICAgZW5kOiBcInRvcCB0b3ArPTEwMFwiLFxuICAgICAgICAgIHNjcnViOiB0cnVlLFxuICAgICAgICAgIGludmFsaWRhdGVPblJlZnJlc2g6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgLy8gMi4gQWpvdXRlciBsJ2FuaW1hdGlvbiBkYW5zIGxhIHRpbWVsaW5lXG4gICAgICBzY2FsZUNhcmRUaW1lbGluZS50byhjYXJkLCB7XG4gICAgICAgIHNjYWxlOiAxIC0gKHRvdGFsIC0ga2V5KSAqIDAuMDMsXG4gICAgICAgIGVhc2U6IFwibm9uZVwiLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwaW5DYXJkcyhjYXJkc1dyYXBwZXIpIHtcbiAgICBjb25zdCBpc01vYmlsZSA9IC9pUGhvbmV8aVBhZHxpUG9kfEFuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGNvbnN0IGNhcmRzID0gdGhpcy5hbmltYXRpb24uZ3NhcEFycmF5KGNhcmRzV3JhcHBlcik7XG5cbiAgICBlYWNoKGNhcmRzLCAoY2FyZCwga2V5KSA9PiB7XG4gICAgICBjb25zdCB0b3RhbCA9IGNhcmRzLmxlbmd0aDtcblxuICAgICAgdGhpcy5zY3JvbGxNYW5hZ2VyLmNyZWF0ZVRyaWdnZXJPbkVudGVyKHtcbiAgICAgICAgY29uZmlnOiB7XG4gICAgICAgICAgdHJpZ2dlcjogY2FyZCxcbiAgICAgICAgICBzdGFydDogYHRvcC09JHsyMCArIGtleSAqIDIwfSUgMjAlYCxcblxuICAgICAgICAgIGVuZFRyaWdnZXI6IGNhcmRzW3RvdGFsIC0gMV0sXG4gICAgICAgICAgZW5kOiBpc01vYmlsZSA/IFwiYm90dG9tIDUwJVwiIDogXCJib3R0b20gNzAlXCIsXG4gICAgICAgICAgcGluOiB0cnVlLFxuICAgICAgICAgIHBpblNwYWNpbmc6IGZhbHNlLFxuICAgICAgICAgIGludmFsaWRhdGVPblJlZnJlc2g6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEN1cnNvciBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIuY3Vyc29yXCIsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBjdXJzb3I6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3Vyc29yXCIpLFxuICAgICAgfSxcbiAgICAgIGlkOiBcImN1cnNvclwiLFxuICAgIH0pO1xuXG4gICAgaWYgKC9pUGhvbmV8aVBhZHxpUG9kfEFuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSByZXR1cm47XG5cbiAgICB0aGlzLm1vdXNlID0geyB4OiAwLCB5OiAwIH07XG4gICAgdGhpcy5wb3MgPSB7IHg6IDAsIHk6IDAgfTtcbiAgICB0aGlzLnNwZWVkID0gMC4xO1xuXG4gICAgdGhpcy5hbmltYXRlID0gdGhpcy5hbmltYXRlLmJpbmQodGhpcyk7XG5cbiAgICBpZiAodGhpcy5lbGVtZW50cy5jdXJzb3IpIHtcbiAgICAgIHRoaXMuYmluZCgpO1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZSk7XG4gICAgfVxuXG4gICAgdGhpcy5pbml0SG92ZXJFZmZlY3RzKCk7XG4gIH1cblxuICBiaW5kKCkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgKGUpID0+IHtcbiAgICAgIHRoaXMubW91c2UueCA9IGUuY2xpZW50WDtcbiAgICAgIHRoaXMubW91c2UueSA9IGUuY2xpZW50WTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIExvZ2lxdWUgZGUgZMOpcGxhY2VtZW50IFwic21vb3RoXCIgZHUgY3VzdG9tIGN1cnNldXJcbiAgYW5pbWF0ZSgpIHtcbiAgICB0aGlzLnBvcy54ICs9ICh0aGlzLm1vdXNlLnggLSB0aGlzLnBvcy54KSAqIHRoaXMuc3BlZWQ7XG4gICAgdGhpcy5wb3MueSArPSAodGhpcy5tb3VzZS55IC0gdGhpcy5wb3MueSkgKiB0aGlzLnNwZWVkO1xuXG4gICAgdGhpcy5lbGVtZW50cy5jdXJzb3Iuc3R5bGUubGVmdCA9IGAke3RoaXMucG9zLnh9cHhgO1xuICAgIHRoaXMuZWxlbWVudHMuY3Vyc29yLnN0eWxlLnRvcCA9IGAke3RoaXMucG9zLnl9cHhgO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZSk7XG4gIH1cblxuICAvLyBBIHJldHJhdmFpbGxlclxuICAvLyBDaGFuZ2UgbCdhcHBhcmVuY2UgZHUgY3Vyc2V1ciBhdSBob3ZlciBkZSBjZXJ0YWlucyDDqWzDqW1lbnRzXG4gIGluaXRIb3ZlckVmZmVjdHMoZWxlbWVudHMpIHtcbiAgICBjb25zdCB0YXJnZXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgIFwiLm5hdmlnYXRpb25fX2l0ZW0sIC5jYXJkX19mb290ZXIsIC5zb2NpYWxfX2xpbmssIC5jb29yZGluYXRlc19faXRlbSwgLmRvd25sb2FkXCJcbiAgICApO1xuXG4gICAgdGFyZ2V0cy5mb3JFYWNoKChlbCkgPT4ge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIiwgKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5nc2FwVG8odGhpcy5lbGVtZW50cy5jdXJzb3IsIHtcbiAgICAgICAgICBzY2FsZTogMC4wNSxcbiAgICAgICAgICBkdXJhdGlvbjogMC4zLFxuICAgICAgICAgIGVhc2U6IFwicG93ZXIyLm91dFwiLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uLmdzYXBUbyh0aGlzLmVsZW1lbnRzLmN1cnNvciwge1xuICAgICAgICAgIHNjYWxlOiAxLFxuICAgICAgICAgIGR1cmF0aW9uOiAwLjMsXG4gICAgICAgICAgZWFzZTogXCJwb3dlcjIub3V0XCIsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBlYWNoIGZyb20gXCJsb2Rhc2gvZWFjaFwiO1xuaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEhlYWRlciBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIuaGVhZGVyX193cmFwcGVyXCIsXG4gICAgICBlbGVtZW50czoge1xuICAgICAgICBzb2NpYWxzOiBcIi5zb2NpYWxfX2xpbmtcIixcbiAgICAgICAgZ2xpdGNoZWQ6IFwiLmdsaXRjaGVkXCIsXG4gICAgICB9LFxuICAgICAgaWQ6IFwiaGVhZGVyXCIsXG4gICAgfSk7XG5cbiAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlTGlua0Fycm93U1ZHKHRoaXMuZWxlbWVudHMuc29jaWFscyk7XG4gIH1cblxuICBhbmltYXRlSW4oKSB7XG4gICAgZWFjaCh0aGlzLmVsZW1lbnRzLmdsaXRjaGVkLCAoZSwgaW5kZXgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlR2xpdGNoVGV4dChlKTtcbiAgICAgIH0sIGluZGV4ICogMjAwKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5pbXBvcnQgZWFjaCBmcm9tIFwibG9kYXNoL2VhY2hcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdGlvbiBleHRlbmRzIEJhc2VFbGVtZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZWxlbWVudDogXCIubmF2aWdhdGlvbl9fd3JhcHBlclwiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgaXRlbXM6IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdmlnYXRpb25fX2l0ZW1cIildLFxuICAgICAgICBzZWN0aW9uczogWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJzZWN0aW9uXCIpXSxcbiAgICAgICAgZ2xpdGNoZWQ6IFwiLmdsaXRjaGVkXCIsXG4gICAgICB9LFxuICAgICAgaWQ6IFwiLm5hdmlnYXRpb25cIixcbiAgICB9KTtcblxuICAgIGlmICgvaVBob25lfGlQYWR8aVBvZHxBbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkgcmV0dXJuO1xuXG4gICAgdGhpcy5jdXJyZW50SUQgPSAwO1xuXG4gICAgdGhpcy5hZGRDbGlja0xpc3RlbmVycygpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJzY3JvbGxcIiwgKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVBY3RpdmVTZWN0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRDbGlja0xpc3RlbmVycygpIHtcbiAgICBlYWNoKHRoaXMuZWxlbWVudHMuaXRlbXMsIChpdGVtKSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoXCIubmF2aWdhdGlvbl9fdGl0bGVcIik7XG4gICAgICBjb25zdCB0YXJnZXRJZCA9IHRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRhcmdldFwiKTtcbiAgICAgIGNvbnN0IHRhcmdldFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke3RhcmdldElkfWApO1xuXG4gICAgICBpZiAodGFyZ2V0U2VjdGlvbikge1xuICAgICAgICBjb25zdCBoYW5kbGVDbGljayA9IChlKSA9PiB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgdGhpcy5zY3JvbGxUb1NlY3Rpb24odGFyZ2V0U2VjdGlvbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgaGFuZGxlQ2xpY2spO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc2Nyb2xsVG9TZWN0aW9uKHRhcmdldFNlY3Rpb24pIHtcbiAgICB0aGlzLnNjcm9sbE1hbmFnZXIuZW5hYmxlKCk7XG4gICAgdGhpcy5zY3JvbGxNYW5hZ2VyLmxlbmlzLnNjcm9sbFRvKHRhcmdldFNlY3Rpb24sIHtcbiAgICAgIGVhc2luZzogKHQpID0+IDEgLSBNYXRoLnBvdygxIC0gdCwgNCksXG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVBY3RpdmVTZWN0aW9uKCkge1xuICAgIGVhY2godGhpcy5lbGVtZW50cy5zZWN0aW9ucywgKHNlY3Rpb24sIGkpID0+IHtcbiAgICAgIGNvbnN0IG9mZnNldFRvcCA9IHNlY3Rpb24ub2Zmc2V0VG9wO1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLnNjcm9sbE1hbmFnZXIubGVuaXMuc2Nyb2xsID49XG4gICAgICAgIG9mZnNldFRvcCAtIHdpbmRvdy5pbm5lckhlaWdodCAvIDJcbiAgICAgICkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJRCA9IGk7XG4gICAgICB9XG4gICAgICBlYWNoKHRoaXMuZWxlbWVudHMuaXRlbXMsIChpdGVtLCBpKSA9PiB7XG4gICAgICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiLCBpID09PSB0aGlzLmN1cnJlbnRJRCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGFuaW1hdGVJbigpIHtcbiAgICBlYWNoKHRoaXMuZWxlbWVudHMuZ2xpdGNoZWQsIChlKSA9PiB7XG4gICAgICB0aGlzLmFuaW1hdGlvbi5hbmltYXRlR2xpdGNoVGV4dChlKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEJhc2VFbGVtZW50IGZyb20gXCIuLi8uLi9jbGFzc2VzL0Jhc2VFbGVtZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2dyZXNzIGV4dGVuZHMgQmFzZUVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcih7XG4gICAgICBlbGVtZW50OiBcIi5wcm9ncmVzc19fd3JhcHBlclwiLFxuICAgICAgZWxlbWVudHM6IHtcbiAgICAgICAgdmFsdWU6IFwiLnByb2dyZXNzX192YWx1ZVwiLFxuICAgICAgfSxcbiAgICAgIGlkOiBcIi5wcm9ncmVzc1wiLFxuICAgIH0pO1xuXG4gICAgaWYgKC9pUGhvbmV8aVBhZHxpUG9kfEFuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSByZXR1cm47XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInNjcm9sbFwiLCAoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZVNjcm9sbFBlcmNlbnQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVNjcm9sbFBlcmNlbnQoKSB7XG4gICAgdGhpcy5lbGVtZW50cy52YWx1ZVswXS50ZXh0Q29udGVudCA9IGAke01hdGgucm91bmQoXG4gICAgICB0aGlzLnNjcm9sbE1hbmFnZXIubGVuaXMucHJvZ3Jlc3MgKiAxMDBcbiAgICApfSVgO1xuICB9XG59XG4iLCJpbXBvcnQgeyBDb2xvciB9IGZyb20gXCJ0aHJlZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZW5lcmF0ZUNvbG9yKCkge1xuICBsZXQgY29sb3JzID0gW1wiIzhDMURGRlwiLCBcIiNGMjIzRkZcIiwgXCIjRkYyOTc2XCIsIFwiI0ZGOTAxRlwiLCBcIiNGRkQzMThcIl07XG4gIGxldCBwYWxldHRlID0gY29sb3JzO1xuXG4gIHJldHVybiAocGFsZXR0ZSA9IHBhbGV0dGUubWFwKChjb2xvcikgPT4gbmV3IENvbG9yKGNvbG9yKSkpO1xufVxuIl0sIm5hbWVzIjpbIlBsYW5lR2VvbWV0cnkiLCJJbnN0YW5jZWRNZXNoIiwiUmF3U2hhZGVyTWF0ZXJpYWwiLCJWZWN0b3IyIiwiV2ViR0xSZW5kZXJUYXJnZXQiLCJDYW52YXNUZXh0dXJlIiwiTWF0cml4NCIsImNvbG9ycyIsInZlcnRleFNoYWRlciIsImZyYWdtZW50U2hhZGVyIiwiQmFja2dyb3VuZCIsIkFzY2lpRWZmZWN0IiwiQXNjaWlIZXJvIiwiY29uc3RydWN0b3IiLCJ3ZWJHTCIsInNjZW5lIiwiY2FtZXJhIiwiYmFja2dyb3VuZCIsImFzY2lpRWZmZWN0IiwiYmFja2dyb3VuZFdpZHRoIiwiZm92X3kiLCJpbnN0YW5jZSIsImFzcGVjdCIsImJhY2tncm91bmRIZWlnaHQiLCJyb3dzIiwiY29sdW1ucyIsImluc3RhbmNlcyIsImFzY2lpVGV4dHVyZSIsImNyZWF0ZUFTQ0lJR3JpZCIsImluaXQiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplIiwiZ2V0UmVuZGVyVGFyZ2V0IiwiY2FsY3VsYXRlRGltZW5zaW9ucyIsInNldEdlb21ldHJ5Iiwic2V0TWF0ZXJpYWwiLCJzZXRNZXNoIiwiY3JlYXRlR2VvbWV0cnlHcmlkIiwiYWRkIiwibWVzaCIsImRpY3QiLCJsZW5ndGgiLCJjYW52YXMiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjdHgiLCJnZXRDb250ZXh0Iiwid2lkdGgiLCJoZWlnaHQiLCJmaWxsU3R5bGUiLCJmaWxsUmVjdCIsImZvbnQiLCJ0ZXh0QWxpZ24iLCJpIiwiZmlsbFRleHQiLCJuZWVkc1VwZGF0ZSIsImJhY2tncm91bmRSZW5kZXJUYXJnZXQiLCJ0b3RhbFdpZHRoIiwidG90YWxIZWlnaHQiLCJjZWxsU2l6ZSIsImFjdHVhbENvbHVtbnMiLCJNYXRoIiwiZmxvb3IiLCJuZXdJbnN0YW5jZXMiLCJuZWVkc05ld01lc2giLCJnZW9tZXRyeSIsIm1hdGVyaWFsIiwidW5pZm9ybXMiLCJ1UmVzb2x1dGlvbiIsInZhbHVlIiwibXVsdGlwbHlTY2FsYXIiLCJtaW4iLCJkZXZpY2VQaXhlbFJhdGlvIiwidUJhY2tncm91bmRUZXh0dXJlIiwidUFTQ0lJTGVuZ3RoIiwidUFTQ0lJVGV4dHVyZSIsInVUb3RhbFdpZHRoIiwidVRvdGFsSGVpZ2h0IiwidUNvbG9yMCIsInVDb2xvcjEiLCJ1Q29sb3IyIiwidUNvbG9yMyIsInVDb2xvcjQiLCJtYXRyaXgiLCJzdGFydFgiLCJzdGFydFkiLCJqIiwiaW5kZXgiLCJ4IiwieSIsInoiLCJzZXRQb3NpdGlvbiIsInNldE1hdHJpeEF0IiwiaW5zdGFuY2VNYXRyaXgiLCJkaXNwb3NlIiwic2V0U2l6ZSIsInVwZGF0ZSIsInJlbmRlcmVyIiwic2V0UmVuZGVyVGFyZ2V0IiwicmVuZGVyIiwidGV4dHVyZSIsIkFzY2lpSW1hZ2UiLCJzY2FsZSIsImltYWdlQXNwZWN0IiwiY2FudmFzQXNwZWN0IiwicmVzb3VyY2VzIiwib24iLCJ1cGRhdGVUZXh0dXJlIiwiaXRlbXMiLCJteVBob3RvIiwibG9hZGVkIiwidG9Mb2FkIiwidVRleHR1cmUiLCJjb25zb2xlIiwid2FybiIsIk9iamVjdCIsImtleXMiLCJ2aXNpYmxlSGVpZ2h0IiwidGFuIiwiZm92IiwiUEkiLCJwb3NpdGlvbiIsInZpc2libGVXaWR0aCIsInVTY2FsZSIsInVQYXJhbGxheCIsInVJbWFnZU9mZnNldCIsInJlbW92ZSIsInNldCIsInNjcm9sbFkiLCJwYWdlWU9mZnNldCIsImZhY3RvciIsImltYWdlT2Zmc2V0IiwiTWVzaCIsInNldEZvdlkiLCJ1VGltZSIsInVDb2xvciIsIndpcmVmcmFtZSIsInJvdGF0aW9uIiwiYW5nX3JhZCIsInRpbWUiLCJlbGFwc2VkIiwiUGVyc3BlY3RpdmVDYW1lcmEiLCJDYW1lcmEiLCJzaXplcyIsInNldEluc3RhbmNlIiwidXBkYXRlUHJvamVjdGlvbk1hdHJpeCIsIkV2ZW50RW1pdHRlciIsIkNhbnZhcyIsImlkIiwicXVlcnlTZWxlY3RvciIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiYXBwZW5kIiwiV2ViR0xSZW5kZXJlciIsIlJlbmRlcmVyIiwiYW50aWFsaWFzIiwiYWxwaGEiLCJzZXRQaXhlbFJhdGlvIiwicGl4ZWxSYXRpbyIsImNhbGxiYWNrcyIsImJhc2UiLCJfbmFtZXMiLCJjYWxsYmFjayIsIm5hbWVzIiwicmVzb2x2ZU5hbWVzIiwiZm9yRWFjaCIsIl9uYW1lIiwibmFtZSIsInJlc29sdmVOYW1lIiwibmFtZXNwYWNlIiwiQXJyYXkiLCJwdXNoIiwib2ZmIiwidHJpZ2dlciIsIl9hcmdzIiwiZmluYWxSZXN1bHQiLCJyZXN1bHQiLCJhcmdzIiwiYXBwbHkiLCJyZXBsYWNlIiwic3BsaXQiLCJuZXdOYW1lIiwicGFydHMiLCJvcmlnaW5hbCIsIlRleHR1cmVMb2FkZXIiLCJSZXNvdXJjZXMiLCJzb3VyY2VzIiwic2V0TG9hZGVycyIsInN0YXJ0TG9hZGluZyIsImxvYWRlcnMiLCJ0ZXh0dXJlTG9hZGVyIiwic291cmNlIiwidHlwZSIsImxvYWQiLCJwYXRoIiwiZmlsZSIsInNvdXJjZUxvYWRlZCIsInByb2dyZXNzIiwibG9nIiwiZXJyb3IiLCJTaXplcyIsInBpeGVsUmF0aW9uIiwiVGltZSIsInN0YXJ0IiwiRGF0ZSIsIm5vdyIsImN1cnJlbnQiLCJkZWx0YSIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsInRpY2siLCJjdXJyZW50VGltZSIsIlNjZW5lIiwiV2ViR0wiLCJlZmZlY3QiLCJpbml0RWZmZWN0QnlUeXBlIiwiZWFjaCIsIkJhc2VFbGVtZW50IiwiQ29tcGV0ZW5jZSIsImVsZW1lbnQiLCJlbGVtZW50cyIsImdsaXRjaGVkIiwiYW5pbWF0aW9uIiwiYW5pbWF0ZUdsaXRjaFRleHQiLCJpdGVtIiwiZSIsImhhbmRsZUhvdmVyQW5pbWF0aW9uIiwiQ29udGFjdCIsIndyYXBwZXIiLCJzb2NpYWxzIiwiZG93bmxvYWRCdXR0b24iLCJzZXR1cENWRG93bmxvYWQiLCJhbmltYXRlTGlua0Fycm93U1ZHIiwic2V0dXBEb3dubG9hZEJ1dHRvbkFuaW1hdGlvbnMiLCJ0b2RheSIsImZvcm1hdHRlZERhdGUiLCJ0b0lTT1N0cmluZyIsImxpbmsiLCJocmVmIiwiZG93bmxvYWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJjbGljayIsInJlbW92ZUNoaWxkIiwiZ2V0QWxsU1ZHIiwiYWxsUGFydHMiLCJwYXJ0IiwiZWwiLCJwcmVFbCIsImNyZWF0ZUl0ZW1zIiwiYWxsU1ZHIiwiYmFyIiwiaGVhZCIsInNvY2xlIiwiYmFyRGVsYXkiLCJoZWFkRGVsYXkiLCJzb2NsZURlbGF5IiwidGwiLCJnc2FwVGltZWxpbmUiLCJwYXVzZWQiLCJlYXNlIiwiaXNNb2JpbGUiLCJpbm5lcldpZHRoIiwibGFiZWwiLCJncm91cE9mZnNldCIsImZyb21UbyIsImRyYXdTVkciLCJkdXJhdGlvbiIsInBsYXkiLCJyZXZlcnNlIiwiRGVzY3JpcHRpb24iLCJzZXRUaW1lb3V0IiwiQ2FyZHMiLCJFeHBlcmllbmNlIiwidGl0bGUiLCJjYXJkcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjYXJkIiwic2NhbGVDYXJkcyIsInBpbkNhcmRzIiwic2V0dXBDYXJkQW5pbWF0aW9ucyIsIkZvcm1hdGlvbiIsIkhlcm8iLCJtYWluU3VidGl0bGUiLCJzZWNvbmRTdWJ0aXRsZSIsImFuaW1hdGVJbiIsIkN1cnNvciIsIk5hdmlnYXRpb24iLCJQcm9ncmVzcyIsIkhlYWRlciIsIkFwcCIsInNlY3Rpb25zIiwicGFydGlhbHMiLCJpbml0U2VjdGlvbnMiLCJpbml0UGFydGlhbHMiLCJpbml0Q2FudmFzIiwiaW5pdFdFR0wiLCJoZXJvIiwiZGVzY3JpcHRpb24iLCJmb3JtYXRpb24iLCJjb21wZXRlbmNlIiwiZXhwZXJpZW5jZSIsImNvbnRhY3QiLCJoZWFkZXIiLCJjdXJzb3IiLCJuYXZpZ2F0aW9uIiwiY0JhY2tncm91bmQiLCJjQXNjaWlIZXJvIiwiY0FzY2lpSW1hZ2UiLCJub2lzeV9iYWNrZ3JvdW5kIiwiaW1hZ2VfZGlzdG9yc2lvbiIsImhlcm9fcmVjdGFuZ2xlIiwiYW5pbWF0ZUVsZW1lbnRzIiwiY2FyZHNXcmFwcGVyIiwiZ3NhcEFycmF5Iiwia2V5IiwidG90YWwiLCJzY2FsZUNhcmRUaW1lbGluZSIsInNjcm9sbFRyaWdnZXIiLCJlbmQiLCJzY3J1YiIsImludmFsaWRhdGVPblJlZnJlc2giLCJ0byIsInRlc3QiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJzY3JvbGxNYW5hZ2VyIiwiY3JlYXRlVHJpZ2dlck9uRW50ZXIiLCJjb25maWciLCJlbmRUcmlnZ2VyIiwicGluIiwicGluU3BhY2luZyIsIm1vdXNlIiwicG9zIiwic3BlZWQiLCJhbmltYXRlIiwiYmluZCIsImluaXRIb3ZlckVmZmVjdHMiLCJjbGllbnRYIiwiY2xpZW50WSIsInN0eWxlIiwibGVmdCIsInRvcCIsInRhcmdldHMiLCJnc2FwVG8iLCJjdXJyZW50SUQiLCJhZGRDbGlja0xpc3RlbmVycyIsInVwZGF0ZUFjdGl2ZVNlY3Rpb24iLCJ0YXJnZXQiLCJ0YXJnZXRJZCIsImdldEF0dHJpYnV0ZSIsInRhcmdldFNlY3Rpb24iLCJoYW5kbGVDbGljayIsInByZXZlbnREZWZhdWx0Iiwic2Nyb2xsVG9TZWN0aW9uIiwiZW5hYmxlIiwibGVuaXMiLCJzY3JvbGxUbyIsImVhc2luZyIsInQiLCJwb3ciLCJzZWN0aW9uIiwib2Zmc2V0VG9wIiwic2Nyb2xsIiwiaW5uZXJIZWlnaHQiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ1cGRhdGVTY3JvbGxQZXJjZW50IiwidGV4dENvbnRlbnQiLCJyb3VuZCIsIkNvbG9yIiwiZ2VuZXJhdGVDb2xvciIsInBhbGV0dGUiLCJtYXAiLCJjb2xvciJdLCJzb3VyY2VSb290IjoiIn0=