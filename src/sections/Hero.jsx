import Navbar from '../components/Navbar'

export default function Hero() {
  return (
    <section className="relative z-[1] isolate min-h-[max(720px,100svh)] overflow-hidden bg-[#b9b39f] max-[900px]:min-h-[max(700px,100svh)] max-[640px]:min-h-[max(720px,100svh)]" aria-labelledby="hero-title">
      <div className="hero-background absolute inset-0 -z-30 bg-[url('/assets/hero-bg.png')] bg-cover bg-center max-[640px]:bg-[position:56%_center]" aria-hidden="true" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(to_bottom,rgba(8,18,10,0.02)_0%,rgba(8,18,10,0.01)_40%,rgba(8,18,10,0.09)_63%,rgba(8,18,10,0.45)_100%)] max-[640px]:bg-[linear-gradient(to_bottom,rgba(8,18,10,0.06)_0%,rgba(8,18,10,0.02)_34%,rgba(8,18,10,0.15)_59%,rgba(8,18,10,0.58)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_40%,rgba(12,17,11,0)_32%,rgba(12,17,11,0.07)_70%,rgba(8,12,8,0.25)_100%)]" aria-hidden="true" />

      <Navbar />

      <div className="absolute left-1/2 top-[clamp(160px,17vh,210px)] w-[calc(100%_-_48px)] max-w-[960px] -translate-x-1/2 text-center max-[900px]:top-[clamp(160px,19vh,205px)] max-[900px]:w-[calc(100%_-_44px)] max-[900px]:max-w-[760px] max-[640px]:top-[140px] max-[640px]:w-[calc(100%_-_34px)] max-[410px]:top-[126px]">
        <h1 id="hero-title" className="m-0 font-display text-[clamp(54px,5.4vw,82px)] font-medium leading-[.94] tracking-[-.045em] max-[900px]:text-[clamp(50px,8vw,66px)] max-[640px]:text-[clamp(43px,13.2vw,56px)] max-[640px]:leading-[.91] max-[640px]:tracking-[-.05em] max-[410px]:text-[42px]">
          <span className="title-mask block overflow-hidden py-[.08em] -my-[.08em]">
            <span className="hero-title-line hero-title-line-one block text-ink">Bisnis terus bertumbuh.</span>
          </span>
          <span className="title-mask block overflow-hidden py-[.08em] -my-[.08em]">
            <span className="hero-title-line hero-title-line-two block text-green">Lingkungan tetap terjaga.</span>
          </span>
        </h1>

        <p className="hero-enter hero-enter-description mx-auto mt-[25px] max-w-[570px] text-xs leading-[1.65] text-[#22261f]/70 max-[640px]:mt-[22px] max-[640px]:max-w-[330px] max-[640px]:px-2 max-[640px]:text-[11px]">
          Pendampingan profesional untuk perizinan teknis,<br className="max-[640px]:hidden" /> dokumen lingkungan, dan kebutuhan compliance perusahaan.
        </p>

        <div className="hero-enter hero-enter-actions mt-[30px] flex items-center justify-center gap-5 max-[640px]:mt-[26px] max-[640px]:gap-[15px] max-[410px]:flex-col max-[410px]:gap-0.5">
          <a
            href="#kontak"
            className="group inline-flex min-h-[42px] items-center gap-2.5 rounded-full bg-[#193b22]/95 px-[19px] text-[11px] font-medium text-white shadow-[0_10px_28px_rgba(8,24,13,0.14)] backdrop-blur-lg transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[#245231] hover:shadow-[0_13px_30px_rgba(8,24,13,0.2)] max-[640px]:min-h-10 max-[640px]:px-4 max-[640px]:text-[10px]"
          >
            <span>Konsultasikan Proyek</span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true">↗</span>
          </a>
          <a href="#layanan" className="group relative py-2 text-[11px] font-medium text-[#181b16]/85 max-[640px]:text-[10px]">
            <span>Lihat Layanan</span>
            <span className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-[.42] bg-[#181b16]/50 transition-transform duration-300 group-hover:scale-x-100" />
          </a>
        </div>
      </div>

<div className="hero-enter hero-enter-footer absolute inset-x-0 bottom-[clamp(26px,4vh,42px)] z-[5] flex w-full flex-col items-center justify-center gap-[9px] px-5 text-center max-[640px]:bottom-5 max-[640px]:gap-[7px] max-[410px]:bottom-4">
  
  <p className="m-0 text-center text-[9px] font-semibold leading-none tracking-[.2em] text-white/85 max-[640px]:text-[8px]">
    ENVIRONMENTAL CONSULTING
  </p>

  <nav
    className="flex w-full items-center justify-center gap-[13px] text-center text-white/70 max-[640px]:gap-[9px]"
    aria-label="Layanan unggulan"
  >
    {['AMDAL', 'UKL-UPL', 'SLO', 'LB3'].map((label, index) => (
      <span key={label} className="contents">
        <a
          href="#layanan"
          className="group relative py-[7px] text-[9px] font-medium tracking-[.11em] text-white/90 transition-all duration-300 hover:-translate-y-0.5 hover:text-white max-[640px]:text-[8px]"
        >
          {label}

          <span className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
        </a>

        {index < 3 && (
          <span aria-hidden="true">•</span>
        )}
      </span>
    ))}
  </nav>
</div>

    </section>
  )
}
