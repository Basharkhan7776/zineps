"use client"
import { useRef, useState, useEffect, type ReactNode } from "react"
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  motion,
  MotionValue,
} from "framer-motion"

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | ReactNode
  children: ReactNode
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Smooth scroll spring with inertia & subtle trailing delay for locked 60fps fluid motion
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 75,
    damping: 24,
    mass: 0.6,
    restDelta: 0.0001,
  })

  // All transforms driven by spring-smoothed scroll
  const scrollRotateX = useTransform(smoothScroll, [0, 0.46], [36, 0])
  const scrollRotateZ = useTransform(smoothScroll, [0, 0.46], [-4, 0])
  const scrollTranslateZ = useTransform(smoothScroll, [0, 0.46], [-80, 0])
  const scale = useTransform(smoothScroll, [0, 0.46], isMobile ? [0.85, 0.98] : [1.04, 1.0])
  const translate = useTransform(smoothScroll, [0, 0.46], [0, -35])

  // Dynamic depth shadow on top that gently softens as tablet levels out
  const topDepthOpacity = useTransform(smoothScroll, [0, 0.46], [0.65, 0])

  // High-performance spring-damped mouse parallax without layout thrashing
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 30, stiffness: 90, mass: 0.4 }
  const mouseTiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig)
  const mouseTiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    // Window-relative calculation prevents getBoundingClientRect layout reflows for smooth 60fps
    const x = e.clientX / window.innerWidth - 0.5
    const y = e.clientY / window.innerHeight - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div
      className="h-[48rem] sm:h-[58rem] md:h-[68rem] flex items-center justify-center relative p-2 md:p-6"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pt-1 md:pt-3 pb-2 md:pb-8 w-full relative"
        style={{
          perspective: "950px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <TabletCard
          scrollRotateX={scrollRotateX}
          scrollRotateZ={scrollRotateZ}
          scrollTranslateZ={scrollTranslateZ}
          mouseTiltX={mouseTiltX}
          mouseTiltY={mouseTiltY}
          scale={scale}
          topDepthOpacity={topDepthOpacity}
        >
          {children}
        </TabletCard>
      </div>
    </div>
  )
}

export const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: string | ReactNode
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center will-change-transform"
    >
      {titleComponent}
    </motion.div>
  )
}

export const TabletCard = ({
  scrollRotateX,
  scrollRotateZ,
  scrollTranslateZ,
  mouseTiltX,
  mouseTiltY,
  scale,
  topDepthOpacity,
  children,
}: {
  scrollRotateX: MotionValue<number>
  scrollRotateZ: MotionValue<number>
  scrollTranslateZ: MotionValue<number>
  mouseTiltX: MotionValue<number>
  mouseTiltY: MotionValue<number>
  scale: MotionValue<number>
  topDepthOpacity: MotionValue<number>
  children: ReactNode
}) => {
  // Combine scroll rotation and mouse tilt with smooth 60fps interpolation
  const combinedRotateX = useTransform(
    [scrollRotateX, mouseTiltX],
    ([scrollX, mouseX]: number[]) => scrollX + mouseX
  )
  const combinedRotateY = mouseTiltY

  return (
    <div className="relative max-w-6xl mt-2 md:mt-4 mx-auto w-full px-2 sm:px-4">
      {/* Ambient Top Backlight Glow for 3D spatial depth */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-4/5 h-24 bg-gradient-to-b from-[#70CAB9]/25 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* 3D Tilting Tablet with smooth spring inertia and zero jitter */}
      <motion.div
        style={{
          rotateX: combinedRotateX,
          rotateY: combinedRotateY,
          rotateZ: scrollRotateZ,
          z: scrollTranslateZ,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden",
          boxShadow:
            "0 8px 24px -4px rgba(0, 0, 0, 0.12), 0 16px 32px -8px rgba(0, 0, 0, 0.08)",
        }}
        className="transform-gpu max-w-6xl mx-auto w-full border-[2.5px] border-[#3b4758] border-t-[3.5px] border-t-white/30 p-2 sm:p-3 md:p-4 bg-gradient-to-b from-[#242c38] via-[#1a2028] to-[#12161c] rounded-[24px] sm:rounded-[34px] md:rounded-[44px] relative"
      >
        {/* Extruded top rim highlight bevel */}
        <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none z-30" />

        {/* Tablet Screen Container with Inner Depth and Gloss */}
        <div className="relative w-full h-[22rem] sm:h-[30rem] md:h-[44rem] overflow-hidden rounded-[16px] sm:rounded-[24px] md:rounded-[32px] bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.95)] border border-white/10">
          {/* Subtle diagonal glass gloss reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none z-20" />

          {/* Realistic depth falloff shadow on the top edge (stronger when tilted back) */}
          <motion.div
            style={{ opacity: topDepthOpacity }}
            className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-20 will-change-opacity"
          />

          {/* Inner bezel depth border & shadow */}
          <div className="absolute inset-0 shadow-[inset_0_1px_3px_rgba(255,255,255,0.2),inset_0_0_25px_rgba(0,0,0,0.85)] pointer-events-none z-20" />

          {/* Screen Content */}
          <div className="w-full h-full overflow-hidden bg-gray-50 dark:bg-zinc-900">
            {children}
          </div>
        </div>
      </motion.div>

      {/* Ambient Depth Contact Shadow - Soft, subtle and light */}
      <div className="w-[70%] mx-auto h-3.5 bg-black/10 blur-lg rounded-full -mt-1 pointer-events-none" />
    </div>
  )
}
