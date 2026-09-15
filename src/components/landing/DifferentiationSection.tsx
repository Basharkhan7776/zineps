import React, { useState } from "react"
import { Mail } from "lucide-react"
import { HoverEffect } from "@/components/ui/card-hover-effect"
import { HoverButton } from "@/components/ui/hover-button"

export function DifferentiationSection() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  const differentiationItems = [
    {
      title: "Building Together",
      description:
        "We build together with our customers and continuously improve based on their feedback.",
      icon: "/differentiation.svg",
    },
    {
      title: "Personal Contact",
      description:
        "At Zineps, we stay close to our customers. We listen, think along, and provide tailored support so no one stands alone.",
      icon: "/differentiation.svg",
    },
    {
      title: "Strong Partnerships",
      description:
        "Together with our partners, we offer competitive rates, smart workflows, and valuable guidance for both online stores and logistics providers.",
      icon: "/differentiation.svg",
    },
    {
      title: "Focus on Technology",
      description:
        "We build tools that make e-commerce and logistics faster and simpler.",
      icon: "/differentiation.svg",
    },
  ]

  return (
    <section className="py-16 md:py-24 relative">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-[#E6FAF5] text-[#60948A] text-xs font-semibold uppercase tracking-wider">
                What Sets Us Apart
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#424242] mb-6 leading-tight tracking-tight">
              An approach that goes beyond the standard
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#525151] mb-8 leading-relaxed max-w-md">
              We set a new standard in shipping technology. With a focus on innovation, collaboration, and customer satisfaction, we help e-commerce and logistics operate smarter and future-ready. Stay informed.
            </p>

            {/* Newsletter form */}
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <div className="flex-1 relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#70CAB9] focus:border-transparent text-[#424242] text-sm bg-white shadow-sm"
                />
              </div>
              <HoverButton
                type="submit"
                size="lg"
                className="whitespace-nowrap px-6"
              >
                {subscribed ? "Subscribed! ✓" : "Subscribe"}
              </HoverButton>
            </form>
          </div>

          {/* Right Column: Aceternity Card Hover Effect (7 cols) */}
          <div className="lg:col-span-7">
            <HoverEffect items={differentiationItems} />
          </div>
        </div>
      </div>
    </section>
  )
}
