export type DeviceProfile = {
  prefersReducedMotion: boolean
  isCoarsePointer: boolean
  isNarrow: boolean
  isLowEnd: boolean
}

let cachedProfile: DeviceProfile | null = null

function readProfile(): DeviceProfile {
  if (typeof window === "undefined") {
    return {
      prefersReducedMotion: false,
      isCoarsePointer: false,
      isNarrow: false,
      isLowEnd: false,
    }
  }

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean }
  }

  return {
    prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    isCoarsePointer: window.matchMedia("(pointer: coarse)").matches,
    isNarrow: window.innerWidth <= 768,
    isLowEnd:
      (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) ||
      (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4) ||
      Boolean(nav.connection?.saveData),
  }
}

export function getDeviceProfile(): DeviceProfile {
  if (!cachedProfile) cachedProfile = readProfile()
  return cachedProfile
}

export function shouldUseSmoothScroll(): boolean {
  const p = getDeviceProfile()
  return !p.prefersReducedMotion && !p.isCoarsePointer && !p.isNarrow && !p.isLowEnd
}

export function getCanvasDpr(): number {
  const p = getDeviceProfile()
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
  if (p.isLowEnd || p.isNarrow) return 1
  return Math.min(dpr, 1.5)
}

export function getWaveDetail(): "low" | "medium" | "high" {
  const p = getDeviceProfile()
  if (p.prefersReducedMotion || p.isLowEnd) return "low"
  if (p.isNarrow) return "medium"
  return "high"
}

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  wait = 150
): (...args: Args) => void {
  let timer: ReturnType<typeof setTimeout> | null = null
  return (...args: Args) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn(...args)
    }, wait)
  }
}

export function rafThrottle<Args extends unknown[]>(
  fn: (...args: Args) => void
): (...args: Args) => void {
  let raf = 0
  let lastArgs: Args | null = null
  return (...args: Args) => {
    lastArgs = args
    if (raf !== 0) return
    raf = requestAnimationFrame(() => {
      raf = 0
      const queued = lastArgs
      lastArgs = null
      if (queued) fn(...queued)
    })
  }
}

export function scrollToId(id: string, attempts = 40) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: "smooth" })
    return
  }
  if (attempts <= 0) return
  requestAnimationFrame(() => scrollToId(id, attempts - 1))
}

export function observeVisibility(
  el: Element,
  onChange: (visible: boolean) => void,
  options?: IntersectionObserverInit
): () => void {
  const io = new IntersectionObserver(([entry]) => {
    onChange(entry.isIntersecting)
  }, { threshold: 0, rootMargin: "80px 0px", ...options })
  io.observe(el)
  return () => io.disconnect()
}
