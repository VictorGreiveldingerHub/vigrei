precision mediump float;

attribute vec3 position;
attribute vec2 uv;
attribute mat4 instanceMatrix;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uParallax;


varying vec2 vUv;
varying vec2 vCenterPosition;

void main() {
    
  vec4 instancePosition = instanceMatrix * vec4(position, 1.0);
  vec4 modelViewPosition = viewMatrix * modelMatrix * instancePosition;
  
  vec4 centerWorldPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  vec4 centerScreenPos = projectionMatrix * viewMatrix * modelMatrix * centerWorldPos;
  
  gl_Position = projectionMatrix * modelViewPosition;
  
  vCenterPosition = (centerScreenPos.xy / centerScreenPos.w) * 0.5 + 0.5;

  vUv = uv;
}