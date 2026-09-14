import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      number: "01",
      question: "What exactly is Zineps?",
      answer:
        "Zineps is an AI-powered platform that connects e-commerce with logistics partners. Online stores automate their shipping workflows, while carriers and brokers manage their clients via the Partner Panel. Everything happens within one intelligent platform.",
    },
    {
      number: "02",
      question: "Who is Zineps for?",
      answer:
        "For both e-commerce businesses and logistics partners. Online stores use Zineps to reduce shipping costs and automate manual processes. Partners such as carriers, 3PLs, and brokers offer their services through our platform and manage everything centrally.",
    },
    {
      number: "03",
      question: "Do I need an existing shipping contract?",
      answer:
        "No, that is not required. You can connect your own pre-negotiated carrier contracts, or take immediate advantage of discounted partner shipping rates directly through Zineps.",
    },
    {
      number: "04",
      question: "Which systems does Zineps integrate with?",
      answer:
        "Zineps seamlessly integrates with Shopify, WooCommerce, Bol.com, Amazon, Exact, Lightspeed, and many more. Additionally, developer-friendly APIs are available for custom enterprise integrations.",
    },
    {
      number: "05",
      question: "How much does Zineps cost?",
      answer:
        "Zineps operates on a transparent SaaS model with optional per-shipment fees. Depending on your business profile (merchant or logistics partner), we offer flexible and tailored pricing plans.",
    },
    {
      number: "06",
      question: "How quickly can I get started?",
      answer:
        "Within minutes. Connect your online store or register as a logistics partner, and start shipping or offering logistics services right away.",
    },
  ]

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="w-full max-w-[1000px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#424242] tracking-tight leading-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg text-[#525151]">
            Everything you need to know about Zineps and our logistics platform.
          </p>
        </div>

        {/* Accordion list */}
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between text-left gap-4 group focus:outline-none"
                >
                  <span className="text-lg sm:text-xl font-semibold text-[#424242] group-hover:text-[#0f7f75] transition-colors">
                    <span className="text-[#60948A] mr-3 font-mono text-base sm:text-lg">
                      {faq.number}
                    </span>
                    {faq.question}
                  </span>

                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 group-hover:border-[#70CAB9] transition-all flex-shrink-0 ${
                      isOpen ? "rotate-180 bg-[#E6FAF5] text-[#0f7f75]" : "text-gray-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 transition-transform" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 pb-2 text-base text-[#525151] leading-relaxed pl-9 pr-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
