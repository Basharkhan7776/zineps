import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { shouldUseSmoothScroll } from "@/lib/runtime"

if (shouldUseSmoothScroll()) {
  void import("lenis").then(async ({ default: Lenis }) => {
    await import("lenis/dist/lenis.css")
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.05,
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.6,
    })
    ;(window as unknown as { lenis: InstanceType<typeof Lenis> }).lenis = lenis
  })
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
)
