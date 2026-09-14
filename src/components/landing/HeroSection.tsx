import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import GradientWaves from "@/components/GradientWaves"

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden pb-8 md:pb-16">

      <div className="relative z-10 max-w-[1440px] mx-auto px-4">
        {/* Aceternity 3D Perspective Tablet Scroll Hero with enhanced X/Z movement and top depth */}
        <ContainerScroll
          titleComponent={
            <div className="relative mx-auto w-full max-w-5xl text-center flex flex-col items-center pt-2 md:pt-6">
              <span className="block text-base sm:text-xl md:text-2xl text-neutral-700 font-medium tracking-tight">
                For companies that ship, and the logistics partners that transport their goods
              </span>

              <h1 className="mt-2 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#424242] tracking-tight leading-[1.1]">
                <span className="block">The intelligent layer</span>
                <span className="block bg-gradient-to-r from-[#1c3833] via-[#3d5f56] to-[#60948A] bg-clip-text text-transparent">
                  for logistics
                </span>
              </h1>

              <p className="mt-5 mx-auto max-w-2xl text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
                One infrastructure with a dashboard and API. Leverage competitive shipping rates from our network of logistics providers, connect your own carrier contracts, or both. Our intelligent matching engine pairs you with partners who already have high-volume deals with DHL, PostNL, DPD, and dozens of others.
              </p>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://app.zineps.com/Account/Register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-xl font-semibold text-sm sm:text-base text-gray-900 bg-gradient-to-br from-[#70CAB9] to-white hover:bg-[#d7f0ea] shadow-md transition-all hover:scale-105 border border-[#70CAB9]/40"
                >
                  Start shipping
                </a>
                <a
                  href="#logistics-os"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-xl font-semibold text-sm sm:text-base text-gray-800 bg-white/80 hover:bg-white border border-gray-300 shadow-sm transition-all hover:scale-105"
                >
                  I am a logistics partner
                </a>
              </div>
            </div>
          }
        >
          <img
            src="/zineps-dashboard.svg"
            alt="Zineps dashboard"
            className="w-full h-full object-cover object-top select-none pointer-events-none"
            loading="lazy"
          />
        </ContainerScroll>
      </div>
    </section>
  )
}
