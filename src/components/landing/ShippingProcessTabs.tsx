import { useState } from "react"
import { CheckCircle2, ShoppingBag, Store, Truck, Building2, Factory, Warehouse } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ShippingProcessTabs() {
  const [activeTab, setActiveTab] = useState<"ecommerce" | "b2b">("ecommerce")

  return (
    <section id="process-tabs" className="py-14 md:py-20 relative overflow-visible">
      <div className="relative w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        {/* Container with rounded border & tabs header */}
        <div className="rounded-3xl border border-gray-200 bg-gray-50/70 backdrop-blur-sm overflow-hidden shadow-sm">
          {/* Tab buttons */}
          <div className="flex flex-col sm:flex-row w-full items-stretch sm:items-center justify-between gap-2 p-2 bg-gray-100/60 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("ecommerce")}
              className={`relative flex-1 px-4 py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 text-center ${
                activeTab === "ecommerce"
                  ? "bg-gradient-to-r from-[#60948A] via-[#4a7569] to-[#3d5f56] text-white shadow-md"
                  : "text-[#424242] hover:bg-gray-200/60"
              }`}
            >
              Automate Shipping Workflows
            </button>

            <button
              onClick={() => setActiveTab("b2b")}
              className={`relative flex-1 px-4 py-3.5 rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 text-center ${
                activeTab === "b2b"
                  ? "bg-gradient-to-r from-[#60948A] via-[#4a7569] to-[#3d5f56] text-white shadow-md"
                  : "text-[#424242] hover:bg-gray-200/60"
              }`}
            >
              Freight Management &amp; B2B Shipping
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-10 md:p-12 min-h-[560px]">
            <AnimatePresence mode="wait">
              {activeTab === "ecommerce" ? (
                <motion.div
                  key="ecommerce"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center"
                >
                  {/* Left info */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#424242] leading-tight">
                      Smart shipping <br />
                      <span className="text-[#60948A]">from label to return</span>
                    </h3>

                    <p className="text-base sm:text-lg text-[#525151] mb-6 leading-relaxed max-w-lg">
                      Less manual work, lower shipping rates, faster fulfillment, streamlined returns processing, and higher customer satisfaction.
                    </p>

                    <ul className="space-y-3 mb-8">
                      {[
                        "Automatic carrier selection based on price and delivery speed",
                        "High-speed label generation",
                        "Pickup & automated returns portal",
                        "Dynamic checkout integrations",
                        "Use your own carrier contracts or partner network",
                        "Branded tracking pages, packing slips, and email updates",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#525151]">
                          <CheckCircle2 className="w-5 h-5 text-[#60948A] mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <a
                        href="https://app.zineps.com/Account/Register"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center font-semibold text-gray-900 bg-gradient-to-br from-[#70CAB9] to-white hover:bg-[#d7f0ea] h-11 px-6 rounded-lg shadow-sm transition-all border border-[#70CAB9]/30"
                      >
                        Read more
                      </a>
                    </div>
                  </div>

                  {/* Right mockup & badges */}
                  <div className="flex flex-col">
                    <div className="relative overflow-hidden rounded-2xl bg-white p-3 shadow-lg border border-gray-200">
                      <img
                        src="/shippng-zineps.svg"
                        alt="E-commerce shipping mockup"
                        className="w-full h-auto object-contain max-h-[420px]"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-6">
                      <p className="text-xs sm:text-sm font-semibold text-[#6B7280] mb-3 text-center uppercase tracking-wider">
                        Ideal for:
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                          <ShoppingBag className="w-4 h-4 text-[#60948A]" />
                          <span>E-commerce retailers</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                          <Store className="w-4 h-4 text-[#60948A]" />
                          <span>Online stores</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                          <Truck className="w-4 h-4 text-[#60948A]" />
                          <span>Dropshipping</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="b2b"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid lg:grid-cols-2 gap-10 md:gap-12 items-center"
                >
                  {/* Left info */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[#424242] leading-tight">
                      Send your <br />
                      <span className="text-[#60948A]">business freight</span>
                    </h3>

                    <p className="text-base sm:text-lg text-[#525151] mb-6 leading-relaxed max-w-lg">
                      More revenue per vehicle, less planning &amp; administration. Win new customers, optimize fleet utilization, and reduce customer support overhead.
                    </p>

                    <ul className="space-y-3 mb-8">
                      {[
                        "Offer commercial business shipping through Zineps",
                        "Manage freight orders, consignments, and pickups centrally",
                        "Integrate existing ERP systems or utilize our developer APIs",
                        "Advanced address validation and normalization engine",
                        "Real-time track & trace and SLA performance dashboards",
                      ].map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#525151]">
                          <CheckCircle2 className="w-5 h-5 text-[#60948A] mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div>
                      <a
                        href="#logistics-os"
                        className="inline-flex items-center justify-center font-semibold text-gray-900 bg-gradient-to-br from-[#70CAB9] to-white hover:bg-[#d7f0ea] h-11 px-6 rounded-lg shadow-sm transition-all border border-[#70CAB9]/30"
                      >
                        Read more
                      </a>
                    </div>
                  </div>

                  {/* Right mockup & badges */}
                  <div className="flex flex-col">
                    <div className="relative overflow-hidden rounded-2xl bg-white p-3 shadow-lg border border-gray-200">
                      <img
                        src="/shipping-zineps-b2b.svg"
                        alt="B2B shipping mockup"
                        className="w-full h-auto object-contain max-h-[420px]"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-6">
                      <p className="text-xs sm:text-sm font-semibold text-[#6B7280] mb-3 text-center uppercase tracking-wider">
                        Ideal for:
                      </p>
                      <div className="flex flex-wrap justify-center gap-3">
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                          <Warehouse className="w-4 h-4 text-[#60948A]" />
                          <span>Wholesale distributors</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                          <Factory className="w-4 h-4 text-[#60948A]" />
                          <span>Manufacturers</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 shadow-sm text-sm font-medium text-[#424242]">
                          <Building2 className="w-4 h-4 text-[#60948A]" />
                          <span>B2B suppliers</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
