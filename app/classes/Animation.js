import gsap from "gsap";
import each from "lodash/each";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";

import { createGlitchChar } from "../utils/createGlitchChar";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText);
export default class Animation {
  constructor() {}
  /**
   * Anime les flèches SVG au survol des liens
   * Crée un effet de transition où la flèche principale sort en diagonale
   * et une flèche secondaire entre pour la remplacer
   *
   * @param {NodeList|Array} linkContainers - Les conteneurs de liens avec flèches à animer
   */
  animateArrowOnHover(linkContainers) {
    each(linkContainers, (container) => {
      // Sélection des deux états de la flèche
      const arrowDefault = container.querySelector(".arrow");
      const arrowHover = container.querySelector(".arrow__hover");

      // Timeline pour gérer l'animation au survol
      const hoverTimeline = gsap.timeline({ paused: true });

      // Animation de sortie : la flèche par défaut se déplace et disparaît
      hoverTimeline.to(arrowDefault, {
        x: 10,
        y: -10,
        opacity: 0,
        duration: 0.2,
      });

      // Animation d'entrée : la flèche de survol apparaît à sa place
      hoverTimeline.to(arrowHover, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.2,
      });

      // Déclenche l'animation au survol
      container.addEventListener("mouseenter", () => {
        hoverTimeline.play();
      });

      // Inverse l'animation quand la souris quitte l'élément
      container.addEventListener("mouseleave", () => {
        hoverTimeline.reverse();
      });
    });
  }

  /**
   * Fait apparaitre en fondu et depuis le bas ou le haut un mot
   * @param {Element} textDOMElement - L'élément DOM à faire apparaitre depuis le bas ou le haut.
   * @returns {GSAPTween} - Un mot qui apparait depuis le bas
   */
  animateTextByWords(textDOMElement) {
    if (!textDOMElement) return;

    ScrollTrigger.create({
      trigger: textDOMElement,
      start: "top bottom",
      onEnter: () => {
        SplitText.create(textDOMElement, {
          type: "words",
          autoSplit: true,
          onSplit: (self) => {
            gsap.from(self.words, {
              yPercent: 100,
              autoAlpha: 0,
              ease: [0.77, 0, 0.175, 1],
              stagger: 0.05,
            });
          },
        });
      },
    });
  }

  /**
   * Fait apparaitre en fondu et depuis le bas ou le haut une ligne
   * @param {Element} textDOMElement - L'élément DOM à faire apparaitre depuis le bas ou le haut.
   * @returns {GSAPTween} - Une ligne qui apparait depuis le bas
   */
  animateTextByCharacters(textDOMElement) {
    if (!textDOMElement) return;
    SplitText.create(textDOMElement, {
      type: "chars",
      autoSplit: true,
      onSplit: (self) => {
        gsap.to(self.chars, {
          yPercent: 100,
          autoAlpha: 0,
          ease: [0.77, 0, 0.175, 1],
          stagger: 0.005,
        });
      },
    });
  }

  /**
   * Fait apparaitre en fondu et depuis le bas ou le haut une ligne
   * @param {Element} textDOMElement - L'élément DOM à faire apparaitre depuis le bas ou le haut.
   * @returns {GSAPTween} - Une ligne qui apparait depuis le bas
   */
  animateTextByLines(textDOMElement) {
    if (!textDOMElement) return;

    ScrollTrigger.create({
      trigger: textDOMElement,
      start: "top bottom",
      once: true,

      onEnter: () => {
        SplitText.create(textDOMElement, {
          type: "lines",
          autoSplit: true,
          onSplit: (self) => {
            gsap.from(self.lines, {
              yPercent: 100,
              autoAlpha: 0,
              ease: [0.77, 0, 0.175, 1],
              stagger: 0.05,
            });
          },
        });
      },
    });
  }

  /**
   * @param {Element} element - L'élément DOM à faire apparaitre en mode glitch
   * @returns {GSAPTween} - Un mot qui apparait depuis le bas
   */
  animateGlitchText(element) {
    gsap.set(element, { opacity: 1 });

    ScrollTrigger.create({
      trigger: element,
      start: "top bottom",
      once: true,
      onEnter: () => {
        const text = element.dataset.text;
        const chars = text.split("");
        const fakeChars =
          ".-':_,^=;><+!rc*/z?sLTv)J7(|Fi{C}fI31tlu[neoZ5Yxjya]2ESwqkP6h9d4VpOGbUAKXHm8RD#$Bg0MNWQ%&@".split(
            ""
          );

        const fragment = document.createDocumentFragment(); // Fragment pour éviter les reflows

        element.innerHTML = ""; // Vider le contenu de l'élément

        each(chars, (char, i) => {
          const { charWrapper, fakeChar, real } = createGlitchChar(
            char,
            fakeChars
          );

          fragment.appendChild(charWrapper);

          // Animation timeline
          gsap
            .timeline({ delay: i * 0.03 })
            .set(charWrapper, { visibility: "visible" })
            .to(fakeChar, {
              opacity: 1,
              stagger: 0.1,
              duration: 0.1,
              ease: [0.77, 0, 0.175, 1],
            })
            .to(fakeChar, {
              scaleX: 0,
              stagger: 0.1,
              duration: 0.1,
              transformOrigin: "center left",
              ease: [0.77, 0, 0.175, 1],
            })
            .to(real, {
              opacity: 1,
              stagger: 0.1,
              duration: 0.1,
              ease: [0.77, 0, 0.175, 1],
            });
        });

        // Une fois tous les éléments créés, les ajouter tous d'un coup à l'élément DOM
        element.appendChild(fragment);
      },
    });
  }

  getAllCards(cardsElements) {
    const elements = {};
    const cards = cardsElements;

    each(cards, (card, index) => {
      elements[`card__${index}`] = {}; // Crée un objet pour chaque carte

      const allParts = [
        "card__arrow__bar",
        "card__arrow__head__left",
        "card__arrow__head__right",
      ];

      allParts.forEach((part) => {
        const el = card.querySelector(`.${part}`);
        if (el) {
          elements[`card__${index}`][`${part}`] = el;
        }

        for (let i = 0; i <= 3; i++) {
          const preEl = card.querySelector(`.${part}__${i}`);
          if (preEl) {
            elements[`card__${index}`][`${part}__${i}`] = preEl;
          }
        }
      });
    });

    return elements;
  }

  // Fonction pour configurer les animations de chaque carte
  setupCardAnimations(cardsElements) {
    const allSVG = this.getAllCards(cardsElements); // Récupérer tous les SVG
    const ease = [0.77, 0, 0.175, 1];
    const isMobile = window.innerWidth <= 621; // Détection mobile (ajustez la valeur selon vos besoins)

    // Appliquer les animations à chaque carte au survol
    const allCards = cardsElements;

    each(allCards, (card, index) => {
      const svgElements = allSVG[`card__${index}`]; // Récupère les éléments SVG de la carte actuelle

      // Crée une timeline GSAP
      const tl = gsap.timeline({ paused: true });
      const delayIncrement = 0.1;

      for (let i = 0; i <= 3; i++) {
        // Ajout des animations GSAP pour chaque élément SVG
        tl.fromTo(
          svgElements[`card__arrow__bar__${i}`],
          { drawSVG: "0%" },
          {
            drawSVG: "100%",
            duration: 0.3,
            ease,
          },
          `start+=${i * delayIncrement}` // Ajouter un décalage rapide entre les animations
        )
          .fromTo(
            svgElements[`card__arrow__head__left__${i}`],
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              duration: 0.3,
              ease,
            },
            `start+=${i * delayIncrement + 0.2}` // Le même décalage
          )
          .fromTo(
            svgElements[`card__arrow__head__right__${i}`],
            { drawSVG: "0%" },
            {
              drawSVG: "100%",
              duration: 0.3,
              ease,
              transformOrigin: "top bottom",
            },
            `start+=${i * delayIncrement + 0.2}` // Décalage similaire ici
          );
      }

      const linkCard = card.querySelector(".card__footer");

      // Sur mobile : activer l'animation par défaut
      if (isMobile) {
        tl.play(); // Joue l'animation immédiatement sur mobile
      } else {
        // Sur desktop : appliquer l'animation au survol seulement
        linkCard.addEventListener("mouseenter", () => {
          tl.play(); // Joue l'animation lors du survol
        });

        linkCard.addEventListener("mouseleave", () => {
          tl.reverse(); // Inverse l'animation lorsque la souris quitte la carte
        });
      }
    });
  }

  handleHoverAnimation(e, element, state = "hover") {
    if (window.innerWidth <= 621) return;

    const overlay = element.querySelector(".hovered__competence");
    const staticTitle = element.querySelector(".competence__static__title");
    const directionY = this.getMouthDirection(e, element);

    const hoverTimeline = gsap.timeline();

    if (state === "hover") {
      hoverTimeline
        .set(overlay, { y: directionY < 0 ? "-100%" : "100%" })
        .to(staticTitle, {
          y: directionY < 0 ? "100%" : "-100%",
          opacity: 0,
          duration: 0.05,
        })
        .to(overlay, { y: "0%", duration: 0.1 });
    } else if (state === "static") {
      hoverTimeline
        .set(staticTitle, {
          y: directionY < 0 ? "100%" : "-100%",
        })
        .to(overlay, { y: directionY < 0 ? "-100%" : "100%", duration: 0.5 })
        .to(staticTitle, { opacity: 1, y: "0%", duration: 0.1 }, "<+0.2");
    }
  }

  getMouthDirection(e, element) {
    const bounds = element.getBoundingClientRect();

    const fromTop = e.clientY - bounds.top < bounds.height / 2;
    return fromTop ? -1 : 1;
  }
}
