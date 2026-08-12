import { useEffect, useRef, useState } from 'react'
import { commitments } from '../data/commitments'
import { useInView } from '../hooks/useInView'

const imagePositions = ['50% 48%', '50% 50%', '50% 43%', '50% 46%', '50% 48%', '50% 50%']

export default function Commitments() {
  const [sectionRef, visible] = useInView({ threshold: 0.08 })
  const railRef = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [pageActive, setPageActive] = useState(!document.hidden)

  useEffect(() => {
    const rail = railRef.current
    const compact = window.matchMedia('(max-width: 760px)')
    if (!rail) return undefined

    let frame = 0
    const updateFromScroll = () => {
      frame = 0
      if (!compact.matches) return

      const buttons = [...rail.querySelectorAll('button')]
      const center = rail.scrollLeft + rail.clientWidth / 2
      let nearest = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      buttons.forEach((button, index) => {
        const buttonCenter = button.offsetLeft + button.offsetWidth / 2
        const distance = Math.abs(buttonCenter - center)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearest = index
        }
      })

      setActive((current) => (current === nearest ? current : nearest))
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateFromScroll)
    }

    rail.addEventListener('scroll', requestUpdate, { passive: true })
    compact.addEventListener('change', requestUpdate)
    updateFromScroll()

    return () => {
      rail.removeEventListener('scroll', requestUpdate)
      compact.removeEventListener('change', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  useEffect(() => {
    const onVisibilityChange = () => setPageActive(!document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!visible || paused || !pageActive || reduceMotion) return undefined

    const timer = window.setTimeout(() => {
      const next = (active + 1) % commitments.length
      setActive(next)

      const rail = railRef.current
      const button = rail?.querySelectorAll('button')[next]
      if (rail && button && window.matchMedia('(max-width: 760px)').matches) {
        rail.scrollTo({
          left: button.offsetLeft - (rail.clientWidth - button.offsetWidth) / 2,
          behavior: 'smooth',
        })
      }
    }, 5600)

    return () => window.clearTimeout(timer)
  }, [active, pageActive, paused, visible])

  return (
    <section
      ref={sectionRef}
      id="komitmen"
      className="commitment-canvas"
      data-visible={visible}
      aria-labelledby="commitments-title"
    >
      <div className="commitment-canvas-shell">
        <header className="commitment-canvas-header">
          <p>04 — KEUNGGULAN &amp; KOMITMEN</p>
          <h2 id="commitments-title">
            <span>Bekerja dengan standar</span>
            <span>yang dapat diandalkan.</span>
          </h2>
        </header>

        <div
          className="commitment-canvas-stage"
          data-nav-surface="dark"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false)
          }}
        >
          <div className="commitment-canvas-media">
            {commitments.map((item, index) => (
              <figure key={item.number} data-active={active === index} aria-hidden={active !== index}>
                <img
                  src={item.image}
                  alt={active === index ? item.alt : ''}
                  width="1672"
                  height="941"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ objectPosition: imagePositions[index] }}
                />
              </figure>
            ))}
            <div className="commitment-canvas-shade" aria-hidden="true" />
          </div>

          <div className="commitment-canvas-copy" aria-live="polite">
            {commitments.map((item, index) => (
              <article key={item.number} data-active={active === index} aria-hidden={active !== index}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>

          <div className="commitment-canvas-controls">
            <div ref={railRef} className="commitment-canvas-rail" aria-label="Pilih komitmen perusahaan">
              {commitments.map((item, index) => (
                <button
                  key={item.number}
                  type="button"
                  data-active={active === index}
                  aria-pressed={active === index}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span>{item.number}</span>
                  <strong>{item.title}</strong>
                </button>
              ))}
            </div>

            <div className="commitment-canvas-progress" aria-hidden="true">
              <span>{String(active + 1).padStart(2, '0')}</span>
              <i><b style={{ transform: `scaleX(${(active + 1) / commitments.length})` }} /></i>
              <span>{String(commitments.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
