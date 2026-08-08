import { useState } from 'react'
import { values } from '../data/values'
import { useInView } from '../hooks/useInView'

function ValueIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M19.7 4.3C13.9 4.65 8.8 7.45 6.45 12.1c-1.2 2.4-.85 4.75.85 6.45 1.7 1.7 4.05 2.05 6.45.85 4.65-2.35 7.45-7.45 7.8-13.25.05-1.05-.8-1.9-1.85-1.85Z" />
      <path d="M4 21c2.4-4.8 6.2-8.45 11.35-10.95" />
    </svg>
  )
}

export default function Values() {
  const [sectionRef, visible] = useInView({ threshold: 0.1 })
  const [activeValue, setActiveValue] = useState(0)

  return (
    <section
      ref={sectionRef}
      id="nilai"
      aria-labelledby="values-title"
      className="values-gallery"
      data-visible={visible}
      data-nav-surface="dark"
    >
      <div className="values-gallery-shell">
        <header className="values-gallery-header">
          <div>
            <p>07 — NILAI KAMI</p>
            <h2 id="values-title">Nilai yang membentuk cara kami bekerja.</h2>
          </div>
          <p>Prinsip yang menjaga kualitas layanan, kolaborasi, dan setiap keputusan yang kami ambil.</p>
        </header>

        <div className="values-gallery-stage" aria-label="Nilai yang kami pegang">
          {values.map((value, index) => {
            const active = activeValue === index

            return (
              <article
                key={value.title}
                className="values-gallery-panel"
                data-active={active}
                style={{ '--value-index': index }}
                onMouseEnter={() => setActiveValue(index)}
              >
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveValue(index)}
                  onFocus={() => setActiveValue(index)}
                >
                  <img
                    src={value.image}
                    alt=""
                    loading="lazy"
                    sizes="(max-width: 1050px) 84vw, 42vw"
                  />
                  <span className="values-gallery-overlay" aria-hidden="true" />
                  <span className="values-gallery-icon"><ValueIcon /></span>

                  <span className="values-gallery-content">
                    <strong>{value.title}</strong>
                    <span>{value.description}</span>
                  </span>
                </button>
              </article>
            )
          })}
        </div>

        <p className="values-gallery-swipe">Geser untuk melihat nilai lainnya <span aria-hidden="true">→</span></p>
      </div>
    </section>
  )
}
