import { patchShaders } from "gl-noise";

// Vertex shader
export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition; // Use world position instead of UV
  void main() {
    vUv = uv;
    vPosition = position;
  }
`;

// Fragment shader with noise and dissolve logic
export const fragmentShader = patchShaders(/* glsl */ `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uThickness;
    uniform vec3 uColor;
    uniform float uProgress;
    
    void main() {
      gln_tFBMOpts opts = gln_tFBMOpts(1.0, 0.3, 2.0, 5.0, 1.0, 5, false, false);
      // Using world position for better dissolve effect
      float noise = gln_sfbm(vPosition, opts);
      noise = gln_normalize(noise);
  
      float progress = uProgress;
  
      // The dissolve effect logic: alpha decreases as progress goes from 0 to 1
      float alpha = step(1.0 - progress, noise);
      float border = step((1.0 - progress) - uThickness, noise) - alpha;
  
      csm_DiffuseColor.a = alpha + border;
      csm_DiffuseColor.rgb = mix(csm_DiffuseColor.rgb, uColor, border);
    }
  `);
