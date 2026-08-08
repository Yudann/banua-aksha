import { useState } from 'react'
import { commitments } from '../data/commitments'
import { useCoarsePointer } from '../hooks/useCoarsePointer'
import { useInView } from '../hooks/useInView'

export default function Commitments() {
  const [sectionRef, visible] = useInView({ threshold: 0.08 })
  const coarse = useCoarsePointer()
  const [hovered, setHovered] = useState(null)
  const [active, setActive] = useState(null)
  const focused = hovered ?? active

  return (
    <section ref={sectionRef} id="komitmen" aria-labelledby="commitments-title" className="relative z-[2] bg-ivory px-7 pb-[clamp(130px,12vw,190px)] pt-[clamp(110px,10vw,156px)] text-ink max-[900px]:px-[22px] max-[900px]:pt-[104px] max-[900px]:pb-[136px] max-[680px]:px-[17px] max-[680px]:pt-[88px] max-[680px]:pb-[112px]">
      <div className="mx-auto w-full max-w-[1180px]">
        <header className="mb-[clamp(58px,6vw,82px)] w-full max-w-[850px] max-[900px]:mb-[54px] max-[680px]:mb-[42px]">
          <p className={`mb-[18px] text-[11px] font-semibold tracking-[.15em] text-[#31583a] transition-all duration-[620ms] ease-editorial max-[680px]:text-[10px] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[14px] opacity-0'}`}>04 — KEUNGGULAN &amp; KOMITMEN</p>
          <h2 id="commitments-title" className={`m-0 max-w-[16ch] font-display text-[clamp(48px,5vw,74px)] font-medium leading-[.96] tracking-[-.045em] text-[#1b231d] transition-all duration-700 ease-editorial max-[900px]:text-[clamp(46px,8vw,64px)] max-[680px]:max-w-[11ch] max-[680px]:text-[clamp(42px,11vw,55px)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[22px] opacity-0'}`}>Bekerja dengan standar yang dapat diandalkan.</h2>
          <p className={`mt-[22px] max-w-[48ch] text-[13px] leading-[1.65] text-[#1d261f]/60 transition-all duration-[620ms] ease-editorial max-[680px]:mt-[18px] max-[680px]:max-w-[36ch] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>Komitmen yang kami pegang dalam setiap proses pekerjaan.</p>
        </header>

        <div className="flex flex-col gap-2.5 max-[680px]:gap-2" onMouseLeave={() => setHovered(null)}>
          {commitments.map((item, index) => {
            const isFocused = focused === index
            const dimmed = focused !== null && !isFocused
            return (
              <article
                key={item.number}
                tabIndex={0}
                onMouseEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                onClick={() => coarse && setActive((current) => (current === index ? null : index))}
                className={`grid w-full overflow-hidden rounded-[13px] border bg-[#fffdf7]/75 shadow-[0_7px_22px_rgba(31,51,34,.025)] outline-none transition-[height,opacity,transform,border-color,background-color,box-shadow,filter,grid-template-columns] duration-700 ease-editorial ${isFocused ? 'h-[clamp(260px,24vw,320px)] grid-cols-[51%_49%] border-[#2c5330]/30 bg-[#fffefa]/95 shadow-[0_18px_48px_rgba(31,51,34,.07)] max-[900px]:h-[270px] max-[900px]:grid-cols-[52%_48%] max-[680px]:h-[420px] max-[680px]:grid-cols-1 max-[680px]:grid-rows-[205px_1fr]' : 'h-[clamp(104px,8.5vw,122px)] grid-cols-[1fr_clamp(225px,27vw,330px)] border-[#26462b]/20 max-[900px]:h-[106px] max-[900px]:grid-cols-[1fr_210px] max-[680px]:h-[100px] max-[680px]:grid-cols-[1fr_128px]'} ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[22px] opacity-0'} ${dimmed ? 'opacity-[.6]' : ''}`}
                style={{ transitionDelay: visible ? `${90 + index * 40}ms` : '0ms' }}
              >
                <div className={`z-[2] flex min-w-0 flex-col justify-center px-[clamp(24px,3vw,42px)] py-[clamp(20px,2.2vw,30px)] transition-all duration-700 ease-editorial max-[900px]:px-[26px] max-[900px]:py-[22px] max-[680px]:px-[18px] max-[680px]:py-[18px] ${isFocused && 'max-[680px]:justify-start max-[680px]:px-5 max-[680px]:pt-6'}`}>
                  <p className="mb-1.5 text-[10px] font-semibold tracking-[.1em] text-[#31583a] max-[680px]:mb-1 max-[680px]:text-[9px]">{item.number}</p>
                  <h3 className="m-0 font-display text-[clamp(28px,2.5vw,39px)] font-medium leading-[.98] tracking-[-.035em] text-[#1b241d] max-[680px]:text-[clamp(25px,7vw,31px)]">{item.title}</h3>
                  <p className={`max-w-[42ch] overflow-hidden text-[clamp(12px,1vw,14px)] leading-[1.65] text-[#1f2821]/70 transition-all duration-500 ease-editorial ${isFocused ? 'mt-4 max-h-[120px] translate-y-0 opacity-100 max-[680px]:mt-3 max-[680px]:max-h-[100px]' : 'mt-0 max-h-0 translate-y-2.5 opacity-0'}`}>{item.description}</p>
                </div>

                <figure className={`relative m-[9px] overflow-hidden rounded-[9px] bg-[#e6e4da] transition-all duration-700 ease-editorial max-[680px]:m-2 ${isFocused ? 'max-[680px]:row-start-2 max-[680px]:rounded-lg' : ''}`}>
                  <img src={item.image} alt={item.alt} loading="lazy" className={`h-full w-full object-cover transition-transform duration-900 ease-editorial ${isFocused ? 'scale-100' : 'scale-[1.035]'}`} />
                </figure>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
