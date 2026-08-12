import { useEffect, useRef, useState } from 'react'
import { missions } from '../data/missions'

export default function VisionMission() {
  const missionRefs = useRef([])
  const [activeMission, setActiveMission] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (current) setActiveMission(Number(current.target.dataset.missionIndex))
      },
      {
        rootMargin: '-34% 0px -44% 0px',
        threshold: [0, 0.25, 0.6],
      },
    )

    missionRefs.current.forEach((node) => node && observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="visi" aria-labelledby="vision-title" className="vision-mission-section">
      <div className="vision-mission-shell">
        <aside className="vision-mission-sticky">
          <figure className="vision-mission-visual">
            <img
              src="/assets/about-vision.webp"
              alt="Tim Banua Aksha melakukan peninjauan lingkungan di lapangan"
              width="1122"
              height="1402"
              loading="lazy"
              style={{ '--mission-shift': activeMission }}
            />
            <div className="vision-mission-overlay" />

            <figcaption className="vision-mission-statement">
              <p>VISI</p>
              <span aria-hidden="true" />
              <h2 id="vision-title">
                Menjadi konsultan lingkungan hidup terpercaya yang memberikan pengawasan dan solusi inovatif yang tajam demi keberlanjutan bumi.
              </h2>
            </figcaption>

            <div className="vision-mission-progress" aria-hidden="true">
              <span>{String(activeMission + 1).padStart(2, '0')}</span>
              <i><b style={{ height: `${((activeMission + 1) / missions.length) * 100}%` }} /></i>
              <span>{String(missions.length).padStart(2, '0')}</span>
            </div>
          </figure>
        </aside>

        <div id="misi" className="vision-mission-list" aria-labelledby="mission-title">
          <header className="vision-mission-list-header">
            <p>06 — VISI &amp; MISI</p>
            <h2 id="mission-title">Misi yang menerjemahkan visi ke dalam pekerjaan.</h2>
          </header>

          <div className="vision-mission-steps">
            {missions.map((mission, index) => {
              const active = activeMission === index

              return (
                <article
                  key={mission.number}
                  ref={(node) => { missionRefs.current[index] = node }}
                  data-mission-index={index}
                  data-active={active}
                  aria-current={active ? 'step' : undefined}
                  onMouseEnter={() => setActiveMission(index)}
                >
                  <span>{mission.number}</span>
                  <div>
                    <h3>{mission.title}</h3>
                    <p>{mission.description}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
