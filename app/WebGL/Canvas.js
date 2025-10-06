import EventEmitter from "./Utils/EventEmitter";

export default class Canvas extends EventEmitter {
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
