import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { useInView } from '../hooks/useInView'

const serviceCodes = ['AMDAL', 'UKL-UPL', 'PROPER', 'PERTEK', 'PLH', 'LB3', 'SLO', 'LAB', 'LAINNYA']

export default function Services() {
  const [sectionRef, visible] = useInView({ threshold: 0.08 })
  const wallRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const wall = wallRef.current
    const mobileQuery = window.matchMedia('(max-width: 760px)')
    if (!wall) return undefined

    let frame = 0
    const updateFromScroll = () => {
      frame = 0
      if (!mobileQuery.matches) return

      const panels = [...wall.querySelectorAll('[data-service-panel]')]
      const center = wall.scrollLeft + wall.clientWidth / 2
      let nearestIndex = 0
      let nearestDistance = Number.POSITIVE_INFINITY

      panels.forEach((panel, index) => {
        const panelCenter = panel.offsetLeft + panel.offsetWidth / 2
        const distance = Math.abs(panelCenter - center)
        if (distance < nearestDistance) {
          nearestDistance = distance
          nearestIndex = index
        }
      })

      setActive((current) => (current === nearestIndex ? current : nearestIndex))
    }

    const requestUpdate = () => {
      if (frame) return
      frame = window.requestAnimationFrame(updateFromScroll)
    }

    wall.addEventListener('scroll', requestUpdate, { passive: true })
    mobileQuery.addEventListener('change', requestUpdate)
    updateFromScroll()

    return () => {
      wall.removeEventListener('scroll', requestUpdate)
      mobileQuery.removeEventListener('change', requestUpdate)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="layanan"
      className="services-wall-section"
      data-visible={visible}
      data-nav-surface="dark"
      aria-labelledby="services-title"
    >
      <div className="services-wall-shell">
        <header className="services-wall-header">
          <div>
            <p>02 — LAYANAN</p>
            <h2 id="services-title">Layanan untuk setiap tahap kepatuhan.</h2>
          </div>
          <div className="services-wall-intro">
            <p>Kami mendampingi kebutuhan teknis dan dokumen lingkungan secara terarah, jelas, dan sesuai lingkup kegiatan usaha.</p>
            <a href="#kontak">Bicarakan kebutuhan Anda <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </header>

        <div ref={wallRef} className="services-wall" aria-label="Daftar layanan perusahaan">
          {services.map((service, index) => {
            const isActive = active === index
            return (
              <article
                key={service.title}
                data-service-panel
                data-active={isActive}
                tabIndex={0}
                aria-current={isActive ? 'true' : undefined}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <div className="services-wall-meta">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{serviceCodes[index]}</strong>
                </div>

                <div className="services-wall-copy">
                  <h3>{service.title}</h3>
                  <div className="services-wall-detail">
                    <p>{service.description}</p>
                    <a href="#kontak">Konsultasikan <ArrowUpRight aria-hidden="true" /></a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        <div className="services-wall-progress" aria-hidden="true">
          <span>{String(active + 1).padStart(2, '0')}</span>
          <div><i style={{ transform: `scaleX(${(active + 1) / services.length})` }} /></div>
          <span>{String(services.length).padStart(2, '0')}</span>
        </div>
      </div>
    </section>
  )
}
