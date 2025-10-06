import each from "lodash/each";

import BaseElement from "../../classes/BaseElement";

export default class Competence extends BaseElement {
  constructor() {
    super({
      element: ".competence",
      elements: {
        items: ".competence__item",
        glitched: ".glitched",
      },
      id: "competence",
    });

    each(this.elements.glitched, (element) => {
      this.animation.animateGlitchText(element);
    });

    each(this.elements.items, (item) => {
      item.addEventListener("mouseenter", (e) =>
        this.animation.handleHoverAnimation(e, item, "hover")
      );
      item.addEventListener("mouseleave", (e) =>
        this.animation.handleHoverAnimation(e, item, "static")
      );
    });
  }
}
