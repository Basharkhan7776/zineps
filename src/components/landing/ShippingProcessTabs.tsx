"use client"

import { useRef, useState, useEffect } from "react"
import {
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion"
import { HoverButton } from "@/components/ui/hover-button"

interface TabData {
  id: string
  step: string
  toggleLabel: string
  badge: string
  headingPrefix: string
  headingAccent: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  mockup: {
    src: string
    alt: string
    title: string
    statusBadge: string
  }
}

const TABS: TabData[] = [
  {
    id: "ecommerce",
    step: "01",
    toggleLabel: "E-commerce Shipping",
    badge: "E-Commerce & Online Stores",
    headingPrefix: "Smart shipping ",
    headingAccent: "from label to return",
    description:
      "Less manual work, lower carrier rates, faster fulfillment, and streamlined automated returns processing across every webshop channel.",
    features: [
      "Automatic carrier selection based on real-time price & delivery speed",
      "High-speed batch label generation with instant thermal printing",
      "Automated customer pickup & branded self-service returns portal",
      "Direct checkout shipping rules for Shopify, WooCommerce, & Amazon",
      "Live branded tracking pages, packing slips, and automated SMS/email alerts",
    ],
    ctaText: "Start your free trial",
    ctaHref: "https://app.zineps.com/Account/Register",
    mockup: {
      src: "/zineps-dashboard.svg",
      alt: "Zineps E-Commerce Order Fulfillment and Deliveries Dashboard",
      title: "E-Commerce Dispatch",
      statusBadge: "99.4% On-Time Deliveries",
    },
  },
  {
    id: "freight",
    step: "02",
    toggleLabel: "Freight & B2B Logistics",
    badge: "Commercial Freight & Consignments",
    headingPrefix: "Send your commercial ",
    headingAccent: "business freight",
    description:
      "More revenue per vehicle, less planning & administration. Win new accounts, optimize fleet pallet utilization, and streamline enterprise logistics.",
    features: [
      "Commercial pallet freight shipping through the unified Zineps network",
      "Manage multi-drop consignments, LTL/FTL routing, & dock pickups centrally",
      "Seamless ERP systems integration (SAP, Dynamics, NetSuite) & developer APIs",
      "Advanced commercial address validation and dock capability normalization",
      "Real-time track & trace with carrier SLA performance scorecards",
    ],
    ctaText: "Explore freight solutions",
    ctaHref: "https://app.zineps.com/Account/Register",
    mockup: {
      src: "/shipping-zineps-b2b.svg",
      alt: "Zineps Commercial B2B Freight Carrier Dispatch Window with DB Schenker",
      title: "Commercial B2B Freight",
      statusBadge: "DB Schenker • 4 Labels Generated",
    },
  },
  {
    id: "logistics-os",
    step: "03",
    toggleLabel: "Logistics OS for 3PLs",
    badge: "For Logistics Service Providers",
    headingPrefix: "The operating system for ",
    headingAccent: "logistics service providers",
    description:
      "Publish rates, manage contracts and margins, automate invoicing, streamline merchant support, and onboard shippers while keeping 100% of your commercial relationships.",
    features: [
      "Publish rates, lanes, surcharges, and custom shipping margin rules",
      "Manage merchant contracts, tier pricing, and automated profit splits",
      "Automated billing and invoice generation per merchant or per parcel",
      "Easily onboard existing shippers onto a dedicated white-label portal",
      "Retain 100% direct customer billing and commercial relationship control",
    ],
    ctaText: "Become a partner",
    ctaHref: "https://app.zineps.com/Account/Register",
    mockup: {
      src: "/carrier-broker-mockup.svg",
      alt: "CarrierBroker B.V. Partner Dashboard for Logistics Service Providers",
      title: "3PL Logistics OS",
      statusBadge: "€48,250 Margin • Auto-Invoiced",
    },
  },
]

export function ShippingProcessTabs() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStage, setActiveStage] = useState(0)

  const isProgrammaticScroll = useRef(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Track scroll progression across 3 stages for tab switching
  const { scrollYProgress: stageScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(stageScrollProgress, "change", (latest) => {
    if (isProgrammaticScroll.current) return
    let stage = 0
    if (latest >= 0.64) {
      stage = 2
    } else if (latest >= 0.31) {
      stage = 1
    }
    setActiveStage((prev) => (prev !== stage ? stage : prev))
  })

  // Track overall scroll progression for snap mount expansion & demount contraction
  // Ingress: 0.08 -> 0.25 (entering viewport into sticky pin)
  // Pinned:  0.25 -> 0.75 (Stage 0, 1, 2 full active showcase)
  // Outgress: 0.75 -> 0.92 (leaving sticky pin out of viewport)
  const { scrollYProgress: snapProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Dynamic spring-animated expansion on mount of snap (ingress), and contraction on demount (outgress)
  const rawScale = useTransform(
    snapProgress,
    [0.08, 0.25, 0.75, 0.92],
    [0.86, 1, 1, 0.86]
  )
  const rawOpacity = useTransform(
    snapProgress,
    [0.08, 0.22, 0.78, 0.92],
    [0.65, 1, 1, 0.65]
  )

  const cardScale = useSpring(rawScale, { stiffness: 180, damping: 24, mass: 0.5 })
  const cardOpacity = useSpring(rawOpacity, { stiffness: 180, damping: 24, mass: 0.5 })

  const handleTabClick = (index: number) => {
    setActiveStage(index)
    isProgrammaticScroll.current = true
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScroll.current = false
    }, 1100)

    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const scrollY = window.scrollY
      const containerTop = rect.top + scrollY
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight
      const targetScroll = containerTop + totalScrollable * (index / 2)
      window.scrollTo({ top: targetScroll, behavior: "smooth" })
    }
  }

  // Handle external hash navigations (e.g. #logistics-os, #process-tabs) and custom events
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash
      if (hash === "#logistics-os" || hash === "#logistics") {
        handleTabClick(2)
      } else if (hash === "#process-tabs" || hash === "#ecommerce") {
        handleTabClick(0)
      } else if (hash === "#freight") {
        handleTabClick(1)
      }
    }

    const handleSelectTab = (e: Event) => {
      const custom = e as CustomEvent<{ tabId?: string; index?: number }>
      if (typeof custom.detail?.index === "number") {
        handleTabClick(custom.detail.index)
      } else if (custom.detail?.tabId === "logistics-os") {
        handleTabClick(2)
      }
    }

    const cancelProgrammatic = () => {
      isProgrammaticScroll.current = false
    }

    window.addEventListener("hashchange", handleHash)
    window.addEventListener("select-process-tab", handleSelectTab)
    window.addEventListener("wheel", cancelProgrammatic, { passive: true })
    window.addEventListener("touchmove", cancelProgrammatic, { passive: true })

    // Check on mount if landed with hash
    const timer = setTimeout(handleHash, 150)

    return () => {
      window.removeEventListener("hashchange", handleHash)
      window.removeEventListener("select-process-tab", handleSelectTab)
      window.removeEventListener("wheel", cancelProgrammatic)
      window.removeEventListener("touchmove", cancelProgrammatic)
      clearTimeout(timer)
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  const currentTab = TABS[activeStage]

  return (
    <section
      ref={containerRef}
      id="process-tabs"
      className="relative w-full h-[300vh] bg-white snap-y snap-proximity"
    >
      {/* 3 Discrete Scroll Snap Anchors with semantic IDs for external deep links */}
      <div className="absolute inset-0 pointer-events-none flex flex-col">
        <div id="ecommerce-shipping" className="h-[100vh] snap-start" />
        <div id="freight-shipping" className="h-[100vh] snap-start" />
        <div id="logistics-os" className="h-[100vh] snap-start" />
      </div>

      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Ambient mint glow backdrops */}
        <div className="absolute top-1/4 -left-48 w-[550px] h-[550px] bg-[#70CAB9]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-[550px] h-[550px] bg-[#70CAB9]/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Master Frosted Card Frame: Expands on mount of snap and contracts on demount */}
        <motion.div
          style={{
            scale: cardScale,
            opacity: cardOpacity,
          }}
          className="relative w-full max-w-7xl mx-auto rounded-[32px] sm:rounded-[40px] md:rounded-[44px] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_25px_80px_rgba(15,127,117,0.08),0_1px_3px_rgba(0,0,0,0.03),0_0_0_1px_rgba(255,255,255,0.85)] p-5 sm:p-8 lg:p-10 overflow-hidden flex flex-col justify-center max-h-[94vh] origin-center will-change-transform"
        >
          {/* Main 2-Column Showcase Area: Left = Title + Content + Toggles at bottom; Right = Tablet */}
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-center flex-1 min-h-0 overflow-y-auto lg:overflow-visible">
            {/* Left Column (6 cols on lg): Content Card + Equal-Width Toggles at Top */}
            <div className="lg:col-span-6 flex flex-col justify-start h-full min-h-0">
              {/* 3 Interactive Toggles at Top (Same Width Buttons) */}
              <div className="mb-5 sm:mb-7 shrink-0 w-full">
                <div className="w-full grid grid-cols-3 p-1 sm:p-1.5 rounded-2xl bg-gray-100/80 border border-gray-200/70 backdrop-blur-sm">
                  {TABS.map((tab, idx) => {
                    const isActive = activeStage === idx
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(idx)}
                        className={`relative col-span-1 px-2 sm:px-3 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-colors duration-200 z-10 cursor-pointer text-center flex items-center justify-center ${
                          isActive ? "text-white" : "text-neutral-600 hover:text-neutral-900"
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeProcessTabPill"
                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1c3833] via-[#3d5f56] to-[#60948A] shadow-sm -z-10"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                        <span className="truncate">{tab.toggleLabel}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Active Tab Content Card: Expands on mount of snap, contracts on demount */}
              <div className="flex-1 min-h-0 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTab.id}
                    initial={{ opacity: 0, scale: 0.96, y: 10, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.96, y: -10, filter: "blur(6px)" }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col"
                  >
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#0f7f75] mb-2">
                      {currentTab.badge}
                    </span>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f2937] tracking-tight leading-[1.2] mb-3">
                      {currentTab.headingPrefix}
                      <span className="bg-gradient-to-r from-[#1c3833] via-[#3d5f56] to-[#60948A] bg-clip-text text-transparent">
                        {currentTab.headingAccent}
                      </span>
                    </h3>

                    <p className="text-sm sm:text-base text-[#525151] leading-relaxed mb-5 max-w-xl">
                      {currentTab.description}
                    </p>

                    {/* Features Bullet List */}
                    <ul className="space-y-2.5 mb-7">
                      {currentTab.features.map((feat, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#0f7f75] mt-0.5 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div>
                      <HoverButton
                        href={currentTab.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="md"
                        className="shadow-sm"
                      >
                        <span>{currentTab.ctaText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </HoverButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column (6 cols on lg): Metallic Tablet Mockup (Matching Hero & PartnerRates Style) */}
            <div className="lg:col-span-6 flex items-center justify-center relative w-full">
              <div className="relative max-w-[580px] xl:max-w-[620px] mx-auto w-full px-1 sm:px-2">
                {/* Ambient Top Backlight Glow for 3D spatial depth */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4/5 h-24 bg-gradient-to-b from-[#70CAB9]/25 to-transparent blur-3xl pointer-events-none rounded-full" />

                {/* 3D Landscape Tablet Chassis with metallic border */}
                <div className="transform-gpu w-full border-[2.5px] border-[#3b4758] border-t-[3.5px] border-t-white/30 p-2 sm:p-2.5 md:p-3 bg-gradient-to-b from-[#242c38] via-[#1a2028] to-[#12161c] rounded-[22px] sm:rounded-[28px] md:rounded-[34px] relative shadow-[0_16px_40px_-6px_rgba(0,0,0,0.35),0_24px_50px_-12px_rgba(0,0,0,0.25)]">
                  {/* Extruded top rim highlight bevel */}
                  <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-30" />

                  {/* Tablet Screen Container with Inner Depth and Gloss */}
                  <div className="relative w-full aspect-[16/11] overflow-hidden rounded-[14px] sm:rounded-[18px] md:rounded-[24px] bg-[#f8fafc] shadow-[inset_0_0_20px_rgba(0,0,0,0.95)] border border-white/10">
                    {/* Subtle diagonal glass gloss reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />

                    {/* Realistic depth falloff shadow on the top edge */}
                    <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-black/50 via-black/15 to-transparent pointer-events-none z-20" />

                    {/* Inner bezel depth border & shadow */}
                    <div className="absolute inset-0 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2),inset_0_0_25px_rgba(0,0,0,0.85)] pointer-events-none z-20" />

                    {/* Active Desktop Dashboard Viewport */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTab.id}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full h-full flex items-center justify-center p-1 sm:p-1.5 bg-[#f8fafc]"
                      >
                        <img
                          src={currentTab.mockup.src}
                          alt={currentTab.mockup.alt}
                          className="w-full h-full object-contain select-none pointer-events-none block"
                          loading="eager"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Ambient Depth Contact Shadow */}
                <div className="w-[75%] mx-auto h-3.5 bg-black/30 blur-lg rounded-full mt-2 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
