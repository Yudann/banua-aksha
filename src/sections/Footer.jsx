import { ArrowUpRight, BriefcaseBusiness, Camera, Leaf, Mail, MapPin, Phone } from 'lucide-react'
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
                <span>Konsultasikan Proyek</span><ArrowUpRight aria-hidden="true" />
              </a>

              <div className="footer-card-socials" aria-label="Media sosial Banua Aksha">
                <span title="LinkedIn — tautan belum tersedia"><BriefcaseBusiness aria-hidden="true" /></span>
                <span title="Instagram — tautan belum tersedia"><Camera aria-hidden="true" /></span>
                <a href="mailto:contact@petebaik.com" aria-label="Kirim email"><Mail aria-hidden="true" /></a>
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
                <MapPin aria-hidden="true" />
                <span>Villa Melati Mas, V-21 no. A5<br/>Serpong Utara, Kota Tangerang Selatan<br/>Banten — 15323</span>
              </a>
              <a href="tel:+628119799188">
                <Phone aria-hidden="true" />
                <span>+62 811 9799 188</span>
              </a>
              <a href="mailto:contact@petebaik.com">
                <Mail aria-hidden="true" />
                <span>contact@petebaik.com</span>
              </a>
            </div>
          </div>

          <div className="footer-card-bottom">
            <p>© 2026 PT Banua Aksha Inovasi. All rights reserved.</p>
            <a href="#beranda" aria-label="Kembali ke atas">
              <Leaf aria-hidden="true" />
              <span>Committed to environment. Driven by integrity.</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
