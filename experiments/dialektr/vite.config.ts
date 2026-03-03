import { defineConfig } from "vite";

export default defineConfig({
  // GitHub Pages serves from /pixpage/experiments/dialektr/
  base: "/pixpage/experiments/dialektr/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
