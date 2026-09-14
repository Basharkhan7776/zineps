import { useEffect, useRef, useState } from "react"

interface WaveLoaderRevealProps {
  onComplete?: () => void
}

export function WaveLoaderReveal({ onComplete }: WaveLoaderRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isFinished, setIsFinished] = useState(false)

  const handleSkip = () => {
    setIsFinished(true)
    if (onComplete) onComplete()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const startTime = performance.now()
    const holdDuration = 220 // initial solid dark black hold in ms
    const waveDuration = 1400 // ms for wave to travel from bottom to top
    const totalDuration = holdDuration + waveDuration

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Smooth cubic easing for continuous, fluid wave rise
    const easeInOutCubic = (x: number): number => {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
    }

    const render = (now: number) => {
      const elapsed = now - startTime

      const W = canvas.width
      const H = canvas.height
      const time = now * 0.003

      ctx.clearRect(0, 0, W, H)

      if (elapsed < holdDuration) {
        // Pure solid dark black - no reveal at bottom
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, W, H)
        animId = requestAnimationFrame(render)
        return
      }

      const waveElapsed = elapsed - holdDuration
      const rawProgress = Math.min(1, waveElapsed / waveDuration)
      const progress = easeInOutCubic(rawProgress)

      // Base elevation of the wave:
      // At progress = 0: strictly below bottom of viewport (H + 80)
      // At progress = 1: well above top of viewport (-220)
      const baseHeight = (H + 80) - progress * (H + 300)

      // Dome arch expanding from bottom center, starting at 0 and peaking mid-reveal
      const domeRadius = (W * 0.5) * (0.35 + progress * 1.35)
      const domeHeight = (90 + H * 0.18) * Math.sin(progress * Math.PI)
      const rippleAmp = Math.min(1, progress * 4)

      // Generate the wave contour points from left to right
      const points: { x: number; y: number }[] = []
      const step = Math.max(3, Math.floor(W / 140))

      for (let x = 0; x <= W; x += step) {
        const distFromCenter = Math.abs(x - W / 2)
        const normDist = distFromCenter / Math.max(1, domeRadius)

        let arch = 0
        if (normDist < 1) {
          // Cosine bell curve peak at center
          arch = Math.cos(normDist * Math.PI * 0.5) * domeHeight
        }

        // Fluid wave ripples that organically grow as wave sweeps up
        const wave1 = Math.sin(x * 0.007 + time * 2.2) * 18 * rippleAmp
        const wave2 = Math.cos(x * 0.015 - time * 1.8) * 10 * rippleAmp
        const wave3 = Math.sin(x * 0.03 + time * 3.0) * 5 * rippleAmp

        const y = baseHeight - arch + wave1 + wave2 + wave3
        points.push({ x, y })
      }

      // Draw Pure Dark Black Wave Curtain above the wave contour
      // Absolutely no cyan borders, no stroke, no glow - just clean pure black wave
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(W, 0)
      ctx.lineTo(W, points[points.length - 1].y)

      for (let i = points.length - 1; i >= 0; i--) {
        ctx.lineTo(points[i].x, points[i].y)
      }

      ctx.lineTo(0, points[0].y)
      ctx.lineTo(0, 0)
      ctx.closePath()
      ctx.fillStyle = "#000000"
      ctx.fill()
      ctx.restore()

      if (elapsed < totalDuration) {
        animId = requestAnimationFrame(render)
      } else {
        // Animation finished cleanly
        setIsFinished(true)
        if (onComplete) onComplete()
      }
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
    }
  }, [onComplete])

  if (isFinished) return null

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] cursor-pointer select-none overflow-hidden pointer-events-auto"
      aria-label="Click to skip intro reveal"
    >
      {/* 60fps Canvas for Pure Black Wave Reveal */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
