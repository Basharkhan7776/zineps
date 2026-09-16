/* eslint-disable react-refresh/only-export-components */
"use client"

import { forwardRef, useRef, type ReactNode } from "react"
import { getDeviceProfile } from "@/lib/runtime"
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useAnimation,
  type Variants,
  type Transition,
  type TargetAndTransition,
  type HTMLMotionProps,
} from "framer-motion"

// Re-export core framer-motion tools for unified imports
export {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useAnimation,
}

export type { Variants, Transition, TargetAndTransition, HTMLMotionProps }

// Universal animation variants
export const fadeBlurVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(10px)",
    y: 16,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(10px)",
    y: -10,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export const fadeInUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.35,
    },
  },
}

export const scaleBlurVariants: Variants = {
  initial: {
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.96,
  },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.96,
    transition: {
      duration: 0.35,
    },
  },
}

export const staggerContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
}

/** Carousel panel: next enters from the right, previous from the left. */
export const slidePanelVariants: Variants = {
  enter: (dir: number) =>
    getDeviceProfile().prefersReducedMotion
      ? { opacity: 0, x: 0 }
      : { x: dir > 0 ? "100%" : "-100%", opacity: 1 },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
  exit: (dir: number) =>
    getDeviceProfile().prefersReducedMotion
      ? { opacity: 0, x: 0, transition: { duration: 0.25 } }
      : {
          x: dir > 0 ? "-100%" : "100%",
          opacity: 1,
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
        },
}

export interface FadeBlurProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  blur?: string
  yOffset?: number
  inView?: boolean
  trigger?: "mount" | "inView"
  once?: boolean
  amount?: number | "some" | "all"
  as?: "div" | "h1" | "h2" | "h3" | "h4" | "p" | "span" | "section" | "li"
  staggerItem?: boolean
}

/**
 * FadeBlur Component
 * Produces a subtle, luxurious fade in and blur dissolve.
 * Can be controlled via `inView` prop or trigger autonomously.
 */
export const FadeBlur = forwardRef<HTMLDivElement, FadeBlurProps>(
  (
    {
      children,
      className = "",
      delay = 0,
      duration = 0.75,
      blur = "10px",
      yOffset = 14,
      inView,
      trigger = "mount",
      once = false,
      amount = 0.2,
      as = "div",
      staggerItem = false,
      ...rest
    },
    ref
  ) => {
    const Component = motion[as as keyof typeof motion] as typeof motion.div
    const localRef = useRef<HTMLDivElement>(null)
    const selfInView = useInView(localRef, { once, amount })

    const isControlled = typeof inView === "boolean"
    const activeVisible = isControlled ? inView : trigger === "inView" ? selfInView : true
    const useBlur = !getDeviceProfile().prefersReducedMotion
    const blurValue = useBlur ? blur : "0px"

    const bindRef = (node: HTMLDivElement | null) => {
      localRef.current = node
      if (typeof ref === "function") {
        ref(node)
      } else if (ref && "current" in ref) {
        ref.current = node
      }
    }

    if (staggerItem) {
      return (
        <Component
          ref={bindRef}
          variants={{
            initial: { opacity: 0, filter: `blur(${blurValue})`, y: yOffset },
            animate: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration, ease: [0.16, 1, 0.3, 1] },
            },
            exit: {
              opacity: 0,
              filter: `blur(${blurValue})`,
              y: -yOffset * 0.5,
              transition: { duration: duration * 0.45, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className={`transform-gpu will-change-[opacity,transform] ${className}`.trim()}
          {...rest}
        >
          {children}
        </Component>
      )
    }

    const motionProps =
      isControlled || trigger === "inView"
        ? {
            initial: { opacity: 0, filter: `blur(${blurValue})`, y: yOffset },
            animate: activeVisible
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: `blur(${blurValue})`, y: yOffset },
          }
        : {
            initial: { opacity: 0, filter: `blur(${blurValue})`, y: yOffset },
            animate: { opacity: 1, filter: "blur(0px)", y: 0 },
          }

    return (
      <Component
        ref={bindRef}
        {...motionProps}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        exit={{
          opacity: 0,
          filter: `blur(${blurValue})`,
          y: -yOffset * 0.7,
          transition: { duration: duration * 0.6, ease: [0.16, 1, 0.3, 1] },
        }}
        className={`transform-gpu will-change-[opacity,transform] ${className}`.trim()}
        {...rest}
      >
        {children}
      </Component>
    )
  }
)
FadeBlur.displayName = "FadeBlur"

export interface FadeInProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
  delay?: number
  duration?: number
  inView?: boolean
  trigger?: "mount" | "inView"
  once?: boolean
  amount?: number | "some" | "all"
  className?: string
}

