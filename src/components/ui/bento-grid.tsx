import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string
  children?: ReactNode
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  badge,
}: {
  className?: string
  title?: string | ReactNode
  description?: string | ReactNode
  header?: ReactNode
  icon?: ReactNode
  badge?: ReactNode
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-6 bg-white dark:bg-zinc-900/60 border border-gray-200/80 dark:border-zinc-800 justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-1 transition duration-200">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          {badge}
        </div>
        <div className="font-semibold text-lg md:text-xl text-[#424242] dark:text-neutral-200 mb-2 mt-1">
          {title}
        </div>
        <div className="font-normal text-sm md:text-base text-[#525151] dark:text-neutral-300 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  )
}
