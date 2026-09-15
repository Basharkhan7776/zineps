import { useState, useRef, useEffect } from "react"
import { motion, type Variants } from "framer-motion"
import SideRays from "@/components/SideRays"

function ZinepsEmblem({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-3 -3 32 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient
          id="zinepsEmblemGrad"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#0f7f75" />
          <stop offset="55%" stopColor="#177569" />
          <stop offset="100%" stopColor="#70CAB9" />
        </linearGradient>
      </defs>
      <path
        d="M15.5958 16.7477C15.5204 16.8209 15.354 16.7971 15.1167 16.6919C14.3808 16.3695 12.9646 15.2683 11.4775 13.8259C9.97816 12.3703 8.83928 10.9861 8.51683 10.2768C8.41494 10.0539 8.3943 9.89802 8.46717 9.82728C8.7735 9.5299 10.6166 10.839 12.5855 12.7497C14.5537 14.661 15.9021 16.4503 15.5958 16.7477Z"
        fill="url(#zinepsEmblemGrad)"
      />
      <path
        d="M6.7769 21.009L5.95854 20.2077C6.30871 19.8708 6.695 19.4996 7.06646 19.1446C8.17051 18.0916 9.64474 17.7955 11.6658 17.6596C11.7381 17.654 11.8116 17.6484 11.8844 17.6396C12.1669 17.6052 12.4371 17.5407 12.688 17.448C13.0678 17.3084 13.5715 17.0768 14.0648 16.7062C13.2542 16.1734 12.1824 15.2819 11.0777 14.2101C9.96525 13.1302 9.04305 12.0846 8.49554 11.2958C8.11248 11.776 7.87258 12.2649 7.72941 12.6331C7.63848 12.8672 7.57335 13.1195 7.53659 13.3831C7.52627 13.4632 7.51788 13.5496 7.51015 13.6354C7.40116 15.1648 7.18318 16.9046 5.98111 18.0922C5.64189 18.4272 5.28849 18.774 4.96153 19.0939L4.13672 18.2995C4.46239 17.9808 4.81515 17.6346 5.15307 17.3015C5.98691 16.4777 6.23003 15.2556 6.35192 13.5502C6.36159 13.4407 6.37127 13.3393 6.38481 13.2385C6.43382 12.8847 6.52088 12.5485 6.64277 12.2349C6.8846 11.6145 7.3515 10.713 8.20211 9.93791C8.33948 9.8127 8.53101 9.76011 8.71545 9.79642C8.89989 9.83273 9.05531 9.95419 9.1314 10.1213C9.36872 10.6428 10.3361 11.8956 11.8999 13.4131C13.4599 14.9263 14.7213 15.8503 15.2792 16.0945C15.4501 16.1696 15.5732 16.3199 15.61 16.4989C15.6467 16.678 15.5919 16.8627 15.4629 16.9954C14.6652 17.818 13.7379 18.2694 13.1001 18.5036C12.7641 18.6275 12.4036 18.7139 12.0302 18.759C11.9399 18.7702 11.849 18.7771 11.7593 18.7847C11.7574 18.7847 11.7484 18.7853 11.7464 18.7859C9.98975 18.9042 8.73093 19.1396 7.8816 19.9497C7.51144 20.3028 7.12579 20.6728 6.7769 21.009Z"
        fill="url(#zinepsEmblemGrad)"
      />
      <path
        d="M12.8463 24.9538C10.0159 24.9538 7.17578 24.0448 4.81419 22.2004L4.30859 21.8054L4.92124 21.2137C5.14308 20.999 5.52679 20.6284 5.9679 20.2033L6.78627 21.0046C6.51477 21.2663 6.26455 21.5074 6.06141 21.704C10.6775 24.9206 17.0362 24.4467 21.1054 20.4957C25.1753 16.5459 25.6642 10.3737 22.3501 5.89239C22.038 6.19665 21.633 6.59231 21.2125 7.00488L20.3857 6.21167C20.9642 5.64384 21.5143 5.10795 21.8329 4.79742L22.4546 4.19141L22.8615 4.68223C26.9739 9.64431 26.5722 16.7857 21.927 21.2933C19.4281 23.7198 16.1436 24.9538 12.8463 24.9538Z"
        fill="url(#zinepsEmblemGrad)"
      />
      <path
        d="M16.9847 15.2729C16.8589 15.2729 16.7332 15.2335 16.628 15.154C15.475 14.2831 14.2407 13.2157 13.0586 12.0675C11.9648 11.0064 10.9337 9.89264 10.0772 8.84713C9.90505 8.63678 9.90956 8.3369 10.0888 8.13156C10.9201 7.17808 11.9429 6.66534 12.6549 6.4024C12.996 6.27719 13.3559 6.19143 13.7254 6.14635C13.8241 6.13571 13.9131 6.12757 14.004 6.12005C15.7665 6.00173 17.0259 5.76571 17.8746 4.9556C18.0616 4.77717 18.2525 4.59437 18.4402 4.41406L19.2573 5.21666C19.0683 5.39759 18.8768 5.58102 18.6891 5.7607C17.4658 6.92766 15.6736 7.13927 14.0898 7.2457C14.0175 7.25133 13.9401 7.25884 13.8615 7.26698C13.5906 7.30016 13.3204 7.36464 13.0663 7.45792C12.5749 7.63948 11.9029 7.96503 11.3019 8.52409C12.0641 9.42498 12.9477 10.3666 13.8795 11.27C14.8952 12.2566 15.9477 13.18 16.9486 13.9626C17.5115 13.3841 17.8404 12.7412 18.0242 12.271C18.1145 12.0387 18.1803 11.7852 18.2183 11.5191C18.228 11.4452 18.2364 11.3614 18.2422 11.2775C18.3841 9.31417 18.6891 7.88301 19.7732 6.81247C19.9737 6.61401 20.1801 6.41117 20.3826 6.21271L21.2087 7.00592C21.0069 7.20375 20.8018 7.40596 20.6019 7.60317C19.7687 8.42643 19.5249 9.64911 19.4017 11.3557C19.3946 11.4603 19.3837 11.5661 19.3701 11.6681C19.3192 12.0243 19.2321 12.3593 19.1109 12.6704C18.7285 13.6483 18.1236 14.5004 17.3626 15.1364C17.2555 15.2272 17.1201 15.2729 16.9847 15.2729Z"
        fill="url(#zinepsEmblemGrad)"
      />
      <path
        d="M3.24066 20.7726L2.83502 20.283C-1.27616 15.3222 -0.874393 8.18083 3.76947 3.672C8.41527 -0.837449 15.7715 -1.22748 20.8823 2.76485L21.3866 3.15864L20.9287 3.60313C20.6637 3.86044 19.9801 4.52155 19.2552 5.21647L18.4382 4.41387C18.8819 3.98816 19.3101 3.57559 19.6357 3.26069C15.0202 0.0434056 8.66162 0.517326 4.59106 4.46896C0.522445 8.41998 0.0342596 14.5929 3.34707 19.0729C3.56826 18.8575 3.84428 18.5883 4.14222 18.2966L4.96703 19.091C4.36793 19.6776 3.85911 20.1716 3.69853 20.3275L3.24066 20.7726Z"
        fill="url(#zinepsEmblemGrad)"
      />
    </svg>
  )
}

