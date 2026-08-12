import { Leaf } from 'lucide-react'
import { clientMosaicImages, clientSectors } from '../data/clients'
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

function SectorPlaque({ name }) {
  const widthClass = name.length > 50 ? 'is-extra-wide' : name.length > 27 ? 'is-wide' : ''

  return (
    <article className={`client-slider-plaque ${widthClass}`}>
      <h3>{name}</h3>
      <Leaf className="client-slider-icon" aria-hidden="true" />
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
              <SectorPlaque key={`${copy}-${name}`} name={name} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Clients() {
  const [sectionRef, visible] = useInView({ threshold: 0.08 })
  const first = clientSectors.slice(0, 5)
  const second = clientSectors.slice(5)

  return (
    <section
      ref={sectionRef}
      id="klien"
      aria-labelledby="clients-title"
      className={`client-slider ${visible ? 'is-visible' : ''}`}
    >
      <div className="client-slider-visual" aria-hidden="true">
        <div className="client-slider-mosaic">
          {clientMosaicImages.map((image, index) => (
            <figure key={image.src} className={mosaicClasses[index]}>
              <img src={image.src} alt="" width={image.width} height={image.height} loading="lazy" decoding="async" />
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

      <div className="client-slider-desktop" aria-label="Daftar sektor industri yang didampingi">
        <MarqueeRow items={first} />
        <MarqueeRow items={second} reverse />
      </div>
    </section>
  )
}
