import { Color } from "three";

export default function generateColor() {
  let colors = ["#8C1DFF", "#F223FF", "#FF2976", "#FF901F", "#FFD318"];
  let palette = colors;

  return (palette = palette.map((color) => new Color(color)));
}
