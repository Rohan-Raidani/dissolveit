import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { resolve } from "path";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), dts({ insertTypesEntry: true })],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "DissolveEffect",
            fileName: (format) => `index.${format}.js`,
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: [
                "react",
                "react/jsx-runtime",
                "@react-three/fiber",
                "three",
                "gl-noise",
                "maath",
                "three-custom-shader-material",
            ],
            output: {
                globals: {
                    react: "React",
                    "react/jsx-runtime": "jsx",
                    "@react-three/fiber": "ReactThreeFiber",
                    three: "THREE",
                    "gl-noise": "GLNoise",
                    maath: "Maath",
                    "three-custom-shader-material": "CSM",
                },
            },
        },
    },
});
