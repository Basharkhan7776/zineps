import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import Lenis from "lenis"
import "lenis/dist/lenis.css"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

// Initialize Lenis with lazy scroll configuration like in openlabs
const lenis = new Lenis({
  autoRaf: true,
  lerp: 0.05, // Lower lerp makes the smooth scroll feel heavier/lazier
  duration: 1.5, // Longer duration extends the scroll ease
  smoothWheel: true,
  wheelMultiplier: 0.6, // Moves less physical distance per scroll wheel tick
})

// Attach to window for global programmatic access
if (typeof window !== "undefined") {
  ;(window as unknown as { lenis: Lenis }).lenis = lenis
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
