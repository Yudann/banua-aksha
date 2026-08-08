import { useInView } from '../hooks/useInView'

export default function Vision() {
  const [sectionRef, visible] = useInView({ threshold: 0.18 })

  return (
    <section ref={sectionRef} id="visi" aria-labelledby="vision-title" className="relative overflow-hidden bg-ivory pt-[clamp(74px,6vw,92px)] pb-[clamp(82px,7vw,106px)] text-[#152019] max-[620px]:pt-16 max-[620px]:pb-[74px]">
      <div className="relative w-full px-[5vw] max-[1120px]:mx-auto max-[1120px]:w-[calc(100%_-_40px)] max-[1120px]:max-w-[1280px] max-[1120px]:px-0 max-[920px]:w-[calc(100%_-_28px)] max-[920px]:max-w-[920px] max-[620px]:w-[calc(100%_-_24px)] max-[620px]:max-w-[680px]">
        <p className="m-0 text-[11px] font-semibold tracking-[.24em] text-[#2f5138] max-[620px]:tracking-[.2em]">06 — VISI, MISI &amp; NILAI</p>

        <div className="relative mt-[clamp(72px,6vw,92px)] min-h-[clamp(590px,49vw,720px)] max-[1120px]:min-h-[520px] max-[920px]:mt-[78px] max-[920px]:min-h-0">
          <div className={`relative z-[3] w-[62vw] max-w-[1080px] transition-all duration-[820ms] ease-editorial max-[1120px]:w-[min(78vw,900px)] max-[920px]:w-full ${visible ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0'}`}>
            <p className="m-0 text-[18px] font-semibold tracking-[.28em] text-[#2f5138] max-[620px]:text-base max-[620px]:tracking-[.2em]">VISI</p>
            <span className="mt-5 block h-[3px] w-14 bg-[#27492f] max-[620px]:mt-4 max-[620px]:w-12" aria-hidden="true" />
            <h2 id="vision-title" className="mt-[38px] w-[min(61vw,1030px)] max-w-none font-display text-[clamp(48px,4.65vw,72px)] font-medium leading-[.96] tracking-[-.045em] text-[#162019] [text-wrap:balance] max-[1120px]:w-[min(76vw,900px)] max-[1120px]:text-[clamp(40px,5.1vw,58px)] max-[920px]:mt-[30px] max-[920px]:w-full max-[920px]:text-[clamp(34px,7vw,52px)] max-[920px]:leading-none max-[620px]:text-[clamp(30px,9.2vw,42px)] max-[620px]:leading-[1.02]">
              Menjadi konsultan lingkungan hidup terpercaya yang memberikan pengawasan dan solusi inovatif yang tajam demi keberlanjutan bumi.
            </h2>
          </div>

          <figure className={`vision-photo-mask pointer-events-none absolute right-[-5vw] top-[-1%] h-[102%] min-h-[550px] w-[min(46vw,800px)] transition-all duration-[920ms] ease-editorial max-[1120px]:right-[-7vw] max-[1120px]:top-0 max-[1120px]:h-full max-[1120px]:min-h-[500px] max-[1120px]:w-[min(52vw,680px)] max-[920px]:relative max-[920px]:right-auto max-[920px]:top-auto max-[920px]:mt-[34px] max-[920px]:aspect-[4/3.2] max-[920px]:h-auto max-[920px]:min-h-0 max-[920px]:w-[min(100%,720px)] max-[920px]:ml-auto max-[620px]:mt-7 max-[620px]:aspect-[4/4.2] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[30px] opacity-0'}`} style={{ transitionDelay: '80ms' }} aria-hidden="true">
            <img src="/assets/about-vision.webp" alt="" loading="lazy" className="relative z-[1] h-full w-full object-cover object-[52%_center] opacity-[.86] [filter:saturate(.78)_brightness(1.09)_contrast(.90)] max-[1120px]:opacity-100 max-[1120px]:[filter:saturate(.84)_brightness(1.06)_contrast(.92)]" />
            <div className="vision-photo-overlay absolute inset-0 z-[2]" />
          </figure>
        </div>
      </div>
    </section>
  )
}
