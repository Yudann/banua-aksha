import { useEffect } from 'react'
import { processConfig } from '../data/processConfig'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
const responsiveValue = (viewport, config) => clamp(viewport * config.factor, config.min, config.max)

export function useProcessScroll({ sectionRef, introRef, trackRef, cardRefs }) {
  useEffect(() => {
    const section = sectionRef.current
    const intro = introRef.current
    const track = trackRef.current
    const cards = cardRefs.current.filter(Boolean)
    if (!section || !intro || !track || !cards.length) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const compactLayout = window.matchMedia('(max-width: 900px)')

    let alive = true
    let horizontalTravel = 0
    let targetProgress = 0
    let renderedProgress = 0
    let frame = 0

    const isDesktopMotion = () => !reduceMotion.matches && !compactLayout.matches

    const getScrollProgress = () => {
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const distance = Math.max(1, section.offsetHeight - viewportHeight)
      return clamp(-rect.top / distance, 0, 1)
    }

    const layoutDesktop = () => {
      if (!isDesktopMotion()) return

      const viewportWidth = window.innerWidth || document.documentElement.clientWidth
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      const cardWidth = cards[0]?.offsetWidth || 240
      const introLeft = intro.offsetLeft
      const introWidth = intro.offsetWidth
      const firstGap = responsiveValue(viewportWidth, processConfig.firstGap)
      const spacing = responsiveValue(viewportWidth, processConfig.spacing)
      const endGap = responsiveValue(viewportWidth, processConfig.endGap)
      const firstCardX = introLeft + introWidth + firstGap

      cards.forEach((card, index) => {
        card.style.left = `${Math.round(firstCardX + spacing * index)}px`
      })

      const trackWidth = firstCardX + spacing * (cards.length - 1) + cardWidth + endGap
      track.style.width = `${Math.ceil(trackWidth)}px`

      horizontalTravel = Math.max(
        0,
        trackWidth - viewportWidth + responsiveValue(viewportWidth, processConfig.travelExtra),
      )

      const scrollDistance = horizontalTravel * processConfig.scrollMultiplier
      section.style.height = `${Math.ceil(viewportHeight + scrollDistance)}px`
    }

    const render = (progress) => {
      if (!isDesktopMotion()) {
        track.style.transform = ''
        intro.style.transform = ''
        cards.forEach((card) => {
          card.style.transform = ''
          card.style.left = ''
        })
        return
      }

      const x = -horizontalTravel * progress
      track.style.transform = `translate3d(${x.toFixed(2)}px, 0, 0)`
      intro.style.transform = `translate3d(${x.toFixed(2)}px, -50%, 0)`

      cards.forEach((card, index) => {
        const lower = card.dataset.position === 'lower'
        const distance = lower ? processConfig.lowerY[index] : processConfig.upperY[index]
        const y = distance * progress
        card.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
      })
    }

    const animate = () => {
      frame = 0
      const delta = targetProgress - renderedProgress
      renderedProgress += delta * processConfig.smoothing
      if (Math.abs(delta) < 0.0006) renderedProgress = targetProgress
      render(renderedProgress)
      if (Math.abs(targetProgress - renderedProgress) > 0.0006) {
        frame = window.requestAnimationFrame(animate)
      }
    }

    const requestRender = () => {
      if (!isDesktopMotion()) return
      targetProgress = getScrollProgress()
      if (!frame) frame = window.requestAnimationFrame(animate)
    }

    const reset = () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
        frame = 0
      }

      if (!isDesktopMotion()) {
        section.style.height = ''
        track.style.width = ''
        track.style.transform = ''
        intro.style.transform = ''
        cards.forEach((card) => {
          card.style.left = ''
          card.style.transform = ''
        })
        return
      }

      layoutDesktop()
      targetProgress = getScrollProgress()
      renderedProgress = targetProgress
      render(renderedProgress)
    }

    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', reset)
    reduceMotion.addEventListener?.('change', reset)
    compactLayout.addEventListener?.('change', reset)

    if (document.fonts?.ready) document.fonts.ready.then(() => { if (alive) reset() })
    else reset()

    return () => {
      alive = false
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', reset)
      reduceMotion.removeEventListener?.('change', reset)
      compactLayout.removeEventListener?.('change', reset)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [cardRefs, introRef, sectionRef, trackRef])
}
