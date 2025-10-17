import gsap from "gsap";
import BaseElement from "../../classes/BaseElement";

export default class Preloader extends BaseElement {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        wrapper: ".preloader__wrapper",
        glitched: ".glitched",
        line: ".progress__line",
        shadowLine: ".progress__shadow__line",
      },
      id: "preloader",
    });

    this.init();
  }

  async init() {
    try {
      // Chargement du module d'animation
      await this.animateProgressTo(5, "Fake progress", 0.5);
      await this.getAnimation();

      // Chargement de main.js
      await this.animateProgressTo(30, "Fake progress", 0.5);
      await this.getMain();

      await this.animateProgressTo(99, "Fake progress", 0.5);
      this.removePreloaderShadowLine();
      await this.removePreloaderLine();

      await this.animateProgressTo(100, "", 0.5);
      await this.closePreloader();
    } catch (error) {
      await this.animateProgressTo(100, "Terminé avec erreurs", 0.5);
      await this.closePreloader();
    }
  }

  async animateProgressTo(progress, message = "", duration = 1.5) {
    return new Promise((resolve) => {
      if (!this.elements.line || !this.elements.line[0]) return resolve();

      const line = this.elements.line[0];
      const clampedProgress = Math.max(0, Math.min(100, progress));

      gsap.to(line, {
        scaleX: clampedProgress / 100,
        duration,
        ease: [0.77, 0, 0.175, 1],
        onComplete: resolve,
      });
    });
  }

  async getAnimation() {
    try {
      await this.animateProgressTo(10, "Chargement module...");
      const module = await import("../../classes/Animation.js");

      await this.animateProgressTo(20, "Initialisation de l'animation...");
      const Animation = module.default;
      this.animation = new Animation();

      await this.startGlitchTextAnimation();

      // Finalisation de l'étape animation
      await this.animateProgressTo(25, "Moteur d'animation prêt ✓");
    } catch (error) {
      console.error("❌ Erreur chargement Animation:", error);
      await this.animateProgressTo(25, "Animation en mode dégradé");

      return null;
    }
  }

  async getMain() {
    try {
      // Chargement de main
      await this.animateProgressTo(35, "Récupération de l'application", 0.5);
      const app = await import("../../index.js");

      // 🎯 Instanciation de App
      await this.animateProgressTo(50, "Initialisation de l'application", 0.5);
      const AppClass = app.default;
      this.app = new AppClass();

      await this.animateProgressTo(60, "", 0.5);
      await this.removeGlitchTextAnimation();

      await this.animateProgressTo(80, "", 0.5);
    } catch (error) {
      console.error("❌ Erreur chargement App:", error);
      await this.animateProgressTo(80, "Erreur application", 0.5);
      await this.closePreloader();
    }
  }

  async startGlitchTextAnimation() {
    return new Promise((resolve) => {
      if (this.elements.glitched) {
        this.elements.glitched.forEach((element) => {
          if (element) {
            element.style.fontFamily = "Safiro, Arial, sans-serif";
            element.style.fontWeight = "900";

            // Animation glitch si disponible
            if (this.animation && this.animation.animateGlitchText) {
              this.animation.animateGlitchText(element);
              resolve();
            }
          }
        });
      } else {
        resolve();
      }
    });
  }

  async removeGlitchTextAnimation() {
    return new Promise((resolve) => {
      if (!this.elements.glitched[0]) resolve();

      this.animation.animateTextByCharacters(this.elements.glitched);
      resolve();
    });
  }

  removePreloaderShadowLine() {
    if (this.elements.shadowLine[0]) {
      this.elements.shadowLine[0].style.display = "none";
      this.elements.shadowLine[0].remove();
    }
  }

  async removePreloaderLine() {
    return new Promise((resolve) => {
      if (!this.elements.line[0]) resolve();

      gsap.to(this.elements.line[0], {
        duration: 1,
        transform: `translate(-50%, -50%) scaleX(0)`,
        transformOrigin: "right",
        ease: [0.77, 0, 0.175, 1],
        onComplete: () => {
          this.elements.line[0].remove();
          resolve();
        },
      });
    });
  }

  async closePreloader() {
    return new Promise((resolve) => {
      if (!this.animation || !this.element) {
        console.warn("⚠️ Animation ou element non disponible pour fermeture");
        // Fallback CSS
        this.fallbackClose();
        return resolve();
      }

      const isMobile = window.innerWidth <= 621;
      const targetStyles = isMobile
        ? {
            position: "absolute",
            top: "50%",
            left: "0",
            width: "50%",
            height: "100svh",
            transform: `translate(0%, -50%)`,
          }
        : {
            width: "80%",
            height: "60vh",
          };

      gsap.to(this.element, {
        ...targetStyles,
        duration: 1,
        ease: [0.77, 0, 0.175, 1],
        onComplete: () => {
          gsap.to(this.element, {
            opacity: 0,
            ease: [0.77, 0, 0.175, 1],
            onComplete: () => {
              this.element.style.display = "none";
              this.app.animateElements();
              if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;

              this.scrollManager.enable();
              resolve();
            },
          });
        },
      });
    });
  }

  fallbackClose() {
    if (this.element) {
      this.element.style.transition = "opacity 1s ease";
      this.element.style.opacity = "0";
    }
  }
}