export function Footer() {
  const [direction, setDirection] = useState<"up" | "down">("down")
  const lastScrollY = useRef(0)
  const accumulatedDelta = useRef(0)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Trigger up go up, trigger down go down with smooth debounced threshold
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollY.current
      lastScrollY.current = currentScrollY

      if (Math.abs(delta) < 2) return

      accumulatedDelta.current += delta

      // Require deliberate scroll movement to change direction (prevents snapping on micro-movements)
      if (accumulatedDelta.current > 25) {
        setDirection("down")
        accumulatedDelta.current = 0
      } else if (accumulatedDelta.current < -25) {
        setDirection("up")
        accumulatedDelta.current = 0
      }

      if (resetTimer.current) clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => {
        accumulatedDelta.current = 0
      }, 150)
    }

    // Wheel listener for instant responsiveness at boundaries with hysteresis
    const handleWheel = (e: WheelEvent) => {
      accumulatedDelta.current += e.deltaY

      if (accumulatedDelta.current > 30) {
        setDirection("down")
        accumulatedDelta.current = 0
      } else if (accumulatedDelta.current < -30) {
        setDirection("up")
        accumulatedDelta.current = 0
      }

      if (resetTimer.current) clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => {
        accumulatedDelta.current = 0
      }, 150)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      if (resetTimer.current) clearTimeout(resetTimer.current)
    }
  }, [])

  // Animation variants: Trigger up goes up-right; trigger down goes down-left
  // Smooth continuous gliding deceleration to completely eliminate snapping
  const motionVariants: Variants = {
    up: {
      left: "74%",
      top: "3%",
      rotate: 360,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    down: {
      left: "2%",
      top: "54%",
      rotate: 0,
      transition: {
        duration: 1.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  }

  return (
    <footer className="relative w-full bg-[#f8faf9] text-[#424242] overflow-hidden pt-10 sm:pt-14">
      {/* Architectural Diagonal Horizon Transition matching original Zineps silhouette */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none relative z-10">
        <svg
          viewBox="0 0 1512 84"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-14 sm:h-20 md:h-28 block"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 84 L 0 54 C 36 48 76 43 130 38 L 1512 0 L 1512 84 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Main White Footer Container with Increased Height & Architectural Grid System */}
      <div className="relative bg-white w-full border-b border-gray-100/90 overflow-hidden z-10">
        {/* Ambient Volumetric SideRays at Bottom Right with Gradual Blur Overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <SideRays
            origin="bottom-right"
            speed={0.7}
            rayColor1="#ffffff"
            rayColor2="#70CAB9"
            intensity={2.3}
            spread={2}
            tilt={-53}
            saturation={1.95}
            blend={0.88}
            falloff={0.5}
            opacity={1}
            className="w-full h-full"
          />

          {/* Gradual optical blur at top of ray */}
          <div className="absolute top-0 left-0 right-0 h-64 pointer-events-none [mask-image:linear-gradient(to_bottom,black_10%,transparent_100%)] backdrop-blur-[10px]" />
          <div className="absolute top-0 left-0 right-0 h-44 pointer-events-none [mask-image:linear-gradient(to_bottom,black_5%,transparent_80%)] backdrop-blur-[18px]" />
          <div className="absolute top-0 left-0 right-0 h-36 pointer-events-none bg-gradient-to-b from-white via-white/60 to-transparent" />
        </div>

        {/* Animated Brand Teal Logo (Trigger Up/Down + Ambient Idle Rotation) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <motion.div
            variants={motionVariants}
            animate={direction}
            className="absolute w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] opacity-60 pointer-events-none transform-gpu will-change-transform"
          >
            {/* Ambient slow idle rotation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="w-full h-full"
            >
              <ZinepsEmblem className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content Container on z-10 with transparent background so the rolling logo is clearly visible */}
        <div className="max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px] relative z-10">
          {/* Grid Section with bg-transparent */}
          <div className="relative bg-transparent">

            {/* 4 Structured Columns with Increased Height and Vertical Dividers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-gray-200/60 bg-transparent">
              {/* Column 1: Logo & Copyright */}
              <div className="flex flex-col justify-start py-14 sm:py-20 lg:py-28 px-6 sm:px-8 lg:px-12 min-h-[360px] lg:min-h-[480px]">
                <a href="/" className="inline-block mb-6 group">
                  <img
                    src="/zineps-logo.svg"
                    alt="Zineps Logo"
                    className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-[1.02]"
                  />
                </a>

                <p className="text-[#525151] text-sm sm:text-[15px] font-normal tracking-tight">
                  © 2025 Zineps.
                </p>
              </div>

              {/* Column 2: Products */}
              <div className="py-14 sm:py-20 lg:py-28 px-6 sm:px-8 lg:px-12 min-h-[360px] lg:min-h-[480px]">
                <h4 className="text-[#1f2937] font-semibold text-base sm:text-lg mb-6 sm:mb-8 tracking-tight">
                  Products
                </h4>

                <ul className="space-y-4 text-sm sm:text-[15px]">
                  <li>
                    <a
                      href="#process-tabs"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      Shipping for e-commerce &amp; SMEs
                    </a>
                  </li>
                  <li>
                    <a
                      href="#logistics-os"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      Platform for logistics providers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#shipping-ai"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      Shipping AI
                    </a>
                  </li>
                  <li>
                    <a
                      href="#partner-rates"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block text-neutral-500 pt-1"
                    >
                      Partner Rates &amp; Network
                    </a>
                  </li>
                  <li>
                    <a
                      href="#integrations"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block text-neutral-500"
                    >
                      Integrations (100+)
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Company */}
              <div className="py-14 sm:py-20 lg:py-28 px-6 sm:px-8 lg:px-12 min-h-[360px] lg:min-h-[480px]">
                <h4 className="text-[#1f2937] font-semibold text-base sm:text-lg mb-6 sm:mb-8 tracking-tight">
                  Company
                </h4>

                <ul className="space-y-4 text-sm sm:text-[15px]">
                  <li>
                    <a
                      href="https://www.zineps.com/about-us"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      About us
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.zineps.com/blog/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.zineps.com/careers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.zineps.com/privacy-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.zineps.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      Terms and conditions
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 4: Contact with LinkedIn and X Links */}
              <div className="py-14 sm:py-20 lg:py-28 px-6 sm:px-8 lg:px-12 min-h-[360px] lg:min-h-[480px]">
                <h4 className="text-[#1f2937] font-semibold text-base sm:text-lg mb-6 sm:mb-8 tracking-tight">
                  Contact
                </h4>

                <ul className="space-y-4 text-sm sm:text-[15px]">
                  <li>
                    <a
                      href="mailto:info@zineps.com"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      info@zineps.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:0202614474"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      020 261 4474
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://maps.google.com/?q=Herikerbergweg+288+Amsterdam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      Herikerbergweg 288
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://maps.google.com/?q=Herikerbergweg+288+Amsterdam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      1101CT, Amsterdam
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/zineps"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/zineps_ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#525151] hover:text-[#0f7f75] transition-colors leading-relaxed block"
                    >
                      X (Twitter)
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sub-Footer Compliance Bar: Centered, No Shield Icon, No Socials */}
          <div className="py-8 sm:py-10 flex items-center justify-center text-xs sm:text-[13px] text-neutral-500 bg-transparent">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 tracking-wide">
              <span className="text-neutral-600 font-medium">SOC-2 Type II</span>
              <span className="text-gray-300">•</span>
              <span className="text-neutral-600 font-medium">GDPR Compliant</span>
              <span className="text-gray-300">•</span>
              <span className="text-neutral-600 font-medium">ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
