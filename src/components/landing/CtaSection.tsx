"use client"

import React, { useRef, useState, useEffect } from "react"
import { getDeviceProfile, observeVisibility } from "@/lib/runtime"
import { ArrowRight, Mail, X, CheckCircle2 } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { HoverButton } from "@/components/ui/hover-button"
import { FadeBlur, useInView } from "@/components/ui/motion"

function ZinepsWatermark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="-2.152 -2.518 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Central diagonal slash / bridge */}
      <path
        d="M15.5958 16.7477C15.5204 16.8209 15.354 16.7971 15.1167 16.6919C14.3808 16.3695 12.9646 15.2683 11.4775 13.8259C9.97816 12.3703 8.83928 10.9861 8.51683 10.2768C8.41494 10.0539 8.3943 9.89802 8.46717 9.82728C8.7735 9.5299 10.6166 10.839 12.5855 12.7497C14.5537 14.661 15.9021 16.4503 15.5958 16.7477Z"
        fill="currentColor"
      />
      <path
        d="M6.7769 21.009L5.95854 20.2077C6.30871 19.8708 6.695 19.4996 7.06646 19.1446C8.17051 18.0916 9.64474 17.7955 11.6658 17.6596C11.7381 17.654 11.8116 17.6484 11.8844 17.6396C12.1669 17.6052 12.4371 17.5407 12.688 17.448C13.0678 17.3084 13.5715 17.0768 14.0648 16.7062C13.2542 16.1734 12.1824 15.2819 11.0777 14.2101C9.96525 13.1302 9.04305 12.0846 8.49554 11.2958C8.11248 11.776 7.87258 12.2649 7.72941 12.6331C7.63848 12.8672 7.57335 13.1195 7.53659 13.3831C7.52627 13.4632 7.51788 13.5496 7.51015 13.6354C7.40116 15.1648 7.18318 16.9046 5.98111 18.0922C5.64189 18.4272 5.28849 18.774 4.96153 19.0939L4.13672 18.2995C4.46239 17.9808 4.81515 17.6346 5.15307 17.3015C5.98691 16.4777 6.23003 15.2556 6.35192 13.5502C6.36159 13.4407 6.37127 13.3393 6.38481 13.2385C6.43382 12.8847 6.52088 12.5485 6.64277 12.2349C6.8846 11.6145 7.3515 10.713 8.20211 9.93791C8.33948 9.8127 8.53101 9.76011 8.71545 9.79642C8.89989 9.83273 9.05531 9.95419 9.1314 10.1213C9.36872 10.6428 10.3361 11.8956 11.8999 13.4131C13.4599 14.9263 14.7213 15.8503 15.2792 16.0945C15.4501 16.1696 15.5732 16.3199 15.61 16.4989C15.6467 16.678 15.5919 16.8627 15.4629 16.9954C14.6652 17.818 13.7379 18.2694 13.1001 18.5036C12.7641 18.6275 12.4036 18.7139 12.0302 18.759C11.9399 18.7702 11.849 18.7771 11.7593 18.7847C11.7574 18.7847 11.7484 18.7853 11.7464 18.7859C9.98975 18.9042 8.73093 19.1396 7.8816 19.9497C7.51144 20.3028 7.12579 20.6728 6.7769 21.009Z"
        fill="currentColor"
      />
      <path
        d="M12.8463 24.9538C10.0159 24.9538 7.17578 24.0448 4.81419 22.2004L4.30859 21.8054L4.92124 21.2137C5.14308 20.999 5.52679 20.6284 5.9679 20.2033L6.78627 21.0046C6.51477 21.2663 6.26455 21.5074 6.06141 21.704C10.6775 24.9206 17.0362 24.4467 21.1054 20.4957C25.1753 16.5459 25.6642 10.3737 22.3501 5.89239C22.038 6.19665 21.633 6.59231 21.2125 7.00488L20.3857 6.21167C20.9642 5.64384 21.5143 5.10795 21.8329 4.79742L22.4546 4.19141L22.8615 4.68223C26.9739 9.64431 26.5722 16.7857 21.927 21.2933C19.4281 23.7198 16.1436 24.9538 12.8463 24.9538Z"
        fill="currentColor"
      />
      <path
        d="M16.9847 15.2729C16.8589 15.2729 16.7332 15.2335 16.628 15.154C15.475 14.2831 14.2407 13.2157 13.0586 12.0675C11.9648 11.0064 10.9337 9.89264 10.0772 8.84713C9.90505 8.63678 9.90956 8.3369 10.0888 8.13156C10.9201 7.17808 11.9429 6.66534 12.6549 6.4024C12.996 6.27719 13.3559 6.19143 13.7254 6.14635C13.8241 6.13571 13.9131 6.12757 14.004 6.12005C15.7665 6.00173 17.0259 5.76571 17.8746 4.9556C18.0616 4.77717 18.2525 4.59437 18.4402 4.41406L19.2573 5.21666C19.0683 5.39759 18.8768 5.58102 18.6891 5.7607C17.4658 6.92766 15.6736 7.13927 14.0898 7.2457C14.0175 7.25133 13.9401 7.25884 13.8615 7.26698C13.5906 7.30016 13.3204 7.36464 13.0663 7.45792C12.5749 7.63948 11.9029 7.96503 11.3019 8.52409C12.0641 9.42498 12.9477 10.3666 13.8795 11.27C14.8952 12.2566 15.9477 13.18 16.9486 13.9626C17.5115 13.3841 17.8404 12.7412 18.0242 12.271C18.1145 12.0387 18.1803 11.7852 18.2183 11.5191C18.228 11.4452 18.2364 11.3614 18.2422 11.2775C18.3841 9.31417 18.6891 7.88301 19.7732 6.81247C19.9737 6.61401 20.1801 6.41117 20.3826 6.21271L21.2087 7.00592C21.0069 7.20375 20.8018 7.40596 20.6019 7.60317C19.7687 8.42643 19.5249 9.64911 19.4017 11.3557C19.3946 11.4603 19.3837 11.5661 19.3701 11.6681C19.3192 12.0243 19.2321 12.3593 19.1109 12.6704C18.7285 13.6483 18.1236 14.5004 17.3626 15.1364C17.2555 15.2272 17.1201 15.2729 16.9847 15.2729Z"
        fill="currentColor"
      />
      <path
        d="M3.24066 20.7726L2.83502 20.283C-1.27616 15.3222 -0.874393 8.18083 3.76947 3.672C8.41527 -0.837449 15.7715 -1.22748 20.8823 2.76485L21.3866 3.15864L20.9287 3.60313C20.6637 3.86044 19.9801 4.52155 19.2552 5.21647L18.4382 4.41387C18.8819 3.98816 19.3101 3.57559 19.6357 3.26069C15.0202 0.0434056 8.66162 0.517326 4.59106 4.46896C0.522445 8.41998 0.0342596 14.5929 3.34707 19.0729C3.56826 18.8575 3.84428 18.5883 4.14222 18.2966L4.96703 19.091C4.36793 19.6776 3.85911 20.1716 3.69853 20.3275L3.24066 20.7726Z"
        fill="currentColor"
      />
    </svg>
  )
}

