import { useState } from "react"
import { X, ArrowRight } from "lucide-react"

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="relative isolate overflow-hidden z-20 bg-gradient-to-r from-[#E6FAF5]/90 via-white/85 to-[#E6FAF5]/90 backdrop-blur-md border-y border-[#70CAB9]/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),inset_0_-1px_0_0_rgba(0,0,0,0.03),0_1px_2px_0_rgba(0,0,0,0.02)] transition-all">
      {/* Coss.com Top & Bottom Neomorphic Accent Lines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#70CAB9]/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#70CAB9]/40 to-transparent"
      />

      {/* Padded Container aligned with page margin */}
      <div className="relative w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">

        <div className="flex items-center justify-between gap-3 py-1 sm:py-1.5 px-2 sm:px-4">
          <div className="flex items-center flex-wrap gap-2 text-xs sm:text-[13px]">
            <p className="text-xs sm:text-[13px] text-[#424242] leading-tight font-normal">
              We have successfully closed our post-seed funding round.{" "}
              <a
                href="https://www.zineps.com/newsroom/late-seed"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#0f7f75] hover:text-[#0a5750] underline underline-offset-2 decoration-[#70CAB9]/50 hover:decoration-[#0f7f75] transition-all ml-1"
              >
                <span>Read more</span>
                <ArrowRight className="w-3 h-3 inline" />
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="flex-shrink-0 inline-flex items-center justify-center size-5 sm:size-5.5 rounded-md border border-transparent hover:border-[#70CAB9]/30 hover:bg-white/70 text-[#0f7f75] transition-all hover:shadow-xs focus:outline-none focus:ring-1 focus:ring-[#70CAB9]/40"
            aria-label="Close banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
