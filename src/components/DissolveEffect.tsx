import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import * as React from "react";
import * as THREE from "three";
import CSM from "three-custom-shader-material";
import { vertexShader, fragmentShader } from "../shaders/dissolve";

// DissolveEffect component
export interface DissolveEffectProps {
  geometry?: THREE.BufferGeometry;
  baseMaterial?: THREE.Material;
  fadeIn: boolean;
  fadeOut: boolean;
  color: string;
  thickness?: number;
  intensity?: number;
  duration?: number;
  onFadeOut?: () => void;
  children?: React.ReactNode;
}

const DissolveEffect: React.FC<DissolveEffectProps> = ({
  geometry,
  baseMaterial = new THREE.MeshStandardMaterial({ color: "#808080" }),
  fadeIn,
  fadeOut,
  color,
  thickness = 0.1,
  intensity = 50,
  duration = 1.2,
  onFadeOut,
  children,
}) => {
  const meshRef = React.useRef<THREE.Mesh>(null); // Reference to the mesh
  const uniforms = React.useRef({
    uThickness: { value: thickness },
    uColor: { value: new THREE.Color(color).multiplyScalar(intensity) },
    uProgress: { value: 0 },
  });

  // Update uniforms when props change
  React.useEffect(() => {
    uniforms.current.uThickness.value = thickness;
    uniforms.current.uColor.value.set(color).multiplyScalar(intensity);
  }, [thickness, color, intensity]);

  // Update dissolve effect based on fadeIn and fadeOut
  useFrame((_state, delta) => {
    if (fadeIn) {
      easing.damp(uniforms.current.uProgress, "value", 1, duration, delta);
    } else if (fadeOut) {
      easing.damp(uniforms.current.uProgress, "value", 0, duration, delta);
    }

    // Disable shadow if fully transparent
    if (uniforms.current.uProgress.value === 0 && meshRef.current) {
      // Disable shadows when fully dissolved
      meshRef.current.castShadow = false;
      meshRef.current.receiveShadow = false;
    } else if (uniforms.current.uProgress.value > 0 && meshRef.current) {
      // Re-enable shadows if not fully dissolved
      meshRef.current.castShadow = false;
      meshRef.current.receiveShadow = false;
    }

    // Trigger onFadeOut when dissolve reaches a certain progress
    if (fadeOut && uniforms.current.uProgress.value < 0.1 && onFadeOut) {
      onFadeOut();
    }
  });

  const materialProps = {
    baseMaterial: baseMaterial,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms.current,
    toneMapped: false,
    transparent: true,
  };

  // If geometry is provided, render as a mesh
  if (geometry) {
    return (
      <mesh
        ref={meshRef} // Reference to the mesh
        geometry={geometry}
        castShadow={false}
        receiveShadow={false}
      >
        <CSM {...materialProps} />
      </mesh>
    );
  }

  // If no geometry, return just the material to be used with children
  return <CSM {...materialProps}>{children}</CSM>;
};
export { DissolveEffect };
