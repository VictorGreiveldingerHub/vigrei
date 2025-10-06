import each from "lodash/each";
import BaseElement from "../../classes/BaseElement";

export default class Description extends BaseElement {
  constructor() {
    super({
      element: ".description",
      elements: {
        glitched: ".glitched",
      },
      id: "description",
    });

    each(this.elements.glitched, (element, index) => {
      setTimeout(() => {
        this.animation.animateGlitchText(element);
      }, 500 * index);
    });
  }
}
