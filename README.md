# React Three Fiber Dissolve Effect

A customizable dissolve effect component for React Three Fiber applications, featuring noise-based transitions with glowing edges.

## Installation

```bash
npm install dissolveit
```

## Features

- Smooth dissolve transitions with customizable parameters
- Support for both fade-in and fade-out animations
- Compatible with any Three.js geometry
- Customizable colors and animation duration

## Requirements

This package requires the following peer dependencies:

```json
{
  "@react-three/fiber": ">=8.0.0",
  "@react-three/drei": ">=9.0.0",
  "three": ">=0.150.0",
  "react": ">=18.0.0",
  "gl-noise": ">=1.6.0",
  "maath": ">=0.5.0"
}
```

## Basic Usage

```jsx
import { useState } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { DissolveEffect } from "dissolveit";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Environment } from "@react-three/drei";

function App() {
  const [isFading, setIsFading] = useState(true);

  return (
    <div className="app">
      <Canvas camera={{ position: [3, 3, 5], fov: 42 }}>
        <color attach="background" args={["#ececec"]} />
        <OrbitControls />
        <ambientLight />
        {/* <spotLight position={[10, 10, 10]} /> */}
        <Environment preset="sunset" />
        <EffectComposer>
          <Bloom luminanceThreshold={2} intensity={1.25} mipmapBlur />
        </EffectComposer>

        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <DissolveEffect
            fadeIn={isFading}
            fadeOut={!isFading}
            color="#FFD700"
            thickness={0.1}
            intensity={10}
          />
        </mesh>
      </Canvas>
      <button
        style={{ position: "absolute", bottom: 20, left: 20 }}
        onClick={() => {
          setIsFading(!isFading);
          console.log("Is Fading:", !isFading);
        }}
      >
        Toggle Fade
      </button>
    </div>
  );
}

export default App;
```

## Props

| Prop           | Type                   | Default                | Description                                         |
| -------------- | ---------------------- | ---------------------- | --------------------------------------------------- |
| `geometry`     | `THREE.BufferGeometry` | `undefined`            | Optional geometry to use with the effect            |
| `baseMaterial` | `THREE.Material`       | `MeshStandardMaterial` | Base material to apply the effect to                |
| `fadeIn`       | `boolean`              | `false`                | Controls fade-in animation                          |
| `fadeOut`      | `boolean`              | `false`                | Controls fade-out animation                         |
| `color`        | `string`               | Required               | Color of the dissolve edge effect (e.g., "#FFD700") |
| `thickness`    | `number`               | `0.1`                  | Thickness of the dissolve edge                      |
| `intensity`    | `number`               | `50`                   | Intensity of the edge glow                          |
| `duration`     | `number`               | `1.2`                  | Duration of the fade animation in seconds           |
| `onFadeOut`    | `() => void`           | `undefined`            | Callback function triggered when fade-out completes |

## Advanced Usage

### With Post-Processing

```jsx
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { DissolveEffect } from "r3f-dissolve-effect";

function App() {
  return (
    <Canvas>
      <EffectComposer>
        <Bloom luminanceThreshold={2} intensity={1.25} mipmapBlur />
      </EffectComposer>
      <mesh>
        <boxGeometry />
        <DissolveEffect fadeIn={true} color="#FFD700" />
      </mesh>
    </Canvas>
  );
}
```

## Demonstration site

[Demo](https://dissolve-demo.vercel.app/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

![License](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.

## Credits

Built with [React Three Fiber](https://github.com/pmndrs/react-three-fiber) and [Three.js](https://threejs.org/).

## Support

For issues and feature requests, please use the [GitHub issue tracker](https://github.com/Rohan-Raidani/dissolveit/issues).
