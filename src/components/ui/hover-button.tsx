import React, { useRef, useState, type MouseEvent, type ReactNode, type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react"

export type HoverButtonVariant = "primary" | "secondary" | "outline" | "white"
export type HoverButtonSize = "sm" | "md" | "lg"

interface BaseProps {
  children: ReactNode
  className?: string
  variant?: HoverButtonVariant
  size?: HoverButtonSize
  glowColor?: string
  scaleOnHover?: boolean
}

export type HoverButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps>)
    | ({ href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>)
  )

export const HoverButton: React.FC<HoverButtonProps> = (props) => {
  const {
    children,
    className = "",
    variant = "primary",
    size = "md",
    glowColor,
    scaleOnHover = true,
    ...restProps
  } = props

  const buttonRef = useRef<HTMLElement | null>(null)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setGlowPosition({ x, y })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  // Size presets
  const sizeStyles: Record<HoverButtonSize, string> = {
    sm: "h-8 sm:h-8.5 px-3.5 sm:px-4 text-xs sm:text-sm rounded-lg",
    md: "h-11 px-6 text-sm sm:text-base rounded-xl",
    lg: "h-12 px-7 text-sm sm:text-base rounded-xl",
  }

  // Variant definitions - using the exact same gradient colors (#70CAB9, #a3e7db, #ffffff) for both resting and hover effect
  const variantStyles: Record<
    HoverButtonVariant,
    {
      container: string
      baseBg: string
      text: string
      hoverGradient: (x: number, y: number) => string
    }
  > = {
    primary: {
      container:
        "border border-[#70CAB9]/45 shadow-sm shadow-[#70CAB9]/15 hover:shadow-md hover:shadow-[#70CAB9]/25 hover:border-[#70CAB9]/70",
      baseBg: "bg-gradient-to-br from-[#70CAB9] via-[#a3e7db] to-[#ffffff]",
      text: "text-[#111827] font-semibold",
      // Uses the exact same gradient colors (#70CAB9 -> #a3e7db -> #ffffff) as the hover effect centered on the cursor
      hoverGradient: (x: number, y: number) =>
        glowColor
          ? `radial-gradient(190px circle at ${x}px ${y}px, ${glowColor} 0%, transparent 80%)`
          : `radial-gradient(190px circle at ${x}px ${y}px, #70CAB9 0%, #a3e7db 42%, #ffffff 88%)`,
    },
    secondary: {
      container: "border border-gray-300 shadow-sm hover:border-gray-400/80 bg-white/85 hover:bg-white",
      baseBg: "bg-white/90",
      text: "text-gray-800 font-semibold",
      hoverGradient: (x: number, y: number) =>
        `radial-gradient(160px circle at ${x}px ${y}px, rgba(112, 202, 185, 0.3) 0%, rgba(163, 231, 219, 0.15) 50%, transparent 80%)`,
    },
    outline: {
      container: "border border-gray-300 shadow-sm hover:bg-gray-50/90",
      baseBg: "bg-white/80",
      text: "text-gray-800 font-semibold",
      hoverGradient: (x: number, y: number) =>
        `radial-gradient(160px circle at ${x}px ${y}px, rgba(112, 202, 185, 0.25) 0%, rgba(163, 231, 219, 0.1) 50%, transparent 80%)`,
    },
    white: {
      container: "border border-white/60 shadow-md hover:shadow-lg bg-white",
      baseBg: "bg-white",
      text: "text-[#2b453e] font-semibold",
      hoverGradient: (x: number, y: number) =>
        `radial-gradient(180px circle at ${x}px ${y}px, rgba(112, 202, 185, 0.35) 0%, rgba(163, 231, 219, 0.15) 55%, transparent 80%)`,
    },
  }

  const v = variantStyles[variant]

  const commonClasses = `
    relative inline-flex items-center justify-center gap-2
    cursor-pointer overflow-hidden select-none
    transition-all duration-300 ease-out
    ${sizeStyles[size]}
    ${v.container}
    ${v.text}
    ${scaleOnHover ? "hover:scale-[1.02] active:scale-[0.98]" : ""}
    ${className}
  `

  const content = (
    <>
      {/* Resting base gradient layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 ${v.baseBg} pointer-events-none transition-transform duration-300`}
      />

      {/* Dynamic cursor-following gradient hover effect using the exact same gradient colors */}
      <span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: v.hoverGradient(glowPosition.x, glowPosition.y),
        }}
      />

      {/* Button content on top */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 leading-none">
        {children}
      </span>
    </>
  )

  if ("href" in props && props.href) {
    const { href, target, rel, ...anchorRest } = restProps as AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        ref={(el) => {
          buttonRef.current = el
        }}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={commonClasses}
        {...anchorRest}
      >
        {content}
      </a>
    )
  }

  const { type = "button", disabled, onClick, ...buttonRest } = restProps as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button
      ref={(el) => {
        buttonRef.current = el
      }}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${commonClasses} ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
      {...buttonRest}
    >
      {content}
    </button>
  )
}
