import each from "lodash/each";

import ScrollManager from "./ScrollManager";
import Animation from "./Animation";

export default class BaseElement {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = { ...elements };
    this.id = id;

    // Partage des classes entre enfants
    this.animation = new Animation();
    this.scrollManager = new ScrollManager();

    this.initElement();
  }

  initElement() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList
      ) {
        this.elements[key] = entry;
      } else if (Array.isArray(entry)) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = this.element.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = this.element.querySelectorAll(entry);
        }
      }
    });
  }
}
