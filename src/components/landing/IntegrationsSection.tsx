"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import { HoverButton } from "@/components/ui/hover-button"
import { FadeBlur, motion, useInView } from "@/components/ui/motion"
import { debounce, getDeviceProfile, observeVisibility } from "@/lib/runtime"

const LOGOS = [
  { name: "Bpost", src: "/logos/bpost.png" },
  { name: "Bol", src: "/logos/bol.png" },
  { name: "PostNL", src: "/logos/postnl.png" },
  { name: "Temu", src: "/logos/temu.png" },
  { name: "DHL", src: "/logos/dhl.png" },
  { name: "Amazon", src: "/logos/amazon.png" },
  { name: "DPD", src: "/logos/dpd.png" },
  { name: "Shopify", src: "/logos/shopify.png" },
  { name: "Correos", src: "/logos/correos.png" },
  { name: "UPS", src: "/logos/ups.png" },
  { name: "Magento", src: "/logos/magento.png" },
  { name: "GLS", src: "/logos/gls.png" },
  { name: "WooCommerce", src: "/logos/woocommerce.png" },
  { name: "Fedex", src: "/logos/fedex.png" },
  { name: "DB Schenker", src: "/logos/db-schenker.png" },
  { name: "CCV Shop", src: "/logos/ccv-shop.png" },
  { name: "SnelStart", src: "/logos/snelstart.png" },
  { name: "Exact", src: "/logos/exact.png" },
]

// Column configurations: direction (1: down, -1: up), cruising speed, and responsive visibility
const COLUMN_CONFIGS = [
  { dir: 1, speed: 32, visibility: "flex" },
  { dir: -1, speed: 28, visibility: "flex" },
  { dir: 1, speed: 34, visibility: "flex" },
  { dir: -1, speed: 30, visibility: "flex" },
  { dir: 1, speed: 32, visibility: "hidden sm:flex" },
  { dir: -1, speed: 28, visibility: "hidden sm:flex" },
  { dir: 1, speed: 34, visibility: "hidden lg:flex" },
  { dir: -1, speed: 30, visibility: "hidden lg:flex" },
]

// Curated logo sets per column ensuring diverse variety across the grid
const COLUMNS = [
  {
    ...COLUMN_CONFIGS[0],
    items: [LOGOS[0], LOGOS[4], LOGOS[8], LOGOS[12], LOGOS[16], LOGOS[2]],
  },
  {
    ...COLUMN_CONFIGS[1],
    items: [LOGOS[1], LOGOS[5], LOGOS[9], LOGOS[13], LOGOS[17], LOGOS[3]],
  },
  {
    ...COLUMN_CONFIGS[2],
    items: [LOGOS[2], LOGOS[6], LOGOS[10], LOGOS[14], LOGOS[0], LOGOS[4]],
  },
  {
    ...COLUMN_CONFIGS[3],
    items: [LOGOS[3], LOGOS[7], LOGOS[11], LOGOS[15], LOGOS[1], LOGOS[5]],
  },
  {
    ...COLUMN_CONFIGS[4],
    items: [LOGOS[4], LOGOS[8], LOGOS[12], LOGOS[16], LOGOS[2], LOGOS[6]],
  },
  {
    ...COLUMN_CONFIGS[5],
    items: [LOGOS[5], LOGOS[9], LOGOS[13], LOGOS[17], LOGOS[3], LOGOS[7]],
  },
  {
    ...COLUMN_CONFIGS[6],
    items: [LOGOS[6], LOGOS[10], LOGOS[14], LOGOS[0], LOGOS[4], LOGOS[8]],
  },
  {
    ...COLUMN_CONFIGS[7],
    items: [LOGOS[7], LOGOS[11], LOGOS[15], LOGOS[1], LOGOS[5], LOGOS[9]],
  },
]

// Initial fraction offsets (between 0 and 1) so columns start organically staggered
const INITIAL_FRACTIONS = [0.15, 0.65, 0.35, 0.85, 0.25, 0.75, 0.45, 0.95]

function visibleColumnCount() {
  if (typeof window === "undefined") return 4
  if (window.innerWidth >= 1024) return 8
  if (window.innerWidth >= 640) return 6
  return 4
}

