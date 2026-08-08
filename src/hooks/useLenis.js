import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      const onClick = (event) => {
        const anchor = event.target.closest('a[href^="#"]')
        if (!anchor) return
        const href = anchor.getAttribute('href')
        if (!href) return
        event.preventDefault()
        if (href === '#') {
          window.scrollTo({ top: 0, behavior: 'auto' })
          return
        }
        document.querySelector(href)?.scrollIntoView({ behavior: 'auto', block: 'start' })
      }
      document.addEventListener('click', onClick)
      return () => document.removeEventListener('click', onClick)
    }

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.92,
      touchMultiplier: 1,
    })

    let frame = 0
    const raf = (time) => {
      lenis.raf(time)
      frame = window.requestAnimationFrame(raf)
    }
    frame = window.requestAnimationFrame(raf)

    const onClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return
      event.preventDefault()

      if (href === '#') {
        lenis.scrollTo(0, { duration: 1.15 })
        return
      }

      const target = document.querySelector(href)
      if (target) lenis.scrollTo(target, { duration: 1.15, offset: 0 })
    }

    const onMenuLock = (event) => {
      if (event.detail?.locked) lenis.stop()
      else lenis.start()
    }

    document.addEventListener('click', onClick)
    window.addEventListener('site-menu-lock', onMenuLock)

    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('site-menu-lock', onMenuLock)
      window.cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}
