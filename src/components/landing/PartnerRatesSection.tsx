export function PartnerRatesSection() {
  return (
    <section id="partner-rates" className="relative py-14 md:py-20">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        <div
          className="rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl"
          style={{
            background:
              "linear-gradient(to bottom, #60948A 0%, #4a7569 50%, #3d5f56 100%)",
          }}
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center relative z-10">
            {/* Left Content */}
            <div className="flex flex-col">
              <div className="inline-block mb-6">
                <span className="px-4 py-2 rounded-full bg-white/20 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                  PARTNER SHIPPING RATES
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                Their buying power becomes yours
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-[540px]">
                Logistics partners on Zineps already have high-volume deals with DHL, PostNL, DPD, and dozens of others. We match you with the partner whose lanes fit your store best. Use partner shipping rates, your own contracts, or both, from a single unified dashboard.
              </p>

              {/* Stats Counters */}
              <div className="flex flex-wrap gap-6 sm:gap-10 md:gap-12">
                <div className="flex flex-col">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2">
                    +20
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider font-medium">
                    Shipping Partners
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2">
                    +200
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider font-medium">
                    Destination Countries
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2">
                    +1000
                  </div>
                  <div className="text-xs md:text-sm text-white/80 uppercase tracking-wider font-medium">
                    Shipping Methods
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4">
                <a
                  href="https://app.zineps.com/Account/Register/new/7/SD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center font-semibold text-[#3d5f56] bg-white hover:bg-white/90 h-12 px-7 rounded-xl shadow-md transition-all hover:scale-105"
                >
                  Start for free
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center justify-center font-medium text-white border border-white/60 hover:bg-white/15 h-12 px-7 rounded-xl transition-all hover:scale-105"
                >
                  How partner rates work
                </a>
              </div>
            </div>

            {/* Right Mockup */}
            <div className="relative flex items-center justify-center h-full">
              <div className="relative w-full max-w-[620px] overflow-hidden rounded-2xl md:rounded-3xl shadow-2xl bg-white/95 border border-white/20 p-1">
                <img
                  src="/carrier-broker-mockup.svg"
                  alt="Zineps partner rates and carrier broker mockup"
                  className="w-full h-auto object-contain select-none"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
