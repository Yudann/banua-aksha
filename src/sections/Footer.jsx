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
  return <p className="footer-card-heading">{children}</p>
}

function FooterLink({ href, children }) {
  return <a href={href} className="footer-card-link">{children}</a>
}

function LinkedInIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 9v9M7 6.5v.1M11 18v-5.1c0-2.2 3-2.6 3-2.6s3-.1 3 3V18M11 9v9" /></svg>
}

function InstagramIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="12" cy="12" r="3.5"/><path d="M17.3 6.8h.01"/></svg>
}

function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
}

export default function Footer() {
  const [footerRef, visible] = useInView({ threshold: 0.08 })

  return (
    <footer ref={footerRef} className="footer-frame" aria-label="Footer Banua Aksha Inovasi">
      <div className="footer-card" data-nav-surface="dark">
        <div className="footer-card-image" aria-hidden="true" />
        <div className="footer-card-overlay" aria-hidden="true" />

        <div className="footer-card-inner" data-visible={visible}>
          <div className="footer-card-grid">
            <div className="footer-card-brand">
              <a href="#beranda" className="footer-card-logo" aria-label="Kembali ke beranda">
                <img src="/banua-logo.png" alt="" />
                <span>Banua Aksha</span>
              </a>
              <small className="footer-card-tagline">SMART SOLUTIONS FOR THE ENVIRONMENT</small>
              <p>Solusi profesional untuk perizinan, dokumen lingkungan, dan kebutuhan pendampingan perusahaan.</p>
              <a className="footer-card-consult" href="https://wa.me/628119799188" target="_blank" rel="noopener noreferrer">
                <span>Konsultasikan Proyek</span><span aria-hidden="true">↗</span>
              </a>

              <div className="footer-card-socials" aria-label="Media sosial Banua Aksha">
                <span title="LinkedIn — tautan belum tersedia"><LinkedInIcon /></span>
                <span title="Instagram — tautan belum tersedia"><InstagramIcon /></span>
                <a href="mailto:contact@petebaik.com" aria-label="Kirim email"><MailIcon /></a>
              </div>
            </div>

            <nav className="footer-card-column footer-card-explore" aria-label="Jelajahi">
              <FooterHeading>JELAJAHI</FooterHeading>
              {exploreLinks.map(([href, label]) => <FooterLink key={href} href={href}>{label}</FooterLink>)}
            </nav>

            <nav className="footer-card-column footer-card-services" aria-label="Layanan kami">
              <FooterHeading>LAYANAN KAMI</FooterHeading>
              {serviceLinks.map((label) => <FooterLink key={label} href="#layanan">{label}</FooterLink>)}
            </nav>

            <nav className="footer-card-column footer-card-company" aria-label="Perusahaan">
              <FooterHeading>PERUSAHAAN</FooterHeading>
              {companyLinks.map(([href, label]) => <FooterLink key={label} href={href}>{label}</FooterLink>)}
            </nav>

            <div className="footer-card-column footer-card-contact">
              <FooterHeading>HUBUNGI KAMI</FooterHeading>
              <a href="https://maps.google.com/?q=Villa+Melati+Mas+V-21+No+A5+Serpong+Utara+Tangerang+Selatan+Banten+15323" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s6-5.16 6-11A6 6 0 0 0 6 10c0 5.84 6 11 6 11Z"/><circle cx="12" cy="10" r="2.2"/></svg>
                <span>Villa Melati Mas, V-21 no. A5<br/>Serpong Utara, Kota Tangerang Selatan<br/>Banten — 15323</span>
              </a>
              <a href="tel:+628119799188">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.2 3.6 4.8 5.1c-.8.5-1.1 1.5-.8 2.4 1.8 5.8 6.7 10.7 12.5 12.5.9.3 1.9 0 2.4-.8l1.5-2.4-4-3.1-1.8 1.8a14.3 14.3 0 0 1-6.1-6.1l1.8-1.8-3.1-4Z"/></svg>
                <span>+62 811 9799 188</span>
              </a>
              <a href="mailto:contact@petebaik.com">
                <MailIcon />
                <span>contact@petebaik.com</span>
              </a>
            </div>
          </div>

          <div className="footer-card-bottom">
            <p>© 2026 PT Banua Aksha Inovasi. All rights reserved.</p>
            <a href="#beranda" aria-label="Kembali ke atas">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12c5.2-.4 8.15-2.85 9.15-7.2 3.4 3.35 4.15 7.15 2.25 10.05-1.85 2.8-5.8 3.45-8.65 1.45C5.3 15.3 4.35 13.8 4 12Z"/><path d="M4.5 19.5c2.6-3.7 5.55-6.35 9.35-8.3"/></svg>
              <span>Committed to environment. Driven by integrity.</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
