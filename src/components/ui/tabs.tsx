"use client"
import { useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export type Tab = {
  title: string
  value: string
  content?: string | ReactNode
}

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[]
  containerClassName?: string
  activeTabClassName?: string
  tabClassName?: string
  contentClassName?: string
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0])
  const [tabs, setTabs] = useState<Tab[]>(propTabs)

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs]
    const selectedTab = newTabs.splice(idx, 1)
    newTabs.unshift(selectedTab[0])
    setTabs(newTabs)
    setActive(newTabs[0])
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              moveSelectedTabToTop(idx)
            }}
            className={cn("relative px-4 py-3 rounded-t-xl", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-[#60948A] via-[#4a7569] to-[#3d5f56] rounded-t-xl shadow-lg",
                  activeTabClassName
                )}
              />
            )}

            <span
              className={cn(
                "relative block font-semibold text-xs sm:text-sm md:text-base transition-colors",
                active.value === tab.value
                  ? "text-white"
                  : "text-[#424242] hover:text-[#2b2b2b]"
              )}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        className={cn("mt-2", contentClassName)}
      />
    </div>
  )
}

export const FadeInDiv = ({
  className,
  tabs,
}: {
  className?: string
  key?: string
  tabs: Tab[]
  active: Tab
}) => {
  return (
    <div className={cn("relative w-full h-full", className)}>
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.05,
            top: idx * -10,
            zIndex: -idx,
            opacity: idx < 2 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: idx === 0 ? [0, 10, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  )
}
