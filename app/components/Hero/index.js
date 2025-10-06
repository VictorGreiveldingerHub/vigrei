import BaseElement from "../../classes/BaseElement";

export default class Hero extends BaseElement {
  constructor() {
    super({
      element: ".hero",
      elements: {
        wrapper: ".hero__wrapper",
        mainSubtitle: ".subtitle__main",
        secondSubtitle: ".subtitle__second",
        glitched: ".glitched",
      },
      id: "hero",
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