interface SubscribeDialogProps {
  isOpen: boolean
  onClose: () => void
  initialEmail?: string
  preSubscribed?: boolean
}

function SubscribeDialogContent({
  onClose,
  initialEmail,
  preSubscribed,
}: {
  onClose: () => void
  initialEmail: string
  preSubscribed: boolean
}) {
  const [email, setEmail] = useState(initialEmail)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(preSubscribed)

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !email.includes("@")) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 550)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Accessible Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/45 backdrop-blur-sm cursor-pointer"
        aria-hidden="true"
      />

      {/* Dialog Modal Container */}
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscribe-dialog-title"
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-gray-100 overflow-hidden z-10"
      >
        {/* Ambient mint glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#70CAB9]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close dialog"
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#70CAB9]"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#E6FAF5] text-[#0f7f75] flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3
              id="subscribe-dialog-title"
              className="text-2xl font-bold text-[#1f2937] mb-2 tracking-tight"
            >
              You&apos;re on the list! 🎉
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-sm mx-auto mb-6">
              Thank you for subscribing. We&apos;ve recorded{" "}
              <span className="font-semibold text-[#0f7f75]">
                {email || "your email"}
              </span>
              . You will receive the latest carrier discounts, feature
              updates, and logistics insights directly in your inbox.
            </p>
            <HoverButton
              onClick={onClose}
              size="md"
              className="w-full justify-center shadow-sm"
            >
              <span>Done</span>
            </HoverButton>
          </div>
        ) : (
          <div>
            <div className="w-12 h-12 mb-4 rounded-2xl bg-[#E6FAF5] text-[#0f7f75] flex items-center justify-center border border-[#70CAB9]/30 shadow-2xs">
              <Mail className="w-6 h-6" />
            </div>
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#0f7f75] mb-2">
              Stay Informed
            </span>
            <h3
              id="subscribe-dialog-title"
              className="text-2xl sm:text-3xl font-bold text-[#1f2937] tracking-tight mb-2"
            >
              Subscribe to Zineps Updates
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-6">
              Get the latest shipping intelligence, carrier rate benchmark
              drops, and product releases directly to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  autoFocus
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-[#1f2937] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#70CAB9] focus:border-transparent shadow-2xs transition-all"
                />
              </div>

              <HoverButton
                type="submit"
                size="md"
                className="w-full justify-center shadow-md"
              >
                <span>
                  {isSubmitting
                    ? "Subscribing..."
                    : "Subscribe to Updates"}
                </span>
                {!isSubmitting && <ArrowRight className="w-4 h-4" />}
              </HoverButton>

              <p className="text-[11px] text-neutral-400 text-center">
                We respect your privacy. Unsubscribe anytime with a single
                click.
              </p>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function SubscribeDialog({
  isOpen,
  onClose,
  initialEmail = "",
  preSubscribed = false,
}: SubscribeDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <SubscribeDialogContent
          key={isOpen ? `${initialEmail}-${preSubscribed}` : "closed"}
          onClose={onClose}
          initialEmail={initialEmail}
          preSubscribed={preSubscribed}
        />
      )}
    </AnimatePresence>
  )
}

const differentiationItems = [
  {
    title: "Building Together",
    description:
      "We build together with our customers and continuously improve based on their feedback.",
  },
  {
    title: "Personal Contact",
    description:
      "At Zineps, we stay close to our customers with dedicated support so no one stands alone.",
  },
  {
    title: "Strong Partnerships",
    description:
      "Discounted carrier rates, smart workflows, and expert guidance for stores & 3PLs.",
  },
  {
    title: "Focus on Technology",
    description:
      "Modern automation tools that make e-commerce shipping faster, simpler, and resilient.",
  },
]

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const watermarkRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { amount: 0.1, once: true })

  const [inlineEmail, setInlineEmail] = useState("")
  const [inlineSubscribed, setInlineSubscribed] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [dialogInitialEmail, setDialogInitialEmail] = useState("")
  const [dialogPreSubscribed, setDialogPreSubscribed] = useState(false)

  useEffect(() => {
    if (getDeviceProfile().prefersReducedMotion) return

    let animId = 0
    let lastTime = performance.now()
    let lastScrollY = window.scrollY
    let velocity = 0
    let currentRotation = 0
    let running = false
    let isVisible = true
    let isPageVisible = !document.hidden

    const handleWheel = (e: WheelEvent) => {
      velocity += e.deltaY * 0.35
    }

    window.addEventListener("wheel", handleWheel, { passive: true })

    const updateRotation = (now: number) => {
      if (!running) return
      const dt = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now

      // Check window scroll displacement (captures Lenis smooth scroll and native scroll)
      const currentScrollY = window.scrollY
      const deltaScrollY = currentScrollY - lastScrollY
      lastScrollY = currentScrollY

      if (Math.abs(deltaScrollY) > 0.05) {
        velocity += deltaScrollY * 1.6
      }

      // Exponential decay of angular velocity (friction/inertia)
      velocity *= Math.pow(0.05, dt)

      // Clamp max rotational velocity for elegant, disorient-free motion
      const clampedVelocity = Math.max(-900, Math.min(900, velocity))

      if (Math.abs(clampedVelocity) > 0.04) {
        currentRotation = (currentRotation + clampedVelocity * dt) % 360
        if (watermarkRef.current) {
          watermarkRef.current.style.transform = `rotate(${currentRotation.toFixed(2)}deg)`
        }
      } else {
        velocity = 0
      }

      if (!isVisible || !isPageVisible) {
        running = false
        return
      }
      animId = requestAnimationFrame(updateRotation)
    }

    const tryStart = () => {
      if (isVisible && isPageVisible && !running) {
        running = true
        lastTime = performance.now()
        animId = requestAnimationFrame(updateRotation)
      }
    }

    const unobserve = sectionRef.current
      ? observeVisibility(sectionRef.current, (visible) => {
          isVisible = visible
          if (visible) tryStart()
          else running = false
        })
      : () => {}

    const onPageVisibility = () => {
      isPageVisible = !document.hidden
      if (isPageVisible) tryStart()
      else running = false
    }
    document.addEventListener("visibilitychange", onPageVisibility)

    tryStart()

    return () => {
      running = false
      window.removeEventListener("wheel", handleWheel)
      document.removeEventListener("visibilitychange", onPageVisibility)
      unobserve()
      cancelAnimationFrame(animId)
    }
  }, [])

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inlineEmail || !inlineEmail.includes("@")) return

    setInlineSubscribed(true)
    setDialogInitialEmail(inlineEmail)
    setDialogPreSubscribed(true)
    setIsDialogOpen(true)
  }

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Ambient background mint glows matching Hero and BentoFeatures */}
      <div className="absolute top-1/4 -left-48 w-[620px] h-[620px] bg-[#70CAB9]/14 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-[620px] h-[620px] bg-[#70CAB9]/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(112,202,185,0.08),rgba(255,255,255,0))] pointer-events-none" />

      <div
        ref={sectionRef}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Unified Master Frosted Glass Bento Hub combining Differentiation + CTA */}
        <div className="relative w-full rounded-[36px] sm:rounded-[44px] bg-white/80 backdrop-blur-2xl border border-white/90 shadow-[0_25px_80px_rgba(15,127,117,0.08),0_1px_3px_rgba(0,0,0,0.03),0_0_0_1px_rgba(255,255,255,0.85)] p-8 sm:p-12 lg:p-14 overflow-hidden">
          {/* Subtle Background Watermark Emblem with Scroll-Driven Rotation */}
          <div
            ref={watermarkRef}
            style={{ transformOrigin: "50% 50%" }}
            className="absolute -top-16 -right-16 w-80 h-80 sm:w-[440px] sm:h-[440px] opacity-[0.05] text-[#0f7f75] pointer-events-none select-none origin-center will-change-transform"
          >
            <ZinepsWatermark className="w-full h-full" />
          </div>

          {/* Top Main Grid: Left CTA Content + Right Differentiation Pillars */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* --- LEFT COLUMN (6 COLS): HIGH-CONVERSION CTA ENGINE --- */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Heading with Brand Gradient Accent (1st in sequence: 50ms) */}
              <FadeBlur
                inView={isInView}
                delay={0.05}
                duration={0.55}
                yOffset={14}
                blur="10px"
                className="w-full"
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1f2937] tracking-tight leading-[1.14] mb-5">
                  Ready to streamline your entire{" "}
                  <span className="block bg-gradient-to-r from-[#1c3833] via-[#3d5f56] to-[#60948A] bg-clip-text text-transparent">
                    shipping workflow?
                  </span>
                </h2>
              </FadeBlur>

              {/* Paragraph Description (2nd in sequence: 160ms) */}
              <FadeBlur
                inView={isInView}
                delay={0.16}
                duration={0.55}
                yOffset={14}
                blur="10px"
                className="w-full"
              >
                <p className="text-sm sm:text-base lg:text-lg text-[#525151] leading-relaxed mb-7 font-normal max-w-xl">
                  Connect your webshop, access discounted carrier rates, and
                  automate labels and returns with intelligent routing — all from
                  one intuitive, unified platform.
                </p>
              </FadeBlur>

              {/* Action Buttons Row (3rd in sequence: 280ms) */}
              <FadeBlur
                inView={isInView}
                delay={0.28}
                duration={0.55}
                yOffset={12}
                blur="8px"
                className="w-full"
              >
                <div className="flex flex-wrap items-center gap-3.5 mb-5">
                  <HoverButton
                    href="https://app.zineps.com/Account/Register"
                    target="_blank"
                    rel="noopener noreferrer"
                    size="md"
                    className="shadow-md"
                  >
                    <span>Start your free trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </HoverButton>

                  <HoverButton
                    href="mailto:info@zineps.com"
                    variant="outline"
                    size="md"
                  >
                    <span>Talk to an expert</span>
                  </HoverButton>
                </div>
              </FadeBlur>

              {/* Subtle Reassurance Bar (4th in sequence: 400ms) */}
              <FadeBlur
                inView={isInView}
                delay={0.4}
                duration={0.55}
                yOffset={10}
                blur="8px"
              >
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-neutral-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#0f7f75] font-bold">✓</span> Free
                    14-day trial
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#0f7f75] font-bold">✓</span> No
                    credit card required
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="text-[#0f7f75] font-bold">✓</span> Setup
                    in 5 minutes
                  </span>
                </div>
              </FadeBlur>
            </div>

            {/* --- RIGHT COLUMN (6 COLS): DIFFERENTIATION VALUE PILLARS --- */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              {/* Right Heading (5th in sequence: 520ms) */}
              <FadeBlur
                inView={isInView}
                delay={0.52}
                duration={0.55}
                yOffset={14}
                blur="10px"
              >
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1f2937] tracking-tight leading-snug mb-2">
                  An approach that goes beyond the{" "}
                  <span className="block sm:inline text-[#60948A]">
                    standard
                  </span>
                </h3>
              </FadeBlur>

              {/* Right Description (6th in sequence: 640ms) */}
              <FadeBlur
                inView={isInView}
                delay={0.64}
                duration={0.55}
                yOffset={14}
                blur="10px"
              >
                <p className="text-xs sm:text-sm text-[#525151] leading-relaxed max-w-lg mb-6">
                  We set a new benchmark in shipping technology with continuous
                  innovation, close collaboration, and dedicated customer care.
                </p>
              </FadeBlur>

              {/* 4 Cards (7th, 8th, 9th, 10th in sequence: 760ms - 1120ms) */}
              <div className="grid sm:grid-cols-2 gap-3.5 sm:gap-4">
                {differentiationItems.map((item, idx) => (
                  <FadeBlur
                    key={item.title}
                    inView={isInView}
                    delay={0.76 + idx * 0.12}
                    duration={0.55}
                    yOffset={12}
                    blur="8px"
                  >
                    <div className="rounded-2xl p-5 bg-white/80 hover:bg-[#E6FAF5]/35 border border-gray-100 shadow-xs hover:border-[#70CAB9]/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 h-full">
                      <h4 className="text-sm sm:text-base font-bold text-[#1f2937] tracking-tight mb-1.5">
                        {item.title}
                      </h4>
                      <p className="text-xs text-[#525151] leading-relaxed font-normal">
                        {item.description}
                      </p>
                    </div>
                  </FadeBlur>
                ))}
              </div>
            </div>
          </div>

          {/* --- BOTTOM-MOST: EMAIL SUBSCRIBE BAR (11th in sequence: 1250ms) --- */}
          <FadeBlur
            inView={isInView}
            delay={1.25}
            duration={0.55}
            yOffset={12}
            blur="10px"
            className="w-full mt-10 pt-8 border-t border-gray-100/90"
          >
            <form
              onSubmit={handleInlineSubmit}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto items-center"
            >
              <div className="relative flex-1 w-full">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="email"
                  value={inlineEmail}
                  onChange={(e) => setInlineEmail(e.target.value)}
                  placeholder="Enter your work email address"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200/90 rounded-xl text-sm text-[#1f2937] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#70CAB9] focus:border-transparent shadow-2xs transition-all"
                />
              </div>
              <HoverButton
                type="submit"
                size="md"
                className="w-full sm:w-auto whitespace-nowrap shadow-xs"
              >
                <span>{inlineSubscribed ? "Subscribed! ✓" : "Subscribe"}</span>
              </HoverButton>
            </form>
          </FadeBlur>
        </div>
      </div>

      {/* Accessible Email Subscribe Dialog (Modal) */}
      <SubscribeDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        initialEmail={dialogInitialEmail}
        preSubscribed={dialogPreSubscribed}
      />
    </section>
  )
}
