import { useEffect, useRef, useState, type ReactNode } from "react"

interface InViewMountProps {
  children: ReactNode
  className?: string
  minHeight?: number | string
  rootMargin?: string
  activateOnHash?: string[]
}

/**
 * Mounts children the first time the placeholder approaches the viewport.
 * Stays mounted after that so WebGL / layout does not flash on look-away.
 * Also mounts immediately when a matching location hash is requested.
 */
export function InViewMount({
  children,
  className,
  minHeight,
  rootMargin = "280px 0px",
  activateOnHash,
}: InViewMountProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(() => {
    if (typeof window === "undefined" || !activateOnHash?.length) return false
    return activateOnHash.includes(window.location.hash)
  })

  useEffect(() => {
    if (shown) return
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold: 0 }
    )
    io.observe(el)

    const onHash = () => {
      if (activateOnHash?.includes(window.location.hash)) setShown(true)
    }
    const onClick = (e: MouseEvent) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const a = target.closest("a[href^='#']")
      if (!a) return
      const href = a.getAttribute("href")
      if (href && activateOnHash?.includes(href)) setShown(true)
    }
    window.addEventListener("hashchange", onHash)
    document.addEventListener("click", onClick, true)
    onHash()

    return () => {
      io.disconnect()
      window.removeEventListener("hashchange", onHash)
      document.removeEventListener("click", onClick, true)
    }
  }, [shown, rootMargin, activateOnHash])

  return (
    <div
      ref={ref}
      className={className}
      style={!shown && minHeight != null ? { minHeight } : undefined}
    >
      {shown ? children : null}
    </div>
  )
}
