import { useState, useRef } from "react"
import { motion, useScroll, useMotionValueEvent, AnimatePresence, LayoutGroup, type Variants } from "framer-motion"
import { ChevronDown, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("🇬🇧 EN")
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 20
    }
    return false
  })

  const { scrollY } = useScroll()
  const lastScrollY = useRef(0)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current
    lastScrollY.current = latest
    const diff = latest - previous

    // Mark top-of-the-page state: false when scrolled down, true when at very top
    if (latest > 20) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }

    // Small threshold to avoid micro-jitter
    if (Math.abs(diff) < 4) return

    // Keep navbar visible if menus are open
    if (mobileMenuOpen || langMenuOpen) {
      setHidden(false)
      return
    }

    // Downscroll hides navbar, upscroll (or at top) reveals and expands it
    if (latest > 80 && diff > 0) {
      setHidden(true)
    } else if (diff < 0 || latest <= 80) {
      setHidden(false)
    }
  })

  const languages = [
    { code: "EN", label: "🇬🇧 English (EN)" },
    { code: "NL", label: "🇳🇱 Nederlands (NL)" },
    { code: "DE", label: "🇩🇪 Deutsch (DE)" },
    { code: "ES", label: "🇪🇸 Español (ES)" },
  ]

  const navVariants: Variants = {
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 26,
        mass: 0.65,
      },
    },
    hidden: {
      y: -85,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  // Active full background state
  const showFullNavBg = isScrolled || mobileMenuOpen

  return (
    <LayoutGroup id="navbar-frosted-surface">
      <motion.header
        variants={navVariants}
        initial="visible"
        animate={hidden && !mobileMenuOpen ? "hidden" : "visible"}
        className="sticky top-0 z-50 w-full px-3 sm:px-6 pt-2 pb-1.5 transition-colors pointer-events-auto"
      >
        <div
          className={cn(
            "relative mx-auto flex items-center justify-between rounded-2xl transition-all duration-300",
            showFullNavBg
              ? "max-w-[1380px] px-3.5 sm:px-6 py-1.5 sm:py-2"
              : "max-w-[1440px] px-3 sm:px-8 py-1.5 sm:py-2 bg-transparent"
          )}
        >
          {/* Frosted Glass Background for Full Navbar (Animates from logo background when top-of-the-page = false) */}
          {showFullNavBg && (
            <motion.div
              layoutId="nav-frosted-glass-pill"
              className="absolute inset-0 bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/80 ring-1 ring-black/[0.05] shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.95),inset_0_-1px_1px_0_rgba(0,0,0,0.02),0_8px_32px_-4px_rgba(0,0,0,0.07)] rounded-2xl pointer-events-none"
              transition={{
                type: "spring",
                stiffness: 240,
                damping: 26,
                mass: 0.7,
              }}
            />
          )}

          {/* Logo with Name Container */}
          <div className="relative flex items-center shrink-0">
            {/* Frosted Glass Background for Logo with Name (Present at top of the page, animates to expand into whole nav) */}
            {!showFullNavBg && (
              <motion.div
                layoutId="nav-frosted-glass-pill"
                className="absolute inset-0 bg-white/70 backdrop-blur-2xl backdrop-saturate-150 border border-white/80 ring-1 ring-black/[0.05] shadow-[inset_0_1px_1.5px_0_rgba(255,255,255,0.95),0_4px_16px_-2px_rgba(0,0,0,0.06)] rounded-xl pointer-events-none"
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 26,
                  mass: 0.7,
                }}
              />
            )}

            <a
              href="/"
              className="relative z-10 flex items-center gap-2 px-3 sm:px-3.5 py-1.5 transition-transform hover:scale-105"
            >
              <img
                src="/zineps-logo.svg"
                alt="Zineps Logo"
                className="h-6 sm:h-7 w-auto object-contain"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src = "/zineps-logo-black.svg"
                }}
              />
            </a>
          </div>

          {/* Desktop Navigation - Reduced Text Size by 1-2 units */}
          <nav className="relative z-10 hidden md:flex items-center gap-1.5 lg:gap-3">
            {/* Products Dropdown */}
            <div className="relative group">
              <button className="px-2.5 py-1.5 text-xs lg:text-sm text-neutral-700 hover:text-black hover:bg-black/[0.04] rounded-lg flex items-center gap-1 font-medium transition-colors">
                Products
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-1.5 min-w-[18.5rem] max-w-[min(100vw-2rem,24rem)] bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-2xl rounded-2xl transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1.5 group-hover:translate-y-0 p-1.5 z-50">
                <a
                  href="#process-tabs"
                  className="block px-3.5 py-2 text-xs sm:text-sm text-neutral-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors leading-snug font-medium"
                >
                  Shipping for e-commerce and SMBs
                </a>
                <a
                  href="#logistics-os"
                  className="block px-3.5 py-2 text-xs sm:text-sm text-neutral-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors leading-snug font-medium border-t border-gray-100"
                >
                  Platform for logistics providers
                </a>
                <a
                  href="#shipping-ai"
                  className="flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm text-neutral-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors leading-snug font-semibold border-t border-gray-100"
                >
                  <span>Shipping AI</span>
                  <span className="px-1.5 py-0.5 text-[9px] rounded bg-sky-100 text-sky-900 font-medium">
                    Beta
                  </span>
                </a>
              </div>
            </div>

            <a
              href="#integrations"
              className="px-2.5 py-1.5 text-xs lg:text-sm text-neutral-700 hover:text-black hover:bg-black/[0.04] rounded-lg font-medium transition-colors"
            >
              Integrations
            </a>
            <a
              href="#partner-rates"
              className="px-2.5 py-1.5 text-xs lg:text-sm text-neutral-700 hover:text-black hover:bg-black/[0.04] rounded-lg font-medium transition-colors"
            >
              Pricing
            </a>
            <a
              href="https://www.zineps.com/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 text-xs lg:text-sm text-neutral-700 hover:text-black hover:bg-black/[0.04] rounded-lg font-medium transition-colors"
            >
              Blog
            </a>

            {/* Knowledge Base Dropdown */}
            <div className="relative group">
              <button className="px-2.5 py-1.5 text-xs lg:text-sm text-neutral-700 hover:text-black hover:bg-black/[0.04] rounded-lg flex items-center gap-1 font-medium transition-colors">
                Knowledge Base
                <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-1.5 w-52 bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-2xl rounded-2xl transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-1.5 group-hover:translate-y-0 p-1.5 z-50">
                <a
                  href="#faq"
                  className="block px-3.5 py-2 text-xs sm:text-sm text-neutral-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors font-medium"
                >
                  Overview
                </a>
                <a
                  href="https://www.zineps.com/knowledge-base/helpcenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3.5 py-2 text-xs sm:text-sm text-neutral-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors font-medium"
                >
                  Help Center
                </a>
                <div className="flex items-center justify-between px-3.5 py-2 text-xs text-gray-400">
                  <span>Use Cases</span>
                  <span className="px-1.5 py-0.5 text-[9px] rounded bg-yellow-100 text-yellow-800 font-medium">
                    Coming soon
                  </span>
                </div>
                <a
                  href="https://www.zineps.com/knowledge-base/api-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3.5 py-2 text-xs sm:text-sm text-neutral-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors font-medium border-t border-gray-100"
                >
                  API Documentation
                </a>
              </div>
            </div>
          </nav>

          {/* Right CTA and Language */}
          <div className="relative z-10 hidden md:flex items-center gap-3">
            {/* Language Picker */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="h-8 px-2.5 border border-gray-200/90 rounded-lg text-xs font-medium text-neutral-700 hover:bg-black/[0.03] transition-colors flex items-center gap-1"
              >
                {currentLang}
                <ChevronDown className="w-3 h-3 text-neutral-500" />
              </button>
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1.5 w-44 bg-white/95 backdrop-blur-xl border border-gray-200/90 shadow-xl rounded-xl p-1 z-50"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setCurrentLang(l.label.split(" ")[0] + " " + l.code)
                          setLangMenuOpen(false)
                        }}
                        className="block w-full px-2.5 py-1.5 text-xs text-left text-neutral-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-lg transition-colors font-medium"
                      >
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sign Up Button - Shortened Sleek Height */}
            <a
              href="https://app.zineps.com/Account/Register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center font-semibold text-xs sm:text-sm text-neutral-900 h-8 sm:h-8.5 px-3.5 sm:px-4 rounded-lg bg-gradient-to-br from-[#70CAB9] to-white hover:brightness-95 transition-all shadow-xs border border-[#70CAB9]/40 hover:scale-[1.02]"
            >
              Sign up
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="relative z-10 md:hidden p-1.5 text-neutral-700 hover:text-black hover:bg-black/[0.04] rounded-lg focus:outline-none transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-2 mx-auto max-w-[1440px] bg-white/95 backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/80 shadow-2xl p-4 flex flex-col gap-2.5"
            >
              <a
                href="#process-tabs"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 hover:bg-gray-100/80 rounded-lg transition-colors"
              >
                Shipping for e-commerce and SMBs
              </a>
              <a
                href="#logistics-os"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 hover:bg-gray-100/80 rounded-lg transition-colors"
              >
                Platform for logistics providers
              </a>
              <a
                href="#shipping-ai"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 hover:bg-gray-100/80 rounded-lg flex items-center justify-between transition-colors"
              >
                <span>Shipping AI</span>
                <span className="px-1.5 py-0.5 text-[9px] rounded bg-sky-100 text-sky-900 font-medium">
                  Beta
                </span>
              </a>
              <a
                href="#integrations"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 hover:bg-gray-100/80 rounded-lg transition-colors"
              >
                Integrations
              </a>
              <a
                href="#partner-rates"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 hover:bg-gray-100/80 rounded-lg transition-colors"
              >
                Pricing
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs sm:text-sm font-medium text-neutral-800 hover:bg-gray-100/80 rounded-lg transition-colors"
              >
                FAQ
              </a>
              <div className="pt-2 border-t border-gray-200/80 flex flex-col gap-2">
                <a
                  href="https://app.zineps.com/Account/Register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-center font-semibold text-xs sm:text-sm text-neutral-900 py-2.5 rounded-lg bg-gradient-to-br from-[#70CAB9] to-white shadow-xs border border-[#70CAB9]/40"
                >
                  Sign up
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </LayoutGroup>
  )
}
