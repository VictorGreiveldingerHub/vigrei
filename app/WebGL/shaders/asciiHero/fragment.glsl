precision mediump float;

uniform sampler2D uBackgroundTexture;
uniform sampler2D uASCIITexture;
uniform float uASCIILength;

uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;

varying vec2 vUv;
varying vec2 vGlobalUv; // Au lieu de vUv

void main() {
    vec3 backgroundPixel = texture2D(uBackgroundTexture, vGlobalUv).rgb;
    
    // Calculer la luminosité
    float brightness = dot(backgroundPixel.rgb, vec3(0.299, 0.587, 0.114));
    
    // brightness = floor(brightness * 7.5) / 5.0;
    vec2 asciiUV = vec2((vUv.x / uASCIILength) + floor((brightness * 0.99) * uASCIILength ) / uASCIILength , vUv.y);
    
    // Récupérer le caractère
    vec3 asciiCode = texture2D(uASCIITexture, asciiUV).rgb;
    
    // Choisir la couleur selon la luminosité
    vec3 finalColor;
   if (brightness < 0.25) finalColor = uColor0;
    else if (brightness < 0.45) finalColor = uColor1;
    else if (brightness < 0.65) finalColor = uColor2;
    else if (brightness < 0.85) finalColor = uColor3;
    else finalColor = uColor4;
    
    // Appliquer la couleur au caractère
    gl_FragColor = vec4(asciiCode * finalColor , 1.0);
}