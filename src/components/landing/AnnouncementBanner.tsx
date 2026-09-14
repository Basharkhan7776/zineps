import { useState } from "react"
import { Sparkles, X, ArrowRight } from "lucide-react"

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
        {/* Coss.com Vertical Guide Lines going Up & Down */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-4 sm:left-6 md:left-[73px] w-px bg-gradient-to-b from-[#70CAB9]/35 via-[#70CAB9]/15 to-[#70CAB9]/35"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-4 sm:right-6 md:right-[73px] w-px bg-gradient-to-b from-[#70CAB9]/35 via-[#70CAB9]/15 to-[#70CAB9]/35"
        />

        {/* Coss.com Signature Corner Pips at Line Intersections */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[3px] left-[13px] sm:left-[21px] md:left-[70px] size-1.5 rounded-[1px] border border-[#70CAB9]/50 bg-white shadow-xs"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[3px] left-[13px] sm:left-[21px] md:left-[70px] size-1.5 rounded-[1px] border border-[#70CAB9]/50 bg-white shadow-xs"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[3px] right-[13px] sm:right-[21px] md:right-[70px] size-1.5 rounded-[1px] border border-[#70CAB9]/50 bg-white shadow-xs"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[3px] right-[13px] sm:right-[21px] md:right-[70px] size-1.5 rounded-[1px] border border-[#70CAB9]/50 bg-white shadow-xs"
        />

        <div className="flex items-center justify-between gap-3 py-2 sm:py-2.5 px-3 sm:px-4">
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3 text-sm">
            {/* Neomorphic Coss.com Style Pill Badge */}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-[#0f7f75] bg-white/90 border border-[#70CAB9]/35 shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.9)]">
              <Sparkles className="w-3 h-3 text-[#0f7f75]" />
              <span>Announcement</span>
            </span>

            <p className="text-sm text-[#424242] leading-normal font-normal">
              We have successfully closed our post-seed funding round.{" "}
              <a
                href="https://www.zineps.com/newsroom/late-seed"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-[#0f7f75] hover:text-[#0a5750] underline underline-offset-4 decoration-[#70CAB9]/50 hover:decoration-[#0f7f75] transition-all ml-1"
              >
                <span>Read more</span>
                <ArrowRight className="w-3.5 h-3.5 inline" />
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={() => setVisible(false)}
            className="flex-shrink-0 inline-flex items-center justify-center size-7 rounded-lg border border-transparent hover:border-[#70CAB9]/30 hover:bg-white/70 text-[#0f7f75] transition-all hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-[#70CAB9]/40"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
