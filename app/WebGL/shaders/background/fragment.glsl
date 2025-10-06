precision mediump float;

varying vec3 vColor;
varying vec2 vUv;

float random(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec3 color = vColor;

  float grain = random(vUv) * 0.05;
  color += grain;

  gl_FragColor = vec4(color, 1.0);
}