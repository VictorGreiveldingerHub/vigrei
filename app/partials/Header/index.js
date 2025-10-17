import each from "lodash/each";
import BaseElement from "../../classes/BaseElement";

export default class Header extends BaseElement {
  constructor() {
    super({
      element: ".header__wrapper",
      elements: {
        socials: ".social__link",
        glitched: ".glitched",
      },
      id: "header",
    });

    this.animation.animateArrowOnHover(this.elements.socials);
  }

  animateIn() {
    each(this.elements.glitched, (e, index) => {
      setTimeout(() => {
        this.animation.animateGlitchText(e);
      }, index * 200);
    });
  }
}
