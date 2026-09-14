import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("🇬🇧 EN")
  const [langMenuOpen, setLangMenuOpen] = useState(false)

  const languages = [
    { code: "EN", label: "🇬🇧 English (EN)" },
    { code: "NL", label: "🇳🇱 Nederlands (NL)" },
    { code: "DE", label: "🇩🇪 Deutsch (DE)" },
    { code: "ES", label: "🇪🇸 Español (ES)" },
  ]

  return (
    <header className="relative z-50 max-w-[1440px] mx-auto px-4 sm:px-8 py-6 transition-all duration-300 bg-transparent">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <img
            src="/zineps-logo.svg"
            alt="Zineps Logo"
            className="h-8 w-auto object-contain"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src = "/zineps-logo-black.svg"
            }}
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-10">
          {/* Products Dropdown */}
          <div className="relative group">
            <button className="px-3.5 py-2 text-base lg:text-lg text-gray-800 hover:text-black hover:bg-black/[0.04] rounded-xl flex items-center gap-1.5 font-medium transition-all">
              Products
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 min-w-[18.5rem] max-w-[min(100vw-2rem,24rem)] bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 p-2 z-50">
              <a
                href="#process-tabs"
                className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors leading-snug font-medium"
              >
                Shipping for e-commerce and SMBs
              </a>
              <a
                href="#logistics-os"
                className="block px-4 py-2.5 text-sm text-gray-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors leading-snug font-medium border-t border-gray-100"
              >
                Platform for logistics providers
              </a>
              <a
                href="#shipping-ai"
                className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors leading-snug font-semibold border-t border-gray-100"
              >
                <span>Shipping AI</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-sky-100 text-sky-900 font-medium">
                  Beta
                </span>
              </a>
            </div>
          </div>

          <a
            href="#integrations"
            className="px-3.5 py-2 text-base lg:text-lg text-gray-800 hover:text-black hover:bg-black/[0.04] rounded-xl font-medium transition-all"
          >
            Integrations
          </a>
          <a
            href="#partner-rates"
            className="px-3.5 py-2 text-base lg:text-lg text-gray-800 hover:text-black hover:bg-black/[0.04] rounded-xl font-medium transition-all"
          >
            Pricing
          </a>
          <a
            href="https://www.zineps.com/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 text-base lg:text-lg text-gray-800 hover:text-black hover:bg-black/[0.04] rounded-xl font-medium transition-all"
          >
            Blog
          </a>

          {/* Knowledge Base Dropdown */}
          <div className="relative group">
            <button className="px-3.5 py-2 text-base lg:text-lg text-gray-800 hover:text-black hover:bg-black/[0.04] rounded-xl flex items-center gap-1.5 font-medium transition-all">
              Knowledge Base
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-52 bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 p-2 z-50">
              <a
                href="#faq"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors"
              >
                Overview
              </a>
              <a
                href="https://www.zineps.com/knowledge-base/helpcenter"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors"
              >
                Help Center
              </a>
              <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-400">
                <span>Use Cases</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-yellow-100 text-yellow-800 font-medium">
                  Coming soon
                </span>
              </div>
              <a
                href="https://www.zineps.com/knowledge-base/api-docs"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 text-sm text-gray-800 hover:bg-[#E6FAF5] hover:text-[#0f7f75] rounded-xl transition-colors border-t border-gray-100"
              >
                API Documentation
              </a>
            </div>
          </div>
        </nav>

        {/* Right CTA and Language */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Picker */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
            >
              {currentLang}
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-xl rounded-xl p-1.5 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setCurrentLang(l.label.split(" ")[0] + " " + l.code)
                      setLangMenuOpen(false)
                    }}
                    className="block w-full px-3 py-2 text-sm text-left text-gray-800 hover:bg-[#E6FAF5] rounded-lg transition-colors"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sign Up Button */}
          <a
            href="https://app.zineps.com/Account/Register"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-semibold text-gray-900 h-11 px-5 rounded-lg bg-gradient-to-br from-[#70CAB9] to-white hover:brightness-95 transition-all shadow-sm border border-[#70CAB9]/30"
          >
            Sign up
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-800 hover:text-gray-900 rounded-lg focus:outline-none"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-6 pt-2 bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-2xl p-4 flex flex-col gap-3">
          <a
            href="#process-tabs"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Shipping for e-commerce and SMBs
          </a>
          <a
            href="#logistics-os"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Platform for logistics providers
          </a>
          <a
            href="#shipping-ai"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-lg flex items-center justify-between"
          >
            <span>Shipping AI</span>
            <span className="px-1.5 py-0.5 text-[10px] rounded bg-sky-100 text-sky-900 font-medium">
              Beta
            </span>
          </a>
          <a
            href="#integrations"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Integrations
          </a>
          <a
            href="#partner-rates"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            Pricing
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            FAQ
          </a>
          <div className="pt-2 border-t border-gray-200 flex flex-col gap-3">
            <a
              href="https://app.zineps.com/Account/Register"
              target="_blank"
              rel="noopener noreferrer"
              className="text-center font-semibold text-gray-900 py-3 rounded-lg bg-gradient-to-br from-[#70CAB9] to-white shadow-sm border border-[#70CAB9]/30"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
