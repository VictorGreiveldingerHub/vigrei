precision mediump float;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

uniform float uTotalWidth;
uniform float uTotalHeight;


attribute vec3 position;
attribute vec2 uv;
attribute mat4 instanceMatrix;

varying vec2 vUv;
varying vec2 vCenterPosition;
varying vec2 vGlobalUv;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 instancePosition = instanceMatrix * vec4(position, 1.0);
  
  vec4 modelViewPosition = viewMatrix * modelMatrix * instancePosition;

  
  gl_Position = projectionMatrix * modelViewPosition;
  
  vec4 worldPosition = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  vGlobalUv = (worldPosition.xy + vec2(uTotalWidth/2.0, uTotalHeight/2.0)) / vec2(uTotalWidth, uTotalHeight);
  vUv = uv;
}