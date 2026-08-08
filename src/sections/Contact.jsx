import { useInView } from '../hooks/useInView'

export default function Contact() {
  const [sectionRef, visible] = useInView({ threshold: 0.08 })

  return (
    <section ref={sectionRef} id="kontak" aria-labelledby="contact-title" className="relative overflow-hidden bg-ivory pt-[clamp(100px,9vw,148px)] pb-[clamp(112px,10vw,170px)] text-[#172019] max-[820px]:pt-[86px] max-[820px]:pb-[104px] max-[560px]:pt-[72px] max-[560px]:pb-[88px]">
      <div className="mx-auto w-[calc(100%_-_72px)] max-w-[1360px] text-center max-[820px]:w-[calc(100%_-_34px)] max-[560px]:w-[calc(100%_-_24px)]">
        <p className="mx-auto mb-[clamp(52px,5vw,76px)] text-center text-[10px] font-semibold tracking-[.25em] text-[#31583a] after:mx-auto after:mt-3 after:block after:h-px after:w-[34px] after:bg-[#31583a]/55">07 — HUBUNGI KAMI</p>

        <div className="flex flex-col items-center justify-center gap-[clamp(26px,2.7vw,38px)]">
          <h2 id="contact-title" className={`mx-auto max-w-[16ch] font-display text-[clamp(52px,5.25vw,82px)] font-medium leading-[.94] tracking-[-.052em] text-[#172019] [text-wrap:balance] transition-all duration-[780ms] ease-editorial max-[820px]:max-w-[14ch] max-[820px]:text-[clamp(48px,8.5vw,68px)] max-[560px]:max-w-[13ch] max-[560px]:text-[clamp(40px,11.5vw,54px)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[26px] opacity-0'}`}>Mari bicarakan kebutuhan lingkungan perusahaan Anda.</h2>

          <div className={`mx-auto max-w-[620px] text-center transition-all duration-700 ease-editorial ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[18px] opacity-0'}`}>
            <p className="mx-auto mb-[30px] max-w-[58ch] text-sm leading-[1.72] text-[#18211a]/65 max-[560px]:text-[13px]">Ceritakan kebutuhan proyek Anda. Tim Banua siap membantu menentukan langkah pendampingan yang sesuai.</p>
            <a href="https://wa.me/628119799188" target="_blank" rel="noopener noreferrer" className="group mx-auto inline-flex min-w-[246px] items-center justify-between gap-[30px] rounded-full bg-[#183c24] pl-5 pr-[18px] py-4 text-xs font-medium text-[#f8f5ec] transition-all duration-300 ease-editorial hover:-translate-y-[3px] hover:bg-[#214d2f] max-[560px]:w-full">
              <span>Konsultasikan Proyek</span>
              <span className="text-base transition-transform duration-300 ease-editorial group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
