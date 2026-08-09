import { useRef } from 'react'
import { CircleCheckBig, FileSearch, FileText, MessageSquareText, Route } from 'lucide-react'
import { processSteps } from '../data/processSteps'
import { useProcessTimeline } from '../hooks/useProcessScroll'

function ProcessIcon({ index }) {
  const icons = [
    MessageSquareText,
    FileSearch,
    FileText,
    Route,
    CircleCheckBig,
  ]
  const Icon = icons[index] ?? FileText

  return <Icon className="process-timeline-icon" aria-hidden="true" />
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
