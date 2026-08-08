import { useState } from 'react'
import { values } from '../data/values'
import { useInView } from '../hooks/useInView'

export default function Values() {
  const [sectionRef, visible] = useInView({ threshold: 0.12 })
  const [hovered, setHovered] = useState(null)

  return (
    <section ref={sectionRef} id="nilai" aria-labelledby="values-title" className="relative overflow-clip bg-ivory pt-[clamp(94px,8vw,132px)] pb-[clamp(108px,9vw,150px)] text-[#162019] max-[860px]:pt-[82px] max-[860px]:pb-[96px] max-[620px]:pt-[72px] max-[620px]:pb-[84px]">
      <div className="mx-auto grid w-[calc(100%_-_72px)] max-w-[1540px] grid-cols-[minmax(270px,.42fr)_minmax(0,1fr)] items-start gap-[clamp(56px,8vw,138px)] max-[1080px]:w-[calc(100%_-_48px)] max-[1080px]:grid-cols-[minmax(240px,.38fr)_minmax(0,1fr)] max-[1080px]:gap-[52px] max-[860px]:w-[calc(100%_-_32px)] max-[860px]:grid-cols-1 max-[860px]:gap-[54px] max-[620px]:w-[calc(100%_-_24px)] max-[620px]:gap-10">
        <aside className={`sticky top-[16vh] max-w-[520px] self-start transition-all duration-700 ease-editorial max-[860px]:static max-[860px]:max-w-[720px] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[22px] opacity-0'}`}>
          <p className="m-0 text-[17px] font-semibold tracking-[.28em] text-[#2f5138] max-[620px]:text-[15px]">NILAI</p>
          <span className="mt-[18px] block h-0.5 w-[52px] bg-[#27492f]" aria-hidden="true" />
          <h2 id="values-title" className="mt-[34px] max-w-[8.8ch] font-display text-[clamp(50px,5vw,78px)] font-medium leading-[.95] tracking-[-.05em] text-[#162019] [text-wrap:balance] max-[1080px]:text-[clamp(46px,6vw,66px)] max-[860px]:max-w-[11ch] max-[620px]:mt-7 max-[620px]:max-w-full max-[620px]:text-[clamp(40px,12vw,54px)]">Nilai yang membentuk cara kami bekerja.</h2>
          <p className="mt-7 max-w-[42ch] text-sm leading-[1.72] text-[#1b271e]/65 max-[620px]:mt-5 max-[620px]:text-[13px]">Prinsip yang kami pegang dalam memberikan layanan, membangun kolaborasi, dan menjaga kualitas setiap pekerjaan.</p>
        </aside>

        <div className="w-full border-t border-[#1f3323]/20" onMouseLeave={() => setHovered(null)} aria-label="Nilai yang kami pegang">
          {values.map((value, index) => {
            const active = hovered === index
            const dimmed = hovered !== null && !active
            return (
              <article
                key={value.number}
                tabIndex={0}
                onMouseEnter={() => setHovered(index)}
                onFocus={() => setHovered(index)}
                onBlur={() => setHovered(null)}
                className={`group/value relative z-0 grid min-h-[clamp(142px,11vw,178px)] grid-cols-[66px_minmax(0,1fr)_clamp(130px,13vw,210px)] items-center gap-[clamp(18px,2.4vw,38px)] border-b border-[#1f3323]/20 py-6 outline-none transition-all duration-[680ms] ease-editorial max-[1080px]:grid-cols-[52px_minmax(0,1fr)_145px] max-[860px]:min-h-[132px] max-[860px]:grid-cols-[44px_minmax(0,1fr)_130px] max-[860px]:gap-4 max-[620px]:min-h-[118px] max-[620px]:grid-cols-[34px_minmax(0,1fr)] max-[620px]:gap-3 max-[620px]:py-5 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'} ${dimmed ? 'opacity-[.42]' : ''} ${active ? 'py-[30px] max-[620px]:py-5' : ''}`}
                style={{ transitionDelay: visible ? `${50 + index * 40}ms` : '0ms' }}
              >
                <div className={`pointer-events-none absolute -inset-x-[26px] inset-y-0 -z-10 rounded-lg transition-colors duration-300 ${active ? 'bg-[#fffffb]/55' : 'bg-transparent'}`} />
                <span className="self-start pt-[13px] text-[10px] font-semibold leading-none tracking-[.16em] text-[#2d4e37]/60 max-[620px]:pt-2">{value.number}</span>
                <div className="min-w-0 self-center">
                  <h3 className={`m-0 font-display text-[clamp(38px,4.1vw,64px)] font-medium leading-[.95] tracking-[-.045em] text-[#162019] transition-all duration-500 ease-editorial max-[1080px]:text-[clamp(34px,4.5vw,52px)] max-[620px]:text-[clamp(30px,9.5vw,42px)] ${active ? 'translate-x-[5px] text-[#284c32]' : ''}`}>{value.title}</h3>
                  <p className={`mt-2.5 max-w-[58ch] text-[13px] leading-[1.62] text-[#1b271e]/65 transition-all duration-500 ease-editorial max-[620px]:mt-2 max-[620px]:text-[12.5px] ${active ? 'translate-x-[5px] opacity-100' : 'opacity-[.62] max-[620px]:opacity-75'}`}>{value.description}</p>
                </div>
                <figure className={`relative self-stretch min-h-[94px] overflow-hidden rounded-[10px] bg-[#e4e7df] transition-all duration-500 ease-editorial max-[620px]:hidden ${active ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-4 scale-[.985] opacity-0'}`} aria-hidden="true">
                  <img src={value.image} alt="" loading="lazy" className={`h-full w-full object-cover [filter:saturate(.7)_contrast(.95)_brightness(1.03)] transition-transform duration-700 ease-editorial ${active ? 'scale-100' : 'scale-[1.04]'}`} />
                  <div className="absolute inset-0 bg-[#f6f3eb]/10" />
                </figure>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
