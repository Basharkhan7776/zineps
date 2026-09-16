"use client"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { debounce, getDeviceProfile, observeVisibility } from "@/lib/runtime"

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  scrollBoost = 1.8,
  className,
}: {
  items: {
    name: string
    src: string
    height?: number
  }[]
  direction?: "left" | "right"
  speed?: "fast" | "normal" | "slow"
  pauseOnHover?: boolean
  scrollBoost?: number
  className?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)
  const isHoveredRef = useRef(false)

  useEffect(() => {
    const scroller = scrollerRef.current
    const singleSet = singleSetRef.current
    const container = containerRef.current
    if (!scroller || !singleSet) return

    let singleWidth = singleSet.offsetWidth || 1000

    const updateWidth = () => {
      if (singleSet && singleSet.offsetWidth > 0) {
        singleWidth = singleSet.offsetWidth
      }
    }

    updateWidth()
    const onResize = debounce(updateWidth, 150)
    window.addEventListener("resize", onResize)

    let animId: number
    let lastTime = performance.now()
    let currentX = 0
    let velocity = 0
    let lastScrollY = window.scrollY

    // Base cruising speed in pixels per second
    const baseSpeed = speed === "fast" ? 75 : speed === "slow" ? 30 : 50
    const dir = direction === "right" ? -1 : 1

    // Local wheel listener on container for instant mouse wheel acceleration
    const handleWheel = (e: WheelEvent) => {
      // Pushes velocity forward on scroll Y
      velocity += e.deltaY * scrollBoost * 1.4
    }

    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: true })
    }

    let isVisible = true
    let isPageVisible = !document.hidden
    const freezeMotion = getDeviceProfile().prefersReducedMotion
    let running = false

    const render = (now: number) => {
      if (!running) return
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      // Check window scroll displacement (smoothly updated by Lenis or native scroll)
      const currentScrollY = window.scrollY
      const deltaScrollY = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      if (Math.abs(deltaScrollY) > 0) {
        velocity += deltaScrollY * scrollBoost * 14
      }

      // Exponential decay of scroll velocity (inertia / momentum)
      velocity *= Math.pow(0.12, dt)

      // Clamp max velocity so it stays smooth and never disorienting
      const clampedVelocity = Math.max(-900, Math.min(900, velocity))

      // Hover factor: gently slow down to 40% when hovering over logos,
      // but still let Y scroll push the loop
      const hoverFactor = isHoveredRef.current && pauseOnHover ? 0.4 : 1.0

      // Effective forward speed: cruising speed + scroll acceleration push
      const effectiveSpeed = (baseSpeed * hoverFactor + clampedVelocity) * dir

      currentX -= effectiveSpeed * dt

      if (singleWidth > 0) {
        // Exact modulo wrap for 100% seamless, continuous loop
        while (currentX <= -singleWidth) {
          currentX += singleWidth
        }
        while (currentX > 0) {
          currentX -= singleWidth
        }
      }

      scroller.style.transform = `translate3d(${currentX}px, 0, 0)`

      if (freezeMotion || !isVisible || !isPageVisible) {
        running = false
        return
      }
      animId = requestAnimationFrame(render)
    }

    const tryStart = () => {
      if (freezeMotion) return
      if (isVisible && isPageVisible && !running) {
        running = true
        lastTime = performance.now()
        animId = requestAnimationFrame(render)
      }
    }

    const unobserve = container
      ? observeVisibility(container, (visible) => {
          isVisible = visible
          if (visible) tryStart()
          else running = false
        })
      : () => {}

    const onPageVisibility = () => {
      isPageVisible = !document.hidden
      if (isPageVisible) tryStart()
      else running = false
    }
    document.addEventListener("visibilitychange", onPageVisibility)

    tryStart()

    return () => {
      running = false
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onPageVisibility)
      unobserve()
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [direction, speed, pauseOnHover, scrollBoost])

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHoveredRef.current = true
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false
      }}
      className={cn(
        "scroller relative z-20 w-full max-w-[1523px] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)] select-none",
        className
      )}
    >
      <div
        ref={scrollerRef}
        className="flex w-max flex-nowrap items-center will-change-transform py-4"
        style={{ transform: "translate3d(0, 0, 0)" }}
      >
        {[0, 1].map((setIndex) => (
          <div
            key={setIndex}
            ref={setIndex === 0 ? singleSetRef : undefined}
            className="flex shrink-0 items-center gap-12 sm:gap-20 pr-12 sm:pr-20"
          >
            {items.map((item, idx) => (
              <div
                key={`${setIndex}-${item.name}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-8 sm:h-9 md:h-10 w-auto max-w-[150px] object-contain pointer-events-none select-none opacity-75 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
