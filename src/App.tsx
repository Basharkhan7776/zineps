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

export function App() {
  return (
    <div className="min-h-screen bg-white text-[#424242] flex flex-col selection:bg-[#70CAB9]/30">
      {/* Top Announcement Bar */}
      <AnnouncementBanner />

      {/* Main Navigation Bar */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Aceternity ContainerScroll */}
        {/* WebGL 3D Gradient Waves Hero Background (Rotated 180deg - upside down fog) */}
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="w-full h-[100vh] rotate-180">
            <GradientWaves
              horizonColor="#0f7f75"
              waveColor="#70CAB9"
              crestColor="#ffffff"
              speed={0.4}
              amplitude={3}
              waveScale={0.9}
              waveRatio={0.7}
              swell={35}
              turbulence={30.5}
              tilt={1.03}
              zoom={1}
              height={2}
              fogDepth={25}
              detail="high"
              brightness={0.8}
              opacity={1}
              mouseInteraction={false}
              parallaxStrength={0.54}
              grain={false}
              grainIntensity={0}
              className="w-full h-full"
            />
          </div>
        </div>

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
