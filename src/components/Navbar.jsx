const navItems = [
  ['#tentang', 'Tentang'],
  ['#layanan', 'Layanan'],
  ['#proses', 'Proses'],
  ['#klien', 'Klien'],
  ['#kontak', 'Kontak'],
]

export default function Navbar() {
  return (
    <header className="absolute inset-x-[clamp(20px,2.2vw,36px)] top-5 z-20 grid grid-cols-[1fr_auto_1fr] items-center max-[900px]:grid-cols-[1fr_auto] max-[640px]:top-[18px]">
      <a
        className="hero-enter hero-enter-logo justify-self-start text-[13px] font-medium text-white/95 max-[640px]:text-xs"
        href="#"
        aria-label="Beranda"
      >
        (logo)
      </a>

      <nav
        className="hero-enter hero-enter-nav flex items-center gap-2 justify-self-center rounded-full border border-[#181b16]/15 bg-[#f6f3eb]/80 p-1 shadow-[0_6px_20px_rgba(21,28,18,0.05)] backdrop-blur-[18px] max-[900px]:hidden"
        aria-label="Navigasi utama"
      >
        {navItems.map(([href, label]) => (
          <a
            key={href}
            href={href}
            className="inline-flex min-h-[34px] items-center justify-center rounded-full px-[15px] text-[11px] font-medium text-[#141812]/85 transition-[background-color,color,transform] duration-300 ease-editorial hover:-translate-y-px hover:bg-white/55 hover:text-ink focus-visible:-translate-y-px focus-visible:bg-white/55 focus-visible:text-ink"
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        className="hero-enter hero-enter-cta inline-flex min-h-[42px] items-center gap-2.5 justify-self-end rounded-full bg-forest px-[17px] text-[11px] font-medium text-white/95 shadow-[0_10px_28px_rgba(10,32,17,0.15)] transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[#245231] hover:shadow-[0_14px_34px_rgba(10,32,17,0.22)] max-[900px]:hidden"
        href="#kontak"
      >
        <span>Konsultasikan Proyek</span>
        <span className="transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true">↗</span>
      </a>

      <button
        className="hero-enter hero-enter-cta hidden size-[42px] justify-self-end rounded-full border border-white/20 bg-[#193b22]/90 backdrop-blur-xl max-[900px]:block"
        type="button"
        aria-label="Menu navigasi tersedia pada desktop"
      >
        <span className="mx-auto my-1 block h-px w-[15px] bg-white/95" />
        <span className="mx-auto my-1 block h-px w-[15px] bg-white/95" />
      </button>
    </header>
  )
}
