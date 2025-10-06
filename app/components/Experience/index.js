import each from "lodash/each";
import BaseElement from "../../classes/BaseElement";
import Cards from "../../partials/Cards";

export default class Experience extends BaseElement {
  constructor() {
    super({
      element: ".experience",
      elements: {
        title: ".experience__title",
        glitched: ".glitched",
        cards: document.querySelectorAll(".card"),
        card: ".card",
      },
      id: "experience",
    });

    this.cards = new Cards();

    this.cards.scaleCards(this.elements.card);
    this.cards.pinCards(this.elements.card);

    this.animation.setupCardAnimations(this.elements.cards);

    each(this.elements.glitched, (element) => {
      this.animation.animateGlitchText(element);
    });
  }
}
