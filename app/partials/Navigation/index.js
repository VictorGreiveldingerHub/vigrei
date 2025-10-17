import BaseElement from "../../classes/BaseElement";
import each from "lodash/each";

import ScrollManager from "../../classes/ScrollManager";

export default class Navigation extends BaseElement {
  constructor() {
    super({
      element: ".navigation__wrapper",
      elements: {
        items: [...document.querySelectorAll(".navigation__item")],
        sections: [...document.querySelectorAll("section")],
        value: ".progress__value",
        glitched: ".glitched",
      },
      id: ".navigation",
    });
    console.log(this.elements);

    this.scrollManager = new ScrollManager();

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

    this.currentID = 0;

    this.addClickListeners();

    window.addEventListener("scroll", () => {
      this.updateScrollPercent();
      this.updateActiveSection();
    });
  }

  addClickListeners() {
    each(this.elements.items, (item) => {
      const target = item.querySelector(".navigation__title");
      const targetId = target.getAttribute("data-target");
      const targetSection = document.querySelector(`${targetId}`);

      if (targetSection) {
        const handleClick = (e) => {
          e.preventDefault();

          this.scrollToSection(targetSection);
        };

        item.addEventListener("click", handleClick);
      }
    });
  }

  scrollToSection(targetSection) {
    this.scrollManager.enable();
    this.scrollManager.lenis.scrollTo(targetSection, {
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  }

  updateActiveSection() {
    each(this.elements.sections, (section, i) => {
      const offsetTop = section.offsetTop;
      if (
        this.scrollManager.lenis.scroll >=
        offsetTop - window.innerHeight / 2
      ) {
        this.currentID = i;
      }
      each(this.elements.items, (item, i) => {
        item.classList.toggle("active", i === this.currentID);
      });
    });
  }

  animateIn() {
    each(this.elements.glitched, (e) => {
      this.animation.animateGlitchText(e);
    });
  }
  updateScrollPercent() {
    console.log(this.elements.value);
    this.elements.value[0].textContent = `${Math.round(
      this.scrollManager.lenis.progress * 100
    )}%`;
  }
}