export function IntegrationsSection() {
  const containerRef = useRef<HTMLElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)
  const columnRefs = useRef<(HTMLDivElement | null)[]>([])
  const currentYs = useRef<number[]>([0, 0, 0, 0, 0, 0, 0, 0])
  const initializedRef = useRef(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isCardInView = useInView(cardRef, {
    amount: 0.2,
    once: false,
  })
  const [colCount, setColCount] = useState(visibleColumnCount)

  useEffect(() => {
    let singleHeight = 0

    const updateHeight = () => {
      if (singleSetRef.current) {
        const rect = singleSetRef.current.getBoundingClientRect()
        if (rect.height > 50) {
          const oldH = singleHeight
          const newH = rect.height
          singleHeight = newH

          // Rescale positions proportionally on window resize to prevent jumps
          if (oldH > 0 && oldH !== newH) {
            const ratio = newH / oldH
            for (let i = 0; i < COLUMN_CONFIGS.length; i++) {
              currentYs.current[i] *= ratio
            }
          }
        }
      }
    }

    updateHeight()
    const onResize = debounce(() => {
      updateHeight()
      setColCount(visibleColumnCount())
    }, 150)
    window.addEventListener("resize", onResize)

    const ro = new ResizeObserver(() => {
      updateHeight()
    })
    if (singleSetRef.current) {
      ro.observe(singleSetRef.current)
    }

    let animId: number
    let lastTime = performance.now()
    let velocity = 0
    let lastScrollY = window.scrollY
    const scrollBoost = 0.25

    // Gentle wheel acceleration on section
    const handleWheel = (e: WheelEvent) => {
      velocity += Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 40) * 0.3
    }

    const container = containerRef.current
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

      // Ensure single set height is measured accurately from DOM
      if (singleHeight <= 50) {
        updateHeight()
      }

      if (singleHeight > 50 && !initializedRef.current) {
        initializedRef.current = true
        for (let i = 0; i < COLUMN_CONFIGS.length; i++) {
          currentYs.current[i] = -singleHeight * INITIAL_FRACTIONS[i % INITIAL_FRACTIONS.length]
        }
      }

      // Check window scroll displacement
      const currentScrollY = window.scrollY
      const deltaScrollY = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      if (Math.abs(deltaScrollY) > 0) {
        velocity += deltaScrollY * scrollBoost * 3
      }

      // Smooth inertia decay back to cruising speed
      velocity *= Math.pow(0.2, dt)

      // Clamp velocity to a comfortable, gentle range
      const clampedVelocity = Math.max(-50, Math.min(50, velocity))
      const speedBoost = Math.abs(clampedVelocity)

      for (let i = 0; i < COLUMN_CONFIGS.length; i++) {
        const colEl = columnRefs.current[i]
        if (!colEl) continue

        const config = COLUMN_CONFIGS[i]
        const effectiveSpeed = (config.speed + speedBoost) * config.dir
        currentYs.current[i] += effectiveSpeed * dt

        if (singleHeight > 0) {
          // Seamless continuous modulo wrap within [-singleHeight, 0]
          while (currentYs.current[i] <= -singleHeight) {
            currentYs.current[i] += singleHeight
          }
          while (currentYs.current[i] > 0) {
            currentYs.current[i] -= singleHeight
          }
        }

        colEl.style.transform = `translate3d(0, ${currentYs.current[i]}px, 0)`
      }

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
      ro.disconnect()
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  return (
    <section
      id="integrations"
      ref={containerRef}
      className="py-16 md:py-24 relative overflow-hidden min-h-screen flex items-center justify-center select-none"
    >
      {/* Background: Vertical moving logo ticker columns with top & bottom fade mask */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
        <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px] h-full flex items-start">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-6 w-full h-full items-start">
            {COLUMNS.slice(0, colCount).map((col, colIdx) => (
              <div
                key={colIdx}
                ref={(el) => {
                  columnRefs.current[colIdx] = el
                }}
                className="flex flex-col will-change-transform"
                style={{
                  transform: `translate3d(0, -${(INITIAL_FRACTIONS[colIdx] * 20).toFixed(2)}%, 0)`,
                }}
              >
                {[0, 1].map((setIdx) => (
                  <div
                    key={setIdx}
                    ref={colIdx === 0 && setIdx === 0 ? singleSetRef : undefined}
                    className="flex flex-col gap-4 sm:gap-6 pb-4 sm:pb-6 shrink-0"
                  >
                    {col.items.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className="w-full aspect-square rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] flex items-center justify-center p-3 sm:p-4 hover:shadow-md transition-shadow"
                        title={item.name}
                      >
                        <img
                          src={item.src}
                          alt={item.name}
                          className="w-full h-full object-contain pointer-events-none select-none"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foreground: Centered Frosted Glass Content Card */}
      <div className="relative z-20 w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px] flex items-center justify-center pointer-events-none">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
          animate={
            isCardInView
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale: 0.98, filter: "blur(6px)" }
          }
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl bg-white/80 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.08),0_0_1px_1px_rgba(255,255,255,0.9)] rounded-3xl p-8 sm:p-12 md:p-14 text-center flex flex-col items-center pointer-events-auto"
        >
          <FadeBlur inView={isCardInView} delay={0} yOffset={14} blur="10px" className="w-full">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#424242] mb-6 leading-tight tracking-tight">
              More than 100+ integrations
            </h2>
          </FadeBlur>

          <FadeBlur inView={isCardInView} delay={0.14} yOffset={14} blur="10px" className="w-full flex justify-center">
            <p className="text-base sm:text-lg md:text-xl text-[#525151] mb-8 leading-relaxed max-w-xl">
              Seamlessly connect Zineps with popular marketplaces, e-commerce platforms, and logistics partners. Optimize your workflow, lower your shipping rates, and provide customers with an effortless shipping experience.
            </p>
          </FadeBlur>

          <FadeBlur inView={isCardInView} delay={0.28} yOffset={14} blur="10px">
            <div>
              <HoverButton
                href="https://app.zineps.com/Account/Register"
                target="_blank"
                rel="noopener noreferrer"
                size="md"
                className="shadow-md"
              >
                <span>View integrations</span>
                <ArrowRight className="w-4 h-4" />
              </HoverButton>
            </div>
          </FadeBlur>
        </motion.div>
      </div>
    </section>
  )
}
