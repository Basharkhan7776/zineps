import { CheckCircle2 } from "lucide-react"

export function LogisticsOsSection() {
  return (
    <section id="logistics-os" className="relative py-16 md:py-24">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-[#70CAB9]/15 text-[#3d5f56] text-xs font-semibold uppercase tracking-wider">
                For Logistics Providers
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#424242] mb-6 leading-tight tracking-tight">
              The operating system for logistics service providers
            </h2>

            <p className="w-full max-w-[520px] text-base md:text-lg lg:text-xl text-[#525151] leading-relaxed mb-6">
              Publish rates, manage contracts and margins, automate invoicing, streamline merchant support, and onboard the shippers you already serve. They ship in Zineps. You maintain the direct commercial relationship.
            </p>

            <ul className="w-full max-w-[520px] space-y-3 mb-8">
              {[
                "Publish rates, lanes, and custom shipping rules",
                "Manage contracts, customer tiers, and profit margins",
                "Automate billing and invoice generation per merchant or parcel",
                "Easily onboard your existing merchants onto Zineps",
                "Retain 100% of your commercial customer relationships",
              ].map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm md:text-base text-[#525151] leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#60948A] mt-0.5 flex-shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div>
              <a
                href="https://app.zineps.com/Account/Register"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-semibold text-gray-900 bg-gradient-to-br from-[#70CAB9] to-white hover:bg-[#d7f0ea] h-12 px-7 rounded-xl shadow-md transition-all hover:scale-105 border border-[#70CAB9]/30"
              >
                Become a partner
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <div className="relative overflow-hidden rounded-2xl bg-white p-3 shadow-xl border border-gray-200">
              <img
                src="/zineps-partnerpanel.svg"
                alt="Partner Panel mockup"
                className="w-full h-auto object-contain select-none"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
            </div>

            <div className="mt-6">
              <p className="text-xs sm:text-sm font-semibold text-[#6B7280] mb-3 text-center uppercase tracking-wider">
                Built for:
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <span className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                  Logistics service providers
                </span>
                <span className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                  Freight forwarders
                </span>
                <span className="px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                  3PLs
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
