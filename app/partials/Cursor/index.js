import BaseElement from "../../classes/BaseElement";

export default class Cursor extends BaseElement {
  constructor() {
    super({
      element: ".cursor",
      elements: {
        cursor: document.querySelector(".cursor"),
      },
      id: "cursor",
    });

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

    this.mouse = { x: 0, y: 0 };
    this.pos = { x: 0, y: 0 };
    this.speed = 0.1;

    this.animate = this.animate.bind(this);

    if (this.elements.cursor) {
      this.bind();
      requestAnimationFrame(this.animate);
    }

    this.initHoverEffects();
  }

  bind() {
    document.addEventListener("mousemove", (e) => {
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
    const targets = document.querySelectorAll(
      ".navigation__item, .card__footer, .social__link, .coordinates__item, .download"
    );

    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        this.animation.gsapTo(this.elements.cursor, {
          scale: 0.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        this.animation.gsapTo(this.elements.cursor, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });
  }
}
