import { useState } from 'react'
import { services } from '../data/services'
import { useCoarsePointer } from '../hooks/useCoarsePointer'
import { useInView } from '../hooks/useInView'

export default function Services() {
  const [sectionRef, visible] = useInView({ threshold: 0.12 })
  const coarse = useCoarsePointer()
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(null)
  const focused = hovered ?? active

  return (
    <section ref={sectionRef} id="layanan" aria-labelledby="services-title" className="relative z-[2] overflow-visible bg-ivory px-7 pb-[clamp(130px,12vw,190px)] pt-[clamp(110px,10vw,160px)] text-ink max-[900px]:px-[22px] max-[620px]:px-[17px] max-[620px]:pb-[120px] max-[620px]:pt-24">
      <div className="mx-auto w-full max-w-[1120px]">
        <h2 id="services-title" className={`mb-[clamp(58px,6vw,86px)] text-center font-display text-[clamp(48px,5vw,72px)] font-medium leading-[.96] tracking-[-.045em] text-[#1d241e] transition-all duration-700 ease-editorial max-[620px]:mb-11 max-[620px]:text-[clamp(44px,13vw,58px)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>Layanan Perusahaan</h2>

        <div className="grid grid-cols-3 gap-[clamp(16px,1.7vw,24px)] isolate max-[900px]:grid-cols-2 max-[620px]:grid-cols-1 max-[620px]:gap-3.5" onMouseLeave={() => setHovered(null)}>
          {services.map((service, index) => {
            const isFocused = focused === index
            const isDimmed = focused !== null && !isFocused
            return (
              <article
                key={service.title}
                tabIndex={0}
                onMouseEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                onClick={() => coarse && setActive((current) => (current === index ? null : index))}
                className={`relative aspect-square min-w-0 overflow-hidden rounded-[14px] border bg-[#fffdf7]/80 p-[clamp(28px,3vw,42px)] shadow-[0_10px_28px_rgba(33,50,34,.035)] outline-none transition-[transform,opacity,border-color,background-color,box-shadow,filter] duration-[620ms] ease-editorial max-[900px]:p-7 max-[620px]:mx-auto max-[620px]:w-full max-[620px]:max-w-[420px] ${visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-7 scale-[.985] opacity-0'} ${isFocused ? 'z-10 scale-[1.13] border-[#1f4f2b]/50 bg-[#f0eee4] opacity-100 shadow-[0_30px_70px_rgba(28,51,32,.13),0_5px_18px_rgba(28,51,32,.08)] max-[900px]:scale-[1.07] max-[620px]:scale-[1.035]' : 'border-[#26462b]/20'} ${isDimmed ? 'scale-[.955] opacity-[.58] saturate-[.75] max-[900px]:scale-[.975] max-[900px]:opacity-[.72] max-[620px]:scale-100 max-[620px]:opacity-100 max-[620px]:saturate-100' : ''}`}
                style={{ transitionDelay: visible ? `${80 + index * 50}ms` : '0ms' }}
              >
                <div className={`pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(64,96,63,.045),transparent_36%),linear-gradient(145deg,rgba(255,255,255,.22),transparent_48%)] transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />
                <div className="relative z-[1] flex h-full w-full flex-col justify-end">
                  <h3 className={`m-0 max-w-[90%] font-display text-[clamp(30px,2.7vw,42px)] font-medium leading-[.96] tracking-[-.035em] transition-all duration-[620ms] ease-editorial max-[900px]:text-[clamp(28px,5vw,38px)] ${isFocused ? '-translate-y-[3px] text-[#214f2d]' : 'text-[#1b241d]'}`}>{service.title}</h3>
                  <p className={`m-0 max-w-[31ch] overflow-hidden font-sans text-[clamp(12px,1vw,14px)] leading-[1.6] text-[#1f2821]/70 transition-all duration-500 ease-editorial ${isFocused ? 'mt-[18px] max-h-[150px] translate-y-0 opacity-100' : 'mt-0 max-h-0 translate-y-3 opacity-0'}`}>{service.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
