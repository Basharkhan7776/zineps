import { lazy, Suspense, type ReactNode } from "react"
import { AnnouncementBanner } from "@/components/landing/AnnouncementBanner"
import { Navbar } from "@/components/landing/Navbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { TrustedByMarquee } from "@/components/landing/TrustedByMarquee"
import GradientWaves from "./components/GradientWaves"
import { CloudParallax } from "@/components/ui/cloud-parallax"
import { WaveLoaderReveal } from "@/components/ui/wave-loader-reveal"
import { InViewMount } from "@/components/ui/in-view-mount"
import { getWaveDetail } from "@/lib/runtime"

const PartnerRatesSection = lazy(() =>
  import("@/components/landing/PartnerRatesSection").then((m) => ({ default: m.PartnerRatesSection }))
)
const IntegrationsSection = lazy(() =>
  import("@/components/landing/IntegrationsSection").then((m) => ({ default: m.IntegrationsSection }))
)
const BentoFeatures = lazy(() =>
  import("@/components/landing/BentoFeatures").then((m) => ({ default: m.BentoFeatures }))
)
const ShippingAiBanner = lazy(() =>
  import("@/components/landing/ShippingAiBanner").then((m) => ({ default: m.ShippingAiBanner }))
)
const ShippingProcessTabs = lazy(() =>
  import("@/components/landing/ShippingProcessTabs").then((m) => ({ default: m.ShippingProcessTabs }))
)
const FaqSection = lazy(() =>
  import("@/components/landing/FaqSection").then((m) => ({ default: m.FaqSection }))
)
const RecentNewsSection = lazy(() =>
  import("@/components/landing/RecentNewsSection").then((m) => ({ default: m.RecentNewsSection }))
)
const CtaSection = lazy(() =>
  import("@/components/landing/CtaSection").then((m) => ({ default: m.CtaSection }))
)
const Footer = lazy(() =>
  import("@/components/landing/Footer").then((m) => ({ default: m.Footer }))
)

function LazyBlock({
  minHeight,
  children,
  activateOnHash,
}: {
  minHeight: string
  children: ReactNode
  activateOnHash?: string[]
}) {
  return (
    <InViewMount minHeight={minHeight} activateOnHash={activateOnHash}>
      <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense>
    </InViewMount>
  )
}

export function App() {
  const waveDetail = getWaveDetail()

  return (
    <div className="relative min-h-screen bg-white text-[#424242] flex flex-col selection:bg-[#70CAB9]/30">
      <WaveLoaderReveal />

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
            detail={waveDetail}
            brightness={0.88}
            opacity={0.86}
            mouseInteraction={false}
            parallaxStrength={0}
            grain={false}
            grainIntensity={0}
            className="w-full h-full"
          />
        </div>
      </CloudParallax>

      <AnnouncementBanner />
      <Navbar />

      <main className="flex-1 relative z-10">
        <HeroSection />
        <TrustedByMarquee />

        <LazyBlock minHeight="100vh" activateOnHash={["#partner-rates"]}>
          <PartnerRatesSection />
        </LazyBlock>

        <LazyBlock minHeight="100vh" activateOnHash={["#integrations"]}>
          <IntegrationsSection />
        </LazyBlock>

        <LazyBlock minHeight="100vh" activateOnHash={["#platform-capabilities"]}>
          <BentoFeatures />
        </LazyBlock>

        <LazyBlock minHeight="16rem" activateOnHash={["#shipping-ai"]}>
          <ShippingAiBanner />
        </LazyBlock>

        <LazyBlock
          minHeight="100vh"
          activateOnHash={[
            "#process-tabs",
            "#logistics-os",
            "#logistics",
            "#ecommerce",
            "#freight",
            "#ecommerce-shipping",
            "#freight-shipping",
          ]}
        >
          <ShippingProcessTabs />
        </LazyBlock>

        <LazyBlock minHeight="24rem" activateOnHash={["#faq"]}>
          <FaqSection />
        </LazyBlock>

        <LazyBlock minHeight="24rem" activateOnHash={["#recent-news"]}>
          <RecentNewsSection />
        </LazyBlock>

        <LazyBlock minHeight="100vh">
          <CtaSection />
        </LazyBlock>
      </main>

      <LazyBlock minHeight="24rem">
        <Footer />
      </LazyBlock>
    </div>
  )
}

export default App
