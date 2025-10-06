import each from "lodash/each";
import BaseElement from "../../classes/BaseElement";

export default class Contact extends BaseElement {
  constructor() {
    super({
      element: ".contact",
      elements: {
        wrapper: ".contact__wrapper",
        items: ".coordinates__item",
        socials: ".social__link",
        glitched: ".glitched",
        downloadButton: ".download",
      },
      id: "contact",
    });

    this.downloadButton = this.elements.downloadButton[0];

    this.setupCVDownload();

    this.animation.animateLinkArrowSVG(this.elements.socials);

    this.setupDownloadButtonAnimations();

    each(this.elements.glitched, (element) => {
      this.animation.animateGlitchText(element);
    });
  }

  setupCVDownload() {
    if (!this.downloadButton) return;

    this.downloadButton.addEventListener("click", () => {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      const link = document.createElement("a");
      link.href = "CV_Victor_2025.pdf";
      link.download = `CV_Victor_${formattedDate}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  getAllSVG() {
    const elements = {};
    const allParts = ["arrow__bar", "arrow__head", "socle"];

    allParts.forEach((part) => {
      const el = this.downloadButton.querySelector(`.${part}`);
      if (el) elements[`${part}`] = el;

      for (let i = 0; i <= 3; i++) {
        const preEl = this.downloadButton.querySelector(`.${part}__${i}`);
        if (preEl) elements[`${part}__${i}`] = preEl;
      }
    });

    return elements;
  }

  createItems() {
    const allSVG = this.getAllSVG();

    const items = [
      {
        bar: allSVG["arrow__bar__0"],
        head: allSVG["arrow__head__0"],
        socle: allSVG["socle__0"],
        barDelay: 0,
        headDelay: 0.2,
        socleDelay: 0.2,
      },
      {
        bar: allSVG["arrow__bar__1"],
        head: allSVG["arrow__head__1"],
        socle: allSVG["socle__1"],
        barDelay: 0.1,
        headDelay: 0.3,
        socleDelay: 0.3,
      },
      {
        bar: allSVG["arrow__bar__2"],
        head: allSVG["arrow__head__2"],
        socle: allSVG["socle__2"],
        barDelay: 0.2,
        headDelay: 0.4,
        socleDelay: 0.4,
      },
      {
        bar: allSVG["arrow__bar__3"],
        head: allSVG["arrow__head__3"],
        socle: allSVG["socle__3"],
        barDelay: 0.3,
        headDelay: 0.5,
        socleDelay: 0.5,
      },
    ];

    return items;
  }

  setupDownloadButtonAnimations() {
    const items = this.createItems();
    const tl = this.animation.gsapTimeline({ paused: true });
    const ease = [0.77, 0, 0.175, 1];
    const isMobile = window.innerWidth <= 621; // Détection mobile (ajustez la valeur selon vos besoins)

    items.forEach((item, index) => {
      const label = `start${index}`;
      const groupOffset = index * 0.05; // ⬅️ Avance chaque groupe de 0.05s

      tl.add(label, groupOffset); // ⬅️ place le groupe légèrement après le précédent

      tl.fromTo(
        item.bar,
        { drawSVG: "0%" },
        {
          drawSVG: "100%",
          duration: 0.3,
          ease,
        },
        `${label}+=${item.barDelay}`
      )
        .fromTo(
          item.head,
          { drawSVG: "50% 50%" },
          {
            drawSVG: "0% 100%",
            duration: 0.3,
            ease,
          },
          `${label}+=${item.headDelay}`
        )
        .fromTo(
          item.socle,
          { drawSVG: "50% 50%" },
          {
            drawSVG: "0% 100%",
            duration: 0.3,
            ease,
          },
          `${label}+=${item.socleDelay}`
        );
    });

    // Sur mobile : activer l'animation par défaut
    if (isMobile) {
      tl.play(); // Joue l'animation immédiatement sur mobile
    } else {
      // Sur desktop : appliquer l'animation au survol seulement
      this.downloadButton.addEventListener("mouseenter", () => {
        tl.play();
      });

      this.downloadButton.addEventListener("mouseleave", () => {
        tl.reverse();
      });
    }
  }
}
