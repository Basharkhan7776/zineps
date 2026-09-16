import React from "react"
import { motion, useSpring, useTransform, useScroll } from "framer-motion"
import { cn } from "@/lib/utils"
import { getDeviceProfile } from "@/lib/runtime"

interface CloudParallaxProps {
  children: React.ReactNode
  className?: string
  scrollStrengthY?: number
}

export function CloudParallax({
  children,
  className = "",
  scrollStrengthY = 160,
}: CloudParallaxProps) {
  const reduceMotion = getDeviceProfile().prefersReducedMotion || getDeviceProfile().isLowEnd
  const { scrollY } = useScroll()
  const rawScrollOffset = useTransform(scrollY, [0, 1200], [0, reduceMotion ? 0 : scrollStrengthY])
  const smoothScrollY = useSpring(rawScrollOffset, { damping: 32, stiffness: 180, mass: 0.6, restDelta: 0.001 })

  return (
    <div className={cn("absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0", className)}>
      <motion.div
        style={reduceMotion ? undefined : { y: smoothScrollY }}
        className="w-full h-full scale-[1.06] will-change-transform origin-top"
      >
        {children}
      </motion.div>
    </div>
  )
}

export default CloudParallax
