import { useEffect } from 'react'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))
const mix = (from, to, progress) => from + (to - from) * progress
const smooth = (value) => {
  const progress = clamp(value)
  return progress * progress * (3 - 2 * progress)
}
const segment = (value, from, to) => smooth((value - from) / (to - from))

export function useHeroAboutJourney({
  journeyRef,
  stageRef,
  mediaRef,
  heroContentRef,
  aboutBackgroundRef,
  headlineRef,
  featuredRef,
  featuredContentRef,
  satelliteRefs,
}) {
  useEffect(() => {
    const journey = journeyRef.current
    const stage = stageRef.current
    const media = mediaRef.current
    const heroContent = heroContentRef.current
    const aboutBackground = aboutBackgroundRef.current
    const headline = headlineRef.current
    const featured = featuredRef.current
    const featuredContent = featuredContentRef.current
    const satellites = satelliteRefs.current.filter(Boolean)

    if (
      !journey || !stage || !media || !heroContent || !aboutBackground ||
      !headline || !featured || !featuredContent || satellites.length !== 4
    ) return undefined

    const desktopMotion = window.matchMedia('(min-width: 901px) and (min-height: 720px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let frame = 0
    let active = false
    let geometry = null

    const setVisual = (node, opacity, x, y, scale = 1) => {
      node.style.opacity = opacity.toFixed(3)
      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
    }

    const measure = () => {
      const stageRect = stage.getBoundingClientRect()
      const targetRect = featured.getBoundingClientRect()
      const viewportWidth = stageRect.width
      const viewportHeight = stageRect.height

      if (!viewportWidth || !viewportHeight || !targetRect.width || !targetRect.height) return null

      const target = {
        left: targetRect.left - stageRect.left,
        top: targetRect.top - stageRect.top,
        width: targetRect.width,
        height: targetRect.height,
      }

      const finalScale = Math.max(target.width / viewportWidth, target.height / viewportHeight)
      const renderedWidth = viewportWidth * finalScale
      const renderedHeight = viewportHeight * finalScale
      const finalLeft = target.left + target.width / 2 - renderedWidth / 2
      const finalTop = target.top + target.height / 2 - renderedHeight / 2

      const clipTop = (target.top - finalTop) / finalScale
      const clipLeft = (target.left - finalLeft) / finalScale
      const clipRight = viewportWidth - clipLeft - target.width / finalScale
      const clipBottom = viewportHeight - clipTop - target.height / finalScale

      return {
        viewportWidth,
        viewportHeight,
        finalScale,
        finalLeft,
        finalTop,
        clipTop,
        clipRight,
        clipBottom,
        clipLeft,
        radius: 15 / finalScale,
      }
    }

    const resetInlineStyles = () => {
      [media, heroContent, aboutBackground, headline, featuredContent, ...satellites]
        .filter(Boolean)
        .forEach((node) => node.removeAttribute('style'))
      journey.removeAttribute('data-journey-active')
      journey.removeAttribute('data-journey-settled')
      active = false
      geometry = null
    }

    const render = () => {
      frame = 0
      if (!active || !geometry) return

      const rect = journey.getBoundingClientRect()
      const distance = Math.max(1, journey.offsetHeight - geometry.viewportHeight)
      const progress = clamp(-rect.top / distance)

      const heroExit = segment(progress, 0.07, 0.25)
      const morph = segment(progress, 0.14, 0.65)
      const canvasReveal = segment(progress, 0.14, 0.36)
      const headlineReveal = segment(progress, 0.34, 0.58)
      const featuredReveal = segment(progress, 0.64, 0.78)

      setVisual(heroContent, 1 - heroExit, 0, mix(0, -26, heroExit), mix(1, 0.985, heroExit))
      heroContent.style.pointerEvents = heroExit > 0.92 ? 'none' : 'auto'
      aboutBackground.style.opacity = canvasReveal.toFixed(3)
      setVisual(headline, headlineReveal, 0, mix(28, 0, headlineReveal))
      setVisual(featuredContent, featuredReveal, 0, mix(20, 0, featuredReveal))

      const scale = mix(1, geometry.finalScale, morph)
      const x = mix(0, geometry.finalLeft, morph)
      const y = mix(0, geometry.finalTop, morph)
      const clipTop = mix(0, geometry.clipTop, morph)
      const clipRight = mix(0, geometry.clipRight, morph)
      const clipBottom = mix(0, geometry.clipBottom, morph)
      const clipLeft = mix(0, geometry.clipLeft, morph)
      const radius = mix(0, geometry.radius, morph)

      media.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${scale.toFixed(5)})`
      media.style.clipPath = `inset(${clipTop.toFixed(2)}px ${clipRight.toFixed(2)}px ${clipBottom.toFixed(2)}px ${clipLeft.toFixed(2)}px round ${radius.toFixed(2)}px)`
      media.style.filter = `saturate(${mix(1, 0.9, morph).toFixed(3)}) brightness(${mix(1, 0.76, morph).toFixed(3)})`

      const cardTimings = [
        [0.57, 0.75, -74, -28],
        [0.66, 0.84, -68, 34],
        [0.61, 0.79, 72, -24],
        [0.70, 0.88, 78, 36],
      ]

      satellites.forEach((card, index) => {
        const [from, to, initialX, initialY] = cardTimings[index]
        const reveal = segment(progress, from, to)
        setVisual(card, reveal, mix(initialX, 0, reveal), mix(initialY, 0, reveal), mix(0.975, 1, reveal))
      })

      journey.dataset.journeySettled = progress > 0.9 ? 'true' : 'false'
    }

    const requestRender = () => {
      if (!active || frame) return
      frame = window.requestAnimationFrame(render)
    }

    const activate = () => {
      if (!desktopMotion.matches || reduceMotion.matches) {
        if (active) resetInlineStyles()
        return
      }

      journey.dataset.journeyActive = 'true'
      active = true

      window.requestAnimationFrame(() => {
        geometry = measure()
        if (geometry) render()
      })
    }

    const remeasure = () => {
      if (!active) return
      geometry = measure()
      requestRender()
    }

    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', remeasure)
    desktopMotion.addEventListener?.('change', activate)
    reduceMotion.addEventListener?.('change', activate)

    if (document.fonts?.ready) document.fonts.ready.then(activate)
    else activate()

    return () => {
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', remeasure)
      desktopMotion.removeEventListener?.('change', activate)
      reduceMotion.removeEventListener?.('change', activate)
      if (frame) window.cancelAnimationFrame(frame)
      resetInlineStyles()
    }
  }, [
    aboutBackgroundRef,
    featuredContentRef,
    featuredRef,
    headlineRef,
    heroContentRef,
    journeyRef,
    mediaRef,
    satelliteRefs,
    stageRef,
  ])
}
