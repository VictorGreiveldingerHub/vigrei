// Import components
import Competence from "./components/Competence";
import Contact from "./components/Contact";
import Description from "./components/Description";
import Experience from "./components/Experience";
import Formation from "./components/Formation";
import Hero from "./components/Hero";

// Import partials
import Cards from "./partials/Cards";
import Cursor from "./partials/Cursor";
import Navigation from "./partials/Navigation";
import Progress from "./partials/Progress";
import Header from "./partials/Header";

// Import WebGL
import WebGL from "./WebGL";
import Canvas from "./WebGL/Canvas";

export default class App {
  constructor() {
    // Local
    this.sections = {};
    this.partials = {};
    this.canvas = {};
    this.webGL = {};

    // Méthodes
    this.initSections();
    this.initPartials();
    this.initCanvas();
    this.initWEGL();
  }

  initSections() {
    this.sections = {
      hero: new Hero(),
      description: new Description(),
      formation: new Formation(),
      competence: new Competence(),
      experience: new Experience(),
      contact: new Contact(),
    };
  }

  initPartials() {
    this.partials = {
      header: new Header(),
      cursor: new Cursor(),
      navigation: new Navigation(),
      progress: new Progress(),
      cards: new Cards(),
    };
  }

  initCanvas() {
    this.canvas = {
      cBackground: new Canvas("#cBackground"),
      cAsciiHero: new Canvas("#cAsciiHero"),
      cAsciiImage: new Canvas("#cAsciiImage"),
    };
  }

  initWEGL() {
    this.webGL = {
      noisy_background: new WebGL(this.canvas.cBackground, "webglBackground"),
      image_distorsion: new WebGL(this.canvas.cAsciiImage, "webglAsciiImage"),
      hero_rectangle: new WebGL(this.canvas.cAsciiHero, "webglAsciiHero"),
    };
  }

  animateElements() {
    this.partials.header.animateIn();
    this.sections.hero.animateIn();
    this.partials.navigation.animateIn();
  }
}
