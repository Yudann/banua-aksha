import { useEffect } from 'react'

export function useAboutParallax(cardRefs, strengths) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return undefined

    let ticking = false

    const update = () => {
      const viewport = window.innerHeight || document.documentElement.clientHeight
      cardRefs.current.forEach((card, index) => {
        if (!card) return
        const rect = card.getBoundingClientRect()
        if (rect.bottom < 0 || rect.top > viewport) return

        const progress = (viewport - rect.top) / (viewport + rect.height)
        const normalized = Math.max(0, Math.min(1, progress)) - 0.5
        const offset = normalized * 22 * (strengths[index] ?? 0.5)
        card.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`)
      })
      ticking = false
    }

    const request = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    update()

    return () => {
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
    }
  }, [cardRefs, strengths])
}
