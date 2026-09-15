import { useEffect, useRef, useState } from "react"

interface WaveLoaderRevealProps {
  onComplete?: () => void
}

export function WaveLoaderReveal({ onComplete }: WaveLoaderRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isFinished, setIsFinished] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const handleSkip = () => {
    setIsFinished(true)
    // Clean up pre-curtain if still present
    const preCurtain = document.getElementById("pre-react-curtain")
    if (preCurtain) preCurtain.remove()
    document.body.style.backgroundColor = ""
    if (onComplete) onComplete()
  }

  useEffect(() => {
    // Remove the static HTML pre-curtain once React has mounted and taken control
    const preCurtain = document.getElementById("pre-react-curtain")
    if (preCurtain) {
      preCurtain.remove()
    }

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const startTime = performance.now()
    const holdDuration = 400 // "wait and load all things" solid pure black hold in ms
    const revealDuration = 1650 // buttery-smooth opening expansion
    const totalDuration = holdDuration + revealDuration

    // 80px extra padding so CSS blur(20px) never bleeds white around viewport borders
    const PAD = 80

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth + PAD * 2
      canvas.height = window.innerHeight + PAD * 2
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Smooth quartic ease for ultra-fluid cinematic emergence and expansion
    const easeInOutQuart = (x: number): number => {
      return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
    }

    const render = (now: number) => {
      const elapsed = now - startTime

      const W = canvas.width
      const H = canvas.height
      const time = now * 0.0025

      ctx.clearRect(0, 0, W, H)

      if (elapsed < holdDuration) {
        // Panel 1: Pure solid dark black
        ctx.fillStyle = "#000000"
        ctx.fillRect(0, 0, W, H)
        animId = requestAnimationFrame(render)
        return
      }

      setIsOpening(true)

      const revealElapsed = elapsed - holdDuration
      const rawProgress = Math.min(1, revealElapsed / revealDuration)

      const W_vp = window.innerWidth
      const H_vp = window.innerHeight

      // Height progression: rises from bottom of viewport to well beyond top
      const progressH = easeInOutQuart(rawProgress)
      const maxH = H_vp + PAD * 2 + 140
      const Hpeak = progressH * maxH

      // Radius progression: starts narrow and expands wide past screen borders
      const progressR = Math.pow(rawProgress, 1.3)
      const maxR = Math.hypot(W_vp * 0.5, H_vp) + PAD * 2 + 180
      const minR = W_vp * 0.16
      const R = minR + progressR * (maxR - minR)

      const centerX = PAD + W_vp * 0.5
      const bottomY = PAD + H_vp

      // Gentle ripple amplitude peaks in the middle and softly settles
      const rippleAmp = Math.sin(Math.min(Math.PI, rawProgress * Math.PI))

      // Generate contour points across the width
      const points: { x: number; y: number }[] = []
      const step = Math.max(3, Math.floor(W / 180))

      for (let x = 0; x <= W; x += step) {
        const distFromCenter = Math.abs(x - centerX)
        const u = distFromCenter / R

        let arch = 0
        if (u < 1) {
          // Organic curved dome profile
          arch = Math.pow(Math.cos(u * Math.PI * 0.5), 1.35)
        }

        // Gentle, rolling organic fluid waves along the cutout edge
        const wave1 = Math.sin(x * 0.005 + time * 1.6) * 16 * rippleAmp
        const wave2 = Math.cos(x * 0.01 + time * 1.1) * 8 * rippleAmp

        // Y position of the black curtain boundary at X
        const y = Math.min(bottomY + PAD, bottomY - Hpeak * arch + wave1 + wave2)
        points.push({ x, y })
      }

      // Smooth outro fade at the very end of reveal
      const alpha = rawProgress > 0.88 ? Math.max(0, 1 - (rawProgress - 0.88) / 0.12) : 1

      // Draw the Black Curtain:
      // Fills everything OUTSIDE the dome with pure black (#000000).
      // The inside of the expanding dome is transparent, softly blurred on the edges!
      ctx.save()
      ctx.globalAlpha = alpha
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
        // Reveal animation finished - restore body bg and unmount
        document.body.style.backgroundColor = ""
        setIsFinished(true)
        if (onComplete) onComplete()
      }
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
      document.body.style.backgroundColor = ""
    }
  }, [onComplete])

  if (isFinished) return null

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] cursor-pointer select-none overflow-hidden pointer-events-auto"
      aria-label="Click to skip intro reveal"
    >
      {/* 100% Solid Black Curtain Overlay active while pre-loading */}
      {!isOpening && (
        <div className="absolute inset-0 bg-black pointer-events-none z-20" />
      )}

      {/* Blurred Canvas Dome Container: -inset-20 prevents border light leaks */}
      <div className="absolute -inset-20 overflow-hidden pointer-events-none z-10">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{
            filter: "blur(20px)",
            WebkitFilter: "blur(20px)",
          }}
        />
      </div>
    </div>
  )
}
