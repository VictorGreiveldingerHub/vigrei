import EventEmitter from "./EventEmitter";

export default class Sizes extends EventEmitter {
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
