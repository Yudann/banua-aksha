import { missions } from '../data/missions'
import { useInView } from '../hooks/useInView'

export default function Mission() {
  const [sectionRef, visible] = useInView({ threshold: 0.12 })

  return (
    <section ref={sectionRef} id="misi" aria-labelledby="mission-title" className="relative isolate overflow-hidden bg-ivory pt-[clamp(88px,7vw,112px)] pb-[clamp(104px,8vw,132px)] text-[#162019] max-[820px]:pt-[78px] max-[820px]:pb-[92px]">
      <div className="mission-section-wash pointer-events-none absolute inset-0 z-[3]" />
      <div className={`mission-photo-mask pointer-events-none absolute inset-y-0 right-0 z-[1] w-[min(48vw,900px)] transition-all duration-[950ms] ease-editorial max-[1100px]:w-[46vw] max-[820px]:top-auto max-[820px]:h-[36%] max-[820px]:w-full ${visible ? 'translate-x-0 opacity-100' : 'translate-x-7 opacity-0'}`}>
        <img src="/assets/hero-bg.webp" alt="" width="1672" height="941" loading="lazy" decoding="async" className="h-full w-full object-cover object-[68%_center] opacity-[.56] [filter:saturate(.68)_contrast(.88)_brightness(1.11)]" />
        <div className="mission-photo-overlay absolute inset-0" />
      </div>

      <div className="relative z-[5] w-full px-[5vw] max-[820px]:px-[22px] max-[560px]:px-4">
        <header className={`mb-[clamp(30px,3vw,46px)] w-[min(72vw,1080px)] transition-all duration-700 ease-editorial max-[1100px]:w-[min(78vw,900px)] max-[820px]:w-full ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'}`}>
          <p className="m-0 text-[18px] font-semibold tracking-[.28em] text-[#2f5138] max-[560px]:text-base">MISI</p>
          <span className="mt-5 block h-[3px] w-14 bg-[#27492f] max-[560px]:mt-4 max-[560px]:w-12" aria-hidden="true" />
          <h2 className="sr-only" id="mission-title">Misi Banua Aksha Inovasi</h2>
        </header>

        <div className="relative w-[min(72vw,1120px)] max-[1100px]:w-[min(78vw,900px)] max-[820px]:w-full" aria-label="Lima misi Banua Aksha Inovasi">
          {missions.map((mission, index) => (
            <article
              key={mission.number}
              className={`group grid min-h-[clamp(112px,9vw,138px)] grid-cols-[clamp(82px,7vw,118px)_minmax(0,1fr)] items-center gap-[clamp(18px,2vw,34px)] border-t border-[#253829]/15 py-[clamp(22px,2vw,30px)] transition-all duration-700 ease-editorial last:border-b hover:border-[#27492f]/35 max-[820px]:min-h-0 max-[820px]:grid-cols-[64px_minmax(0,1fr)] max-[820px]:gap-4 max-[820px]:py-[22px] max-[560px]:grid-cols-1 max-[560px]:gap-2 max-[560px]:pt-5 max-[560px]:pb-[22px] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}
              style={{ transitionDelay: visible ? `${70 + index * 50}ms` : '0ms' }}
            >
              <span className="font-display text-[clamp(48px,4.2vw,70px)] font-medium leading-[.9] tracking-[-.04em] text-[#2b4d35]/70 transition-colors duration-300 group-hover:text-[#27492f] max-[820px]:text-[clamp(38px,9vw,54px)] max-[560px]:text-[36px]">{mission.number}</span>
              <div className="max-w-[760px]">
                <h3 className="m-0 font-display text-[clamp(31px,3vw,46px)] font-[550] leading-[.98] tracking-[-.035em] text-[#162019] [text-wrap:balance] max-[820px]:text-[clamp(28px,6.5vw,38px)] max-[560px]:text-[clamp(28px,8.2vw,35px)]">{mission.title}</h3>
                <p className="mt-2.5 max-w-[64ch] text-[clamp(12.5px,1vw,14px)] leading-[1.65] text-[#1b271e]/70 max-[560px]:mt-2 max-[560px]:text-[12.5px]">{mission.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
