import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollManager {
  constructor() {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

    this.lenis = new Lenis();
    this.lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
    this.lenis.on("scroll", ({ scroll, limit }) => {
      this.progress = scroll / limit;
      this.scroll = scroll;
      this.limit = limit;
    });

    this.disable();
  }

  enable() {
    this.lenis.start();
  }

  disable() {
    this.lenis.stop();
  }
}
