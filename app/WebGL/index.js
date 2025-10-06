import { Scene } from "three";

import Camera from "./Camera";
import Renderer from "./Renderer";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";

import Background from "./Background";
import AsciiHero from "./AsciiHero";
import AsciiImage from "./AsciiImage";

import sources from "./sources";

export default class WebGL {
  constructor(canvas, type) {
    this.canvas = canvas;

    // Setup
    this.sizes = new Sizes(this.canvas.instance);
    this.time = new Time();
    this.scene = new Scene();
    this.resources = new Resources(sources);
    this.camera = new Camera(this);
    this.renderer = new Renderer(this);

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
        return new Background(this);
      case "webglAsciiHero":
        return new AsciiHero(this);
      case "webglAsciiImage":
        return new AsciiImage(this);
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
