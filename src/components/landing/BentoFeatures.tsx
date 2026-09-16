"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { debounce } from "@/lib/runtime"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion"
import { Layers, Network, LineChart, Globe2, ArrowRight } from "lucide-react"
import { ThreeGlobe, type PointScreenPos } from "@/components/Globe"
import { FadeBlur } from "@/components/ui/motion"

export function BentoFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardContainerRef = useRef<HTMLDivElement>(null)

  const card0Ref = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const card3Ref = useRef<HTMLDivElement>(null)

  const [pointPos, setPointPos] = useState<PointScreenPos | null>(null)
  const [cardAnchor, setCardAnchor] = useState<{ x: number; y: number } | null>(null)
  const [activeStage, setActiveStage] = useState(0)

  const isSnapped = pointPos ? pointPos.isSnapped : true

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  )

  const cachedAnchorsRef = useRef<Map<number, { x: number; y: number }>>(new Map())

  useEffect(() => {
    const onResize = debounce(() => {
      setIsMobile(window.innerWidth < 1024)
      cachedAnchorsRef.current.clear()
    }, 150)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // 1. Scroll tracking across the pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  // 2. Discrete Stage Trigger: non-progressive threshold snapping
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextStage =
      latest < 0.18 ? 0 : latest < 0.50 ? 1 : latest < 0.82 ? 2 : 3

    if (nextStage !== activeStage) {
      setActiveStage(nextStage)
      setPointPos((prev) => (prev ? { ...prev, isSnapped: false } : null))
    }
  })

  const getCardAnchor = useCallback((coordId: number): { x: number; y: number } | null => {
    const cached = cachedAnchorsRef.current.get(coordId)
    if (cached) return cached

    const container = cardContainerRef.current
    if (!container) return null

    const cardRefs = [card0Ref, card1Ref, card2Ref, card3Ref]
    const activeEl = cardRefs[coordId]?.current
    if (!activeEl) return null

    const cRect = container.getBoundingClientRect()
    const elRect = activeEl.getBoundingClientRect()

    // Cards 0 and 2 are in the LEFT column -> anchor is right-center edge
    // Cards 1 and 3 are in the RIGHT column -> anchor is left-center edge
    const isLeftCard = coordId === 0 || coordId === 2
    const x = isLeftCard
      ? elRect.right - cRect.left
      : elRect.left - cRect.left
    const y = elRect.top - cRect.top + elRect.height * 0.5

    const anchor = { x, y }
    cachedAnchorsRef.current.set(coordId, anchor)
    return anchor
  }, [])

  // 3. Handle projected screen position of active point on land to calculate connecting line
  const handlePointScreenPos = useCallback(
    (pos: PointScreenPos) => {
      setPointPos(pos)
      const anchor = getCardAnchor(pos.coordId)
      if (anchor) {
        setCardAnchor(anchor)
      }
    },
    [getCardAnchor]
  )

  return (
    <section
      id="platform-capabilities"
      ref={containerRef}
      className="relative w-full h-[280vh] lg:h-[400vh] bg-white snap-y snap-proximity"
    >
      {/* 4 Discrete Scroll Snap Anchors */}
      <div className="absolute inset-0 pointer-events-none flex flex-col">
        <div className="h-[100vh] snap-start" />
        <div className="h-[100vh] snap-start" />
        <div className="h-[100vh] snap-start" />
        <div className="h-[100vh] snap-start" />
      </div>

      {/* Sticky viewport pinned while scrolling through all 4 feature stages */}
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden z-20">
        <div
          ref={cardContainerRef}
          className="relative overflow-hidden w-full h-full flex flex-col justify-between shadow-[0_25px_70px_rgba(0,0,0,0.06)] bg-white text-[#424242] select-none will-change-transform border border-gray-100"
        >
          {/* Subtle Primary Mint Accent Glows */}
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#70CAB9]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[#70CAB9]/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(112,202,185,0.12),rgba(255,255,255,0))] pointer-events-none" />

          {/* Three.js 3D Earth Globe (Persistent at full scale, zero ingress/outgress distance) */}
          <ThreeGlobe
            activeStage={activeStage}
            isMobile={isMobile}
            onActivePointScreenPos={handlePointScreenPos}
          />

          {/* Connecting Line between Globe Point and Card (Appears ONLY when snapped) */}
          <AnimatePresence>
            {!isMobile && pointPos?.isSnapped && pointPos.visible && cardAnchor && (
              <motion.svg
                key={`snap-line-${activeStage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full pointer-events-none z-25 overflow-visible"
              >
                <defs>
                  <linearGradient
                    id={`pointLineGrad-${activeStage}`}
                    x1={pointPos.x}
                    y1={pointPos.y}
                    x2={cardAnchor.x}
                    y2={cardAnchor.y}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0%" stopColor="#0f7f75" stopOpacity="0.85" />
                    <stop offset="50%" stopColor="#70CAB9" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#70CAB9" stopOpacity="0.85" />
                  </linearGradient>
                  <filter id={`glowFilter-${activeStage}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#70CAB9" floodOpacity="0.55" />
                  </filter>
                </defs>

                {/* Fluid Bezier curve drawing in on snap */}
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  d={`M ${pointPos.x} ${pointPos.y} C ${
                    pointPos.x + (cardAnchor.x - pointPos.x) * 0.5
                  } ${pointPos.y}, ${
                    pointPos.x + (cardAnchor.x - pointPos.x) * 0.5
                  } ${cardAnchor.y}, ${cardAnchor.x} ${cardAnchor.y}`}
                  fill="none"
                  stroke={`url(#pointLineGrad-${activeStage})`}
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  filter={`url(#glowFilter-${activeStage})`}
                />

                {/* Start terminal circle on globe coordinate */}
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  cx={pointPos.x}
                  cy={pointPos.y}
                  r="4"
                  fill="#07463e"
                  stroke="#70CAB9"
                  strokeWidth="2"
                />

                {/* End terminal node at card border */}
                <motion.circle
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  cx={cardAnchor.x}
                  cy={cardAnchor.y}
                  r="4.5"
                  fill="#70CAB9"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Centered Section Header without toggle or badge */}
          <div className="relative z-20 w-full max-w-4xl mx-auto px-6 pt-24 sm:pt-28 lg:pt-32 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1f2937] tracking-tight leading-tight">
              Everything you need for successful shipping
            </h2>
          </div>

          {/* Middle Content Zone: 4 Frosted Glass Bento Cards with Inner Text Blur Fade */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 flex-1 flex items-center">
            <div className="grid lg:grid-cols-12 w-full items-center gap-8 min-h-[260px] lg:min-h-[480px] relative">
              {/* LEFT COLUMN: Cards 1 and 3 emerge here (Globe is on Right) */}
              <div className="lg:col-span-6 relative h-full min-h-[240px] lg:min-h-[380px] flex items-center justify-center lg:justify-start absolute lg:static inset-x-0 top-0 z-10">
                {/* Card 1: One platform for everything (Stage 0, Left) */}
                <div
                  ref={card0Ref}
                  className={`w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(15,127,117,0.08),0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.7)] p-6 sm:p-10 text-[#424242] flex flex-col justify-between absolute overflow-hidden transition-all duration-400 ease-out ${
                    activeStage === 0 && isSnapped
                      ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
                      : "opacity-0 pointer-events-none translate-y-3 scale-[0.98]"
                  }`}
                >
                  {/* Background Watermark Logo with Low Opacity (Reference Match) */}
                  <div className="absolute -top-6 -right-6 w-52 h-52 text-[#70CAB9] opacity-[0.08] pointer-events-none select-none overflow-hidden">
                    <Layers className="w-full h-full stroke-[1.2]" />
                  </div>

                  <FadeBlur
                    inView={activeStage === 0 && isSnapped}
                    duration={0.45}
                    yOffset={10}
                    className="relative z-10 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[#60948A] text-sm font-semibold tracking-wide mb-3">
                        One platform for everything
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-[#1f2937] mb-4 leading-tight">
                        Manage all your shipments, returns and logistics from one central hub
                      </h3>
                      <p className="text-base text-[#525151] leading-relaxed">
                        No hassle with multiple systems. Everything you need for successful shipping in one place.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100/90 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0f7f75] hover:text-[#07463e] flex items-center gap-1.5 transition-colors cursor-pointer group">
                        Explore platform
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </FadeBlur>
                </div>

                {/* Card 3: Real-time Analytics (Stage 2, Left) */}
                <div
                  ref={card2Ref}
                  className={`w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(15,127,117,0.08),0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.7)] p-6 sm:p-10 text-[#424242] flex flex-col justify-between absolute overflow-hidden transition-all duration-400 ease-out ${
                    activeStage === 2 && isSnapped
                      ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
                      : "opacity-0 pointer-events-none translate-y-3 scale-[0.98]"
                  }`}
                >
                  {/* Background Watermark Logo with Low Opacity (Reference Match) */}
                  <div className="absolute -top-6 -right-6 w-52 h-52 text-[#70CAB9] opacity-[0.08] pointer-events-none select-none overflow-hidden">
                    <LineChart className="w-full h-full stroke-[1.2]" />
                  </div>

                  <FadeBlur
                    inView={activeStage === 2 && isSnapped}
                    duration={0.45}
                    yOffset={10}
                    className="relative z-10 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[#60948A] text-sm font-semibold tracking-wide mb-3">
                        Analytics
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-[#1f2937] mb-4 leading-tight">
                        Real-time insights and data-driven decisions
                      </h3>
                      <p className="text-base text-[#525151] leading-relaxed">
                        Track your shipping performance in real-time. Get deep insights to optimize your logistics and reduce costs.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100/90 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0f7f75] hover:text-[#07463e] flex items-center gap-1.5 transition-colors cursor-pointer group">
                        Explore analytics
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </FadeBlur>
                </div>
              </div>

              {/* RIGHT COLUMN: Cards 2 and 4 emerge here (Globe is on Left) */}
              <div className="lg:col-span-6 relative h-full min-h-[240px] lg:min-h-[380px] flex items-center justify-center lg:justify-end absolute lg:static inset-x-0 top-0 z-10">
                {/* Card 2: Fast integrations (Stage 1, Right) */}
                <div
                  ref={card1Ref}
                  className={`w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(15,127,117,0.08),0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.7)] p-6 sm:p-10 text-[#424242] flex flex-col justify-between absolute overflow-hidden transition-all duration-400 ease-out ${
                    activeStage === 1 && isSnapped
                      ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
                      : "opacity-0 pointer-events-none translate-y-3 scale-[0.98]"
                  }`}
                >
                  {/* Background Watermark Logo with Low Opacity (Reference Match) */}
                  <div className="absolute -top-6 -right-6 w-52 h-52 text-[#70CAB9] opacity-[0.08] pointer-events-none select-none overflow-hidden">
                    <Network className="w-full h-full stroke-[1.2]" />
                  </div>

                  <FadeBlur
                    inView={activeStage === 1 && isSnapped}
                    duration={0.45}
                    yOffset={10}
                    className="relative z-10 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[#60948A] text-sm font-semibold tracking-wide mb-3">
                        Fast integrations
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-[#1f2937] mb-4 leading-tight">
                        Connect within minutes with your webshop, WMS or other systems
                      </h3>
                      <p className="text-base text-[#525151] leading-relaxed">
                        Through our dashboard or extensive API, you can quickly and easily integrate with all popular platforms.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100/90 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0f7f75] hover:text-[#07463e] flex items-center gap-1.5 transition-colors cursor-pointer group">
                        View integrations
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </FadeBlur>
                </div>

                {/* Card 4: Worldwide Coverage & Uptime (Stage 3, Right) */}
                <div
                  ref={card3Ref}
                  className={`w-full max-w-xl rounded-3xl bg-white/70 backdrop-blur-2xl border border-white/80 shadow-[0_20px_50px_rgba(15,127,117,0.08),0_1px_3px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.7)] p-6 sm:p-10 text-[#424242] flex flex-col justify-between absolute overflow-hidden transition-all duration-400 ease-out ${
                    activeStage === 3 && isSnapped
                      ? "opacity-100 pointer-events-auto translate-y-0 scale-100"
                      : "opacity-0 pointer-events-none translate-y-3 scale-[0.98]"
                  }`}
                >
                  {/* Background Watermark Logo with Low Opacity (Reference Match) */}
                  <div className="absolute -top-6 -right-6 w-52 h-52 text-[#70CAB9] opacity-[0.08] pointer-events-none select-none overflow-hidden">
                    <Globe2 className="w-full h-full stroke-[1.2]" />
                  </div>

                  <FadeBlur
                    inView={activeStage === 3 && isSnapped}
                    duration={0.45}
                    yOffset={10}
                    className="relative z-10 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[#60948A] text-sm font-semibold tracking-wide mb-3">
                        Global coverage
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold text-[#1f2937] mb-4 leading-tight">
                        Ship to more than 200+ countries worldwide
                      </h3>
                      <p className="text-base text-[#525151] leading-relaxed">
                        You have access to all major carriers and local transporters worldwide.
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100/90 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#0f7f75] hover:text-[#07463e] flex items-center gap-1.5 transition-colors cursor-pointer group">
                        View global network
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </FadeBlur>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Space / Subtle Indicator */}
          <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pb-6 flex items-center justify-between text-xs text-gray-400">
            <span>Scroll to explore capabilities</span>
            <span>Step {activeStage + 1} of 4</span>
          </div>
        </div>
      </div>
    </section>
  )
}
