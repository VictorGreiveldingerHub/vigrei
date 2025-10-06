import EventEmitter from "./EventEmitter";
import { TextureLoader } from "three";

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.textureLoader = new TextureLoader();
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "texture") {
        this.loaders.textureLoader.load(
          source.path,
          (file) => {
            this.sourceLoaded(source, file);
          },
          (progress) => {
            console.log("Loading progress:", progress);
          },
          (error) => {
            console.error("Error loading texture:", source.name, error);
          }
        );
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;

    this.loaded++;

    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
