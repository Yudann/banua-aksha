import { ArrowUpRight } from 'lucide-react'

export default function Hero({ journey = false, mediaRef, contentRef }) {
  return (
    <section id="beranda" className={`${journey ? 'hero-journey-panel' : ''} relative z-[1] isolate min-h-[max(720px,100svh)] overflow-hidden bg-[#b9b39f] max-[900px]:min-h-[max(700px,100svh)] max-[640px]:min-h-[max(720px,100svh)]`} aria-labelledby="hero-title">
      <div ref={mediaRef} className="hero-journey-media absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="hero-background absolute inset-0 bg-[url('/assets/hero-bg.webp')] bg-cover bg-center max-[640px]:bg-[position:56%_center]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,18,10,0.02)_0%,rgba(8,18,10,0.01)_40%,rgba(8,18,10,0.09)_63%,rgba(8,18,10,0.45)_100%)] max-[640px]:bg-[linear-gradient(to_bottom,rgba(8,18,10,0.06)_0%,rgba(8,18,10,0.02)_34%,rgba(8,18,10,0.15)_59%,rgba(8,18,10,0.58)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(12,17,11,0)_32%,rgba(12,17,11,0.07)_70%,rgba(8,12,8,0.25)_100%)]" />
      </div>

      <div ref={contentRef} className="hero-journey-content absolute inset-0 z-10">
        <div className="hero-primary-content absolute left-1/2 w-[calc(100%_-_48px)] max-w-[960px] text-center max-[900px]:w-[calc(100%_-_44px)] max-[900px]:max-w-[760px] max-[640px]:w-[calc(100%_-_34px)]">
        <h1 id="hero-title" className="m-0 font-display text-[clamp(54px,5.4vw,82px)] font-medium leading-[.94] tracking-[-.045em] max-[900px]:text-[clamp(50px,8vw,66px)] max-[640px]:text-[clamp(43px,13.2vw,56px)] max-[640px]:leading-[.91] max-[640px]:tracking-[-.05em] max-[410px]:text-[42px]">
          <span className="title-mask -mx-[.02em] -mt-[.08em] -mb-[.22em] block overflow-hidden px-[.02em] pt-[.08em] pb-[.22em]">
            <span className="hero-title-line hero-title-line-one block text-ink">Bisnis terus bertumbuh.</span>
          </span>
          <span className="title-mask -mx-[.02em] -mt-[.08em] -mb-[.22em] block overflow-hidden px-[.02em] pt-[.08em] pb-[.22em]">
            <span className="hero-title-line hero-title-line-two block text-green">Lingkungan tetap terjaga.</span>
          </span>
        </h1>

        <p className="hero-enter hero-enter-description relative isolate mx-auto mt-[25px] max-w-[660px] text-[clamp(16px,1.15vw,18px)] font-medium leading-[1.55] text-[#1b241d]/95 [text-shadow:0_1px_1px_rgba(246,243,235,.45)] [text-wrap:balance] before:pointer-events-none before:absolute before:-inset-x-[34px] before:-inset-y-[18px] before:-z-10 before:bg-[radial-gradient(ellipse_at_center,rgba(246,243,235,.62)_0%,rgba(246,243,235,.28)_48%,transparent_76%)] before:content-[''] before:blur-[8px] max-[640px]:mt-[22px] max-[640px]:max-w-[380px] max-[640px]:px-2 max-[640px]:text-[15px] max-[640px]:before:-inset-x-4 max-[640px]:before:-inset-y-[14px]">
          Pendampingan profesional untuk perizinan teknis,<br className="max-[640px]:hidden" /> dokumen lingkungan, dan kebutuhan compliance perusahaan.
        </p>

        <div className="hero-enter hero-enter-actions mt-[30px] flex items-center justify-center gap-3 max-[640px]:mt-[26px] max-[640px]:gap-2.5 max-[410px]:flex-col max-[410px]:gap-2">
          <a
            href="#kontak"
            className="group inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-[#193b22]/95 px-5 text-[12px] font-medium text-white shadow-[0_10px_28px_rgba(8,24,13,0.14)] backdrop-blur-lg transition-[background-color,transform,box-shadow] duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[#245231] hover:shadow-[0_13px_30px_rgba(8,24,13,0.2)] max-[640px]:min-h-[42px] max-[640px]:px-[18px] max-[640px]:text-[11px]"
          >
            <span>Konsultasikan Proyek</span>
            <ArrowUpRight className="size-[14px] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} aria-hidden="true" />
          </a>
          <a href="#layanan" className="group inline-flex min-h-[46px] items-center rounded-full bg-white/90 px-5 text-[12px] font-medium text-[#18351f] shadow-[0_8px_20px_rgba(12,26,15,0.1)] transition-[background-color,color,transform,box-shadow] duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_24px_rgba(12,26,15,0.16)] max-[640px]:min-h-[42px] max-[640px]:px-[18px] max-[640px]:text-[11px]">
            <span>Lihat Layanan</span>
          </a>
        </div>
        </div>

        <div className="hero-enter hero-enter-footer absolute inset-x-0 bottom-[clamp(26px,4vh,42px)] z-[5] flex w-full flex-col items-center justify-center gap-[9px] px-5 text-center max-[640px]:bottom-5 max-[640px]:gap-[7px] max-[410px]:bottom-4">
  
  <p className="m-0 text-center text-[10px] font-semibold leading-none tracking-[.2em] text-white/90 max-[640px]:text-[9px]">
    ENVIRONMENTAL CONSULTING
  </p>

  <nav
    className="flex w-full items-center justify-center gap-[14px] text-center text-white/75 max-[640px]:gap-2 max-[380px]:gap-1.5"
    aria-label="Layanan unggulan"
  >
    {['AMDAL', 'UKL-UPL', 'PROPER', 'SLO', 'LB3'].map((label, index, items) => (
      <span key={label} className="contents">
        <a
          href="#layanan"
          className="group relative py-[7px] text-[10px] font-medium tracking-[.1em] text-white/95 transition-[color,transform] duration-300 hover:-translate-y-0.5 hover:text-white max-[640px]:text-[8.5px] max-[380px]:text-[8px] max-[380px]:tracking-[.07em]"
        >
          {label}

          <span className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
        </a>

        {index < items.length - 1 && (
          <span className="size-1 shrink-0 rounded-full bg-white/45 max-[380px]:size-[3px]" aria-hidden="true" />
        )}
      </span>
    ))}
  </nav>
        </div>
      </div>

    </section>
  )
}
