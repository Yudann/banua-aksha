import { useInView } from '../hooks/useInView'

const exploreLinks = [
  ['#tentang', 'Tentang Kami'],
  ['#layanan', 'Layanan'],
  ['#proses', 'Proses'],
  ['#klien', 'Klien'],
  ['#kontak', 'Kontak'],
]

const serviceLinks = ['AMDAL', 'UKL–UPL', 'Persetujuan Teknis', 'SLO', 'Pengelolaan LB3', 'Dokumen Lingkungan']
const companyLinks = [
  ['#tentang', 'Profil Perusahaan'],
  ['#visi', 'Visi'],
  ['#misi', 'Misi'],
  ['#nilai', 'Nilai'],
  ['#klien', 'Daftar Klien'],
]

function FooterHeading({ children }) {
  return <p className="mb-6 mt-0 text-[10px] font-medium tracking-[.06em] text-[#b9d362] after:mt-2.5 after:block after:h-px after:w-[18px] after:bg-[#b9d362]/70">{children}</p>
}

function FooterLink({ href, children }) {
  return <a href={href} className="mb-3 block w-fit text-[11px] leading-[1.35] text-[#f8f6ee]/80 transition-all duration-300 ease-editorial hover:translate-x-[3px] hover:text-[#d7e895]">{children}</a>
}

