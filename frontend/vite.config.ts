import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyPlugin from "@netlify/vite-plugin-react-router";

export default defineConfig({
  build: {
    outDir: "build",
    emptyOutDir: true,
    manifest: true,
    ssr: "src/entry.server.tsx", 
  },
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), netlifyPlugin()],
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
  },
});
