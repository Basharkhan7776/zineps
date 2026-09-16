"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { debounce } from "@/lib/runtime"
import { motion, AnimatePresence } from "framer-motion"

interface FaqItem {
  number: string
  question: string
  answer: string
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const listContainerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardTargetY, setCardTargetY] = useState(0)

  const faqs: FaqItem[] = [
    {
      number: "01",
      question: "What exactly is Zineps?",
      answer:
        "Zineps is an AI-powered logistics operating system that connects fast-growing e-commerce businesses with verified logistics service providers. Online stores automate shipping workflows, compare live rates across multiple carriers, and generate bulk labels instantly, while 3PLs and freight brokers manage merchant margin rules and carrier contracts from one unified command center.",
    },
    {
      number: "02",
      question: "Who is Zineps for?",
      answer:
        "Zineps is built for both sides of the shipping ecosystem: webshops & multi-channel retailers seeking automated fulfillment at lower carrier rates, as well as logistics service providers, freight forwarders, and 3PL warehouses looking to scale their merchant volume while keeping 100% direct customer billing relationships.",
    },
    {
      number: "03",
      question: "Do I need an existing shipping contract?",
      answer:
        "No, you do not need an existing contract. You can seamlessly plug in your own negotiated carrier accounts, or take immediate advantage of high-volume pre-negotiated partner rates from DHL, PostNL, DPD, GLS, bpost, FedEx, and DB Schenker directly through the Zineps network with zero volume commitments.",
    },
    {
      number: "04",
      question: "Which systems does Zineps integrate with?",
      answer:
        "Zineps connects out-of-the-box with Shopify, WooCommerce, Bol.com, Amazon, Exact, Lightspeed, and Magento. For enterprise ERPs and warehouse management systems (SAP, Dynamics, NetSuite), high-speed REST and GraphQL APIs enable seamless end-to-end integration within days.",
    },
    {
      number: "05",
      question: "How much does Zineps cost?",
      answer:
        "Zineps operates on a transparent software model with zero hidden markups or per-label surcharge penalties. Whether you are shipping 500 parcels a month or dispatching hundreds of commercial freight pallets daily, our scalable tiers align directly with your growth.",
    },
    {
      number: "06",
      question: "How quickly can I get started?",
      answer:
        "You can be up and running within 10 minutes. Connect your webshop via OAuth, verify your return address, and start generating print-ready labels immediately without waiting weeks for carrier API approvals or merchant gateway verifications.",
    },
    {
      number: "07",
      question: "How does the AI shipping optimization work?",
      answer:
        "Our routing engine dynamically evaluates package dimensions, weight, destination postal codes, commercial dock capabilities, carrier delivery SLA performance scores, and real-time fuel surcharges to automatically select the fastest and most cost-effective shipping method for every single package.",
    },
    {
      number: "08",
      question: "Can I manage multi-carrier international returns?",
      answer:
        "Yes. Zineps features a branded self-service customer returns portal that automates return authorization, generates localized return labels with digital customs documentation, and tracks returned inventory straight back to your warehouse or 3PL hub.",
    },
  ]

  // Close dialog when user clicks aside from list and answer card
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (openIndex === null) return
      const target = e.target as Node
      const clickedInList = listContainerRef.current?.contains(target)
      const clickedInCard = cardRef.current?.contains(target)
      if (!clickedInList && !clickedInCard) {
        setOpenIndex(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [openIndex])

  // Calculate vertical alignment so card floats right alongside active question
  const updateCardPosition = useCallback((index: number | null) => {
    if (index === null) return
    const itemEl = itemRefs.current[index]
    const listEl = listContainerRef.current
    if (!itemEl || !listEl) return

    const itemTop = itemEl.offsetTop
    const listHeight = listEl.offsetHeight
    const cardHeight = cardRef.current ? cardRef.current.offsetHeight : 220

    // Constrain card so it aligns with question but stays within list container bounds
    const maxY = Math.max(0, listHeight - cardHeight)
    const targetY = Math.max(0, Math.min(itemTop, maxY))

    setCardTargetY(targetY)
  }, [])

  useEffect(() => {
    updateCardPosition(openIndex)
    const id = requestAnimationFrame(() => {
      updateCardPosition(openIndex)
    })
    const timer = setTimeout(() => {
      updateCardPosition(openIndex)
    }, 60)
    return () => {
      cancelAnimationFrame(id)
      clearTimeout(timer)
    }
  }, [openIndex, updateCardPosition])

  useEffect(() => {
    const handleResize = debounce(() => updateCardPosition(openIndex), 150)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [openIndex, updateCardPosition])

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx))
  }

  const activeFaq = openIndex !== null ? faqs[openIndex] : null

  return (
    <section id="faq" className="py-20 sm:py-28 relative bg-white overflow-hidden">
      {/* Ambient background mint glow backdrops */}
      <div className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-[#70CAB9]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[500px] h-[500px] bg-[#70CAB9]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimal Section Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1f2937] tracking-tight leading-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-gray-500 font-normal">
            Everything you need to know about Zineps and shipping operations.
          </p>
        </div>

        {/* Dynamic Responsive Interactive Area */}
        <motion.div
          layout
          className="w-full flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-14 relative"
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
        >
          {/* --- LEFT: QUESTION LIST (CENTERED WHEN CLOSED, LEFT WHEN OPEN) --- */}
          <motion.div
            layout
            ref={listContainerRef}
            className={`relative flex flex-col divide-y divide-gray-100 ${
              openIndex !== null
                ? "w-full lg:w-1/2 max-w-[560px]"
                : "w-full max-w-3xl mx-auto"
            }`}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
          >
            {faqs.map((faq, idx) => {
              const isActive = openIndex === idx
              return (
                <div key={faq.number} className="flex flex-col">
                  <button
                    ref={(el) => {
                      itemRefs.current[idx] = el
                    }}
                    type="button"
                    onClick={() => toggle(idx)}
                    className="group w-full py-4 sm:py-5 flex items-baseline justify-between gap-4 text-left cursor-pointer transition-colors focus:outline-none"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-5 min-w-0 pr-2">
                      {/* Monospace Number (01, 02, 03...) */}
                      <span
                        className={`font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors shrink-0 ${
                          isActive
                            ? "text-[#0f7f75]"
                            : "text-neutral-400 group-hover:text-neutral-600"
                        }`}
                      >
                        {faq.number}
                      </span>

                      {/* Question Text */}
                      <span
                        className={`text-base sm:text-lg lg:text-[19px] tracking-tight leading-snug transition-colors duration-200 ${
                          isActive
                            ? "text-[#111827] font-bold"
                            : "text-[#4b5563] group-hover:text-[#111827] font-medium"
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Active Pulse Dot pointing toward right answer card */}
                    {isActive && (
                      <motion.span
                        layoutId="activeFaqIndicator"
                        className="w-2 h-2 rounded-full bg-[#0f7f75] shadow-[0_0_8px_rgba(15,127,117,0.6)] shrink-0 self-center hidden lg:block"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                  </button>

                  {/* Mobile Inline Answer Card (Directly Under Selected Question) */}
                  <div className="block lg:hidden">
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, scale: 0.98 }}
                          animate={{ opacity: 1, height: "auto", scale: 1 }}
                          exit={{ opacity: 0, height: 0, scale: 0.98 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden pb-5"
                        >
                          <div className="relative w-full rounded-2xl bg-white border border-[#70CAB9]/45 shadow-[0_8px_24px_-4px_rgba(15,127,117,0.08),0_1px_3px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(112,202,185,0.15)] p-6 overflow-hidden">
                            {/* Background Number ONLY */}
                            <div className="absolute top-2 right-4 text-6xl font-mono font-black text-[#0f7f75]/[0.08] pointer-events-none select-none leading-none">
                              {faq.number}
                            </div>

                            {/* Answer Text ONLY */}
                            <p className="relative z-10 text-sm sm:text-base text-[#2c353d] leading-relaxed font-normal">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              )
            })}
          </motion.div>

          {/* --- RIGHT: FLOATING ANSWER CARD (DESKTOP) --- */}
          <AnimatePresence>
            {activeFaq && (
              <motion.div
                key="desktop-answer-column"
                layout
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="hidden lg:block lg:w-1/2 max-w-[560px] relative self-stretch"
              >
                <motion.div
                  key="answer-card-wrapper"
                  animate={{ y: cardTargetY }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 32,
                    mass: 0.8,
                  }}
                  className="w-full will-change-transform"
                >
                  <div
                    ref={cardRef}
                    className="relative w-full rounded-2xl sm:rounded-3xl bg-white border border-[#70CAB9]/45 shadow-[0_12px_36px_-6px_rgba(15,127,117,0.08),0_2px_6px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_1px_rgba(112,202,185,0.15)] p-7 sm:p-9 overflow-hidden flex flex-col justify-center min-h-[200px]"
                  >
                    {/* Giant Ghost Number in Background ONLY */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`bg-num-${activeFaq.number}`}
                        initial={{ opacity: 0, scale: 0.85, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 1.15, y: -6 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute top-2 right-6 text-7xl sm:text-8xl lg:text-9xl font-mono font-black text-[#0f7f75]/[0.08] pointer-events-none select-none tracking-tighter leading-none"
                      >
                        {activeFaq.number}
                      </motion.div>
                    </AnimatePresence>

                    {/* Answer Text ONLY with Tasteful Blur-Fade Animation */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`answer-${activeFaq.number}`}
                        initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative z-10"
                      >
                        <p className="text-base sm:text-lg lg:text-[18px] text-[#2c353d] leading-relaxed font-normal">
                          {activeFaq.answer}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
