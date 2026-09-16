"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewsItem {
  id: string
  tag: string
  date: string
  title: string
  bottomSnippet: string
  hasPlayButton?: boolean
  href: string
  renderGraphic: () => React.ReactNode
}

export function RecentNewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [indicatorWidth, setIndicatorWidth] = useState(25) // percentage

  const newsItems: NewsItem[] = [
    {
      id: "late-seed",
      tag: "NEWS",
      date: "July 23, 2026",
      title: "Zineps closes late-seed investment to accelerate its next phase of growth",
      bottomSnippet:
        "Amsterdam, The Netherlands, Zineps has successfully closed its late-seed investment round with Glass Frog Ventures...",
      hasPlayButton: true,
      href: "https://www.zineps.com/newsroom/late-seed",
      renderGraphic: () => (
        <div className="absolute inset-0 bg-gradient-to-br from-[#454f59] via-[#2c333a] to-[#1a1f24] flex items-center justify-center p-6">
          <div className="flex items-center justify-between w-full max-w-[260px] gap-2">
            {/* Zineps Logo */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xl font-bold text-white tracking-tight">zineps</span>
            </div>

            {/* Red Play Button */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#E50914] flex items-center justify-center text-white shadow-xl shadow-red-950/40 group-hover:scale-110 transition-transform duration-300 shrink-0">
              <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>

            {/* Glass Frog Ventures Logo */}
            <div className="flex items-center gap-1 text-left shrink-0">
              {/* Stylized Frog Icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-white/90"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="7" cy="8" r="3" />
                <circle cx="17" cy="8" r="3" />
                <path d="M4 14c0 4 4 6 8 6s8-2 8-6-4-5-8-5-8 1-8 5z" />
                <circle cx="7" cy="8" r="1" fill="currentColor" />
                <circle cx="17" cy="8" r="1" fill="currentColor" />
              </svg>
              <div className="flex flex-col leading-none">
                <span className="text-[11px] font-bold text-white tracking-tight">Glass Frog</span>
                <span className="text-[8px] font-semibold tracking-wider text-white/70 uppercase">
                  Ventures
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "customs-update",
      tag: "UPDATES",
      date: "July 20, 2026",
      title: "Late July 2026 Platform Update: Bulk Customs Automation, Smarter Carrier Routing",
      bottomSnippet:
        "Full customs-data support for bulk shipment imports, EORI and VAT verification, and smarter carrier allocation rules...",
      href: "https://www.zineps.com/blog",
      renderGraphic: () => (
        <div className="absolute inset-0 bg-[#eaf4f1] overflow-hidden flex items-center justify-center p-4">
          {/* Subtle grid backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(#70CAB9_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

          {/* 3x3 carrier cards grid */}
          <div className="grid grid-cols-3 gap-2 w-full max-w-[240px] transform -rotate-2 scale-95">
            {[
              { name: "DHL", logo: "/hero-dhl.svg", bg: "bg-white" },
              { name: "PostNL", logo: "/hero-postnl.svg", bg: "bg-white" },
              { name: "DPD", logo: "/hero-dpd.svg", bg: "bg-white" },
              { name: "GLS", logo: "/hero-gls.svg", bg: "bg-white" },
              { name: "bpost", logo: "/hero-bpost.svg", bg: "bg-white" },
              { name: "bol.", logo: "/hero-bol.svg", bg: "bg-white" },
              { name: "FedEx", logo: "/hero-fedex.svg", bg: "bg-white" },
              { name: "UPS", logo: "/hero-ups.svg", bg: "bg-white" },
              { name: "DB Schenker", logo: "/db-schenker-logo.svg", bg: "bg-white" },
            ].map((carrier, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-xl ${carrier.bg} border border-emerald-900/10 shadow-xs flex items-center justify-center h-14`}
              >
                <img
                  src={carrier.logo}
                  alt={carrier.name}
                  className="max-h-6 max-w-[50px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: "nova-post",
      tag: "NEWS",
      date: "May 15, 2026",
      title: "Zineps now integrates with Nova Post",
      bottomSnippet:
        "Native shipping, tracking, and delivery automation for Ukrainian ecommerce across Europe...",
      href: "https://www.zineps.com/blog",
      renderGraphic: () => (
        <div className="absolute inset-0 bg-gradient-to-br from-[#f2f4f7] via-[#e5e9ef] to-[#d8dde5] flex items-center justify-center p-6">
          <div className="flex items-center justify-center gap-5 w-full">
            {/* Zineps Logo */}
            <span className="text-2xl font-bold text-[#1f2937] tracking-tight">zineps</span>

            {/* Nova Post Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center text-[#E31E24]">
                {/* Iconic Nova Post Double Diamond-Arrow Logo */}
                <svg viewBox="0 0 32 32" className="w-8 h-8 fill-[#E31E24]">
                  <path d="M16 2 L22 10 L18 10 L18 14 L26 14 L26 10 L32 16 L26 22 L26 18 L18 18 L18 22 L22 22 L16 30 L10 22 L14 22 L14 18 L6 18 L6 22 L0 16 L6 10 L6 14 L14 14 L14 10 L10 10 Z" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-black text-[#E31E24] tracking-tight uppercase">
                  NOVA
                </span>
                <span className="text-sm font-black text-[#E31E24] tracking-tight uppercase">
                  POST
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "recap-2025",
      tag: "NEWS",
      date: "December 27, 2025",
      title: "Zineps 2025 Recap: From Foundation to Focus",
      bottomSnippet:
        "In our Zineps 2025 recap video, we reflect on a year of strong ecosystem expansion, new carrier integrations, and partner growth...",
      hasPlayButton: true,
      href: "https://www.zineps.com/blog",
      renderGraphic: () => (
        <div className="absolute inset-0 bg-[#25303a] overflow-hidden flex items-center justify-center">
          {/* Architectural stadium backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20 z-10" />

          {/* High-res stadium structure illustration */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85 scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&q=80')",
            }}
          />

          {/* Center Play Button */}
          <div className="relative z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E50914] flex items-center justify-center text-white shadow-2xl shadow-black/60 group-hover:scale-110 transition-transform duration-300">
            <svg className="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "future-logistics",
      tag: "NEWS",
      date: "December 26, 2025",
      title: "The future of logistics & operational management: From software to autonomous workflows",
      bottomSnippet:
        "From software to logistics management & supply chain automation — why unified APIs and OS-level integrations define the next decade...",
      href: "https://www.zineps.com/blog",
      renderGraphic: () => (
        <div className="absolute inset-0 bg-gradient-to-br from-[#12423b] via-[#1c5f55] to-[#2e8b7d] overflow-hidden flex items-center justify-center p-6">
          {/* Concentric curved rings */}
          <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full border border-white/15 pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />

          {/* Frosted Zineps Emblem Watermark */}
          <div className="relative w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <svg
              viewBox="0 0 100 100"
              className="w-14 h-14 text-white/90"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
            >
              <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="6" />
              <path
                d="M32 36 L68 36 L32 64 L68 64"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      ),
    },
    {
      id: "doordash-air",
      tag: "LOGISTICS",
      date: "August 16, 2026",
      title: "DoorDash Air: Drone Delivery & The Next Frontier in European E-Commerce",
      bottomSnippet:
        "What DoorDash Air and FAA Part 135 autonomous drone delivery means for European shippers, instant fulfillment, and warehouse robotics...",
      href: "https://www.zineps.com/blog",
      renderGraphic: () => (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b263b] via-[#24354f] to-[#3a506b] overflow-hidden flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-75 scale-105"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=700&q=80')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>
      ),
    },
  ]

  const updateScrollProgress = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return

    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) {
      setScrollProgress(0)
      setIndicatorWidth(100)
      return
    }

    const currentScroll = el.scrollLeft
    const percentage = (currentScroll / maxScroll) * 100
    setScrollProgress(percentage)

    // Calculate indicator width based on visible ratio
    const visibleRatio = el.clientWidth / el.scrollWidth
    setIndicatorWidth(Math.max(18, Math.min(60, visibleRatio * 100)))
  }, [])

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return

    updateScrollProgress()
    el.addEventListener("scroll", updateScrollProgress, { passive: true })
    window.addEventListener("resize", updateScrollProgress)

    return () => {
      el.removeEventListener("scroll", updateScrollProgress)
      window.removeEventListener("resize", updateScrollProgress)
    }
  }, [updateScrollProgress])

  const scrollBy = (direction: "left" | "right") => {
    const el = scrollContainerRef.current
    if (!el) return

    const scrollAmount = 340 // approx width of one card + gap
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <section id="recent-news" className="w-full py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1f2937] tracking-tight leading-tight">
              Recent news
            </h2>
            <p className="text-sm sm:text-base text-gray-500 mt-1.5 leading-normal">
              Stay updated with the latest news, updates, and insights from Zineps
            </p>
          </div>

          {/* Right Controls: View All + Circular Arrows */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto">
            <a
              href="https://www.zineps.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1 group mr-2"
            >
              <span>View all</span>
              <span className="text-xs transition-transform duration-200 group-hover:translate-x-0.5">
                &gt;
              </span>
            </a>

            {/* Left Circular Arrow Button */}
            <button
              onClick={() => scrollBy("left")}
              aria-label="Scroll news left"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Right Circular Arrow Button */}
            <button
              onClick={() => scrollBy("right")}
              aria-label="Scroll news right"
              className="w-9 h-9 rounded-full border border-gray-900 text-gray-900 flex items-center justify-center hover:bg-gray-100 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scrollbar-none py-2 scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {newsItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-none w-[270px] sm:w-[290px] md:w-[310px] flex flex-col focus:outline-none"
            >
              {/* Card Media Container (Aspect 4/5) */}
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-gray-200/90 shadow-2xs transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                {/* Background Graphics */}
                {item.renderGraphic()}

                {/* Top Badge Overlay */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-20 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white bg-black/35 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15">
                      {item.tag}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-white/85 font-medium drop-shadow-xs">
                      {item.date}
                    </span>
                  </div>
                </div>

                {/* Bottom Vignette & Snippet Text */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 pt-12 flex flex-col justify-end z-20 pointer-events-none">
                  <p className="text-xs text-white/95 line-clamp-2 leading-relaxed font-normal drop-shadow-xs">
                    {item.bottomSnippet}
                  </p>
                </div>
              </div>

              {/* Title Underneath Card */}
              <div className="mt-3">
                <h3 className="text-sm sm:text-[15px] font-bold text-[#1f2937] leading-snug line-clamp-2 group-hover:text-[#0f7f75] transition-colors">
                  {item.title}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Custom Progress Bar with Arrows */}
        <div className="flex items-center gap-2 mt-6 w-full">
          {/* Left Arrow Icon */}
          <button
            onClick={() => scrollBy("left")}
            aria-label="Previous"
            className="text-gray-400 hover:text-gray-700 transition-colors p-0.5 cursor-pointer"
          >
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-current rotate-[-90deg]">
              <polygon points="5,1 9,9 1,9" />
            </svg>
          </button>

          {/* Progress Bar Track */}
          <div className="relative flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-neutral-600 rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${indicatorWidth}%`,
                left: `${(scrollProgress / 100) * (100 - indicatorWidth)}%`,
              }}
            />
          </div>

          {/* Right Arrow Icon */}
          <button
            onClick={() => scrollBy("right")}
            aria-label="Next"
            className="text-gray-400 hover:text-gray-700 transition-colors p-0.5 cursor-pointer"
          >
            <svg viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-current rotate-[90deg]">
              <polygon points="5,1 9,9 1,9" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
