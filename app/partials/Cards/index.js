import each from "lodash/each";

import BaseElement from "../../classes/BaseElement";

export default class Cards extends BaseElement {
  constructor() {
    super({
      element: ".card",
      elements: {
        glitched: ".glitched",
      },
      id: "cards",
    });

    each(this.elements.glitched, (element) => {
      this.animation.animateGlitchText(element);
    });
  }

  scaleCards(cardsWrapper) {
    const cards = this.animation.gsapArray(cardsWrapper);

    each(cards, (card, key) => {
      const total = cards.length;

      const scaleCardTimeline = this.animation.gsapTimeline({
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "top top+=100",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // 2. Ajouter l'animation dans la timeline
      scaleCardTimeline.to(card, {
        scale: 1 - (total - key) * 0.03,
        ease: "none",
      });
    });
  }

  pinCards(cardsWrapper) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const cards = this.animation.gsapArray(cardsWrapper);

    each(cards, (card, key) => {
      const total = cards.length;

      this.scrollManager.createTriggerOnEnter({
        config: {
          trigger: card,
          start: `top-=${20 + key * 20}% 20%`,

          endTrigger: cards[total - 1],
          end: isMobile ? "bottom 50%" : "bottom 70%",
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        },
      });
    });
  }
}
