import { Sparkles, ArrowRight } from "lucide-react"
import { HoverButton } from "@/components/ui/hover-button"

export function ShippingAiBanner() {
  return (
    <section id="shipping-ai" className="py-10 md:py-16">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        <div
          className="rounded-3xl p-8 sm:p-12 md:p-14 relative overflow-hidden shadow-xl"
          style={{
            background:
              "linear-gradient(135deg, #2b453e 0%, #3d5f56 50%, #1e312c 100%)",
          }}
        >
          {/* Animated decorative glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#70CAB9]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#70CAB9]" />
                <span>Shipping AI</span>
                <span className="px-1.5 py-0.2 text-[10px] rounded bg-sky-400/20 text-sky-200 font-medium">
                  Beta
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 tracking-tight">
                Predict delays. Choose better routes. Pay less.
              </h2>

              <p className="text-base sm:text-lg text-white/85 leading-relaxed">
                Shipping AI is the intelligence in the layer. It dynamically recommends the most cost-effective carrier, route, and guaranteed delivery speed for every single parcel.
              </p>
            </div>

            <div className="flex-shrink-0">
              <HoverButton
                href="https://app.zineps.com/Account/Register"
                target="_blank"
                rel="noopener noreferrer"
                variant="white"
                size="md"
                className="shadow-lg group"
              >
                <span>Discover Shipping AI</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </HoverButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
