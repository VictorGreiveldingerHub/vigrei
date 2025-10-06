precision mediump float;

uniform sampler2D uTexture;
uniform sampler2D uASCIITexture;
uniform float uASCIILength;
uniform vec2 uScale;

uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

uniform vec2 uImageOffset;
varying vec2 vUv;
varying vec2 vCenterPosition;

void main() {
  vec2 scaledUV = (vCenterPosition - 0.5) * uScale + 0.5;

  // Appliquer le décalage à l'image uniquement
  scaledUV += uImageOffset * 0.1;

  // Couleur de l'image originale
  vec3 originalColor = texture2D(uTexture, scaledUV).rgb;
  
  // Calcul de la luminosité
  float brightness = dot(originalColor, vec3(0.299, 0.587, 0.114));
  brightness = pow(brightness, 1.1);

  // Obtenir la couleur selon la luminosité
  vec3 finalColor;
  if (brightness < 0.15) finalColor = uColor0;
  else if (brightness < 0.35) finalColor = uColor1;
  else if (brightness < 0.55) finalColor = uColor2;
  else if (brightness < 0.75) finalColor = uColor3;
  else finalColor = uColor4;

  // Effet ASCII
  vec2 asciiUV = vec2((vUv.x / uASCIILength) + floor(brightness * uASCIILength) / uASCIILength, vUv.y);
  vec3 asciiCode = texture2D(uASCIITexture, asciiUV).rgb;
  vec3 asciiResult = asciiCode * finalColor;

  
  gl_FragColor = vec4(asciiResult, 1.0);
}