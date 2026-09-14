"use client"
import { useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string
    description: string
    icon?: string | ReactNode
    link?: string
  }[]
  className?: string
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4 py-4",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#70CAB9]/15 dark:bg-slate-800/[0.8] block rounded-2xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <div className="rounded-xl h-full w-full p-6 overflow-hidden bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 group-hover:border-[#70CAB9]/40 relative z-20 shadow-sm transition-colors">
            <div className="relative z-50">
              {item.icon && (
                <div className="mb-4">
                  {typeof item.icon === "string" ? (
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="w-8 h-8 object-contain"
                    />
                  ) : (
                    item.icon
                  )}
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2 text-[#424242] dark:text-zinc-100 tracking-tight">
                {item.title}
              </h3>
              <p className="text-[#525151] dark:text-zinc-400 text-sm md:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
