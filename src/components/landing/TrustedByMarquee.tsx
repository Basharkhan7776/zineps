import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards"

export function TrustedByMarquee() {
  const logos = [
    { name: "Mate", src: "/image-149.png" },
    { name: "Monkey", src: "/image-142.png" },
    { name: "Trent", src: "/image-150.png" },
    { name: "The Tester", src: "/thetester.svg" },
    { name: "101Kruiden", src: "/101kruiden.svg" },
  ]

  return (
    <section className="py-10 md:py-16 overflow-hidden">
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-[73px] text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-[45px] font-semibold text-[#424242] tracking-tight">
          Trusted by
        </h2>
      </div>

      <div className="relative w-full flex justify-center">
        <InfiniteMovingCards
          items={logos}
          direction="left"
          speed="normal"
          scrollBoost={2.0}
          className="w-full"
        />
      </div>
    </section>
  )
}
