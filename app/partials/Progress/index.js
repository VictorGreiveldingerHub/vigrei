import BaseElement from "../../classes/BaseElement";

export default class Progress extends BaseElement {
  constructor() {
    super({
      element: ".progress__wrapper",
      elements: {
        value: ".progress__value",
      },
      id: ".progress",
    });

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

    window.addEventListener("scroll", () => {
      this.updateScrollPercent();
    });
  }

  updateScrollPercent() {
    this.elements.value[0].textContent = `${Math.round(
      this.scrollManager.lenis.progress * 100
    )}%`;
  }
}
