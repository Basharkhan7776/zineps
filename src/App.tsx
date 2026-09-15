import { AnnouncementBanner } from "@/components/landing/AnnouncementBanner"
import { Navbar } from "@/components/landing/Navbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { TrustedByMarquee } from "@/components/landing/TrustedByMarquee"
import { PartnerRatesSection } from "@/components/landing/PartnerRatesSection"
import { ShippingProcessTabs } from "@/components/landing/ShippingProcessTabs"
import { BentoFeatures } from "@/components/landing/BentoFeatures"
import { ShippingAiBanner } from "@/components/landing/ShippingAiBanner"
import { LogisticsOsSection } from "@/components/landing/LogisticsOsSection"
import { IntegrationsSection } from "@/components/landing/IntegrationsSection"
import { DifferentiationSection } from "@/components/landing/DifferentiationSection"
import { FaqSection } from "@/components/landing/FaqSection"
import { CtaSection } from "@/components/landing/CtaSection"
import { Footer } from "@/components/landing/Footer"
import GradientWaves from "./components/GradientWaves"
import { CloudParallax } from "@/components/ui/cloud-parallax"
import { WaveLoaderReveal } from "@/components/ui/wave-loader-reveal"

export function App() {
  return (
    <div className="relative min-h-screen bg-white text-[#424242] flex flex-col selection:bg-[#70CAB9]/30">
      {/* Background Load Wave Reveal Animation */}
      <WaveLoaderReveal />

      {/* WebGL 3D Cloud Gradient Background starting from the very top (no pad) */}
      <CloudParallax className="absolute top-0 left-0 right-0 w-full h-[125vh] pointer-events-none overflow-hidden z-0">
        <div className="w-full h-[125vh] rotate-180">
          <GradientWaves
            horizonColor="#0a524a"
            deepColor="#083d37"
            waveColor="#177569"
            mintColor="#70CAB9"
            mistColor="#bbf0e7"
            crestColor="#ffffff"
            speed={0.14}
            amplitude={2.0}
            waveScale={0.62}
            waveRatio={0.82}
            swell={44}
            turbulence={24}
            tilt={1.05}
            zoom={1}
            height={2}
            fogDepth={40}
            detail="high"
            brightness={0.88}
            opacity={0.96}
            mouseInteraction={false}
            parallaxStrength={0}
            grain={false}
            grainIntensity={0}
            className="w-full h-full"
          />
        </div>
      </CloudParallax>

      {/* Top Announcement Bar */}
      <AnnouncementBanner />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        <HeroSection />

        {/* Social Proof Client Logo Marquee */}
        <TrustedByMarquee />

        {/* Partner Rates & Network Power */}
        <PartnerRatesSection />

        {/* Interactive E-commerce vs B2B Tabs */}
        <ShippingProcessTabs />

        {/* Bento Grid Feature Overview */}
        <BentoFeatures />

        {/* Shipping AI Highlight Banner */}
        <ShippingAiBanner />

        {/* Logistics Operating System for Partners */}
        <LogisticsOsSection />

        {/* 100+ Integrations Infinite Scrolling Ticker */}
        <IntegrationsSection />

        {/* Differentiation & Aceternity Card Hover Grid */}
        <DifferentiationSection />

        {/* Interactive FAQ Accordion */}
        <FaqSection />

        {/* Final Call to Action */}
        <CtaSection />
      </main>

      {/* Complete Footer */}
      <Footer />
    </div>
  )
}

export default App
