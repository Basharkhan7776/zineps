import { Layers, Network, LineChart, Globe2, Zap } from "lucide-react"

export function BentoFeatures() {
  return (
    <section className="py-16 md:py-24 relative">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6FAF5] text-[#0f7f75] text-xs font-semibold uppercase tracking-wider mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#424242] tracking-tight leading-tight">
            Everything you need for successful shipping
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#525151]">
            No hassle with fragmented systems. Everything you need to optimize and scale your logistics in one central place.
          </p>
        </div>

        {/* Bento Grid 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: One platform for everything */}
          <div className="rounded-3xl border border-[#60948A]/20 bg-gradient-to-br from-white via-zinc-50/50 to-[#E6FAF5]/30 p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 text-[#60948A] text-sm font-semibold mb-6">
                <Layers className="w-5 h-5" />
                <span>One platform for everything</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#424242] mb-3">
                Manage all shipments, returns, and logistics
              </h3>
              <p className="text-base text-[#525151] leading-relaxed max-w-md">
                Eliminate complex spreadsheets and siloed software. Connect your accounts, choose optimal carriers, and maintain total visibility from one intuitive dashboard.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Real-time status tracking</span>
              </div>
              <span className="text-xs font-semibold text-[#0f7f75] bg-[#E6FAF5] px-3 py-1 rounded-full">
                All-in-one
              </span>
            </div>
          </div>

          {/* Card 2: Fast integrations */}
          <div className="rounded-3xl border border-[#60948A]/20 bg-zinc-50/50 p-8 sm:p-10 shadow-sm flex flex-col justify-between overflow-hidden relative hover:shadow-md transition-shadow">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#60948A] text-sm font-semibold mb-6">
                <Network className="w-5 h-5" />
                <span>Fast integrations</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#424242] mb-3">
                Connect within minutes to your store or WMS
              </h3>
              <p className="text-base text-[#525151] leading-relaxed max-w-md">
                Integrate effortlessly with Shopify, WooCommerce, Bol, Amazon, Exact, and dozens more platforms through our pre-built plugins or developer REST APIs.
              </p>
            </div>

            <div className="relative mt-8 flex justify-center items-center">
              <img
                src="/integrations-mockup.svg"
                alt="Integrations with platforms, marketplaces and WMS systems"
                className="w-full max-w-[420px] h-auto object-contain rounded-xl drop-shadow-md"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 3: Analytics */}
          <div className="rounded-3xl border border-[#60948A]/20 bg-zinc-50/50 p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 text-[#60948A] text-sm font-semibold mb-6">
                <LineChart className="w-5 h-5" />
                <span>Analytics</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#424242] mb-3">
                Real-time insights &amp; data-driven decisions
              </h3>
              <p className="text-base text-[#525151] leading-relaxed max-w-md">
                Track shipping performance across all carriers in real time. Gain actionable intelligence to cut transit times and trim parcel expenses.
              </p>
            </div>

            {/* Analytics metric badge */}
            <div className="mt-8 p-5 bg-white rounded-2xl border border-gray-200/80 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Shipments this month
                </span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +1,234 parcels
                </span>
              </div>
              <div className="text-4xl font-extrabold text-[#424242]">12,847</div>
              <div className="mt-3 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="bg-[#60948A] h-2 rounded-full w-[82%]" />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
                <span>99.4% Delivery success</span>
                <span>Avg. transit 22h</span>
              </div>
            </div>
          </div>

          {/* Card 4: Worldwide coverage & Uptime */}
          <div className="rounded-3xl border border-[#60948A]/20 bg-gradient-to-br from-white via-zinc-50/50 to-[#E6FAF5]/30 p-8 sm:p-10 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-2 text-[#60948A] text-sm font-semibold mb-6">
                <Globe2 className="w-5 h-5" />
                <span>Global Coverage &amp; Uptime</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#424242] mb-3">
                Ship to more than 200+ countries worldwide
              </h3>
              <p className="text-base text-[#525151] leading-relaxed max-w-md mb-6">
                Access Tier-1 global carriers and trusted regional postal services with an enterprise-grade 99.9% uptime guarantee.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-gray-100 text-center">
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/60">
                <div className="text-xl sm:text-2xl font-bold text-[#424242]">200+</div>
                <div className="text-xs text-gray-500 font-medium">Countries</div>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/60">
                <div className="text-xl sm:text-2xl font-bold text-[#424242]">50+</div>
                <div className="text-xs text-gray-500 font-medium">Carriers</div>
              </div>
              <div className="p-3 bg-white/80 rounded-xl border border-gray-200/60">
                <div className="text-xl sm:text-2xl font-bold text-[#424242]">99.9%</div>
                <div className="text-xs text-gray-500 font-medium">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
