"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { HoverButton } from "@/components/ui/hover-button"

export function ShippingAiBanner() {
  return (
    <section id="shipping-ai" className="py-10 md:py-16 overflow-hidden">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px] flex justify-center">
        <motion.div
          initial={{ width: "85%", opacity: 0.92 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 18,
            mass: 0.9,
          }}
          className="rounded-3xl p-8 sm:p-12 md:p-14 relative overflow-hidden shadow-2xl border border-[#70CAB9]/25 will-change-[width,opacity]"
          style={{
            background:
              "linear-gradient(135deg, #2b453e 0%, #3d5f56 50%, #1e312c 100%)",
          }}
        >
          {/* Animated decorative glow */}
          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.18, 0.32, 0.18],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-1/4 w-72 h-72 bg-[#70CAB9]/20 rounded-full blur-3xl pointer-events-none"
          />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 tracking-tight"
              >
                Predict delays. Choose better routes. Pay less.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-lg text-white/85 leading-relaxed"
              >
                Shipping AI is the intelligence in the layer. It dynamically recommends the most cost-effective carrier, route, and guaranteed delivery speed for every single parcel.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={{ duration: 0.45, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="flex-shrink-0"
            >
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
