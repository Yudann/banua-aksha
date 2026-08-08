import { clientMosaicImages, clients } from '../data/clients'
import { useInView } from '../hooks/useInView'

const mosaicClasses = [
  'client-slider-mosaic-a',
  'client-slider-mosaic-b',
  'client-slider-mosaic-c',
  'client-slider-mosaic-d',
  'client-slider-mosaic-e',
  'client-slider-mosaic-f',
  'client-slider-mosaic-g',
]

function ClientPlaque({ name }) {
  const isWide = name.length > 27

  return (
    <article className={`client-slider-plaque ${isWide ? 'is-wide' : ''}`}>
      <h3>{name}</h3>
      <svg className="client-slider-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path d="M19.7 4.3C13.9 4.65 8.8 7.45 6.45 12.1c-1.2 2.4-.85 4.75.85 6.45 1.7 1.7 4.05 2.05 6.45.85 4.65-2.35 7.45-7.45 7.8-13.25.05-1.05-.8-1.9-1.85-1.85Z" />
        <path d="M4 21c2.4-4.8 6.2-8.45 11.35-10.95" />
      </svg>
    </article>
  )
}

function MarqueeRow({ items, reverse = false }) {
  return (
    <div className="client-slider-viewport">
      <div className={`client-slider-track ${reverse ? 'is-reverse' : ''}`}>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="client-slider-set"
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {items.map((name) => (
              <ClientPlaque key={`${copy}-${name}`} name={name} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Clients() {
  const [sectionRef, visible] = useInView({ threshold: 0.08 })
  const first = clients.slice(0, 7)
  const second = clients.slice(7)

  return (
    <section
      ref={sectionRef}
      id="klien"
      aria-labelledby="clients-title"
      className={`client-slider ${visible ? 'is-visible' : ''}`}
    >
      <div className="client-slider-visual" aria-hidden="true">
        <div className="client-slider-mosaic">
          {clientMosaicImages.map((src, index) => (
            <figure key={src} className={mosaicClasses[index]}>
              <img src={src} alt="" loading="lazy" />
            </figure>
          ))}
        </div>
        <div className="client-slider-wash" />
      </div>

      <header className="client-slider-header">
        <p className="client-slider-kicker">05 — KERJA SAMA</p>
        <h2 id="clients-title">
          <span>Dipercaya untuk bekerja</span>
          <span>bersama lintas industri.</span>
        </h2>
        <p>Kolaborasi yang dibangun melalui pendampingan lingkungan yang terukur dan dapat dijalankan.</p>
      </header>

      <div className="client-slider-desktop" aria-label="Daftar perusahaan klien">
        <MarqueeRow items={first} />
        <MarqueeRow items={second} reverse />
      </div>

      <div className="client-slider-mobile" aria-label="Geser untuk melihat daftar perusahaan klien">
        {clients.map((name) => (
          <ClientPlaque key={name} name={name} />
        ))}
      </div>
    </section>
  )
}
