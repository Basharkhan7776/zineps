export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-no-repeat bg-cover bg-center border-t border-gray-100" style={{ backgroundImage: "url('/rectangle-2734.png')" }}>
      {/* Background overlay if needed */}
      <div className="relative z-10 pt-20 sm:pt-32 pb-16 max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Logo & copyright */}
          <div className="flex flex-col">
            <a href="/" className="inline-block mb-6">
              <img
                src="/zineps-logo-black.svg"
                alt="Zineps Logo"
                className="h-8 w-auto object-contain cursor-pointer"
              />
            </a>
            <p className="text-[#525151] text-base leading-relaxed">
              © 2025 Zineps. All rights reserved.
            </p>
            <p className="text-xs text-[#525151]/70 mt-3">
              AI-driven shipping ecosystem for fast-growing e-commerce &amp; logistics.
            </p>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-[#424242] font-semibold text-lg sm:text-xl mb-4">
              Products
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#process-tabs"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Shipping for E-commerce &amp; SMBs
                </a>
              </li>
              <li>
                <a
                  href="#logistics-os"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Platform for Logistics Service Providers
                </a>
              </li>
              <li>
                <a
                  href="#shipping-ai"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Shipping AI
                </a>
              </li>
              <li>
                <a
                  href="#integrations"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-[#424242] font-semibold text-lg sm:text-xl mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.zineps.com/about-us"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="https://www.zineps.com/blog/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="https://www.zineps.com/careers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="https://www.zineps.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="https://www.zineps.com/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-[#424242] font-semibold text-lg sm:text-xl mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:info@zineps.com"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  info@zineps.com
                </a>
              </li>
              <li>
                <a
                  href="tel:0202614474"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  020 261 4474
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Herikerbergweg+288+Amsterdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  Herikerbergweg 288
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Herikerbergweg+288+Amsterdam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#525151] hover:text-[#0f7f75] transition-colors text-base block"
                >
                  1101CT, Amsterdam
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
