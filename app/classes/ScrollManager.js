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

  /**
   * Crée un ScrollTrigger qui exécute une fonction lors de l'entrée de l'élément à l'écran.
   *
   * @param {Object} config - Configuration de l'animation.
   * @param {Element} config.trigger - Élément DOM qui déclenche le ScrollTrigger.
   * @param {string} [config.start="top bottom"] - Position de déclenchement du scroll.
   * @param {boolean} [config.once=true] - Si true, le déclenchement ne se produit qu'une seule fois.
   * @param {Function} config.onEnter - Fonction appelée lors de l'entrée dans la zone visible.
   * @returns {ScrollTrigger} - L'instance ScrollTrigger créée.
   */
  createTriggerOnEnter({ config = {} }) {
    return ScrollTrigger.create({
      ...config,
    });
  }
}
