import { useEffect, useRef, useState, useCallback } from "react"
import { getDeviceProfile } from "@/lib/runtime"

interface WaveLoaderRevealProps {
  onComplete?: () => void
}

export function WaveLoaderReveal({ onComplete }: WaveLoaderRevealProps) {
  const frostOverlayRef = useRef<HTMLDivElement | null>(null)
  const edgePathRef = useRef<SVGPathElement | null>(null)
  const badgeRef = useRef<HTMLDivElement | null>(null)
  const [isFinished, setIsFinished] = useState(() => {
    if (typeof window === "undefined") return false
    const profile = getDeviceProfile()
    return profile.prefersReducedMotion || profile.isLowEnd
  })

  const handleSkip = useCallback(() => {
    setIsFinished(true)
    const preCurtain = document.getElementById("pre-react-curtain")
    if (preCurtain) preCurtain.remove()
    if (onComplete) onComplete()
  }, [onComplete])

  useEffect(() => {
    if (isFinished) {
      const preCurtain = document.getElementById("pre-react-curtain")
      if (preCurtain) preCurtain.remove()
      if (onComplete) onComplete()
      return
    }

    // Clean up the static HTML pre-curtain immediately as React takes over
    const preCurtain = document.getElementById("pre-react-curtain")
    if (preCurtain) {
      preCurtain.remove()
    }

    let animId: number
    const startTime = performance.now()
    const holdDuration = 320 // Brief frosted hold while assets settle
    const revealDuration = 1450 // Luxurious fluid unblur wave sweep
    const totalDuration = holdDuration + revealDuration

    // Smooth quartic ease for fluid, natural glass movement
    const easeInOutQuart = (x: number): number => {
      return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2
    }

    const render = (now: number) => {
      const elapsed = now - startTime
      const W = window.innerWidth
      const H = window.innerHeight

      if (elapsed < holdDuration) {
        // Hold phase: full frosted glass overlay, gently breathing logo badge
        const holdProgress = elapsed / holdDuration
        if (frostOverlayRef.current) {
          frostOverlayRef.current.style.clipPath = "none"
        }
        if (badgeRef.current) {
          const pulse = 1 + Math.sin(holdProgress * Math.PI * 2) * 0.03
          badgeRef.current.style.transform = `scale(${pulse.toFixed(3)})`
        }
        animId = requestAnimationFrame(render)
        return
      }

      const revealElapsed = elapsed - holdDuration
      const rawProgress = Math.min(1, revealElapsed / revealDuration)

      // Height progression: rises from bottom of viewport to well beyond top
      const progressH = easeInOutQuart(rawProgress)
      const maxH = H + 180
      const Hpeak = progressH * maxH

      // Radius progression: expands outward past viewport edges
      const progressR = Math.pow(rawProgress, 1.25)
      const maxR = Math.hypot(W * 0.5, H) + 240
      const minR = W * 0.22
      const R = minR + progressR * (maxR - minR)

      const centerX = W * 0.5
      const bottomY = H
      const rippleAmp = Math.sin(Math.min(Math.PI, rawProgress * Math.PI))
      const time = now * 0.0025

      // Generate wave contour points across screen width
      const points: { x: number; y: number }[] = []
      const step = Math.max(12, Math.floor(W / 120))
      const startX = -20
      const endX = W + 20

      for (let x = startX; x <= endX; x += step) {
        const distFromCenter = Math.abs(x - centerX)
        const u = distFromCenter / R

        let arch = 0
        if (u < 1) {
          arch = Math.pow(Math.cos(u * Math.PI * 0.5), 1.35)
        }

        const wave1 = Math.sin(x * 0.005 + time * 1.6) * 14 * rippleAmp
        const wave2 = Math.cos(x * 0.01 + time * 1.2) * 7 * rippleAmp

        const y = Math.min(H + 40, bottomY - Hpeak * arch + wave1 + wave2)
        points.push({ x, y })
      }

      // Build CSS clip-path polygon covering the area ABOVE the wave
      const polyPoints = points
        .slice()
        .reverse()
        .map((p) => `${p.x.toFixed(1)}px ${p.y.toFixed(1)}px`)
        .join(", ")
      const polygon = `polygon(-20px -20px, ${W + 20}px -20px, ${W + 20}px ${points[points.length - 1].y.toFixed(1)}px, ${polyPoints}, -20px ${points[0].y.toFixed(1)}px)`

      // Build SVG path for the luminous glass refraction edge
      const edgePath =
        `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} ` +
        points
          .slice(1)
          .map((p) => `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
          .join(" ")

      // Fade out frosted overlay towards end of reveal
      const overlayAlpha =
        rawProgress < 0.75
          ? 1
          : Math.max(0, 1 - (rawProgress - 0.75) / 0.25)

      // Edge stroke brightness: fades in at start, settles out at very top
      const strokeAlpha =
        rawProgress < 0.08
          ? rawProgress / 0.08
          : rawProgress > 0.85
          ? Math.max(0, 1 - (rawProgress - 0.85) / 0.15)
          : 1

      // Badge fade out and subtle zoom
      const badgeAlpha = Math.max(0, 1 - rawProgress / 0.22)
      const badgeScale = 1 + rawProgress * 0.12

      if (frostOverlayRef.current) {
        frostOverlayRef.current.style.clipPath = polygon
        frostOverlayRef.current.style.opacity = overlayAlpha.toFixed(3)
      }

      if (edgePathRef.current) {
        edgePathRef.current.setAttribute("d", edgePath)
        edgePathRef.current.style.opacity = strokeAlpha.toFixed(3)
      }

      if (badgeRef.current) {
        badgeRef.current.style.opacity = badgeAlpha.toFixed(3)
        badgeRef.current.style.transform = `scale(${badgeScale.toFixed(3)})`
      }

      if (elapsed < totalDuration) {
        animId = requestAnimationFrame(render)
      } else {
        setIsFinished(true)
        if (onComplete) onComplete()
      }
    }

    animId = requestAnimationFrame(render)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleSkip()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFinished, handleSkip, onComplete])

  if (isFinished) return null

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-[9999] cursor-pointer select-none overflow-hidden pointer-events-auto"
      aria-label="Click or press Escape to skip intro reveal"
    >
      {/* Frosted Glass Curtain: Dynamic clip-path uncover + progressive unblur */}
      <div
        ref={frostOverlayRef}
        className="absolute inset-0 pointer-events-none will-change-[clip-path,opacity,backdrop-filter]"
        style={{
          backdropFilter: "blur(28px) saturate(180%) contrast(104%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%) contrast(104%)",
          background:
            "radial-gradient(ellipse at 50% 38%, rgba(255, 255, 255, 0.72) 0%, rgba(240, 252, 249, 0.52) 60%, rgba(255, 255, 255, 0.75) 100%)",
        }}
      />

      {/* SVG Refractive Glass Sheen on the Wave Crest Contour */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible">
        <defs>
          <linearGradient
            id="glass-refraction-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
            <stop offset="25%" stopColor="rgba(255, 255, 255, 0.95)" />
            <stop offset="50%" stopColor="rgba(112, 202, 185, 0.95)" />
            <stop offset="75%" stopColor="rgba(255, 255, 255, 0.95)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.15)" />
          </linearGradient>
          <filter
            id="glass-edge-glow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="3.5" result="blur1" />
            <feGaussianBlur stdDeviation="7" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          ref={edgePathRef}
          fill="none"
          stroke="url(#glass-refraction-gradient)"
          strokeWidth="3.5"
          filter="url(#glass-edge-glow)"
          className="will-change-[d,opacity]"
        />
      </svg>

      {/* Centered Frosted Glass Pre-load Logo Badge: Pure SVG Emblem in Frosted Primary Color (No Text) */}
      <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
        <div
          ref={badgeRef}
          className="flex items-center justify-center w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] rounded-full bg-white/75 backdrop-blur-2xl border-[1.5px] border-[#70CAB9]/45 shadow-[0_20px_54px_-6px_rgba(15,127,117,0.25),0_2px_10px_rgba(0,0,0,0.03),inset_0_1px_2px_rgba(255,255,255,1)] will-change-[transform,opacity]"
        >
          <svg
            viewBox="-2.152 -2.518 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-11 h-11 sm:w-12 sm:h-12 text-[#0f7f75] drop-shadow-[0_2px_8px_rgba(15,127,117,0.25)] select-none"
            aria-hidden="true"
          >
            <path
              d="M15.5958 16.7477C15.5204 16.8209 15.354 16.7971 15.1167 16.6919C14.3808 16.3695 12.9646 15.2683 11.4775 13.8259C9.97816 12.3703 8.83928 10.9861 8.51683 10.2768C8.41494 10.0539 8.3943 9.89802 8.46717 9.82728C8.7735 9.5299 10.6166 10.839 12.5855 12.7497C14.5537 14.661 15.9021 16.4503 15.5958 16.7477Z"
              fill="currentColor"
            />
            <path
              d="M6.7769 21.009L5.95854 20.2077C6.30871 19.8708 6.695 19.4996 7.06646 19.1446C8.17051 18.0916 9.64474 17.7955 11.6658 17.6596C11.7381 17.654 11.8116 17.6484 11.8844 17.6396C12.1669 17.6052 12.4371 17.5407 12.688 17.448C13.0678 17.3084 13.5715 17.0768 14.0648 16.7062C13.2542 16.1734 12.1824 15.2819 11.0777 14.2101C9.96525 13.1302 9.04305 12.0846 8.49554 11.2958C8.11248 11.776 7.87258 12.2649 7.72941 12.6331C7.63848 12.8672 7.57335 13.1195 7.53659 13.3831C7.52627 13.4632 7.51788 13.5496 7.51015 13.6354C7.40116 15.1648 7.18318 16.9046 5.98111 18.0922C5.64189 18.4272 5.28849 18.774 4.96153 19.0939L4.13672 18.2995C4.46239 17.9808 4.81515 17.6346 5.15307 17.3015C5.98691 16.4777 6.23003 15.2556 6.35192 13.5502C6.36159 13.4407 6.37127 13.3393 6.38481 13.2385C6.43382 12.8847 6.52088 12.5485 6.64277 12.2349C6.8846 11.6145 7.3515 10.713 8.20211 9.93791C8.33948 9.8127 8.53101 9.76011 8.71545 9.79642C8.89989 9.83273 9.05531 9.95419 9.1314 10.1213C9.36872 10.6428 10.3361 11.8956 11.8999 13.4131C13.4599 14.9263 14.7213 15.8503 15.2792 16.0945C15.4501 16.1696 15.5732 16.3199 15.61 16.4989C15.6467 16.678 15.5919 16.8627 15.4629 16.9954C14.6652 17.818 13.7379 18.2694 13.1001 18.5036C12.7641 18.6275 12.4036 18.7139 12.0302 18.759C11.9399 18.7702 11.849 18.7771 11.7593 18.7847C11.7574 18.7847 11.7484 18.7853 11.7464 18.7859C9.98975 18.9042 8.73093 19.1396 7.8816 19.9497C7.51144 20.3028 7.12579 20.6728 6.7769 21.009Z"
              fill="currentColor"
            />
            <path
              d="M12.8463 24.9538C10.0159 24.9538 7.17578 24.0448 4.81419 22.2004L4.30859 21.8054L4.92124 21.2137C5.14308 20.999 5.52679 20.6284 5.9679 20.2033L6.78627 21.0046C6.51477 21.2663 6.26455 21.5074 6.06141 21.704C10.6775 24.9206 17.0362 24.4467 21.1054 20.4957C25.1753 16.5459 25.6642 10.3737 22.3501 5.89239C22.038 6.19665 21.633 6.59231 21.2125 7.00488L20.3857 6.21167C20.9642 5.64384 21.5143 5.10795 21.8329 4.79742L22.4546 4.19141L22.8615 4.68223C26.9739 9.64431 26.5722 16.7857 21.927 21.2933C19.4281 23.7198 16.1436 24.9538 12.8463 24.9538Z"
              fill="currentColor"
            />
            <path
              d="M16.9847 15.2729C16.8589 15.2729 16.7332 15.2335 16.628 15.154C15.475 14.2831 14.2407 13.2157 13.0586 12.0675C11.9648 11.0064 10.9337 9.89264 10.0772 8.84713C9.90505 8.63678 9.90956 8.3369 10.0888 8.13156C10.9201 7.17808 11.9429 6.66534 12.6549 6.4024C12.996 6.27719 13.3559 6.19143 13.7254 6.14635C13.8241 6.13571 13.9131 6.12757 14.004 6.12005C15.7665 6.00173 17.0259 5.76571 17.8746 4.9556C18.0616 4.77717 18.2525 4.59437 18.4402 4.41406L19.2573 5.21666C19.0683 5.39759 18.8768 5.58102 18.6891 5.7607C17.4658 6.92766 15.6736 7.13927 14.0898 7.2457C14.0175 7.25133 13.9401 7.25884 13.8615 7.26698C13.5906 7.30016 13.3204 7.36464 13.0663 7.45792C12.5749 7.63948 11.9029 7.96503 11.3019 8.52409C12.0641 9.42498 12.9477 10.3666 13.8795 11.27C14.8952 12.2566 15.9477 13.18 16.9486 13.9626C17.5115 13.3841 17.8404 12.7412 18.0242 12.271C18.1145 12.0387 18.1803 11.7852 18.2183 11.5191C18.228 11.4452 18.2364 11.3614 18.2422 11.2775C18.3841 9.31417 18.6891 7.88301 19.7732 6.81247C19.9737 6.61401 20.1801 6.41117 20.3826 6.21271L21.2087 7.00592C21.0069 7.20375 20.8018 7.40596 20.6019 7.60317C19.7687 8.42643 19.5249 9.64911 19.4017 11.3557C19.3946 11.4603 19.3837 11.5661 19.3701 11.6681C19.3192 12.0243 19.2321 12.3593 19.1109 12.6704C18.7285 13.6483 18.1236 14.5004 17.3626 15.1364C17.2555 15.2272 17.1201 15.2729 16.9847 15.2729Z"
              fill="currentColor"
            />
            <path
              d="M3.24066 20.7726L2.83502 20.283C-1.27616 15.3222 -0.874393 8.18083 3.76947 3.672C8.41527 -0.837449 15.7715 -1.22748 20.8823 2.76485L21.3866 3.15864L20.9287 3.60313C20.6637 3.86044 19.9801 4.52155 19.2552 5.21647L18.4382 4.41387C18.8819 3.98816 19.3101 3.57559 19.6357 3.26069C15.0202 0.0434056 8.66162 0.517326 4.59106 4.46896C0.522445 8.41998 0.0342596 14.5929 3.34707 19.0729C3.56826 18.8575 3.84428 18.5883 4.14222 18.2966L4.96703 19.091C4.36793 19.6776 3.85911 20.1716 3.69853 20.3275L3.24066 20.7726Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
