import { useRef } from 'react'
import { processSteps } from '../data/processSteps'
import { useProcessTimeline } from '../hooks/useProcessScroll'

function ProcessIcon({ index }) {
  const paths = [
    <><path d="M4.5 5.5h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-3.5 3v-3h-1a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2Z"/><path d="M8 9h5M8 11.5h3.5"/></>,
    <><path d="M5 3.5h8l4 4v5.25"/><path d="M13 3.5v4h4M5 3.5v17h7"/><circle cx="16.5" cy="16.5" r="3.25"/><path d="m19 19 2 2"/></>,
    <><path d="M5 3.5h9l4 4v13H5Z"/><path d="M14 3.5v4h4M8 11h7M8 14h5M8 17h3"/></>,
    <><path d="M4 18.5c3.5-7 8.5-10.5 15.5-13"/><path d="m14.5 4.5 5 1-2 4.5"/><circle cx="5" cy="18" r="2"/></>,
    <><circle cx="12" cy="12" r="8.5"/><path d="m8 12.25 2.5 2.5L16.5 9"/></>,
  ]

  return <svg className="process-timeline-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[index]}</svg>
}

export default function Process() {
  const sectionRef = useRef(null)
  const progressRef = useRef(null)
  const stepRefs = useRef([])

  useProcessTimeline({ sectionRef, progressRef, stepRefs })

  return (
    <section
      ref={sectionRef}
      id="proses"
      className="process-timeline-section"
      data-nav-surface="light"
      aria-labelledby="process-title"
    >
      <div className="process-timeline-stage">
        <header className="process-timeline-header">
          <p>03 — PROSES KERJA</p>
          <div>
            <h2 id="process-title">Dari konsultasi awal hingga tindak lanjut.</h2>
            <p>Setiap tahap disusun jelas agar kebutuhan teknis, penyusunan dokumen, dan proses pendampingan lebih mudah diikuti.</p>
          </div>
        </header>

        <div className="process-timeline" aria-label="Lima tahapan proses kerja">
          <div className="process-timeline-line" aria-hidden="true">
            <span ref={progressRef} />
          </div>

          <div className="process-timeline-steps">
            {processSteps.map((step, index) => (
              <article
                key={step.number}
                ref={(node) => { stepRefs.current[index] = node }}
                data-process-step
                data-active={index === 0}
              >
                <div className="process-timeline-marker" aria-hidden="true">
                  <span>{step.number}</span>
                  <i />
                </div>
                <div className="process-timeline-copy">
                  <ProcessIcon index={index} />
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
