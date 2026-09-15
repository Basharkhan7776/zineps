import { ArrowRight } from "lucide-react"
import { HoverButton } from "@/components/ui/hover-button"

export function CtaSection() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        {/* Top Dual Audience Callout */}
        <div className="mb-16 rounded-3xl bg-gradient-to-br from-[#E6FAF5]/60 via-white to-zinc-50 border border-[#70CAB9]/25 p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0f7f75]">
              Software, network and intelligence
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#424242] mt-2 mb-3">
              Start where you are
            </h3>
            <p className="text-[#525151] text-base leading-relaxed">
              Merchants start shipping within minutes, with discounted partner rates included. Logistics partners digitize their offering and onboard their merchants seamlessly.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold text-[#424242] mb-2">
                  For companies that ship
                </h4>
                <p className="text-sm text-[#525151] leading-relaxed mb-6">
                  Start shipping within minutes, with partner shipping rates, your own carrier contracts, or both.
                </p>
              </div>
              <div>
                <HoverButton
                  href="https://app.zineps.com/Account/Register"
                  target="_blank"
                  rel="noopener noreferrer"
                  size="md"
                  className="h-10 px-5 text-sm"
                >
                  <span>Start shipping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </HoverButton>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-200/80 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-bold text-[#424242] mb-2">
                  For logistics partners
                </h4>
                <p className="text-sm text-[#525151] leading-relaxed mb-6">
                  Digitize your offering, serve existing clients better, and bring them over to Zineps.
                </p>
              </div>
              <div>
                <HoverButton
                  href="#logistics-os"
                  variant="secondary"
                  size="md"
                  className="h-10 px-5 text-sm"
                >
                  <span>I am a logistics partner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </HoverButton>
              </div>
            </div>
          </div>
        </div>

        {/* Main CTA: Direct aan de slag? */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Left Column (6 cols) */}
          <div className="lg:col-span-6 flex flex-col">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#424242] mb-6 leading-tight tracking-tight">
              Ready to get started?
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#525151] mb-8 leading-relaxed max-w-lg">
              Create an account now to get started right away, or get in touch with us for a custom solution tailored to your business.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <HoverButton
                href="https://app.zineps.com/Account/Register"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="shadow-md"
              >
                Start your free trial
              </HoverButton>
              <HoverButton
                href="mailto:info@zineps.com"
                variant="outline"
                size="lg"
              >
                Contact us
              </HoverButton>
            </div>
          </div>

          {/* Right Column: Pricing and Integrations quick cards (6 cols) */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row gap-6">
            {/* Card 1: Pricing */}
            <div className="flex-1 p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="mb-4">
                <img
                  src="/cta-icon.svg"
                  alt="Pricing"
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-bold text-[#424242] mb-2">
                Know exactly what you pay
              </h3>
              <p className="text-sm text-[#525151] mb-6 leading-relaxed">
                Clear and transparent pricing with zero hidden fees.
              </p>
              <a
                href="#partner-rates"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f7f75] hover:text-[#0b5f58] transition-colors"
              >
                <span>Pricing</span>
                <img
                  src="/arrow-forward.svg"
                  alt="arrow"
                  className="w-4 h-4 object-contain"
                />
              </a>
            </div>

            {/* Card 2: Integration */}
            <div className="flex-1 p-6 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-md transition-all">
              <div className="mb-4">
                <img
                  src="/start-integration.svg"
                  alt="Integrations"
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg font-bold text-[#424242] mb-2">
                Start integrating now
              </h3>
              <p className="text-sm text-[#525151] mb-6 leading-relaxed">
                Get up and running with Zineps in under 10 minutes.
              </p>
              <a
                href="#integrations"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f7f75] hover:text-[#0b5f58] transition-colors"
              >
                <span>Integrations</span>
                <img
                  src="/arrow-forward.svg"
                  alt="arrow"
                  className="w-4 h-4 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