export default function Footer() {
  const [footerRef, visible] = useInView({ threshold: 0.08 })

  return (
    <footer ref={footerRef} className="relative isolate min-h-[620px] overflow-hidden bg-[#0d2418] pb-9 pt-[clamp(88px,7vw,118px)] text-[#f4f2e9] max-[820px]:min-h-0 max-[820px]:pt-[72px]" aria-label="Footer Banua Aksha Inovasi">
      <div className="pointer-events-none absolute inset-0 -z-30 scale-[1.025] bg-[url('/assets/hero-bg.png')] bg-cover bg-[position:center_44%] [filter:saturate(.7)_contrast(1.04)_brightness(.54)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(8,27,17,.90)_0%,rgba(8,27,17,.84)_44%,rgba(8,27,17,.78)_100%),linear-gradient(180deg,rgba(9,29,18,.30)_0%,rgba(7,24,15,.78)_100%)]" />

      <div className={`mx-auto flex min-h-[470px] w-[calc(100%_-_72px)] max-w-[1500px] flex-col justify-between transition-all duration-[760ms] ease-editorial max-[1120px]:w-[calc(100%_-_48px)] max-[820px]:min-h-0 max-[820px]:w-[calc(100%_-_34px)] max-[560px]:w-[calc(100%_-_24px)] ${visible ? 'translate-y-0 opacity-100' : 'translate-y-[22px] opacity-0'}`}>
        <div className="grid grid-cols-[minmax(270px,1.45fr)_.72fr_1fr_.82fr_1.45fr] gap-0 max-[1120px]:grid-cols-[1.35fr_.85fr_.85fr_1.25fr] max-[1120px]:gap-y-11 max-[820px]:grid-cols-[1.15fr_.85fr] max-[820px]:gap-x-7 max-[820px]:gap-y-10 max-[560px]:grid-cols-1 max-[560px]:gap-y-[34px]">
          <div className="min-w-0 pr-[clamp(34px,3.4vw,64px)] max-[820px]:col-span-full max-[820px]:pr-0 max-[560px]:col-auto">
            <a href="#" className="mb-[22px] inline-block text-[25px] text-[#f7f4eb]" aria-label="Kembali ke beranda">(logo)</a>
            <p className="mb-7 max-w-[31ch] text-xs leading-[1.7] text-[#f6f3ea]/75">Solusi profesional untuk perizinan, dokumen lingkungan, dan kebutuhan pendampingan perusahaan.</p>
            <a href="https://wa.me/628119799188" target="_blank" rel="noopener noreferrer" className="group inline-flex min-w-[208px] items-center justify-between gap-[30px] rounded-md border border-[#bcd366]/30 bg-[#81aa45]/65 pl-[17px] pr-[15px] py-[13px] text-[11px] text-[#faf8ef] transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[#8cb94b]/80">
              <span>Konsultasikan Proyek</span><span aria-hidden="true">↗</span>
            </a>
          </div>

          <nav className="min-w-0 border-l border-[#eef0e2]/15 px-[clamp(22px,2.2vw,38px)] max-[820px]:border-0 max-[820px]:px-0" aria-label="Jelajahi">
            <FooterHeading>JELAJAHI</FooterHeading>
            {exploreLinks.map(([href, label]) => <FooterLink key={href} href={href}>{label}</FooterLink>)}
          </nav>

          <nav className="min-w-0 border-l border-[#eef0e2]/15 px-[clamp(22px,2.2vw,38px)] max-[1120px]:hidden" aria-label="Layanan kami">
            <FooterHeading>LAYANAN KAMI</FooterHeading>
            {serviceLinks.map((label) => <FooterLink key={label} href="#layanan">{label}</FooterLink>)}
          </nav>

          <nav className="min-w-0 border-l border-[#eef0e2]/15 px-[clamp(22px,2.2vw,38px)] max-[820px]:border-0 max-[820px]:px-0" aria-label="Perusahaan">
            <FooterHeading>PERUSAHAAN</FooterHeading>
            {companyLinks.map(([href, label]) => <FooterLink key={label} href={href}>{label}</FooterLink>)}
          </nav>

          <div className="min-w-0 border-l border-[#eef0e2]/15 pl-[clamp(22px,2.2vw,38px)] max-[820px]:col-span-full max-[820px]:border-l-0 max-[820px]:border-t max-[820px]:border-[#eef0e2]/15 max-[820px]:px-0 max-[820px]:pt-[34px] max-[560px]:col-auto max-[560px]:pt-7">
            <FooterHeading>HUBUNGI KAMI</FooterHeading>
            <a href="https://maps.google.com/?q=Villa+Melati+Mas+V-21+No+A5+Serpong+Utara+Tangerang+Selatan+Banten+15323" target="_blank" rel="noopener noreferrer" className="mb-[18px] grid grid-cols-[18px_minmax(0,1fr)] items-start gap-3 text-[10.5px] leading-[1.62] text-[#f8f6ee]/80 transition-colors duration-300 hover:text-[#dceca1]">
              <svg viewBox="0 0 24 24" className="mt-px size-[15px] fill-none stroke-[#b9d362] stroke-[1.45] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><path d="M12 21s6-5.16 6-11A6 6 0 0 0 6 10c0 5.84 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>
              <span>Villa Melati Mas, V-21 no. A5<br/>Serpong Utara, Kota Tangerang Selatan<br/>Banten — 15323</span>
            </a>
            <a href="tel:+628119799188" className="mb-[18px] grid grid-cols-[18px_minmax(0,1fr)] items-start gap-3 text-[10.5px] leading-[1.62] text-[#f8f6ee]/80 transition-colors duration-300 hover:text-[#dceca1]">
              <svg viewBox="0 0 24 24" className="mt-px size-[15px] fill-none stroke-[#b9d362] stroke-[1.45] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><path d="M7.2 3.6 4.8 5.1c-.8.5-1.1 1.5-.8 2.4 1.8 5.8 6.7 10.7 12.5 12.5.9.3 1.9 0 2.4-.8l1.5-2.4-4-3.1-1.8 1.8a14.3 14.3 0 0 1-6.1-6.1l1.8-1.8-3.1-4Z"/></svg>
              <span>+62 811 9799 188</span>
            </a>
            <a href="mailto:contact@petebaik.com" className="mb-[18px] grid grid-cols-[18px_minmax(0,1fr)] items-start gap-3 text-[10.5px] leading-[1.62] text-[#f8f6ee]/80 transition-colors duration-300 hover:text-[#dceca1]">
              <svg viewBox="0 0 24 24" className="mt-px size-[15px] fill-none stroke-[#b9d362] stroke-[1.45] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
              <span>contact@petebaik.com</span>
            </a>
          </div>
        </div>

        <div className="mt-[clamp(64px,5.2vw,86px)] flex items-center justify-between gap-6 border-t border-[#f1f2e8]/20 pt-[22px] text-[9.5px] leading-[1.4] text-[#f3f1e8]/65 max-[560px]:flex-col max-[560px]:items-start">
          <p className="m-0">© 2026 PT Banua Aksha Inovasi. All rights reserved.</p>
          <a href="#" className="group inline-flex items-center gap-2.5 text-[#f3f1e8]/70" aria-label="Kembali ke atas">
            <svg viewBox="0 0 24 24" className="size-[17px] fill-none stroke-[#b9d362] stroke-[1.5] transition-transform duration-300 group-hover:-translate-y-[3px] [stroke-linecap:round] [stroke-linejoin:round]" aria-hidden="true"><path d="M6 15 12 9l6 6"/></svg>
            <span>Committed to environment. Driven by integrity.</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