export const FadeIn = forwardRef<HTMLDivElement, FadeInProps>(
  (
    {
      children,
      direction = "up",
      distance = 20,
      delay = 0,
      duration = 0.55,
      inView,
      trigger = "mount",
      once = false,
      amount = 0.25,
      className = "",
      ...rest
    },
    ref
  ) => {
    const x = direction === "left" ? distance : direction === "right" ? -distance : 0
    const y = direction === "up" ? distance : direction === "down" ? -distance : 0

    const localRef = useRef<HTMLDivElement>(null)
    const selfInView = useInView(localRef, { once, amount })

    const isControlled = typeof inView === "boolean"
    const activeVisible = isControlled ? inView : trigger === "inView" ? selfInView : true

    const motionProps =
      isControlled || trigger === "inView"
        ? {
            initial: { opacity: 0, x, y },
            animate: activeVisible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y },
          }
        : {
            initial: { opacity: 0, x, y },
            animate: { opacity: 1, x: 0, y: 0 },
          }

    return (
      <motion.div
        ref={(node) => {
          localRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref && "current" in ref) {
            ref.current = node
          }
        }}
        {...motionProps}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }
)
FadeIn.displayName = "FadeIn"

export interface ScaleFadeProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  scale?: number
  blur?: string
  delay?: number
  duration?: number
  inView?: boolean
  trigger?: "mount" | "inView"
  once?: boolean
  amount?: number | "some" | "all"
  className?: string
}

export const ScaleFade = forwardRef<HTMLDivElement, ScaleFadeProps>(
  (
    {
      children,
      scale = 0.95,
      blur = "8px",
      delay = 0,
      duration = 0.6,
      inView,
      trigger = "mount",
      once = false,
      amount = 0.25,
      className = "",
      ...rest
    },
    ref
  ) => {
    const localRef = useRef<HTMLDivElement>(null)
    const selfInView = useInView(localRef, { once, amount })

    const isControlled = typeof inView === "boolean"
    const activeVisible = isControlled ? inView : trigger === "inView" ? selfInView : true

    const motionProps =
      isControlled || trigger === "inView"
        ? {
            initial: { opacity: 0, scale, filter: `blur(${blur})` },
            animate: activeVisible
              ? { opacity: 1, scale: 1, filter: "blur(0px)" }
              : { opacity: 0, scale, filter: `blur(${blur})` },
          }
        : {
            initial: { opacity: 0, scale, filter: `blur(${blur})` },
            animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
          }

    return (
      <motion.div
        ref={(node) => {
          localRef.current = node
          if (typeof ref === "function") {
            ref(node)
          } else if (ref && "current" in ref) {
            ref.current = node
          }
        }}
        {...motionProps}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }
)
ScaleFade.displayName = "ScaleFade"

export interface PulseBlurProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  className?: string
  duration?: number
  minOpacity?: number
  maxOpacity?: number
  blur?: string
}

/**
 * PulseBlur Component
 * Ambient subtle breathing animation that gently fades and blurs in/out continuously.
 */
export const PulseBlur = forwardRef<HTMLDivElement, PulseBlurProps>(
  (
    {
      children,
      className = "",
      duration = 3.5,
      minOpacity = 0.88,
      maxOpacity = 1,
      blur = "3px",
      ...rest
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        animate={{
          opacity: [maxOpacity, minOpacity, maxOpacity],
          filter: ["blur(0px)", `blur(${blur})`, "blur(0px)"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }
)
PulseBlur.displayName = "PulseBlur"

export interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: ReactNode
  stagger?: number
  delayChildren?: number
  trigger?: "mount" | "inView"
  once?: boolean
  amount?: number | "some" | "all"
  className?: string
}

export const StaggerContainer = forwardRef<HTMLDivElement, StaggerContainerProps>(
  (
    {
      children,
      stagger = 0.1,
      delayChildren = 0.05,
      trigger = "mount",
      once = true,
      amount = 0.25,
      className = "",
      ...rest
    },
    ref
  ) => {
    const motionProps =
      trigger === "inView"
        ? {
            initial: "initial",
            whileInView: "animate",
            viewport: { once, amount },
          }
        : {
            initial: "initial",
            animate: "animate",
          }

    return (
      <motion.div
        ref={ref}
        {...motionProps}
        exit="exit"
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: stagger,
              delayChildren,
            },
          },
          exit: {
            transition: {
              staggerChildren: stagger * 0.6,
              staggerDirection: -1,
            },
          },
        }}
        className={className}
        {...rest}
      >
        {children}
      </motion.div>
    )
  }
)
StaggerContainer.displayName = "StaggerContainer"

// Unified Motion namespace export
export const Motion = {
  FadeBlur,
  FadeIn,
  ScaleFade,
  PulseBlur,
  StaggerContainer,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  p: motion.p,
  span: motion.span,
  button: motion.button,
  section: motion.section,
}

export default Motion
