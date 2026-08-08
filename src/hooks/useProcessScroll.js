import { useEffect } from 'react'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export function useProcessTimeline({ sectionRef, progressRef, stepRefs }) {
  useEffect(() => {
    const section = sectionRef.current
    const progressLine = progressRef.current
    const steps = stepRefs.current.filter(Boolean)
    const timeline = section?.querySelector('.process-timeline')
    if (!section || !timeline || !progressLine || !steps.length) return undefined

    const compactLayout = window.matchMedia('(max-width: 900px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let lastActive = -1

    const render = () => {
      frame = 0
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight
      let progress

      if (compactLayout.matches) {
        const timelineRect = timeline.getBoundingClientRect()
        const start = viewportHeight * 0.72
        const end = viewportHeight * 0.28
        const distance = Math.max(1, timelineRect.height + start - end)
        progress = clamp((start - timelineRect.top) / distance)
        progressLine.style.transform = `scaleY(${progress.toFixed(4)})`
      } else {
        const distance = Math.max(1, section.offsetHeight - viewportHeight)
        progress = clamp(-rect.top / distance)
        progressLine.style.transform = `scaleX(${progress.toFixed(4)})`
      }

      const activeIndex = Math.min(steps.length - 1, Math.floor(progress * steps.length))
      if (activeIndex === lastActive) return

      lastActive = activeIndex
      steps.forEach((step, index) => {
        step.dataset.active = index === activeIndex ? 'true' : 'false'
        step.dataset.complete = index < activeIndex ? 'true' : 'false'
      })
    }

    const requestRender = () => {
      if (frame) return
      frame = window.requestAnimationFrame(render)
    }

    const reset = () => {
      lastActive = -1
      if (reduceMotion.matches) {
        section.removeAttribute('data-process-motion')
        progressLine.style.transform = compactLayout.matches ? 'scaleY(1)' : 'scaleX(1)'
        steps.forEach((step) => {
          step.dataset.active = 'true'
          step.dataset.complete = 'true'
        })
        return
      }

      section.dataset.processMotion = 'true'
      render()
    }

    window.addEventListener('scroll', requestRender, { passive: true })
    window.addEventListener('resize', reset)
    compactLayout.addEventListener('change', reset)
    reduceMotion.addEventListener('change', reset)
    reset()

    return () => {
      window.removeEventListener('scroll', requestRender)
      window.removeEventListener('resize', reset)
      compactLayout.removeEventListener('change', reset)
      reduceMotion.removeEventListener('change', reset)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [progressRef, sectionRef, stepRefs])
}
