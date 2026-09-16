import { useState, useEffect, useRef } from "react"
import { debounce } from "@/lib/runtime"
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion"

function AnimatedCounter({
  value,
  label,
  inView,
}: {
  value: number
  label: string
  inView: boolean
}) {
  const countRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = countRef.current
    if (!el) return
    if (!inView) {
      el.textContent = "+0"
      return
    }

    let start: number | null = null
    const duration = 1600

    let animId: number
    const update = (now: number) => {
      if (!start) start = now
      const elapsed = now - start
      const progress = Math.min(1, elapsed / duration)
      const ease = 1 - Math.pow(1 - progress, 4)
      el.textContent = `+${Math.round(ease * value).toLocaleString()}`

      if (progress < 1) {
        animId = requestAnimationFrame(update)
      }
    }

    animId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(animId)
  }, [inView, value])

  return (
    <div className="flex flex-col">
      <div
        ref={countRef}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-1 tracking-tight font-sans"
      >
        +0
      </div>
      <div className="text-[11px] sm:text-xs text-white/80 uppercase tracking-wider font-semibold">
        {label}
      </div>
    </div>
  )
}

export function PartnerRatesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  )

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    const onResize = debounce(checkMobile, 150)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Scroll tracking across the pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const inView = useInView(cardRef, { amount: 0.25 })

  // Expansion from centered rounded card to 100% full screen, then reversing to desnap
  const width = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ["92vw", "100vw", "100vw", "92vw"]
  )

  const height = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ["82vh", "100vh", "100vh", "82vh"]
  )

  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    ["32px", "0px", "0px", "32px"]
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.96, 1, 1, 0.96]
  )

  // Spring smoothing for 3D rotation and depth transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
    restDelta: 0.001,
  })

  // 3D Perspective Transforms matching storyboard:
  // Panel 1 ("start"): Tilted backward in 3D perspective trapezoid
  // Panel 2 ("middle snap"): Leveled completely flat (0deg)
  // Panel 3 ("end"): Tilts back into 3D perspective trapezoid
  const tabletRotateX = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    isMobile ? [20, 0, 0, 20] : [28, 0, 0, 28]
  )

  const tabletRotateZ = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    isMobile ? [-2, 0, 0, -2] : [-3.5, 0, 0, -3.5]
  )

  const tabletTranslateZ = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    isMobile ? [-30, 0, 0, -30] : [-55, 0, 0, -55]
  )

  const tabletScale = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    isMobile ? [0.96, 1, 1, 0.96] : [0.94, 1, 1, 0.94]
  )

  // Depth falloff lighting shadow on top edge (darker when tilted away, clear when flat)
  const topDepthOpacity = useTransform(
    smoothProgress,
    [0, 0.35, 0.65, 1],
    [0.55, 0, 0, 0.55]
  )

  return (
    <section
      id="partner-rates"
      ref={containerRef}
      className="relative w-full h-[220vh] lg:h-[260vh] bg-white"
    >
      {/* Sticky viewport pinned while scrolling through this section */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden z-20">
        <motion.div
          ref={cardRef}
          style={{
            width,
            height,
            borderRadius,
            scale,
            background:
              "linear-gradient(135deg, #5b8e82 0%, #446e63 45%, #2a4740 100%)",
          }}
          className="relative overflow-hidden flex items-center justify-center shadow-2xl will-change-transform transform-gpu"
        >
          {/* Subtle decorative background ambient glow */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[480px] h-[480px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[380px] h-[380px] bg-[#70CAB9]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Content Container */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 md:px-14 lg:px-16 py-5 md:py-10 max-h-[100dvh] overflow-y-auto lg:overflow-visible">
            <div className="grid lg:grid-cols-12 gap-8 md:gap-12 lg:gap-14 items-stretch">
              {/* Left Content (7 cols): flex justify-between h-full matches the height of image */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full py-1">
                {/* Top: Title & Description */}
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-white mb-4 leading-[1.15] tracking-tight">
                    Their buying power becomes yours
                  </h2>

                  <p className="text-xs sm:text-sm md:text-base text-white/90 leading-relaxed max-w-[520px]">
                    Logistics partners on Zineps already have high-volume deals with DHL, PostNL, DPD, and dozens of others. We match you with the partner whose lanes fit your store best. Use partner shipping rates, your own contracts, or both, from a single unified dashboard.
                  </p>
                </div>

                {/* Bottom: Stats Counters (One line on desktop) */}
                <div className="flex flex-wrap md:flex-nowrap items-start gap-6 sm:gap-8 lg:gap-10 pt-6 sm:pt-8">
                  <AnimatedCounter
                    value={20}
                    label="Shipping Partners"
                    inView={inView}
                  />
                  <AnimatedCounter
                    value={200}
                    label="Destination Countries"
                    inView={inView}
                  />
                  <AnimatedCounter
                    value={1000}
                    label="Shipping Methods"
                    inView={inView}
                  />
                </div>
              </div>

              {/* Right Mockup (5 cols) with 3D perspective viewport */}
              <div
                className="lg:col-span-5 flex items-center justify-center w-full"
                style={{ perspective: "1000px" }}
              >
                <div className="relative w-full max-w-[540px] lg:max-w-[620px] px-1 sm:px-2">
                  {/* Ambient Top Backlight Glow for 3D spatial depth */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-4/5 h-20 bg-gradient-to-b from-[#70CAB9]/25 to-transparent blur-2xl pointer-events-none rounded-full" />

                  {/* 3D Tilting Tablet Frame matching Hero Section */}
                  <motion.div
                    style={{
                      rotateX: tabletRotateX,
                      rotateZ: tabletRotateZ,
                      z: tabletTranslateZ,
                      scale: tabletScale,
                      transformStyle: "preserve-3d",
                      willChange: "transform",
                      boxShadow:
                        "0 12px 36px -6px rgba(0, 0, 0, 0.35), 0 24px 48px -12px rgba(0, 0, 0, 0.25)",
                    }}
                    className="transform-gpu w-full border-[2.5px] border-[#3b4758] border-t-[3.5px] border-t-white/30 p-2 sm:p-2.5 md:p-3 bg-gradient-to-b from-[#242c38] via-[#1a2028] to-[#12161c] rounded-[22px] sm:rounded-[30px] md:rounded-[38px] relative"
                  >
                    {/* Extruded top rim highlight bevel */}
                    <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-30" />

                    {/* Tablet Screen Container with Inner Depth and Gloss */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[14px] sm:rounded-[20px] md:rounded-[28px] bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.95)] border border-white/10">
                      {/* Subtle diagonal glass gloss reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />

                      {/* Realistic depth falloff shadow on the top edge (stronger when tilted back) */}
                      <motion.div
                        style={{ opacity: topDepthOpacity }}
                        className="absolute top-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-20 will-change-opacity"
                      />

                      {/* Inner bezel depth border & shadow */}
                      <div className="absolute inset-0 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2),inset_0_0_25px_rgba(0,0,0,0.85)] pointer-events-none z-20" />

                      {/* Mockup Screen Image */}
                      <img
                        src="/carrier-broker-mockup.svg"
                        alt="Zineps partner rates and carrier broker mockup"
                        className="w-full h-full object-cover object-top select-none block"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>

                  {/* Ambient Depth Contact Shadow */}
                  <div className="w-[75%] mx-auto h-3.5 bg-black/30 blur-lg rounded-full mt-2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
