import { ArrowRight } from "lucide-react"
import { HoverButton } from "@/components/ui/hover-button"

export function IntegrationsSection() {
  const logos = [
    { name: "Bpost", src: "/hero-bpost.svg" },
    { name: "Bol", src: "/hero-bol.svg" },
    { name: "PostNL", src: "/hero-postnl.svg" },
    { name: "Temu", src: "/hero-temu.svg" },
    { name: "DHL", src: "/hero-dhl.svg" },
    { name: "Amazon", src: "/hero-amazon.svg" },
    { name: "DPD", src: "/hero-dpd.svg" },
    { name: "Shopify", src: "/hero-shopify.svg" },
    { name: "Correos", src: "/hero-correos.svg" },
    { name: "UPS", src: "/hero-ups.svg" },
    { name: "Magento", src: "/hero-magento.svg" },
    { name: "GLS", src: "/hero-gls.svg" },
    { name: "WooCommerce", src: "/hero-woo.svg" },
    { name: "Fedex", src: "/hero-fedex.svg" },
    { name: "DB Schenker", src: "/db-schenker-logo.svg" },
    { name: "CCV Shop", src: "/ccv-shop-logo.svg" },
    { name: "SnelStart", src: "/snelstart-logo.svg" },
    { name: "Exact", src: "/exact-logo.svg" },
  ]

  // Create 5 columns with shuffled lists
  const col1 = [...logos.slice(0, 7), ...logos.slice(0, 7)]
  const col2 = [...logos.slice(4, 11), ...logos.slice(4, 11)]
  const col3 = [...logos.slice(8, 15), ...logos.slice(8, 15)]
  const col4 = [...logos.slice(2, 9), ...logos.slice(2, 9)]
  const col5 = [...logos.slice(6, 13), ...logos.slice(6, 13)]

  const columns = [
    { items: col1, anim: "animate-[scrollDown_35s_linear_infinite]" },
    { items: col2, anim: "animate-[scrollUp_30s_linear_infinite]" },
    { items: col3, anim: "animate-[scrollDown_40s_linear_infinite]" },
    { items: col4, anim: "animate-[scrollUp_32s_linear_infinite]" },
    { items: col5, anim: "animate-[scrollDown_38s_linear_infinite]" },
  ]

  return (
    <section id="integrations" className="py-16 md:py-24 relative overflow-hidden">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-center">
          {/* Left Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#424242] mb-6 leading-tight tracking-tight">
              More than 100+ integrations
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-[#525151] mb-8 leading-relaxed">
              Seamlessly connect Zineps with popular marketplaces, e-commerce platforms, and logistics partners. Optimize your workflow, lower your shipping rates, and provide customers with an effortless shipping experience.
            </p>

            <div>
              <HoverButton
                href="https://app.zineps.com/Account/Register"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className="shadow-md"
              >
                <span>View integrations</span>
                <ArrowRight className="w-4 h-4" />
              </HoverButton>
            </div>
          </div>

          {/* Right Column: 5-column vertical infinite scrolling ticker (7 cols) */}
          <div className="lg:col-span-7 relative h-[480px] md:h-[540px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white_15%,white_85%,transparent)]">
            <div className="grid grid-cols-5 gap-3 sm:gap-4 h-full">
              {columns.map((col, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col gap-4 ${col.anim} hover:[animation-play-state:paused]`}
                >
                  {col.items.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="w-full aspect-square rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-3 sm:p-4 hover:shadow-md transition-shadow"
                      title={item.name}
                    >
                      <img
                        src={item.src}
                        alt={item.name}
                        className="w-full h-full object-contain pointer-events-none select-none"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
