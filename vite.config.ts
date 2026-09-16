import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/three")) return "three"
          if (id.includes("node_modules/ogl")) return "ogl"
          if (id.includes("node_modules/framer-motion")) return "framer-motion"
          if (id.includes("node_modules/lenis")) return "lenis"
        },
      },
    },
  },
})
