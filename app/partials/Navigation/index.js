import BaseElement from "../../classes/BaseElement";
import each from "lodash/each";

export default class Navigation extends BaseElement {
  constructor() {
    super({
      element: ".navigation__wrapper",
      elements: {
        items: [...document.querySelectorAll(".navigation__item")],
        sections: [...document.querySelectorAll("section")],
        glitched: ".glitched",
      },
      id: ".navigation",
    });

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

    this.currentID = 0;

    this.addClickListeners();

    window.addEventListener("scroll", () => {
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
}
